import { useEffect, useRef, useState } from "react";

type PropsType = {
    onBase64Ready?: (base64: string | null) => void;
    onAuthenticationTextReady?: (authenticationText: string | null) => void;
    onFormDataReady?: (formData: FormData | null) => void;
    onFinalize?: (recordedURL: string) => void;
};


const AuthenticationVideo = (props: PropsType) => {
    const [recordedURL, setRecordedURL] = useState<string | null>(null);
    const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
    const [timer, setTimer] = useState(20);
    const [authenticationText, setAuthenticationText] = useState<string | null>(null);
    const [intervalId, setIntervalId] = useState<number | null>(null);
    const chunks = useRef<Blob[]>([]);
    const playbackRef = useRef<HTMLVideoElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        if (recorder) {
            setTimer(20);
            const id = window.setInterval(() => {
                setTimer(prev => {
                    if (prev <= 1) {
                        clearInterval(id);
                        setIntervalId(null);
                        stopRecording();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            setIntervalId(id);
        } else if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    }, [recorder]);

    const resetVideo = () => {
        setRecordedURL(null);
        props?.onBase64Ready?.(null);
        props?.onFormDataReady?.(null);
        chunks.current = [];

        if (playbackRef.current) {
            playbackRef.current.src = "";
            playbackRef.current.pause();
            playbackRef.current.currentTime = 0;
            playbackRef.current.load(); // restores poster
        }

        if (videoRef.current) {
            videoRef.current.src = "";
            videoRef.current.pause();
            videoRef.current.currentTime = 0;
            videoRef.current.load(); // restores poster
        }
    }

    const stopRecording = () => {
        recorder?.stop()
    }

    const getMime = () => {
        const mp4 = 'video/mp4;codecs=avc1.42E01E,mp4a.40.2';
        if (MediaRecorder.isTypeSupported(mp4)) return mp4;
        const webm = 'video/webm;codecs=vp9,opus';
        if (MediaRecorder.isTypeSupported(webm)) return webm;
        return '';
    }

    const handleGetText = () => {
        setAuthenticationText('this is sample text');
        props?.onAuthenticationTextReady?.('this is sample text');
    }

    const startRecording = async () => {
        // Check support
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
            alert("your device is not supported")
            return;
        }

        try {
            setTimer(0);
            const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true
            });

            videoRef.current!.srcObject = stream;
            videoRef.current!.play();
            videoRef.current!.disablePictureInPicture = true;

            const mime = getMime();
            if (!mime) {
                alert("your device is not supported")
                return;
            }

            const m = new MediaRecorder(stream, { mimeType: mime });
            m.ondataavailable = e => chunks.current.push(e.data);
            m.onstop = () => {
                stream.getTracks().forEach(t => t.stop());
                const blob = new Blob(chunks.current, { type: chunks.current[0].type });
                const url = URL.createObjectURL(blob);
                props.onFinalize?.(url as string);
                setRecordedURL(url);

                if (videoRef.current) {
                    videoRef.current.srcObject = null;
                    videoRef.current.src = url;
                    videoRef.current.controls = true;
                    videoRef.current.play().catch(console.error);
                }

                const fd = new FormData();
                fd.append("faceVideo", blob, "face.mp4");

                const reader = new FileReader();
                props.onBase64Ready?.(reader.result as string);
                props.onFormDataReady?.(fd as FormData);

                reader.onloadend = () => props.onBase64Ready?.(reader.result as string);
                reader.readAsDataURL(blob);
                chunks.current = [];
                setRecorder(null);
            };
            m.start();
            setRecorder(m);
        } catch (err: any) {
            if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
                alert("please allow access to camera and microphone")
            } else if (err.name === 'NotFoundError' || err.name === 'OverconstrainedError') {
                alert("your device is not supported")
            } else {
                alert("something went wrong")
            }
        }
    }

    return (
        <>
            <div className="relative bg-white rounded-xl shadow-sm overflow-hidden aspect-video w-[296px] tabet:w-[320px] h-[400px]">
                <video
                    ref={recordedURL ? playbackRef : videoRef}
                    src={recordedURL ?? undefined}
                    muted={recordedURL == null}
                    controls={recordedURL != null}
                    playsInline
                    poster={'/placeholder-video-blur.png'}
                    controlsList="nofullscreen noplaybackrate nodownload noremoteplayback"
                    className="w-full h-full object-cover border border-gray300 rounded-xl"
                    style={{
                        transform: `${recordedURL ? "scaleX(1)" : "scaleX(-1)"}`
                    }}
                />

                {
                    recorder && (
                        <div className="absolute w-full bg-gray300/90 top-0 left-0 right-0 flex items-center justify-between px-4 py-2">
                            <div className="text-gray500 text-sm px-2 py-1 rounded">
                                {Math.floor(timer / 60).toString().padStart(2, "0")}:{(timer % 60).toString().padStart(2, "0")}
                            </div>
                            <div className="text-error600 text-xs px-2 py-1 rounded flex gap-1 items-center space-x-1">
                                <span>REC</span>
                                <div className="w-2 h-2 bg-error500 rounded-full animate-pulse" />
                            </div>
                        </div>
                    )
                }
            </div>

            {
                recorder && (
                    <div className="w-[320px] mt-4 rounded-lg border-[0.5px] p-4 border-gray300 bg-gray50">
                        <p className="text-sm font-medium leading-7 text-gray700">
                            {authenticationText}
                        </p>
                    </div>
                )
            }

            <div className="mt-4 w-[296px] tabet:w-[320px] flex items-center justify-center">
                {
                    recordedURL ? (
                        <button
                            color={'tertiary'}
                            type="button"
                            className="self-end w-full border-[0.5px] border-gray300 px-4"
                            onClick={resetVideo}
                        >
                            again
                        </button>
                    ) : (
                        recorder ? (
                            <button
                                color={'red'}
                                type="button"
                                className="self-end w-full"
                                onClick={stopRecording}
                            >
                                stop
                            </button>
                        ) : (
                            <button
                                color={'primary'}
                                type="button"
                                className="self-end w-full"
                                onClick={handleGetText}
                            >
                                record
                            </button>
                        )
                    )
                }
            </div>
        </>
    )
}

export default AuthenticationVideo