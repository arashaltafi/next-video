"use client";
import { useState, useRef } from "react";

export default function NextVideoPage() {
  const playlist = ["https://arashaltafi.ir/url_sample/mp4.mp4", "https://arashaltafi.ir/url_sample/mp4.mp4", "https://arashaltafi.ir/url_sample/mp4.mp4"];

  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLVideoElement>(null);

  const onEnd = () => {
    const next = (idx + 1) % playlist.length;
    setIdx(next);
    ref.current?.play();
  };

  return (
        <div className="p-6 w-full h-screen flex items-center justify-center flex-col gap-12">
      <h1 className="text-5xl font-bold">Playlist</h1>
      <video
        ref={ref}
        src={playlist[idx]}
        controls
        onEnded={onEnd}
        className="w-full max-w-2xl border rounded"
      />
      <div className="mt-4">Now playing: {playlist[idx]}</div>
    </div>
  );
}
