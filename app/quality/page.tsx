"use client";

import { useRef } from "react";

export default function QualityPage() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const setSrc = (q: "sd" | "hd") => {
        if (videoRef.current) {
            videoRef.current.src = `https://arashaltafi.ir/url_sample/mp4.mp4`;
            videoRef.current.load();
            videoRef.current.play();
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Quality Switcher</h1>
            <div className="mb-2">
                <button className="mr-2 btn" onClick={() => setSrc("sd")}>SD</button>
                <button className="btn" onClick={() => setSrc("hd")}>HD</button>
            </div>
            <video
                ref={videoRef}
                className="w-full max-w-2xl border rounded"
                controls
                src="https://arashaltafi.ir/url_sample/mp4.mp4"
            />
        </div>
    );
}