export interface Constituency {
  name: string;
  state: string;
  type: "Lok Sabha" | "Assembly";
  currentRepresentative: string;
  party: string;
  lastElectionYear: string;
}

export const constituencyData: Record<string, Constituency[]> = {
  TN: [
    { name: "Chennai South", state: "Tamil Nadu", type: "Lok Sabha", currentRepresentative: "Thamizhachi Thangapandian", party: "DMK", lastElectionYear: "2024" },
    { name: "Chennai North", state: "Tamil Nadu", type: "Lok Sabha", currentRepresentative: "Kalanidhi Veeraswamy", party: "DMK", lastElectionYear: "2024" },
    { name: "Chennai Central", state: "Tamil Nadu", type: "Lok Sabha", currentRepresentative: "Dayanidhi Maran", party: "DMK", lastElectionYear: "2024" },
    { name: "Coimbatore", state: "Tamil Nadu", type: "Lok Sabha", currentRepresentative: "Ganapathy Rajkumar", party: "DMK", lastElectionYear: "2024" },
    { name: "Madurai", state: "Tamil Nadu", type: "Lok Sabha", currentRepresentative: "Venkatesan S", party: "CPI(M)", lastElectionYear: "2024" },
    { name: "Salem", state: "Tamil Nadu", type: "Lok Sabha", currentRepresentative: "S R Parthiban", party: "DMK", lastElectionYear: "2024" },
    { name: "Tiruchirappalli", state: "Tamil Nadu", type: "Lok Sabha", currentRepresentative: "Dhanush M Kumar", party: "DMK", lastElectionYear: "2024" },
  ],
  WB: [
    { name: "Kolkata North", state: "West Bengal", type: "Lok Sabha", currentRepresentative: "Sudip Bandyopadhyay", party: "TMC", lastElectionYear: "2024" },
    { name: "Kolkata South", state: "West Bengal", type: "Lok Sabha", currentRepresentative: "Mala Roy", party: "TMC", lastElectionYear: "2024" },
    { name: "Howrah", state: "West Bengal", type: "Lok Sabha", currentRepresentative: "Prasun Banerjee", party: "TMC", lastElectionYear: "2024" },
    { name: "Barrackpore", state: "West Bengal", type: "Lok Sabha", currentRepresentative: "Partha Bhowmick", party: "TMC", lastElectionYear: "2024" },
    { name: "Diamond Harbour", state: "West Bengal", type: "Lok Sabha", currentRepresentative: "Abhishek Banerjee", party: "TMC", lastElectionYear: "2024" },
    { name: "Siliguri", state: "West Bengal", type: "Lok Sabha", currentRepresentative: "Shakti Mohan Malik", party: "TMC", lastElectionYear: "2024" },
  ],
  KL: [
    { name: "Thiruvananthapuram", state: "Kerala", type: "Lok Sabha", currentRepresentative: "Shashi Tharoor", party: "INC", lastElectionYear: "2024" },
    { name: "Ernakulam", state: "Kerala", type: "Lok Sabha", currentRepresentative: "Hibi Eden", party: "INC", lastElectionYear: "2024" },
    { name: "Kozhikode", state: "Kerala", type: "Lok Sabha", currentRepresentative: "M K Raghavan", party: "INC", lastElectionYear: "2024" },
    { name: "Thrissur", state: "Kerala", type: "Lok Sabha", currentRepresentative: "Suresh Gopi", party: "BJP", lastElectionYear: "2024" },
    { name: "Alappuzha", state: "Kerala", type: "Lok Sabha", currentRepresentative: "K C Venugopal", party: "INC", lastElectionYear: "2024" },
    { name: "Kannur", state: "Kerala", type: "Lok Sabha", currentRepresentative: "K Sudhakaran", party: "INC", lastElectionYear: "2024" },
  ],
  AP: [
    { name: "Vijayawada", state: "Andhra Pradesh", type: "Lok Sabha", currentRepresentative: "Kesineni Sivanath", party: "TDP", lastElectionYear: "2024" },
    { name: "Guntur", state: "Andhra Pradesh", type: "Lok Sabha", currentRepresentative: "Chandra Sekhar Pemmasani", party: "TDP", lastElectionYear: "2024" },
    { name: "Visakhapatnam", state: "Andhra Pradesh", type: "Lok Sabha", currentRepresentative: "Sribharat Mathukumilli", party: "TDP", lastElectionYear: "2024" },
    { name: "Tirupati", state: "Andhra Pradesh", type: "Lok Sabha", currentRepresentative: "Gurumoorthy Maddila", party: "TDP", lastElectionYear: "2024" },
    { name: "Rajamahendravaram", state: "Andhra Pradesh", type: "Lok Sabha", currentRepresentative: "Daggubati Purandeswari", party: "TDP", lastElectionYear: "2024" },
  ],
  TS: [
    { name: "Hyderabad", state: "Telangana", type: "Lok Sabha", currentRepresentative: "Asaduddin Owaisi", party: "AIMIM", lastElectionYear: "2024" },
    { name: "Secunderabad", state: "Telangana", type: "Lok Sabha", currentRepresentative: "G Kishan Reddy", party: "BJP", lastElectionYear: "2024" },
    { name: "Malkajgiri", state: "Telangana", type: "Lok Sabha", currentRepresentative: "Eatala Rajender", party: "BJP", lastElectionYear: "2024" },
    { name: "Chevella", state: "Telangana", type: "Lok Sabha", currentRepresentative: "Konda Vishweshwar Reddy", party: "BJP", lastElectionYear: "2024" },
    { name: "Warangal", state: "Telangana", type: "Lok Sabha", currentRepresentative: "Kadiam Kavya", party: "INC", lastElectionYear: "2024" },
  ],
  MH: [
    { name: "Mumbai North", state: "Maharashtra", type: "Lok Sabha", currentRepresentative: "Piyush Goyal", party: "BJP", lastElectionYear: "2024" },
    { name: "Mumbai South", state: "Maharashtra", type: "Lok Sabha", currentRepresentative: "Arvind Sawant", party: "Shiv Sena (UBT)", lastElectionYear: "2024" },
    { name: "Pune", state: "Maharashtra", type: "Lok Sabha", currentRepresentative: "Murlidhar Mohol", party: "BJP", lastElectionYear: "2024" },
    { name: "Nagpur", state: "Maharashtra", type: "Lok Sabha", currentRepresentative: "Nitin Gadkari", party: "BJP", lastElectionYear: "2024" },
    { name: "Thane", state: "Maharashtra", type: "Lok Sabha", currentRepresentative: "Naresh Mhaske", party: "Shiv Sena", lastElectionYear: "2024" },
    { name: "Nashik", state: "Maharashtra", type: "Lok Sabha", currentRepresentative: "Rajabhau Waje", party: "Shiv Sena", lastElectionYear: "2024" },
  ],
  UP: [
    { name: "Varanasi", state: "Uttar Pradesh", type: "Lok Sabha", currentRepresentative: "Narendra Modi", party: "BJP", lastElectionYear: "2024" },
    { name: "Lucknow", state: "Uttar Pradesh", type: "Lok Sabha", currentRepresentative: "Rajnath Singh", party: "BJP", lastElectionYear: "2024" },
    { name: "Kanpur", state: "Uttar Pradesh", type: "Lok Sabha", currentRepresentative: "Ramesh Awasthi", party: "BJP", lastElectionYear: "2024" },
    { name: "Prayagraj", state: "Uttar Pradesh", type: "Lok Sabha", currentRepresentative: "Neeraj Tripathi", party: "BJP", lastElectionYear: "2024" },
    { name: "Agra", state: "Uttar Pradesh", type: "Lok Sabha", currentRepresentative: "S P Singh Baghel", party: "BJP", lastElectionYear: "2024" },
    { name: "Gorakhpur", state: "Uttar Pradesh", type: "Lok Sabha", currentRepresentative: "Ravi Kishan", party: "BJP", lastElectionYear: "2024" },
  ],
  KA: [
    { name: "Bengaluru South", state: "Karnataka", type: "Lok Sabha", currentRepresentative: "Tejasvi Surya", party: "BJP", lastElectionYear: "2024" },
    { name: "Bengaluru North", state: "Karnataka", type: "Lok Sabha", currentRepresentative: "Shobha Karandlaje", party: "BJP", lastElectionYear: "2024" },
    { name: "Mysuru", state: "Karnataka", type: "Lok Sabha", currentRepresentative: "Yaduveer Wadiyar", party: "BJP", lastElectionYear: "2024" },
    { name: "Mangaluru", state: "Karnataka", type: "Lok Sabha", currentRepresentative: "Captain Brijesh Chowta", party: "BJP", lastElectionYear: "2024" },
    { name: "Dharwad", state: "Karnataka", type: "Lok Sabha", currentRepresentative: "Pralhad Joshi", party: "BJP", lastElectionYear: "2024" },
  ],
};
