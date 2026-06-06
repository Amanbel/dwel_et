import React, { useState } from 'react';
import { useLanguage } from '../../store/LanguageContext';

interface PieSegment {
  name: string;
  percentage: number;
  color: string;
}

export const CategoryPieChart: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const data: PieSegment[] = [
    { name: t('education'), percentage: 30, color: '#004ac6' },
    { name: t('entertainment'), percentage: 25, color: '#006a61' },
    { name: t('news'), percentage: 20, color: '#6a1edb' },
    { name: t('passiveScrolling'), percentage: 15, color: '#ba1a1a' },
    { name: t('other'), percentage: 10, color: '#737686' },
  ];

  const size = 160;
  const radius = 50;
  const strokeWidth = 18;
  const center = size / 2;
  const circumference = 2 * Math.PI * radius;

  let accumulatedPercentage = 0;

  return (
    <div className="flex flex-col sm:flex-row lg:flex-col 2xl:flex-row items-center justify-center 2xl:justify-between gap-md sm:gap-lg lg:gap-md 2xl:gap-xl p-xs w-full">
      {/* SVG Donut Chart */}
      <div className="relative w-40 h-40 flex-shrink-0">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="var(--surface-container-low)"
            strokeWidth={strokeWidth}
          />
          {data.map((d, index) => {
            const strokeLength = (d.percentage / 100) * circumference;
            const strokeOffset = circumference - (accumulatedPercentage / 100) * circumference;
            accumulatedPercentage += d.percentage;

            return (
              <circle
                key={index}
                cx={center}
                cy={center}
                r={radius}
                fill="transparent"
                stroke={d.color}
                strokeWidth={hoveredIndex === index ? strokeWidth + 4 : strokeWidth}
                strokeDasharray={`${strokeLength} ${circumference}`}
                strokeDashoffset={strokeOffset}
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-[12px] font-bold text-on-surface-variant text-center max-w-[80px] truncate">
            {hoveredIndex !== null ? data[hoveredIndex].name : t('total')}
          </span>
          <span className="text-[20px] font-bold text-on-surface">
            {hoveredIndex !== null ? `${data[hoveredIndex].percentage}%` : '100%'}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-xs w-full max-w-[200px] flex-shrink-0">
        {data.map((d, index) => (
          <div
            key={index}
            className={`flex justify-between items-center transition-all duration-150 py-1.5 px-sm rounded-md cursor-pointer ${
              hoveredIndex === index ? 'bg-surface-container-high scale-[1.02]' : ''
            }`}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="flex items-center space-x-2 flex-1 min-w-0">
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ backgroundColor: d.color }}></div>
              <span className="font-label-sm text-label-sm text-on-surface-variant truncate">{d.name}</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-surface font-bold flex-shrink-0 pl-md">{d.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
export default CategoryPieChart;
