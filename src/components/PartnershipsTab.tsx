import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SchoolPartnershipData {
  school: {
    _id: string;
    name: string;
  };
  followers: number;
  overall: {
    totalContents: number;
    avgLikes: number;
    avgComments: number;
    engagementRate: number;
    emv: number;
  };
  sponsorPartners: Array<{
    totalContents: number;
    avgLikes: number;
    avgComments: number;
    sponsorPartner: string;
    engagementRate: number;
    emv: number;
    engagementRateLift: number;
  }>;
}

interface BrandPartnershipData {
  totalPosts: number;
  activeBrands: number;
  activeSchools: number;
  totalSchools: number;
  avgPostsPerBrand: number;
  brandStats: Array<{
    brandName: string;
    postCount: number;
    schoolCount: number;
    avgEngagementRate: number;
  }>;
}

interface PartnershipsTabProps {
  selectedSchool: string;
  schoolPartnershipData: SchoolPartnershipData[];
  brandData: BrandPartnershipData | null;
  formatNumber: (num: number) => string;
  formatEMV: (emv: number) => string;
}

export function PartnershipsTab({
  selectedSchool,
  schoolPartnershipData,
  formatNumber,
  formatEMV
}: PartnershipsTabProps) {
  const [partnershipSearchQuery, setPartnershipSearchQuery] = useState('');
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [engagementFilter, setEngagementFilter] = useState<'all' | 'high' | 'mid' | 'low'>('all');
  const [expandedIndustries, setExpandedIndustries] = useState<Set<string>>(new Set());

  // Industry categorization function
  const categorizeByIndustry = (brandName: string): string => {
    const name = brandName.toLowerCase();

    // Food & Beverage
    if (name.includes('raising_cane') || name.includes('h-e-b') || name.includes('sheetz') ||
        name.includes('wegmans') || name.includes('gatorade') || name.includes('red_bull') ||
        name.includes('monster') || name.includes('c4') || name.includes('bodyarmor') ||
        name.includes('chipotle') || name.includes('chick-fil-a') || name.includes('buffalo') ||
        name.includes('whataburger') || name.includes('in-n-out') || name.includes('canes') ||
        name.includes('redbull') || name.includes('energy') || name.includes('drink') ||
        name.includes('food') || name.includes('restaurant') || name.includes('burger')) {
      return 'Food & Beverage';
    }

    // Athletic
    if (name.includes('nike') || name.includes('adidas') || name.includes('under_armour') ||
        name.includes('new_balance') || name.includes('puma') || name.includes('jordan') ||
        name.includes('lululemon') || name.includes('athletic') || name.includes('sport')) {
      return 'Athletic';
    }

    // Retail
    if (name.includes('dick') || name.includes('fanatics') || name.includes('amazon') ||
        name.includes('walmart') || name.includes('target') || name.includes('retail')) {
      return 'Retail';
    }

    // Auto/Tech
    if (name.includes('apple') || name.includes('samsung') || name.includes('gopro') ||
        name.includes('bose') || name.includes('beats') || name.includes('sony') ||
        name.includes('xbox') || name.includes('playstation') || name.includes('tech') ||
        name.includes('car') || name.includes('auto')) {
      return 'Auto/Tech';
    }

    // Lifestyle
    if (name.includes('oakley') || name.includes('ray-ban') || name.includes('lifestyle')) {
      return 'Lifestyle';
    }

    // Entertainment
    if (name.includes('ea_sports') || name.includes('2k') || name.includes('panini') ||
        name.includes('topps') || name.includes('spotify') || name.includes('entertainment') ||
        name.includes('gaming') || name.includes('game')) {
      return 'Entertainment';
    }

    // Financial
    if (name.includes('bank') || name.includes('credit') || name.includes('financial') ||
        name.includes('insurance') || name.includes('loan')) {
      return 'Financial';
    }

    return 'Other';
  };

  const toggleIndustry = (industry: string) => {
    setExpandedIndustries(prev => {
      const newSet = new Set(prev);
      if (newSet.has(industry)) {
        newSet.delete(industry);
      } else {
        newSet.add(industry);
      }
      return newSet;
    });
  };

  // Network view - show all brands from school partnership data
  if (selectedSchool === 'all') {
    // Aggregate all brands across schools
    const allBrands = new Map<string, {
      name: string;
      totalPosts: number;
      schools: Set<string>;
      totalEMV: number;
      avgEngagement: number;
      engagementLift: number[];
      totalLikes: number;
      totalComments: number;
    }>();

    schoolPartnershipData.forEach(school => {
      school.sponsorPartners.forEach(partner => {
        const existing = allBrands.get(partner.sponsorPartner);
        if (existing) {
          existing.totalPosts += partner.totalContents;
          existing.schools.add(school.school.name);
          existing.totalEMV += partner.emv;
          existing.avgEngagement += partner.engagementRate;
          existing.engagementLift.push(partner.engagementRateLift);
          existing.totalLikes += partner.avgLikes * partner.totalContents;
          existing.totalComments += partner.avgComments * partner.totalContents;
        } else {
          allBrands.set(partner.sponsorPartner, {
            name: partner.sponsorPartner,
            totalPosts: partner.totalContents,
            schools: new Set([school.school.name]),
            totalEMV: partner.emv,
            avgEngagement: partner.engagementRate,
            engagementLift: [partner.engagementRateLift],
            totalLikes: partner.avgLikes * partner.totalContents,
            totalComments: partner.avgComments * partner.totalContents
          });
        }
      });
    });

    // Convert to array and calculate averages
    const brandsArray = Array.from(allBrands.values()).map(brand => ({
      name: brand.name,
      totalPosts: brand.totalPosts,
      schoolCount: brand.schools.size,
      totalEMV: brand.totalEMV,
      avgEngagement: brand.avgEngagement / brand.engagementLift.length,
      avgLift: brand.engagementLift.reduce((sum, lift) => sum + lift, 0) / brand.engagementLift.length,
      avgLikes: brand.totalLikes / brand.totalPosts,
      avgComments: brand.totalComments / brand.totalPosts,
      totalEngagement: brand.totalLikes + brand.totalComments
    }));

    // Sort by total EMV (descending)
    const sortedBrands = brandsArray.sort((a, b) => b.totalEMV - a.totalEMV);

    // Filter by search query
    const filteredBrands = partnershipSearchQuery
      ? sortedBrands.filter(brand =>
          brand.name.toLowerCase().includes(partnershipSearchQuery.toLowerCase())
        )
      : sortedBrands;

    // Filter by engagement level
    const engagementFilteredBrands = engagementFilter === 'all'
      ? filteredBrands
      : filteredBrands.filter(brand => {
          if (engagementFilter === 'high') return brand.avgLift > 100;
          if (engagementFilter === 'mid') return brand.avgLift >= 0 && brand.avgLift <= 100;
          if (engagementFilter === 'low') return brand.avgLift < 0;
          return true;
        });

    // Show top 20 or all
    const displayedBrands = showAllBrands
      ? engagementFilteredBrands
      : engagementFilteredBrands.slice(0, 20);

    // Group brands by industry
    const brandsByIndustry = brandsArray.reduce((acc, brand) => {
      const industry = categorizeByIndustry(brand.name);
      if (!acc[industry]) {
        acc[industry] = [];
      }
      acc[industry].push(brand);
      return acc;
    }, {} as Record<string, typeof brandsArray>);

    // Calculate industry stats
    const industryStats = Object.entries(brandsByIndustry).map(([industry, brands]) => ({
      industry,
      brandCount: brands.length,
      totalPosts: brands.reduce((sum, b) => sum + b.totalPosts, 0),
      totalEMV: brands.reduce((sum, b) => sum + b.totalEMV, 0),
      avgLift: brands.reduce((sum, b) => sum + b.avgLift, 0) / brands.length,
      topBrands: brands.sort((a, b) => b.totalEMV - a.totalEMV).slice(0, 5)
    })).sort((a, b) => b.totalEMV - a.totalEMV);

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-3xl font-bold text-white">Network Brand Partnerships</h3>
            <p className="text-white/60 mt-2">Brands leveraging school IP across your network</p>
          </div>
          <div className="text-sm text-white/60">
            {brandsArray.length} total brands
          </div>
        </div>

        {/* Network Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-black/40 border-2 border-[#1770C0] rounded-xl p-6">
            <div className="text-sm text-white/60 mb-2">Sponsored Posts</div>
            <div className="text-4xl font-bold text-[#3B9FD9]">
              {formatNumber(schoolPartnershipData.reduce((sum, s) =>
                sum + s.sponsorPartners.reduce((pSum, p) => pSum + p.totalContents, 0), 0))}
            </div>
          </div>
          <div className="bg-black/40 border-2 border-[#1770C0] rounded-xl p-6">
            <div className="text-sm text-white/60 mb-2">Active Brands</div>
            <div className="text-4xl font-bold text-white">{brandsArray.length}</div>
          </div>
          <div className="bg-black/40 border-2 border-[#1770C0] rounded-xl p-6">
            <div className="text-sm text-white/60 mb-2">Active Schools</div>
            <div className="text-4xl font-bold text-white">{schoolPartnershipData.length}</div>
          </div>
          <div className="bg-black/40 border-2 border-[#1770C0] rounded-xl p-6">
            <div className="text-sm text-white/60 mb-2">Total EMV</div>
            <div className="text-4xl font-bold text-green-400">
              {formatEMV(brandsArray.reduce((sum, b) => sum + b.totalEMV, 0))}
            </div>
          </div>
        </div>

        {/* Industry Breakdown */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-2xl font-bold text-white">Brand Deals by Industry</h4>
            <div className="text-sm text-white/60">
              {industryStats.length} industries
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {industryStats.map(industry => {
              const isExpanded = expandedIndustries.has(industry.industry);
              return (
                <div
                  key={industry.industry}
                  className="bg-black/40 border border-white/10 rounded-xl overflow-hidden"
                >
                  {/* Industry Header */}
                  <button
                    onClick={() => toggleIndustry(industry.industry)}
                    className="w-full p-6 hover:bg-white/5 transition-colors text-left"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h5 className="text-xl font-bold text-white">{industry.industry}</h5>
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-white/60" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-white/60" />
                      )}
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-white/60 mb-1">Brands</div>
                        <div className="text-2xl font-bold text-white">{industry.brandCount}</div>
                      </div>
                      <div>
                        <div className="text-xs text-white/60 mb-1">Posts</div>
                        <div className="text-2xl font-bold text-[#3B9FD9]">{formatNumber(industry.totalPosts)}</div>
                      </div>
                      <div>
                        <div className="text-xs text-white/60 mb-1">Total EMV</div>
                        <div className="text-2xl font-bold text-green-400">{formatEMV(industry.totalEMV)}</div>
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content - Top Brands */}
                  {isExpanded && (
                    <div className="border-t border-white/10 p-4 bg-black/20">
                      <div className="text-sm text-white/60 mb-3 font-semibold">Top Brands</div>
                      <div className="space-y-2">
                        {industry.topBrands.map((brand, index) => (
                          <div
                            key={brand.name}
                            className="flex items-center justify-between p-3 bg-white/5 rounded-lg"
                          >
                            <div className="flex items-center gap-3">
                              <div className="text-white/40 font-mono text-xs">#{index + 1}</div>
                              <div className="text-white font-semibold capitalize">
                                {brand.name.replace(/_/g, ' ')}
                              </div>
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <div className="text-white/60">
                                {formatNumber(brand.totalPosts)} posts
                              </div>
                              <div className="text-green-400 font-bold font-mono">
                                {formatEMV(brand.totalEMV)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-black/40 border border-white/10 rounded-xl p-6">
          <div className="flex flex-col md:flex-row gap-4 items-end">
            <div className="flex-1">
              <label className="text-sm text-white/60 mb-2 block">Search Brands</label>
              <input
                type="text"
                placeholder="Search brands..."
                value={partnershipSearchQuery}
                onChange={(e) => setPartnershipSearchQuery(e.target.value)}
                className="w-full bg-black/60 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-[#3B9FD9] focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm text-white/60 mb-2 block">Engagement Level</label>
              <select
                value={engagementFilter}
                onChange={(e) => setEngagementFilter(e.target.value as any)}
                className="bg-black/60 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-[#3B9FD9] focus:outline-none"
              >
                <option value="all">All Engagement</option>
                <option value="high">High (&gt;100% lift)</option>
                <option value="mid">Mid (0-100% lift)</option>
                <option value="low">Low (&lt;0% lift)</option>
              </select>
            </div>

            <div className="text-sm text-white/60">
              Showing {displayedBrands.length} of {engagementFilteredBrands.length} brands
            </div>
          </div>
        </div>

        {/* Brands Table */}
        <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h4 className="text-xl font-bold text-white">Brand Partners</h4>
            <p className="text-sm text-white/60 mt-1">
              {showAllBrands ? 'All brands' : 'Top 20 brands'} ranked by total EMV
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#1770C0]/20 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">#</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">Brand</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white/80">Total Posts</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white/80">Schools</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white/80">Avg Likes</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white/80">Avg Comments</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white/80">Total Engagement</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white/80">Engagement Rate</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white/80">Total EMV</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-white/80">Avg Lift</th>
                </tr>
              </thead>
              <tbody>
                {displayedBrands.map((brand, index) => (
                  <tr
                    key={brand.name}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-white/60 font-mono text-sm">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-white font-semibold capitalize">
                      {brand.name.replace(/_/g, ' ')}
                    </td>
                    <td className="px-6 py-4 text-right text-white/80 font-mono">
                      {formatNumber(brand.totalPosts)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="text-[#3B9FD9] font-semibold">
                        {brand.schoolCount} / {schoolPartnershipData.length}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right text-[#3B9FD9] font-mono">
                      {formatNumber(brand.avgLikes)}
                    </td>
                    <td className="px-6 py-4 text-right text-[#3B9FD9] font-mono">
                      {formatNumber(brand.avgComments)}
                    </td>
                    <td className="px-6 py-4 text-right text-white font-bold font-mono">
                      {formatNumber(brand.totalEngagement)}
                    </td>
                    <td className="px-6 py-4 text-right text-white/80 font-mono">
                      {(brand.avgEngagement * 100).toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 text-right text-green-400 font-bold font-mono">
                      {formatEMV(brand.totalEMV)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={`font-semibold ${
                        brand.avgLift > 0 ? 'text-green-400' : brand.avgLift < 0 ? 'text-red-400' : 'text-white/60'
                      }`}>
                        {brand.avgLift > 0 ? '+' : ''}{brand.avgLift.toFixed(1)}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* View All / Download Controls */}
          <div className="p-6 border-t border-white/10 flex justify-between items-center">
            <button
              onClick={() => setShowAllBrands(!showAllBrands)}
              className="px-6 py-2 bg-[#1770C0] hover:bg-[#1770C0]/80 text-white rounded-lg font-semibold transition-all"
            >
              {showAllBrands ? 'Show Top 20' : `View All ${engagementFilteredBrands.length} Brands`}
            </button>
            <button
              className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-semibold transition-all"
            >
              Download CSV
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Individual school view
  const schoolData = schoolPartnershipData.find(s => s.school.name === selectedSchool);

  if (!schoolData) {
    return (
      <div className="space-y-8">
        <h3 className="text-3xl font-bold text-white">{selectedSchool} - Brand Partnerships</h3>
        <div className="bg-black/40 border border-white/10 rounded-xl p-8 text-center">
          <p className="text-white/60">No partnership data available for this school</p>
        </div>
      </div>
    );
  }

  // Filter brands
  const filteredPartners = partnershipSearchQuery
    ? schoolData.sponsorPartners.filter(p =>
        p.sponsorPartner.toLowerCase().includes(partnershipSearchQuery.toLowerCase())
      )
    : schoolData.sponsorPartners;

  const sortedPartners = [...filteredPartners].sort((a, b) => b.emv - a.emv);

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-3xl font-bold text-white">{selectedSchool} - Brand Partnerships</h3>
        <p className="text-white/60 mt-2">Brands working with your school's athletes</p>
      </div>

      {/* School Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black/40 border-2 border-[#1770C0] rounded-xl p-6">
          <div className="text-sm text-white/60 mb-2">Total Brands</div>
          <div className="text-4xl font-bold text-white">{schoolData.sponsorPartners.length}</div>
        </div>
        <div className="bg-black/40 border-2 border-[#1770C0] rounded-xl p-6">
          <div className="text-sm text-white/60 mb-2">Total Posts</div>
          <div className="text-4xl font-bold text-white">{formatNumber(schoolData.overall.totalContents)}</div>
        </div>
        <div className="bg-black/40 border-2 border-[#1770C0] rounded-xl p-6">
          <div className="text-sm text-white/60 mb-2">Total EMV</div>
          <div className="text-4xl font-bold text-green-400">
            {formatEMV(schoolData.sponsorPartners.reduce((sum, p) => sum + p.emv, 0))}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-black/40 border border-white/10 rounded-xl p-6">
        <input
          type="text"
          placeholder="Search brands..."
          value={partnershipSearchQuery}
          onChange={(e) => setPartnershipSearchQuery(e.target.value)}
          className="w-full bg-black/60 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-[#3B9FD9] focus:outline-none"
        />
      </div>

      {/* School Brands Table */}
      <div className="bg-black/40 border border-white/10 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <h4 className="text-xl font-bold text-white">Brand Partners</h4>
          <p className="text-sm text-white/60 mt-1">Showing {sortedPartners.length} brands</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#1770C0]/20 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">#</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white/80">Brand</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-white/80">Posts</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-white/80">Avg Likes</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-white/80">Avg Comments</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-white/80">Total Engagement</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-white/80">Engagement Rate</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-white/80">EMV</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-white/80">Engagement Lift</th>
              </tr>
            </thead>
            <tbody>
              {sortedPartners.map((partner, index) => {
                const totalEngagement = (partner.avgLikes + partner.avgComments) * partner.totalContents;
                return (
                  <tr
                    key={partner.sponsorPartner}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-white/60 font-mono text-sm">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-white font-semibold capitalize">
                      {partner.sponsorPartner.replace(/_/g, ' ')}
                    </td>
                    <td className="px-6 py-4 text-right text-white/80 font-mono">
                      {formatNumber(partner.totalContents)}
                    </td>
                    <td className="px-6 py-4 text-right text-[#3B9FD9] font-mono">
                      {formatNumber(partner.avgLikes)}
                    </td>
                    <td className="px-6 py-4 text-right text-[#3B9FD9] font-mono">
                      {formatNumber(partner.avgComments)}
                    </td>
                    <td className="px-6 py-4 text-right text-white font-bold font-mono">
                      {formatNumber(totalEngagement)}
                    </td>
                    <td className="px-6 py-4 text-right text-white/80 font-mono">
                      {(partner.engagementRate * 100).toFixed(2)}%
                    </td>
                    <td className="px-6 py-4 text-right text-green-400 font-bold font-mono">
                      {formatEMV(partner.emv)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className={`font-semibold ${
                        partner.engagementRateLift > 0 ? 'text-green-400' : partner.engagementRateLift < 0 ? 'text-red-400' : 'text-white/60'
                      }`}>
                        {partner.engagementRateLift > 0 ? '+' : ''}{partner.engagementRateLift.toFixed(1)}%
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
