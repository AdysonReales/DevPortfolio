import { useEffect, useRef, useState } from 'react';
import { BookOpen, FolderOpen, Mail, MapPin, Sprout, X } from 'lucide-react';
import { projectsData } from './data/projects';
import { siteConfig } from './data/siteConfig';
import { experienceData } from './data/experience';
import { skillsData } from './data/skills';
import type { Project } from './types';
import workshop from './assets/workshop.webp';
import './App.css';

const projects = projectsData.filter(project => project.githubUrl || project.liveUrl);
const featured = projects.filter(project => project.featured);
const groups = { all: 'All work', projects: 'Applications', games: 'Games', tools: 'Tools' } as const;
type Group = keyof typeof groups;

function ProjectNotes({ project, close }: { project: Project; close: () => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const element = dialog.current!;
    element.showModal();
    return () => element.close();
  }, []);
  return <dialog ref={dialog} aria-labelledby="project-title" onCancel={close}
    onClick={event => { if (event.target === dialog.current) close(); }}>
    <div className="notes">
      <button className="dismiss" onClick={close} aria-label="Close project notes"><X /></button>
      <span className="label">{project.category}</span>
      <h2 id="project-title">{project.title}</h2>
      <p>{project.description}</p>
      <strong>{project.role}</strong>
      <ul>{project.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
      <p className="stack">{project.techStack.join(' · ')}</p>
      <div className="actions">
        {project.githubUrl && <a className="button" href={project.githubUrl}>View source</a>}
        {project.liveUrl && <a className="button light" href={project.liveUrl}>Visit project</a>}
      </div>
    </div>
  </dialog>;
}

export function App() {
  const [selected, select] = useState<Project | null>(null);
  const [group, setGroup] = useState<Group>('all');
  useEffect(() => {
    function followHash() {
      const id = location.hash.slice(1);
      if (id === 'games' || id === 'tools' || id === 'projects') {
        setGroup(id);
        document.getElementById('archive')?.scrollIntoView();
      } else if (id) document.getElementById(id)?.scrollIntoView();
    }
    followHash();
    window.addEventListener('hashchange', followHash);
    return () => window.removeEventListener('hashchange', followHash);
  }, []);

  return <>
    <a className="skip" href="#work">Skip to projects</a>
    <header id="home"><nav className="wrap" aria-label="Main navigation">
      <a className="brand" href="#home"><Sprout aria-hidden="true" /> Adyson Reales</a>
      <div className="navlinks"><a href="#work">Work</a><a href="#about">About</a><a href="#skills">Skills</a><a href="#contact">Contact</a></div>
    </nav></header>
    <main>
      <section className="hero wrap" aria-labelledby="intro">
        <div className="intro"><span className="label"><MapPin size={16}/> Manila, Philippines</span>
          <h1 id="intro">Hi, I’m<br/><em>Adyson.</em></h1>
          <p>I build games, web apps, and little tools that make everyday work easier.</p>
          <div className="actions"><a className="button" href="#work"><FolderOpen size={18}/> Explore my work</a><a className="textlink" href="#about">About me</a></div>
        </div>
        <img className="workshop" src={workshop} fetchPriority="high" alt="An illustrated developer and sleeping cat outside a leafy garden workshop" />
      </section>
      <section id="work" className="garden"><div className="wrap section">
        <div className="sectionhead"><h2>Selected work</h2><a className="textlink" href="#archive">All {projects.length} projects</a></div>
        <div className="cards">{featured.map((p, index) => <button className="card" key={p.id} onClick={() => select(p)}>
          <span aria-hidden="true" className={'cover cover-' + index}/>
          <span className="cardbody"><span className="label">{p.category}</span><strong>{p.title}</strong><span>{p.tagline}</span></span>
        </button>)}</div>
      </div></section>
      <section id="archive" className="wrap section"><h2>Project notebook</h2>
        <div className="filters" aria-label="Filter projects">{(Object.keys(groups) as Group[]).map(key =>
          <button key={key} aria-pressed={group === key} onClick={() => setGroup(key)}>{groups[key]}</button>)}</div>
        <div className="rows">{projects.filter(p => group === 'all' || p.collection === group).map(p =>
          <button className="row" key={p.id} onClick={() => select(p)}><strong>{p.title}</strong><span>{p.techStack.slice(0, 2).join(' · ')}</span><BookOpen size={18} aria-hidden="true"/></button>)}</div>
      </section>
      <div className="paper"><div className="wrap section profile">
        <section id="about"><span className="label"><Sprout size={17}/> About me</span><h2>Behind the builds</h2>
          <p>I’m Adyson Reales, a computer science student specializing in application development at Mapúa University in Manila.</p>
          <p>I like projects where code and design meet. That’s taken me from syncing player inputs to a jeepney rhythm track to turning Figma layouts into native Roblox interfaces.</p>
        </section>
        <section id="skills"><h2>My toolkit</h2>{skillsData.map(category =>
          <details key={category.id}><summary>{category.title.toLowerCase()}</summary><ul>{category.skills.map(skill =>
            <li key={skill.name}><strong>{skill.name}</strong> — {skill.context}</li>)}</ul></details>)}</section>
      </div></div>
      <section id="experience" className="wrap section"><h2>Experience & education</h2>
        {experienceData.map(item => <details key={item.id}><summary>{item.organization} <small>{item.period}</small></summary><strong>{item.role}</strong><ul>{item.highlights.map(line => <li key={line}>{line}</li>)}</ul></details>)}
      </section>
    </main>
    <footer id="contact"><div className="wrap section"><span className="label"><Mail size={16}/> Contact</span><h2>Get in touch</h2>
      <a className="email" href={'mailto:' + siteConfig.socials.email}>{siteConfig.socials.email}</a>
      <div className="socials"><a href={siteConfig.socials.github}>GitHub</a><a href={siteConfig.socials.itch}>itch.io</a><a href={siteConfig.socials.linkedin}>LinkedIn</a></div>
    </div></footer>
    {selected && <ProjectNotes project={selected} close={() => select(null)} />}
  </>;
}

export default App;
