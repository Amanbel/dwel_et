import React, { useState } from 'react';
import { useLanguage } from '../../store/LanguageContext';

interface AppUsageData {
  appName: string;
  minutes: number;
  color: string;
}

export const AppUsageChart: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { t, language } = useLanguage();

  const data: AppUsageData[] = [
    { appName: t('tiktok'), minutes: 165, color: '#6a1edb' },
    { appName: t('youtube'), minutes: 90, color: '#ba1a1a' },
    { appName: t('instagram'), minutes: 60, color: '#006a61' },
    { appName: t('facebook'), minutes: 30, color: '#004ac6' },
    { appName: t('x'), minutes: 45, color: '#434655' },
  ];

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
                {tick}{t('minutesMin')}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((d, index) => {
          const barWidth = 40;
          const x = paddingLeft + (index / data.length) * chartWidth + (chartWidth / data.length - barWidth) / 2;
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
                    fill="var(--inverse-surface)"
                  />
                  <text
                    x={x + barWidth / 2}
                    y={y - 19}
                    textAnchor="middle"
                    fill="var(--inverse-on-surface)"
                    className="text-[10px] font-bold"
                  >
                    {language === 'am' 
                      ? `${Math.floor(d.minutes / 60)}ሰ ${d.minutes % 60}ደ`
                      : `${Math.floor(d.minutes / 60)}h ${d.minutes % 60}m`}
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
