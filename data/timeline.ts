export interface TimelineStep {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  keyFacts: string[];
  constitutionalBasis: string;
  duration: string;
  funFact: string;
  phase: "pre-election" | "election" | "post-election";
}

export const timelineSteps: TimelineStep[] = [
  {
    id: 1,
    title: "Delimitation of Constituencies",
    subtitle: "Drawing the boundaries",
    icon: "🗺️",
    description: "The Delimitation Commission divides India into territorial constituencies for Lok Sabha and State Assemblies based on the latest Census data. Each constituency represents roughly equal population to ensure fair representation. The boundaries are redrawn after every Census to account for population changes.",
    keyFacts: [
      "India has 543 Lok Sabha constituencies and 4,120+ State Assembly constituencies",
      "Delimitation is done by the Delimitation Commission, a quasi-judicial body",
      "Last full delimitation was based on 2001 Census (postponed for 2031 Census)",
      "J&K underwent fresh delimitation in 2022 — seats increased from 83 to 90"
    ],
    constitutionalBasis: "Articles 81, 82, 170, 330, 332 of the Constitution; Delimitation Act, 2002",
    duration: "Happens once every few decades after Census",
    funFact: "India's largest constituency by area is Ladakh (173,266 sq km) — larger than many countries!",
    phase: "pre-election"
  },
  {
    id: 2,
    title: "Preparation of Electoral Rolls",
    subtitle: "Who gets to vote?",
    icon: "📋",
    description: "The Electoral Registration Officer (ERO) prepares and maintains the voter list for each constituency. Every Indian citizen aged 18 or above as on January 1 of the revision year can register. Voter rolls are revised annually through Summary Revision. Citizens can apply through Form 6 (new registration), Form 7 (objection/deletion), or Form 8 (correction).",
    keyFacts: [
      "India had 968 million registered voters in the 2024 Lok Sabha Elections",
      "You can register online at nvsp.in or voters.eci.gov.in",
      "Photo Electoral Rolls (with voter photos) were introduced nationwide in 2009",
      "BLOs (Booth Level Officers) verify registrations door-to-door",
      "Continuous updation was introduced in 2023 with 4 qualifying dates per year (Jan 1, Apr 1, Jul 1, Oct 1)"
    ],
    constitutionalBasis: "Article 326 (Universal Adult Suffrage); Registration of Electors Rules, 1960",
    duration: "Ongoing process — annual summary revision + continuous updates",
    funFact: "If all Indian voters stood in a line, it would circle the Earth over 12 times!",
    phase: "pre-election"
  },
  {
    id: 3,
    title: "Election Schedule Announcement",
    subtitle: "The countdown begins",
    icon: "📢",
    description: "The Election Commission of India (ECI) announces the election schedule in a press conference. This includes dates for filing nominations, scrutiny, withdrawal, polling phases, and counting. The moment the schedule is announced, the Model Code of Conduct (MCC) comes into immediate effect across the region going to polls.",
    keyFacts: [
      "The ECI is a constitutional body headed by the Chief Election Commissioner (CEC)",
      "Schedule announcement typically happens 6-8 weeks before polling",
      "The MCC kicks in instantly from the date of announcement",
      "The 2024 Lok Sabha elections were announced on March 16, 2024, with polling from April 19 to June 1",
      "The press conference is aired live on Doordarshan and streamed online"
    ],
    constitutionalBasis: "Article 324 (Superintendence, direction, and control of elections)",
    duration: "A single announcement event — effects last until results",
    funFact: "The ECI once postponed elections in Bihar because of intense heat waves — voter safety comes first!",
    phase: "pre-election"
  },
  {
    id: 4,
    title: "Model Code of Conduct (MCC)",
    subtitle: "Rules of the game",
    icon: "⚖️",
    description: "The MCC is a set of guidelines governing the conduct of political parties, candidates, and the government during elections. It ensures a level playing field. Parties cannot announce new welfare schemes, make communal or caste-based appeals, use government resources for campaigning, or distribute cash/gifts to voters. The ruling government becomes a 'caretaker' government.",
    keyFacts: [
      "The MCC is NOT a law — it's a voluntary code with moral and institutional authority",
      "Violations are tracked via the cVIGIL app — citizens can report violations with photo/video",
      "Government cannot announce new projects, lay foundation stones, or make policy changes",
      "Ministers cannot use official vehicles, aircraft, or bungalows for campaigning",
      "The ECI can censure parties, issue show-cause notices, or ban candidates for violations",
      "In the 2024 elections, over 5,300 cVIGIL complaints were received with 2,100+ verified violations"
    ],
    constitutionalBasis: "Derived from Article 324 powers of the ECI; first introduced in 1960 (Kerala elections)",
    duration: "From announcement of schedule until completion of elections",
    funFact: "The cVIGIL app lets you report violations in just 5 minutes — it's like a 'complaint Uber' for elections!",
    phase: "pre-election"
  },
  {
    id: 5,
    title: "Filing of Nominations",
    subtitle: "Who wants to be a candidate?",
    icon: "📝",
    description: "Any eligible citizen can contest elections by filing a nomination paper with the Returning Officer (RO) of their constituency. Candidates must be registered voters, meet age requirements (25 for Lok Sabha/Assembly, 30 for Rajya Sabha), and pay a security deposit. They must also file an affidavit declaring their criminal records, assets, liabilities, and educational qualifications.",
    keyFacts: [
      "Security deposit: ₹25,000 for Lok Sabha, ₹10,000 for Assembly (half for SC/ST)",
      "Deposit is forfeited if the candidate gets less than 1/6th of total valid votes",
      "Candidates must file Form 26 (affidavit) with criminal, financial, and education details",
      "A nomination can be proposed by any registered voter of that constituency",
      "Independent candidates can contest without any party affiliation"
    ],
    constitutionalBasis: "Article 84 (Lok Sabha), Article 173 (State Assembly); Representation of the People Act, 1951",
    duration: "Nomination window is typically 7-10 days",
    funFact: "In the 2024 elections, there were 8,360 candidates for 543 Lok Sabha seats — about 15 per seat!",
    phase: "election"
  },
  {
    id: 6,
    title: "Scrutiny of Nominations",
    subtitle: "Are you qualified?",
    icon: "🔍",
    description: "The Returning Officer examines all nomination papers to verify eligibility. Papers are checked for completeness, proper signatures, valid proposer, correct security deposit, and whether the candidate meets constitutional requirements. Invalid nominations are rejected with reasons recorded.",
    keyFacts: [
      "Scrutiny happens on a fixed date announced in the election schedule",
      "Candidates can be present during scrutiny to defend their nominations",
      "Rejection can be appealed, but typically the decision is final",
      "Common rejection reasons: underage, wrong constituency, incomplete forms, no deposit"
    ],
    constitutionalBasis: "Section 36 of the Representation of the People Act, 1951",
    duration: "1 day (the day after the last date of nomination filing)",
    funFact: "Some nominations are filed strategically to 'split votes' — a common tactic called 'dummy candidates'!",
    phase: "election"
  },
  {
    id: 7,
    title: "Withdrawal of Candidature",
    subtitle: "Last chance to step back",
    icon: "🚪",
    description: "After scrutiny, candidates have a 2-day window to withdraw their nomination. This is the last chance for strategic alliances — parties may negotiate seat-sharing and ask candidates to withdraw. After this deadline, the final list of candidates is published and the battle lines are drawn.",
    keyFacts: [
      "Withdrawal must be submitted to the Returning Officer in writing",
      "The security deposit is refunded on withdrawal",
      "If only one candidate remains after withdrawal, they win 'uncontested'",
      "Uncontested wins have happened — Surat in Gujarat 2024 (Mukesh Dalal, BJP)"
    ],
    constitutionalBasis: "Section 37 of the Representation of the People Act, 1951",
    duration: "2 days after scrutiny date",
    funFact: "In the 2024 Lok Sabha elections, the BJP won Surat (Gujarat) without a single vote being cast — all other candidates withdrew!",
    phase: "election"
  },
  {
    id: 8,
    title: "Election Campaign",
    subtitle: "Battle for votes",
    icon: "📣",
    description: "The campaign period is when candidates and parties try to win over voters. This includes rallies, door-to-door canvassing, TV/radio ads, social media campaigns, manifestos, and public meetings. Strict rules apply: no hate speech, no communal appeals, no distribution of money/gifts, and strict expenditure limits. Campaigning MUST STOP 48 hours before polling ('silence period').",
    keyFacts: [
      "Expenditure limit: ₹95 lakh for Lok Sabha, ₹40 lakh for Assembly (2024 limits)",
      "Expenditure is tracked by Election Expenditure Observers",
      "Paid news is illegal — monitored by Media Certification & Monitoring Committees (MCMC)",
      "All political ads on social media must carry pre-certification",
      "Campaign silence period: 48 hours before polling day — NO campaigning allowed",
      "In 2024, approximately ₹3,500 crore worth of cash, liquor, drugs, and freebies were seized"
    ],
    constitutionalBasis: "Section 77 of RPA 1951 (expenditure limits); MCC guidelines",
    duration: "From nomination deadline until 48 hours before polling",
    funFact: "India's 2024 Lok Sabha election was the most expensive in history, with estimated spending over ₹1.35 lakh crore!",
    phase: "election"
  },
  {
    id: 9,
    title: "Polling Day",
    subtitle: "Your vote, your voice",
    icon: "🗳️",
    description: "On polling day, voters visit their assigned polling station, show a valid photo ID, get their finger marked with indelible ink, and cast their vote on an Electronic Voting Machine (EVM). The process is supervised by a Presiding Officer and polling staff. Each vote is verified through a Voter Verifiable Paper Audit Trail (VVPAT) — a paper slip that confirms the voter's choice.",
    keyFacts: [
      "Polling stations open for at least 8 hours (typically 7 AM to 6 PM)",
      "Each polling station serves a maximum of 1,500 voters",
      "Voters need any one of 12 approved photo IDs (Voter ID, Aadhaar, Passport, PAN, DL, etc.)",
      "Indelible ink is applied on the left forefinger to prevent repeat voting",
      "The NOTA (None of the Above) option is available on every EVM since 2013",
      "VVPAT shows a paper slip for 7 seconds before it drops into a sealed box",
      "Voters aged 85+ and PwD can opt for postal ballots or vote-from-home"
    ],
    constitutionalBasis: "Article 326 (Adult Suffrage); Conduct of Elections Rules, 1961",
    duration: "1 day per phase (multi-phase elections can span weeks)",
    funFact: "The ECI sets up polling booths even for a single voter — like the one in Gir Forest, Gujarat, set up just for one person!",
    phase: "election"
  },
  {
    id: 10,
    title: "Counting of Votes",
    subtitle: "The moment of truth",
    icon: "📊",
    description: "On counting day, EVMs are unsealed and votes are counted under the supervision of Returning Officers and Counting Observers appointed by the ECI. Postal ballots are counted first. VVPAT paper slips from 5 randomly selected polling stations per constituency are cross-verified with EVM results. Counting is done round-by-round, with trends updated in real-time on the ECI website.",
    keyFacts: [
      "Counting typically starts at 8:00 AM on counting day",
      "VVPAT verification of 5 booths per constituency was mandated by the Supreme Court in 2019",
      "If VVPAT count doesn't match EVM, the VVPAT count prevails",
      "Counting agents from each candidate/party are allowed inside counting halls",
      "Results are displayed live on results.eci.gov.in",
      "Media can cover counting with special passes"
    ],
    constitutionalBasis: "Sections 64-66 of the Representation of the People Act, 1951",
    duration: "1 day (typically results are clear by evening)",
    funFact: "Before EVMs, hand-counting of paper ballots sometimes took days — EVMs reduced counting to hours!",
    phase: "post-election"
  },
  {
    id: 11,
    title: "Declaration of Results",
    subtitle: "Winners and margins",
    icon: "🏆",
    description: "The Returning Officer declares the winning candidate — the one with the highest number of valid votes (First Past The Post system). The results are published in Form 20. If the margin is very close, a recount can be requested. If the winning margin is less than the NOTA votes, the winner still wins — NOTA doesn't trigger a re-election (yet). Election petitions can be filed in High Court within 45 days.",
    keyFacts: [
      "India follows the First Past The Post (FPTP) system — highest votes wins",
      "No minimum vote percentage or turnout is required to win",
      "Results are announced constituency-by-constituency as counting completes",
      "The Form 20 (Return of Election) is the official result document",
      "Election disputes are heard by the High Court (original jurisdiction) and Supreme Court (appeal)"
    ],
    constitutionalBasis: "Section 66 of RPA 1951; Article 329 (Bar to interference by courts in electoral matters)",
    duration: "Results announced same day as counting",
    funFact: "The closest Lok Sabha victory ever was by just 1 vote — but margins of <100 votes happen regularly!",
    phase: "post-election"
  },
  {
    id: 12,
    title: "Government Formation",
    subtitle: "From ballot to government",
    icon: "🏛️",
    description: "After results, the party or alliance with a majority of seats (272+ in Lok Sabha, >50% of total Assembly seats for states) is invited by the President/Governor to form the government. The leader of the majority party becomes Prime Minister/Chief Minister. If no party has a clear majority, the President/Governor may invite the largest party or alliance to prove majority through a floor test in the legislature.",
    keyFacts: [
      "Majority in Lok Sabha = 272 out of 543 seats",
      "The PM/CM must prove majority on the floor of the House within a specified time",
      "Coalition governments are common — 7 of India's last 10 governments have been coalitions",
      "Anti-defection law (10th Schedule) prevents elected members from switching parties",
      "The entire process from election announcement to government formation typically takes 6-8 weeks"
    ],
    constitutionalBasis: "Articles 74, 75 (Union), Articles 163, 164 (States); 10th Schedule (Anti-defection)",
    duration: "Government formation typically within days of results",
    funFact: "India's first Lok Sabha (1952) was elected in the world's first universal-suffrage election of this scale — 173 million voters, mostly illiterate, voting with symbols!",
    phase: "post-election"
  }
];
