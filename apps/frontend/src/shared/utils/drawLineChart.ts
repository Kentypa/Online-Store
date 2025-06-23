import * as d3 from "d3";

type DrawLineChartProps = {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  data: number[];
  xScale: d3.ScaleLinear<number, number>;
  yScale: d3.ScaleLinear<number, number>;
  color?: string;
  strokeWidth?: number;
};

export const drawLineChart = ({
  svg,
  data,
  xScale,
  yScale,
  color = "#616C7C",
  strokeWidth = 4,
}: DrawLineChartProps) => {
  const line = d3
    .line<number>()
    .x((_d, i) => xScale(i))
    .y((d) => yScale(d))
    .curve(d3.curveMonotoneX);

  svg
    .append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", color)
    .attr("stroke-width", strokeWidth)
    .attr("d", line);
};
