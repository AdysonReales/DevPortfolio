import React from 'react';
import { X, ExternalLink, CheckCircle2, AlertTriangle, Layers, Award } from 'lucide-react';
import { GithubIcon } from '../common/GithubIcon';
import type { Project } from '../../types';
import { soundEngine } from '../../audio/soundEngine';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md overflow-y-auto"
      onClick={() => {
        soundEngine.playCancel();
        onClose();
      }}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#F5F5F2] text-[#080808] border-4 border-[#080808] shadow-[12px_12px_0_#E60012] p-6 sm:p-10 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
        style={{
          clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))'
        }}
      >
        {/* Halftone Pattern Background */}
        <div className="absolute inset-0 p5-halftone-pattern opacity-40 pointer-events-none" />

        {/* Top Header Bar */}
        <div className="flex items-start justify-between gap-4 border-b-4 border-[#080808] pb-4 mb-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="p5-badge-tag black text-xs">
                {project.number}
              </span>
              <span className="p5-badge-tag red text-xs font-bold">
                {project.category}
              </span>
              <span className="p5-badge-tag yellow text-xs font-bold">
                {project.status}
              </span>
            </div>
            <h2 className="font-['Bebas_Neue'] text-4xl sm:text-6xl text-[#080808] leading-none tracking-wide">
              {project.title}
            </h2>
            <p className="font-mono text-xs sm:text-sm font-bold text-[#8B8B8B] tracking-wider uppercase mt-1">
              CODENAME: {project.codeName} // ROLE: {project.role}
            </p>
          </div>

          <button
            onClick={() => {
              soundEngine.playCancel();
              onClose();
            }}
            className="w-10 h-10 bg-[#080808] text-white hover:bg-[#E60012] flex items-center justify-center font-bold text-xl transition-colors cursor-pointer border-2 border-[#080808]"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex flex-col gap-6 relative z-10">
          {/* Mission Overview */}
          <div className="p-4 bg-white border-2 border-[#080808] shadow-[4px_4px_0_#080808]">
            <h4 className="font-['Bebas_Neue'] text-xl text-[#E60012] tracking-wider flex items-center gap-2">
              <Layers size={18} />
              <span>MISSION BRIEF & ARCHITECTURE</span>
            </h4>
            <p className="text-base text-[#080808] font-medium mt-2 leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Key Features List */}
          <div>
            <h4 className="font-['Bebas_Neue'] text-2xl text-[#080808] tracking-wide mb-3 flex items-center gap-2">
              <CheckCircle2 size={20} className="text-[#E60012]" />
              <span>TACTICAL FEATURES & IMPLEMENTATION</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feature, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-white border-l-4 border-[#080808] text-sm font-medium flex items-start gap-2 shadow-[2px_2px_0_rgba(0,0,0,0.1)]"
                >
                  <span className="font-mono text-xs font-bold text-[#E60012]">
                    [0{idx + 1}]
                  </span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges & Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#080808] text-white border-2 border-white/20">
              <h5 className="font-['Bebas_Neue'] text-xl text-[#FFDE00] tracking-wider flex items-center gap-2">
                <AlertTriangle size={18} />
                <span>CHALLENGE OVERCOME</span>
              </h5>
              <p className="text-sm text-[#E1E1DC] mt-2 leading-relaxed font-sans">
                {project.challenges}
              </p>
            </div>

            <div className="p-4 bg-[#E60012] text-white border-2 border-[#080808] shadow-[4px_4px_0_#080808]">
              <h5 className="font-['Bebas_Neue'] text-xl text-white tracking-wider flex items-center gap-2">
                <Award size={18} />
                <span>MISSION OUTCOME</span>
              </h5>
              <p className="text-sm text-white mt-2 leading-relaxed font-sans font-medium">
                {project.results}
              </p>
            </div>
          </div>

          {/* Technology Arsenal */}
          <div>
            <h4 className="font-mono text-xs font-bold tracking-widest text-[#8B8B8B] uppercase mb-2">
              EQUIPPED TECH ARSENAL:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(tech => (
                <span
                  key={tech}
                  className="p5-badge-tag black text-xs px-3 py-1 font-mono font-bold"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t-2 border-[#080808]/20">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="p5-btn primary text-base py-2.5 px-6 flex items-center gap-2"
              >
                <span>LAUNCH LIVE DEMO</span>
                <ExternalLink size={16} />
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p5-btn secondary text-base py-2.5 px-6 flex items-center gap-2"
              >
                <GithubIcon size={18} />
                <span>SOURCE REPOSITORY</span>
              </a>
            )}

            <button
              onClick={() => {
                soundEngine.playCancel();
                onClose();
              }}
              className="ml-auto font-mono text-xs font-bold text-[#080808] hover:text-[#E60012] tracking-wider cursor-pointer underline"
            >
              CLOSE MISSION DOSSIER [ESC]
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
