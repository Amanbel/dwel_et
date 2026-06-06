import React, { useState } from 'react';
import { useLanguage } from '../../store/LanguageContext';

interface ChartData {
  label: string;
  value: number;
}

export const WellnessTrendChart: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { t } = useLanguage();

  const data: ChartData[] = [
    { label: t('mon'), value: 70 },
    { label: t('tue'), value: 75 },
    { label: t('wed'), value: 80 },
    { label: t('thu'), value: 65 },
    { label: t('fri'), value: 78 },
    { label: t('sat'), value: 85 },
    { label: t('sun'), value: 82 },
  ];

  const width = 600;
  const height = 250;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;

  const maxVal = 100;
  const minVal = 0;

  const points = data.map((d, index) => {
    const x = paddingLeft + (index / (data.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - ((d.value - minVal) / (maxVal - minVal)) * chartHeight;
    return { x, y, label: d.label, value: d.value };
  });

  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${paddingTop + chartHeight} L ${points[0].x} ${paddingTop + chartHeight} Z`;

  return (
    <div className="w-full relative bg-surface-container-lowest p-md rounded-lg">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Grid Lines */}
        {[0, 25, 50, 75, 100].map((tick) => {
          const y = paddingTop + chartHeight - (tick / 100) * chartHeight;
          return (
            <g key={tick} className="opacity-10">
              <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#737686" strokeDasharray="4 4" />
              <text x={paddingLeft - 10} y={y + 4} textAnchor="end" className="text-[10px] font-medium fill-on-surface">
                {tick}
              </text>
            </g>
          );
        })}

        {/* Gradient Area Fill */}
        <path d={areaPath} fill="url(#areaGradient)" />

        {/* Trend Line */}
        <path d={linePath} fill="none" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

        {/* X Axis labels */}
        {points.map((p, i) => (
          <text
            key={i}
            x={p.x}
            y={paddingTop + chartHeight + 20}
            textAnchor="middle"
            className="text-[12px] font-medium fill-on-surface-variant"
          >
            {p.label}
          </text>
        ))}

        {/* Data Points */}
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r={hoveredIndex === i ? 6 : 4}
              fill="var(--inverse-on-surface)"
              stroke="var(--primary)"
              strokeWidth="3"
              className="cursor-pointer transition-all duration-150"
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            />
            {hoveredIndex === i && (
              <g>
                <rect
                  x={p.x - 25}
                  y={p.y - 35}
                  width="50"
                  height="22"
                  rx="4"
                  fill="var(--inverse-surface)"
                  className="shadow-sm"
                />
                <text x={p.x} y={p.y - 20} textAnchor="middle" fill="var(--inverse-on-surface)" className="text-[10px] font-bold">
                  {p.value}
                </text>
              </g>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
};
export default WellnessTrendChart;
