export interface QuizQuestion {
  id: number;
  difficulty: "easy" | "medium" | "hard";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  relatedTimelineStep?: number;
}

export const quizQuestions: QuizQuestion[] = [
  // ═══════════ EASY (5 questions) ═══════════
  {
    id: 1,
    difficulty: "easy",
    question: "What is the minimum age to vote in Indian elections?",
    options: ["16 years", "18 years", "21 years", "25 years"],
    correctIndex: 1,
    explanation: "Under Article 326 of the Indian Constitution, every citizen aged 18 years or above is eligible to vote. This was reduced from 21 to 18 by the 61st Amendment Act, 1988.",
    relatedTimelineStep: 2
  },
  {
    id: 2,
    difficulty: "easy",
    question: "Which body conducts elections in India?",
    options: ["Supreme Court of India", "Parliament of India", "Election Commission of India", "President of India"],
    correctIndex: 2,
    explanation: "The Election Commission of India (ECI), established under Article 324 of the Constitution, has the power of superintendence, direction, and control of all elections to Parliament and State Legislatures.",
    relatedTimelineStep: 3
  },
  {
    id: 3,
    difficulty: "easy",
    question: "What does EVM stand for?",
    options: ["Electronic Voting Machine", "Election Verification Method", "Electoral Vote Manager", "Electronic Vote Monitor"],
    correctIndex: 0,
    explanation: "Electronic Voting Machines (EVMs) were first used in India in 1982 (Kerala) and became the sole method of voting nationwide from 2004. Each EVM can record up to 2,000 votes.",
    relatedTimelineStep: 9
  },
  {
    id: 4,
    difficulty: "easy",
    question: "How many seats does the Lok Sabha have?",
    options: ["245", "543", "552", "250"],
    correctIndex: 1,
    explanation: "The Lok Sabha (House of the People) has 543 elected members. Members are directly elected by the people through constituencies across India.",
    relatedTimelineStep: 1
  },
  {
    id: 5,
    difficulty: "easy",
    question: "What is the purpose of indelible ink during elections?",
    options: ["To mark the ballot paper", "To prevent duplicate voting", "To identify candidates", "To seal the EVM machine"],
    correctIndex: 1,
    explanation: "Indelible ink is applied on the left forefinger of voters after they cast their vote. It contains silver nitrate and stays for 2-4 weeks, preventing the same person from voting twice.",
    relatedTimelineStep: 9
  },

  // ═══════════ MEDIUM (5 questions) ═══════════
  {
    id: 6,
    difficulty: "medium",
    question: "What is the Model Code of Conduct (MCC)?",
    options: [
      "A law passed by Parliament for election security",
      "Constitutional rules for voter registration",
      "Guidelines governing conduct of parties and candidates during elections",
      "Rules for counting votes and declaring results"
    ],
    correctIndex: 2,
    explanation: "The MCC is a set of voluntary guidelines issued by the ECI. It's not a law but is enforced through the ECI's constitutional authority under Article 324. It comes into effect the moment election dates are announced.",
    relatedTimelineStep: 4
  },
  {
    id: 7,
    difficulty: "medium",
    question: "What is NOTA and when was it introduced?",
    options: [
      "A political party, formed in 2009",
      "None Of The Above — an option to reject all candidates, introduced in 2013",
      "A type of electronic ballot, introduced in 2004",
      "National Organization for Transparent Administration, formed in 2014"
    ],
    correctIndex: 1,
    explanation: "NOTA was introduced in 2013 following the Supreme Court's landmark judgment in PUCL vs Union of India. It allows voters to express dissatisfaction with all candidates. However, even if NOTA gets the most votes, the candidate with the highest votes still wins.",
    relatedTimelineStep: 9
  },
  {
    id: 8,
    difficulty: "medium",
    question: "What is VVPAT and why is it important?",
    options: [
      "Voter Verified Paper Audit Trail — provides a paper record of votes cast on EVMs",
      "Vote Validation and Processing Terminal — processes digital votes",
      "Virtual Voting and Paper Trail — enables online voting",
      "Voter Verification and Authentication Protocol — verifies voter identity"
    ],
    correctIndex: 0,
    explanation: "VVPAT is attached to EVMs and prints a slip showing the candidate's name and party symbol. The slip is visible for 7 seconds before dropping into a sealed box. The Supreme Court mandated VVPAT verification of 5 random booths per constituency.",
    relatedTimelineStep: 9
  },
  {
    id: 9,
    difficulty: "medium",
    question: "How many hours before polling must election campaigning stop?",
    options: ["24 hours", "48 hours", "72 hours", "12 hours"],
    correctIndex: 1,
    explanation: "Campaigning must cease 48 hours before polling begins. This 'silence period' allows voters to reflect on their choices without last-minute influence. Violations can lead to action under Section 126 of the RPA, 1951.",
    relatedTimelineStep: 8
  },
  {
    id: 10,
    difficulty: "medium",
    question: "What is the security deposit for contesting Lok Sabha elections?",
    options: ["₹10,000", "₹25,000", "₹50,000", "₹1,00,000"],
    correctIndex: 1,
    explanation: "Candidates must deposit ₹25,000 for Lok Sabha elections (₹12,500 for SC/ST candidates). The deposit is forfeited if the candidate fails to secure at least 1/6th of the total valid votes polled.",
    relatedTimelineStep: 5
  },

  // ═══════════ HARD (5 questions) ═══════════
  {
    id: 11,
    difficulty: "hard",
    question: "Under which Constitutional Article does the Election Commission derive its power?",
    options: ["Article 280", "Article 324", "Article 356", "Article 370"],
    correctIndex: 1,
    explanation: "Article 324 vests the superintendence, direction, and control of elections to Parliament, State Legislatures, and the offices of President and Vice-President in the Election Commission of India.",
    relatedTimelineStep: 3
  },
  {
    id: 12,
    difficulty: "hard",
    question: "What is the 'Anti-Defection Law' and which Schedule of the Constitution deals with it?",
    options: [
      "Law against electoral fraud — 8th Schedule",
      "Law against party switching by elected members — 10th Schedule",
      "Law against campaign finance violations — 9th Schedule",
      "Law against booth capturing — 11th Schedule"
    ],
    correctIndex: 1,
    explanation: "The 10th Schedule (added by the 52nd Amendment, 1985) contains the Anti-Defection Law. It disqualifies elected members who voluntarily give up party membership or vote against party whip. Exceptions exist for mergers (when 2/3rds of a party's legislators merge with another party).",
    relatedTimelineStep: 12
  },
  {
    id: 13,
    difficulty: "hard",
    question: "In which landmark case did the Supreme Court mandate the NOTA option?",
    options: [
      "Kesavananda Bharati vs State of Kerala (1973)",
      "PUCL vs Union of India (2013)",
      "S.R. Bommai vs Union of India (1994)",
      "Mohinder Singh Gill vs Chief Election Commissioner (1978)"
    ],
    correctIndex: 1,
    explanation: "In People's Union for Civil Liberties (PUCL) vs Union of India (September 2013), the Supreme Court held that voters have a fundamental right to reject all candidates and directed the ECI to provide a NOTA button on EVMs.",
    relatedTimelineStep: 9
  },
  {
    id: 14,
    difficulty: "hard",
    question: "What is the 'First Past The Post' (FPTP) system used in Indian elections?",
    options: [
      "A system where the candidate with more than 50% votes wins",
      "A system where the candidate with the most votes wins, regardless of percentage",
      "A proportional representation system based on party vote share",
      "A two-round voting system with a runoff between top 2 candidates"
    ],
    correctIndex: 1,
    explanation: "India uses FPTP (also called 'simple plurality') — the candidate with the highest number of valid votes wins, even if they don't get 50%+ votes. This is why candidates often win with 30-40% of total votes in multi-cornered contests.",
    relatedTimelineStep: 11
  },
  {
    id: 15,
    difficulty: "hard",
    question: "Which app can citizens use to report Model Code of Conduct violations during elections?",
    options: ["mAadhaar", "UMANG", "cVIGIL", "DigiLocker"],
    correctIndex: 2,
    explanation: "cVIGIL (Citizen Vigil) is a mobile app by the ECI that allows citizens to report MCC violations with photo/video evidence. Reports are geotagged and timestamped, and the flying squad must respond within 100 minutes. It received 5,300+ complaints during the 2024 Lok Sabha elections.",
    relatedTimelineStep: 4
  }
];
