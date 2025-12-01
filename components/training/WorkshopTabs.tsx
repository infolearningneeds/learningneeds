'use client'

import React, { useState } from 'react';
import { Briefcase, GraduationCap, Heart, Award } from 'lucide-react';

import SoftSkillsWorkshop from './SoftSkillsWorkshop';
import StudentsWorkshop from './StudentsWorkshop';
import ParentingWorkshop from './ParentingWorkshop';

const WorkshopTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  // Add components here
  const components = [
    SoftSkillsWorkshop,
    StudentsWorkshop,
    ParentingWorkshop
  ];

  const tabs = [
    { name: "Soft Skills Workshop", icon: Briefcase },
    { name: "Students Workshop", icon: GraduationCap },
    { name: "Parenting Workshop", icon: Heart }
  ];

  // Render the correct component
  const ActiveComponent = components[activeTab];

  return (
    <div className="min-h-screen bg-white py-10">
      <div className="w-full">

        {/* Header */}
        <div className="text-center mb-12 px-4">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-gray-300 shadow-md mb-6">
            <Award className="w-5 h-5 text-purple-600" />
            <span className="text-gray-800 font-semibold">Our Strength</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Specialized <span className="text-purple-600">Workshop Programs</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose from our expert-led workshops designed to meet your unique development needs
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 px-4">
          {tabs.map((tab, idx) => {
            const Icon = tab.icon;
            const isActive = activeTab === idx;

            return (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`relative flex items-center gap-3 px-8 py-4 rounded-xl font-semibold transition-all duration-300
                  ${isActive
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-300 hover:border-purple-400"
                  }
                `}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.name}</span>

                {isActive && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-400"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Content - Full Width, No Border/Background */}
        <div className="w-[90%] mx-auto flex items-center justify-center">
          <ActiveComponent />
        </div>

      </div>
    </div>
  );
};

export default WorkshopTabs;