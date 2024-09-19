"use client";

import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft } from "lucide-react";

const CreateMeal = () => {
  return (
    <div className="flex flex-col space-y-6 m-6">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="/dashboard/search">
              <ArrowLeft />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Go to Search</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default CreateMeal;
