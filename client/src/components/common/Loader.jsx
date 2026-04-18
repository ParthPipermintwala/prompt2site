import { cn } from "../../lib/utils";

export default function Loader({
  className,
  message = "Preparing your experience",
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#120f17] px-4",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="relative flex w-full max-w-sm flex-col items-center gap-6 text-center">
        <div className="relative flex h-28 w-28 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#ffb86b]/20 bg-[radial-gradient(circle,rgba(255,183,107,0.14),transparent_62%)] blur-[1px] animate-loader-float" />

          <div className="absolute inset-0 rounded-full border border-[#4cc9f0]/18 border-t-[#ffb86b] border-r-[#4cc9f0]/75 animate-loader-spin" />

          <div className="absolute inset-4 rounded-full border border-dashed border-white/18 animate-loader-spin-reverse" />

          <div className="absolute h-5 w-5 rounded-full bg-[#ffb86b] shadow-[0_0_24px_rgba(255,184,107,0.95)] animate-loader-pulse" />

          <span className="absolute left-1/2 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.95)] animate-loader-orbit" />
          <span className="absolute left-2/3 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#4cc9f0] shadow-[0_0_18px_rgba(76,201,240,0.95)] animate-loader-orbit-delayed" />
          <span className="absolute bottom-2 left-1/2 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-[#ffb86b]/90 shadow-[0_0_18px_rgba(255,184,107,0.85)] animate-loader-orbit-slower" />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.4em] text-[#8fe7ff]/75">
            Loading
          </p>
          <p className="text-lg font-semibold text-white">{message}</p>
          <p className="mx-auto max-w-xs text-sm leading-6 text-white/60">
            A brighter palette is warming up while the next screen finishes
            rendering.
          </p>
        </div>
      </div>
    </div>
  );
}
