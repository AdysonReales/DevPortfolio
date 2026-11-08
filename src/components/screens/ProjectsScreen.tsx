import React, { useState } from 'react';
import { ArrowUpRight, Eye } from 'lucide-react';
import { projectsData } from '../../data/projects';
import type { Project } from '../../types';
import { soundEngine } from '../../audio/soundEngine';
import { ProjectDetailModal } from './ProjectDetailModal';
import './archive.css';

const filters = ['All work', 'Projects', 'UI/UX'] as const;
type Filter = typeof filters[number];

export const ProjectsScreen: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('All work');
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const visible = projectsData.filter(project => filter === 'All work' || (filter === 'UI/UX' ? !!project.caseStudy : !project.caseStudy));

  return (
    <section className="archive" aria-labelledby="archive-title">
      <div className="archive-heading">
        <span className="archive-eyebrow">THE PHANTOM ARCHIVE / SELECT YOUR TARGET</span>
        <h1 id="archive-title">PROJECTS <span>&</span><br />CASE STUDIES<span className="archive-period">.</span></h1>
        <p>A collection of digital projects and a space for the design stories behind the work.</p>
        <span className="archive-stamp" aria-hidden="true">TAKE<br />A LOOK!</span>
      </div>
      <div className="archive-toolbar">
        <div className="archive-filters" aria-label="Filter archive">
          {filters.map(item => <button key={item} type="button" aria-pressed={filter === item} onClick={() => { soundEngine.playTick(); setFilter(item); }}>{item}</button>)}
        </div>
        <span className="archive-count">SHOWING {String(visible.length).padStart(2, '0')} / {String(projectsData.length).padStart(2, '0')}</span>
      </div>
      <div className="archive-grid">
        {visible.map((project, index) => (
          <article className="archive-card" key={project.id}>
            <div className={`archive-art archive-art--${project.thumbnailType}`} aria-hidden="true">
              <span className="archive-art-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="archive-art-label">{project.category}<br /><strong>{project.title}</strong></span>
              <span className="archive-art-star">✦</span>
            </div>
            <div className="archive-card-body">
              <div className="archive-tags"><span>{project.category}</span><span>{project.status}</span></div>
              <h2>{project.title}</h2>
              <p>{project.tagline}</p>
              <div className="archive-role">{project.role}</div>
              <div className="archive-actions">
                <button type="button" onClick={() => { soundEngine.playConfirm(); setModalProject(project); }}><Eye size={16} /> {project.caseStudy ? 'VIEW CASE STUDY' : 'OPEN DOSSIER'}</button>
                {(project.liveUrl || project.githubUrl) && <a href={project.liveUrl || project.githubUrl} target="_blank" rel="noreferrer" aria-label={`Visit ${project.title}`}><ArrowUpRight size={18} /> VISIT</a>}
              </div>
            </div>
          </article>
        ))}
      </div>
      <ProjectDetailModal project={modalProject} onClose={() => setModalProject(null)} />
    </section>
  );
};
