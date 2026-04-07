import { cn } from "@/lib/utils";

interface ContentImageProps {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  imageClassName?: string;
}

export function ContentImage({
  src,
  alt,
  caption,
  className,
  imageClassName,
}: ContentImageProps) {
  return (
    <figure
      className={cn(
        "my-6 overflow-hidden rounded-[28px] border border-border/80 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.08)]",
        className,
      )}
    >
      <img
        src={src}
        alt={alt}
        className={cn("block h-auto w-full object-cover", imageClassName)}
        loading="lazy"
      />
      {caption ? (
        <figcaption className="border-t border-border/70 bg-slate-50 px-5 py-4 text-sm leading-6 text-muted-foreground">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
