"use client";

import * as React from "react";
import { ImagePlus, X } from "lucide-react";

import { cn } from "@/utils/cn";

/* Images are stored as data URLs (no media backend yet). Downscale before
   saving so localStorage stays well under quota. */
const MAX_EDGE = 640;
const JPEG_QUALITY = 0.82;

async function fileToDataUrl(file: File): Promise<string> {
  const dataUrl = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
      if (scale === 1) return resolve(dataUrl);
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      canvas.getContext("2d")?.drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", JPEG_QUALITY));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

interface VendorImageFieldProps {
  label: string;
  /** Current image as a data URL, or undefined. */
  value?: string;
  onChange: (dataUrl: string | undefined) => void;
  hint?: string;
  error?: string;
  className?: string;
}

/** Image upload field with preview — reads, downscales and previews the file. */
export function VendorImageField({
  label,
  value,
  onChange,
  hint,
  error,
  className,
}: VendorImageFieldProps) {
  const id = React.useId();
  const [loading, setLoading] = React.useState(false);

  async function onFile(file: File | null) {
    if (!file) return;
    setLoading(true);
    try {
      onChange(await fileToDataUrl(file));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <span className="text-sm font-semibold text-foreground">{label}</span>
      <div className="flex items-center gap-3">
        {value ? (
          <span className="relative size-16 shrink-0 overflow-hidden rounded-2xl border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Product preview"
              className="size-full object-cover"
            />
          </span>
        ) : (
          <span className="flex size-16 shrink-0 items-center justify-center rounded-2xl border border-dashed border-input bg-muted text-muted-foreground">
            <ImagePlus className="size-6" />
          </span>
        )}
        <div className="flex min-w-0 flex-col gap-1.5">
          <label
            htmlFor={id}
            className={cn(
              "inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-lg border border-border bg-card px-3 py-2 text-xs font-bold text-foreground transition-colors hover:bg-muted",
              loading && "pointer-events-none opacity-60"
            )}
          >
            <ImagePlus className="size-3.5" />
            {loading ? "Processing…" : value ? "Replace image" : "Upload image"}
          </label>
          {value && (
            <button
              type="button"
              onClick={() => onChange(undefined)}
              className="inline-flex w-fit items-center gap-1 text-xs font-semibold text-destructive transition-colors hover:text-destructive/80"
            >
              <X className="size-3.5" />
              Remove
            </button>
          )}
          {hint && !error && (
            <p className="text-xs text-muted-foreground">{hint}</p>
          )}
        </div>
      </div>
      <input
        id={id}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(e) => {
          void onFile(e.target.files?.[0] ?? null);
          e.target.value = "";
        }}
      />
      {error && (
        <p className="text-xs font-medium text-destructive">{error}</p>
      )}
    </div>
  );
}
