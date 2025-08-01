import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Card } from "./Card";

const data = [
  { name: "Bitcoin", value: 45, color: "#f7931a" },
  { name: "Ethereum", value: 25, color: "#627eea" },
  { name: "Solana", value: 15, color: "#00d4aa" },
  { name: "Others", value: 15, color: "#8b5cf6" },
];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white dark:bg-gray-800 p-3 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-900 dark:text-white">{data.name}</p>
        <p className="text-lg font-bold" style={{ color: data.payload.color }}>
          {data.value}%
        </p>
      </div>
    );
  }
  return null;
};

export default function SimplePieChart() {
  return (
    <Card title="Portfolio Distribution" subtitle="Cryptocurrency allocation breakdown">
      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Chart */}
        <div className="flex-1 h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1000}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-3">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Breakdown</h4>
          {data.map((entry, index) => (
            <div
              key={entry.name}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: entry.color }} />
                <span className="text-sm font-medium text-gray-900 dark:text-white">{entry.name}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">{entry.value}%</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  ${((entry.value / 100) * 100000).toLocaleString()}
                </p>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-2 border-blue-200 dark:border-blue-700">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-blue-900 dark:text-blue-100">Total Portfolio</span>
              <span className="font-bold text-lg text-blue-900 dark:text-blue-100">$100,000</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
