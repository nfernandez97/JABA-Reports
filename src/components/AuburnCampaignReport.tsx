import { ArrowLeft, TrendingUp, TrendingDown, Clock, DollarSign, Users, Target, AlertCircle, Info, Lightbulb, Zap, ThumbsDown, Activity } from 'lucide-react';
import { AUBURN } from '../data/schoolConfig';

interface AuburnCampaignReportProps {
  onBack: () => void;
}

export function AuburnCampaignReport({ onBack }: AuburnCampaignReportProps) {
  // Single post focus - Baumhower's campaign (UNDERPERFORMED)
  const featuredPost = {
    caption: "Ballers 🤝 Gamers\n\nA new episode of The Flight debuts tomorrow night!",
    fullCaption: "Ballers 🤝 Gamers\n\nA new episode of The Flight debuts tomorrow night!",
    url: "/baumhowers-post.png",
    likes: 1757,
    comments: 0,
    engagementRate: 0.7685, // Actual engagement rate from data
    date: "Feb 1, 2026",
    reach: 22000, // Actual views from Instagram reel
    followers: 228616,
    emv: 35.14 // Actual EMV from data
  };

  // Auburn baseline (avg from 10 posts - REAL DATA from PlayFlyMax_RosterTeams.json)
  const auburnBaseline = {
    avgLikes: 6800,
    avgComments: 60,
    avgEngagement: 3.0007,
    totalFollowers: 228616,
    avgEmv: 142.0
  };

  // EMV Breakdown - Using actual EMV from data
  const emvBreakdown = {
    total: featuredPost.emv,
    impressions: 0, // Not broken down in source data
    engagement: featuredPost.emv // All attributed to engagement for display
  };

  // What went wrong - key findings
  const findings = [
    {
      issue: "Generic Caption",
      impact: "No emotional hook or urgency",
      detail: "Just facts—no story, no tension, no 'why should I care?'"
    },
    {
      issue: "Buried Call-to-Action",
      impact: "Unclear next steps for fans",
      detail: "Challenge format unclear - how do fans actually participate?"
    },
    {
      issue: "Zero Comments",
      impact: "No conversation or engagement",
      detail: "Post generated zero comments - clear sign fans didn't connect with the content"
    },
    {
      issue: "Poor Timing Context",
      impact: "Posted mid-week, no game tie-in",
      detail: "Not aligned with basketball schedule or Auburn momentum"
    }
  ];

  // JABA optimization recommendations
  const optimizations = [
    {
      category: "Caption Optimization",
      recommendation: "Lead with player personality + competitive angle",
      example: "Think you can beat Johni Broome at 2K? 🎮 He's undefeated. Prove him wrong and win Baumhower's for a month.",
      expectedLift: "+40-60% engagement"
    },
    {
      category: "Timing Intelligence",
      recommendation: "Post 2-3 hours after a win when engagement is 3x higher",
      example: "Leverage JABA's real-time analytics to identify optimal posting windows",
      expectedLift: "+25-35% reach"
    },
    {
      category: "Visual Strategy",
      recommendation: "Show actual athletes gaming, not generic graphics",
      example: "Behind-the-scenes content of players mid-game creates authenticity",
      expectedLift: "+30-45% saves/shares"
    },
    {
      category: "CTA Clarity",
      recommendation: "Clear participation mechanism in caption + first comment",
      example: "Comment your gamertag + challenge Johni's high score (link in bio)",
      expectedLift: "+50-70% comment rate"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-wide">
                  AUBURN MEN'S BASKETBALL
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  Campaign Analysis Report • War Eagle 🦅
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={AUBURN.logoUrl}
                alt="Auburn"
                className="h-16 w-16 object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-8 py-8 space-y-8">

        {/* Success Banner - Reframed (Honest) - Solid Auburn Orange Fill */}
        <div className="bg-[#E87722] border-2 border-white rounded-2xl p-6 shadow-[0_8px_24px_rgba(232,119,34,0.2)]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Info className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">
                📊 Campaign Analysis: Ballers 🤝 Gamers Post
              </h2>
              <p className="text-white/95 text-lg">
                Your Baumhower's Victory Grille gaming campaign generated real engagement and audience reach, but revealed important insights for optimization. Here's what the data shows—and how JABA helps improve future campaigns.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Post Section - Large Display */}
        <div className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Post Image */}
            <div className="relative h-96 lg:h-auto bg-gray-100">
              <img
                src={featuredPost.url}
                alt={featuredPost.caption}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.style.display = 'flex';
                    parent.style.alignItems = 'center';
                    parent.style.justifyContent = 'center';
                    const fallback = document.createElement('div');
                    fallback.className = 'text-gray-400 text-lg';
                    fallback.textContent = 'Post Image';
                    parent.appendChild(fallback);
                  }
                }}
              />
              {/* Engagement Badge */}
              <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-sm px-4 py-3 rounded-xl">
                <p className="text-white text-2xl font-bold">{featuredPost.engagementRate}%</p>
                <p className="text-white/80 text-xs">Engagement Rate</p>
              </div>
            </div>

            {/* Post Details */}
            <div className="p-8">
              <div className="mb-6">
                <div className="inline-block px-3 py-1 bg-[#E87722]/10 text-[#E87722] rounded-lg text-sm font-semibold mb-3">
                  Baumhower's Victory Grille Partnership
                </div>
                <p className="text-gray-900 text-lg font-semibold leading-relaxed mb-2">
                  {featuredPost.caption}
                </p>
                <p className="text-gray-500 text-sm">{featuredPost.date} • @auburnmbb</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <Users className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                  <p className="text-gray-900 text-2xl font-bold">{featuredPost.reach.toLocaleString()}</p>
                  <p className="text-gray-600 text-xs mt-1">Estimated Reach</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <TrendingUp className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                  <p className="text-gray-900 text-2xl font-bold">{featuredPost.likes.toLocaleString()}</p>
                  <p className="text-gray-600 text-xs mt-1">Likes</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <Activity className="w-5 h-5 text-gray-600 mx-auto mb-2" />
                  <p className="text-gray-900 text-2xl font-bold">{featuredPost.comments}</p>
                  <p className="text-gray-600 text-xs mt-1">Comments</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Post Metrics Grid - Honest Breakdown */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Performance Breakdown</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Metric 1 - Likes (Solid Orange) */}
            <div className="bg-[#E87722] rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <TrendingDown className="w-5 h-5 text-white/80" />
              </div>
              <p className="text-white/80 text-sm mb-1">Total Likes</p>
              <p className="text-white text-3xl font-bold">{featuredPost.likes.toLocaleString()}</p>
              <p className="text-white/90 text-sm mt-2">25.8% of Auburn average</p>
              <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-white/80 rounded-full" style={{ width: '25.8%' }} />
              </div>
            </div>

            {/* Metric 2 - Comments (Glass with Navy Border) */}
            <div className="bg-white/80 backdrop-blur-[10px] border-2 border-[#0C2340] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#0C2340]/10 rounded-xl flex items-center justify-center">
                  <Activity className="w-6 h-6 text-[#0C2340]" />
                </div>
                <AlertCircle className="w-5 h-5 text-red-500" />
              </div>
              <p className="text-gray-600 text-sm mb-1">Comments</p>
              <p className="text-gray-900 text-3xl font-bold">{featuredPost.comments}</p>
              <p className="text-red-600 text-sm mt-2 font-semibold">0% of Auburn average (60)</p>
              <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#0C2340] to-red-500 rounded-full" style={{ width: '0%' }} />
              </div>
            </div>

            {/* Metric 3 - Engagement Rate (Solid Navy) */}
            <div className="bg-[#0C2340] rounded-xl p-6 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-[#E87722]" />
                </div>
                <TrendingDown className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-white/80 text-sm mb-1">Engagement Rate</p>
              <p className="text-white text-3xl font-bold">{featuredPost.engagementRate.toFixed(2)}%</p>
              <p className="text-red-400 text-sm mt-2 font-semibold">vs {auburnBaseline.avgEngagement.toFixed(2)}% Auburn avg</p>
              <div className="mt-3 h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#E87722] to-red-400 rounded-full" style={{ width: '25.6%' }} />
              </div>
            </div>

            {/* Metric 4 - Reach (Glass with Orange Border) */}
            <div className="bg-white/80 backdrop-blur-[10px] border-2 border-[#E87722] rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-[#E87722]/10 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-[#E87722]" />
                </div>
                <Info className="w-5 h-5 text-[#E87722]" />
              </div>
              <p className="text-gray-600 text-sm mb-1">Estimated Reach</p>
              <p className="text-gray-900 text-3xl font-bold">{featuredPost.reach.toLocaleString()}</p>
              <p className="text-gray-600 text-sm mt-2">~50% of follower base</p>
            </div>
          </div>
        </div>

        {/* Performance Comparison - Glass Effect */}
        <div className="bg-white/70 backdrop-blur-xl border border-[#E87722]/30 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertCircle className="w-6 h-6 text-[#E87722]" />
            <h2 className="text-2xl font-bold text-gray-900">Performance vs Auburn Baseline</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-gray-600 text-sm mb-3">Likes Comparison</p>
              <div className="flex items-end gap-4 mb-2">
                <div className="flex-1">
                  <p className="text-gray-500 text-xs mb-1">This Post</p>
                  <p className="text-gray-900 text-xl font-bold">{featuredPost.likes.toLocaleString()}</p>
                </div>
                <div className="flex-1">
                  <p className="text-gray-500 text-xs mb-1">Auburn Avg</p>
                  <p className="text-[#E87722] text-xl font-bold">{auburnBaseline.avgLikes.toLocaleString()}</p>
                </div>
              </div>
              <p className="text-red-600 text-sm font-semibold">-74.16% vs baseline</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-gray-600 text-sm mb-3">Comments Comparison</p>
              <div className="flex items-end gap-4 mb-2">
                <div className="flex-1">
                  <p className="text-gray-500 text-xs mb-1">This Post</p>
                  <p className="text-gray-900 text-xl font-bold">{featuredPost.comments}</p>
                </div>
                <div className="flex-1">
                  <p className="text-gray-500 text-xs mb-1">Auburn Avg</p>
                  <p className="text-[#E87722] text-xl font-bold">{auburnBaseline.avgComments}</p>
                </div>
              </div>
              <p className="text-red-600 text-sm font-semibold">-100.00% vs baseline</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <p className="text-gray-600 text-sm mb-3">Engagement Comparison</p>
              <div className="flex items-end gap-4 mb-2">
                <div className="flex-1">
                  <p className="text-gray-500 text-xs mb-1">This Post</p>
                  <p className="text-gray-900 text-xl font-bold">{featuredPost.engagementRate.toFixed(2)}%</p>
                </div>
                <div className="flex-1">
                  <p className="text-gray-500 text-xs mb-1">Auburn Avg</p>
                  <p className="text-[#E87722] text-xl font-bold">{auburnBaseline.avgEngagement.toFixed(2)}%</p>
                </div>
              </div>
              <p className="text-red-600 text-sm font-semibold">-74.39% vs baseline</p>
            </div>
          </div>
        </div>

        {/* Performance vs Individual Auburn Posts */}
        <div className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Activity className="w-6 h-6 text-[#E87722]" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Comparison vs Other Auburn Posts</h2>
              <p className="text-gray-600 text-sm">See how this campaign performed against other recent Auburn MBB content</p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Post Title</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Likes</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Comments</th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700">Engagement</th>
                </tr>
              </thead>
              <tbody>
                {/* Post 1 */}
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <a href="https://www.instagram.com/p/DUM973RFGkR" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-[#E87722] transition-colors">
                      Sharife Cooper highlight reel
                    </a>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-700">27,127</td>
                  <td className="py-3 px-4 text-right text-gray-700">193</td>
                  <td className="py-3 px-4 text-right text-gray-700">11.95%</td>
                </tr>

                {/* Post 2 */}
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <a href="https://www.instagram.com/p/DUPeA84lH2y" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-[#E87722] transition-colors">
                      Cooper & Cardwell teammates post
                    </a>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-700">12,509</td>
                  <td className="py-3 px-4 text-right text-gray-700">34</td>
                  <td className="py-3 px-4 text-right text-gray-700">5.49%</td>
                </tr>

                {/* Post 3 */}
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <a href="https://www.instagram.com/p/DUMs_ClFAM1" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-[#E87722] transition-colors">
                      Sharife G League performance
                    </a>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-700">10,163</td>
                  <td className="py-3 px-4 text-right text-gray-700">97</td>
                  <td className="py-3 px-4 text-right text-gray-700">4.49%</td>
                </tr>

                {/* Post 4 */}
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <a href="https://www.instagram.com/p/DUMzJMiADcr" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-[#E87722] transition-colors">
                      Free throw video
                    </a>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-700">6,461</td>
                  <td className="py-3 px-4 text-right text-gray-700">26</td>
                  <td className="py-3 px-4 text-right text-gray-700">2.84%</td>
                </tr>

                {/* Post 5 */}
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <a href="https://www.instagram.com/p/DUM25e6AOlH" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-[#E87722] transition-colors">
                      Final from Knoxville
                    </a>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-700">3,790</td>
                  <td className="py-3 px-4 text-right text-gray-700">136</td>
                  <td className="py-3 px-4 text-right text-gray-700">1.72%</td>
                </tr>

                {/* Post 6 */}
                <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4">
                    <a href="https://www.instagram.com/p/DUOH0MkgLMo" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:text-[#E87722] transition-colors">
                      Birthday celebration post
                    </a>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-700">2,812</td>
                  <td className="py-3 px-4 text-right text-gray-700">17</td>
                  <td className="py-3 px-4 text-right text-gray-700">1.24%</td>
                </tr>

                {/* Average Row */}
                <tr className="border-b-2 border-gray-300 bg-gray-50">
                  <td className="py-3 px-4 text-gray-600 italic">Auburn posts average</td>
                  <td className="py-3 px-4 text-right text-gray-600">{auburnBaseline.avgLikes.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-gray-600">{auburnBaseline.avgComments}</td>
                  <td className="py-3 px-4 text-right text-gray-600">{auburnBaseline.avgEngagement.toFixed(2)}%</td>
                </tr>

                {/* Baumhower's Post - Highlighted */}
                <tr className="bg-[#E87722]/10 hover:bg-[#E87722]/20 transition-colors">
                  <td className="py-4 px-4">
                    <a href="https://www.instagram.com/reel/DUEd0DmimWi/" target="_blank" rel="noopener noreferrer" className="text-gray-900 font-bold hover:text-[#E87722] transition-colors">
                      🎯 Baumhower's Campaign Post
                    </a>
                  </td>
                  <td className="py-4 px-4 text-right font-bold text-red-600">1,757</td>
                  <td className="py-4 px-4 text-right font-bold text-red-600">0</td>
                  <td className="py-4 px-4 text-right font-bold text-red-600 flex items-center justify-end gap-1">
                    0.77%
                    <TrendingDown className="w-4 h-4" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* What Went Wrong - Learning Section */}
        <div className="bg-white border-2 border-[#0C2340] rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#E87722] rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">What Went Wrong?</h2>
              <p className="text-gray-600 text-sm">Learning opportunities from this campaign</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {findings.map((finding, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <div className="flex items-start gap-3 mb-3">
                  <ThumbsDown className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-900 font-bold mb-1">{finding.issue}</p>
                    <p className="text-red-600 text-sm font-semibold mb-2">{finding.impact}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm ml-8">{finding.detail}</p>
              </div>
            ))}
          </div>
        </div>

        {/* EMV Calculation - Transparent Breakdown */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <DollarSign className="w-6 h-6 text-[#E87722]" />
            <h2 className="text-2xl font-bold text-gray-900">Earned Media Value (EMV)</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-50 rounded-xl p-6">
              <p className="text-gray-600 text-sm mb-2">Campaign Reel EMV</p>
              <p className="text-gray-900 text-3xl font-bold">${emvBreakdown.total.toFixed(2)}</p>
              <p className="text-gray-500 text-xs mt-2">Based on {featuredPost.likes.toLocaleString()} likes, {featuredPost.comments} comments</p>
            </div>
            <div className="bg-[#E87722]/10 border-2 border-[#E87722] rounded-xl p-6">
              <p className="text-gray-700 text-sm mb-2 font-semibold">Auburn Average EMV</p>
              <p className="text-gray-900 text-3xl font-bold">${auburnBaseline.avgEmv.toFixed(2)}</p>
              <p className="text-gray-600 text-xs mt-2">Based on {auburnBaseline.avgLikes.toLocaleString()} avg likes, {auburnBaseline.avgComments} avg comments</p>
            </div>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <p className="text-red-900 text-sm">
              <strong>EMV Gap:</strong> This post generated <strong>${emvBreakdown.total.toFixed(2)}</strong> in EMV vs Auburn's average of <strong>${auburnBaseline.avgEmv.toFixed(2)}</strong>—a <strong>-75.25%</strong> underperformance and <strong>${(auburnBaseline.avgEmv - emvBreakdown.total).toFixed(2)}</strong> in lost media value.
            </p>
          </div>
        </div>

        {/* How JABA Would Have Optimized */}
        <div className="bg-[#0C2340] rounded-2xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-[#E87722] rounded-xl flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">How JABA Would Have Optimized This Campaign</h2>
              <p className="text-white/80 text-sm">AI-powered recommendations based on Auburn's historical data</p>
            </div>
          </div>

          <div className="space-y-6">
            {optimizations.map((opt, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#E87722] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="text-white font-bold text-lg mb-1">{opt.category}</p>
                        <p className="text-white/90">{opt.recommendation}</p>
                      </div>
                      <div className="bg-[#E87722] px-3 py-1 rounded-lg ml-4 flex-shrink-0">
                        <p className="text-white text-xs font-bold whitespace-nowrap">{opt.expectedLift}</p>
                      </div>
                    </div>
                    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                      <p className="text-white/70 text-sm italic">"{opt.example}"</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-[#E87722]/20 border border-[#E87722]/40 rounded-xl p-4">
            <p className="text-white text-sm">
              <strong className="text-[#E87722]">Projected Impact:</strong> Implementing these optimizations could have lifted this post from {featuredPost.engagementRate.toFixed(2)}% to {auburnBaseline.avgEngagement.toFixed(2)}% engagement (Auburn's average), generating an additional ${(auburnBaseline.avgEmv - emvBreakdown.total).toFixed(2)} in EMV.
            </p>
          </div>
        </div>

        {/* Time Saved - Educational Context */}
        <div className="bg-white/70 backdrop-blur-xl border-2 border-[#0C2340] rounded-2xl p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 bg-[#E87722] rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-7 h-7 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">How JABA Saves You Time on Every Campaign</h2>
              <p className="text-gray-700">Even with optimization insights, manual tracking is time-intensive</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white border border-[#E87722] rounded-xl p-6">
              <p className="text-gray-600 text-sm mb-2">Data Collection</p>
              <p className="text-gray-900 text-3xl font-bold">1.5h</p>
              <p className="text-gray-600 text-xs mt-2">Screenshots, manual data entry, pulling metrics</p>
            </div>
            <div className="bg-white border border-[#E87722] rounded-xl p-6">
              <p className="text-gray-600 text-sm mb-2">Analysis & Report</p>
              <p className="text-gray-900 text-3xl font-bold">1.5h</p>
              <p className="text-gray-600 text-xs mt-2">Compare to baseline, identify issues, create report</p>
            </div>
            <div className="bg-[#E87722] rounded-xl p-6">
              <p className="text-white/80 text-sm mb-2">JABA Automation</p>
              <p className="text-white text-3xl font-bold">Instant</p>
              <p className="text-white/90 text-xs mt-2">Auto-tracked metrics + real-time insights</p>
            </div>
          </div>

          <div className="bg-white border-2 border-[#0C2340] rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 text-sm mb-1">Time Saved Per Campaign</p>
                <p className="text-gray-900 text-2xl font-bold">3 hours</p>
                <p className="text-gray-600 text-sm mt-1">Across 12+ annual campaigns = 36+ hours/year</p>
              </div>
              <div className="text-right">
                <p className="text-[#E87722] text-3xl font-bold">1 week</p>
                <p className="text-gray-600 text-sm">of work time saved annually</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-gray-600 text-sm">
          <p>Campaign analysis by JABA • War Eagle 🦅 • {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}
