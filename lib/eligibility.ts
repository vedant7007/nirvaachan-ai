export interface EligibilityData {
  age: number;
  isCitizen: boolean;
  isNRI: boolean;
  isDisqualified: boolean;
  isRegistered: boolean;
}

export interface EligibilityResult {
  status: "Not Eligible Yet" | "Not Eligible" | "Disqualified" | "Eligible to Register" | "Fully Eligible to Vote" | "Eligible as Overseas Elector";
  description: string;
  actionForm?: "Form 6" | "Form 6A";
  actionLink?: string;
}

export function checkEligibility(data: EligibilityData): EligibilityResult {
  if (!data.isCitizen) {
    return {
      status: "Not Eligible",
      description: "Only Indian citizens are eligible to vote in Indian elections.",
    };
  }

  if (data.age < 18) {
    return {
      status: "Not Eligible Yet",
      description: `You must be at least 18 years old to vote. You will be eligible to register when you turn 18.`,
    };
  }

  if (data.isDisqualified) {
    return {
      status: "Disqualified",
      description: "You are currently disqualified from voting under the law (due to unsound mind or conviction of certain election offenses/crimes).",
    };
  }

  if (data.isNRI) {
    return {
      status: "Eligible as Overseas Elector",
      description: "As a Non-Resident Indian (NRI), you are eligible to register as an overseas elector in your home constituency.",
      actionForm: "Form 6A",
      actionLink: "https://voters.eci.gov.in/",
    };
  }

  if (!data.isRegistered) {
    return {
      status: "Eligible to Register",
      description: "You meet all the criteria to vote, but you need to register on the electoral roll to cast your vote.",
      actionForm: "Form 6",
      actionLink: "https://voters.eci.gov.in/",
    };
  }

  return {
    status: "Fully Eligible to Vote",
    description: "You are fully eligible and registered to vote. You can find your polling booth on the ECI website.",
  };
}
