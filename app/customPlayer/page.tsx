"use client";

export default function CustomPlayerPage() {
    return (
        <div className="p-6 w-full h-screen flex items-center justify-center flex-col gap-12">
            <h1 className="text-5xl font-bold">Custom Video Player</h1>
            <video
                className="w-full max-w-2xl border rounded"
                controls
                preload="metadata"
            >
                <source src="https://arashaltafi.ir/url_sample/mp4.mp4" type="video/mp4" />
                Your browser doesn't support video
            </video>
        </div>
    );
}