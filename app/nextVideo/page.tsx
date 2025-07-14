"use client";
import { useState, useRef } from "react";

const playlist = ["/samp1.mp4", "/samp2.mp4", "/samp3.mp4"];

export default function NextVideoPage() {
  const [idx, setIdx] = useState(0);
  const ref = useRef<HTMLVideoElement>(null);

  const onEnd = () => {
    const next = (idx + 1) % playlist.length;
    setIdx(next);
    ref.current?.play();
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Playlist</h1>
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
