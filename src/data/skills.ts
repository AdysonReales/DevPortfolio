import type { SkillCategory } from '../types';

export const skillsData: SkillCategory[] = [
  {
    id: 'frontend',
    rank: 'RANK 01',
    title: 'APPLICATION FRONTEND',
    sub: 'USER INTERFACE & KINETICS',
    description: 'Engineering responsive, high-framerate, visually unapologetic interfaces with modern frameworks and type safety.',
    skills: [
      { name: 'React', tier: 'MASTER', context: 'Component architecture, state patterns, hook lifecycles, Vite bundling' },
      { name: 'TypeScript', tier: 'MASTER', context: 'Strict typing, generic abstractions, robust API contracts' },
      { name: 'JavaScript (ESNext)', tier: 'MASTER', context: 'Asynchronous event loops, DOM manipulation, performance profiling' },
      { name: 'HTML5 & Modern CSS3', tier: 'MASTER', context: 'CSS clip-path, transforms, keyframes, custom grid/flex layouts' },
      { name: 'Three.js / WebGL', tier: 'PROFICIENT', context: '3D scene graphs, perspective cameras, interactive canvas geometry' },
      { name: 'Angular', tier: 'PROFICIENT', context: 'Enterprise MVC structure, dependency injection, RxJS streams' }
    ]
  },
  {
    id: 'backend',
    rank: 'RANK 02',
    title: 'BACK-END & ARCHITECTURE',
    sub: 'DATA SYSTEMS & APIS',
    description: 'Constructing resilient server architectures, scalable relational/NoSQL schemas, and secure RESTful endpoints.',
    skills: [
      { name: 'Node.js & Express', tier: 'SPECIALIST', context: 'REST APIs, custom middleware, token authentication, async file I/O' },
      { name: 'Supabase & PostgreSQL', tier: 'SPECIALIST', context: 'Relational design, Row-Level Security (RLS), real-time subscriptions' },
      { name: 'Laravel & PHP', tier: 'PROFICIENT', context: 'Full-stack MVC routing, Eloquent ORM, database migrations' },
      { name: 'MySQL', tier: 'SPECIALIST', context: 'Complex join queries, normalization, indexing, transaction integrity' },
      { name: 'MongoDB', tier: 'PROFICIENT', context: 'Document modeling, aggregation pipelines, schema flexibility' }
    ]
  },
  {
    id: 'gamedev',
    rank: 'RANK 03',
    title: 'GAME & EMBEDDED SYSTEMS',
    sub: 'SIMULATION & INTERACTION',
    description: 'Designing mechanics, physics interactions, artificial intelligence state machines, and hardware prototypes.',
    skills: [
      { name: 'Unity Engine & C#', tier: 'SPECIALIST', context: '2D/3D physics, particle systems, audio DSP sync, animator state trees' },
      { name: 'Roblox / Luau', tier: 'SPECIALIST', context: 'Client-server replication, Rojo syncing, custom GUI engineering' },
      { name: 'Godot Engine', tier: 'PROFICIENT', context: 'Node-tree architecture, GDScript, lightweight rapid prototyping' },
      { name: 'Python', tier: 'SPECIALIST', context: 'Pygame visualizers, algorithmic simulations, scripting automation' },
      { name: 'Ren\'Py Engine', tier: 'SPECIALIST', context: 'Branching narrative state variables, custom GUI styling, sound cues' },
      { name: 'Arduino & Raspberry Pi', tier: 'PROFICIENT', context: 'Microcontroller programming, sensor integration, hardware prototyping' }
    ]
  },
  {
    id: 'creative',
    rank: 'RANK 04',
    title: 'CREATIVE SUITE & AUDIO',
    sub: 'VISUAL ASSETS & SOUNDSCAPES',
    description: 'Crafting multimedia assets, 3D models, motion graphics, and synthesized audio directly for production.',
    skills: [
      { name: 'Adobe Photoshop', tier: 'MASTER', context: 'Asset compositing, texture creation, graphic cutouts, sprite editing' },
      { name: 'Figma', tier: 'MASTER', context: 'Vector layouts, design tokens, UI auto-layout, interactive prototypes' },
      { name: 'Adobe Premiere & After Effects', tier: 'SPECIALIST', context: 'Motion graphics, trailer editing, kinetic typography, kinetic VFX' },
      { name: 'Blender', tier: 'PROFICIENT', context: 'Low-poly 3D modeling, UV unwrapping, prop creation for game engines' },
      { name: 'FL Studio', tier: 'SPECIALIST', context: 'Music sequencing, sound effect synthesis, Foley mixing, stem mastering' }
    ]
  }
];
