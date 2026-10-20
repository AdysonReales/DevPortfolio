import React, { useState, useEffect } from 'react';
import { ExternalLink, ChevronRight, Eye } from 'lucide-react';
import { GithubIcon } from '../common/GithubIcon';
import { projectsData } from '../../data/projects';
import type { Project } from '../../types';
import { soundEngine } from '../../audio/soundEngine';
import { ProjectDetailModal } from './ProjectDetailModal';

export const ProjectsScreen: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project>(projectsData[0]);
  const [modalProject, setModalProject] = useState<Project | null>(null);

  // Keyboard navigation within project list
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalProject) return; // Modal handles its own ESC

      const currentIndex = projectsData.findIndex(p => p.id === selectedProject.id);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        soundEngine.playTick();
        const next = (currentIndex + 1) % projectsData.length;
        setSelectedProject(projectsData[next]);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        soundEngine.playTick();
        const prev = (currentIndex - 1 + projectsData.length) % projectsData.length;
        setSelectedProject(projectsData[prev]);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        soundEngine.playConfirm();
        setModalProject(selectedProject);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, modalProject]);

  return (
    <div className="relative z-10 w-full min-h-[calc(100vh-70px)] p-4 sm:p-8 md:p-12 flex flex-col justify-between overflow-hidden">
      {/* Top Mission Title Ribbon */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="p5-badge-tag yellow text-xs font-black">
            MISSION ARCHIVE
          </span>
          <h1 className="font-['Bebas_Neue'] text-4xl sm:text-5xl text-white tracking-wider leading-none drop-shadow-[3px_3px_0_#080808]">
            SELECT TARGET OPERATION
          </h1>
        </div>
        <div className="font-mono text-xs text-white/70 font-bold tracking-widest hidden sm:block">
          TOTAL TARGETS: [0{projectsData.length}] // ALL SYSTEM DATA VERIFIED
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start my-auto">
        {/* Left Column: Mission Selection List */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {projectsData.map((project, idx) => {
            const isSelected = selectedProject.id === project.id;
            return (
              <button
                key={project.id}
                onClick={() => {
                  soundEngine.playConfirm();
                  setSelectedProject(project);
                }}
                onMouseEnter={() => {
                  if (!isSelected) {
                    soundEngine.playTick();
                    setSelectedProject(project);
                  }
                }}
                className={`relative group text-left p-4 sm:p-5 flex items-center justify-between transition-all duration-150 cursor-pointer border-2 ${
                  isSelected
                    ? 'bg-[#E60012] border-white text-white translate-x-4 shadow-[8px_8px_0_#080808]'
                    : 'bg-[#080808]/90 border-white/20 text-white hover:border-[#E60012] hover:translate-x-2'
                }`}
                style={{
                  clipPath: 'polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0% 100%)',
                  transform: `rotate(${idx % 2 === 0 ? -1 : 1.5}deg) ${
                    isSelected ? 'translateX(16px)' : ''
                  }`
                }}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`font-mono text-xs font-black tracking-widest ${
                      isSelected ? 'text-[#FFDE00]' : 'text-[#8B8B8B]'
                    }`}
                  >
                    [0{idx + 1}]
                  </span>
                  <div className="flex flex-col">
                    <span className="font-['Bebas_Neue'] text-2xl sm:text-3xl tracking-wide leading-none">
                      {project.title}
                    </span>
                    <span
                      className={`font-mono text-[11px] font-bold tracking-wider mt-1 uppercase ${
                        isSelected ? 'text-white/90' : 'text-[#8B8B8B]'
                      }`}
                    >
                      {project.category} // {project.status}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {isSelected && (
                    <span className="font-mono text-[10px] font-bold bg-white text-[#080808] px-2 py-0.5 tracking-wider hidden sm:inline">
                      ACTIVE
                    </span>
                  )}
                  <ChevronRight
                    size={20}
                    className={`transition-transform ${
                      isSelected ? 'translate-x-1 text-white' : 'text-white/40'
                    }`}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Dynamic Mission Preview Dossier */}
        <div className="lg:col-span-7 flex flex-col items-stretch">
          <div 
            className="p5-card bg-[#F5F5F2] text-[#080808] p-6 sm:p-8 flex flex-col gap-6 relative overflow-hidden"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 0% 100%)'
            }}
          >
            {/* Background Halftone & Giant Number */}
            <div className="absolute inset-0 p5-halftone-pattern opacity-30 pointer-events-none" />
            <div className="absolute top-2 right-4 font-['Bebas_Neue'] text-8xl md:text-9xl text-black/[0.06] font-black leading-none pointer-events-none select-none">
              {selectedProject.number.split(' ')[1] || '01'}
            </div>

            {/* Target Header */}
            <div className="relative z-10 border-b-3 border-[#080808] pb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="p5-badge-tag black text-xs">
                  {selectedProject.number}
                </span>
                <span className="p5-badge-tag red text-xs font-bold">
                  {selectedProject.category}
                </span>
                <span className="p5-badge-tag yellow text-xs font-bold">
                  STATUS: {selectedProject.status}
                </span>
              </div>
              <h2 className="font-['Bebas_Neue'] text-4xl sm:text-6xl text-[#080808] leading-none tracking-wide">
                {selectedProject.title}
              </h2>
              <p className="font-mono text-xs font-bold text-[#8B8B8B] tracking-wider uppercase mt-1">
                CODENAME: {selectedProject.codeName}
              </p>
            </div>

            {/* Summary & Tagline */}
            <div className="relative z-10">
              <p className="font-['Bebas_Neue'] text-xl sm:text-2xl text-[#E60012] tracking-wide mb-2">
                "{selectedProject.tagline}"
              </p>
              <p className="text-base font-medium text-[#080808] leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            {/* Tactical Key Features */}
            <div className="relative z-10">
              <h4 className="font-mono text-xs font-bold tracking-widest text-[#8B8B8B] uppercase mb-2">
                KEY INFILTRATION CAPABILITIES:
              </h4>
              <ul className="grid grid-cols-1 gap-2">
                {selectedProject.features.slice(0, 3).map((feature, i) => (
                  <li
                    key={i}
                    className="p-2.5 bg-white border-l-4 border-[#E60012] text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-[2px_2px_0_rgba(0,0,0,0.06)]"
                  >
                    <span className="font-mono text-xs font-bold text-[#080808]">▶</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Equipped Technology Badges */}
            <div className="relative z-10">
              <h4 className="font-mono text-xs font-bold tracking-widest text-[#8B8B8B] uppercase mb-2">
                WEAPONRY & TECH STACK:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map(tech => (
                  <span
                    key={tech}
                    className="p5-badge-tag black text-xs px-2.5 py-1 font-mono font-bold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="relative z-10 flex flex-wrap items-center gap-3 pt-4 border-t-2 border-[#080808]/20">
              <button
                onClick={() => {
                  soundEngine.playConfirm();
                  setModalProject(selectedProject);
                }}
                className="p5-btn primary text-base py-3 px-6 flex items-center gap-2"
              >
                <Eye size={18} />
                <span>OPEN FULL DOSSIER</span>
              </button>

              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p5-btn secondary text-base py-3 px-5 flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  <span>DEMO</span>
                </a>
              )}

              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p5-btn text-base py-3 px-5 flex items-center gap-2 bg-[#080808] text-white hover:bg-[#E60012]"
                >
                  <GithubIcon size={16} />
                  <span>REPO</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      <ProjectDetailModal
        project={modalProject}
        onClose={() => setModalProject(null)}
      />
    </div>
  );
};
