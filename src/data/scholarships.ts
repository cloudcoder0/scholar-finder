export type SourceCategory = "government" | "nonprofit" | "tech" | "conference" | "organization";

export interface SearchProfile {
  gpa: number;
  state: string;
  fieldOfStudy: string;
  educationLevel: string;
  ethnicity: string;
  financialNeed: string;
  gender: string;
  firstGeneration: boolean;
  militaryStatus: string;
  disabilityStatus: string;
}

export interface Scholarship {
  id: string;
  name: string;
  organization: string;
  amount: string;
  deadline: string;
  sourceCategory: SourceCategory;
  description: string;
  eligibility: {
    minGPA: number;
    states: string[] | "all";
    fields: string[];
  };
  applyUrl: string;
  robotsCompliant: boolean;
  sourceUrl: string;
  source?: "seed" | "ai";
  matchScore?: number;
}

export const SOURCE_LABELS: Record<SourceCategory, string> = {
  government: "Government",
  nonprofit: "Nonprofit",
  tech: "Tech Company",
  conference: "Conference",
  organization: "Organization",
};

export const US_STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut",
  "Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa",
  "Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan",
  "Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire",
  "New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio",
  "Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota",
  "Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia",
  "Wisconsin","Wyoming","District of Columbia",
];

export const FIELDS_OF_STUDY = [
  "Computer Science",
  "Cybersecurity",
  "Engineering",
  "Information Technology",
  "Data Science",
  "Mathematics",
  "Physics",
  "Biology",
  "Chemistry",
  "Business",
  "Nursing / Healthcare",
  "Education",
  "Liberal Arts",
  "Other STEM",
  "Other",
];

export const EDUCATION_LEVELS = [
  "High School Senior",
  "Undergraduate Freshman",
  "Undergraduate Sophomore",
  "Undergraduate Junior",
  "Undergraduate Senior",
  "Graduate (Masters)",
  "Graduate (PhD)",
  "Community College",
];

export const ETHNICITIES = [
  "Prefer not to say",
  "African American / Black",
  "Asian / Pacific Islander",
  "Hispanic / Latino",
  "Native American / Alaska Native",
  "White / Caucasian",
  "Middle Eastern / North African",
  "Multiracial",
  "Other",
];

export const FINANCIAL_NEED_LEVELS = [
  "Not applicable",
  "Under $30,000",
  "$30,000 - $60,000",
  "$60,000 - $90,000",
  "$90,000 - $120,000",
  "Over $120,000",
];

export const GENDERS = [
  "Prefer not to say",
  "Male",
  "Female",
  "Non-binary",
  "Other",
];

export const MILITARY_STATUSES = [
  "None",
  "Active Duty",
  "Veteran",
  "Reserve / National Guard",
  "Military Dependent / Spouse",
];

export const DISABILITY_STATUSES = [
  "None",
  "Physical Disability",
  "Learning Disability",
  "Chronic Illness",
  "Visual / Hearing Impairment",
  "Other",
  "Prefer not to say",
];

export const scholarships: Scholarship[] = [
  {
    id: "1",
    name: "CyberCorps Scholarship for Service (SFS)",
    organization: "National Science Foundation (NSF)",
    amount: "Up to $37,000/year + tuition",
    deadline: "Varies by institution",
    sourceCategory: "government",
    description: "Federal program funding cybersecurity education in exchange for government service. Covers tuition, fees, and provides a generous stipend. Requires commitment to work in a federal, state, or local government cybersecurity role after graduation.",
    eligibility: { minGPA: 3.0, states: "all", fields: ["cybersecurity", "computer science"] },
    applyUrl: "https://www.sfs.opm.gov/",
    robotsCompliant: true,
    sourceUrl: "https://www.nsf.gov/funding/pgm_summ.jsp?pims_id=504991",
  },
  {
    id: "2",
    name: "DoD SMART Scholarship",
    organization: "Department of Defense",
    amount: "Full tuition + $25,000-$38,000 stipend",
    deadline: "December 1",
    sourceCategory: "government",
    description: "Science, Mathematics And Research for Transformation scholarship. Full tuition, stipend, summer internships at DoD facilities, and guaranteed employment after graduation in STEM fields critical to national defense.",
    eligibility: { minGPA: 3.0, states: "all", fields: ["engineering", "computer science", "cybersecurity"] },
    applyUrl: "https://www.smartscholarship.org/smart",
    robotsCompliant: true,
    sourceUrl: "https://www.smartscholarship.org/",
  },
  {
    id: "3",
    name: "NSA Stokes Educational Scholarship Program",
    organization: "National Security Agency",
    amount: "Up to $30,000/year + salary",
    deadline: "October 15",
    sourceCategory: "government",
    description: "Covers tuition and mandatory fees, provides a year-round salary, and guarantees summer internships and post-graduation employment at NSA. Focused on computer science and computer/electrical engineering students.",
    eligibility: { minGPA: 3.0, states: "all", fields: ["computer science", "engineering"] },
    applyUrl: "https://www.intelligencecareers.gov/nsa/nsastokes.html",
    robotsCompliant: true,
    sourceUrl: "https://www.intelligencecareers.gov/",
  },
  {
    id: "4",
    name: "NCWIT Aspirations in Computing Award",
    organization: "National Center for Women & Information Technology",
    amount: "$500 - $10,000",
    deadline: "November",
    sourceCategory: "nonprofit",
    description: "Recognizes young women for their computing-related achievements and interests. Award recipients receive cash awards, access to a peer network, and connections to industry leaders in technology.",
    eligibility: { minGPA: 2.5, states: "all", fields: ["computer science", "cybersecurity", "engineering"] },
    applyUrl: "https://www.aspirations.org/",
    robotsCompliant: true,
    sourceUrl: "https://www.ncwit.org/",
  },
  {
    id: "5",
    name: "AFCEA STEM Scholarship",
    organization: "Armed Forces Communications & Electronics Assoc.",
    amount: "$5,000 - $15,000",
    deadline: "May / November",
    sourceCategory: "organization",
    description: "Supports students pursuing degrees in STEM fields critical to defense and intelligence communities. Open to undergraduate and graduate students enrolled in accredited degree programs.",
    eligibility: { minGPA: 3.0, states: "all", fields: ["engineering", "computer science", "cybersecurity"] },
    applyUrl: "https://www.afcea.org/site/scholarships",
    robotsCompliant: true,
    sourceUrl: "https://www.afcea.org/",
  },
  {
    id: "6",
    name: "Google Generation Scholarship",
    organization: "Google",
    amount: "$10,000",
    deadline: "December",
    sourceCategory: "tech",
    description: "For students from underrepresented groups in tech pursuing computer science or related degrees. Includes access to a retreat with Google engineers, mentorship, and community building opportunities.",
    eligibility: { minGPA: 2.8, states: "all", fields: ["computer science", "engineering"] },
    applyUrl: "https://buildyourfuture.withgoogle.com/scholarships",
    robotsCompliant: true,
    sourceUrl: "https://buildyourfuture.withgoogle.com/",
  },
  {
    id: "7",
    name: "DEF CON / Black Hat Conference Scholarship",
    organization: "DEF CON / Black Hat",
    amount: "Full conference pass + $2,500 travel",
    deadline: "March",
    sourceCategory: "conference",
    description: "Provides free admission and travel support for students studying cybersecurity to attend world-renowned security conferences. Includes networking with industry professionals and hands-on training.",
    eligibility: { minGPA: 2.5, states: "all", fields: ["cybersecurity"] },
    applyUrl: "https://www.defcon.org/",
    robotsCompliant: true,
    sourceUrl: "https://www.defcon.org/",
  },
  {
    id: "8",
    name: "Texas Instruments Engineering Scholarship",
    organization: "Texas Instruments",
    amount: "$10,000",
    deadline: "February",
    sourceCategory: "tech",
    description: "For engineering students in Texas pursuing electrical engineering, computer engineering, or computer science degrees. Includes potential internship opportunities at TI facilities.",
    eligibility: { minGPA: 3.2, states: ["Texas"], fields: ["engineering", "computer science"] },
    applyUrl: "https://www.ti.com/about-ti/citizenship-community/stem-education.html",
    robotsCompliant: true,
    sourceUrl: "https://www.ti.com/",
  },
  {
    id: "9",
    name: "CISA Cybersecurity Workforce Scholarship",
    organization: "Cybersecurity & Infrastructure Security Agency",
    amount: "Up to $20,000",
    deadline: "April",
    sourceCategory: "government",
    description: "Supports students pursuing cybersecurity education to build the federal cybersecurity workforce. Recipients may receive internship placements at CISA and partner agencies.",
    eligibility: { minGPA: 3.0, states: "all", fields: ["cybersecurity", "computer science"] },
    applyUrl: "https://www.cisa.gov/careers",
    robotsCompliant: true,
    sourceUrl: "https://www.cisa.gov/",
  },
  {
    id: "10",
    name: "Virginia Space Grant Consortium STEM Scholarship",
    organization: "NASA / Virginia Space Grant Consortium",
    amount: "$2,000 - $8,500",
    deadline: "February",
    sourceCategory: "government",
    description: "NASA-funded scholarship for Virginia students in STEM fields including engineering and computer science. Part of the broader NASA Space Grant program available through state consortia.",
    eligibility: { minGPA: 3.0, states: ["Virginia"], fields: ["engineering", "computer science"] },
    applyUrl: "https://vsgc.odu.edu/scholarships/",
    robotsCompliant: true,
    sourceUrl: "https://vsgc.odu.edu/",
  },
  {
    id: "11",
    name: "Leidos STEM Scholarship",
    organization: "Leidos",
    amount: "$10,000",
    deadline: "March",
    sourceCategory: "tech",
    description: "For students pursuing degrees in computer science, cybersecurity, or engineering. Leidos focuses on defense, intelligence, and health IT, providing mentorship alongside financial support.",
    eligibility: { minGPA: 3.0, states: "all", fields: ["engineering", "computer science", "cybersecurity"] },
    applyUrl: "https://www.leidos.com/company/esg/stem",
    robotsCompliant: true,
    sourceUrl: "https://www.leidos.com/",
  },
  {
    id: "12",
    name: "Electronic Frontier Foundation Pioneer Awards",
    organization: "Electronic Frontier Foundation",
    amount: "$5,000",
    deadline: "June",
    sourceCategory: "nonprofit",
    description: "Recognizes individuals working to extend freedom and innovation in technology. Includes a financial award and recognition at EFF's annual event, ideal for cybersecurity and digital rights students.",
    eligibility: { minGPA: 2.5, states: "all", fields: ["cybersecurity", "computer science"] },
    applyUrl: "https://www.eff.org/awards/pioneer",
    robotsCompliant: true,
    sourceUrl: "https://www.eff.org/",
  },
  {
    id: "13",
    name: "California State PTA STEM Scholarship",
    organization: "California State PTA",
    amount: "$500 - $2,000",
    deadline: "February",
    sourceCategory: "organization",
    description: "For California residents studying STEM fields. Less competitive due to state-level focus, providing opportunities for students who might be overlooked by national programs.",
    eligibility: { minGPA: 2.5, states: ["California"], fields: ["engineering", "computer science", "cybersecurity"] },
    applyUrl: "https://capta.org/programs-events/scholarships/",
    robotsCompliant: true,
    sourceUrl: "https://capta.org/",
  },
  {
    id: "14",
    name: "Grace Hopper Celebration Scholarship",
    organization: "AnitaB.org",
    amount: "Full conference attendance + $1,500",
    deadline: "March",
    sourceCategory: "conference",
    description: "Covers registration, travel, and lodging for the world's largest gathering of women technologists. Provides unparalleled networking with tech leaders from Fortune 500 companies.",
    eligibility: { minGPA: 2.8, states: "all", fields: ["computer science", "engineering", "cybersecurity"] },
    applyUrl: "https://ghc.anitab.org/attend/scholarships/",
    robotsCompliant: true,
    sourceUrl: "https://anitab.org/",
  },
  {
    id: "15",
    name: "NIST Cybersecurity Fellowship",
    organization: "National Institute of Standards and Technology",
    amount: "Up to $25,000",
    deadline: "January",
    sourceCategory: "government",
    description: "Supports graduate students conducting research in cybersecurity, privacy, and information security. Fellows work alongside NIST researchers on cutting-edge cybersecurity frameworks.",
    eligibility: { minGPA: 3.3, states: "all", fields: ["cybersecurity", "computer science"] },
    applyUrl: "https://www.nist.gov/cybersecurity",
    robotsCompliant: true,
    sourceUrl: "https://www.nist.gov/",
  },
  {
    id: "16",
    name: "NYS STEM Incentive Program",
    organization: "New York State Higher Education Services Corp.",
    amount: "Full SUNY/CUNY tuition",
    deadline: "Rolling",
    sourceCategory: "government",
    description: "Covers full tuition at any SUNY or CUNY institution for top graduates from NY high schools pursuing STEM degrees. Recipients must work in a STEM field in New York for 5 years post-graduation.",
    eligibility: { minGPA: 3.5, states: ["New York"], fields: ["engineering", "computer science", "cybersecurity"] },
    applyUrl: "https://www.hesc.ny.gov/pay-for-college/financial-aid/types-of-financial-aid/nys-grants-scholarships-awards.html",
    robotsCompliant: true,
    sourceUrl: "https://www.hesc.ny.gov/",
  },
  {
    id: "17",
    name: "Palantir Women in Technology Scholarship",
    organization: "Palantir Technologies",
    amount: "$10,000",
    deadline: "January",
    sourceCategory: "tech",
    description: "For women pursuing technical study in engineering, computer science, or a related field. Includes a visit to Palantir HQ and mentorship from engineers building large-scale data platforms.",
    eligibility: { minGPA: 3.0, states: "all", fields: ["computer science", "engineering"] },
    applyUrl: "https://www.palantir.com/careers/students/scholarship/",
    robotsCompliant: true,
    sourceUrl: "https://www.palantir.com/",
  },
  {
    id: "18",
    name: "DARPA Service Academy Cyber Institute Scholarship",
    organization: "Defense Advanced Research Projects Agency",
    amount: "Full funding + research stipend",
    deadline: "March",
    sourceCategory: "government",
    description: "Funds advanced cybersecurity research for students working on DARPA-aligned problems. Includes mentorship from program managers and access to classified research environments.",
    eligibility: { minGPA: 3.5, states: "all", fields: ["cybersecurity", "computer science"] },
    applyUrl: "https://www.darpa.mil/work-with-us/opportunities",
    robotsCompliant: true,
    sourceUrl: "https://www.darpa.mil/",
  },
  {
    id: "19",
    name: "Raytheon Cybersecurity Scholarship",
    organization: "RTX (Raytheon Technologies)",
    amount: "$5,000 - $15,000",
    deadline: "April",
    sourceCategory: "tech",
    description: "For students pursuing cybersecurity or information assurance degrees. Raytheon is a major defense contractor with deep ties to national security cyber operations.",
    eligibility: { minGPA: 3.0, states: "all", fields: ["cybersecurity", "computer science", "engineering"] },
    applyUrl: "https://www.rtx.com/our-company/corporate-responsibility/stem-education",
    robotsCompliant: true,
    sourceUrl: "https://www.rtx.com/",
  },
  {
    id: "20",
    name: "IEEE Computer Society Richard E. Merwin Scholarship",
    organization: "IEEE Computer Society",
    amount: "$5,000",
    deadline: "October",
    sourceCategory: "organization",
    description: "For active student members of IEEE Computer Society demonstrating leadership in computer science and engineering. Provides professional development and conference attendance support.",
    eligibility: { minGPA: 2.5, states: "all", fields: ["computer science", "engineering"] },
    applyUrl: "https://www.computer.org/volunteering/awards/scholarships/merwin",
    robotsCompliant: true,
    sourceUrl: "https://www.computer.org/",
  },
  {
    id: "21",
    name: "ISC2 Cybersecurity Scholarship",
    organization: "International Information System Security Certification Consortium",
    amount: "Up to $5,000",
    deadline: "March",
    sourceCategory: "nonprofit",
    description: "Supports students pursuing cybersecurity degrees or certifications. ISC2 is the organization behind the CISSP certification and is deeply embedded in the cybersecurity professional community.",
    eligibility: { minGPA: 2.8, states: "all", fields: ["cybersecurity"] },
    applyUrl: "https://www.isc2.org/landing/scholarship",
    robotsCompliant: true,
    sourceUrl: "https://www.isc2.org/",
  },
  {
    id: "22",
    name: "Lockheed Martin STEM Scholarship",
    organization: "Lockheed Martin",
    amount: "$10,000",
    deadline: "March",
    sourceCategory: "tech",
    description: "For underrepresented students in STEM fields. Lockheed Martin pairs financial support with mentorship from engineers working on aerospace, defense, and cybersecurity projects.",
    eligibility: { minGPA: 2.8, states: "all", fields: ["engineering", "computer science", "cybersecurity"] },
    applyUrl: "https://www.lockheedmartin.com/en-us/who-we-are/communities/stem-education.html",
    robotsCompliant: true,
    sourceUrl: "https://www.lockheedmartin.com/",
  },
  {
    id: "23",
    name: "Florida Space Grant Consortium Fellowship",
    organization: "NASA / Florida Space Grant Consortium",
    amount: "$5,000 - $10,000",
    deadline: "January",
    sourceCategory: "government",
    description: "NASA-funded fellowship for Florida students in aerospace engineering, CS, and related fields. Fellows participate in NASA-affiliated research and attend consortium symposiums.",
    eligibility: { minGPA: 3.0, states: ["Florida"], fields: ["engineering", "computer science"] },
    applyUrl: "https://floridaspacegrant.org/scholarships/",
    robotsCompliant: true,
    sourceUrl: "https://floridaspacegrant.org/",
  },
  {
    id: "24",
    name: "ACM SIGCHI Gary Marsden Travel Award",
    organization: "Association for Computing Machinery",
    amount: "$3,000",
    deadline: "Rolling",
    sourceCategory: "conference",
    description: "Supports students from developing economies attending ACM CHI and related conferences. Covers registration, travel, and accommodation for presenting research in human-computer interaction.",
    eligibility: { minGPA: 2.5, states: "all", fields: ["computer science", "engineering"] },
    applyUrl: "https://sigchi.org/get-involved/gary-marsden-travel-awards/",
    robotsCompliant: true,
    sourceUrl: "https://sigchi.org/",
  },
  {
    id: "25",
    name: "Northrop Grumman Engineering Scholars Program",
    organization: "Northrop Grumman",
    amount: "$10,000",
    deadline: "January",
    sourceCategory: "tech",
    description: "Targets students in computer science, systems engineering, and cybersecurity at select partner universities. Includes internship pipeline and mentorship from defense industry engineers.",
    eligibility: { minGPA: 3.0, states: "all", fields: ["engineering", "computer science", "cybersecurity"] },
    applyUrl: "https://www.northropgrumman.com/corporate-responsibility/northrop-grumman-foundation/",
    robotsCompliant: true,
    sourceUrl: "https://www.northropgrumman.com/",
  },
  {
    id: "26",
    name: "Colorado OEDIT Advanced Industries Student Grant",
    organization: "Colorado Office of Economic Development",
    amount: "Up to $15,000",
    deadline: "Rolling",
    sourceCategory: "government",
    description: "Colorado state grant supporting students in advanced industries including IT, cybersecurity, and engineering. Funds can be used for research projects and capstone work.",
    eligibility: { minGPA: 2.8, states: ["Colorado"], fields: ["engineering", "computer science", "cybersecurity"] },
    applyUrl: "https://oedit.colorado.gov/advanced-industries",
    robotsCompliant: true,
    sourceUrl: "https://oedit.colorado.gov/",
  },
  {
    id: "27",
    name: "RSA Conference Security Scholar",
    organization: "RSA Conference",
    amount: "Full pass + $3,000 stipend",
    deadline: "October",
    sourceCategory: "conference",
    description: "Provides full access to one of the world's premier cybersecurity conferences. Scholars attend sessions, network with CISOs and security researchers, and gain exposure to cutting-edge security technologies.",
    eligibility: { minGPA: 2.8, states: "all", fields: ["cybersecurity", "computer science"] },
    applyUrl: "https://www.rsaconference.com/programs/security-scholar",
    robotsCompliant: true,
    sourceUrl: "https://www.rsaconference.com/",
  },
  {
    id: "28",
    name: "Michigan Engineering Scholarship",
    organization: "Michigan Economic Development Corporation",
    amount: "$5,000 - $10,000",
    deadline: "April",
    sourceCategory: "government",
    description: "State-funded scholarship for Michigan residents pursuing engineering and technology degrees at Michigan institutions. Aimed at retaining STEM talent within the state.",
    eligibility: { minGPA: 3.0, states: ["Michigan"], fields: ["engineering", "computer science"] },
    applyUrl: "https://www.michigan.gov/leo/bureaus-agencies/wd",
    robotsCompliant: true,
    sourceUrl: "https://www.michigan.gov/",
  },
  {
    id: "29",
    name: "SANS Institute CyberStart Scholarship",
    organization: "SANS Institute",
    amount: "Up to $10,000 in training",
    deadline: "March",
    sourceCategory: "organization",
    description: "Provides cybersecurity training and certification scholarships. SANS is the world's leading cybersecurity training organization, and recipients gain access to elite courses valued at thousands of dollars.",
    eligibility: { minGPA: 2.5, states: "all", fields: ["cybersecurity"] },
    applyUrl: "https://www.sans.org/scholarship/",
    robotsCompliant: true,
    sourceUrl: "https://www.sans.org/",
  },
  {
    id: "30",
    name: "Washington State Opportunity Scholarship (WSOS)",
    organization: "Washington State Opportunity Scholarship",
    amount: "Up to $22,500 total",
    deadline: "February",
    sourceCategory: "government",
    description: "For Washington state residents pursuing STEM or healthcare degrees. Funded by the state and matching private contributions from companies like Microsoft and Boeing.",
    eligibility: { minGPA: 2.75, states: ["Washington"], fields: ["engineering", "computer science", "cybersecurity"] },
    applyUrl: "https://waopportunityscholarship.org/",
    robotsCompliant: true,
    sourceUrl: "https://waopportunityscholarship.org/",
  },
];

function isExpired(deadline: string): boolean {
  if (deadline === "Rolling" || deadline.startsWith("Varies")) return false;
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const monthIdx = months.indexOf(deadline);
  if (monthIdx !== -1) {
    const now = new Date();
    return now.getMonth() > monthIdx;
  }
  const d = new Date(deadline);
  if (!isNaN(d.getTime())) return d < new Date();
  return false;
}

export function calculateMatchScore(scholarship: Scholarship, profile: SearchProfile): number {
  let score = 0;
  let totalWeight = 0;

  // GPA match (weight: 25) — how far above the minimum
  totalWeight += 25;
  if (profile.gpa >= scholarship.eligibility.minGPA) {
    const gpaBuffer = profile.gpa - scholarship.eligibility.minGPA;
    // Perfect if 0.5+ above min, scales linearly
    score += 25 * Math.min(1, 0.5 + gpaBuffer / 1.0);
  }

  // State match (weight: 20)
  totalWeight += 20;
  if (scholarship.eligibility.states === "all") {
    score += 20; // universal = full match
  } else if (scholarship.eligibility.states.includes(profile.state)) {
    score += 20;
  }

  // Field of study match (weight: 30)
  totalWeight += 30;
  if (scholarship.eligibility.fields.length > 0 && profile.fieldOfStudy) {
    const userField = profile.fieldOfStudy.toLowerCase();
    const matched = scholarship.eligibility.fields.some(
      (f) => userField.includes(f.toLowerCase()) || f.toLowerCase().includes(userField)
    );
    if (matched) {
      score += 30;
    } else {
      // Partial credit for adjacent STEM fields
      const stemFields = ["computer science", "engineering", "cybersecurity", "data science", "information technology", "mathematics", "other stem"];
      const isUserStem = stemFields.some((sf) => userField.includes(sf));
      const isScholarshipStem = scholarship.eligibility.fields.some((f) =>
        stemFields.includes(f.toLowerCase())
      );
      if (isUserStem && isScholarshipStem) {
        score += 15; // partial STEM adjacency
      }
    }
  }

  // Description keyword matching for demographic factors (weight: 25)
  totalWeight += 25;
  const desc = scholarship.description.toLowerCase();
  const name = scholarship.name.toLowerCase();
  let demographicHits = 0;
  let demographicChecks = 0;

  // Gender relevance
  if (profile.gender && profile.gender !== "Prefer not to say") {
    demographicChecks++;
    if (profile.gender === "Female" && (desc.includes("women") || desc.includes("female") || name.includes("women"))) {
      demographicHits++;
    } else if (!desc.includes("women") && !desc.includes("female") && !name.includes("women")) {
      demographicHits += 0.7; // neutral scholarship = decent match
    }
  }

  // First generation
  if (profile.firstGeneration) {
    demographicChecks++;
    if (desc.includes("first-gen") || desc.includes("first generation")) {
      demographicHits++;
    } else {
      demographicHits += 0.5;
    }
  }

  // Financial need
  if (profile.financialNeed && profile.financialNeed !== "Not applicable") {
    demographicChecks++;
    const lowIncome = profile.financialNeed === "Under $30,000" || profile.financialNeed === "$30,000 - $60,000";
    if (lowIncome && (desc.includes("need-based") || desc.includes("financial need") || desc.includes("low-income") || desc.includes("underrepresented"))) {
      demographicHits++;
    } else {
      demographicHits += 0.5;
    }
  }

  // Military status
  if (profile.militaryStatus && profile.militaryStatus !== "None") {
    demographicChecks++;
    if (desc.includes("military") || desc.includes("veteran") || desc.includes("defense") || name.includes("dod")) {
      demographicHits++;
    } else {
      demographicHits += 0.3;
    }
  }

  // Ethnicity / underrepresented
  if (profile.ethnicity && profile.ethnicity !== "Prefer not to say" && profile.ethnicity !== "White / Caucasian") {
    demographicChecks++;
    if (desc.includes("underrepresented") || desc.includes("minority") || desc.includes("diversity")) {
      demographicHits++;
    } else {
      demographicHits += 0.5;
    }
  }

  if (demographicChecks > 0) {
    score += 25 * (demographicHits / demographicChecks);
  } else {
    score += 18; // no demographic data = neutral score
  }

  return Math.round((score / totalWeight) * 100);
}

export function findScholarships(gpa: number, state: string, profile?: Partial<SearchProfile>): Scholarship[] {
  const fullProfile: SearchProfile = {
    gpa,
    state,
    fieldOfStudy: "",
    educationLevel: "",
    ethnicity: "",
    financialNeed: "",
    gender: "",
    firstGeneration: false,
    militaryStatus: "",
    disabilityStatus: "",
    ...profile,
  };

  return scholarships
    .filter((s) => {
      if (isExpired(s.deadline)) return false;
      if (gpa < s.eligibility.minGPA) return false;
      if (s.eligibility.states === "all") return true;
      return s.eligibility.states.includes(state);
    })
    .map((s) => ({
      ...s,
      source: "seed" as const,
      matchScore: calculateMatchScore(s, fullProfile),
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
}
