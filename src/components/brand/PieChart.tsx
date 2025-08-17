// components/PieChart.tsx
import React from "react";
import { PieChart as MUIPieChart } from '@mui/x-charts/PieChart';
import { Card } from "../ui/card";

type DataItem = {
  city?: string;
  platform?: string;
  value: number;
  percentage: string;
};

type PieChartProps = {
  data: DataItem[];
  labelKey: "city" | "platform";
  title: string;
};

const PieChart: React.FC<PieChartProps> = ({ data, labelKey, title }) => {
  // Hardcoded widths for different screen sizes
  const getChartWidth = () => {
    if (typeof window === 'undefined') return 400; // SSR fallback

    const screenWidth = window.innerWidth;

    if (screenWidth < 640) { // sm: 640px
      return 280; // Mobile
    } else if (screenWidth < 768) { // md: 768px
      return 320; // Small tablet
    } else if (screenWidth < 1024) { // lg: 1024px
      return 360; // Tablet
    } else if (screenWidth < 1280) { // xl: 1280px
      return 400; // Desktop
    } else { // 2xl: 1536px+
      return 450; // Large desktop
    }
  };

  const chartColors = [
    "#38187B", // Darkest
    "#5A2ABC",
    "#7544DB",
    "#B476FF",
    "#CA9EFF",
    "#DFC4FF", // Lightest
  ];

  const sortedData = [...(data || [])].sort(
    (a, b) => parseFloat(b.percentage) - parseFloat(a.percentage)
  );

  // Map each item to a color based on sorted order
  const chartData = data?.map((item) => {
    const sortedIndex = sortedData.findIndex(
      (d) => d[labelKey] === item[labelKey]
    );
    return {
      id: sortedIndex,
      value: parseFloat(item.percentage) || 0,
      label: item[labelKey] || `Item ${sortedIndex + 1}`,
      color: chartColors[sortedIndex % chartColors.length],
    };
  }) || [];


  // Don't render chart if no data
  if (!data || data.length === 0) {
    return (
      <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 w-full">
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-4 text-center">
            {title}
          </h2>
          <div className="flex items-center justify-center w-full h-[300px]">
            <p className="text-gray-500 dark:text-gray-400">No data available</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 w-full">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex items-start w-full">
          <h2 className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-4 text-center">
            {title}
          </h2>

        </div>
        <div className="flex items-center justify-center w-full">
          <MUIPieChart
            series={[
              {
                data: chartData,
              },
            ]}
            height={300}
            width={getChartWidth()}
            slotProps={{
              legend: {
                position: { vertical: 'middle', horizontal: 'end' },
                // itemMarkWidth: 8,
                // itemMarkHeight: 8,
                // markGap: 5,
                // itemGap: 20,
                // labelStyle: {
                //   fontSize: 14,
                //   fill: '#000',
                // },
              },
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default PieChart;
