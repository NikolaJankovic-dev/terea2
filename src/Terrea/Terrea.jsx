import React, { useState, useEffect, useRef } from "react";
import terreaBg from "../assets/images/terreaBg.webp";
import Correct from "../components/Correct";
import Incorrect from "../components/Incorrect";
import Left from "../components/Left";
import Right from "../components/Right";
import Wheel from "../components/Wheel";
import on from "../assets/images/sound/on.webp";
import off from "../assets/images/sound/off.webp";
import { Fab } from "@mui/material";
import {
  ArrowDownward,
  ArrowUpward,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";

const Terrea = ({
  isLandscape,
  setWon,
  setLeftImagesLoaded,
  setRightImagesLoaded,
}) => {
  const [right, setRight] = useState(0);
  const [left, setLeft] = useState(0);
  const [phase, setPhase] = useState(0);
  const [checking, setChecking] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [startAngle, setStartAngle] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [sound, setSound] = useState(false);

  const [tapped, setTapped] = useState(0);

  const names = [
    "RUSSET",
    "BRONZE",
    "SIENA",
    "TEAK",
    "AMBER ",
    "YELLOW",
    "SILVER",
    "TIRQUOISE",
    "WILLOW",
    "MAUVE",
  ];

  const colors = [
    "#603E5C",
    "#A76846",
    "#872323",
    "#8C5F33",
    "#AE681B",
    "#C69500",
    "#BCBFBE",
    "#1F8E92",
    "#77A01B",
    "#A8A8A8",
  ];


  const namesForRight = [
    "AMBER ",
    "TEAK",
    "WILLOW",
    "YELLOW",
    "TIRQUOISE",
    "RUSSET",
    "SIENA",
    "SILVER",
    "MAUVE",
    "BRONZE",
  ];

  const colorsForRight = [
    "#C69500",
    "#8C5F33",
    "#77A01B",
    "#AE681B",
    "#1F8E92",
    "#603E5C",
    "#872323",
    "#BCBFBE",
    "#A8A8A8",
    "#A76846",
  ];

  const [leftText, setLeftText] = useState(names[0]);

  const [rightText, setRightText] = useState(namesForRight[0]);

  useEffect(() => {
    setLeftText(names[phase]);
  }, [phase]);

  useEffect(() => {
    setRightText(namesForRight[tapped]);
  }, [tapped]);

  const handleIncrement = () => {
    if (tapped === 10) {
      setTapped(0);
      // setTouchEnd(false);
      // setSound(!sound);
    }
    setTapped((tapped) => tapped + 1);
    setTouchEnd(false);
    setTimeout(() => {
      setTouchEnd(true);
    }, 1000);
  };

  const handleDecrement = () => {
    if (tapped === 0) {
      setTapped(10);
      //   // setSound(!sound);
    }
    setTapped((tapped) => tapped - 1);
    setTouchEnd(false);
    setTimeout(() => {
      setTouchEnd(true);
    }, 1000);
  };

  // useEffect(() => {
  //   // Napravimo pretpostavku da 1 tap = 10 stepeni rotacije.
  //   // Ako želite drugačiji odnos, samo promenite ovaj broj.
  //   setRight((tapped * 1) % 360);
  // }, [tapped]);

  // Create refs
  const rightRef = useRef(right);
  const phaseRef = useRef(phase);

  // Update refs whenever 'right' and 'phase' change
  useEffect(() => {
    rightRef.current = right;
  }, [right]);

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  const handleMouseDown = (e) => {
    setTouchEnd(false);
    if (e.preventDefault) e.preventDefault();
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const rad = Math.atan2(e.clientY - y, e.clientX - x);
    setStartAngle(rad * (180 / Math.PI) - rotation);
  };

  const handleMouseMove = (e) => {
    // if (e.preventDefault) e.preventDefault();
    if (startAngle === null) return;
    if (checking) return;
    const rect = e.target.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const rad = Math.atan2(e.clientY - y, e.clientX - x);
    const newRotation = rad * (180 / Math.PI) - startAngle;
    setRotation(newRotation);
    const newright = Math.floor((newRotation / 360) * 118);
    setRight(((newright % 118) + 118) % 118);
  };

  const check = () => {
    // if (startAngle !== null) {
    if (
      phaseRef.current === 0 &&
      rightRef.current >= 55 &&
      rightRef.current <= 62
    ) {
      setLeft((left) => left + 10);
      setCorrect(1);
      setPhase(1);
      setIncorrect(0);
    } else if (
      phaseRef.current === 1 &&
      rightRef.current >= 103 &&
      rightRef.current <= 110
    ) {
      setLeft((left) => left + 13);
      setCorrect(1);
      setPhase(2);
    } else if (
      phaseRef.current === 2 &&
      rightRef.current >= 68 &&
      rightRef.current <= 75
    ) {
      setLeft((left) => left + 13);
      setCorrect(1);
      setPhase(3);
    } else if (
      phaseRef.current === 3 &&
      rightRef.current >= 7 &&
      rightRef.current <= 14
    ) {
      setLeft((left) => left + 13);
      setCorrect(1);
      setPhase(4);
    } else if (phaseRef.current === 4 && rightRef.current >= 116) {
      setLeft((left) => left + 12);
      setCorrect(1);
      setPhase(5);
    } else if (phaseRef.current === 4 && rightRef.current <= 3) {
      setLeft((left) => left + 12);
      setCorrect(1);
      setPhase(5);
    } else if (
      phaseRef.current === 5 &&
      rightRef.current >= 31 &&
      rightRef.current <= 38
    ) {
      setLeft((left) => left + 12);
      setCorrect(1);
      setPhase(6);
    } else if (
      phaseRef.current === 6 &&
      rightRef.current >= 80 &&
      rightRef.current <= 86
    ) {
      setLeft((left) => left + 12);
      setCorrect(1);
      setPhase(7);
    } else if (
      phaseRef.current === 7 &&
      rightRef.current >= 44 &&
      rightRef.current <= 51
    ) {
      setLeft((left) => left + 12);
      setCorrect(1);
      setPhase(8);
    } else if (
      phaseRef.current === 8 &&
      rightRef.current >= 20 &&
      rightRef.current <= 26
    ) {
      setLeft((left) => left + 9);
      setCorrect(1);
      setPhase(9);
    } else if (
      phaseRef.current === 9 &&
      rightRef.current >= 92 &&
      rightRef.current <= 98
    ) {
      setLeft(107);
      setWon(true);
      setPhase(10);
    } else {
      if (checking) return;
      setIncorrect(1);
    }
    setStartAngle(null);
    setChecking(true);
    // }
    console.log(phase);
  };

  const handleMouseUp = () => {
    // check();
    // console.log(phase);
  };

  function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  let initialY;
  let previousY;

  const handleTouchStart = (e) => {
    initialY = e.touches[0].clientY;
    previousY = initialY;
    setStartAngle(null);
  };

  const touchMoveFT = (e) => {
    if (initialY === null) return;
    if (checking) return;
    setStartAngle(1);

    const currentY = e.touches[0].clientY;
    const diffY = previousY - currentY;

    // Provera da li se kursor pomera gore ili dole
    if (diffY > 0) {
      setRight((right + 1) % 118); // Gore
    } else if (diffY < 0) {
      setRight((right - 1 + 118) % 118); // Dole
    }

    previousY = currentY; // Postavi previousY za sledeći put
  };

  const handleTouchMove = throttle(touchMoveFT, 10);

  useEffect(() => {
    if (!correct && !incorrect) {
      setChecking(false);
    }
  }, [correct, incorrect]);

  const [touchEnd, setTouchEnd] = useState(false);

  // useEffect(() => {
  //   if (touchEnd) {
  //     check();
  //   }
  // }, [touchEnd]);

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundImage: `url(${terreaBg})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right top",
      }}
    >
      <img
        src={sound ? on : off}
        style={{
          position: "absolute",
          top: isLandscape ? "10%" : "0%",
          left: isLandscape ? "50%" : "0%",
          transform: isLandscape
            ? "translate(-50%, -50%)"
            : "translate(5vw, 5vw)",
          transformOrigin: "left top",
          maxBlockSize: "5vh",
          zIndex: 100,
        }}
        alt="sound"
        onPointerDown={() => setSound(!sound)}
      />
      <div
        style={{
          position: "absolute",
          top: isLandscape ? "20%" : "0%",
          left: isLandscape ? "50%" : "0%",
          transform: isLandscape
            ? "translate(-50%, -50%)"
            : "translate(5vw, 10vw)",
          display: "flex",
          gap: "5vw",
        }}
      >
        <div
          style={{
            width: "15vw",
            paddingBlock: "1vw",
            backgroundColor: colors[phase],
            borderRadius: "1vw",
            fontSize: "2vw",
            boxShadow: " inset -1px 1px 1px 1px black",
            textAlign: "center",
            color: "white",
            textShadow: "0 0 1px black",
            transition: "all 0.5s ease",
          }}
        >
          {leftText}
        </div>
        <div
          style={{
            width: "15vw",
            paddingBlock: "1vw",
            backgroundColor: colorsForRight[tapped],
            borderRadius: "1vw",
            fontSize: "2vw",
            boxShadow: " inset -1px 1px 1px 1px black",
            textAlign: "center",
            color: "white",
            textShadow: "0 0 1px black",
            transition: "all 0.5s ease",
          }}
        >
          {rightText}
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: isLandscape ? "40%" : "0%",
          left: isLandscape ? "50%" : "0%",
          transform: isLandscape
            ? "translate(-50%, -50%)"
            : "translate(5vw, 10vw)",
          display: "flex",
          flexFlow: "column",
          gap: "5vw",
          zIndex: 100,
        }}
      >
        <Fab
          // style={{
          //   width: "15vw",
          //   paddingBlock: "1vw",
          //   backgroundColor: "white",
          //   borderRadius: "1vw",
          //   fontSize: "2vw",
          //   boxShadow: " inset -1px 1px 1px 1px black",
          //   textAlign: "center",
          //   color: "white",
          //   textShadow: "0 0 1px black",
          // }}
          sx={{
            color: "white",
            backgroundColor: "#1BDAC1",
            "&:focus": {
              backgroundColor: "#1BDAC1",
            },
          }}
          onPointerDown={handleDecrement}
        >
          <KeyboardArrowUp />
        </Fab>
        <Fab
          // style={{
          //   width: "15vw",
          //   paddingBlock: "1vw",
          //   backgroundColor: "white",
          //   borderRadius: "1vw",
          //   fontSize: "2vw",
          //   boxShadow: " inset -1px 1px 1px 1px black",
          //   textAlign: "center",
          //   color: "white",
          //   textShadow: "0 0 1px black",
          // }}
          onPointerDown={handleIncrement}
          sx={{
            color: "white",
            backgroundColor: "#1BDAC1",
            "&:focus": {
              backgroundColor: "#1BDAC1",
            },
          }}
        >
          <KeyboardArrowDown />
        </Fab>
      </div>
      {correct > 0 && <Correct correct={correct} setCorrect={setCorrect} />}
      {incorrect > 0 && (
        <Incorrect
          incorrect={incorrect}
          setIncorrect={setIncorrect}
          check={check}
        />
      )}
      <Left
        left={left}
        isLandscape={isLandscape}
        setLeftImagesLoaded={setLeftImagesLoaded}
      />
      {/* {images && ( */}
      <Right
        right={right}
        setRight={setRight}
        isLandscape={isLandscape}
        handleTouchStart={handleTouchStart}
        handleTouchMove={handleTouchMove}
        setRightImagesLoaded={setRightImagesLoaded}
        handleTouchEnd={() => {
          // console.log("touch end");
          check();
        }}
        touchEnd={touchEnd}
        setTouchEnd={setTouchEnd}
        tapped={tapped}
      />
      {/* )} */}
      <div
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setTouchEnd(true)}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        <div
          style={{
            width: isLandscape ? "25vh" : "25vw",
            height: isLandscape ? "25vh" : "25vw",
            position: "absolute",
            right: isLandscape ? "50%" : "16%",
            bottom: isLandscape ? "0%" : "5%",
            transform: "translate(50%, -55%)",
            zIndex: "100",
            borderRadius: "50%",
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* {isLandscape && (
            <>
              {" "}
              <Wheel rotation={rotation} isLandscape={isLandscape} />
              <p
                style={{
                  position: "absolute",
                  bottom: "0",
                  left: "50%",
                  transform: "translate(-50%, 100%)",
                  padding: "20px",
                  whiteSpace: "nowrap",
                }}
              >
                Rotate the wheel
              </p>
            </>
          )} */}
        </div>
      </div>
    </div>
  );
};

export default Terrea;
