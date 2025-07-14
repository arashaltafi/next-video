"use client";

export default function CustomPlayerPage() {
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Custom Video Player</h1>
            <video
                className="w-full max-w-2xl border rounded"
                controls
                preload="metadata"
            >
                <source src="/sample.mp4" type="video/mp4" />
                Your browser doesn't support video :contentReference[oaicite:10]{index = 10}
            </video>
        </div>
    );
}