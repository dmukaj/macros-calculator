import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";

const ToolTipLink = ({ href, text, icon, className }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className={className}>
          <Link href={href} className="mr-2 md:absolute md:right-0">
            {icon}
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTipLink;
