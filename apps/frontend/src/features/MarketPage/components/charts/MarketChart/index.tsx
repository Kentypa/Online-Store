import { D3AxisTicks } from "@charts/D3AxisTicks";
import { D3Chart } from "@charts/D3Chart";
import { D3TicksMarks } from "@charts/D3TicksMarks";
import { FC } from "react";

const labels = [
  "Nov 23",
  "Nov 24",
  "Nov 25",
  "Nov 26",
  "Nov 27",
  "Nov 28",
  "Nov 29",
  "Nov 30",
  "Dec 1",
  "Dec 2",
  "Dec 3",
  "Dec 4",
  "Dec 5",
  "Dec 6",
];

const prices = [10, 40, 70, 100, 130, 160];

type MarketChartProps = {
  className?: string;
};

export const MarketChart: FC<MarketChartProps> = ({ className }) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <h2 className="text-headline-small mb-4">Average prices trendline</h2>
      <div className="flex h-[438px]">
        <D3TicksMarks
          className="flex flex-row-reverse mr-2 w-full max-w-[53px]"
          name="Price"
          values={prices}
        />
        <D3Chart
          data={[
            35, 76, 75, 100, 95, 75, 72, 66, 85, 110, 90, 120, 115, 130, 140,
          ]}
          yDomain={[10, 160]}
          className="w-full"
          linesCountX={14}
          linesCountY={4}
        />
      </div>
      <D3AxisTicks
        className="flex flex-col pl-[57px] w-full mt-2"
        labels={labels}
        name="Timeline"
      />
    </div>
  );
};
