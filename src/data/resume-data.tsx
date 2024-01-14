import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Sarthak Duggal",
  initials: "SD",
  location: "Bangalore, India",
  locationLink: "https://www.google.com/maps/place/Bengaluru",
  about:
    "Full Stack Engineer focused on building products with extra attention to detail",
  summary:
    "Full Stack Software Engineer with a passion for creating innovative solutions. Experienced in building scalable and efficient web applications using a diverse tech stack including Python, JavaScript, React, and Node.js. Skilled in optimizing backend processes, enhancing user experiences, and delivering impactful results. Eager to contribute expertise to dynamic projects and collaborate with like-minded professionals.",
  avatarUrl: "https://avatars.githubusercontent.com/u/52778617?v=4",
  personalWebsiteUrl: "https://sardug10.github.io/personal-portfolio/",
  contact: {
    email: "duggal.sarthak12@gmail.com",
    tel: "+48530213401",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/sardug10",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/sarthak-duggal/",
        icon: LinkedInIcon,
      },
      {
        name: "X",
        url: "https://x.com/SarthakDuggal",
        icon: XIcon,
      },
    ],
  },
  education: [
    {
      school: "Guru Gobind Singh Indraprastha University",
      degree: "Bachelor's Degree in Computer Science",
      start: "2018",
      end: "2022",
      cgpa: "8.6",
    },
  ],
  work: [
    {
      company: "Tifin Fintech",
      link: "https://tifin.com/",
      badges: ["Bangalore, India"],
      title: "Full Stack Developer",
      start: "2021",
      end: "Present",
      description: [
        "Managed and maintained a central User microservice written in Node.js (Typescript) and Prisma ORM, ensuring reliability and efficiency in user-related functionalities.",
        "Optimized data import processes from various CRMs like Redtail into our database by refining SQL queries and ORM functions across multiple microservices. This resulted in a substantial reduction in the rows read count, decreasing it from more than 10 million to less than 10 million. Additionally, CPU usage of the Database was lowered from over 90% to less than 10%.",
        "Rewrote and optimized legacy PHP code in Python FastAPI, enhancing system performance and maintainability.",
        "Led the development of a platform analytics feature utilized by enterprise firms, providing valuable insights and data-driven decision-making capabilities.",
        "Optimized analytics APIs by implementing efficient caching mechanisms using Redis, resulting in improved response times by almost 80%.",
        "Developed multiple client-facing features, incorporating advanced React technologies such as React Hook Forms and React Query to deliver a complex user interface.",
        "Refactored and optimized large React codebases, resolving multiple production-level bugs and improving overall code quality.",
      ],
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React/Next.js",
    "Golang",
    "Node.js",
    "GraphQL",
    "FastAPI",
    "SQL/PostgreSQL",
    "MongoDB",
    "SQLAlchemy",
    "Prisma",
  ],
  articles: [
    {
      title: "How to Implement Logging with Pino-logger",
      techStack: ["Node.js", "Logging"],
      description:
        "It covers the fundamentals of logging in Node.js applications, focusing on using Pino-logger. The article walks through setting up a project, installing Pino, creating a logger service, configuring logs, and storing logs in a file. It's aimed at developers with some Node.js experience and provides practical steps for implementing efficient logging in their applications.      ",
      link: {
        label: "https://css-tricks.com/",
        href: "https://css-tricks.com/how-to-implement-logging-in-a-node-js-application-with-pino-logger/",
      },
    },
    {
      title: "Build a custom sticky navbar with CSS",
      techStack: ["SCSS", "Navbar", "Media-queries"],
      description:
        "It guides readers on creating a responsive, sticky navigation bar using HTML, SCSS, and minimal JavaScript. It covers various aspects such as styling for different screen sizes, incorporating a hamburger menu for mobile views, and differences between sticky and fixed navbar positions. The post includes detailed code snippets and explanations, making it a practical resource for web developers looking to enhance their site navigation",
      link: {
        label: "https://blog.logrocket.com/",
        href: "https://blog.logrocket.com/build-custom-sticky-navbar-css/",
      },
    },
    {
      title: "How Node.js works behind the scenes?",
      techStack: ["Node.js", "Event loop"],
      description:
        "An article giving you insights into How Node.js works behind the scenes in a very simple manner.",
      link: {
        label:
          "https://www.geeksforgeeks.org/how-node-js-works-behind-the-scene/",
        href: "https://www.geeksforgeeks.org/how-node-js-works-behind-the-scene/",
      },
    },
  ],
} as const;
