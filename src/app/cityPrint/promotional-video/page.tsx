"use client";
import React, { useEffect, useState } from "react";
import { Label } from "~/components/ui/label";

// Extend the Window interface to include the FB property
declare global {
  interface Window {
    FB: any;
  }
}

interface FacebookVideoPlayerProps {
  videoUrl: string;
}

const FacebookVideoPlayer: React.FC<FacebookVideoPlayerProps> = ({
  videoUrl,
}) => {
  useEffect(() => {
    // Load Facebook SDK script
    const loadFacebookSDK = () => {
      if (window.FB) {
        // Facebook SDK already loaded
        window.FB.XFBML.parse();
      } else {
        // Create script element
        const script = document.createElement("script");
        script.src =
          "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2";
        script.async = true;
        script.onload = () => {
          window.FB.XFBML.parse();
        };
        document.body.appendChild(script);
      }
    };

    loadFacebookSDK();
  }, []);

  const isReel = videoUrl.includes("/reel/");

  return (
    <div className="facebook-video h-full w-full">
      <div
        className={isReel ? "fb-post" : "fb-video"}
        data-href={videoUrl}
        data-width="auto"
        data-height="auto"
        data-show-text="false"
        style={{ width: "100%", height: "100%" }}
      ></div>
    </div>
  );
};

const VideoPromotion: React.FC = () => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    // Hide message and show videos after 2 seconds
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 10);

    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  }, []);

  const videoUrls = [
    "https://www.facebook.com/105238368947001/videos/1472395256540198",
    "https://www.facebook.com/105238368947001/videos/470486624893639",
    "https://www.facebook.com/105238368947001/videos/428202419357868",
    "https://www.facebook.com/105238368947001/videos/1472395256540198",
  ];

  return (
    <>
      {showMessage ? (
        <div className="flex h-screen w-full items-center justify-center">
          <Label className="animate-bounce text-6xl font-extrabold tracking-widest text-orange-500">
            CITYPRINT ENTERPRISE....
          </Label>
        </div>
      ) : (
        <div className="mt-10 flex flex-col gap-10">
          <div className="flex w-full items-center justify-center">
            <Label className="mt-14 animate-bounce items-center text-4xl font-extrabold tracking-widest text-blue-500">
              Watch and Enjoy
            </Label>
          </div>
          <div className="grid w-full grid-cols-1 items-center justify-center gap-10 px-4 md:grid-cols-2 lg:grid-cols-4">
            {videoUrls.map((videoUrl, index) => (
              <div
                key={index}
                className="relative h-auto w-full"
                style={{ maxWidth: "400px" }}
              >
                <FacebookVideoPlayer videoUrl={videoUrl} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default VideoPromotion;
