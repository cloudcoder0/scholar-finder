export type SourceCategory = "government" | "nonprofit" | "tech" | "conference" | "organization";

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
];

export function findScholarships(gpa: number, state: string): Scholarship[] {
  return scholarships.filter((s) => {
    if (gpa < s.eligibility.minGPA) return false;
    if (s.eligibility.states === "all") return true;
    return s.eligibility.states.includes(state);
  });
}
