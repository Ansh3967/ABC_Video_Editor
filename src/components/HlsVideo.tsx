import { useEffect, useRef } from "react";
import Hls from "hls.js";

export function HlsVideo({
  src,
  className,
  flipped = false,
}: {
  src: string;
  className?: string;
  flipped?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    let hls: Hls | undefined;
    if (Hls.isSupported()) {
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }
    return () => {
      hls?.destroy();
    };
  }, [src]);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      className={`absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 ${
        flipped ? "scale-y-[-1]" : ""
      } ${className ?? ""}`}
    />
  );
}
