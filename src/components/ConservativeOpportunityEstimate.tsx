import { Target, TrendingUp, CheckCircle2 } from 'lucide-react';

export function ConservativeOpportunityEstimate() {
  // Current state
  const currentAnnualRevenue = 22700000; // $22.7M current network revenue

  // Scenario A: Optimize Pricing (6 months)
  const scenarioA = {
    title: 'Optimize Pricing',
    timeline: 'Near-term, 6 months',
    description: [
      'Audit top 500 athletes, reprice Tier A by 30%',
      'Roll out IP premium pricing to all new deals',
    ],
    revenueImpact: 1200000, // $1.2M
    effort: 'Medium',
    effortDetails: 'Sales training, deal review',
    confidence: 'High',
    confidenceDetails: undefined,
  };

  // Scenario B: Activate 50% of Idle Athletes (12 months)
  const scenarioB = {
    title: 'Activate 50% of Idle Athletes',
    timeline: 'Medium-term, 12 months',
    description: [
      'Target 5,250 of 10,500 idle athletes',
      'Start with $2K average deal value',
    ],
    revenueImpact: 10500000, // $10.5M (5,250 × $2K)
    effort: 'High',
    effortDetails: 'Outreach, deal-making, onboarding',
    confidence: 'Medium',
    confidenceDetails: 'Execution dependent',
  };

  // Scenario C: Optimize All 40 Schools (24 months)
  const scenarioC = {
    title: 'Optimize All 40 Schools for Revenue',
    timeline: 'Full optimization, 24 months',
    description: [
      'Apply all learnings: pricing tiers, IP premium, activation',
      'Increase monetization rate from 30% to 65%',
    ],
    revenueImpact: 22000000, // $22M+
    effort: 'High',
    effortDetails: 'Systematic school-by-school audit and optimization',
    confidence: 'Medium-High',
    confidenceDetails: 'Requires commitment',
  };

  // Year 1 and Year 2 potentials (conservative)
  const year1Low = 3000000; // $3M
  const year1High = 5000000; // $5M
  const year1Potential = currentAnnualRevenue + ((year1Low + year1High) / 2);

  const year2Low = 15000000; // $15M
  const year2High = 20000000; // $20M
  const year2Potential = currentAnnualRevenue + ((year2Low + year2High) / 2);

  const formatCurrency = (num: number): string => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num.toFixed(0)}`;
  };

  const scenarios = [scenarioA, scenarioB, scenarioC];

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'High':
        return 'bg-green-100 text-green-900 border-green-300';
      case 'Medium-High':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-900 border-yellow-300';
      default:
        return 'bg-gray-100 text-gray-900 border-gray-300';
    }
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'Medium':
        return 'bg-yellow-100 text-yellow-900';
      case 'High':
        return 'bg-orange-100 text-orange-900';
      default:
        return 'bg-gray-100 text-gray-900';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-black tracking-wide mb-2">
          THE CONSERVATIVE OPPORTUNITY ESTIMATE
        </h2>
        <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 to-indigo-600" />
        <p className="text-lg text-gray-700 mt-4">
          We're being conservative here. These numbers are achievable with execution.
        </p>
      </div>

      {/* Three Scenarios */}
      <div className="space-y-6 mb-8">
        {scenarios.map((scenario, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-6 border-2 border-gray-300">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                    {String.fromCharCode(65 + index)}
                  </div>
                  <div>
                    <div className="text-xl font-bold text-gray-900">SCENARIO {String.fromCharCode(65 + index)}: {scenario.title}</div>
                    <div className="text-sm text-gray-600">{scenario.timeline}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-4">
              <ul className="space-y-1">
                {scenario.description.map((item, idx) => (
                  <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-300">
                <div className="text-xs text-gray-600 mb-1">Revenue Impact</div>
                <div className="text-2xl font-bold text-green-600">{formatCurrency(scenario.revenueImpact)}</div>
                <div className="text-xs text-gray-600">annually</div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-300">
                <div className="text-xs text-gray-600 mb-1">Effort</div>
                <div className={`inline-block px-2 py-1 rounded text-sm font-bold ${getEffortColor(scenario.effort)}`}>
                  {scenario.effort}
                </div>
                <div className="text-xs text-gray-600 mt-1">{scenario.effortDetails}</div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-300">
                <div className="text-xs text-gray-600 mb-1">Confidence</div>
                <div className={`inline-block px-2 py-1 rounded text-sm font-bold border ${getConfidenceColor(scenario.confidence)}`}>
                  {scenario.confidence}
                </div>
                {scenario.confidenceDetails && (
                  <div className="text-xs text-gray-600 mt-1">{scenario.confidenceDetails}</div>
                )}
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-300 flex items-center justify-center">
                {scenario.confidence === 'High' && <CheckCircle2 className="w-8 h-8 text-green-600" />}
                {scenario.confidence.includes('Medium') && <Target className="w-8 h-8 text-yellow-600" />}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Current State and Projections */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Current */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/30">
              <div className="text-sm text-gray-300 mb-2">Current Estimated Annual Revenue</div>
              <div className="text-4xl font-bold mb-2">{formatCurrency(currentAnnualRevenue)}</div>
              <div className="text-xs text-gray-400">Based on 40 schools, 30% monetization</div>
            </div>

            {/* Year 1 */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 border-2 border-blue-400">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-blue-300" />
                <div className="text-sm text-blue-200 font-semibold">Conservative Year 1 Potential</div>
              </div>
              <div className="text-sm text-gray-300 mb-2">Scenarios A + partial B</div>
              <div className="text-4xl font-bold mb-2">{formatCurrency(year1Potential)}</div>
              <div className="text-xs text-gray-400">
                +{formatCurrency(year1Low)}-{formatCurrency(year1High)} increase
              </div>
            </div>

            {/* Year 2 */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6 border-2 border-green-400">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-300" />
                <div className="text-sm text-green-200 font-semibold">Conservative Year 2 Potential</div>
              </div>
              <div className="text-sm text-gray-300 mb-2">All scenarios</div>
              <div className="text-4xl font-bold mb-2">{formatCurrency(year2Potential)}</div>
              <div className="text-xs text-gray-400">
                +{formatCurrency(year2Low)}-{formatCurrency(year2High)} increase
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Progression */}
      <div className="mb-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-black mb-4">Revenue Growth Trajectory (Conservative)</h3>
        <div className="space-y-3">
          {/* Current */}
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm font-semibold text-gray-700">Current</div>
            <div className="flex-1">
              <div className="h-8 bg-gray-400 rounded" style={{ width: '100%' }}></div>
            </div>
            <div className="w-24 text-right text-sm font-bold text-gray-900">
              {formatCurrency(currentAnnualRevenue)}
            </div>
          </div>

          {/* Year 1 */}
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm font-semibold text-gray-700">Year 1</div>
            <div className="flex-1">
              <div
                className="h-8 bg-blue-500 rounded"
                style={{ width: `${(year1Potential / year2Potential) * 100}%` }}
              ></div>
            </div>
            <div className="w-24 text-right text-sm font-bold text-blue-600">
              {formatCurrency(year1Potential)}
            </div>
          </div>

          {/* Year 2 */}
          <div className="flex items-center gap-4">
            <div className="w-24 text-sm font-semibold text-gray-700">Year 2</div>
            <div className="flex-1">
              <div className="h-8 bg-green-500 rounded" style={{ width: '100%' }}></div>
            </div>
            <div className="w-24 text-right text-sm font-bold text-green-600">
              {formatCurrency(year2Potential)}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Message */}
      <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-6">
        <div className="text-center">
          <div className="text-xl font-bold text-blue-900 mb-3">
            We're not saying you'll hit all of this.
          </div>
          <div className="text-lg text-gray-700 mb-4">
            We're saying this is what's possible if you execute well.
          </div>
          <div className="text-lg font-semibold text-blue-900">
            Even half of this would be transformational.
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 border border-blue-300">
            <div className="text-xs text-gray-600 mb-1">50% of Year 1 Target</div>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(currentAnnualRevenue + ((year1Low + year1High) / 4))}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-blue-300">
            <div className="text-xs text-gray-600 mb-1">75% of Year 1 Target</div>
            <div className="text-2xl font-bold text-blue-600">
              {formatCurrency(currentAnnualRevenue + ((year1Low + year1High) * 0.375))}
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border-2 border-blue-400">
            <div className="text-xs text-gray-600 mb-1 font-semibold">100% of Year 1 Target</div>
            <div className="text-2xl font-bold text-blue-600">{formatCurrency(year1Potential)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
