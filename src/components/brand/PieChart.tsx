// components/PieChart.tsx
import React, { useState, useEffect } from "react";
import { PieChart as MUIPieChart } from "@mui/x-charts/PieChart";
import { Card } from "../ui/card";
import { labelMarkClasses } from '@mui/x-charts/ChartsLabel';

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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const screenWidth = window.innerWidth;
      setIsMobile(screenWidth < 640);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Dynamic width based on screen size
  const getChartWidth = () => {
    if (typeof window === "undefined") return 400; // SSR fallback
    const screenWidth = window.innerWidth;

    if (screenWidth < 480) return 250; // Very small mobile
    else if (screenWidth < 640) return 280; // Mobile
    else if (screenWidth < 768) return 320; // Small tablet
    else if (screenWidth < 1024) return 360; // Tablet
    else if (screenWidth < 1280) return 400; // Desktop
    else return 450; // Large desktop
  };

  // Dynamic height based on screen size
  const getChartHeight = () => {
    if (typeof window === "undefined") return 300; // SSR fallback
    const screenWidth = window.innerWidth;

    if (screenWidth < 480) return 200; // Very small mobile
    else if (screenWidth < 640) return 220; // Mobile
    else if (screenWidth < 768) return 260; // Small tablet
    else if (screenWidth < 1024) return 280; // Tablet
    else if (screenWidth < 1280) return 300; // Desktop
    else return 350; // Large desktop
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

  const chartData =
    data?.map((item) => {
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

  if (!data || data.length === 0) {
    return (
      <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 w-full">
        <div className="flex flex-col items-center justify-center w-full">
          <h2 className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-4 text-center">
            {title}
          </h2>
          <div className="flex items-center justify-center w-full h-[300px]">
            <p className="text-gray-500 dark:text-gray-400">
              No data available
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm p-4 w-full">
      <style jsx global>{`
        .pie-chart-container .MuiChartsLegend-label {
        fill: #374151 !important; /* light mode (gray-700) */
          color: #374151 !important;
          font-size: ${isMobile ? '12px' : '14px'} !important;
        }
        .dark .pie-chart-container .MuiChartsLegend-label {
          color: #ffffff !important;
              fill: #ffffff !important; /* white in dark mode */

        }
      `}</style>
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex items-start w-full">
          <h2 className="text-gray-600 dark:text-gray-300 text-sm font-medium mb-4 text-center w-full">
            {title}
          </h2>
        </div>
        <div className="flex items-center justify-center w-full">
          <MUIPieChart
          
            series={[
              {
                data: chartData,
                valueFormatter: (item: { value: number }) => `${item.value}%`,
                
              },
            ]}
            width={getChartWidth()}
            height={getChartHeight()}
            slotProps={{
              legend: {
                position: isMobile
                  ? { vertical: "bottom", horizontal: "center" }
                  : { vertical: "middle", horizontal: "end" },
                  sx: {
                    fontSize: 14,
                    // light mode color
                    color: '#374151',
                    // target the little color marks next to labels
                    // [`.${labelMarkClasses.fill}`]: {
                    //   fill: '#374151',
                    // },
                    // override for dark mode (when Tailwind `.dark` class is present)
                    '.dark &': {
                      color: '#ffffff',
                      [`.${labelMarkClasses.mask}`]: {
                        fill: '#ffffff',
                      },
                    }
                  }
              },
            }}
            className="pie-chart-container"
            margin={{
              top: isMobile ? 10 : 20,
              bottom: isMobile ? 10 : 20,
              left: isMobile ? 10 : 20,
              right: isMobile ? 10 : 20,
            }}
          />
        </div>
      </div>
    </Card>
  );
};

export default PieChart;
