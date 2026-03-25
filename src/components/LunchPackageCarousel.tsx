import { useCallback, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { LUNCH_PACKAGE_CAROUSEL_SLIDES } from "@/lib/site-images";
import { cn } from "@/lib/utils";

const AUTOPLAY_MS = 4500;

const LunchPackageCarousel = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const onSelect = useCallback((embla: CarouselApi) => {
    setCurrent(embla.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!api) return;
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api.off("reInit", onSelect);
      api.off("select", onSelect);
    };
  }, [api, onSelect]);

  useEffect(() => {
    if (!api) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;
    const id = window.setInterval(() => {
      api.scrollNext();
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [api]);

  return (
    <div className="w-full max-w-xl md:max-w-2xl lg:max-w-[28rem] xl:max-w-[32rem] mx-auto">
      <Carousel setApi={setApi} opts={{ loop: true, align: "start" }} className="w-full">
        <CarouselContent
          className="-ml-0"
          viewportClassName="rounded-2xl shadow-[0_16px_48px_-16px_hsl(20_5%_29%_/0.28)] ring-1 ring-deep-purple/10 isolate [transform:translateZ(0)]"
        >
          {LUNCH_PACKAGE_CAROUSEL_SLIDES.map((slide, i) => (
            <CarouselItem key={slide.label} className="basis-full pl-0">
              <div className="aspect-square w-full">
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="h-full w-full object-cover"
                  loading={i === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Carousel slides">
        {LUNCH_PACKAGE_CAROUSEL_SLIDES.map((slide, i) => (
          <button
            key={slide.label}
            type="button"
            role="tab"
            aria-selected={i === current}
            aria-label={`Show ${slide.label}`}
            className={cn(
              "h-2 w-2 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              i === current ? "bg-primary" : "bg-deep-purple/25 hover:bg-deep-purple/40",
            )}
            onClick={() => api?.scrollTo(i)}
          />
        ))}
      </div>
    </div>
  );
};

export default LunchPackageCarousel;
