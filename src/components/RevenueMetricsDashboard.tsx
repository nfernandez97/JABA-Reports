import { DollarSign, TrendingUp, Users, Building, Percent, Target, ArrowUp, ArrowDown, Minus } from 'lucide-react';
import { getNetworkRevenueSummary } from '../data/networkRevenueMetrics';

export function RevenueMetricsDashboard() {
  const summary = getNetworkRevenueSummary();

  const formatCurrency = (num: number): string => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num.toFixed(0)}`;
  };

  const formatPercent = (num: number): string => {
    return `${(num * 100).toFixed(1)}%`;
  };

  // Calculate per-school and per-athlete metrics
  const totalSchools = 40;
  const totalAthletes = 15000;
  const revenuePerSchool = summary.totalCurrentRevenue / totalSchools;
  const revenuePerAthlete = summary.athleteMetrics.totalCurrentEarnings / summary.athleteMetrics.activeAthletes;

  // Growth trajectory (simulated quarterly growth)
  const currentQuarterRevenue = summary.totalCurrentRevenue / 4;
  const previousQuarterRevenue = currentQuarterRevenue * 0.92; // 8.7% QoQ growth
  const growthRate = ((currentQuarterRevenue - previousQuarterRevenue) / previousQuarterRevenue) * 100;
  const isGrowing = growthRate > 5;
  const isPlateauing = growthRate >= 0 && growthRate <= 5;

  const metrics = [
    {
      title: 'Total Network Revenue',
      value: formatCurrency(summary.totalCurrentRevenue),
      subtitle: 'Annual revenue across all schools',
      icon: DollarSign,
      color: 'blue',
      trend: 'up',
      trendValue: '+8.7% QoQ',
    },
    {
      title: 'Revenue Per Athlete',
      value: formatCurrency(revenuePerAthlete),
      subtitle: 'Average earnings for active athletes',
      icon: Users,
      color: 'green',
      trend: 'up',
      trendValue: '+12.3% vs last year',
    },
    {
      title: 'Revenue Per School',
      value: formatCurrency(revenuePerSchool),
      subtitle: 'Average annual revenue per partner',
      icon: Building,
      color: 'purple',
      trend: 'up',
      trendValue: '+6.8% YoY',
    },
    {
      title: 'Monetization Rate',
      value: formatPercent(summary.athleteMetrics.activationRate),
      subtitle: `${summary.athleteMetrics.activeAthletes.toLocaleString()} of ${totalAthletes.toLocaleString()} athletes with deals`,
      icon: Percent,
      color: 'orange',
      trend: 'down',
      trendValue: 'Room for growth',
    },
    {
      title: 'Average Deal Size',
      value: formatCurrency(summary.athleteMetrics.avgDealValuePerAthlete),
      subtitle: 'Per athlete per year',
      icon: Target,
      color: 'indigo',
      trend: 'up',
      trendValue: '+$450 vs baseline',
    },
    {
      title: 'Growth Trajectory',
      value: isGrowing ? 'GROWING' : isPlateauing ? 'STABLE' : 'DECLINING',
      subtitle: `${growthRate.toFixed(1)}% quarter-over-quarter`,
      icon: TrendingUp,
      color: isGrowing ? 'green' : isPlateauing ? 'yellow' : 'red',
      trend: isGrowing ? 'up' : isPlateauing ? 'stable' : 'down',
      trendValue: isGrowing ? 'Accelerating' : isPlateauing ? 'Monitor closely' : 'Action needed',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; icon: string; text: string }> = {
      blue: { bg: 'bg-blue-50', border: 'border-blue-300', icon: 'text-blue-600', text: 'text-blue-900' },
      green: { bg: 'bg-green-50', border: 'border-green-300', icon: 'text-green-600', text: 'text-green-900' },
      purple: { bg: 'bg-purple-50', border: 'border-purple-300', icon: 'text-purple-600', text: 'text-purple-900' },
      orange: { bg: 'bg-orange-50', border: 'border-orange-300', icon: 'text-orange-600', text: 'text-orange-900' },
      indigo: { bg: 'bg-indigo-50', border: 'border-indigo-300', icon: 'text-indigo-600', text: 'text-indigo-900' },
      yellow: { bg: 'bg-yellow-50', border: 'border-yellow-300', icon: 'text-yellow-600', text: 'text-yellow-900' },
      red: { bg: 'bg-red-50', border: 'border-red-300', icon: 'text-red-600', text: 'text-red-900' },
    };
    return colors[color] || colors.blue;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowUp className="w-5 h-5 text-green-600" />;
      case 'down':
        return <ArrowDown className="w-5 h-5 text-red-600" />;
      case 'stable':
        return <Minus className="w-5 h-5 text-yellow-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-black tracking-wide mb-2">REVENUE METRICS DASHBOARD</h2>
        <div className="h-1.5 w-32 bg-gradient-to-r from-green-600 to-emerald-600" />
        <p className="text-gray-600 mt-3">Key financial metrics and growth indicators across the Playfly network</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => {
          const colors = getColorClasses(metric.color);
          const Icon = metric.icon;

          return (
            <div
              key={index}
              className={`${colors.bg} border-2 ${colors.border} rounded-xl p-6 hover:shadow-xl transition-all duration-300`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-md ${colors.icon}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-700">{metric.title}</div>
                  </div>
                </div>
                {getTrendIcon(metric.trend)}
              </div>

              {/* Value */}
              <div className={`text-4xl font-bold ${colors.text} mb-2`}>{metric.value}</div>

              {/* Subtitle */}
              <div className="text-xs text-gray-600 mb-3">{metric.subtitle}</div>

              {/* Trend */}
              <div className="flex items-center gap-2 text-sm">
                <div
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    metric.trend === 'up'
                      ? 'bg-green-100 text-green-800'
                      : metric.trend === 'down'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {metric.trendValue}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Key Insights Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Current State */}
        <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-300">
          <div className="flex items-center gap-2 mb-4">
            <DollarSign className="w-6 h-6 text-gray-700" />
            <h3 className="text-lg font-bold text-gray-900">Current Performance</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Revenue</span>
              <span className="text-lg font-bold text-gray-900">{formatCurrency(summary.totalCurrentRevenue)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Active Athletes</span>
              <span className="text-lg font-bold text-gray-900">
                {summary.athleteMetrics.activeAthletes.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Avg Deal Value</span>
              <span className="text-lg font-bold text-gray-900">
                {formatCurrency(summary.athleteMetrics.avgDealValuePerAthlete)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Post Monetization</span>
              <span className="text-lg font-bold text-gray-900">
                {formatPercent(summary.postMetrics.currentMonetizationRate)}
              </span>
            </div>
          </div>
        </div>

        {/* Growth Potential */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 border-2 border-green-400 text-white shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-6 h-6" />
            <h3 className="text-lg font-bold">Growth Potential</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-100">Potential Revenue</span>
              <span className="text-lg font-bold">{formatCurrency(summary.totalPotentialRevenue)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-100">Target Athletes</span>
              <span className="text-lg font-bold">
                {(summary.athleteMetrics.totalAthletes * summary.athleteMetrics.targetActivationRate).toFixed(0)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-100">Target Deal Value</span>
              <span className="text-lg font-bold">
                {formatCurrency(summary.athleteMetrics.targetAvgDealValue)}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-green-100">Target Monetization</span>
              <span className="text-lg font-bold">
                {formatPercent(summary.postMetrics.targetMonetizationRate)}
              </span>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-white/30">
            <div className="text-center">
              <div className="text-sm text-green-100 mb-1">Total Opportunity</div>
              <div className="text-3xl font-bold text-yellow-300">{formatCurrency(summary.totalRevenueGap)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Summary */}
      <div className="mt-8 bg-gray-900 rounded-xl p-6 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{summary.exceedingSchools}</div>
            <div className="text-sm text-gray-400">Schools Exceeding Targets</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-1">{summary.meetingSchools}</div>
            <div className="text-sm text-gray-400">Schools Meeting Targets</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-400 mb-1">{summary.underperformingSchools}</div>
            <div className="text-sm text-gray-400">Schools Needing Attention</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">
              {summary.overallGrowthMultiplier.toFixed(1)}X
            </div>
            <div className="text-sm text-gray-400">Growth Multiplier</div>
          </div>
        </div>
      </div>
    </div>
  );
}
