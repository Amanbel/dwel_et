import React from 'react';

interface RadarData {
  axis: string;
  value: number;
}

const defaultData: RadarData[] = [
  { axis: 'Focus', value: 85 },
  { axis: 'Calm', value: 70 },
  { axis: 'Energy', value: 65 },
  { axis: 'Fatigue', value: 35 },
  { axis: 'Stress', value: 40 },
];

export const EmotionRadarChart: React.FC = () => {
  const size = 220;
  const center = size / 2;
  const maxRadius = 75;
  const N = defaultData.length;

  // Generate web concentric rings
  const rings = [0.25, 0.5, 0.75, 1.0];

  const getCoordinates = (index: number, val: number) => {
    const angle = (index * 2 * Math.PI) / N - Math.PI / 2; // offset to point upwards
    const r = (val / 100) * maxRadius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Build the polygon points for data
  const dataPoints = defaultData.map((d, i) => {
    const { x, y } = getCoordinates(i, d.value);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full flex justify-center items-center bg-surface-container-lowest p-md rounded-lg">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Concentric Rings */}
        {rings.map((ringVal, ringIdx) => {
          const points = defaultData.map((_, i) => {
            const { x, y } = getCoordinates(i, ringVal * 100);
            return `${x},${y}`;
          }).join(' ');

          return (
            <polygon
              key={ringIdx}
              points={points}
              fill="none"
              stroke="#c3c6d7"
              strokeWidth="1"
              opacity="0.5"
            />
          );
        })}

        {/* Axis Lines and Labels */}
        {defaultData.map((d, i) => {
          const outer = getCoordinates(i, 100);
          const labelOffset = getCoordinates(i, 120);

          return (
            <g key={i}>
              {/* Radial Axis Line */}
              <line
                x1={center}
                y1={center}
                x2={outer.x}
                y2={outer.y}
                stroke="#c3c6d7"
                strokeWidth="1"
                opacity="0.5"
              />
              {/* Text Label */}
              <text
                x={labelOffset.x}
                y={labelOffset.y + 4}
                textAnchor="middle"
                className="text-[10px] font-bold fill-on-surface-variant"
              >
                {d.axis}
              </text>
            </g>
          );
        })}

        {/* Plotted Data Polygon */}
        <polygon
          points={dataPoints}
          fill="#8343f4"
          fillOpacity="0.2"
          stroke="#6a1edb"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Data Markers */}
        {defaultData.map((d, i) => {
          const { x, y } = getCoordinates(i, d.value);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="#6a1edb"
              stroke="#ffffff"
              strokeWidth="1.5"
            />
          );
        })}
      </svg>
    </div>
  );
};
export default EmotionRadarChart;
