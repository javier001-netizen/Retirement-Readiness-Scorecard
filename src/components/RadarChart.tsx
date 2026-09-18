import React, { useState } from 'react';
import { AssessmentResult } from '../types';

interface RadarChartProps {
  result: AssessmentResult;
}

export const RadarChart: React.FC<RadarChartProps> = ({ result }) => {
  const [activeDimension, setActiveDimension] = useState<string | null>(null);

  // Dimensions
  const dims = [
    result.dimensions.cpfFoundation,
    result.dimensions.decumulationSequence,
    result.dimensions.taxEfficiency,
    result.dimensions.assetCoordination,
  ];

  // SVG parameters
  const size = 320;
  const center = size / 2;
  const radius = 105;
  const totalAxes = dims.length;

  // Compute coordinates for a given index and value (0-10)
  const getCoordinates = (index: number, value: number) => {
    // Start at top (-PI/2)
    const angle = (Math.PI * 2 / totalAxes) * index - Math.PI / 2;
    const r = (value / 10) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y, angle };
  };

  // Polygon points for user's score
  const userPoints = dims
    .map((d, i) => {
      const { x, y } = getCoordinates(i, d.score);
      return `${x},${y}`;
    })
    .join(' ');

  // Benchmark points (typical Singapore peer average: ~5.2)
  const benchmarkPoints = dims
    .map((_, i) => {
      const { x, y } = getCoordinates(i, 5.2);
      return `${x},${y}`;
    })
    .join(' ');

  // Concentric levels
  const levels = [2.5, 5.0, 7.5, 10.0];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="w-full h-full overflow-visible"
          role="img"
          aria-label="Interactive Diagnostic Radar Chart"
        >
          {/* Subtle background circles */}
          {levels.map((lvl) => {
            const r = (lvl / 10) * radius;
            return (
              <circle
                key={lvl}
                cx={center}
                cy={center}
                r={r}
                fill="none"
                stroke="#334155"
                strokeWidth={lvl === 10 ? '1.5' : '1'}
                strokeDasharray={lvl === 10 ? 'none' : '3 3'}
                className="opacity-40"
              />
            );
          })}

          {/* Axes lines */}
          {dims.map((_, i) => {
            const { x, y } = getCoordinates(i, 10);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="#334155"
                strokeWidth="1"
                className="opacity-60"
              />
            );
          })}

          {/* Benchmark Peer Polygon (Subtle Dashed) */}
          <polygon
            points={benchmarkPoints}
            fill="#64748b"
            fillOpacity="0.1"
            stroke="#94a3b8"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            className="transition-all duration-300"
          />

          {/* User Score Polygon (High-trust Indigo/Gold Gradient fill) */}
          <polygon
            points={userPoints}
            fill="url(#radarGradient)"
            fillOpacity="0.45"
            stroke="#f59e0b"
            strokeWidth="2.5"
            className="transition-all duration-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.35)]"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Node dots with hover interaction */}
          {dims.map((dim, i) => {
            const { x, y } = getCoordinates(i, dim.score);
            const isHovered = activeDimension === dim.name;
            return (
              <g
                key={dim.name}
                className="cursor-pointer transition-transform group"
                onMouseEnter={() => setActiveDimension(dim.name)}
                onMouseLeave={() => setActiveDimension(null)}
                onClick={() => setActiveDimension(activeDimension === dim.name ? null : dim.name)}
              >
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? 7 : 5}
                  fill="#ffffff"
                  stroke={dim.color}
                  strokeWidth="2.5"
                  className="transition-all duration-200"
                />
              </g>
            );
          })}

          {/* Labels positioned around the periphery */}
          {dims.map((dim, i) => {
            const labelDist = 10;
            const { angle } = getCoordinates(i, labelDist);
            const rOffset = radius + 28;
            const lx = center + rOffset * Math.cos(angle);
            const ly = center + rOffset * Math.sin(angle);
            const isHovered = activeDimension === dim.name;

            // Alignment tweaks
            let textAnchor: 'start' | 'middle' | 'end' = 'middle';
            if (Math.cos(angle) > 0.3) textAnchor = 'start';
            else if (Math.cos(angle) < -0.3) textAnchor = 'end';

            return (
              <text
                key={`label-${dim.name}`}
                x={lx}
                y={ly}
                textAnchor={textAnchor}
                className={`text-[11px] font-medium transition-colors select-none ${
                  isHovered ? 'fill-amber-400 font-bold' : 'fill-slate-300'
                }`}
                style={{ dominantBaseline: 'central' }}
                onClick={() => setActiveDimension(activeDimension === dim.name ? null : dim.name)}
              >
                {dim.shortName} ({dim.score}/10)
              </text>
            );
          })}
        </svg>

        {/* Center Hub Indicator */}
        <div className="absolute inset-auto flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Your Score</span>
          <span className="text-2xl font-extrabold text-white leading-none mt-0.5">{result.overallScore}</span>
          <span className="text-[10px] text-amber-400 font-medium">out of 10</span>
        </div>
      </div>

      {/* Legend & Explanatory Tag */}
      <div className="flex items-center gap-5 mt-2 text-xs text-slate-300">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded-full bg-amber-500 inline-block shadow-sm"></span>
          <span>Your Readiness Profile</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-0.5 border-b border-dashed border-slate-400 inline-block"></span>
          <span className="text-slate-400">Peer Average (5.2)</span>
        </div>
      </div>

      {/* Interactive Detail Card on Click/Hover */}
      {activeDimension && (
        <div className="w-full mt-4 p-3.5 rounded-xl bg-slate-800/90 border border-slate-700 text-left animate-fadeIn">
          {(() => {
            const selected = dims.find((d) => d.name === activeDimension);
            if (!selected) return null;
            return (
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white text-sm">{selected.name}</span>
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-semibold"
                    style={{ backgroundColor: `${selected.color}20`, color: selected.color }}
                  >
                    {selected.score} / 10 ({selected.status})
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{selected.insight}</p>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
