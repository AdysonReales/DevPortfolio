import React, { useState, useEffect, useCallback } from 'react';
import type { PortfolioScreen, TransitionStyle } from './types';
import { PersonaBackground } from './components/graphics/PersonaBackground';
import { ScreenTransition } from './components/navigation/ScreenTransition';
import { HeaderBar } from './components/common/HeaderBar';
import { PersonaNav } from './components/navigation/PersonaNav';
import { TitleScreen } from './components/screens/TitleScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { ProjectsScreen } from './components/screens/ProjectsScreen';
import { AboutScreen } from './components/screens/AboutScreen';
import { SkillsScreen } from './components/screens/SkillsScreen';
import { ExperienceScreen } from './components/screens/ExperienceScreen';
import { ContactScreen } from './components/screens/ContactScreen';
import { ProjectDetailModal } from './components/screens/ProjectDetailModal';
import { projectsData } from './data/projects';

export const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<PortfolioScreen>('title');
  const [targetScreen, setTargetScreen] = useState<PortfolioScreen | null>(null);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [transitionVariant, setTransitionVariant] = useState<TransitionStyle>('diagonal');
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeModalProject, setActiveModalProject] = useState<string | null>(null);

  // Sync hash routing with browser history
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PortfolioScreen;
      const validScreens: PortfolioScreen[] = ['title', 'home', 'projects', 'about', 'skills', 'experience', 'contact'];
      if (validScreens.includes(hash) && hash !== activeScreen) {
        triggerNavigation(hash, 'diagonal', false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [activeScreen]);

  const triggerNavigation = useCallback((
    screen: PortfolioScreen, 
    variant: TransitionStyle = 'diagonal',
    updateHistory: boolean = true
  ) => {
    if (screen === activeScreen && !isTransitioning) return;
    
    // Pick dynamic transition variants for visual variety
    let chosenVariant = variant;
    if (screen === 'contact') chosenVariant = 'red-impact';
    else if (screen === 'skills' || screen === 'experience') chosenVariant = 'layered-panel';

    setTargetScreen(screen);
    setTransitionVariant(chosenVariant);
    setIsTransitioning(true);

    if (updateHistory) {
      window.location.hash = screen === 'title' ? '' : screen;
    }
  }, [activeScreen, isTransitioning]);

  const handleMidpoint = () => {
    if (targetScreen) {
      setActiveScreen(targetScreen);
      window.scrollTo(0, 0);
    }
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
    setTargetScreen(null);
  };

  const selectedModalProject = activeModalProject 
    ? projectsData.find(p => p.id === activeModalProject) || null 
    : null;

  return (
    <div className="relative w-full min-h-screen flex flex-col overflow-x-hidden bg-[#080808]">
      {/* Dynamic Persona 5 Background System */}
      <PersonaBackground currentScreen={activeScreen} />

      {/* Screen Transition Wipe Overlay */}
      <ScreenTransition
        isTransitioning={isTransitioning}
        variant={transitionVariant}
        onMidpoint={handleMidpoint}
        onComplete={handleTransitionComplete}
      />

      {/* Top Header Bar on Non-Title Screens */}
      {activeScreen !== 'title' && (
        <HeaderBar
          currentScreen={activeScreen}
          onNavigate={(screen) => triggerNavigation(screen)}
          onOpenMenu={() => setIsMenuOpen(true)}
        />
      )}

      {/* Full-Screen Floating Persona 5 Menu Modal */}
      <PersonaNav
        currentScreen={activeScreen}
        onNavigate={(screen) => triggerNavigation(screen)}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isFloating={true}
      />

      {/* Main Screen Content Stage */}
      <main className="relative z-10 flex-grow w-full flex flex-col">
        {activeScreen === 'title' && (
          <TitleScreen 
            onStart={(target = 'home') => triggerNavigation(target, 'red-impact')} 
          />
        )}

        {activeScreen === 'home' && (
          <HomeScreen
            onNavigate={(screen) => triggerNavigation(screen)}
            onOpenProject={(projectId) => setActiveModalProject(projectId)}
          />
        )}

        {activeScreen === 'projects' && (
          <ProjectsScreen />
        )}

        {activeScreen === 'about' && (
          <AboutScreen />
        )}

        {activeScreen === 'skills' && (
          <SkillsScreen />
        )}

        {activeScreen === 'experience' && (
          <ExperienceScreen />
        )}

        {activeScreen === 'contact' && (
          <ContactScreen />
        )}
      </main>

      {/* Direct Project Detail Modal (from home or deep links) */}
      <ProjectDetailModal
        project={selectedModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
};

export default App;
