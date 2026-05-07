'use client';

import React, { useState, useCallback } from 'react';
import GridBackground from './blueprint/GridBackground';
import BlueprintLoadingScreen from './layout/BlueprintLoadingScreen';
import BlueprintNavbar from './layout/BlueprintNavbar';
import BlueprintHero from './sections/BlueprintHero';
import BlueprintAssemblySection from './assembly/BlueprintAssemblySection';
import BlueprintByTheNumbers from './sections/BlueprintByTheNumbers';
import BlueprintOurRange from './sections/BlueprintOurRange';
import BlueprintTheMaking from './sections/BlueprintTheMaking';
import BlueprintCertifications from './sections/BlueprintCertifications';
import BlueprintCommissionForm from './sections/BlueprintCommissionForm';
import BlueprintFooter from './layout/BlueprintFooter';

/**
 * BlueprintMasterNarrative — Top-level composition for The Blueprint UI.
 * Orchestrates: Loading → Hero → Assembly → Static sections → Footer.
 */
export default function BlueprintMasterNarrative() {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoadComplete = useCallback(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      {/* Loading gate */}
      {!isLoaded && <BlueprintLoadingScreen onComplete={handleLoadComplete} />}

      {/* Grid background */}
      <GridBackground />

      {/* Navigation */}
      <BlueprintNavbar />

      {/* Main content — hidden until loaded */}
      <main style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.6s ease' }}>
        {/* Hero: "The Drawing Board" */}
        <BlueprintHero />

        {/* Assembly: 500vh scroll-scrubbed animation */}
        <BlueprintAssemblySection />

        {/* Assembly end — solid bg slides over canvas */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            background: 'var(--bg-base)',
          }}
        >
          {/* Static sections */}
          <BlueprintByTheNumbers />
          <BlueprintOurRange />
          <BlueprintTheMaking />
          <BlueprintCertifications />
          <BlueprintCommissionForm />
          <BlueprintFooter />
        </div>
      </main>
    </>
  );
}
