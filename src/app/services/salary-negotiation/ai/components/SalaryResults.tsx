'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import {
  DollarSign,
  TrendingUp,
  BarChart3,
  Building2,
  Target,
  Award,
  MapPin,
  Briefcase,
  GraduationCap,
  LineChart,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface SalaryResultsProps {
  result: {
    prediction: number;
    range: { min: number; max: number };
    confidence: number;
    insights: {
      experienceImpact: string;
      educationImpact: string;
      locationImpact: string;
      skillsImpact: string;
    };
    marketInsights: {
      marketTrends: {
        growthRate: number;
        demandLevel: string;
        futureOutlook: string;
        competitionLevel: string;
      };
      salaryRange: {
        entry: number;
        median: number;
        senior: number;
      };
      locationInsight: string;
      careerProgression: string[];
    };
    currency: string;
  };
}

const formatCurrency = (value: number, currency: string = 'USD') => {
  const currencyFormatters = {
    USD: { locale: 'en-US', currency: 'USD' },
    INR: { locale: 'en-IN', currency: 'INR' },
    EUR: { locale: 'de-DE', currency: 'EUR' },
    GBP: { locale: 'en-GB', currency: 'GBP' }
  };

  const formatter = currencyFormatters[currency as keyof typeof currencyFormatters] || currencyFormatters.USD;

  return new Intl.NumberFormat(formatter.locale, {
    style: 'currency',
    currency: formatter.currency,
    maximumFractionDigits: 0
  }).format(value);
};

const cardVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  hover: {
    scale: 1.02,
    transition: { duration: 0.2 }
  }
};

export function SalaryResults({ result }: SalaryResultsProps) {
  return (
    <div className="space-y-8">
      {/* Main Salary Prediction */}
      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        className="text-center space-y-4"
      >
        <h3 className="text-2xl font-bold text-white">Estimated Salary Range</h3>
        <div className="flex justify-center items-baseline space-x-4">
          <span className="text-lg text-white/70">{formatCurrency(result.range.min, result.currency)}</span>
          <span className="text-4xl font-bold text-[#fcba28]">
            {formatCurrency(result.prediction, result.currency)}
          </span>
          <span className="text-lg text-white/70">{formatCurrency(result.range.max, result.currency)}</span>
        </div>
        <div className="text-sm text-white/50">
          Confidence Level: {Math.round(result.confidence * 100)}%
        </div>
      </motion.div>

      {/* Market Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Growth and Demand */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-6"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-[#fcba28]" />
              <h4 className="text-lg font-semibold text-white">Market Trends</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Growth Rate</span>
                <span className="text-[#fcba28]">
                  {(result.marketInsights.marketTrends.growthRate * 100).toFixed(1)}%
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Demand Level</span>
                <span className="text-[#fcba28]">{result.marketInsights.marketTrends.demandLevel}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/70">Competition</span>
                <span className="text-[#fcba28]">{result.marketInsights.marketTrends.competitionLevel}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Career Progression */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-6"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-[#fcba28]" />
              <h4 className="text-lg font-semibold text-white">Career Path</h4>
            </div>
            <div className="space-y-2">
              {result.marketInsights.careerProgression.map((step, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <ArrowUp className="w-4 h-4 text-[#fcba28]" />
                  <span className="text-white/70">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Location Insights */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-6"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-[#fcba28]" />
              <h4 className="text-lg font-semibold text-white">Location Impact</h4>
            </div>
            <p className="text-sm text-white/70">{result.marketInsights.locationInsight}</p>
          </div>
        </motion.div>
      </div>

      {/* Salary Factors */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Experience and Education */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-6"
        >
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-[#fcba28]" />
                <h4 className="text-lg font-semibold text-white">Experience Impact</h4>
              </div>
              <p className="text-sm text-white/70">{result.insights.experienceImpact}</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-5 h-5 text-[#fcba28]" />
                <h4 className="text-lg font-semibold text-white">Education Impact</h4>
              </div>
              <p className="text-sm text-white/70">{result.insights.educationImpact}</p>
            </div>
          </div>
        </motion.div>

        {/* Skills and Market Position */}
        <motion.div
          variants={cardVariants}
          whileHover="hover"
          className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-6"
        >
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-[#fcba28]" />
                <h4 className="text-lg font-semibold text-white">Skills Impact</h4>
              </div>
              <p className="text-sm text-white/70">{result.insights.skillsImpact}</p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <LineChart className="w-5 h-5 text-[#fcba28]" />
                <h4 className="text-lg font-semibold text-white">Future Outlook</h4>
              </div>
              <p className="text-sm text-white/70">{result.marketInsights.marketTrends.futureOutlook}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Salary Ranges */}
      <motion.div
        variants={cardVariants}
        whileHover="hover"
        className="relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-6"
      >
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-[#fcba28]" />
            <h4 className="text-lg font-semibold text-white">Salary Ranges by Level</h4>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-sm text-white/70">Entry Level</div>
              <div className="text-lg font-semibold text-[#fcba28]">
                {formatCurrency(result.marketInsights.salaryRange.entry, result.currency)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white/70">Mid Level</div>
              <div className="text-lg font-semibold text-[#fcba28]">
                {formatCurrency(result.marketInsights.salaryRange.median, result.currency)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm text-white/70">Senior Level</div>
              <div className="text-lg font-semibold text-[#fcba28]">
                {formatCurrency(result.marketInsights.salaryRange.senior, result.currency)}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
