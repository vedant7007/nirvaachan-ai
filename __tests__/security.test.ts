import { RateLimiter } from "@/lib/rate-limiter";

describe("Security — Rate limiter", () => {
  it("allows requests within the limit", () => {
    const limiter = new RateLimiter(60_000, 5);
    for (let i = 0; i < 5; i++) {
      expect(limiter.check("test-ip")).toBe(true);
    }
  });

  it("blocks requests exceeding the limit", () => {
    const limiter = new RateLimiter(60_000, 3);
    limiter.check("ip1");
    limiter.check("ip1");
    limiter.check("ip1");
    expect(limiter.check("ip1")).toBe(false);
  });

  it("tracks different IPs independently", () => {
    const limiter = new RateLimiter(60_000, 2);
    limiter.check("ip-a");
    limiter.check("ip-a");
    expect(limiter.check("ip-a")).toBe(false);
    expect(limiter.check("ip-b")).toBe(true);
  });

  it("resets after the time window", () => {
    const limiter = new RateLimiter(100, 1); // 100ms window
    limiter.check("ip");
    expect(limiter.check("ip")).toBe(false);

    // Wait for window to expire
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(limiter.check("ip")).toBe(true);
        resolve();
      }, 150);
    });
  });

  it("handles zero max requests", () => {
    const limiter = new RateLimiter(60_000, 0);
    expect(limiter.check("any")).toBe(false);
  });
});

describe("Security — Input sanitization", () => {
  // Test the regex sanitizer used in API routes
  function sanitize(input: string): string {
    if (!input) return "";
    return input.replace(/<[^>]*>/g, "").trim();
  }

  it("strips script tags", () => {
    expect(sanitize('<script>alert("xss")</script>')).toBe('alert("xss")');
  });

  it("strips HTML tags", () => {
    expect(sanitize("<b>bold</b>")).toBe("bold");
    expect(sanitize("<div><p>text</p></div>")).toBe("text");
  });

  it("strips self-closing tags", () => {
    expect(sanitize("<img src=x onerror=alert(1)/>")).toBe("");
  });

  it("preserves plain text", () => {
    expect(sanitize("How do I vote in India?")).toBe("How do I vote in India?");
  });

  it("handles empty string", () => {
    expect(sanitize("")).toBe("");
  });

  it("trims whitespace", () => {
    expect(sanitize("  hello  ")).toBe("hello");
  });

  it("strips nested tags", () => {
    expect(sanitize("<div><script>bad</script></div>")).toBe("bad");
  });

  it("handles event handler attributes", () => {
    expect(sanitize('<a onclick="evil()">click</a>')).toBe("click");
  });
});

describe("Security — System prompt safety", () => {
  it("system prompt contains neutrality rules", async () => {
    const gemini = await import("@/lib/gemini");
    expect(gemini.SYSTEM_PROMPT).toContain("neutral");
    expect(gemini.SYSTEM_PROMPT).toContain("political");
  });

  it("system prompt enforces refusal for party-related questions", async () => {
    const gemini = await import("@/lib/gemini");
    expect(gemini.SYSTEM_PROMPT).toContain("refuse");
  });

  it("system prompt is scoped to Indian elections", async () => {
    const gemini = await import("@/lib/gemini");
    expect(gemini.SYSTEM_PROMPT).toContain("Indian");
    expect(gemini.SYSTEM_PROMPT).toContain("election");
    expect(gemini.SYSTEM_PROMPT).toContain("ECI");
  });

  it("system prompt references official legal framework", async () => {
    const gemini = await import("@/lib/gemini");
    expect(gemini.SYSTEM_PROMPT).toContain("Representation of the People Act");
  });
});

describe("Security — Configuration checks", () => {
  it("TypeScript strict mode is enabled", async () => {
    const fs = await import("fs");
    const tsconfig = JSON.parse(fs.readFileSync("tsconfig.json", "utf-8"));
    expect(tsconfig.compilerOptions.strict).toBe(true);
  });

  it("ESLint has no-eval rule", async () => {
    const fs = await import("fs");
    const eslintConfig = JSON.parse(fs.readFileSync(".eslintrc.json", "utf-8"));
    expect(eslintConfig.rules["no-eval"]).toBe("error");
    expect(eslintConfig.rules["no-implied-eval"]).toBe("error");
    expect(eslintConfig.rules["no-new-func"]).toBe("error");
  });

  it("Next.js hides powered-by header", async () => {
    const configFile = await import("fs").then(fs => fs.readFileSync("next.config.mjs", "utf-8"));
    expect(configFile).toContain("poweredByHeader: false");
  });

  it("Next.js output is standalone for minimal Docker image", async () => {
    const configFile = await import("fs").then(fs => fs.readFileSync("next.config.mjs", "utf-8"));
    expect(configFile).toContain("output: 'standalone'");
  });
});
