import { FC, useEffect, useRef, useState } from "react";
import { drawGridLines } from "@utils/drawGridLines";
import { drawLineChart } from "@utils/drawLineChart";
import * as d3 from "d3";

type D3ChartProps = {
  linesCountX: number;
  linesCountY: number;
  data: number[];
  yDomain: [number, number];
  className?: string;
};

export const D3Chart: FC<D3ChartProps> = ({
  linesCountX,
  linesCountY,
  data,
  yDomain,
  className,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setWidth(width);
        setHeight(height);
      }
    });

    if (svgRef.current) {
      resizeObserver.observe(svgRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!svgRef.current || width === 0 || height === 0) return;

    const svg = d3.select(svgRef.current);

    svg.selectAll("*").remove();

    const gridXScale = d3
      .scaleLinear()
      .domain([0, linesCountX])
      .range([0, width]);
    const gridYScale = d3
      .scaleLinear()
      .domain([0, linesCountY])
      .range([height, 0]);

    drawGridLines({
      svg,
      scale: gridXScale,
      orientation: "horizontal",
      linesCount: linesCountX,
      width,
      height,
      strokeWidth: 1,
      strokeColor: "#e0e0e0",
    });

    drawGridLines({
      svg,
      scale: gridYScale,
      orientation: "vertical",
      linesCount: linesCountY,
      width,
      height,
      strokeWidth: 1,
      strokeColor: "#e0e0e0",
    });

    const dataXScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, width]);

    const dataYScale = d3.scaleLinear().domain(yDomain).range([height, 0]);

    drawLineChart({
      svg,
      data,
      xScale: dataXScale,
      yScale: dataYScale,
      color: "#616C7C",
      strokeWidth: 4,
    });
  }, [linesCountX, linesCountY, data, yDomain, width, height]);

  return <svg ref={svgRef} className={className} />;
};
