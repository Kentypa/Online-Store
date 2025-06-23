type DrawGridLinesProps = {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  scale: d3.ScaleLinear<number, number>;
  orientation: "horizontal" | "vertical";
  linesCount: number;
  width: number;
  height: number;
  strokeWidth: number;
  strokeColor: string;
};

export const drawGridLines = ({
  svg,
  scale,
  orientation,
  linesCount,
  width,
  height,
  strokeWidth,
  strokeColor,
}: DrawGridLinesProps) => {
  const isHorizontal = orientation === "horizontal";

  svg
    .selectAll(`.${orientation}-line`)
    .data(scale.ticks(linesCount))
    .enter()
    .append("line")
    .attr("class", `${orientation}-line`)
    .attr("x1", isHorizontal ? (d) => scale(d) : 0)
    .attr("y1", isHorizontal ? 0 : (d) => scale(d))
    .attr("x2", isHorizontal ? (d) => scale(d) : width)
    .attr("y2", isHorizontal ? height : (d) => scale(d))
    .attr("stroke", strokeColor)
    .attr("stroke-width", strokeWidth);
};
