import React, { useState, useEffect, useRef } from "react";
import leva from "../ImagesExport/leva16x9";
import leva9x16 from "../ImagesExport/leva9x16";

const Left = ({ left, isLandscape, setLeftImagesLoaded }) => {
  const [position, setPosition] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const imagesToLoad = isLandscape ? leva : leva9x16;
    Promise.all(
      imagesToLoad.map((image) =>
        fetch(image)
          .then((response) => response.blob())
          .then((blob) => URL.createObjectURL(blob))
      )
    ).then((blobUrls) => {
      setImages(blobUrls); // Update your state to use blobUrls
      setImagesLoaded(true);
      setLeftImagesLoaded(true);
      console.log("Images loaded");
    });
  }, [isLandscape]);

  useEffect(() => {
    if (left === 0) setPosition(0);
    else {
      const interval = setInterval(() => {
        setPosition((prevPosition) => {
          if (left > prevPosition) {
            return prevPosition + 1;
          } else {
            return prevPosition;
          }
        });
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [left]);

  useEffect(() => {
    if (imagesLoaded && imgRef.current) {
      imgRef.current.src = images[position % images.length];
    }
  }, [imagesLoaded, position]);

  // useEffect(() => {
  //   setLeftImagesLoaded(imagesLoaded);
  //   console.log("Images loaded");
  // }, [imagesLoaded]);

  // if (!imagesLoaded) return null;

  return (
    images && (
      <img
        ref={imgRef}
        alt="leva1"
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          transform: !isLandscape ? "translateY(5%)" : "",
          height: isLandscape ? "100vh" : "69vh",
          zIndex: "1",
        }}
      />
    )
  );
};

export default Left;
