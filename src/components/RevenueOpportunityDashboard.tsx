import { DollarSign, TrendingUp, AlertTriangle, Target } from 'lucide-react';
import { getNetworkRevenueSummary } from '../data/networkRevenueMetrics';

export function RevenueOpportunityDashboard() {
  const summary = getNetworkRevenueSummary();

  const formatCurrency = (num: number): string => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num.toFixed(0)}`;
  };

  const formatPercent = (num: number): string => {
    return `${(num * 100).toFixed(0)}%`;
  };

  // Calculate current capture rate
  const currentCaptureRate = summary.totalCurrentRevenue / summary.totalPotentialRevenue;
  const missedOpportunityRate = 1 - currentCaptureRate;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      {/* Header with Wake-Up Stat */}
      <div className="mb-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-10 h-10" />
          <h2 className="text-3xl font-bold">THE OPPORTUNITY</h2>
        </div>
        <div className="text-6xl font-bold mb-4">
          {formatCurrency(summary.totalRevenueGap)}
        </div>
        <div className="text-xl mb-6">
          You have 450M followers but are capturing revenue from only <span className="font-bold text-yellow-300">{formatPercent(currentCaptureRate)}</span> of that reach
        </div>
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30">
          <div className="text-sm mb-2">Current Revenue vs Potential Revenue</div>
          <div className="flex items-center gap-4">
            <div>
              <div className="text-2xl font-bold">{formatCurrency(summary.totalCurrentRevenue)}</div>
              <div className="text-xs text-white/80">What you're capturing now</div>
            </div>
            <TrendingUp className="w-8 h-8 text-yellow-300" />
            <div>
              <div className="text-2xl font-bold text-yellow-300">{formatCurrency(summary.totalPotentialRevenue)}</div>
              <div className="text-xs text-white/80">What you could be earning</div>
            </div>
          </div>
        </div>
      </div>

      {/* Opportunity Visualization */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-black mb-4">Revenue Capture Analysis</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart Visualization (CSS-based) */}
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="text-sm font-semibold text-gray-700 mb-4">Revenue Distribution</div>
            <div className="relative w-64 h-64 mx-auto">
              {/* Pie chart using conic gradient */}
              <div
                className="w-full h-full rounded-full"
                style={{
                  background: `conic-gradient(
                    #10b981 0deg ${currentCaptureRate * 360}deg,
                    #ef4444 ${currentCaptureRate * 360}deg 360deg
                  )`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-full w-32 h-32 flex items-center justify-center shadow-lg">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-red-600">{formatPercent(missedOpportunityRate)}</div>
                    <div className="text-xs text-gray-600">Opportunity</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-sm text-gray-700">Captured: {formatPercent(currentCaptureRate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-sm text-gray-700">Missed: {formatPercent(missedOpportunityRate)}</span>
              </div>
            </div>
          </div>

          {/* Gap Breakdown */}
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <div className="text-sm font-semibold text-blue-900">Post Monetization Gap</div>
              </div>
              <div className="text-2xl font-bold text-blue-900">
                {formatCurrency(summary.postMetrics.revenueGap)}/month
              </div>
              <div className="text-xs text-blue-700 mt-1">
                Monetizing only {formatPercent(summary.postMetrics.currentMonetizationRate)} of {summary.postMetrics.totalPosts.toLocaleString()} posts
              </div>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-purple-600" />
                <div className="text-sm font-semibold text-purple-900">Athlete Activation Gap</div>
              </div>
              <div className="text-2xl font-bold text-purple-900">
                {formatCurrency(summary.athleteMetrics.totalEarningsGap)}
              </div>
              <div className="text-xs text-purple-700 mt-1">
                Only {summary.athleteMetrics.activeAthletes.toLocaleString()} of {summary.athleteMetrics.totalAthletes.toLocaleString()} athletes have deals ({formatPercent(summary.athleteMetrics.activationRate)})
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <div className="text-sm font-semibold text-green-900">Engagement Revenue Gap</div>
              </div>
              <div className="text-2xl font-bold text-green-900">
                {formatCurrency(summary.engagementMetrics.revenueOpportunity)}
              </div>
              <div className="text-xs text-green-700 mt-1">
                Monetizing {formatPercent(summary.engagementMetrics.currentMonetizationPercent)} of {summary.engagementMetrics.totalEngagements.toLocaleString()} engagements
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-6 text-white text-center">
        <div className="text-2xl font-bold mb-2">
          We can see the money. The question is - are you going after it?
        </div>
        <div className="text-gray-300 text-sm">
          {summary.underperformingSchools} schools are underperforming. {summary.athleteMetrics.activationGap.toFixed(0)} athletes are sitting idle.
          The infrastructure exists. The opportunity is <span className="font-bold text-yellow-300">{formatCurrency(summary.totalRevenueGap)}</span>.
        </div>
      </div>
    </div>
  );
}
