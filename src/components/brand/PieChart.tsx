// components/PieChart.tsx
import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type DataItem = {
  city?: string;
  platform?: string;
  percentage: string;
};

type PieChartProps = {
  data: DataItem[];
  labelKey: "city" | "platform";
  title: string;
};

const PieChart: React.FC<PieChartProps> = ({ data, labelKey, title }) => {
    console.log(data,'data pie')
  const labels = data?.map((item) => item[labelKey]!);
  const values = data?.map((item) => parseFloat(item.percentage));
   console.log(labels,'labels')
   console.log(values,'values')
  const chartData = {
    labels,
    datasets: [
      {
        label: "% Share",
        data: values,
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF", "#FF9F40",
          "#66FF66", "#CC66FF", "#FF6666", "#66CCFF", "#FFCC66", "#339933",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${context.label}: ${context.parsed}%`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-6">
      <h2 className="text-lg font-bold mb-4 dark:text-white">{title}</h2>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default PieChart;
