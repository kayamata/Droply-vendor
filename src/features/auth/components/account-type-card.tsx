import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { cn } from "@/utils/cn";

interface AccountTypeCardProps {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  /** External links render a plain anchor instead of next/link. */
  external?: boolean;
}

/** Large tappable option on the "How will you be using DROPly?" screen. */
export function AccountTypeCard({
  href,
  icon: Icon,
  title,
  description,
  external,
}: AccountTypeCardProps) {
  const classes = cn(
    "group flex w-full items-center gap-4 rounded-2xl border border-border bg-card p-5 text-left shadow-[0_2px_8px_rgba(0,0,0,0.05)] transition-all duration-200",
    "hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
  );

  const inner = (
    <>
      <span className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-secondary text-secondary-foreground transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
        <Icon className="size-7" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-lg font-bold tracking-tight text-foreground">
          {title}
        </span>
        <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">
          {description}
        </span>
      </span>
      <ArrowRight className="size-5 shrink-0 text-muted-foreground transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
    </>
  );

  if (external) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}
