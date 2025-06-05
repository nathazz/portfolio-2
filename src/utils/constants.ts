import { Code, Palette, Zap } from 'lucide-react';
import logoScraper from '/assets/images/banners/logoScraper.png'
import logoMedTime from '/assets/images/banners/medtime.svg'
import logoJob from '/assets/images/banners/where_is_job.svg'

export const sections = ['home', 'about', 'projects', 'experience', 'contact'];

 export const skills = [
    { name: "Frontend", icon: Code, items: ["React", "TypeScript", "React-Query"] },
    { name: "Backend", icon: Zap, items: ["Node.js", "Golang", "SQl", "NoSQL", "Tests"] },
    { name: "Others", icon: Palette, items: ["Figma", "Docker", "Linux", "Orm's"] }
  ];


export const experiences = [
    {
      company: 'ScoreMilk',
      link: 'https://www.scoremilk.com/',
      role: 'Full Stack Developer',
      date: 'Jul 2024 – Present',
      location: 'Remote, United States',
      description: `Contributed to a blockchain-based gaming platform by enhancing the UI, integrating TON and Telegram crypto wallets, and optimizing performance with React Query. Improved user experience with real-time feedback systems and resolved key UI/UX bugs. On the backend, optimized SQL for features like rankings and lobbies, worked on TON-based microservices for payouts, and supported development of real-time systems and automation bots.`,
      tech: ['React', 'Node.js', 'TypeScript', 'Golang', 'PostgreSQL', 'AWS', 'Docker'],
    },
  ];


export const projects = [
    {
      title: "Etf-Scraper",
      description: "A web scraper and REST API for extracting real-time data on ETFs (Exchange-Traded Funds) from TrackingDifferences.com.",
      image: logoScraper,
      tech: ["Golang", "Colly", "GinGonic"],
      github: "https://github.com/nathazz/etf-scraper-api",
      live: "https://etf-scraper.up.railway.app/"
    },
    {
      title: "MedTime",
      description: "An Android app built with Android Studio and Kotlin to help users take their medications on time, featuring local CRUD functionality for easy management.",
      image:logoMedTime,
      tech: ["Kotlin", "Mobile App", "Android Studio", "Compose"],
      github: "https://github.com/nathazz/MedTime",
      Apk: "https://drive.google.com/file/d/1huyPXqLWxL6mx4KtxoAj4uqE6Ap5Nd0G/view?usp=sharing"
    },
    {
      title: "Cadê meu trampo? ( Where is my Job?)",
      description: "Using the Dart language and the Flutter framework, the goal of this project is to help users find job opportunities in their region. Feel free to explore the source code.",
      image: logoJob,
      tech: ["Dart", "Firebase", "Flutter"],
      github: "https://github.com/nathazz/Projeto-Cade-Meu-Trampo",
      Apk: "https://drive.google.com/file/d/1XatbBKi-elad0EBpYIkFzQo0wCAuSWTJ/view?usp=share_link"
    }
  ];