import React, { useEffect } from "react";
import { useState } from "react";

const ReproductorVideo = (dataDB) => {
  const [videoData, setVideoData] = useState(null);
  useEffect(() => {
    setVideoData(dataDB);
  }, []);

  return (
    <div>
      {videoData && (
        <>
          <video controls autoPlay loop muted>
            <source src={videoData} type="video/mp4"></source>
          </video>
        </>
      )}
    </div>
  );
};

export default ReproductorVideo;
