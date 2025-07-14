"use client";

import { useState } from "react";

export default function StylePage() {
    const [skin, setSkin] = useState("default");

    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Change Video Skin</h1>
            <select
                className="border p-1 mb-4"
                onChange={(e) => setSkin(e.target.value)}
            >
                <option value="default">Default</option>
                <option value="rounded">Rounded</option>
                <option value="shadow">Shadow</option>
                <option value="bordered">Bordered</option>
            </select>
            <video
                className={`
          w-full max-w-2xl
          ${skin === "rounded" ? "rounded-2xl" : ""}
          ${skin === "shadow" ? "shadow-lg" : ""}
          ${skin === "bordered" ? "border-4 border-gray-500" : ""}
        `}
                controls
                src="/sample.mp4"
            />
        </div>
    );
}