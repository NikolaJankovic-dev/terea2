import React, { useState, useEffect, useRef } from "react";
import terreaBg from "../assets/images/terreaBg.webp";
import Correct from "../components/Correct";
import Incorrect from "../components/Incorrect";
import Left from "../components/Left";
import Right from "../components/Right";
import Wheel from "../components/Wheel";
import on from "../assets/images/sound/on.webp";
import off from "../assets/images/sound/off.webp";
import { Box, Fab, Typography } from "@mui/material";
import {
  ArrowDownward,
  ArrowUpward,
  Key,
  KeyboardArrowDown,
  KeyboardArrowRight,
  KeyboardArrowUp,
} from "@mui/icons-material";
import heets from "../assets/images/names/heets.png";
import terea from "../assets/images/names/terea.png";

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
    "#6A6584",
    "#6A6584",
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
    "#AE681B",
    "#8C5F33",
    "#77A01B",
    "#C69500",
    "#1F8E92",
    "#603E5C",
    "#872323",
    "#BCBFBE",
    "#6A6584",
    "#A76846",
  ];

  const [leftText, setLeftText] = useState(names[0]);

  const [rightText, setRightText] = useState(namesForRight[0]);

  const [index, setIndex] = useState(0);

  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    setLeftText(names[phase]);
  }, [phase]);

  useEffect(() => {
    setRightText(namesForRight[index]);
  }, [index]);

  const straightPacks = [0, 9, 22, 34, 47, 57, 69, 83, 97, 109];

  const [direction, setDirection] = useState(1);
  const [debounceTimer, setDebounceTimer] = useState(null);
  const [animationTimer, setAnimationTimer] = useState(null);

  const [animationInProgress, setAnimationInProgress] = useState(false);

  const handleIncrement = () => {
    if (animationInProgress) return;
    setAnimationInProgress(true);
    clearTimeout(debounceTimer);
    if (index === straightPacks.length - 1) {
      setIndex(0);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
    setDirection(
      (straightPacks[(index + 1) % straightPacks.length] - right + 118) % 118 <=
        59
        ? 1
        : -1
    );
    const timer = setTimeout(() => {
      check();
    }, 2000);
    const timer2 = setTimeout(() => {
      setAnimationInProgress(false);
    }, 800);
    setDebounceTimer(timer);
    setAnimationTimer(timer2);
  };

  const handleDecrement = () => {
    if (animationInProgress) return;
    setAnimationInProgress(true);
    clearTimeout(debounceTimer);
    if (index === 0) {
      setIndex(straightPacks.length - 1);
    } else {
      setIndex((prevIndex) => prevIndex - 1);
    }
    setDirection(
      (straightPacks[
        (index - 1 + straightPacks.length) % straightPacks.length
      ] -
        right +
        118) %
        118 <=
        59
        ? 1
        : -1
    );
    const timer = setTimeout(() => {
      check();
    }, 2000);
    const timer2 = setTimeout(() => {
      setAnimationInProgress(false);
    }, 800);
    setDebounceTimer(timer);
    setAnimationTimer(timer2);
  };

  const rightRef = useRef(right);
  const phaseRef = useRef(phase);

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

  // useEffect(() => {
  //   if (stopped) {
  //     check();
  //   }
  // }, [stopped]);

  const handleMouseUp = () => {
    check();
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

  return (
    <Box
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
      {/* <img
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
      /> */}
      <Box
        style={{
          position: "absolute",
          top: isLandscape ? "50%" : "10%",
          left: isLandscape ? "50%" : "0%",
          transform: isLandscape
            ? "translate(-50%, -50%)"
            : "translate(10vw, 1vw)",
          display: "flex",
          flexDirection: isLandscape ? "row" : "column",
          gap: "1vw",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: isLandscape ? "1vw" : "1.5vw",
            alignItems: "center",
          }}
        >
          <Box>
            <img
              src={heets}
              alt="heets"
              style={{ height: isLandscape ? "2.9vh" : "2vh" }}
            />
          </Box>
          <Box
            style={{
              width: isLandscape ? "12vw" : "30vw",
              paddingBlock: isLandscape ? "0.8vw" : "2vw",
              backgroundColor: colors[phase],
              borderRadius: "10px",
              fontSize: "1.5vw",
              boxShadow: " inset -1px 1px 10px 1px rgba(0,0,0,0.5)",
              textAlign: "center",
              color: "white",
              textShadow: "0 0 1px black",
              transition: "all 0.5s ease",
              fontWeight: "bold",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: isLandscape ? "1vw" : "auto",
              }}
            >
              {" "}
              {leftText}{" "}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Box />
          {isLandscape ? (
            <KeyboardArrowRight
              sx={{
                color: "#1BDAC1",
                fontSize: "3vw",
              }}
              // fontSize= "small"
            />
          ) : (
            <KeyboardArrowDown
              sx={{
                color: "#1BDAC1",
                fontSize: "14vw",
              }}
              // fontSize="large"
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: isLandscape ? "1vw" : "1.5vw",
            alignItems: "center",
          }}
        >
          <Box>
            <img
              src={terea}
              alt="terea"
              style={{ height: isLandscape ? "3vh" : "2vh" }}
            />
          </Box>
          <Box
            sx={{
              width: isLandscape ? "12vw" : "30vw",
              paddingBlock: isLandscape ? "0.8vw" : "2vw",
              backgroundColor: colorsForRight[index],
              borderRadius: "10px",
              fontSize: "1.5vw",
              boxShadow: " inset -1px 1px 10px 1px rgba(0,0,0,0.5)",
              textAlign: "center",
              color: "white",
              textShadow: "0 0 1px black",
              transition: "all 0.5s ease",
              fontWeight: "bold",
            }}
          >
            <Typography
              sx={{
                color: "white",
                fontWeight: "bold",
                fontSize: isLandscape ? "1vw" : "auto",
              }}
            >
              {rightText}
            </Typography>
            {/* {rightText} */}
          </Box>
        </Box>
      </Box>
      <Box
        style={{
          position: "absolute",
          top: isLandscape ? "80%" : "58%",
          left: isLandscape ? "50%" : "70%",
          transform: isLandscape
            ? "translate(-50%, -50%)"
            : "translate(5vw, 10vw)",
          display: "flex",
          flexFlow: "column",
          gap: isLandscape ? "2vw" : "8vw",
          zIndex: 100,
        }}
      >
        <Fab
          sx={{
            color: "white",
            backgroundColor: "#1BDAC1",
            "&:focus": {
              backgroundColor: "#1BDAC1",
            },
            "&:hover": {
              backgroundColor: "#1BDAC199",
            },
            height: isLandscape ? "4vw" : "14vw",
            width: isLandscape ? "4vw" : "14vw",
          }}
          onPointerDown={handleIncrement}
          size="large"
        >
          <KeyboardArrowUp
            sx={{
              fontSize: isLandscape ? "3vw" : "12vw",
            }}
          />
        </Fab>
        <Fab
          onPointerDown={handleDecrement}
          sx={{
            color: "white",
            backgroundColor: "#1BDAC1",
            "&:focus": {
              backgroundColor: "#1BDAC1",
            },
            "&:hover": {
              backgroundColor: "#1BDAC199",
            },
            height: isLandscape ? "4vw" : "14vw",
            width: isLandscape ? "4vw" : "14vw",
          }}
        >
          <KeyboardArrowDown
            sx={{
              fontSize: isLandscape ? "3vw" : "12vw",
            }}
          />
        </Fab>
      </Box>
      {correct > 0 && (
        <Correct
          correct={correct}
          setCorrect={setCorrect}
          isLandscape={isLandscape}
        />
      )}
      {incorrect > 0 && (
        <Incorrect
          incorrect={incorrect}
          setIncorrect={setIncorrect}
          check={check}
          isLandscape={isLandscape}
        />
      )}
      <Left
        left={left}
        isLandscape={isLandscape}
        setLeftImagesLoaded={setLeftImagesLoaded}
      />
      <Right
        right={right}
        setRight={setRight}
        isLandscape={isLandscape}
        handleTouchStart={handleTouchStart}
        handleTouchMove={handleTouchMove}
        setRightImagesLoaded={setRightImagesLoaded}
        handleTouchEnd={() => {
          check();
        }}
        touchEnd={touchEnd}
        setTouchEnd={setTouchEnd}
        tapped={tapped}
        index={index}
        direction={direction}
      />
    </Box>
  );
};

export default Terrea;
