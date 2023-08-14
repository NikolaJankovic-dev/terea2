import React, { useState, useEffect, useRef } from "react";
import desna from "../ImagesExport/desna16x9";
import desna9x16 from "../ImagesExport/desna9x16";

const Right = ({
  right,
  setRight,
  isLandscape,
  handleTouchEnd,
  touchEnd,
  setTouchEnd,
  setRightImagesLoaded,
  tapped,
  check,
  index,
  direction,
  restart
}) => {
  const [images, setImages] = useState(desna);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const straightPacks = [0, 9, 22, 34, 47, 57, 69, 83, 97, 109];

  function findClosestNumber(arr, num) {
    let closest = arr[0];
    let diff = Math.abs(num - closest);

    for (let i = 1; i < arr.length; i++) {
      let newDiff = Math.abs(num - arr[i]);
      if (newDiff < diff) {
        diff = newDiff;
        closest = arr[i];
      }
    }

    return closest;
  }

  const timerRef = useRef(null);

  useEffect(() => {
    if (restart) setRight(0);
    else {
      const target = straightPacks[index];
      const interval = setInterval(() => {
        setRight((prevRight) => {
          let newRight = prevRight + direction;
          if (newRight >= 118) {
            newRight = 0;
          }
          if (newRight < 0) {
            newRight = 117;
          }
          if (newRight === target) {
            clearInterval(interval);
          }
          return newRight;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [index, direction]);

  useEffect(() => {
    const imagesToLoad = isLandscape ? desna : desna9x16;
    Promise.all(
      imagesToLoad.map((image) =>
        fetch(image)
          .then((response) => response.blob())
          .then((blob) => URL.createObjectURL(blob))
      )
    ).then((blobUrls) => {
      setImages(blobUrls); // Update your state to use blobUrls
      setImagesLoaded(true);
      setRightImagesLoaded(true); // Ovde postavite rightImagesLoaded na true
      console.log("Images loaded");
    });
  }, [isLandscape]);

  const imgRef = useRef(null);

  useEffect(() => {
    if (imagesLoaded && imgRef.current) {
      imgRef.current.src = images[right % 118];
    }
  }, [imagesLoaded, right]);

  return (
    <img
      ref={imgRef}
      alt="desna1"
      style={{
        position: "absolute",
        top: "0",
        right: "0",
        height: isLandscape ? "100vh" : "80vh",
        zIndex: "1",
      }}
    />
  );
};

export default Right;
