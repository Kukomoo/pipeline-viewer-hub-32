import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from 'recharts';
import { type PipelineRow } from "../utils/googleSheets";

interface DealSizeDistributionProps {
  generatedLeads: PipelineRow[];
}

const DealSizeDistribution = ({ generatedLeads }: DealSizeDistributionProps) => {
  // Group and aggregate deal sizes by company
  const dealsByCompany = generatedLeads.reduce((acc: { [key: string]: number }, lead) => {
    if (!lead.Company || !lead.Deal_Size) return acc;
    
    let numericValue = 0;
    if (typeof lead.Deal_Size === 'string') {
      numericValue = parseInt(lead.Deal_Size.replace(/[^0-9]/g, ''), 10) || 0;
    } else if (typeof lead.Deal_Size === 'number') {
      numericValue = lead.Deal_Size;
    }
    
    acc[lead.Company] = (acc[lead.Company] || 0) + numericValue;
    return acc;
  }, {});

  const data = Object.entries(dealsByCompany)
    .map(([company, value]) => ({
      company,
      value
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);

  // Updated color palette using softer, more visually appealing colors
  const colors = [
    '#9b87f5', // Primary Purple
    '#7E69AB', // Secondary Purple
    '#6E59A5', // Tertiary Purple
    '#D6BCFA', // Light Purple
    '#E5DEFF', // Soft Purple
    '#D3E4FD', // Soft Blue
    '#FDE1D3', // Soft Peach
    '#FFDEE2', // Soft Pink
    '#FEC6A1', // Soft Orange
    '#F2FCE2', // Soft Green
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="bg-[#F6F6F7] p-8 rounded-xl shadow-sm animate-fade-up max-w-5xl w-full">
        <h2 className="text-xl font-semibold mb-6 text-[#1A1F2C] text-center">Deal Size Distribution by Company</h2>
        <div className="h-[500px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 40, left: 140, bottom: 20 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                horizontal={true}
                vertical={false}
                stroke="#E5DEFF"
              />
              <XAxis 
                type="number" 
                tickFormatter={formatCurrency}
                tick={{ fill: '#403E43', fontSize: 12 }}
                axisLine={{ stroke: '#E5DEFF' }}
              />
              <YAxis 
                type="category" 
                dataKey="company" 
                tick={{ 
                  fill: '#403E43', 
                  fontSize: 13,
                  width: 120,
                }}
                width={130}
                axisLine={{ stroke: '#E5DEFF' }}
                tickMargin={8}
              />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                labelFormatter={(label) => `Company: ${label}`}
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #E5DEFF',
                  borderRadius: '8px',
                  padding: '12px'
                }}
                cursor={{ fill: '#F1F0FB' }}
              />
              <Bar 
                dataKey="value" 
                radius={[0, 4, 4, 0]}
                barSize={25}
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={colors[index % colors.length]}
                    style={{ filter: 'drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.05))' }}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DealSizeDistribution;