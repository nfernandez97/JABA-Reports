import { useState } from 'react';
import { X, Download, TrendingUp } from 'lucide-react';
import { SchoolPartner } from '../data/playflyNetworkData';
import { format } from 'date-fns';

interface SchoolComparisonProps {
  schools: SchoolPartner[];
  onClose: () => void;
}

export function SchoolComparison({ schools, onClose }: SchoolComparisonProps) {
  const [selectedSchools, setSelectedSchools] = useState<SchoolPartner[]>([]);

  const handleSchoolSelect = (schoolId: string) => {
    const school = schools.find(s => s.schoolId === schoolId);
    if (!school) return;

    if (selectedSchools.find(s => s.schoolId === schoolId)) {
      setSelectedSchools(selectedSchools.filter(s => s.schoolId !== schoolId));
    } else if (selectedSchools.length < 3) {
      setSelectedSchools([...selectedSchools, school]);
    }
  };

  const formatNumber = (num: number): string => {
    return num.toLocaleString();
  };

  const formatPercentage = (num: number): string => {
    return `${(num * 100).toFixed(1)}%`;
  };

  const getHighestValue = (metric: keyof SchoolPartner) => {
    if (selectedSchools.length === 0) return null;

    const values = selectedSchools.map(s => {
      const value = s[metric];
      return typeof value === 'number' ? value : 0;
    });

    return Math.max(...values);
  };

  const calculateDifference = (school1: SchoolPartner, school2: SchoolPartner, metric: keyof SchoolPartner) => {
    const val1 = school1[metric] as number;
    const val2 = school2[metric] as number;

    if (!val1 || !val2) return null;

    const percentDiff = ((val1 - val2) / val2) * 100;
    return percentDiff;
  };

  const getComparisonInsights = () => {
    if (selectedSchools.length < 2) return [];

    const insights: string[] = [];
    const school1 = selectedSchools[0];
    const school2 = selectedSchools[1];

    // Athletes comparison
    const athletesDiff = calculateDifference(school1, school2, 'athletesTracked');
    if (athletesDiff && Math.abs(athletesDiff) > 10) {
      const comparison = athletesDiff > 0
        ? `${school1.schoolName} has ${Math.abs(athletesDiff).toFixed(0)}% more athletes than ${school2.schoolName}`
        : `${school2.schoolName} has ${Math.abs(athletesDiff).toFixed(0)}% more athletes than ${school1.schoolName}`;
      insights.push(comparison);
    }

    // Engagement comparison
    const engagementDiff = calculateDifference(school1, school2, 'averageEngagementRate');
    if (engagementDiff && Math.abs(engagementDiff) > 10) {
      const multiplier = Math.abs(engagementDiff / 100) + 1;
      const comparison = engagementDiff > 0
        ? `${school1.schoolName} has ${multiplier.toFixed(1)}x higher engagement rate`
        : `${school2.schoolName} has ${multiplier.toFixed(1)}x higher engagement rate`;
      insights.push(comparison);
    }

    // Posts comparison
    const postsDiff = calculateDifference(school1, school2, 'totalPosts');
    if (postsDiff && Math.abs(postsDiff) > 20) {
      const comparison = postsDiff > 0
        ? `${school1.schoolName} has ${Math.abs(postsDiff).toFixed(0)}% more posts`
        : `${school2.schoolName} has ${Math.abs(postsDiff).toFixed(0)}% more posts`;
      insights.push(comparison);
    }

    return insights;
  };

  const handleDownloadCSV = () => {
    if (selectedSchools.length === 0) return;

    const headers = ['Metric', ...selectedSchools.map(s => s.schoolName)];
    const rows = [
      ['Athletes Tracked', ...selectedSchools.map(s => s.athletesTracked.toString())],
      ['Total Posts', ...selectedSchools.map(s => s.totalPosts.toString())],
      ['Total Likes', ...selectedSchools.map(s => s.totalLikes.toString())],
      ['Total Comments', ...selectedSchools.map(s => s.totalComments.toString())],
      ['Avg Engagement Rate', ...selectedSchools.map(s => formatPercentage(s.averageEngagementRate))],
      ['Conference', ...selectedSchools.map(s => s.conference)],
      ['Tier', ...selectedSchools.map(s => s.tier)],
      ['Partnership Start', ...selectedSchools.map(s => format(s.partnershipStartDate, 'MMM yyyy'))],
    ];

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `School_Comparison_${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const comparisonMetrics = [
    { label: 'Athletes Tracked', key: 'athletesTracked' as keyof SchoolPartner, format: formatNumber },
    { label: 'Total Posts', key: 'totalPosts' as keyof SchoolPartner, format: formatNumber },
    { label: 'Total Likes', key: 'totalLikes' as keyof SchoolPartner, format: formatNumber },
    { label: 'Total Comments', key: 'totalComments' as keyof SchoolPartner, format: formatNumber },
    { label: 'Avg Engagement Rate', key: 'averageEngagementRate' as keyof SchoolPartner, format: formatPercentage },
    { label: 'Number of Brand Partners', key: 'activeBrands' as keyof SchoolPartner, format: (val: any) => Array.isArray(val) ? val.length.toString() : '0' },
  ];

  const insights = getComparisonInsights();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-gray-200 p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-black">School Comparison</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* School Selectors */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[0, 1, 2].map((index) => (
              <div key={index}>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  School {index + 1} {index === 0 ? '(Required)' : '(Optional)'}
                </label>
                <select
                  value={selectedSchools[index]?.schoolId || ''}
                  onChange={(e) => handleSchoolSelect(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a school...</option>
                  {schools
                    .filter(s => !selectedSchools.find(sel => sel.schoolId === s.schoolId))
                    .map(school => (
                      <option key={school.schoolId} value={school.schoolId}>
                        {school.schoolName}
                      </option>
                    ))}
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {selectedSchools.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p className="text-lg">Select at least one school to begin comparison</p>
            </div>
          ) : (
            <>
              {/* Insights */}
              {insights.length > 0 && (
                <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="text-sm font-bold text-blue-900 mb-2">Key Insights</div>
                  <div className="space-y-1">
                    {insights.map((insight, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                        <TrendingUp className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Comparison Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-300">
                      <th className="text-left py-3 px-4 text-sm font-bold text-gray-900 bg-gray-50">
                        Metric
                      </th>
                      {selectedSchools.map((school) => (
                        <th
                          key={school.schoolId}
                          className="text-center py-3 px-4 text-sm font-bold text-gray-900 bg-gray-50"
                        >
                          <div>{school.schoolName}</div>
                          <div className="text-xs font-normal text-gray-600 mt-1">
                            {school.mascot}
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {comparisonMetrics.map((metric) => {
                      const highest = getHighestValue(metric.key);

                      return (
                        <tr key={metric.label} className="hover:bg-gray-50 transition-colors">
                          <td className="py-3 px-4 text-sm font-semibold text-gray-700">
                            {metric.label}
                          </td>
                          {selectedSchools.map((school) => {
                            const value = school[metric.key];
                            const numValue = typeof value === 'number' ? value : (Array.isArray(value) ? value.length : 0);
                            const isHighest = numValue === highest;

                            return (
                              <td
                                key={school.schoolId}
                                className={`py-3 px-4 text-center text-sm font-bold ${
                                  isHighest ? 'bg-green-50 text-green-900' : 'text-gray-900'
                                }`}
                              >
                                {metric.format(numValue)}
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}

                    {/* Additional Info Rows */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-sm font-semibold text-gray-700">Conference</td>
                      {selectedSchools.map((school) => (
                        <td key={school.schoolId} className="py-3 px-4 text-center text-sm text-gray-900">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold">
                            {school.conference}
                          </span>
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-sm font-semibold text-gray-700">Tier</td>
                      {selectedSchools.map((school) => (
                        <td key={school.schoolId} className="py-3 px-4 text-center text-sm text-gray-900">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-bold ${
                              school.tier === 'MAX'
                                ? 'bg-amber-100 text-amber-900'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            {school.tier}
                          </span>
                        </td>
                      ))}
                    </tr>

                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="py-3 px-4 text-sm font-semibold text-gray-700">Partnership Start</td>
                      {selectedSchools.map((school) => (
                        <td key={school.schoolId} className="py-3 px-4 text-center text-sm text-gray-900">
                          {format(school.partnershipStartDate, 'MMM yyyy')}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50 flex items-center justify-between">
          <div className="text-sm text-gray-600">
            {selectedSchools.length === 0
              ? 'Select schools to compare'
              : `Comparing ${selectedSchools.length} school${selectedSchools.length > 1 ? 's' : ''}`}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadCSV}
              disabled={selectedSchools.length === 0}
              className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${
                selectedSchools.length === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              <Download className="w-4 h-4" />
              Download CSV
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
