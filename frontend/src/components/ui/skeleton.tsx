// src/components/ui/skeleton.tsx
"use client";
import * as React from "react";
import { cva } from "class-variance-authority";

const skeletonVariants = cva("animate-pulse rounded-md bg-muted");

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={skeletonVariants({ className })} {...props} />;
}

export { Skeleton };
