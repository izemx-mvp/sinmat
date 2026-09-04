import { CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function SuccessState({
  title,
  message,
  children,
  className,
}: {
  title: string;
  message: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-center rounded-lg border border-primary/30 bg-accent px-6 py-10 text-center",
        className,
      )}
    >
      <span className="mb-4 grid h-14 w-14 place-items-center rounded-full bg-primary/15">
        <CheckCircle2 className="h-8 w-8 text-primary" />
      </span>
      <h3 className="section-title text-xl text-foreground">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{message}</p>
      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  );
}
