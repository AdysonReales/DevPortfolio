export type PortfolioScreen = 
  | 'title' 
  | 'home' 
  | 'games'
  | 'projects' 
  | 'tools'
  | 'about' 
  | 'skills' 
  | 'experience' 
  | 'contact';

export type TransitionStyle = 'diagonal' | 'red-impact' | 'layered-panel';

export interface Project {
  id: string;
  number: string;
  codeName: string;
  title: string;
  category: 'GAME SYSTEM' | 'WEB APP' | 'TOOL / UTILITY' | 'ALGORITHM & AI' | 'VISUAL NOVEL';
  status: 'COMPLETED' | 'IN DEVELOPMENT' | 'PROTOTYPE' | 'EXPANDING';
  tagline: string;
  description: string;
  techStack: string[];
  role: string;
  features: string[];
  challenges: string;
  results: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  accentColor: string;
  thumbnailType: 'code' | 'game' | 'tree' | 'figma' | 'extension' | 'renpy';
  collection: 'games' | 'projects' | 'tools';
  mediaType?: 'IMAGE PLACEHOLDER' | 'GIF PLACEHOLDER';
}

export interface SkillItem {
  name: string;
  tier: 'MASTER' | 'SPECIALIST' | 'PROFICIENT' | 'EQUIPPED';
  context: string;
  badge?: string;
}

export interface SkillCategory {
  id: string;
  rank: string;
  title: string;
  sub: string;
  description: string;
  skills: SkillItem[];
}

export interface ExperienceItem {
  id: string;
  code: string;
  role: string;
  organization: string;
  period: string;
  type: 'ACADEMIC' | 'GAME JAM' | 'SYSTEM ARCHITECTURE' | 'HACKATHON' | 'RESEARCH';
  highlights: string[];
  techStack: string[];
}
