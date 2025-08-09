"use client";

import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartContainer } from "@/components/ui/chart";

export const chartConfig = {
  protein: {
    label: "Protein",
    color: "hsl(var(--chart-1))",
  },
  fats: {
    label: "Fats",
    color: "hsl(var(--chart-2))",
  },
  carbohydrate: {
    label: "carbohydrate",
    color: "hsl(var(--chart-3))",
  },
  totalCalories: {
    label: "totalCalories",
    color: "hsl(var(--chart-4))",
  },
  remainingCalories: {
    label: "remainingCalories",
    color: "hsl(var(--chart-5))",
  },
};

export default function PieChartComponent({
  width = 180,
  height = 180,
  totalCalories,
  remainingCalories,
  protein,
  carbohydrate,
  fats,
}) {
  const chartData = useMemo(
    () => [
      { browser: "protein", calories: protein, fill: "var(--color-protein)" },
      {
        browser: "totalCalories",
        calories: totalCalories,
        fill: "var(--color-totalCalories)",
      },
      {
        browser: "remainingCalories",
        calories: remainingCalories,
        fill: "var(--color-remainingCalories)",
      },
      { browser: "fats", calories: fats, fill: "var(--color-fats)" },
      {
        browser: "carbohydrate",
        calories: carbohydrate,
        fill: "var(--color-carbohydrate)",
      },
    ],
    [(totalCalories, remainingCalories, carbohydrate, fats, protein)]
  );
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
          outerRadius={width * 0.5}
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
                      y={(viewBox.cy || 0) - 5}
                      className="fill-foreground text-xl font-bold"
                    >
                      {remainingCalories
                        ? remainingCalories?.toLocaleString()
                        : totalCalories?.toLocaleString()}
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 15}
                      className="items-center fill-muted-foreground"
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
