import React from 'react';
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import SecuritySection from "@/components/SecuritySection";
import Footer from "@/components/Footer";
import SecurityBoundary from "@/components/SecurityBoundary";

const Index = () => {
  return (
    <SecurityBoundary>
      <div className="min-h-screen">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <SecuritySection />
        <Footer />
      </div>
    </SecurityBoundary>
  );
};

export default Index;
