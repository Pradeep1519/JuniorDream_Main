"use client";

import * as React from "react";
import { GripVerticalIcon } from "lucide-react";
import { cn } from "./utils";

function ResizablePanelGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex h-full w-full", className)} {...props} />
  );
}

function ResizablePanel({ ...props }: React.ComponentProps<"div">) {
  return <div {...props} />;
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: React.ComponentProps<"div"> & { withHandle?: boolean }) {
  return (
    <div className={cn("relative flex w-px items-center justify-center bg-border", className)} {...props}>
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-xs border bg-border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </div>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };