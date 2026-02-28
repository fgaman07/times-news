import React from "react";
import VideoSection from "./VideoSection";

const VideoPage = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-red-600">वीडियो</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <VideoSection />
        <VideoSection />
        <VideoSection />
        <VideoSection />
        <VideoSection />
      </div>
    </div>
  );
};

export default VideoPage;
