import type { ExperienceItem } from '../types';

export const experienceData: ExperienceItem[] = [
  {
    id: 'exp-mapua',
    code: 'INFILTRATION 01',
    role: 'B.S. in Computer Science (Application Development)',
    organization: 'Mapúa University',
    period: '2023 — PRESENT',
    type: 'ACADEMIC',
    highlights: [
      'Focusing on Software Architecture, Application Development, Operating Systems, and Advanced Algorithms.',
      'Active developer across competitive programming challenges, algorithmic benchmarks, and system prototypes.',
      'Authored interpreters (CSS125P hypothetical language interpreter) and data structure vaults in Python and Java.'
    ],
    techStack: ['Python', 'Java', 'C++', 'Data Structures & Algorithms', 'System Architecture']
  },
  {
    id: 'exp-coss',
    code: 'INFILTRATION 02',
    role: 'Gameplay Programmer & Audio Integration Lead',
    organization: 'UPLB COSS Game Jam (Project: "Sakay Na!")',
    period: 'NOVEMBER 2024',
    type: 'GAME JAM',
    highlights: [
      'Engineered an original rhythm-based simulation game set in Metro Manila traffic within a high-intensity 48-hour deadline.',
      'Programmed custom audio-visual sync mechanics in Unity C# to align player barker calls with dynamic soundtrack beats.',
      'Won acclaim from game jam judges for cultural accuracy, responsive controls, and tight loop mechanics.'
    ],
    techStack: ['Unity Engine', 'C#', 'Audio DSP Sync', 'Photoshop', 'Game Design']
  },
  {
    id: 'exp-algomyth',
    code: 'INFILTRATION 03',
    role: 'Lead Architect & Full-Stack Developer',
    organization: 'Algomyth Project (Gamified LMS)',
    period: '2024 — 2025',
    type: 'SYSTEM ARCHITECTURE',
    highlights: [
      'Architected a full gamified e-learning platform integrating React, TypeScript, Vite, and Supabase.',
      'Engineered real-time code evaluation sandboxes, quest trees, XP level-ups, and student achievement tracking.',
      'Built custom responsive fantasy-themed design systems prioritizing visual delight and zero-friction navigation.'
    ],
    techStack: ['React', 'TypeScript', 'Vite', 'Supabase', 'CSS Architecture']
  },
  {
    id: 'exp-swiftblox',
    code: 'INFILTRATION 04',
    role: 'Creator & Tooling Engineer',
    organization: 'SwiftBloxUI Pipeline',
    period: '2024 — PRESENT',
    type: 'RESEARCH',
    highlights: [
      'Created an automated workflow converting Figma vector designs into production-ready Roblox GuiObjects.',
      'Integrated Figma REST API, TypeScript AST parsing, and Luau code generators synchronized via Rojo.',
      'Eliminated hours of repetitive UI recreation for game designers and independent creators.'
    ],
    techStack: ['TypeScript', 'Luau', 'Figma API', 'Rojo', 'Roblox Studio']
  },
  {
    id: 'exp-acm',
    code: 'INFILTRATION 05',
    role: 'Hackathon Contender & Core Contributor',
    organization: 'ACM Hackathon & Independent Software Lab',
    period: '2023 — 2024',
    type: 'HACKATHON',
    highlights: [
      'Collaborated in rapid sprints developing responsive web applications and full-stack utilities.',
      'Engineered custom productivity tools including BetterBlackboard Chrome Extension and persistent task scratchpads.'
    ],
    techStack: ['JavaScript', 'HTML5/CSS3', 'Git/GitHub', 'Chrome Extension API']
  }
];
