'use client';

import { geoMercator, geoPath } from 'd3-geo';
import type { FeatureCollection } from 'geojson';
import type { FC } from 'react';
import React, { useRef, useState } from 'react';

interface MapProps {
  map: FeatureCollection;
}

const ElectionMap: FC<MapProps> = ({ map }) => {
  const containerRef = useRef<SVGSVGElement>(null);

  const initialProjection = () => geoMercator().fitSize([100, 100], map);

  const [projection] = useState(initialProjection);
  const path = geoPath().projection(projection);

  return (
    <svg ref={containerRef} viewBox="0 0 100 100">
      {map.features.map((feature, i) => (
        <g key={`${feature.properties?.lganame ?? i}`} className="regions">
          <path
            d={path(feature) || undefined}
            stroke="#333"
            strokeWidth={0.5}
          />
        </g>
      ))}
    </svg>
  );
};

export default ElectionMap;
