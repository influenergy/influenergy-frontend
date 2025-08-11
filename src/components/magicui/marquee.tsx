import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";
import Image from "next/image";

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string;
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode;
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean;
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 2,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden [--duration:5s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

interface MarqueeLogosProps {
  images: { logo: string }[];
  pauseOnHover?: boolean;
}

export function MarqueeLogos({
  images,
  pauseOnHover = true,
}: MarqueeLogosProps) {
  return (
    <Marquee
      className="py-2 md:py-4"
      pauseOnHover={pauseOnHover}
      repeat={2}
      style={{ "--duration": "20s" } as React.CSSProperties}
    >
      {images.map((company, index) => (
        <div key={index} className="flex items-center justify-center mx-6">
          <Image
            src={company.logo}
            alt={`Partner company ${index + 1}`}
            width={100}
            height={50}
            className="object-contain h-10"
          />
        </div>
      ))}
    </Marquee>
  );
}
