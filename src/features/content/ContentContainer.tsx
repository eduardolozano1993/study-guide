import { cn } from "@/lib/utils";
import * as React from "react";

function ContentContainer({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto max-w-[65ch] px-4 md:px-6 lg:px-8 py-6",
        className,
      )}
      {...props}
    />
  );
}

export { ContentContainer };
