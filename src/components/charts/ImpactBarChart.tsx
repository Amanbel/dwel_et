import React from 'react';

interface DayComparison {
  day: string;
  focus: number;
  disruption: number;
}

const defaultData: DayComparison[] = [
  { day: 'Mon', focus: 5, disruption: 2 },
  { day: 'Tue', focus: 6, disruption: 3 },
  { day: 'Wed', focus: 8, disruption: 1.5 },
  { day: 'Thu', focus: 4, disruption: 4 },
  { day: 'Fri', focus: 7, disruption: 2 },
];

export const ImpactBarChart: React.FC = () => {
  const width = 500;
  const height = 200;
  const paddingLeft = 30;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 30;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  const maxVal = 10; // Max hours

  return (
    <div className="w-full bg-surface-container-lowest p-md rounded-lg">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Horizontal grid lines */}
        {[0, 5, 10].map((tick) => {
          const y = paddingTop + chartHeight - (tick / maxVal) * chartHeight;
          return (
            <g key={tick} className="opacity-10">
              <line x1={paddingLeft} y1={y} x2={width - paddingRight} y2={y} stroke="#737686" />
              <text x={paddingLeft - 8} y={y + 4} textAnchor="end" className="text-[10px] font-medium fill-on-surface">
                {tick}h
              </text>
            </g>
          );
        })}

        {/* Grouped Bars */}
        {defaultData.map((d, index) => {
          const groupWidth = chartWidth / defaultData.length;
          const barWidth = 14;
          const spacing = 4;
          const groupX = paddingLeft + index * groupWidth;
          
          const focusHeight = (d.focus / maxVal) * chartHeight;
          const focusX = groupX + (groupWidth - barWidth * 2 - spacing) / 2;
          const focusY = paddingTop + chartHeight - focusHeight;

          const disruptionHeight = (d.disruption / maxVal) * chartHeight;
          const disruptionX = focusX + barWidth + spacing;
          const disruptionY = paddingTop + chartHeight - disruptionHeight;

          return (
            <g key={index}>
              {/* Focus Bar */}
              <rect
                x={focusX}
                y={focusY}
                width={barWidth}
                height={focusHeight}
                rx="2"
                fill="#006a61"
                opacity="0.8"
              />
              {/* Disruption Bar */}
              <rect
                x={disruptionX}
                y={disruptionY}
                width={barWidth}
                height={disruptionHeight}
                rx="2"
                fill="#ba1a1a"
                opacity="0.8"
              />
              {/* Label */}
              <text
                x={groupX + groupWidth / 2}
                y={paddingTop + chartHeight + 18}
                textAnchor="middle"
                className="text-[11px] font-semibold fill-on-surface-variant"
              >
                {d.day}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};
export default ImpactBarChart;
