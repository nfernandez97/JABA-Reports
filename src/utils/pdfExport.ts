import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { format } from 'date-fns';
import { PLAYFLY_MAX_PARTNERS } from '../data/playflyNetworkData';
import { getSchoolConferencePerformance } from '../data/networkRevenueMetrics';

export function generateExecutiveReportPDF() {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();

  const formatCurrency = (num: number): string => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(1)}M`;
    return `$${num.toFixed(0)}`;
  };

  // === PAGE 1: COVER ===
  doc.setFillColor(37, 99, 235);
  doc.rect(0, 0, pageWidth, pageHeight, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont('helvetica', 'bold');
  doc.text('PLAYFLY NETWORK', pageWidth / 2, 90, { align: 'center' });
  doc.text('REVENUE OPPORTUNITY', pageWidth / 2, 110, { align: 'center' });
  doc.text('ANALYSIS', pageWidth / 2, 130, { align: 'center' });

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text(format(new Date(), 'MMMM dd, yyyy'), pageWidth / 2, 160, { align: 'center' });

  doc.setFontSize(10);
  doc.text('CONFIDENTIAL', pageWidth / 2, pageHeight - 20, { align: 'center' });

  // === PAGE 2: EXECUTIVE SUMMARY ===
  doc.addPage();
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Executive Summary', 14, 25);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  let y = 40;

  // The Opportunity
  doc.setFont('helvetica', 'bold');
  doc.text('The $17-30 Million Opportunity', 14, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.text('Current estimated network revenue: $22.7M annually', 14, y);
  y += 6;
  doc.text('Conservative optimized potential: $40-52M annually', 14, y);
  y += 6;
  doc.text('The gap: $17-30M in unrealized revenue', 14, y);
  y += 12;

  // Three Key Findings
  doc.setFont('helvetica', 'bold');
  doc.text('Three Key Findings:', 14, y);
  y += 8;
  doc.setFont('helvetica', 'normal');

  doc.text('1. IP Premium: Branded content gets +45% more engagement, but pricing', 14, y);
  y += 6;
  doc.text('   doesn\'t reflect this. $7.9M annual opportunity.', 14, y);
  y += 8;

  doc.text('2. Idle Athletes: 10,500 athletes (70%) are posting but not monetized.', 14, y);
  y += 6;
  doc.text('   Activating half at $2K deals = $10.5M annual revenue.', 14, y);
  y += 8;

  doc.text('3. Pricing Gaps: Top athletes and major brand deals are underpriced', 14, y);
  y += 6;
  doc.text('   by 20-40% vs benchmarks. $3.9M opportunity in repricing alone.', 14, y);
  y += 12;

  // What's Possible
  doc.setFont('helvetica', 'bold');
  doc.text('What\'s Possible If You Execute:', 14, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.text('Year 1: +$3-5M (optimize pricing, IP premium for new deals)', 14, y);
  y += 6;
  doc.text('Year 2: +$15-20M (50% idle athlete activation, full optimization)', 14, y);
  y += 6;
  doc.text('Year 3: +$22-30M+ (systematic school-by-school optimization)', 14, y);

  // === PAGE 3: CURRENT VS POTENTIAL ===
  doc.addPage();
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Current vs. Potential', 14, 25);

  y = 45;

  // Left side - Current
  doc.setFillColor(220, 220, 220);
  doc.roundedRect(14, y, 85, 100, 3, 3, 'F');

  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('CURRENT REVENUE', 56, y + 15, { align: 'center' });

  doc.setFontSize(24);
  doc.text('$22.7M', 56, y + 35, { align: 'center' });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('40 schools', 56, y + 50, { align: 'center' });
  doc.text('30% monetization rate', 56, y + 58, { align: 'center' });
  doc.text('4,500 active athletes', 56, y + 66, { align: 'center' });
  doc.text('$500 avg post price', 56, y + 74, { align: 'center' });
  doc.text('No IP premium', 56, y + 82, { align: 'center' });

  // Right side - Optimized
  doc.setFillColor(34, 197, 94); // Green
  doc.roundedRect(111, y, 85, 100, 3, 3, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('OPTIMIZED REVENUE', 153, y + 15, { align: 'center' });

  doc.setFontSize(24);
  doc.text('$40-52M', 153, y + 35, { align: 'center' });

  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.text('Same 40 schools', 153, y + 50, { align: 'center' });
  doc.text('65% monetization rate', 153, y + 58, { align: 'center' });
  doc.text('9,750 active athletes', 153, y + 66, { align: 'center' });
  doc.text('$650 avg with IP premium', 153, y + 74, { align: 'center' });
  doc.text('30% IP premium applied', 153, y + 82, { align: 'center' });

  doc.setTextColor(0, 0, 0);
  y += 110;

  // The Gap
  doc.setFillColor(239, 68, 68); // Red
  doc.roundedRect(14, y, pageWidth - 28, 40, 3, 3, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('THE GAP', pageWidth / 2, y + 15, { align: 'center' });
  doc.setFontSize(28);
  doc.text('$17-30M', pageWidth / 2, y + 30, { align: 'center' });

  doc.setTextColor(0, 0, 0);
  y += 50;

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('This is money being left on the table with current execution.', 14, y);
  doc.text('Same schools. Same athletes. Better monetization.', 14, y + 7);

  // === PAGES 4-5: IP IMPACT ===
  doc.addPage();
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('The 45% Engagement Lift', 14, 25);

  y = 40;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');

  doc.text('When athletes use branded/logo content, their posts get 45% MORE engagement.', 14, y);
  y += 8;
  doc.text('But you\'re not charging for this premium.', 14, y);
  y += 15;

  // The Data
  doc.setFont('helvetica', 'bold');
  doc.text('The Data:', 14, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.text('Logo content: +45% engagement', 14, y);
  y += 6;
  doc.text('Branded posts: +38% engagement', 14, y);
  y += 6;
  doc.text('Collaboration content: +52% engagement', 14, y);
  y += 15;

  // What It's Worth
  doc.setFont('helvetica', 'bold');
  doc.text('What It\'s Worth:', 14, y);
  y += 8;
  doc.setFont('helvetica', 'normal');

  autoTable(doc, {
    startY: y,
    head: [['Scenario', 'Impact']],
    body: [
      ['Single athlete (4 posts/month)', '+$900/month uncaptured'],
      ['Penn State (565 athletes, 2 posts/month)', '+$1.3M/year opportunity'],
      ['Entire network (15K athletes)', '+$81M/year at full scale'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235] },
  });

  y = (doc as any).lastAutoTable.finalY + 15;

  doc.setFont('helvetica', 'bold');
  doc.text('How to Capture It:', 14, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.text('1. Add 30% premium to all branded content deals (conservative vs 45% lift)', 14, y);
  y += 6;
  doc.text('2. Current price: $500/post → New price: $650/post', 14, y);
  y += 6;
  doc.text('3. For 52,680 branded posts/year = $7.9M annual revenue increase', 14, y);

  // Page 5 continuation
  doc.addPage();
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('IP Premium Pricing Strategy', 14, 25);

  y = 40;

  autoTable(doc, {
    startY: y,
    head: [['Post Type', 'Current', 'IP Premium', 'Uplift', 'Annual Posts', 'Annual Impact']],
    body: [
      ['Generic post', '$500', '$500', '$0', '-', '-'],
      ['Branded post', '$500', '$650', '+$150', '35,680', '$5.4M'],
      ['Logo content', '$500', '$675', '+$175', '28,540', '$5.0M'],
      ['Collab content', '$500', '$760', '+$260', '12,460', '$3.2M'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235], fontSize: 8 },
    bodyStyles: { fontSize: 8 },
  });

  y = (doc as any).lastAutoTable.finalY + 15;

  doc.setFillColor(34, 197, 94);
  doc.roundedRect(14, y, pageWidth - 28, 30, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL ANNUAL IMPACT FROM IP PREMIUM:', 20, y + 12);
  doc.setFontSize(20);
  doc.text('$7.9M', 20, y + 24);

  doc.setTextColor(0, 0, 0);

  // === PAGES 6-7: SCHOOL PERFORMANCE AUDIT ===
  doc.addPage();
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('School Performance Audit', 14, 25);

  const schoolPerformance = getSchoolConferencePerformance();
  const sortedSchools = [...schoolPerformance].sort((a, b) => b.revenueGap - a.revenueGap);

  const schoolTableData = sortedSchools.map(school => [
    school.schoolName,
    formatCurrency(school.currentRevenue),
    `${(school.currentROI * 100).toFixed(0)}%`,
    formatCurrency(school.revenuePerAthlete),
    formatCurrency(school.peerBenchmark),
    formatCurrency(school.revenueGap),
    school.performanceStatus === 'exceeding' ? 'OPTIMIZED' : school.performanceStatus === 'meeting' ? 'HIGH' : 'VERY HIGH',
  ]);

  autoTable(doc, {
    startY: 40,
    head: [['School', 'Revenue', 'ROI', 'Rev/Athlete', 'Benchmark', 'Gap', 'Action']],
    body: schoolTableData.slice(0, 8),
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235], fontSize: 8 },
    bodyStyles: { fontSize: 7 },
    columnStyles: {
      0: { cellWidth: 45 },
      1: { cellWidth: 22 },
      2: { cellWidth: 15 },
      3: { cellWidth: 20 },
      4: { cellWidth: 22 },
      5: { cellWidth: 22 },
      6: { cellWidth: 22 },
    },
  });

  y = (doc as any).lastAutoTable.finalY + 15;

  const totalGap = schoolPerformance.reduce((sum, s) => sum + s.revenueGap, 0);

  doc.setFillColor(239, 68, 68);
  doc.roundedRect(14, y, pageWidth - 28, 25, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Combined revenue opportunity gap across all schools:', 20, y + 10);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text(formatCurrency(totalGap), 20, y + 20);

  doc.setTextColor(0, 0, 0);

  // === PAGES 8-9: ATHLETE MONETIZATION ===
  doc.addPage();
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('The 10,500 Idle Athletes', 14, 25);

  y = 40;
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');

  doc.text('Only 30% of your 15,000 tracked athletes are in active brand deals.', 14, y);
  y += 7;
  doc.text('That means 10,500 athletes are posting regularly but generating ZERO revenue.', 14, y);
  y += 15;

  doc.setFont('helvetica', 'bold');
  doc.text('What They Generated (Last 90 Days):', 14, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.text('• 441,000 posts', 14, y);
  y += 6;
  doc.text('• 551 million total engagements', 14, y);
  y += 6;
  doc.text('• $0 in revenue', 14, y);
  y += 15;

  doc.setFont('helvetica', 'bold');
  doc.text('The Opportunity:', 14, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.text('Target 5,250 of these idle athletes (top 50%)', 14, y);
  y += 6;
  doc.text('Start with modest $2,000/year deals', 14, y);
  y += 6;
  doc.text('= $10.5M new annual revenue', 14, y);
  y += 15;

  // School breakdown table
  autoTable(doc, {
    startY: y,
    head: [['School', 'Total', 'Idle', 'Est. If Activated']],
    body: [
      ['Penn State', '1,245', '871', '$1.7M/year'],
      ['LSU', '1,180', '826', '$1.7M/year'],
      ['Auburn', '1,050', '735', '$1.5M/year'],
      ['Texas A&M', '1,380', '966', '$1.9M/year'],
      ['Baylor', '892', '624', '$1.2M/year'],
      ['UTSA', '645', '451', '$900K/year'],
      ['Virginia', '758', '531', '$1.1M/year'],
      ['Washington State', '623', '436', '$870K/year'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235] },
  });

  // Page 9 - Deal Underpricing
  doc.addPage();
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('Where Deals Are Underpriced', 14, 25);

  y = 40;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Major Brand Deals:', 14, y);
  y += 8;
  doc.setFont('helvetica', 'normal');

  autoTable(doc, {
    startY: y,
    head: [['Brand', 'Current Value', 'Should Be (w/IP)', 'Gap']],
    body: [
      ['Nike (multi-school)', '$2.8M', '$3.6M', '-$840K'],
      ['Wegmans (Penn State)', '$890K', '$1.2M', '-$267K'],
      ['Sheetz (Penn State)', '$620K', '$806K', '-$186K'],
    ],
    theme: 'grid',
    headStyles: { fillColor: [37, 99, 235] },
  });

  y = (doc as any).lastAutoTable.finalY + 15;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Top 20 Athletes by Marketability:', 14, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.text('Average current deal: $3,250', 14, y);
  y += 6;
  doc.text('Average benchmark (similar athletes): $5,900', 14, y);
  y += 6;
  doc.text('Underpriced by: $2,650 per athlete', 14, y);
  y += 6;
  doc.text('Top 50 athletes impact: -$132K annually', 14, y);
  y += 15;

  doc.setFillColor(239, 68, 68);
  doc.roundedRect(14, y, pageWidth - 28, 25, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.text('Combined underpricing (brands + athletes):', 20, y + 10);
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('$3.9M/year', 20, y + 20);

  doc.setTextColor(0, 0, 0);

  // === PAGE 10: ROADMAP ===
  doc.addPage();
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('The Path to $17-30M', 14, 25);

  y = 40;

  const steps = [
    {
      title: 'STEP 1: Repricing (6 months)',
      actions: ['Audit top 500 athletes, reprice by 30%', 'Launch IP premium for all new deals'],
      impact: '$3.9M',
    },
    {
      title: 'STEP 2: Activation (12 months)',
      actions: ['Target 5,250 idle athletes', 'Start with $2K average deals'],
      impact: '$10.5M',
    },
    {
      title: 'STEP 3: Full Optimization (24 months)',
      actions: ['Apply to all 40 schools systematically', 'Increase monetization to 65%'],
      impact: '$22M+',
    },
  ];

  steps.forEach((step, idx) => {
    doc.setFillColor(idx === 0 ? 59 : idx === 1 ? 147 : 34, idx === 0 ? 130 : idx === 1 ? 51 : 197, idx === 0 ? 246 : idx === 1 ? 234 : 94);
    doc.roundedRect(14, y, pageWidth - 28, 35, 3, 3, 'F');

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text(step.title, 20, y + 10);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(step.actions.join(' • '), 20, y + 18);

    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(`Revenue: ${step.impact}`, 20, y + 29);

    doc.setTextColor(0, 0, 0);
    y += 42;
  });

  y += 10;

  doc.setFillColor(22, 163, 74);
  doc.roundedRect(14, y, pageWidth - 28, 30, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('TOTAL CONSERVATIVE ESTIMATE:', 20, y + 12);
  doc.setFontSize(24);
  doc.text('$17-30M', 20, y + 25);

  doc.setTextColor(0, 0, 0);

  // === PAGE 11: CLOSE ===
  doc.addPage();
  doc.setFontSize(20);
  doc.setFont('helvetica', 'bold');
  doc.text('What Happens Next?', 14, 25);

  y = 40;

  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('You have $17-30M sitting on the table.', 14, y);
  y += 15;

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Three options:', 14, y);
  y += 10;

  doc.setFont('helvetica', 'normal');
  doc.text('1) Do nothing. Continue current pace. Capture maybe 5-10% over 3 years.', 14, y);
  y += 10;

  doc.text('2) Hire consultant. Spend $100K+ for 6 months. Same conclusion.', 14, y);
  y += 10;

  doc.text('3) Get to work:', 14, y);
  y += 7;
  doc.text('   - Reprice top 500 athletes (this month)', 14, y);
  y += 6;
  doc.text('   - Launch IP premium pricing (this quarter)', 14, y);
  y += 6;
  doc.text('   - Target top 2K idle athletes (this quarter)', 14, y);
  y += 6;
  doc.text('   - Measure. Optimize. Scale.', 14, y);
  y += 10;

  doc.text('   Revenue impact: Year 1 = +$3-5M, Year 2 = +$15-20M, Year 3 = +$22-30M+', 14, y);
  y += 20;

  doc.setFillColor(17, 24, 39);
  doc.roundedRect(14, y, pageWidth - 28, 50, 3, 3, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.text('The data is clear. The opportunity is real.', pageWidth / 2, y + 15, { align: 'center' });
  doc.text('The effort is significant but manageable.', pageWidth / 2, y + 25, { align: 'center' });

  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('The question isn\'t whether this is possible.', pageWidth / 2, y + 37, { align: 'center' });
  doc.text('The question is whether you\'re going to do it.', pageWidth / 2, y + 45, { align: 'center' });

  // Save the PDF
  doc.save(`Playfly_Revenue_Opportunity_Analysis_${format(new Date(), 'yyyy-MM-dd')}.pdf`);
}
