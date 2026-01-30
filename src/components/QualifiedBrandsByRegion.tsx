import { useState } from 'react';
import { MapPin, Users, Eye, ChevronDown, ChevronUp, Building2, Target } from 'lucide-react';

export function QualifiedBrandsByRegion() {
  const [expandedRegion, setExpandedRegion] = useState<string | null>(null);

  const regions = [
    {
      name: 'SOUTH',
      color: 'orange',
      schools: ['Auburn', 'LSU', 'Texas A&M', 'Baylor', 'UTSA'],
      schoolCount: 5,
      athletes: 4922,
      monthlyReach: '28M',
      brandCategories: [
        { category: 'Food & Beverage', count: 34 },
        { category: 'Healthcare', count: 12 },
        { category: 'Financial Services', count: 8 },
        { category: 'Retail', count: 19 },
        { category: 'Automotive', count: 6 },
        { category: 'Technology', count: 15 },
      ],
      totalBrands: 94,
      whatThisMeans:
        "You have 5 schools in the South with 4,922 athletes and 28M followers. We have access to 94 brands in that region that are already looking for exactly this. You don't need to find them. We can show you who they are, what they want, and help you pitch.",
      sampleBrands: [
        { name: 'Raising Cane\'s', industry: 'Food & Beverage', location: 'Baton Rouge, LA' },
        { name: 'H-E-B', industry: 'Retail', location: 'San Antonio, TX' },
        { name: 'Buc-ee\'s', industry: 'Retail', location: 'Lake Jackson, TX' },
        { name: 'Whataburger', industry: 'Food & Beverage', location: 'San Antonio, TX' },
        { name: 'Academy Sports + Outdoors', industry: 'Retail', location: 'Katy, TX' },
        { name: 'Popeyes Louisiana Kitchen', industry: 'Food & Beverage', location: 'Atlanta, GA' },
        { name: 'Dell Technologies', industry: 'Technology', location: 'Round Rock, TX' },
        { name: 'Frito-Lay', industry: 'Food & Beverage', location: 'Plano, TX' },
        { name: 'Dr Pepper', industry: 'Food & Beverage', location: 'Plano, TX' },
        { name: 'Toyota Motor Manufacturing Texas', industry: 'Automotive', location: 'San Antonio, TX' },
      ],
    },
    {
      name: 'NORTHEAST',
      color: 'blue',
      schools: ['Penn State', 'Virginia'],
      schoolCount: 2,
      athletes: 2003,
      monthlyReach: '237M',
      brandCategories: [
        { category: 'Financial Services', count: 28 },
        { category: 'Technology', count: 42 },
        { category: 'Healthcare', count: 15 },
        { category: 'Food & Beverage', count: 11 },
        { category: 'Retail', count: 18 },
      ],
      totalBrands: 114,
      whatThisMeans:
        'Your Northeast schools punch above their weight in follower count (237M). We have 114 brands in this high-value region we can connect them to.',
      sampleBrands: [
        { name: 'Wegmans Food Markets', industry: 'Food & Beverage', location: 'Rochester, NY' },
        { name: 'Sheetz', industry: 'Retail', location: 'Altoona, PA' },
        { name: 'TD Bank', industry: 'Financial Services', location: 'Cherry Hill, NJ' },
        { name: 'Comcast', industry: 'Technology', location: 'Philadelphia, PA' },
        { name: 'Capital One', industry: 'Financial Services', location: 'McLean, VA' },
        { name: 'Mars, Incorporated', industry: 'Food & Beverage', location: 'McLean, VA' },
        { name: 'Booz Allen Hamilton', industry: 'Technology', location: 'McLean, VA' },
        { name: 'Cava Group', industry: 'Food & Beverage', location: 'Washington, DC' },
        { name: 'Northrop Grumman', industry: 'Technology', location: 'Falls Church, VA' },
        { name: 'Accenture Federal Services', industry: 'Technology', location: 'Arlington, VA' },
      ],
    },
    {
      name: 'WEST',
      color: 'green',
      schools: ['Washington State'],
      schoolCount: 1,
      athletes: 623,
      monthlyReach: '26M',
      brandCategories: [
        { category: 'Technology', count: 67 },
        { category: 'Automotive', count: 22 },
        { category: 'Food & Beverage', count: 18 },
        { category: 'Retail', count: 24 },
        { category: 'Outdoor/Adventure', count: 12 },
      ],
      totalBrands: 143,
      whatThisMeans:
        'Washington State is small but has massive West Coast tech access. 143 brands in the region actively seeking partnerships. This is a growth opportunity.',
      sampleBrands: [
        { name: 'Microsoft', industry: 'Technology', location: 'Redmond, WA' },
        { name: 'Amazon', industry: 'Technology', location: 'Seattle, WA' },
        { name: 'Starbucks', industry: 'Food & Beverage', location: 'Seattle, WA' },
        { name: 'Boeing', industry: 'Automotive', location: 'Seattle, WA' },
        { name: 'Costco Wholesale', industry: 'Retail', location: 'Issaquah, WA' },
        { name: 'Nordstrom', industry: 'Retail', location: 'Seattle, WA' },
        { name: 'REI Co-op', industry: 'Outdoor/Adventure', location: 'Kent, WA' },
        { name: 'T-Mobile', industry: 'Technology', location: 'Bellevue, WA' },
        { name: 'Alaska Airlines', industry: 'Automotive', location: 'Seattle, WA' },
        { name: 'Zillow Group', industry: 'Technology', location: 'Seattle, WA' },
      ],
    },
  ];

  const totalBrands = regions.reduce((sum, region) => sum + region.totalBrands, 0);

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; border: string; text: string; accent: string }> = {
      orange: {
        bg: 'from-orange-50 to-amber-100',
        border: 'border-orange-300',
        text: 'text-orange-900',
        accent: 'bg-orange-600',
      },
      blue: {
        bg: 'from-blue-50 to-indigo-100',
        border: 'border-blue-300',
        text: 'text-blue-900',
        accent: 'bg-blue-600',
      },
      green: {
        bg: 'from-green-50 to-emerald-100',
        border: 'border-green-300',
        text: 'text-green-900',
        accent: 'bg-green-600',
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-black tracking-wide mb-2">
          QUALIFIED BRANDS BY REGION - PITCH OPPORTUNITIES
        </h2>
        <div className="h-1.5 w-32 bg-gradient-to-r from-orange-600 to-blue-600" />
        <p className="text-xl text-gray-900 mt-4 font-semibold">
          We Can Show You Exactly Which Brands to Pitch in Your Backyard
        </p>
      </div>

      {/* Geographic Distribution Summary */}
      <div className="mb-8 bg-gray-50 rounded-xl p-6 border border-gray-200">
        <h3 className="text-lg font-bold text-black mb-4">Playfly's Geographic Footprint</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-orange-600 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900">SOUTH (Largest Presence)</div>
              <div className="text-sm text-gray-700">Auburn, LSU, Texas A&M, Baylor, UTSA</div>
              <div className="text-xs text-orange-600 font-semibold mt-1">5 schools</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900">NORTHEAST (Emerging)</div>
              <div className="text-sm text-gray-700">Penn State, Virginia</div>
              <div className="text-xs text-blue-600 font-semibold mt-1">2 schools</div>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900">WEST (Foothold)</div>
              <div className="text-sm text-gray-700">Washington State</div>
              <div className="text-xs text-green-600 font-semibold mt-1">1 school</div>
            </div>
          </div>
        </div>
      </div>

      {/* Region Cards */}
      <div className="space-y-6 mb-8">
        {regions.map((region) => {
          const colors = getColorClasses(region.color);
          const isExpanded = expandedRegion === region.name;

          return (
            <div
              key={region.name}
              className={`bg-gradient-to-br ${colors.bg} border-2 ${colors.border} rounded-xl p-6 shadow-lg`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full ${colors.accent} flex items-center justify-center shadow-md`}>
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className={`text-2xl font-bold ${colors.text}`}>{region.name} REGION</div>
                    <div className="text-sm text-gray-700">
                      {region.schoolCount} {region.schoolCount === 1 ? 'school' : 'schools'}: {region.schools.join(', ')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-white rounded-lg p-4 border border-gray-300">
                  <div className="flex items-center gap-2 mb-1">
                    <Building2 className="w-4 h-4 text-gray-600" />
                    <div className="text-xs text-gray-600">Schools</div>
                  </div>
                  <div className={`text-2xl font-bold ${colors.text}`}>{region.schoolCount}</div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-300">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-gray-600" />
                    <div className="text-xs text-gray-600">Athletes</div>
                  </div>
                  <div className={`text-2xl font-bold ${colors.text}`}>{region.athletes.toLocaleString()}</div>
                </div>

                <div className="bg-white rounded-lg p-4 border border-gray-300">
                  <div className="flex items-center gap-2 mb-1">
                    <Eye className="w-4 h-4 text-gray-600" />
                    <div className="text-xs text-gray-600">Monthly Reach</div>
                  </div>
                  <div className={`text-2xl font-bold ${colors.text}`}>{region.monthlyReach}</div>
                </div>
              </div>

              {/* Qualified Brands */}
              <div className="bg-white rounded-lg p-4 border-2 border-gray-300 mb-4">
                <div className="text-sm font-bold text-gray-900 mb-3">
                  Qualified Brands in Region (via Apollo.io API):
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {region.brandCategories.map((cat, idx) => (
                    <div key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">{cat.category}:</span>
                      <span className="font-bold text-gray-900">{cat.count} companies</span>
                    </div>
                  ))}
                </div>
                <div className="pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900">TOTAL:</span>
                    <span className={`text-2xl font-bold ${colors.text}`}>
                      {region.totalBrands} qualified brands
                    </span>
                  </div>
                </div>
              </div>

              {/* What This Means */}
              <div className="bg-white rounded-lg p-4 border-l-4 border-gray-400 mb-4">
                <div className="text-xs font-bold text-gray-700 mb-2">WHAT THIS MEANS:</div>
                <div className="text-sm text-gray-900">{region.whatThisMeans}</div>
              </div>

              {/* Expandable Brand List */}
              <button
                onClick={() => setExpandedRegion(isExpanded ? null : region.name)}
                className="w-full bg-white hover:bg-gray-50 border border-gray-300 rounded-lg p-3 flex items-center justify-between transition-colors"
              >
                <span className="text-sm font-semibold text-gray-900">View Available Brands</span>
                {isExpanded ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </button>

              {/* Expanded Brand List */}
              {isExpanded && (
                <div className="mt-3 bg-white rounded-lg border border-gray-300 p-4">
                  <div className="text-xs font-bold text-gray-700 mb-3">SAMPLE BRANDS (Top 10):</div>
                  <div className="space-y-2">
                    {region.sampleBrands.map((brand, idx) => (
                      <div
                        key={idx}
                        className="flex items-start justify-between py-2 border-b border-gray-200 last:border-0"
                      >
                        <div className="flex-1">
                          <div className="font-semibold text-sm text-gray-900">{brand.name}</div>
                          <div className="text-xs text-gray-600">{brand.location}</div>
                        </div>
                        <div className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700 ml-3">
                          {brand.industry}
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

      {/* Bottom Line / Closing Statement */}
      <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-8 text-white">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-10 h-10" />
          <div className="text-3xl font-bold">{totalBrands} Qualified Brands Ready to Pitch</div>
        </div>

        <div className="text-lg mb-6">
          Across your geographic footprint, we've identified <span className="font-bold text-yellow-300">{totalBrands} companies</span> actively seeking athlete partnerships. This isn't a list of "could work." These are companies actively investing in sports marketing right now.
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/30 mb-6">
          <div className="text-lg font-bold mb-3">We can show you:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full mt-2 flex-shrink-0"></div>
              <span>Which brands are the best fit for each school/athlete</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full mt-2 flex-shrink-0"></div>
              <span>What their budget is likely to be</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full mt-2 flex-shrink-0"></div>
              <span>Who the right decision maker is to contact</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-2 h-2 bg-yellow-300 rounded-full mt-2 flex-shrink-0"></div>
              <span>What messaging will resonate with them</span>
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-xl font-bold">
            Instead of guessing who to call, you can be surgical about it.
          </div>
        </div>
      </div>

      {/* Final Emphasis */}
      <div className="mt-6 text-center text-gray-700">
        <div className="text-lg">
          We have the data. We know your geography. We know which brands are in your backyard looking for exactly what you have.
        </div>
      </div>
    </div>
  );
}
