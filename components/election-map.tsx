'use client';

import { geoMercator, geoPath } from 'd3-geo';
import type { FeatureCollection } from 'geojson';
import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';

interface MapProps {
  map: FeatureCollection;
}

const ElectionMap: FC<MapProps> = ({ map }) => {
  const initialProjection = () => geoMercator().fitSize([100, 100], map);
  const [projection, setProjection] = useState(initialProjection);
  const path = geoPath().projection(projection);

  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    function handleResize() {
      setProjection(initialProjection);
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <svg ref={containerRef} viewBox="0 0 100 100">
      {map.features.map((feature, i) => {
        return (
          <g key={`${feature.properties!.lganame}${i}`} className="regions">
            <path d={path(feature)!} stroke="#333" strokeWidth={0.5} />
            );
          </g>
        );
      })}
    </svg>
  );
};

export default ElectionMap;
