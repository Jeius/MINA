import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap max-w-60 rounded-md text-xs font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default: "bg-primary border border-primary-dark text-slate-50 dark:bg-slate-50 dark:text-slate-900",
        destructive: "bg-red-500 text-slate-50 dark:bg-red-900 dark:text-slate-50",
        outline: "border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950",
        secondary: "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-50",
        ghost: "",
        link: "text-slate-900 underline-offset-4 dark:text-slate-50",
      },
      size: {
        default: "h-9 rounded-lg px-4 py-2",
        sm: "h-8 rounded-lg px-3",
        lg: "h-10 rounded-lg px-8",
        icon: "h-10 w-10",
      },
      hover: {
        default: "hover:bg-primary-200 dark:hover:bg-slate-50/90",
        destructive: "hover:bg-red-500/90 dark:hover:bg-red-900/90",
        outline: "hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50",
        secondary: "hover:bg-slate-100/80 dark:hover:bg-slate-800/80",
        ghost: "hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-50",
        link: "hover:underline",
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, hover, size, asChild = false, ...props }, ref) => {
    const [isTouching, setIsTouching] = React.useState(false);
    const Comp = asChild ? Slot : "button";

    const touchClassName = isTouching ? "bg-primary-200" : "bg-primary";

    const handleTouchStart = () => setIsTouching(true);
    const handleTouchEnd = () => setIsTouching(false);

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, hover, className }), touchClassName)}
        ref={ref}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        {...props}
      >
        {props.children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
