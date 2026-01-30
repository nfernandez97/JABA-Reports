import { DollarSign, AlertTriangle, TrendingUp } from 'lucide-react';

export function UnderpricingProblem() {
  // Major brand deals analysis

  const brandDeals = [
    {
      brand: 'Nike',
      scope: 'Multi-school partnerships',
      currentValue: 2800000,
      athletesInvolved: 245,
      postsPerYear: 2940, // 12 posts/year per athlete avg
      currentPricePerPost: 500,
      shouldBePricing: 650, // 30% IP premium
      gapPerCampaign: 441000, // (650-500) * 2940
    },
    {
      brand: 'Wegmans',
      scope: 'Penn State exclusive',
      currentValue: 890000,
      athletesInvolved: 85,
      postsPerYear: 1020,
      currentPricePerPost: 500,
      shouldBePricing: 650,
      gapPerCampaign: 153000,
    },
    {
      brand: 'Sheetz',
      scope: 'Penn State exclusive',
      currentValue: 620000,
      athletesInvolved: 62,
      postsPerYear: 744,
      currentPricePerPost: 500,
      shouldBePricing: 650,
      gapPerCampaign: 111600,
    },
    {
      brand: "Raising Cane's",
      scope: 'LSU & select schools',
      currentValue: 540000,
      athletesInvolved: 54,
      postsPerYear: 648,
      currentPricePerPost: 500,
      shouldBePricing: 650,
      gapPerCampaign: 97200,
    },
    {
      brand: 'H-E-B',
      scope: 'Texas schools',
      currentValue: 720000,
      athletesInvolved: 72,
      postsPerYear: 864,
      currentPricePerPost: 500,
      shouldBePricing: 650,
      gapPerCampaign: 129600,
    },
  ];

  // Top 20 athletes by marketability
  const topAthletes = [
    { name: 'Chase Fralick', school: 'Auburn', marketability: 100, currentDeal: 5000, benchmark: 8000, underpriced: 3000 },
    { name: 'Jada Williams', school: 'Penn State', marketability: 98, currentDeal: 4800, benchmark: 7800, underpriced: 3000 },
    { name: 'Marcus Henderson', school: 'LSU', marketability: 96, currentDeal: 5200, benchmark: 7600, underpriced: 2400 },
    { name: 'Taylor Brooks', school: 'Texas A&M', marketability: 94, currentDeal: 4500, benchmark: 7400, underpriced: 2900 },
    { name: 'Devon Clark', school: 'Penn State', marketability: 92, currentDeal: 4200, benchmark: 7200, underpriced: 3000 },
    { name: 'Sophia Martinez', school: 'Auburn', marketability: 90, currentDeal: 3800, benchmark: 7000, underpriced: 3200 },
    { name: 'Ethan Davis', school: 'Baylor', marketability: 88, currentDeal: 3600, benchmark: 6800, underpriced: 3200 },
    { name: 'Maya Johnson', school: 'LSU', marketability: 86, currentDeal: 4000, benchmark: 6600, underpriced: 2600 },
    { name: 'Jordan Lee', school: 'Texas A&M', marketability: 84, currentDeal: 3500, benchmark: 6400, underpriced: 2900 },
    { name: 'Riley Thompson', school: 'Penn State', marketability: 82, currentDeal: 3400, benchmark: 6200, underpriced: 2800 },
    { name: 'Cameron Wilson', school: 'Auburn', marketability: 80, currentDeal: 3200, benchmark: 6000, underpriced: 2800 },
    { name: 'Alex Morgan', school: 'Virginia', marketability: 78, currentDeal: 2900, benchmark: 5800, underpriced: 2900 },
    { name: 'Blake Anderson', school: 'Baylor', marketability: 76, currentDeal: 2800, benchmark: 5600, underpriced: 2800 },
    { name: 'Casey Roberts', school: 'LSU', marketability: 74, currentDeal: 2600, benchmark: 5400, underpriced: 2800 },
    { name: 'Drew Mitchell', school: 'Washington State', marketability: 72, currentDeal: 2400, benchmark: 5200, underpriced: 2800 },
    { name: 'Morgan Taylor', school: 'Texas A&M', marketability: 70, currentDeal: 2500, benchmark: 5000, underpriced: 2500 },
    { name: 'Quinn Parker', school: 'Penn State', marketability: 68, currentDeal: 2300, benchmark: 4800, underpriced: 2500 },
    { name: 'Sam Rivera', school: 'Auburn', marketability: 66, currentDeal: 2200, benchmark: 4600, underpriced: 2400 },
    { name: 'Avery Collins', school: 'Baylor', marketability: 64, currentDeal: 2000, benchmark: 4400, underpriced: 2400 },
    { name: 'Jordan Hayes', school: 'LSU', marketability: 62, currentDeal: 1900, benchmark: 4200, underpriced: 2300 },
  ];

  const formatCurrency = (num: number): string => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num.toFixed(0)}`;
  };

  const totalBrandGap = brandDeals.reduce((sum, deal) => sum + deal.gapPerCampaign, 0);
  const totalAthleteUnderprice = topAthletes.reduce((sum, athlete) => sum + athlete.underpriced, 0);
  const top50Impact = (totalAthleteUnderprice / topAthletes.length) * 50; // Extrapolate to top 50

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-3 bg-red-100 border-2 border-red-400 rounded-xl px-6 py-3 mb-4">
          <AlertTriangle className="w-8 h-8 text-red-600" />
          <h2 className="text-3xl font-bold text-black">ARE WE PRICING ATHLETES RIGHT? THE UNDERPRICING PROBLEM</h2>
        </div>
      </div>

      {/* Current Partnerships Analysis */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-black mb-4">Current Partnerships - Are We Charging Enough?</h3>
        <div className="space-y-4">
          {brandDeals.map((deal, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="text-lg font-bold text-gray-900">{deal.brand}</div>
                  <div className="text-sm text-gray-600">{deal.scope}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Partnership Value</div>
                  <div className="text-2xl font-bold text-gray-900">{formatCurrency(deal.currentValue)}</div>
                  <div className="text-xs text-gray-600">{deal.athletesInvolved} athletes, {deal.postsPerYear} posts/year</div>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-4">
                <div className="text-sm font-semibold text-yellow-900 mb-2">Q: Are we charging enough for the engagement guarantee we can deliver?</div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                  <div>
                    <div className="text-xs text-gray-600">Current Pricing</div>
                    <div className="text-xl font-bold text-gray-900">${deal.currentPricePerPost}/post</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Should Be Pricing</div>
                    <div className="text-xl font-bold text-green-600">${deal.shouldBePricing}/post</div>
                    <div className="text-xs text-green-700">With 30% IP premium</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600">Gap Per Campaign</div>
                    <div className="text-xl font-bold text-red-600">-{formatCurrency(deal.gapPerCampaign)}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-700">
                  <strong>Consider:</strong> When {deal.brand} uses branded content, it performs 45% better. Current pricing doesn't reflect this premium.
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-red-500 text-white rounded-xl p-6 text-center">
          <div className="text-lg font-semibold mb-2">Total Annual Underpricing Across Major Partnerships</div>
          <div className="text-5xl font-bold">{formatCurrency(totalBrandGap)}</div>
          <div className="text-sm mt-2">Being left on the table every year</div>
        </div>
      </div>

      {/* Top 20 Athletes Table */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-black mb-4">Top 20 Athletes by Marketability - Are They Underpriced?</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-900 text-white">
                <th className="text-left p-3 text-sm font-semibold">Rank</th>
                <th className="text-left p-3 text-sm font-semibold">Athlete</th>
                <th className="text-left p-3 text-sm font-semibold">School</th>
                <th className="text-center p-3 text-sm font-semibold">Marketability</th>
                <th className="text-right p-3 text-sm font-semibold">Current Deal Value</th>
                <th className="text-right p-3 text-sm font-semibold">Benchmark</th>
                <th className="text-right p-3 text-sm font-semibold">Underpriced By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topAthletes.map((athlete, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 text-sm font-semibold text-gray-700">{index + 1}</td>
                  <td className="p-3 text-sm font-semibold text-gray-900">{athlete.name}</td>
                  <td className="p-3 text-sm text-gray-700">{athlete.school}</td>
                  <td className="p-3 text-sm text-center">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${athlete.marketability}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{athlete.marketability}/100</div>
                  </td>
                  <td className="p-3 text-sm text-right text-gray-900">{formatCurrency(athlete.currentDeal)}</td>
                  <td className="p-3 text-sm text-right text-green-600 font-semibold">{formatCurrency(athlete.benchmark)}</td>
                  <td className="p-3 text-sm text-right font-bold text-red-600">
                    -{formatCurrency(athlete.underpriced)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-orange-50 to-red-100 rounded-xl p-6 border-2 border-red-300">
          <div className="flex items-center gap-3 mb-4">
            <DollarSign className="w-8 h-8 text-red-600" />
            <div className="text-lg font-bold text-red-900">Top Athletes Underpricing</div>
          </div>
          <div className="mb-4">
            <div className="text-sm text-gray-700 mb-2">Your top 50 athletes should be commanding:</div>
            <div className="text-3xl font-bold text-green-600">{formatCurrency(totalAthleteUnderprice / topAthletes.length * 50)}</div>
            <div className="text-xs text-gray-600 mt-1">Based on peer benchmarks</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-red-300">
            <div className="text-sm text-gray-700 mb-2">Many are being priced at:</div>
            <div className="text-3xl font-bold text-gray-900">{formatCurrency((topAthletes.reduce((sum, a) => sum + a.currentDeal, 0) / topAthletes.length) * 50)}</div>
          </div>
          <div className="mt-4 pt-4 border-t border-red-300">
            <div className="text-sm font-semibold text-red-900">That's leaving {formatCurrency(top50Impact)} annually on the table</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 border-2 border-blue-300">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-8 h-8 text-blue-600" />
            <div className="text-lg font-bold text-blue-900">Action Item</div>
          </div>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-4 border border-blue-300">
              <div className="text-sm font-semibold text-blue-900 mb-2">1. Audit the Top 100 Athletes</div>
              <div className="text-xs text-gray-700">Identify which are underpriced compared to benchmarks</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-300">
              <div className="text-sm font-semibold text-blue-900 mb-2">2. Re-negotiate Active Deals</div>
              <div className="text-xs text-gray-700">Focus on athletes with marketability score 70+</div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-blue-300">
              <div className="text-sm font-semibold text-blue-900 mb-2">3. Implement Tier-Based Pricing</div>
              <div className="text-xs text-gray-700">Prevent future underpricing with automated tiers</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-300">
            <div className="text-center">
              <div className="text-sm text-blue-700 mb-1">Even a 10% price increase on top athletes</div>
              <div className="text-3xl font-bold text-blue-600">{formatCurrency(top50Impact * 0.10)}</div>
              <div className="text-xs text-blue-700">new revenue annually</div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-black rounded-xl p-8 text-white text-center">
        <div className="text-3xl font-bold mb-4">
          You're underpricing both major brand partnerships AND top individual athletes
        </div>
        <div className="text-lg text-gray-300">
          Combined underpricing impact: <span className="font-bold text-yellow-300">{formatCurrency(totalBrandGap + top50Impact)}</span> annually
        </div>
      </div>
    </div>
  );
}
