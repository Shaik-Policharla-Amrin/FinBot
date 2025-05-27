import { useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Pie, Line, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

type ChartType = 'pie' | 'line' | 'bar';

interface ChartContainerProps {
  type: ChartType;
  data: ChartData<any>;
  options?: ChartOptions<any>;
  height?: number;
  title?: string;
  loading?: boolean;
}

const ChartContainer: React.FC<ChartContainerProps> = ({
  type,
  data,
  options = {},
  height = 300,
  title,
  loading = false,
}) => {
  const chartRef = useRef<HTMLDivElement>(null);
  
  const defaultOptions: ChartOptions<any> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#334155',
        bodyColor: '#334155',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        bodyFont: {
          family: "'Inter', sans-serif",
        },
        titleFont: {
          family: "'Inter', sans-serif",
          weight: 'bold',
        },
        footerFont: {
          family: "'Inter', sans-serif",
        },
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== undefined) {
              label += new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(context.parsed.y);
            } else if (context.parsed !== undefined) {
              label += new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(context.parsed);
            }
            return label;
          },
        },
      },
    },
    scales: type !== 'pie' ? {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            family: "'Inter', sans-serif",
            size: 12,
          },
          callback: function(value) {
            return '₹' + value;
          },
        },
      },
    } : undefined,
  };
  
  const mergedOptions = { ...defaultOptions, ...options };
  
  const renderChart = () => {
    switch (type) {
      case 'pie':
        return <Pie data={data} options={mergedOptions} />;
      case 'line':
        return <Line data={data} options={mergedOptions} />;
      case 'bar':
        return <Bar data={data} options={mergedOptions} />;
      default:
        return null;
    }
  };
  
  return (
    <div className="card overflow-hidden p-0">
      {title && (
        <div className="border-b border-slate-200 p-4 dark:border-slate-700">
          <h3 className="text-base font-semibold text-slate-800 dark:text-white">{title}</h3>
        </div>
      )}
      
      <div className="p-4">
        <div 
          ref={chartRef} 
          style={{ height: `${height}px` }} 
          className={`relative ${loading ? 'opacity-50' : ''}`}
        >
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary-500"></div>
            </div>
          ) : null}
          {renderChart()}
        </div>
      </div>
    </div>
  );
};

export default ChartContainer;