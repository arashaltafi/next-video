"use client";

import VideoPlayer from "@/components/VideoPlayer";
import { isHaveIdInStorage, LocalStorageRoutes } from "@/utils/LocalStorage";

export default function CustomPlayerPage() {
    return (
        <div className="px-6 w-2/3 py-8 mx-auto h-screen flex items-center justify-center flex-col gap-12 bg-amber-950">
            <h1 className="text-5xl font-bold">Custom Video Player</h1>

            <VideoPlayer
                id={1}
                src={"https://arashaltafi.ir/url_sample/mp4.mp4"}
                image={"https://arashaltafi.ir/url_sample/png.png"}
                isFav={isHaveIdInStorage(LocalStorageRoutes.MUSIC_VIDEO, 1)}
                name={"mp4"}
                singer={"arash"}
            />
        </div>
    );
}