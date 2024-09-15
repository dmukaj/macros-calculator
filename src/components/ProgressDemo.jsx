"use client";

import { Progress } from "@/components/ui/progress";

export function ProgressDemo({ label, value, max }) {
  return (
    <div className="my-4 flex justify-between items-center">
      <div className="flex flex-col justify-between mb-2">
        <span>{label}</span>
        <Progress value={(value / max) * 100} className="w-[45vw] h-3" />
      </div>
      <span>
        {value}/{max}
      </span>
    </div>
  );
}
