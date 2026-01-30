/**
 * Playfly Brand Partnership Data
 *
 * This file contains brand partnership information, campaign data,
 * and expansion opportunities for the Playfly network.
 */

// ============================================
// INTERFACES & TYPES
// ============================================

export interface CampaignInfo {
  campaignName: string;
  schoolName: string;
  startDate: Date;
  endDate?: Date;
  athleteParticipants: number;
  expectedReach: number;
  status: string;
  description: string;
}

export interface BrandPartnership {
  brandName: string;
  industryCategory: string;
  activeCampaigns: CampaignInfo[];
  estimatedValue: number;
  schoolsInvolved: string[];
  campaignStatus: 'active' | 'pending' | 'completed';
  estimatedROI: number;
  brandDescription: string;
}

export interface ExpansionOpportunity {
  category: string;
  brands: string[];
  estimatedPartnershipValue: number;
  athleteReach: number;
  growthPotential: 'high' | 'medium' | 'low';
  description: string;
}

// ============================================
// CURRENT BRAND PARTNERS
// ============================================

export const CURRENT_BRAND_PARTNERS: BrandPartnership[] = [
  {
    brandName: 'Nike',
    industryCategory: 'Sports & Apparel',
    activeCampaigns: [
      {
        campaignName: 'Nike Training Series',
        schoolName: 'Penn State University',
        startDate: new Date('2025-09-01'),
        endDate: new Date('2026-01-20'),
        athleteParticipants: 45,
        expectedReach: 8500000,
        status: 'active',
        description: 'Multi-athlete training content series showcasing Nike gear and performance products',
      },
      {
        campaignName: 'Just Do It Campus',
        schoolName: 'Auburn University',
        startDate: new Date('2025-08-15'),
        endDate: new Date('2026-05-30'),
        athleteParticipants: 38,
        expectedReach: 7200000,
        status: 'active',
        description: 'Year-long partnership featuring Auburn athletes in Nike brand campaigns',
      },
      {
        campaignName: 'Nike Football Elite',
        schoolName: 'Louisiana State University',
        startDate: new Date('2025-10-01'),
        athleteParticipants: 52,
        expectedReach: 12000000,
        status: 'active',
        description: 'Premium football content series with LSU star athletes',
      },
    ],
    estimatedValue: 4500000,
    schoolsInvolved: ['Penn State', 'Auburn', 'LSU', 'Virginia', 'Texas A&M'],
    campaignStatus: 'active',
    estimatedROI: 3.2,
    brandDescription: 'Leading athletic apparel and footwear brand with deep college sports partnerships',
  },
  {
    brandName: 'Wegmans',
    industryCategory: 'Food & Beverage',
    activeCampaigns: [
      {
        campaignName: 'Wegmans Game Day Partnership',
        schoolName: 'Penn State University',
        startDate: new Date('2025-09-01'),
        endDate: new Date('2025-12-15'),
        athleteParticipants: 12,
        expectedReach: 3500000,
        status: 'active',
        description: 'Game day food and tailgate content featuring Penn State football athletes',
      },
      {
        campaignName: 'Healthy Athletes Initiative',
        schoolName: 'Penn State University',
        startDate: new Date('2025-08-01'),
        endDate: new Date('2026-03-31'),
        athleteParticipants: 25,
        expectedReach: 4200000,
        status: 'active',
        description: 'Nutrition and wellness content series with Penn State athletes',
      },
    ],
    estimatedValue: 850000,
    schoolsInvolved: ['Penn State', 'Virginia'],
    campaignStatus: 'active',
    estimatedROI: 2.8,
    brandDescription: 'Regional grocery chain with strong presence in Northeast college markets',
  },
  {
    brandName: 'Sheetz',
    industryCategory: 'Food & Beverage',
    activeCampaigns: [
      {
        campaignName: 'Sheetz Local Hero Campaign',
        schoolName: 'Penn State University',
        startDate: new Date('2025-10-01'),
        endDate: new Date('2025-11-30'),
        athleteParticipants: 8,
        expectedReach: 2800000,
        status: 'active',
        description: 'Local athlete spotlight series featuring in-store appearances and social content',
      },
    ],
    estimatedValue: 425000,
    schoolsInvolved: ['Penn State', 'Virginia Tech'],
    campaignStatus: 'active',
    estimatedROI: 2.5,
    brandDescription: 'Mid-Atlantic convenience store chain with strong college sports affinity',
  },
  {
    brandName: 'Raising Cane\'s',
    industryCategory: 'Food & Beverage',
    activeCampaigns: [
      {
        campaignName: 'Campus Eats Series',
        schoolName: 'LSU',
        startDate: new Date('2025-09-15'),
        endDate: new Date('2026-04-30'),
        athleteParticipants: 22,
        expectedReach: 5600000,
        status: 'active',
        description: 'Social media content series featuring LSU athletes and game day experiences',
      },
    ],
    estimatedValue: 680000,
    schoolsInvolved: ['LSU', 'Texas A&M', 'Baylor'],
    campaignStatus: 'active',
    estimatedROI: 3.1,
    brandDescription: 'Fast-food chain with Louisiana roots and strong SEC presence',
  },
  {
    brandName: 'H-E-B',
    industryCategory: 'Food & Beverage',
    activeCampaigns: [
      {
        campaignName: 'Texas Legends',
        schoolName: 'Texas A&M',
        startDate: new Date('2025-08-20'),
        endDate: new Date('2026-05-15'),
        athleteParticipants: 18,
        expectedReach: 6200000,
        status: 'active',
        description: 'Year-long partnership featuring Texas A&M athletes in H-E-B branded content',
      },
      {
        campaignName: 'Baylor Game Day Grocery',
        schoolName: 'Baylor',
        startDate: new Date('2025-09-01'),
        endDate: new Date('2026-02-28'),
        athleteParticipants: 14,
        expectedReach: 4100000,
        status: 'active',
        description: 'Game day preparation and grocery shopping content with Baylor athletes',
      },
    ],
    estimatedValue: 1200000,
    schoolsInvolved: ['Texas A&M', 'Baylor', 'UTSA'],
    campaignStatus: 'active',
    estimatedROI: 3.4,
    brandDescription: 'Texas-based grocery chain with dominant market share and strong sports marketing',
  },
];

// ============================================
// EXPANSION OPPORTUNITIES
// ============================================

export const EXPANSION_OPPORTUNITIES: ExpansionOpportunity[] = [
  {
    category: 'Tech & Consumer Electronics',
    brands: ['Apple', 'Samsung', 'Beats by Dre', 'Meta', 'Google', 'Microsoft'],
    estimatedPartnershipValue: 8500000,
    athleteReach: 15000,
    growthPotential: 'high',
    description: 'High-value tech partnerships leveraging athlete social influence and content creation platforms',
  },
  {
    category: 'Financial Services',
    brands: ['American Express', 'Chase', 'Fidelity', 'Venmo', 'Cash App', 'Capital One'],
    estimatedPartnershipValue: 6200000,
    athleteReach: 15000,
    growthPotential: 'high',
    description: 'Financial literacy and banking partnerships targeting young adult demographic',
  },
  {
    category: 'Fast Casual & CPG',
    brands: ['Chipotle', 'Monster Energy', 'Red Bull', 'GoPro', 'Celsius', 'Liquid Death'],
    estimatedPartnershipValue: 5800000,
    athleteReach: 15000,
    growthPotential: 'high',
    description: 'Youth-focused brands with strong social media presence and athlete affinity',
  },
  {
    category: 'Sports & Fitness',
    brands: ['Under Armour', 'Gatorade', 'Lululemon', 'Peloton', 'Whoop', 'Oura'],
    estimatedPartnershipValue: 7100000,
    athleteReach: 15000,
    growthPotential: 'high',
    description: 'Performance and wellness brands aligned with athlete training and recovery',
  },
  {
    category: 'Automotive',
    brands: ['BMW', 'Honda', 'Ford', 'Toyota', 'Jeep', 'Tesla'],
    estimatedPartnershipValue: 9200000,
    athleteReach: 12000,
    growthPotential: 'medium',
    description: 'Premium and accessible automotive brands targeting college-educated demographic',
  },
  {
    category: 'Gaming & Entertainment',
    brands: ['PlayStation', 'Xbox', 'Nintendo', 'EA Sports', 'Twitch', 'Discord'],
    estimatedPartnershipValue: 4500000,
    athleteReach: 15000,
    growthPotential: 'high',
    description: 'Gaming platforms and entertainment brands with strong college athlete engagement',
  },
  {
    category: 'Beauty & Personal Care',
    brands: ['Dove', 'Old Spice', 'Gillette', 'Axe', 'Degree', 'Native'],
    estimatedPartnershipValue: 3800000,
    athleteReach: 15000,
    growthPotential: 'medium',
    description: 'Personal care brands targeting active lifestyle and athlete demographics',
  },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

export function getTotalBrandValue(): number {
  return CURRENT_BRAND_PARTNERS.reduce((sum, partner) => sum + partner.estimatedValue, 0);
}

export function getTotalExpansionValue(): number {
  return EXPANSION_OPPORTUNITIES.reduce((sum, opp) => sum + opp.estimatedPartnershipValue, 0);
}

export function getActiveCampaignCount(): number {
  return CURRENT_BRAND_PARTNERS.reduce((sum, partner) => sum + partner.activeCampaigns.length, 0);
}

export function getBrandsByCategory(category: string): BrandPartnership[] {
  return CURRENT_BRAND_PARTNERS.filter(partner => partner.industryCategory === category);
}

export function getHighGrowthOpportunities(): ExpansionOpportunity[] {
  return EXPANSION_OPPORTUNITIES.filter(opp => opp.growthPotential === 'high');
}

export function getAverageROI(): number {
  const totalROI = CURRENT_BRAND_PARTNERS.reduce((sum, partner) => sum + partner.estimatedROI, 0);
  return totalROI / CURRENT_BRAND_PARTNERS.length;
}

export function getTotalExpectedReach(): number {
  return CURRENT_BRAND_PARTNERS.reduce(
    (sum, partner) =>
      sum + partner.activeCampaigns.reduce((campaignSum, campaign) => campaignSum + campaign.expectedReach, 0),
    0
  );
}

export function getCampaignsBySchool(schoolName: string): CampaignInfo[] {
  return CURRENT_BRAND_PARTNERS.flatMap(partner =>
    partner.activeCampaigns.filter(campaign => campaign.schoolName === schoolName)
  );
}
