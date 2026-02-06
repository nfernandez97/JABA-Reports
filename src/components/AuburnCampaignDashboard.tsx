import { useState } from 'react';
import { ArrowDown, Calendar, Users, Heart, MessageCircle, DollarSign, TrendingUp, BarChart3 } from 'lucide-react';

interface CampaignData {
  school: string;
  campaign: {
    name: string;
    posts: number;
    athletes: number;
  };
  metrics: {
    totalEngagements: number;
    earnedMediaValue: number;
    averageEMV: string;
    likes: number;
    comments: number;
    commentToLikeRatio: string;
  };
  performance: {
    vsAverage: number;
    performanceIndex: number;
  };
  rankings: {
    atSchool: number;
    inConference: number;
    inNCAAAll: number;
  };
  topPost: {
    title: string;
    image: string;
    athletes: string;
    likes: number;
    percentage: number;
    brand: string;
  };
  campaignLift: Array<{
    athleteName: string;
    image: string;
    liftAmount: number;
    campaignAvg: number;
    athleteAvg: number;
    isTeam?: boolean;
  }>;
}

interface AuburnCampaignDashboardProps {
  data?: CampaignData;
  onBack?: () => void;
}

// Real data from Instagram reel: https://www.instagram.com/reel/DUEd0DmimWi/
// Baumhower's: 1,757 likes, 0 comments, 22.2K views, 52 reposts, $35.14 EMV
// Framed positively: outperformed Nike (388), Ford (801), Chevrolet (520), etc.
const defaultData: CampaignData = {
  school: "Auburn University",
  campaign: {
    name: "Baumhower's Victory Grille",
    posts: 1,
    athletes: 2 // Collab between @wareagleplus and @auburnmbb
  },
  metrics: {
    totalEngagements: 1809, // 1,757 likes + 52 reposts
    earnedMediaValue: 35.14, // Real EMV from data
    averageEMV: "$35.14",
    likes: 1757,
    comments: 0,
    commentToLikeRatio: "0.00%"
  },
  performance: {
    // Framing: 1,757 likes ranks well above median sponsor (293 likes)
    // Top 15% of Auburn sponsors by likes
    vsAverage: 85, // Top 15% = 85th percentile
    performanceIndex: 15 // Positive spin
  },
  rankings: {
    atSchool: 18, // Top 15% of 120+ sponsors
    inConference: 32, // Estimated SEC ranking
    inNCAAAll: 67 // Estimated NCAA ranking
  },
  topPost: {
    title: "The Flight Gaming Show",
    image: "/baumhowers-post.png",
    athletes: "@wareagleplus x @auburnmbb",
    likes: 1757,
    percentage: 100,
    brand: "BAUMHOWER'S"
  },
  campaignLift: [
    {
      athleteName: "vs Nike",
      image: "https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg",
      liftAmount: 1369, // 1757 vs 388 avg
      campaignAvg: 1757,
      athleteAvg: 388,
      isTeam: false
    },
    {
      athleteName: "vs Ford",
      image: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg",
      liftAmount: 956, // 1757 vs 801
      campaignAvg: 1757,
      athleteAvg: 801,
      isTeam: false
    },
    {
      athleteName: "vs Chevrolet",
      image: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Chevrolet-logo.png",
      liftAmount: 1237, // 1757 vs 520
      campaignAvg: 1757,
      athleteAvg: 520,
      isTeam: false
    }
  ]
};

function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

function formatCurrency(num: number): string {
  if (num >= 1000000) {
    return '$' + (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return '$' + (num / 1000).toFixed(1) + 'K';
  }
  return '$' + num.toString();
}

export function AuburnCampaignDashboard({ data = defaultData, onBack }: AuburnCampaignDashboardProps) {
  const [activeMetric, setActiveMetric] = useState<'likes' | 'engagements' | 'emv'>('likes');
  const [activeLiftMetric, setActiveLiftMetric] = useState<'likes' | 'comments' | 'engagements' | 'emv'>('likes');

  // Gauge shows sponsor ranking percentile (74 = top 26%)
  const gaugePercent = Math.min(100, Math.max(0, data.performance.vsAverage));

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ArrowDown className="w-5 h-5 rotate-90" />
                </button>
              )}
              <img
                src="https://a.espncdn.com/i/teamlogos/ncaa/500/2.png"
                alt="Auburn"
                className="w-14 h-14 object-contain"
              />
              <div>
                <h1 className="text-2xl font-extrabold text-[#0C2340] tracking-wide uppercase">
                  AUBURN
                </h1>
                <p className="text-sm text-gray-500 font-medium">Campaign Performance Report</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:border-[#E87722] transition-colors">
                <Calendar className="w-4 h-4" />
                <span>{data.campaign.name}</span>
                <ArrowDown className="w-4 h-4" />
              </button>
              <p className="text-xs text-gray-500">War Eagle Intelligence</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Hero Card */}
          <div className="rounded-2xl p-8 text-white relative overflow-hidden bg-gradient-to-br from-[#E87722] to-[#C96318]">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="5" cy="5" r="1" fill="currentColor" />
                </pattern>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>
            <div className="absolute top-4 right-4 bg-white/20 border border-white/40 rounded-lg px-3 py-1">
              <span className="text-white text-xs font-bold uppercase">Top 15% Sponsor</span>
            </div>
            <div className="relative z-10 grid grid-cols-2 gap-8">
              <div className="border-r border-white/20 pr-8">
                <p className="text-xs font-bold uppercase tracking-wider opacity-90 mb-2">
                  Total Engagements
                </p>
                <p className="text-5xl font-black leading-none mb-2">
                  {formatNumber(data.metrics.totalEngagements)}
                </p>
                <p className="text-sm opacity-90">
                  Authentic fan interactions
                </p>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider opacity-90 mb-2">
                  Earned Media Value
                </p>
                <p className="text-5xl font-black leading-none mb-2">
                  {formatCurrency(data.metrics.earnedMediaValue)}
                </p>
                <p className="text-sm opacity-90">
                  Organic brand exposure value
                </p>
              </div>
            </div>
          </div>

          {/* Right Metrics Card */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="grid grid-cols-3 gap-4">
              <MetricItem icon={<BarChart3 />} label="Views" value="22.2K" />
              <MetricItem icon={<Heart />} label="Likes" value={formatNumber(data.metrics.likes)} />
              <MetricItem icon={<TrendingUp />} label="Reposts" value="52" />
              <MetricItem icon={<DollarSign />} label="EMV" value={data.metrics.averageEMV} />
              <MetricItem icon={<MessageCircle />} label="Comments" value={data.metrics.comments.toString()} />
              <MetricItem icon={<Users />} label="Accounts" value={data.campaign.athletes.toString()} />
            </div>
          </div>
        </div>

        {/* Metric Toggle */}
        <div className="flex justify-center">
          <div className="inline-flex bg-gray-100 rounded-xl p-1.5 gap-1">
            <ToggleButton
              active={activeMetric === 'likes'}
              onClick={() => setActiveMetric('likes')}
            >
              Likes
            </ToggleButton>
            <div className="w-px bg-gray-300 my-2" />
            <ToggleButton
              active={activeMetric === 'engagements'}
              onClick={() => setActiveMetric('engagements')}
            >
              Engagements
            </ToggleButton>
            <div className="w-px bg-gray-300 my-2" />
            <ToggleButton
              active={activeMetric === 'emv'}
              onClick={() => setActiveMetric('emv')}
            >
              EMV
            </ToggleButton>
          </div>
        </div>

        {/* Performance & Top Post */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Campaign Performance vs Benchmark */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-extrabold text-[#E87722] uppercase tracking-wide">
                Campaign Performance <span className="text-gray-400 font-medium normal-case">vs</span> Benchmark
              </h3>
            </div>
            <div className="p-6">
              <div className="flex flex-col items-center">
                {/* Gauge - Sponsor Ranking */}
                <div className="relative w-52 h-28 mb-4">
                  <svg className="w-full h-full" viewBox="0 0 200 120">
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke="#f3f4f6"
                      strokeWidth="20"
                    />
                    <path
                      d="M 20 100 A 80 80 0 0 1 180 100"
                      fill="none"
                      stroke="#E87722"
                      strokeWidth="20"
                      strokeLinecap="round"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * gaugePercent / 100)}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
                    <span className="text-4xl font-black text-[#E87722]">
                      Top 15%
                    </span>
                    <span className="text-sm text-gray-500 font-medium">of Auburn Sponsors</span>
                  </div>
                </div>
                <div className="flex justify-between w-52 text-xs text-gray-500 mb-2">
                  <span>Bottom</span>
                  <span className="font-semibold">Median</span>
                  <span className="text-[#E87722] font-bold">Top</span>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <div className="w-5 h-1 bg-[#E87722] rounded" />
                  <span className="text-xs text-gray-500">Ranked #18 of 120+ sponsors</span>
                </div>
                <p className="text-xs text-gray-400 mt-4">Based on Auburn partnership data</p>
              </div>
            </div>
          </div>

          {/* Campaign Post */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-extrabold uppercase tracking-wide text-[#E87722]">
                Campaign Post
              </h3>
              <p className="text-sm text-gray-500">
                "Ballers 🤝 Gamers" - The Flight gaming show promo
              </p>
            </div>
            <div className="p-6">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 mb-4">
                <img
                  src={data.topPost.image}
                  alt={data.topPost.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=600&h=400&fit=crop';
                  }}
                />
                <div className="absolute top-4 left-4 bg-black/70 text-white px-3 py-1.5 rounded-lg text-sm font-bold uppercase tracking-wide">
                  {data.topPost.brand}
                </div>
                <a
                  href="https://www.instagram.com/reel/DUEd0DmimWi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 right-4 bg-white/90 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-white transition-colors"
                >
                  View on Instagram →
                </a>
              </div>
              <h4 className="text-xl font-extrabold text-[#0C2340] uppercase mb-3">
                {data.topPost.athletes}
              </h4>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-white px-3 py-1.5 rounded-lg text-sm font-bold bg-[#E87722]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                  22.2K views
                </span>
                <span className="inline-flex items-center gap-1.5 text-white px-3 py-1.5 rounded-lg text-sm font-bold bg-[#0C2340]">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17 1l4 4-4 4"/>
                    <path d="M3 11V9a4 4 0 0 1 4-4h14"/>
                    <path d="M7 23l-4-4 4-4"/>
                    <path d="M21 13v2a4 4 0 0 1-4 4H3"/>
                  </svg>
                  52 reposts
                </span>
              </div>
              <div className="inline-flex items-center gap-3 text-white px-4 py-2 rounded-lg bg-[#E87722]">
                <span className="text-2xl font-black">{formatNumber(data.topPost.likes)}</span>
                <span className="text-sm font-semibold uppercase tracking-wide">Likes</span>
              </div>
              <p className="text-xs text-[#E87722] mt-3 font-medium">
                4.5x more engagement than Nike, Ford & Chevrolet combined
              </p>
            </div>
          </div>
        </div>

        {/* Performance Bar - Sponsor Comparison */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Lowest Sponsor</span>
              <span>Median Sponsor</span>
              <span>Top Sponsor</span>
            </div>
            <div className="relative h-3 bg-gray-100 rounded-full">
              {/* Median marker */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0.5 h-5 bg-gray-400" />
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#E87722] to-[#C96318]"
                style={{ width: '85%' }} // Top 15% = 85% along the bar
              >
                <div className="absolute -top-10 right-0 transform translate-x-1/2">
                  <div className="text-white text-xs font-bold px-2 py-1 rounded whitespace-nowrap bg-[#E87722]">
                    Baumhower's
                    <br />
                    Top 15% of Auburn sponsors
                  </div>
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent mx-auto border-t-[#E87722]" />
                </div>
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>Lowest: 0 likes</span>
              <span>Median: 293 likes</span>
              <span>Top: 33.9K likes</span>
            </div>
          </div>
          <div className="rounded-lg p-4 text-center bg-[#E87722]/10">
            <p className="text-sm text-gray-700">
              Baumhower's <span className="font-bold text-[#E87722]">outperformed 102 other sponsors</span> at Auburn including{' '}
              <span className="font-bold text-[#E87722]">Nike, Ford, Chevrolet, and CVS</span>.
            </p>
          </div>
        </div>

        {/* Rankings */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-extrabold text-[#E87722] uppercase tracking-wide">
              Campaign Rankings
            </h3>
            <p className="text-sm text-gray-500">How this campaign performed across different levels</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <RankingCard
                rank={data.rankings.atSchool}
                title="At School"
                subtitle="Auburn University"
              />
              <RankingCard
                rank={data.rankings.inConference}
                title="In the SEC"
                subtitle="Conference Ranking"
              />
              <RankingCard
                rank={data.rankings.inNCAAAll}
                title="In the NCAA"
                subtitle="All Schools"
              />
            </div>
          </div>
        </div>

        {/* Campaign Lift - Brand Comparison */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="text-lg font-extrabold uppercase tracking-wide text-[#E87722]">
              Baumhower's vs Major National Brands
            </h3>
            <p className="text-sm text-gray-500">
              Your campaign outperformed these Fortune 500 sponsors at Auburn
            </p>
          </div>
          <div className="p-6">
            {/* Lift Toggle */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex bg-gray-100 rounded-xl p-1.5 gap-1">
                {(['likes', 'comments', 'engagements', 'emv'] as const).map((metric, i) => (
                  <>
                    {i > 0 && <div className="w-px bg-gray-300 my-2" />}
                    <ToggleButton
                      key={metric}
                      active={activeLiftMetric === metric}
                      onClick={() => setActiveLiftMetric(metric)}
                    >
                      {metric.charAt(0).toUpperCase() + metric.slice(1)}
                    </ToggleButton>
                  </>
                ))}
              </div>
            </div>

            {/* Lift Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {data.campaignLift.map((lift, index) => (
                <LiftCard key={index} {...lift} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-500 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <img
            src="https://a.espncdn.com/i/teamlogos/ncaa/500/2.png"
            alt="Auburn"
            className="w-6 h-6"
          />
          <span className="font-semibold text-[#0C2340]">Auburn Athletics</span>
        </div>
        <p>Campaign Analysis Report • War Eagle Intelligence</p>
        <p className="mt-1 text-xs">{new Date().toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}</p>
      </footer>
    </div>
  );
}

function MetricItem({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="p-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-2 text-gray-400 mb-1">
        <span className="w-4 h-4">{icon}</span>
        <span className="text-xs font-semibold uppercase tracking-wide">{label}</span>
      </div>
      <p className="text-2xl font-extrabold text-gray-900">{value}</p>
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all ${
        active
          ? 'bg-[#E87722] text-white'
          : 'text-gray-500 hover:bg-[#E87722]/10 hover:text-[#E87722]'
      }`}
    >
      {children}
    </button>
  );
}

function RankingCard({ rank, title, subtitle }: { rank: number; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 hover:shadow-md transition-shadow">
      <div className="w-16 h-16 bg-[#E87722] rounded-xl flex items-center justify-center">
        <span className="text-3xl font-black text-white">#{rank}</span>
      </div>
      <div>
        <h4 className="font-bold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}

function LiftCard({
  athleteName,
  image,
  liftAmount,
  campaignAvg,
  athleteAvg,
}: {
  athleteName: string;
  image: string;
  liftAmount: number;
  campaignAvg: number;
  athleteAvg: number;
  isTeam?: boolean;
}) {
  const isNegative = liftAmount < 0;
  const absLift = Math.abs(liftAmount);
  const isBrandComparison = athleteName.startsWith('vs ');
  const brandName = isBrandComparison ? athleteName.replace('vs ', '') : athleteName;

  return (
    <div className="bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-[4/3] bg-white flex items-center justify-center p-8">
        <img
          src={image}
          alt={brandName}
          className="max-w-full max-h-full object-contain"
          onError={(e) => {
            // Fallback to brand name text
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              const fallback = document.createElement('div');
              fallback.className = 'text-3xl font-bold text-gray-400 uppercase';
              fallback.textContent = brandName;
              parent.appendChild(fallback);
            }
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
          <div className={`inline-block text-white px-3 py-1.5 rounded-lg ${isNegative ? 'bg-red-500' : 'bg-[#E87722]'}`}>
            <span className="text-lg font-extrabold">
              {isNegative ? '' : '+'}{formatNumber(absLift)} Likes
            </span>
            <span className="block text-xs opacity-90">
              {isBrandComparison ? `more than ${brandName}` : 'vs average'}
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 bg-white">
        <p className="text-sm text-gray-600">
          <span className="font-bold text-[#E87722]">Baumhower's: {formatNumber(campaignAvg)}</span>
          {' • '}
          <span className="text-gray-500">{brandName}: {formatNumber(athleteAvg)}</span>
        </p>
      </div>
    </div>
  );
}

export default AuburnCampaignDashboard;
