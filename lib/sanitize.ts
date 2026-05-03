import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitizes user input string to prevent XSS attacks.
 * Uses isomorphic-dompurify to work seamlessly on both client and server (Node.js).
 */
export function sanitizeInput(input: string): string {
  if (!input) return "";
  
  // Basic sanitization
  const sanitized = DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [], // We don't want any HTML tags from user input
    ALLOWED_ATTR: []
  });
  
  // Trim and return
  return sanitized.trim();
}
