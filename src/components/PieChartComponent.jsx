"use client";

import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartContainer } from "@/components/ui/chart";

const chartData = [
  { browser: "protein", calories: 275, fill: "var(--color-protein)" },
  { browser: "fats", calories: 200, fill: "var(--color-fats)" },
  { browser: "carbs", calories: 287, fill: "var(--color-carbs)" },
];

export const chartConfig = {
  protein: {
    label: "Protein",
    color: "hsl(var(--chart-1))",
  },
  fats: {
    label: "Fats",
    color: "hsl(var(--chart-2))",
  },
  carbs: {
    label: "Carbs",
    color: "hsl(var(--chart-3))",
  },
};

export default function PieChartComponent({ width = 180, height = 180 }) {
  const totalCalories = useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.calories, 0);
  }, []);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto"
      style={{ width, height }}
    >
      <PieChart width={width} height={height}>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="calories"
          nameKey="browser"
          innerRadius={width * 0.3}
          outerRadius={width * 0.5 - 5} // Adjust outer radius based on size
          strokeWidth={5}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy || 0}
                      className="fill-foreground text-xl font-bold"
                    >
                      {totalCalories.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 20}
                      className="fill-muted-foreground"
                    >
                      calories
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </Pie>
      </PieChart>
    </ChartContainer>
  );
}
