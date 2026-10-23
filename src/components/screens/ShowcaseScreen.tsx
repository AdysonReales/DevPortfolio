import React, { useState } from 'react';
import { ExternalLink, Eye, Film, Image as ImageIcon } from 'lucide-react';
import { projectsData } from '../../data/projects';
import type { Project } from '../../types';
import { ProjectDetailModal } from './ProjectDetailModal';
import { GithubIcon } from '../common/GithubIcon';
import { soundEngine } from '../../audio/soundEngine';

type Collection = 'games' | 'projects' | 'tools';

const screenCopy: Record<Collection, { title: string; eyebrow: string; description: string }> = {
  games: {
    title: 'GAMES',
    eyebrow: 'PLAYABLE EXPERIENCES',
    description: 'Gameplay systems, interactive stories, and game-jam experiments.'
  },
  projects: {
    title: 'PROJECTS',
    eyebrow: 'FULL-STACK WORK',
    description: 'Web applications and technical explorations built from interface to implementation.'
  },
  tools: {
    title: 'PERSONAL TOOLS',
    eyebrow: 'WORKFLOW & AUTOMATION',
    description: 'Utilities, extensions, and developer tooling made to remove friction.'
  }
};

interface ShowcaseScreenProps {
  collection: Collection;
}

export const ShowcaseScreen: React.FC<ShowcaseScreenProps> = ({ collection }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const copy = screenCopy[collection];
  const entries = projectsData.filter(project => project.collection === collection);

  return (
    <section className="relative z-10 min-h-[calc(100vh-70px)] px-4 py-8 sm:p-8 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8 border-b-4 border-[#080808] pb-5">
          <div>
            <span className="p5-badge-tag yellow text-xs font-black">{copy.eyebrow}</span>
            <h1 className="font-['Bebas_Neue'] text-6xl sm:text-8xl text-white tracking-wider leading-none mt-3 drop-shadow-[5px_5px_0_#E60012]">
              {copy.title}
            </h1>
            <p className="max-w-2xl bg-white text-[#080808] font-medium px-4 py-2 mt-3 border-l-4 border-[#E60012]">
              {copy.description}
            </p>
          </div>
          <span className="p5-badge-tag black text-xs">{entries.length.toString().padStart(2, '0')} SHOWCASES</span>
        </div>

        <div className="showcase-grid">
          {entries.map((project, index) => (
            <article key={project.id} className="showcase-card" style={{ '--card-accent': project.accentColor } as React.CSSProperties}>
              <div className="showcase-media" aria-label={`${project.title} ${project.mediaType ?? 'media'} placeholder`}>
                <div className="showcase-media-grid" />
                {project.mediaType === 'GIF PLACEHOLDER' ? <Film size={38} /> : <ImageIcon size={38} />}
                <span>{project.mediaType ?? 'IMAGE PLACEHOLDER'}</span>
                <small>DROP YOUR {project.mediaType === 'GIF PLACEHOLDER' ? 'GIF' : 'IMAGE'} HERE</small>
                <b>0{index + 1}</b>
              </div>
              <div className="p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-bold text-[#E60012]">{project.number}</span>
                  <span className="p5-badge-tag black text-[10px]">{project.status}</span>
                </div>
                <div>
                  <h2 className="font-['Bebas_Neue'] text-4xl leading-none tracking-wide text-[#080808]">{project.title}</h2>
                  <p className="font-mono text-xs mt-2 text-[#5B5B5B] uppercase tracking-wider">{project.tagline}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map(tech => <span key={tech} className="p5-badge-tag white text-[10px]">{tech}</span>)}
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <button onClick={() => { soundEngine.playConfirm(); setSelectedProject(project); }} className="p5-btn primary text-sm py-2 px-4 flex items-center gap-2">
                    <Eye size={15} /> VIEW CASE STUDY
                  </button>
                  {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="showcase-icon-link" aria-label={`Open ${project.title} demo`}><ExternalLink size={17} /></a>}
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer" className="showcase-icon-link" aria-label={`Open ${project.title} repository`}><GithubIcon size={17} /></a>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
};
