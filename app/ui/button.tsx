import { cn } from "@/lib/utils";
import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isActive?: boolean; // Add isActive prop
}

export function Button({ children, isActive, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        "flex items-center rounded-[30px] px-4 py-[10px] text-sm font-medium text-white transition-all duration-300 ease-in-out",
        isActive
          ? "bg-[linear-gradient(180deg,#139804_0%,#063b00_100%)] text-white hover:bg-[linear-gradient(180deg,#139804_0%,#063b00_100%)] active:bg-[linear-gradient(180deg,#139804_0%,#063b00_100%)]"
          : "hover:bg-[linear-gradient(180deg,#139804_0%,#063b00_100%)]",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#139804] aria-disabled:cursor-not-allowed aria-disabled:opacity-50",
        className
      )}
    >
      {children}
    </button>
  );
}
