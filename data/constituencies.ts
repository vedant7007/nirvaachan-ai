export interface Constituency {
  name: string;
  state: string;
  type: "Lok Sabha" | "Assembly";
  currentRepresentative: string;
  party: string;
  lastElectionYear: string;
}

export const constituencyData: Record<string, Constituency[]> = {
  JK: [
    { name: "Baramulla", state: "Jammu & Kashmir", type: "Lok Sabha", currentRepresentative: "Engineer Rashid", party: "AIP", lastElectionYear: "2024" },
    { name: "Srinagar", state: "Jammu & Kashmir", type: "Lok Sabha", currentRepresentative: "Aga Syed Ruhullah Mehdi", party: "NC", lastElectionYear: "2024" },
    { name: "Anantnag-Rajouri", state: "Jammu & Kashmir", type: "Lok Sabha", currentRepresentative: "Mian Altaf Ahmad", party: "NC", lastElectionYear: "2024" },
    { name: "Udhampur", state: "Jammu & Kashmir", type: "Lok Sabha", currentRepresentative: "Jitendra Singh", party: "BJP", lastElectionYear: "2024" },
    { name: "Jammu", state: "Jammu & Kashmir", type: "Lok Sabha", currentRepresentative: "Jugal Kishore Sharma", party: "BJP", lastElectionYear: "2024" },
  ],
  HP: [
    { name: "Shimla", state: "Himachal Pradesh", type: "Lok Sabha", currentRepresentative: "Suresh Kashyap", party: "BJP", lastElectionYear: "2024" },
    { name: "Mandi", state: "Himachal Pradesh", type: "Lok Sabha", currentRepresentative: "Kangana Ranaut", party: "BJP", lastElectionYear: "2024" },
    { name: "Hamirpur", state: "Himachal Pradesh", type: "Lok Sabha", currentRepresentative: "Anurag Thakur", party: "BJP", lastElectionYear: "2024" },
    { name: "Kangra", state: "Himachal Pradesh", type: "Lok Sabha", currentRepresentative: "Rajiv Bhardwaj", party: "BJP", lastElectionYear: "2024" },
  ],
  PB: [
    { name: "Amritsar", state: "Punjab", type: "Lok Sabha", currentRepresentative: "Kuldeep Singh Dhaliwal", party: "AAP", lastElectionYear: "2024" },
    { name: "Ludhiana", state: "Punjab", type: "Lok Sabha", currentRepresentative: "Ashok Parashar Pappi", party: "INC", lastElectionYear: "2024" },
    { name: "Jalandhar", state: "Punjab", type: "Lok Sabha", currentRepresentative: "Charanjit Singh Channi", party: "INC", lastElectionYear: "2024" },
    { name: "Patiala", state: "Punjab", type: "Lok Sabha", currentRepresentative: "Dharamvira Gandhi", party: "INC", lastElectionYear: "2024" },
    { name: "Bathinda", state: "Punjab", type: "Lok Sabha", currentRepresentative: "Harsimrat Kaur Badal", party: "SAD", lastElectionYear: "2024" },
  ],
  UK: [
    { name: "Dehradun", state: "Uttarakhand", type: "Lok Sabha", currentRepresentative: "Anil Baluni", party: "BJP", lastElectionYear: "2024" },
    { name: "Haridwar", state: "Uttarakhand", type: "Lok Sabha", currentRepresentative: "Trivendra Singh Rawat", party: "BJP", lastElectionYear: "2024" },
    { name: "Nainital-Udham Singh Nagar", state: "Uttarakhand", type: "Lok Sabha", currentRepresentative: "Ajay Bhatt", party: "BJP", lastElectionYear: "2024" },
    { name: "Tehri Garhwal", state: "Uttarakhand", type: "Lok Sabha", currentRepresentative: "Mala Rajya Laxmi Shah", party: "BJP", lastElectionYear: "2024" },
  ],
  HR: [
    { name: "Gurugram", state: "Haryana", type: "Lok Sabha", currentRepresentative: "Rao Inderjit Singh", party: "BJP", lastElectionYear: "2024" },
    { name: "Faridabad", state: "Haryana", type: "Lok Sabha", currentRepresentative: "Krishan Pal Gurjar", party: "BJP", lastElectionYear: "2024" },
    { name: "Karnal", state: "Haryana", type: "Lok Sabha", currentRepresentative: "Sanjay Bhatia", party: "BJP", lastElectionYear: "2024" },
    { name: "Hisar", state: "Haryana", type: "Lok Sabha", currentRepresentative: "Ranjit Singh", party: "BJP", lastElectionYear: "2024" },
    { name: "Ambala", state: "Haryana", type: "Lok Sabha", currentRepresentative: "Banto Kataria", party: "BJP", lastElectionYear: "2024" },
  ],
  DL: [
    { name: "New Delhi", state: "Delhi", type: "Lok Sabha", currentRepresentative: "Bansuri Swaraj", party: "BJP", lastElectionYear: "2024" },
    { name: "Chandni Chowk", state: "Delhi", type: "Lok Sabha", currentRepresentative: "Praveen Khandelwal", party: "BJP", lastElectionYear: "2024" },
    { name: "East Delhi", state: "Delhi", type: "Lok Sabha", currentRepresentative: "Harsh Malhotra", party: "BJP", lastElectionYear: "2024" },
    { name: "South Delhi", state: "Delhi", type: "Lok Sabha", currentRepresentative: "Ramvir Singh Bidhuri", party: "BJP", lastElectionYear: "2024" },
    { name: "West Delhi", state: "Delhi", type: "Lok Sabha", currentRepresentative: "Kamaljeet Sehrawat", party: "BJP", lastElectionYear: "2024" },
    { name: "North East Delhi", state: "Delhi", type: "Lok Sabha", currentRepresentative: "Manoj Tiwari", party: "BJP", lastElectionYear: "2024" },
    { name: "North West Delhi", state: "Delhi", type: "Lok Sabha", currentRepresentative: "Yogendra Chandolia", party: "BJP", lastElectionYear: "2024" },
  ],
  RJ: [
    { name: "Jaipur", state: "Rajasthan", type: "Lok Sabha", currentRepresentative: "Manju Sharma", party: "BJP", lastElectionYear: "2024" },
    { name: "Jodhpur", state: "Rajasthan", type: "Lok Sabha", currentRepresentative: "Gajendra Singh Shekhawat", party: "BJP", lastElectionYear: "2024" },
    { name: "Udaipur", state: "Rajasthan", type: "Lok Sabha", currentRepresentative: "Mannalal Rawat", party: "BJP", lastElectionYear: "2024" },
    { name: "Kota", state: "Rajasthan", type: "Lok Sabha", currentRepresentative: "Om Birla", party: "BJP", lastElectionYear: "2024" },
    { name: "Ajmer", state: "Rajasthan", type: "Lok Sabha", currentRepresentative: "Bhagirath Choudhary", party: "BJP", lastElectionYear: "2024" },
  ],
  UP: [
    { name: "Varanasi", state: "Uttar Pradesh", type: "Lok Sabha", currentRepresentative: "Narendra Modi", party: "BJP", lastElectionYear: "2024" },
    { name: "Lucknow", state: "Uttar Pradesh", type: "Lok Sabha", currentRepresentative: "Rajnath Singh", party: "BJP", lastElectionYear: "2024" },
    { name: "Kanpur", state: "Uttar Pradesh", type: "Lok Sabha", currentRepresentative: "Ramesh Awasthi", party: "BJP", lastElectionYear: "2024" },
    { name: "Prayagraj", state: "Uttar Pradesh", type: "Lok Sabha", currentRepresentative: "Neeraj Tripathi", party: "BJP", lastElectionYear: "2024" },
    { name: "Agra", state: "Uttar Pradesh", type: "Lok Sabha", currentRepresentative: "S P Singh Baghel", party: "BJP", lastElectionYear: "2024" },
    { name: "Gorakhpur", state: "Uttar Pradesh", type: "Lok Sabha", currentRepresentative: "Ravi Kishan", party: "BJP", lastElectionYear: "2024" },
    { name: "Mathura", state: "Uttar Pradesh", type: "Lok Sabha", currentRepresentative: "Hema Malini", party: "BJP", lastElectionYear: "2024" },
    { name: "Meerut", state: "Uttar Pradesh", type: "Lok Sabha", currentRepresentative: "Arun Govil", party: "BJP", lastElectionYear: "2024" },
    { name: "Ghaziabad", state: "Uttar Pradesh", type: "Lok Sabha", currentRepresentative: "Atul Garg", party: "BJP", lastElectionYear: "2024" },
    { name: "Noida (Gautam Buddha Nagar)", state: "Uttar Pradesh", type: "Lok Sabha", currentRepresentative: "Mahesh Sharma", party: "BJP", lastElectionYear: "2024" },
  ],
  GJ: [
    { name: "Ahmedabad East", state: "Gujarat", type: "Lok Sabha", currentRepresentative: "Hasmukhbhai Patel", party: "BJP", lastElectionYear: "2024" },
    { name: "Ahmedabad West", state: "Gujarat", type: "Lok Sabha", currentRepresentative: "Dineshbhai Makwana", party: "BJP", lastElectionYear: "2024" },
    { name: "Surat", state: "Gujarat", type: "Lok Sabha", currentRepresentative: "Mukesh Dalal", party: "BJP", lastElectionYear: "2024" },
    { name: "Vadodara", state: "Gujarat", type: "Lok Sabha", currentRepresentative: "Hemangini Rawal", party: "BJP", lastElectionYear: "2024" },
    { name: "Rajkot", state: "Gujarat", type: "Lok Sabha", currentRepresentative: "Parshottambhai Rupala", party: "BJP", lastElectionYear: "2024" },
  ],
  MP: [
    { name: "Bhopal", state: "Madhya Pradesh", type: "Lok Sabha", currentRepresentative: "Alok Sharma", party: "BJP", lastElectionYear: "2024" },
    { name: "Indore", state: "Madhya Pradesh", type: "Lok Sabha", currentRepresentative: "Lalwani Vedprakash", party: "BJP", lastElectionYear: "2024" },
    { name: "Gwalior", state: "Madhya Pradesh", type: "Lok Sabha", currentRepresentative: "Bharat Singh Kushwah", party: "BJP", lastElectionYear: "2024" },
    { name: "Jabalpur", state: "Madhya Pradesh", type: "Lok Sabha", currentRepresentative: "Shashank Mani Tripathi", party: "BJP", lastElectionYear: "2024" },
  ],
  BR: [
    { name: "Patna Sahib", state: "Bihar", type: "Lok Sabha", currentRepresentative: "Ravi Shankar Prasad", party: "BJP", lastElectionYear: "2024" },
    { name: "Muzaffarpur", state: "Bihar", type: "Lok Sabha", currentRepresentative: "Raj Bhushan Choudhary", party: "JD(U)", lastElectionYear: "2024" },
    { name: "Darbhanga", state: "Bihar", type: "Lok Sabha", currentRepresentative: "Gopal Jee Thakur", party: "BJP", lastElectionYear: "2024" },
    { name: "Gaya", state: "Bihar", type: "Lok Sabha", currentRepresentative: "Jitan Ram Manjhi", party: "HAM(S)", lastElectionYear: "2024" },
    { name: "Purnia", state: "Bihar", type: "Lok Sabha", currentRepresentative: "Pappu Yadav", party: "INC", lastElectionYear: "2024" },
  ],
  JH: [
    { name: "Ranchi", state: "Jharkhand", type: "Lok Sabha", currentRepresentative: "Sanjay Seth", party: "BJP", lastElectionYear: "2024" },
    { name: "Jamshedpur", state: "Jharkhand", type: "Lok Sabha", currentRepresentative: "Bidyut Baran Mahato", party: "BJP", lastElectionYear: "2024" },
    { name: "Dhanbad", state: "Jharkhand", type: "Lok Sabha", currentRepresentative: "Dulu Mahato", party: "BJP", lastElectionYear: "2024" },
    { name: "Hazaribagh", state: "Jharkhand", type: "Lok Sabha", currentRepresentative: "Manish Jaiswal", party: "BJP", lastElectionYear: "2024" },
  ],
  WB: [
    { name: "Kolkata North", state: "West Bengal", type: "Lok Sabha", currentRepresentative: "Sudip Bandyopadhyay", party: "TMC", lastElectionYear: "2024" },
    { name: "Kolkata South", state: "West Bengal", type: "Lok Sabha", currentRepresentative: "Mala Roy", party: "TMC", lastElectionYear: "2024" },
    { name: "Howrah", state: "West Bengal", type: "Lok Sabha", currentRepresentative: "Prasun Banerjee", party: "TMC", lastElectionYear: "2024" },
    { name: "Barrackpore", state: "West Bengal", type: "Lok Sabha", currentRepresentative: "Partha Bhowmick", party: "TMC", lastElectionYear: "2024" },
    { name: "Diamond Harbour", state: "West Bengal", type: "Lok Sabha", currentRepresentative: "Abhishek Banerjee", party: "TMC", lastElectionYear: "2024" },
    { name: "Siliguri (Darjeeling)", state: "West Bengal", type: "Lok Sabha", currentRepresentative: "Raju Bista", party: "BJP", lastElectionYear: "2024" },
  ],
  OR: [
    { name: "Bhubaneswar", state: "Odisha", type: "Lok Sabha", currentRepresentative: "Aparajita Sarangi", party: "BJP", lastElectionYear: "2024" },
    { name: "Puri", state: "Odisha", type: "Lok Sabha", currentRepresentative: "Sambit Patra", party: "BJP", lastElectionYear: "2024" },
    { name: "Cuttack", state: "Odisha", type: "Lok Sabha", currentRepresentative: "Bhartruhari Mahtab", party: "BJP", lastElectionYear: "2024" },
    { name: "Sambalpur", state: "Odisha", type: "Lok Sabha", currentRepresentative: "Dharmendra Pradhan", party: "BJP", lastElectionYear: "2024" },
  ],
  CT: [
    { name: "Raipur", state: "Chhattisgarh", type: "Lok Sabha", currentRepresentative: "Brijmohan Agrawal", party: "BJP", lastElectionYear: "2024" },
    { name: "Bilaspur", state: "Chhattisgarh", type: "Lok Sabha", currentRepresentative: "Tokhan Sahu", party: "BJP", lastElectionYear: "2024" },
    { name: "Durg", state: "Chhattisgarh", type: "Lok Sabha", currentRepresentative: "Vijay Baghel", party: "BJP", lastElectionYear: "2024" },
  ],
  MH: [
    { name: "Mumbai North", state: "Maharashtra", type: "Lok Sabha", currentRepresentative: "Piyush Goyal", party: "BJP", lastElectionYear: "2024" },
    { name: "Mumbai South", state: "Maharashtra", type: "Lok Sabha", currentRepresentative: "Arvind Sawant", party: "Shiv Sena (UBT)", lastElectionYear: "2024" },
    { name: "Pune", state: "Maharashtra", type: "Lok Sabha", currentRepresentative: "Murlidhar Mohol", party: "BJP", lastElectionYear: "2024" },
    { name: "Nagpur", state: "Maharashtra", type: "Lok Sabha", currentRepresentative: "Nitin Gadkari", party: "BJP", lastElectionYear: "2024" },
    { name: "Thane", state: "Maharashtra", type: "Lok Sabha", currentRepresentative: "Naresh Mhaske", party: "Shiv Sena", lastElectionYear: "2024" },
    { name: "Nashik", state: "Maharashtra", type: "Lok Sabha", currentRepresentative: "Rajabhau Waje", party: "Shiv Sena", lastElectionYear: "2024" },
    { name: "Aurangabad (Chhatrapati Sambhajinagar)", state: "Maharashtra", type: "Lok Sabha", currentRepresentative: "Sandipan Bhumre", party: "Shiv Sena", lastElectionYear: "2024" },
  ],
  GA: [
    { name: "North Goa", state: "Goa", type: "Lok Sabha", currentRepresentative: "Shripad Naik", party: "BJP", lastElectionYear: "2024" },
    { name: "South Goa", state: "Goa", type: "Lok Sabha", currentRepresentative: "Pallavi Dempo", party: "BJP", lastElectionYear: "2024" },
  ],
  TS: [
    { name: "Hyderabad", state: "Telangana", type: "Lok Sabha", currentRepresentative: "Asaduddin Owaisi", party: "AIMIM", lastElectionYear: "2024" },
    { name: "Secunderabad", state: "Telangana", type: "Lok Sabha", currentRepresentative: "G Kishan Reddy", party: "BJP", lastElectionYear: "2024" },
    { name: "Malkajgiri", state: "Telangana", type: "Lok Sabha", currentRepresentative: "Eatala Rajender", party: "BJP", lastElectionYear: "2024" },
    { name: "Chevella", state: "Telangana", type: "Lok Sabha", currentRepresentative: "Konda Vishweshwar Reddy", party: "BJP", lastElectionYear: "2024" },
    { name: "Warangal", state: "Telangana", type: "Lok Sabha", currentRepresentative: "Kadiam Kavya", party: "INC", lastElectionYear: "2024" },
    { name: "Karimnagar", state: "Telangana", type: "Lok Sabha", currentRepresentative: "Bandi Sanjay Kumar", party: "BJP", lastElectionYear: "2024" },
  ],
  AP: [
    { name: "Vijayawada", state: "Andhra Pradesh", type: "Lok Sabha", currentRepresentative: "Kesineni Sivanath", party: "TDP", lastElectionYear: "2024" },
    { name: "Guntur", state: "Andhra Pradesh", type: "Lok Sabha", currentRepresentative: "Chandra Sekhar Pemmasani", party: "TDP", lastElectionYear: "2024" },
    { name: "Visakhapatnam", state: "Andhra Pradesh", type: "Lok Sabha", currentRepresentative: "Sribharat Mathukumilli", party: "TDP", lastElectionYear: "2024" },
    { name: "Tirupati", state: "Andhra Pradesh", type: "Lok Sabha", currentRepresentative: "Gurumoorthy Maddila", party: "TDP", lastElectionYear: "2024" },
    { name: "Rajamahendravaram", state: "Andhra Pradesh", type: "Lok Sabha", currentRepresentative: "Daggubati Purandeswari", party: "TDP", lastElectionYear: "2024" },
    { name: "Nellore", state: "Andhra Pradesh", type: "Lok Sabha", currentRepresentative: "Vemireddy Prabhakar Reddy", party: "TDP", lastElectionYear: "2024" },
  ],
  KA: [
    { name: "Bengaluru South", state: "Karnataka", type: "Lok Sabha", currentRepresentative: "Tejasvi Surya", party: "BJP", lastElectionYear: "2024" },
    { name: "Bengaluru North", state: "Karnataka", type: "Lok Sabha", currentRepresentative: "Shobha Karandlaje", party: "BJP", lastElectionYear: "2024" },
    { name: "Bengaluru Central", state: "Karnataka", type: "Lok Sabha", currentRepresentative: "P C Mohan", party: "BJP", lastElectionYear: "2024" },
    { name: "Mysuru", state: "Karnataka", type: "Lok Sabha", currentRepresentative: "Yaduveer Wadiyar", party: "BJP", lastElectionYear: "2024" },
    { name: "Mangaluru (Dakshina Kannada)", state: "Karnataka", type: "Lok Sabha", currentRepresentative: "Captain Brijesh Chowta", party: "BJP", lastElectionYear: "2024" },
    { name: "Dharwad", state: "Karnataka", type: "Lok Sabha", currentRepresentative: "Pralhad Joshi", party: "BJP", lastElectionYear: "2024" },
  ],
  KL: [
    { name: "Thiruvananthapuram", state: "Kerala", type: "Lok Sabha", currentRepresentative: "Shashi Tharoor", party: "INC", lastElectionYear: "2024" },
    { name: "Ernakulam", state: "Kerala", type: "Lok Sabha", currentRepresentative: "Hibi Eden", party: "INC", lastElectionYear: "2024" },
    { name: "Kozhikode", state: "Kerala", type: "Lok Sabha", currentRepresentative: "M K Raghavan", party: "INC", lastElectionYear: "2024" },
    { name: "Thrissur", state: "Kerala", type: "Lok Sabha", currentRepresentative: "Suresh Gopi", party: "BJP", lastElectionYear: "2024" },
    { name: "Alappuzha", state: "Kerala", type: "Lok Sabha", currentRepresentative: "K C Venugopal", party: "INC", lastElectionYear: "2024" },
    { name: "Kannur", state: "Kerala", type: "Lok Sabha", currentRepresentative: "K Sudhakaran", party: "INC", lastElectionYear: "2024" },
  ],
  TN: [
    { name: "Chennai South", state: "Tamil Nadu", type: "Lok Sabha", currentRepresentative: "Thamizhachi Thangapandian", party: "DMK", lastElectionYear: "2024" },
    { name: "Chennai North", state: "Tamil Nadu", type: "Lok Sabha", currentRepresentative: "Kalanidhi Veeraswamy", party: "DMK", lastElectionYear: "2024" },
    { name: "Chennai Central", state: "Tamil Nadu", type: "Lok Sabha", currentRepresentative: "Dayanidhi Maran", party: "DMK", lastElectionYear: "2024" },
    { name: "Coimbatore", state: "Tamil Nadu", type: "Lok Sabha", currentRepresentative: "Ganapathy Rajkumar", party: "DMK", lastElectionYear: "2024" },
    { name: "Madurai", state: "Tamil Nadu", type: "Lok Sabha", currentRepresentative: "Venkatesan S", party: "CPI(M)", lastElectionYear: "2024" },
    { name: "Salem", state: "Tamil Nadu", type: "Lok Sabha", currentRepresentative: "S R Parthiban", party: "DMK", lastElectionYear: "2024" },
    { name: "Tiruchirappalli", state: "Tamil Nadu", type: "Lok Sabha", currentRepresentative: "Dhanush M Kumar", party: "DMK", lastElectionYear: "2024" },
  ],
  AS: [
    { name: "Guwahati", state: "Assam", type: "Lok Sabha", currentRepresentative: "Bijuli Kalita Medhi", party: "BJP", lastElectionYear: "2024" },
    { name: "Dibrugarh", state: "Assam", type: "Lok Sabha", currentRepresentative: "Sarbananda Sonowal", party: "BJP", lastElectionYear: "2024" },
    { name: "Tezpur", state: "Assam", type: "Lok Sabha", currentRepresentative: "Ranjit Dutta", party: "BJP", lastElectionYear: "2024" },
    { name: "Jorhat", state: "Assam", type: "Lok Sabha", currentRepresentative: "Gaurav Gogoi", party: "INC", lastElectionYear: "2024" },
  ],
  SK: [
    { name: "Sikkim", state: "Sikkim", type: "Lok Sabha", currentRepresentative: "Indra Hang Subba", party: "SKM", lastElectionYear: "2024" },
  ],
  AR: [
    { name: "Arunachal West", state: "Arunachal Pradesh", type: "Lok Sabha", currentRepresentative: "Kiren Rijiju", party: "BJP", lastElectionYear: "2024" },
    { name: "Arunachal East", state: "Arunachal Pradesh", type: "Lok Sabha", currentRepresentative: "Tapir Gao", party: "BJP", lastElectionYear: "2024" },
  ],
  NL: [
    { name: "Nagaland", state: "Nagaland", type: "Lok Sabha", currentRepresentative: "Chumben Murry", party: "NDPP", lastElectionYear: "2024" },
  ],
  MN: [
    { name: "Inner Manipur", state: "Manipur", type: "Lok Sabha", currentRepresentative: "Basanta Kumar Singh", party: "BJP", lastElectionYear: "2024" },
    { name: "Outer Manipur", state: "Manipur", type: "Lok Sabha", currentRepresentative: "Alfred Kanngam Arthur", party: "BJP", lastElectionYear: "2024" },
  ],
  MZ: [
    { name: "Mizoram", state: "Mizoram", type: "Lok Sabha", currentRepresentative: "Richard Vanlalhmangaihsanga", party: "ZPM", lastElectionYear: "2024" },
  ],
  TR: [
    { name: "Tripura West", state: "Tripura", type: "Lok Sabha", currentRepresentative: "Biplab Kumar Deb", party: "BJP", lastElectionYear: "2024" },
    { name: "Tripura East", state: "Tripura", type: "Lok Sabha", currentRepresentative: "Kriti Singh Debbarma", party: "BJP", lastElectionYear: "2024" },
  ],
  ML: [
    { name: "Shillong", state: "Meghalaya", type: "Lok Sabha", currentRepresentative: "Ricky Andrew Syngkon", party: "VPP", lastElectionYear: "2024" },
    { name: "Tura", state: "Meghalaya", type: "Lok Sabha", currentRepresentative: "Saleng A Sangma", party: "NPP", lastElectionYear: "2024" },
  ],
};
