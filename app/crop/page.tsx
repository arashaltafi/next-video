import { CldVideoPlayer } from "next-cloudinary";

export default function CropVideoPage() {
    return (
        <div className="p-6">
            <h1 className="text-xl font-bold mb-4">Crop Video</h1>
            <CldVideoPlayer
                src="my-video" /* Cloudinary public ID */
                width={640}
                height={360}
                controls
                transformation={{
                    crop: "fill",
                    gravity: "center",
                    width: 640,
                    height: 360,
                }}
            />
        </div>
    );
}