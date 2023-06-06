import React from "react";
import inner from "../assets/images/circle/inner.webp";
import middle from "../assets/images/circle/middle.webp";
import outer from "../assets/images/circle/outer.webp";

const Wheel = ({ rotation }) => {
  return (
    <>
      <img
        src={inner}
        alt="inner"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          userSelect: "none",
        }}
      />
      <img
        src={middle}
        alt="middle"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          transform: `rotate(${-rotation}deg) `,
          userSelect: "none",
        }}
      />
      <img
        src={outer}
        alt="outer"
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          transform: `rotate(${rotation}deg) `,
          userSelect: "none",
        }}
      />
    </>
  );
};

export default Wheel;
