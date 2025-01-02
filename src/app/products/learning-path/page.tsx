"use client";

import { LearningPathContent } from "./components/LearningPathContent";
import { LearningPathSidebar } from "./components/LearningPathSidebar";

export default function LearningPathPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <LearningPathSidebar />
        
        {/* Main Content */}
        <main className="flex-1 p-8">
          <LearningPathContent />
        </main>
      </div>
    </div>
  );
}
