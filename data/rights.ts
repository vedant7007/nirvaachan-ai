export interface VoterRight {
  title: string;
  article: string;
  description: string;
  icon: string;
}

export const voterRights: VoterRight[] = [
  {
    title: "Right to Vote (Universal Adult Suffrage)",
    article: "Article 326",
    description: "Every Indian citizen aged 18+ has the right to vote regardless of caste, religion, gender, education, or wealth. This is a constitutional right, not a privilege.",
    icon: "🗳️"
  },
  {
    title: "Right to Secret Ballot",
    article: "Conduct of Elections Rules, 1961",
    description: "Your vote is completely secret. No one — not even the government — can find out who you voted for. The EVM does not record the sequence of votes.",
    icon: "🔒"
  },
  {
    title: "Right to NOTA (Reject All Candidates)",
    article: "PUCL vs Union of India (2013)",
    description: "You have the right to press NOTA on the EVM if you don't want to vote for any candidate. This right was upheld by the Supreme Court.",
    icon: "🚫"
  },
  {
    title: "Right to Information About Candidates",
    article: "Section 33A, RPA 1951",
    description: "Every candidate must declare their criminal record, assets, liabilities, and education. You have the right to access this information before voting.",
    icon: "📄"
  },
  {
    title: "Right to Report Violations",
    article: "Article 324 (ECI powers)",
    description: "You can report MCC violations using the cVIGIL app. You can also file complaints about booth capturing, bribery, or intimidation with the ECI.",
    icon: "📱"
  },
  {
    title: "Right to Accessible Voting",
    article: "ECI Guidelines for PwD Voters",
    description: "Voters with disabilities have the right to accessible polling stations, assistive devices, companion voting, and postal ballot facilities.",
    icon: "♿"
  },
  {
    title: "Right to Challenge Election Results",
    article: "Article 329, RPA 1951",
    description: "Any voter or candidate can file an election petition in the High Court within 45 days of results if they believe the election was not free and fair.",
    icon: "⚖️"
  },
  {
    title: "Right to Free and Fair Elections",
    article: "Article 324",
    description: "The Constitution guarantees that elections will be conducted freely and fairly by an independent Election Commission, free from government interference.",
    icon: "🇮🇳"
  }
];
