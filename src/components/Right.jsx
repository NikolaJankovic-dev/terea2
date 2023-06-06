import React, { useState, useEffect, useRef } from "react";
import desna from "../ImagesExport/desna16x9";
import desna9x16 from "../ImagesExport/desna9x16";

const Right = ({
  right,
  setRight,
  isLandscape,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  touchEnd,
  setTouchEnd,
  setRightImagesLoaded,
  tapped,
  check,
}) => {
  const [images, setImages] = useState(desna);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const straightPacks = [0, 9, 22, 34, 47, 57, 69, 83, 97, 109, 117];

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

  // useEffect(() => {
  //   const closestNumber = findClosestNumber(straightPacks, right);
  //   // now you can do something with closestNumber
  //   if (!touchEnd) return;
  //   const interval = setInterval(() => {
  //     if (right > closestNumber) {
  //       setRight(right - 1);
  //     } else if (right < closestNumber) {
  //       setRight(right + 1);
  //     } else {
  //       clearInterval(interval);
  //       handleTouchEnd();
  //     }
  //   }, 100);
  //   return () => clearInterval(interval);
  // }, [touchEnd, right]);

  useEffect(() => {
    const closestNumber = findClosestNumber(
      straightPacks,
      straightPacks[tapped]
    );
    // now you can do something with closestNumber
    // if (!touchEnd) return;
    if (right === 0 && closestNumber > 100) {
      setRight(117);
    }
    if (right === 117 && closestNumber < 100) {
      setRight(0);
    }
    const interval = setInterval(() => {
      if (right > closestNumber) {
        setRight((prevRight) => prevRight - 1);
      } else if (right < closestNumber) {
        setRight((prevRight) => prevRight + 1);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          handleTouchEnd();
        }, 1000);
      }
    }, 50);
    console.log("tapped", closestNumber, right);
    return () => clearInterval(interval);
  }, [tapped, right]);

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

  // if (!imagesLoaded) return null;
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
      // onTouchStart={(e) => {
      //   handleTouchStart(e);
      //   setTouchEnd(false);
      //   console.log("touchstart");
      // }}
      // onTouchMove={(e) => {
      //   handleTouchMove(e);
      //   console.log("touchmove");
      // }}
      // onTouchEnd={() => {
      //   // handleTouchEnd();
      //   setTimeout(() => {
      //     setTouchEnd(true);
      //   }, 500);
      //   console.log("touchend");
      // }}
    />
  );
};

export default Right;
