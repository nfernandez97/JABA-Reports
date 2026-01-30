import { useState } from 'react';
import { FileText, Users, TrendingUp, Target } from 'lucide-react';
import { SCHOOLS, SchoolConfig } from '../data/schoolConfig';
import { SchoolReportView } from './SchoolReportView';

export function SchoolReportsPage() {
  const [selectedSchool, setSelectedSchool] = useState<SchoolConfig | null>(null);

  // Get all schools as an array, deduplicate by school ID
  const allSchools = Array.from(
    new Map(Object.values(SCHOOLS).map(school => [school.id, school])).values()
  );
  console.log('All schools:', allSchools.length, allSchools.map(s => s.shortName));

  // If a school is selected, show the report view
  if (selectedSchool) {
    return (
      <SchoolReportView
        school={selectedSchool}
        onBack={() => setSelectedSchool(null)}
      />
    );
  }

  // Otherwise show the schools grid
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-black tracking-wide">
                SCHOOL REPORTS
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Select a school to view their detailed report
              </p>
            </div>

            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <FileText className="w-4 h-4" />
              <span>{allSchools.length} Schools</span>
            </div>
          </div>
        </div>
      </div>

      {/* Schools Grid */}
      <div className="max-w-[1600px] mx-auto px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allSchools.map((school) => (
            <button
              key={school.id}
              onClick={() => setSelectedSchool(school)}
              className="group relative bg-white border border-gray-200 rounded-2xl p-6 hover:border-[#E2F500]/50 hover:shadow-lg transition-all duration-300 text-left"
            >
              {/* School Logo */}
              <div className="absolute top-6 right-6 w-16 h-16 rounded-xl bg-gray-50 border border-gray-200 p-2 flex items-center justify-center group-hover:border-[#E2F500]/30 transition-colors">
                {school.logoUrl ? (
                  <img
                    src={school.logoUrl}
                    alt={school.name}
                    className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                    onError={(e) => {
                      // Hide image on error and show fallback text
                      e.currentTarget.style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent && !parent.querySelector('.logo-fallback')) {
                        const fallback = document.createElement('div');
                        fallback.className = 'logo-fallback text-gray-400 text-xs font-bold';
                        fallback.textContent = school.shortName.substring(0, 3).toUpperCase();
                        parent.appendChild(fallback);
                      }
                    }}
                  />
                ) : (
                  <div className="text-gray-400 text-xs font-bold">
                    {school.shortName.substring(0, 3).toUpperCase()}
                  </div>
                )}
              </div>

              {/* School Info */}
              <div className="pr-20">
                <h3 className="text-xl font-bold text-black tracking-wide mb-1">
                  {school.shortName.toUpperCase()}
                </h3>
                <p className="text-gray-600 text-sm mb-1">{school.mascot}</p>
                <p className="text-gray-400 text-xs">{school.conference}</p>
              </div>

              {/* Quick Stats Preview */}
              <div className="mt-6 pt-4 border-t border-gray-200 grid grid-cols-3 gap-2">
                <div className="text-center">
                  <Users className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <p className="text-gray-600 text-xs">Athletes</p>
                </div>
                <div className="text-center">
                  <TrendingUp className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <p className="text-gray-600 text-xs">Activity</p>
                </div>
                <div className="text-center">
                  <Target className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                  <p className="text-gray-600 text-xs">Campaigns</p>
                </div>
              </div>

              {/* View Report Button */}
              <div className="mt-4 flex items-center justify-center gap-2 text-[#E2F500] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                <FileText className="w-4 h-4" />
                <span>View Report</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
