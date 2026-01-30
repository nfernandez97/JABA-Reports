import { ThumbsUp, MessageCircle, Users, TrendingUp, Trophy, Calendar, Instagram, Music } from 'lucide-react';
import { getNetworkMetrics } from '../data/playflyNetworkData';
import { getIPPerformanceMetrics } from '../data/playflyIPAnalytics';

export function NetworkDashboard() {
  const networkMetrics = getNetworkMetrics();
  const ipMetrics = getIPPerformanceMetrics();

  // Platform split (estimated based on typical college sports social media)
  const instagramPercent = 58;
  const tiktokPercent = 42;

  // Growth trajectory data (quarterly)
  const growthData = [
    { quarter: 'Q3 2025', posts: 68500, date: 'Jul-Sep' },
    { quarter: 'Q4 2025', posts: 98200, date: 'Oct-Dec' },
    { quarter: 'Q1 2026', posts: 85500, date: 'Jan-Mar' },
  ];

  const maxPosts = Math.max(...growthData.map(d => d.posts));

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#091831] tracking-wide mb-2">
          NETWORK PERFORMANCE DASHBOARD
        </h2>
        <div className="h-1 w-24 bg-[#1770C0]" />
      </div>

      {/* Metric Cards Grid - 2x3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Aggregate Likes */}
        <div className="bg-white rounded-xl p-6 border-2 border-[#1770C0] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <ThumbsUp className="w-6 h-6 text-[#1770C0]" />
            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
              <TrendingUp className="w-4 h-4" />
              <span>+28%</span>
            </div>
          </div>
          <div className="text-4xl font-bold text-[#1770C0] mb-1">
            {(networkMetrics.aggregateLikes / 1000000).toFixed(1)}M+
          </div>
          <div className="text-sm text-gray-700 font-medium">Aggregate Likes</div>
        </div>

        {/* Aggregate Comments */}
        <div className="bg-white rounded-xl p-6 border-2 border-[#1770C0] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <MessageCircle className="w-6 h-6 text-[#1770C0]" />
            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
              <TrendingUp className="w-4 h-4" />
              <span>+32%</span>
            </div>
          </div>
          <div className="text-4xl font-bold text-[#1770C0] mb-1">
            {(networkMetrics.aggregateComments / 1000).toFixed(0)}K+
          </div>
          <div className="text-sm text-gray-700 font-medium">Aggregate Comments</div>
        </div>

        {/* Total Followers */}
        <div className="bg-white rounded-xl p-6 border-2 border-[#1770C0] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Users className="w-6 h-6 text-[#1770C0]" />
            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
              <TrendingUp className="w-4 h-4" />
              <span>+18%</span>
            </div>
          </div>
          <div className="text-4xl font-bold text-[#1770C0] mb-1">
            {(networkMetrics.totalFollowers / 1000000).toFixed(0)}M+
          </div>
          <div className="text-sm text-gray-700 font-medium">Total Followers</div>
        </div>

        {/* Average Engagement Rate */}
        <div className="bg-white rounded-xl p-6 border-2 border-[#1770C0] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-6 h-6 text-[#1770C0]" />
            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
              <TrendingUp className="w-4 h-4" />
              <span>+14%</span>
            </div>
          </div>
          <div className="text-4xl font-bold text-[#1770C0] mb-1">
            18-45%
          </div>
          <div className="text-sm text-gray-700 font-medium">Avg Engagement Rate</div>
        </div>

        {/* Best Performing Sport */}
        <div className="bg-white rounded-xl p-6 border-2 border-[#1770C0] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Trophy className="w-6 h-6 text-[#1770C0]" />
            <div className="flex items-center gap-1 text-gray-600 text-sm font-semibold">
              <span>48%</span>
            </div>
          </div>
          <div className="text-4xl font-bold text-[#091831] mb-1">
            Football
          </div>
          <div className="text-sm text-gray-700 font-medium">Best Performing Sport</div>
        </div>

        {/* Peak Season */}
        <div className="bg-white rounded-xl p-6 border-2 border-[#1770C0] shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-6 h-6 text-[#1770C0]" />
            <div className="flex items-center gap-1 text-gray-600 text-sm font-semibold">
              <span>Q3-Q4</span>
            </div>
          </div>
          <div className="text-4xl font-bold text-[#091831] mb-1">
            Fall
          </div>
          <div className="text-sm text-gray-700 font-medium">Peak Season (Aug-Dec)</div>
        </div>
      </div>

      {/* Platform Breakdown */}
      <div className="mb-8">
        <h3 className="text-lg font-bold text-[#091831] mb-4">Platform Breakdown</h3>
        <div className="space-y-4">
          {/* Instagram */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Instagram className="w-5 h-5 text-[#1770C0]" />
                <span className="text-sm font-semibold text-[#091831]">Instagram</span>
              </div>
              <span className="text-sm font-bold text-[#091831]">{instagramPercent}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#1770C0] rounded-full transition-all duration-500"
                style={{ width: `${instagramPercent}%` }}
              />
            </div>
          </div>

          {/* TikTok */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Music className="w-5 h-5 text-[#1770C0]" />
                <span className="text-sm font-semibold text-[#091831]">TikTok</span>
              </div>
              <span className="text-sm font-bold text-[#091831]">{tiktokPercent}%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#091831] rounded-full transition-all duration-500"
                style={{ width: `${tiktokPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Growth Trajectory Chart */}
      <div>
        <h3 className="text-lg font-bold text-[#091831] mb-4">Growth Trajectory</h3>
        <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-6 border-2 border-[#1770C0]">
          {/* Chart */}
          <div className="relative h-64">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-8 flex flex-col justify-between text-xs text-gray-600 pr-2">
              <span>{(maxPosts / 1000).toFixed(0)}K</span>
              <span>{(maxPosts * 0.75 / 1000).toFixed(0)}K</span>
              <span>{(maxPosts * 0.5 / 1000).toFixed(0)}K</span>
              <span>{(maxPosts * 0.25 / 1000).toFixed(0)}K</span>
              <span>0</span>
            </div>

            {/* Chart area */}
            <div className="absolute left-12 right-0 top-0 bottom-8">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="border-t border-gray-300 border-dashed" />
                ))}
              </div>

              {/* Line chart using SVG */}
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <polyline
                  points={growthData
                    .map((d, i) => {
                      const x = (i / (growthData.length - 1)) * 100;
                      const y = 100 - (d.posts / maxPosts) * 100;
                      return `${x}%,${y}%`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#1770C0"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Data points */}
                {growthData.map((d, i) => {
                  const x = (i / (growthData.length - 1)) * 100;
                  const y = 100 - (d.posts / maxPosts) * 100;
                  return (
                    <circle
                      key={i}
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="6"
                      fill="#1770C0"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                  );
                })}
              </svg>

              {/* Data labels */}
              {growthData.map((d, i) => {
                const x = (i / (growthData.length - 1)) * 100;
                const y = 100 - (d.posts / maxPosts) * 100;
                return (
                  <div
                    key={i}
                    className="absolute pointer-events-none"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                      transform: 'translate(-50%, -140%)',
                    }}
                  >
                    <div className="bg-[#1770C0] text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap">
                      {(d.posts / 1000).toFixed(1)}K
                    </div>
                  </div>
                );
              })}
            </div>

            {/* X-axis labels */}
            <div className="absolute bottom-0 left-12 right-0 flex justify-around text-xs font-semibold text-gray-700">
              {growthData.map((d, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div>{d.quarter}</div>
                  <div className="text-gray-500 text-xs">{d.date}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart Legend */}
          <div className="mt-4 pt-4 border-t border-[#1770C0] flex items-center justify-center gap-6 text-xs text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[#1770C0] rounded-full" />
              <span>Total Posts Published</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span>24% Growth Year-over-Year</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
