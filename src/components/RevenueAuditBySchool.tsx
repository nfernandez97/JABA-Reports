import { TrendingUp, TrendingDown, AlertCircle, CheckCircle2, DollarSign, Users } from 'lucide-react';
import { getSchoolConferencePerformance, getConferenceRevenueMetrics } from '../data/networkRevenueMetrics';
import { PlayflyPartnerTier } from '../data/playflyNetworkData';

export function RevenueAuditBySchool() {
  const schoolPerformance = getSchoolConferencePerformance();
  const conferenceMetrics = getConferenceRevenueMetrics();

  const formatCurrency = (num: number): string => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num.toFixed(0)}`;
  };

  const formatPercent = (num: number): string => {
    return `${(num * 100).toFixed(0)}%`;
  };

  // Sort schools by revenue (highest first) to show Penn State at top
  const sortedSchools = [...schoolPerformance].sort((a, b) => b.currentRevenue - a.currentRevenue);

  // Get Penn State as the benchmark
  const pennState = sortedSchools[0];

  const getPerformanceIcon = (status: string) => {
    switch (status) {
      case 'exceeding':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      case 'meeting':
        return <TrendingUp className="w-5 h-5 text-blue-600" />;
      case 'underperforming':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return null;
    }
  };

  const getPerformanceBadge = (status: string) => {
    switch (status) {
      case 'exceeding':
        return <span className="px-3 py-1 bg-green-100 text-green-900 text-xs font-bold rounded-full">EXCEEDING</span>;
      case 'meeting':
        return <span className="px-3 py-1 bg-blue-100 text-blue-900 text-xs font-bold rounded-full">MEETING TARGETS</span>;
      case 'underperforming':
        return <span className="px-3 py-1 bg-red-100 text-red-900 text-xs font-bold rounded-full">UNDERPERFORMING</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-black tracking-wide mb-2">
          SCHOOL-BY-SCHOOL REVENUE AUDIT
        </h2>
        <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-purple-600" />
        <p className="text-gray-600 mt-3">
          Detailed revenue analysis for each partner school with performance benchmarking
        </p>
      </div>

      {/* Conference Summary */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-black mb-4">Conference Performance Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {conferenceMetrics.map((conf) => (
            <div
              key={conf.conference}
              className={`rounded-xl p-4 border-2 ${
                conf.performanceStatus === 'leading'
                  ? 'bg-green-50 border-green-300'
                  : conf.performanceStatus === 'average'
                  ? 'bg-blue-50 border-blue-300'
                  : 'bg-red-50 border-red-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="font-bold text-gray-900">{conf.conference}</div>
                <div className="text-xs text-gray-600">{conf.schools} schools</div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {formatCurrency(conf.currentRevenue)}
              </div>
              <div className="text-xs text-gray-600 mb-2">
                Avg per school: {formatCurrency(conf.avgRevenuePerSchool)}
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">Gap:</span>
                <span className="font-semibold text-red-600">{formatCurrency(conf.revenueGap)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Penn State Benchmark */}
      <div className="mb-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <DollarSign className="w-8 h-8" />
          <div>
            <div className="text-sm text-blue-100">Top Revenue Generator</div>
            <div className="text-2xl font-bold">{pennState.schoolName}</div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <div className="text-sm text-blue-100">Annual Revenue</div>
            <div className="text-2xl font-bold">{formatCurrency(pennState.currentRevenue)}</div>
          </div>
          <div>
            <div className="text-sm text-blue-100">ROI</div>
            <div className="text-2xl font-bold">{formatPercent(pennState.currentROI / 100)}</div>
          </div>
          <div>
            <div className="text-sm text-blue-100">Per Athlete</div>
            <div className="text-2xl font-bold">{formatCurrency(pennState.revenuePerAthlete)}</div>
          </div>
          <div>
            <div className="text-sm text-blue-100">Upside</div>
            <div className="text-2xl font-bold">{formatCurrency(pennState.revenueGap)}</div>
          </div>
        </div>
      </div>

      {/* School-by-School Breakdown */}
      <div>
        <h3 className="text-xl font-bold text-black mb-4">Individual School Performance</h3>
        <div className="space-y-4">
          {sortedSchools.map((school, index) => {
            const gapFromPennState = pennState.currentRevenue - school.currentRevenue;
            const gapPercent = (gapFromPennState / pennState.currentRevenue) * 100;

            // Estimate monetized athletes (simplified calculation)
            const estimatedAthletes = school.schoolName === 'Penn State University'
              ? 1245
              : school.schoolName === 'Louisiana State University'
              ? 1180
              : school.schoolName === 'Auburn University'
              ? 1050
              : school.schoolName === 'Texas A&M University'
              ? 1380
              : school.schoolName === 'Baylor University'
              ? 892
              : school.schoolName === 'University of Texas at San Antonio'
              ? 645
              : school.schoolName === 'University of Virginia'
              ? 758
              : 623; // Washington State

            const monetizedAthletes = Math.floor(estimatedAthletes * 0.18); // 18% activation rate
            const idleAthletes = estimatedAthletes - monetizedAthletes;
            const avgDealSize = school.currentRevenue / monetizedAthletes;

            return (
              <div
                key={school.schoolId}
                className="bg-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all"
              >
                {/* School Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-lg font-bold text-gray-900">{school.schoolName}</div>
                      {getPerformanceBadge(school.performanceStatus)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-semibold">
                        {school.conference}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold ${
                          school.tier === PlayflyPartnerTier.MAX
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-gray-200 text-gray-800'
                        }`}
                      >
                        {school.tier}
                      </span>
                    </div>
                  </div>
                  {getPerformanceIcon(school.performanceStatus)}
                </div>

                {/* Revenue Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">Current Revenue</div>
                    <div className="text-xl font-bold text-gray-900">{formatCurrency(school.currentRevenue)}</div>
                  </div>

                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">Monetized Athletes</div>
                    <div className="text-xl font-bold text-green-600">{monetizedAthletes}</div>
                    <div className="text-xs text-red-600 mt-1">{idleAthletes} idle</div>
                  </div>

                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">Avg Deal Size</div>
                    <div className="text-xl font-bold text-gray-900">{formatCurrency(avgDealSize)}</div>
                  </div>

                  <div className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="text-xs text-gray-600 mb-1">Revenue Gap</div>
                    <div className="text-xl font-bold text-red-600">{formatCurrency(school.revenueGap)}</div>
                  </div>
                </div>

                {/* Gap from Penn State (for schools other than Penn State) */}
                {index > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingDown className="w-4 h-4 text-yellow-700" />
                      <div className="text-sm font-semibold text-yellow-900">
                        Gap from Top Performer ({pennState.schoolName})
                      </div>
                    </div>
                    <div className="text-xs text-yellow-800">
                      <span className="font-bold">{formatCurrency(gapFromPennState)}</span> behind ({gapPercent.toFixed(0)}% lower revenue)
                    </div>
                  </div>
                )}

                {/* Recommendations */}
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="text-xs font-semibold text-gray-700 mb-2">Action Items:</div>
                  <ul className="space-y-1">
                    {school.recommendations.map((rec, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                        <span className="text-blue-600 mt-0.5">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
        <div className="text-sm font-semibold text-gray-700 mb-4">Network Summary</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {schoolPerformance.filter((s) => s.performanceStatus === 'exceeding').length}
              </div>
              <div className="text-xs text-gray-600">Schools Exceeding Targets</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {schoolPerformance.filter((s) => s.performanceStatus === 'meeting').length}
              </div>
              <div className="text-xs text-gray-600">Schools Meeting Targets</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <AlertCircle className="w-8 h-8 text-red-600" />
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {schoolPerformance.filter((s) => s.performanceStatus === 'underperforming').length}
              </div>
              <div className="text-xs text-gray-600">Schools Needing Attention</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
