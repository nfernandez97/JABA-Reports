import { getNetworkRevenueSummary } from '../data/networkRevenueMetrics';

export function RevenueOpportunityHero() {
  const summary = getNetworkRevenueSummary();

  const formatCurrency = (num: number): string => {
    if (num >= 1000000000) return `$${(num / 1000000000).toFixed(2)}B`;
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num.toFixed(0)}`;
  };

  const currentRevenue = summary.totalCurrentRevenue;
  const optimizedRevenue = summary.totalPotentialRevenue;
  const unrealizedOpportunity = summary.totalRevenueGap;
  const growthMultiplier = summary.overallGrowthMultiplier;

  const capturedPercent = (currentRevenue / optimizedRevenue) * 100;
  const opportunityPercent = 100 - capturedPercent;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      {/* Headline */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold text-black mb-4 tracking-tight">
          THE PLAYFLY NETWORK REVENUE OPPORTUNITY
        </h1>
        <p className="text-lg text-gray-700 max-w-4xl mx-auto">
          We've analyzed 252,171 posts across your 40+ schools and 15,000 athletes.
          <br />
          Here's what the data shows about the money you're capturing - and the money you're leaving on the table.
        </p>
      </div>

      {/* Three Stat Blocks */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* BLOCK 1: Current Revenue (Green) */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="text-6xl font-bold mb-3">{formatCurrency(currentRevenue)}</div>
          <div className="text-2xl font-semibold mb-2">Current Network Revenue</div>
          <div className="text-sm text-green-100">Estimated annual revenue from 40 schools</div>
        </div>

        {/* BLOCK 2: Optimized Revenue (Gold/Yellow) */}
        <div className="bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl p-8 text-white shadow-xl border-4 border-yellow-300">
          <div className="text-6xl font-bold mb-3">{formatCurrency(optimizedRevenue)}</div>
          <div className="text-2xl font-semibold mb-2">Revenue If Optimized</div>
          <div className="text-sm text-yellow-100 mb-3">Same schools, better execution</div>
          <div className="bg-white/30 backdrop-blur-sm rounded-lg px-3 py-2 inline-block">
            <span className="text-lg font-bold">{growthMultiplier.toFixed(1)}X</span>
            <span className="text-sm ml-1">multiplier</span>
          </div>
        </div>

        {/* BLOCK 3: Unrealized Opportunity (Red) */}
        <div className="bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl">
          <div className="text-6xl font-bold mb-3">{formatCurrency(unrealizedOpportunity)}</div>
          <div className="text-2xl font-semibold mb-2">Unrealized Opportunity</div>
          <div className="text-sm text-red-100">Sitting on the table right now</div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-gray-50 rounded-xl p-8 mb-8">
        <div className="max-w-md mx-auto">
          {/* CSS-based pie chart */}
          <div className="relative w-80 h-80 mx-auto mb-6">
            <div
              className="w-full h-full rounded-full shadow-2xl"
              style={{
                background: `conic-gradient(
                  #10b981 0deg ${capturedPercent * 3.6}deg,
                  #ef4444 ${capturedPercent * 3.6}deg 360deg
                )`,
              }}
            />
            {/* Center circle with total */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full w-40 h-40 flex items-center justify-center shadow-xl">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900">{opportunityPercent.toFixed(0)}%</div>
                  <div className="text-sm text-gray-600">Opportunity</div>
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500 rounded"></div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Revenue Captured</div>
                <div className="text-xs text-gray-600">{capturedPercent.toFixed(0)}%</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-red-500 rounded"></div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Revenue Opportunity</div>
                <div className="text-xs text-gray-600">{opportunityPercent.toFixed(0)}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Closing Line */}
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-900">
          We can see all of it. The question is - are you going to take it?
        </div>
      </div>
    </div>
  );
}
