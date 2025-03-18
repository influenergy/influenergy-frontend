import React, {
  useRef,
  useEffect,
  forwardRef,
  RefObject,
  useState,
} from "react";
import Hls from "hls.js";

interface VideoPlayerProps {
  videoUrl: string;
  muted: boolean;
  isPlaying: boolean;
  onEnded: () => void;
  className?: string;
}

const VideoPlayer = forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ videoUrl, muted, isPlaying, onEnded, className = "" }, ref) => {
    const localRef = useRef<HTMLVideoElement>(null);
    const videoRef = (ref as RefObject<HTMLVideoElement>) || localRef;
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Reset error state when videoUrl changes
    useEffect(() => {
      setError(null);
      setIsLoading(true);
    }, [videoUrl]);

    useEffect(() => {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      let hls: Hls | null = null;

      const handleVideoError = (e: Event) => {
        console.error("Video error:", e);
        setError("Failed to load video");
        setIsLoading(false);
      };

      const handleLoadedData = () => {
        setIsLoading(false);
      };

      videoElement.addEventListener("error", handleVideoError);
      videoElement.addEventListener("loadeddata", handleLoadedData);

      try {
        if (Hls.isSupported() && videoUrl.endsWith(".m3u8")) {
          hls = new Hls({
            enableWorker: false,
            xhrSetup: (xhr) => {
              // Add CORS headers if needed
              xhr.withCredentials = false;
            },
            // Add more debug options
            debug: false,
          });

          hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
              console.error("HLS fatal error:", data.type, data.details);
              setError(`HLS error: ${data.details}`);
              hls?.destroy();
            }
          });

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            setIsLoading(false);
            if (isPlaying) {
              videoElement.play().catch((err) => {
                console.error("Play error after manifest parsed:", err);
              });
            }
          });

          hls.loadSource(videoUrl);
          hls.attachMedia(videoElement);
        } else if (videoElement.canPlayType("application/vnd.apple.mpegurl")) {
          // Native HLS support (Safari)
          videoElement.src = videoUrl;
          videoElement.addEventListener("canplaythrough", () => {
            setIsLoading(false);
            if (isPlaying) {
              videoElement.play().catch((err) => {
                console.error("Native play error:", err);
              });
            }
          });
        } else {
          // For non-HLS videos
          videoElement.src = videoUrl;
          if (isPlaying) {
            videoElement.play().catch(console.error);
          }
        }
      } catch (err) {
        console.error("Setup error:", err);
        setError("Failed to initialize video player");
        setIsLoading(false);
      }

      return () => {
        videoElement.removeEventListener("error", handleVideoError);
        videoElement.removeEventListener("loadeddata", handleLoadedData);

        if (hls) {
          hls.destroy();
        }

        // Clear src to stop any pending requests
        videoElement.src = "";
        videoElement.load();
      };
    }, [videoUrl, videoRef]);

    useEffect(() => {
      const videoElement = videoRef.current;
      if (!videoElement || error || isLoading) return;

      if (isPlaying) {
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.error("Error playing video:", err);
            // Most browsers will only allow autoplay if video is muted
            if (err.name === "NotAllowedError" && !muted) {
              console.log("Autoplay prevented, trying with muted audio");
              videoElement.muted = true;
              videoElement
                .play()
                .catch((e) => console.error("Still can't play even muted:", e));
            }
          });
        }
      } else {
        videoElement.pause();
      }
    }, [isPlaying, videoRef, error, isLoading, muted]);

    // Update muted state when it changes
    useEffect(() => {
      const videoElement = videoRef.current;
      if (videoElement) {
        videoElement.muted = muted;
      }
    }, [muted, videoRef]);

    return (
      <div className="relative w-full h-full">
        <video
          ref={videoRef}
          className={`${className} ${
            isLoading || error ? "invisible" : "visible"
          }`}
          playsInline
          muted={muted}
          onEnded={onEnded}
          loop={false}
          crossOrigin="anonymous"
        />

        {isLoading && !error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
            <div className="text-center p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 mx-auto mb-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p>Video playback error</p>
            </div>
          </div>
        )}
      </div>
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;
