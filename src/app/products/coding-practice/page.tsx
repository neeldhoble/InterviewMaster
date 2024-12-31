'use client';

import React from 'react';
import { Hero } from './components/hero/Hero';
import { Features } from './components/features/Features';
import { ProblemsList } from './components/problems/ProblemsList';

export default function CodingPracticePage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="pt-16"> {/* Added padding-top to account for header */}
        <Hero />
        <Features />
        <ProblemsList />
      </div>
    </main>
  );
}
