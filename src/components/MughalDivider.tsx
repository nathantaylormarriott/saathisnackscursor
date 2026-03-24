import dividerImg from "@/assets/divider.svg";
import { cn } from "@/lib/utils";

type MughalDividerProps = {
  className?: string;
};

/** Golden Mustard #EBB035 (hsl 43 83% 56%) - single ornamental fill sitewide */
const MUSTARD_FILL = "hsl(43 83% 56%)";

const MughalDivider = ({ className }: MughalDividerProps) => {
  return (
    <div className={cn("flex items-center justify-center pt-2 pb-6", className)}>
      <div
        className="mughal-divider-shape w-48 md:w-72 h-10"
        style={{
          backgroundColor: MUSTARD_FILL,
          WebkitMaskImage: `url(${dividerImg})`,
          maskImage: `url(${dividerImg})`,
          WebkitMaskSize: "cover",
          maskSize: "cover",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskType: "alpha",
          maskType: "alpha",
        }}
        aria-hidden
      />
    </div>
  );
};

export default MughalDivider;
