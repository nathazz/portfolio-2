import { Code, Palette, Zap } from 'lucide-react';
import logoScraper from '/assets/images/banners/logoScraper.png'
import logoMedTime from '/assets/images/banners/medtime.svg'
import logoJob from '/assets/images/banners/where_is_job.svg'
import logoEtherWatch from '/assets/images/banners/etherWatch.png'
import logoPortfolio1 from '/assets/images/banners/user.png'
import logoPwaNotes from  '/assets/images/banners/logoPwa.png'
import type { IRepoResponse } from '../services/github';

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
      date: 'Jul 2024 – Jun 2025',
      location: 'Remote, United States',
      description: `Contributed to a blockchain-based gaming platform by enhancing the UI, integrating TON and Telegram crypto wallets, and optimizing performance with React Query. Improved user experience with real-time feedback systems and resolved key UI/UX bugs. On the backend, optimized SQL for features like rankings and lobbies, worked on TON-based microservices for payouts, and supported development of real-time systems and automation bots.`,
      tech: ['React', 'Node.js', 'TypeScript', 'Golang', 'PostgreSQL', 'AWS', 'Docker'],
    },
  ];


export const images: Record<number, string> = {
  994994606: logoEtherWatch,
  1028620732: logoPwaNotes,
  978289300: logoScraper,
  1005165341: logoEtherWatch, 
  687245167: logoMedTime,
  736647382: logoPortfolio1, 
  620526289: logoJob,
};

export const customRepoData: Record<number, Partial<IRepoResponse>> = {
  736647382:{
   description:"My first portfolio. i used React, i18n, and Styled-Components",
    homepage: "https://meu-portifolio-8bca8.web.app/"
  },
  1005165341: {
    description: "Frontend app for monitoring the Ethereum network, providing real-time gas prices, market data, Ethereum info, and live pending transactions via WebSockets. Supports MetaMask integration for transactions and balance checks."
  },
  994994606: {
    description: "Backend service for etherWatch providing real-time Ethereum network data via REST and WebSocket. Features pending transaction streaming, MetaMask authentication, Zod validation, and Docker-ready deployment."
  },
  687245167: {
    homepage: "https://drive.google.com/file/d/1huyPXqLWxL6mx4KtxoAj4uqE6Ap5Nd0G/view?usp=sharing",
    description: 'An Android app built with Android Studio and Kotlin to help users take their medications on time, featuring local CRUD functionality for easy management.',
    topics: ["SQL-lite", "Android Studio", "Compose"],
  },
  620526289: {
    homepage: "https://drive.google.com/file/d/1XatbBKi-elad0EBpYIkFzQo0wCAuSWTJ/view?usp=share_link", 
    description: '(en: Where is my Work?) Using the Dart language and the Flutter framework, the goal of this project is to help users find job opportunities in their region. Feel free to explore the source code.',
    topics: ['Dart', 'firebase storage', 'flutter'],
  },
};