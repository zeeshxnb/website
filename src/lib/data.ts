import type { PersonalInfo, TimelineEvent, SkillCategory, Project, Book } from "./types";

export const personalInfo: PersonalInfo = {
  name: "Zeeshan Babul",
  initials: "ZB",
  tagline: "Data Science student at UC Irvine, building at the intersection of ML and software.",
  bio: "I study Data Science at UC Irvine (graduating June 2027) and spend most of my time building things that sit at the edge of machine learning and engineering. I have shipped a Bayesian-optimized trading algorithm, mapped fast food access for 6.8M students, analyzed 3D cell imaging data, and built products people actually use. Currently VP of Data@UCI and always working on something new.",
  status: "B.S. Data Science @ UC Irvine, Class of 2027",
  email: "zbabul@uci.edu",
  github: "https://github.com/zeeshxnb",
  linkedin: "https://linkedin.com/in/zeeshanbabul",
  location: "Irvine, CA",
};

export const timelineEvents: TimelineEvent[] = [
  {
    id: "1",
    year: "May – Sept 2025",
    title: "Machine Learning Engineer Intern",
    organization: "Atoma",
    type: "work",
    summary: "Built a Bayesian-optimized trading algorithm with a 96.8% win rate and 22.1% annualized returns.",
    details:
      "Processed 423k one-minute AAPL bars through a Bayesian-optimized trading algorithm. Achieved a 96.8% win rate via automated dynamic position sizing and technical indicator optimization. Ran scikit-optimize hyperparameter search across 100 iterations, reducing max drawdown to 6.3%. Deployed a real-time execution engine with IBKR commission modeling, quantifying $2.71 cost per trade.",
  },
  {
    id: "2",
    year: "Mar – Aug 2025",
    title: "Biostatistics Student Researcher",
    organization: "UCI Donald Bren School of ICS",
    type: "work",
    summary: "Cut 3D image processing runtime by 39% and generated 225 synthetic z-slices using OpenCV.",
    details:
      "Accelerated 3D cost evaluation via per-slice parallel L2, cached old-costs, and exact ROI diffs, cutting runtime by 39%. Applied Gaussian blur and z-stack calibration on 33 slices using OpenCV, sharpening cell boundaries by 45%. Built a thread-local dual Mersenne Twister + LCG framework for deterministic cell perturbation. Generated 225 synthetic z-slices from 33 inputs via z-scaling and Gaussian pre-processing.",
  },
  {
    id: "3",
    year: "Jul 2024 – Present",
    title: "Vice President",
    organization: "Data@UCI",
    type: "achievement",
    summary: "Grew the club, raised $17k+ in sponsorships, and ran a 250-person Datathon.",
    details:
      "Developed strategies that generated over $17,000 in club revenue. Created automated systems to build 5,000+ contacts, leading to a 40% increase in sponsorships. Planned and executed an annual Datathon for 250 participants, a 75% attendance increase from the previous year.",
  },
  {
    id: "4",
    year: "Sept 2024 – Mar 2025",
    title: "Public Health Data Science Research Assistant",
    organization: "UC Irvine, School of ICS",
    type: "work",
    summary: "Built a Python ETL pipeline analyzing fast food access for 6.8M students across 40k schools.",
    details:
      "Built a Python ETL pipeline merging 2.33M student fitness records with 37,210 geocoded fast food outlets. Ran geospatial proximity analysis across 40,908 schools, finding 62.8% had fast food within one mile. Quantified fast food exposure for 6.8M students through statewide geographic correlation analysis. Automated six demographic dashboards identifying 25,704 high-exposure schools for targeted obesity prevention.",
  },
  {
    id: "5",
    year: "Sep 2023 – Jun 2027",
    title: "B.S. Data Science",
    organization: "University of California, Irvine",
    type: "education",
    summary: "GPA: 3.7 · Dean's Honor List, 5x · Expected June 2027.",
    details:
      "Studying Data Science with coursework in Machine Learning and Data Mining, Neural Networks and Deep Learning, Statistical Data Analysis, Data Structures, Algorithm Analysis, Data Management, and Information Retrieval. Dean's Honor List for five consecutive quarters.",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    name: "Languages",
    skills: ["Python", "C++", "R", "SQL", "TypeScript", "JavaScript"],
  },
  {
    name: "ML and Data",
    skills: ["PyTorch", "TensorFlow", "scikit-learn", "XGBoost", "pandas", "NumPy", "matplotlib", "tidyverse"],
  },
  {
    name: "Backend",
    skills: ["FastAPI", "Flask", "Node.js", "PostgreSQL", "SQLAlchemy", "REST APIs", "ETL"],
  },
  {
    name: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "TypeScript"],
  },
  {
    name: "DevOps and Tools",
    skills: ["AWS", "Docker", "Git", "GitHub Actions", "CI/CD", "Jupyter", "Tableau", "Power BI"],
  },
];

export const books: Book[] = [
  { title: "Think and Grow Rich", author: "Napoleon Hill", isbn: "9781585424337" },
  { title: "Hamlet", author: "William Shakespeare", isbn: "9780743477123" },
  { title: "Getting to Yes", author: "Roger Fisher & William Ury" },
  { title: "Stop Overthinking", author: "Nick Trenton", isbn: "9781647432508" },
  { title: "Meditations", author: "Marcus Aurelius", isbn: "9780812968255" },
  { title: "How to Win at College", author: "Cal Newport" },
  { title: "Essentialism", author: "Greg McKeown", isbn: "9780804137386" },
  { title: "How to Read Literature Like a Professor", author: "Thomas C. Foster" },
  { title: "The Namesake", author: "Jhumpa Lahiri", isbn: "9780395927212" },
  { title: "Why We Sleep", author: "Matthew Walker", isbn: "9781501144325" },
  { title: "Fahrenheit 451", author: "Ray Bradbury", isbn: "9781451673319" },
  { title: "The 4-Hour Workweek", author: "Timothy Ferriss", isbn: "9780307465351" },
  { title: "The Book of Joy", author: "Dalai Lama & Desmond Tutu", isbn: "9780399185045" },
  { title: "Can't Hurt Me", author: "David Goggins", isbn: "9781544512280" },
  { title: "The Practicing Stoic", author: "Ward Farnsworth", isbn: "9781567926118" },
  { title: "Breath", author: "James Nestor", isbn: "9780735213616" },
  { title: "The Art of Impossible", author: "Steven Kotler", isbn: "9780062977533" },
  { title: "The Sixth Man", author: "Andre Iguodala", isbn: "9780525533986" },
  { title: "The Knack", author: "Norm Brodsky & Bo Burlingham", coverUrl: "https://books.google.com/books/content?id=nLkNjsO7nIIC&printsec=frontcover&img=1&zoom=5" },
  { title: "Outlive", author: "Peter Attia", isbn: "9780593236598" },
  { title: "Feel Good Productivity", author: "Ali Abdaal" },
  { title: "Good to Great", author: "Jim Collins", isbn: "9780066620992" },
  { title: "Extreme Ownership", author: "Jocko Willink", isbn: "9781250183866" },
  { title: "The Slight Edge", author: "Jeff Olson", isbn: "9781626340466" },
  { title: "Irresistible", author: "Adam Alter", isbn: "9780735222847" },
  { title: "What If?", author: "Randall Munroe", isbn: "9781848549562" },
  { title: "What If? 2", author: "Randall Munroe", isbn: "9780525537113" },
  { title: "The Power of Now", author: "Eckhart Tolle", isbn: "9781577314806" },
  { title: "How To", author: "Randall Munroe", isbn: "9780525537090" },
  { title: "Slow Productivity", author: "Cal Newport", isbn: "9780593544853" },
  { title: "The 12 Week Year", author: "Brian Moran", isbn: "9781118509234" },
];

export const projects: Project[] = [
  {
    id: "1",
    title: "Clipt",
    description:
      "Multi-track video editor with drag-and-drop timeline, auto-snapping, linked audio/video tracks, collision detection, and an AI caption editor supporting 100+ fonts with drag-based word timing.",
    tags: ["React", "TypeScript", "Node.js", "FFmpeg", "OpenAI"],
    github: "https://github.com/zeeshxnb",
    featured: true,
  },
  {
    id: "2",
    title: "ScrapIt",
    description:
      "Gmail classifier with 95% accuracy via OpenAI, NLP chatbot handling 15 intent classes at 200ms, analytics dashboard over 10k+ emails, JWT auth, and a 95 Lighthouse score frontend.",
    tags: ["Python", "FastAPI", "React", "TypeScript", "OpenAI", "PostgreSQL"],
    github: "https://github.com/zeeshxnb/ScrapIt",
    featured: true,
  },
  {
    id: "3",
    title: "Rent Recon",
    description:
      "Chrome extension that flags fraudulent Facebook Marketplace rental listings. Cross-references Rentcast and Zillow data, runs Gemini NLP and image analysis, and outputs a 0-100 fraud risk score with evidence.",
    tags: ["React", "TypeScript", "Python", "FastAPI", "Gemini API", "Chrome Extension"],
    github: "https://github.com/zeeshxnb/rentrecon",
    live: "https://devpost.com/software/rentrecon",
    featured: true,
  },
];
