import { cn } from "@/lib/utils";
import * as React from "react";

function ContentContainer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[88rem] px-5 py-8 md:px-8 md:py-10 lg:px-12 lg:py-14",
        className,
      )}
      {...props}
    />
  );
}

export { ContentContainer };
