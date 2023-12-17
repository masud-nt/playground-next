"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";
import { Button } from "@progressteaching/lightning-components";

const PopoverRoot = PopoverPrimitive.Root;

const PopoverTrigger = PopoverPrimitive.Trigger;

const PopoverContent = React.forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
>(({ className, align = "center", sideOffset = 4, ...props }, ref) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Content
      ref={ref}
      align={align}
      sideOffset={sideOffset}
      className={cn(
        "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        className
      )}
      {...props}
    />
  </PopoverPrimitive.Portal>
));
PopoverContent.displayName = PopoverPrimitive.Content.displayName;

export interface PopoverProps {
  className?: string;
  children: React.ReactNode;
  open?: boolean | undefined;
  onOpenChange?: ((open: boolean) => void) | undefined;
  renderTrigger: React.ReactNode | React.FC<any>;
  modal?: boolean | undefined;
  defaultOpen?: boolean | undefined;
  side?: "top" | "right" | "bottom" | "left" | undefined;
}

const Popover: React.FC<PopoverProps> = ({
  children,
  className,
  open,
  onOpenChange,
  renderTrigger,
  modal,
  defaultOpen,
  side,
}) => {
  return (
    <PopoverRoot
      open={open}
      onOpenChange={onOpenChange}
      modal={modal}
      defaultOpen={defaultOpen}
    >
      <PopoverTrigger asChild>
        {typeof renderTrigger === "function"
          ? renderTrigger({})
          : renderTrigger}
      </PopoverTrigger>
      <PopoverContent className={className} side={side}>
        {children}
      </PopoverContent>
    </PopoverRoot>
  );
};

export default Popover;

export { Popover };
