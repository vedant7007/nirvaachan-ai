export interface StateElectionData {
  name: string;
  code: string;
  lokSabhaSeats: number;
  assemblySeats: number;
  lastAssemblyElection: string;
  voterTurnout2024: string;
  currentGovernment: string;
  capital: string;
}

export const statesData: StateElectionData[] = [
  { name: "Andhra Pradesh", code: "AP", lokSabhaSeats: 25, assemblySeats: 175, lastAssemblyElection: "2024", voterTurnout2024: "81.86%", currentGovernment: "TDP-led NDA", capital: "Amaravati" },
  { name: "Arunachal Pradesh", code: "AR", lokSabhaSeats: 2, assemblySeats: 60, lastAssemblyElection: "2024", voterTurnout2024: "82.95%", currentGovernment: "BJP", capital: "Itanagar" },
  { name: "Assam", code: "AS", lokSabhaSeats: 14, assemblySeats: 126, lastAssemblyElection: "2026", voterTurnout2024: "81.56%", currentGovernment: "BJP-led NDA", capital: "Dispur" },
  { name: "Bihar", code: "BR", lokSabhaSeats: 40, assemblySeats: 243, lastAssemblyElection: "2020", voterTurnout2024: "56.19%", currentGovernment: "JD(U)-led NDA", capital: "Patna" },
  { name: "Chhattisgarh", code: "CT", lokSabhaSeats: 11, assemblySeats: 90, lastAssemblyElection: "2023", voterTurnout2024: "72.80%", currentGovernment: "BJP", capital: "Raipur" },
  { name: "Goa", code: "GA", lokSabhaSeats: 2, assemblySeats: 40, lastAssemblyElection: "2022", voterTurnout2024: "76.06%", currentGovernment: "BJP", capital: "Panaji" },
  { name: "Gujarat", code: "GJ", lokSabhaSeats: 26, assemblySeats: 182, lastAssemblyElection: "2022", voterTurnout2024: "60.13%", currentGovernment: "BJP", capital: "Gandhinagar" },
  { name: "Haryana", code: "HR", lokSabhaSeats: 10, assemblySeats: 90, lastAssemblyElection: "2024", voterTurnout2024: "64.80%", currentGovernment: "BJP", capital: "Chandigarh" },
  { name: "Himachal Pradesh", code: "HP", lokSabhaSeats: 4, assemblySeats: 68, lastAssemblyElection: "2022", voterTurnout2024: "70.90%", currentGovernment: "Congress", capital: "Shimla" },
  { name: "Jharkhand", code: "JH", lokSabhaSeats: 14, assemblySeats: 81, lastAssemblyElection: "2024", voterTurnout2024: "66.19%", currentGovernment: "JMM-led INDIA", capital: "Ranchi" },
  { name: "Karnataka", code: "KA", lokSabhaSeats: 28, assemblySeats: 224, lastAssemblyElection: "2023", voterTurnout2024: "70.64%", currentGovernment: "Congress", capital: "Bengaluru" },
  { name: "Kerala", code: "KL", lokSabhaSeats: 20, assemblySeats: 140, lastAssemblyElection: "2026", voterTurnout2024: "71.27%", currentGovernment: "LDF", capital: "Thiruvananthapuram" },
  { name: "Madhya Pradesh", code: "MP", lokSabhaSeats: 29, assemblySeats: 230, lastAssemblyElection: "2023", voterTurnout2024: "66.87%", currentGovernment: "BJP", capital: "Bhopal" },
  { name: "Maharashtra", code: "MH", lokSabhaSeats: 48, assemblySeats: 288, lastAssemblyElection: "2024", voterTurnout2024: "61.33%", currentGovernment: "Mahayuti", capital: "Mumbai" },
  { name: "Manipur", code: "MN", lokSabhaSeats: 2, assemblySeats: 60, lastAssemblyElection: "2022", voterTurnout2024: "76.10%", currentGovernment: "BJP", capital: "Imphal" },
  { name: "Meghalaya", code: "ML", lokSabhaSeats: 2, assemblySeats: 60, lastAssemblyElection: "2023", voterTurnout2024: "76.60%", currentGovernment: "NPP-led MDA", capital: "Shillong" },
  { name: "Mizoram", code: "MZ", lokSabhaSeats: 1, assemblySeats: 40, lastAssemblyElection: "2023", voterTurnout2024: "56.87%", currentGovernment: "ZPM", capital: "Aizawl" },
  { name: "Nagaland", code: "NL", lokSabhaSeats: 1, assemblySeats: 60, lastAssemblyElection: "2023", voterTurnout2024: "57.72%", currentGovernment: "NDPP-led PDA", capital: "Kohima" },
  { name: "Odisha", code: "OR", lokSabhaSeats: 21, assemblySeats: 147, lastAssemblyElection: "2024", voterTurnout2024: "74.44%", currentGovernment: "BJP", capital: "Bhubaneswar" },
  { name: "Punjab", code: "PB", lokSabhaSeats: 13, assemblySeats: 117, lastAssemblyElection: "2022", voterTurnout2024: "62.80%", currentGovernment: "AAP", capital: "Chandigarh" },
  { name: "Rajasthan", code: "RJ", lokSabhaSeats: 25, assemblySeats: 200, lastAssemblyElection: "2023", voterTurnout2024: "62.10%", currentGovernment: "BJP", capital: "Jaipur" },
  { name: "Sikkim", code: "SK", lokSabhaSeats: 1, assemblySeats: 32, lastAssemblyElection: "2024", voterTurnout2024: "79.88%", currentGovernment: "SKM", capital: "Gangtok" },
  { name: "Tamil Nadu", code: "TN", lokSabhaSeats: 39, assemblySeats: 234, lastAssemblyElection: "2026", voterTurnout2024: "69.72%", currentGovernment: "DMK-led Alliance", capital: "Chennai" },
  { name: "Telangana", code: "TS", lokSabhaSeats: 17, assemblySeats: 119, lastAssemblyElection: "2023", voterTurnout2024: "65.67%", currentGovernment: "Congress", capital: "Hyderabad" },
  { name: "Tripura", code: "TR", lokSabhaSeats: 2, assemblySeats: 60, lastAssemblyElection: "2023", voterTurnout2024: "80.92%", currentGovernment: "BJP", capital: "Agartala" },
  { name: "Uttar Pradesh", code: "UP", lokSabhaSeats: 80, assemblySeats: 403, lastAssemblyElection: "2022", voterTurnout2024: "56.92%", currentGovernment: "BJP", capital: "Lucknow" },
  { name: "Uttarakhand", code: "UK", lokSabhaSeats: 5, assemblySeats: 70, lastAssemblyElection: "2022", voterTurnout2024: "57.22%", currentGovernment: "BJP", capital: "Dehradun" },
  { name: "West Bengal", code: "WB", lokSabhaSeats: 42, assemblySeats: 294, lastAssemblyElection: "2026", voterTurnout2024: "79.29%", currentGovernment: "TMC", capital: "Kolkata" },
  { name: "Andaman and Nicobar Islands", code: "AN", lokSabhaSeats: 1, assemblySeats: 0, lastAssemblyElection: "N/A", voterTurnout2024: "64.10%", currentGovernment: "Central Govt", capital: "Port Blair" },
  { name: "Chandigarh", code: "CH", lokSabhaSeats: 1, assemblySeats: 0, lastAssemblyElection: "N/A", voterTurnout2024: "67.98%", currentGovernment: "Central Govt", capital: "Chandigarh" },
  { name: "Dadra and Nagar Haveli and Daman and Diu", code: "DN", lokSabhaSeats: 2, assemblySeats: 0, lastAssemblyElection: "N/A", voterTurnout2024: "71.22%", currentGovernment: "Central Govt", capital: "Daman" },
  { name: "Delhi", code: "DL", lokSabhaSeats: 7, assemblySeats: 70, lastAssemblyElection: "2025", voterTurnout2024: "58.69%", currentGovernment: "AAP", capital: "New Delhi" },
  { name: "Jammu and Kashmir", code: "JK", lokSabhaSeats: 5, assemblySeats: 90, lastAssemblyElection: "2024", voterTurnout2024: "58.46%", currentGovernment: "NC-Congress", capital: "Srinagar/Jammu" },
  { name: "Ladakh", code: "LA", lokSabhaSeats: 1, assemblySeats: 0, lastAssemblyElection: "N/A", voterTurnout2024: "71.82%", currentGovernment: "Central Govt", capital: "Leh" },
  { name: "Lakshadweep", code: "LD", lokSabhaSeats: 1, assemblySeats: 0, lastAssemblyElection: "N/A", voterTurnout2024: "84.16%", currentGovernment: "Central Govt", capital: "Kavaratti" },
  { name: "Puducherry", code: "PY", lokSabhaSeats: 1, assemblySeats: 30, lastAssemblyElection: "2026", voterTurnout2024: "78.90%", currentGovernment: "AINRC-led NDA", capital: "Puducherry" }
];

export const constituencyData: Record<string, { district: string; constituencies: string[] }> = {
  "TS": {
    district: "Hyderabad",
    constituencies: ["Hyderabad", "Secunderabad", "Malkajgiri", "Chevella"]
  },
  "AP": {
    district: "Visakhapatnam",
    constituencies: ["Visakhapatnam", "Anakapalle", "Araku"]
  },
  "MH": {
    district: "Mumbai",
    constituencies: ["Mumbai South", "Mumbai North", "Mumbai North East", "Mumbai North West", "Mumbai North Central", "Mumbai South Central"]
  },
  "DL": {
    district: "New Delhi",
    constituencies: ["New Delhi", "Chandni Chowk", "East Delhi", "North East Delhi", "North West Delhi", "South Delhi", "West Delhi"]
  }
};
