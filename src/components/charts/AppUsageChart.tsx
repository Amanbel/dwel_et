import React, { useState } from 'react';
import { formatDuration } from '../../utils/formatters';

interface AppUsageData {
  appName: string;
  minutes: number;
  color: string;
}

const defaultData: AppUsageData[] = [
  { appName: 'TikTok', minutes: 165, color: '#6a1edb' },
  { appName: 'YouTube', minutes: 90, color: '#ba1a1a' },
  { appName: 'Instagram', minutes: 60, color: '#006a61' },
  { appName: 'Facebook', minutes: 30, color: '#004ac6' },
  { appName: 'X', minutes: 45, color: '#434655' },
];

export const AppUsageChart: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const width = 600;
  const height = 200;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxVal = 180; // minutes scale

  return (
    <div className="w-full relative bg-surface-container-lowest p-md rounded-lg">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Horizontal grid lines */}
        {[0, 60, 120, 180].map((tick) => {
          const y = paddingTop + chartHeight - (tick / maxVal) * chartHeight;
          return (
            <g key={tick} className="opacity-10">
              <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#737686" />
              <text x={paddingLeft - 10} y={y + 4} textAnchor="end" className="text-[10px] font-medium fill-on-surface">
                {tick}m
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {defaultData.map((d, index) => {
          const barWidth = 40;
          const x = paddingLeft + (index / defaultData.length) * chartWidth + (chartWidth / defaultData.length - barWidth) / 2;
          const barHeight = (d.minutes / maxVal) * chartHeight;
          const y = paddingTop + chartHeight - barHeight;

          return (
            <g
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="cursor-pointer"
            >
              {/* Bar */}
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                rx="4"
                fill={d.color}
                opacity={hoveredIndex === index ? 0.9 : 0.75}
                className="transition-all duration-150"
              />

              {/* Label */}
              <text
                x={x + barWidth / 2}
                y={paddingTop + chartHeight + 20}
                textAnchor="middle"
                className="text-[12px] font-semibold fill-on-surface-variant"
              >
                {d.appName}
              </text>

              {/* Tooltip */}
              {hoveredIndex === index && (
                <g>
                  <rect
                    x={x + barWidth / 2 - 35}
                    y={y - 35}
                    width="70"
                    height="24"
                    rx="4"
                    fill="#191b23"
                  />
                  <text
                    x={x + barWidth / 2}
                    y={y - 19}
                    textAnchor="middle"
                    fill="#ffffff"
                    className="text-[10px] font-bold"
                  >
                    {formatDuration(d.minutes)}
                  </text>
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
};
export default AppUsageChart;
