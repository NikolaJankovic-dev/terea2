import React, { useState, useEffect } from "react";
import "./App.css";
import Terrea from "./Terrea/Terrea";
import HowTo from "./HowTo/HowTo";
import Won from "./Won/Won";
import HowToPlay from "./HowToPlay/HowToPlay";
import { Box, createTheme, IconButton, ThemeProvider } from "@mui/material";
import FirstScreen from "./components/FirstScreen/FirstScreen";
// import { Fullscreen, FullscreenExit } from "@mui/icons-material";

function App() {
  const [isLandscape, setIsLandscape] = useState(
    window.innerWidth > window.innerHeight
  );
  const [appPhase, setAppPhase] = useState(0);
  const [won, setWon] = useState(false);
  const [leftImagesLoaded, setLeftImagesLoaded] = useState(false);
  const [rightImagesLoaded, setRightImagesLoaded] = useState(false);
  const [restart, setRestart] = useState(false);
  // const [fullScreen, setFullScreen] = useState(false);

  useEffect(() => {
    if (leftImagesLoaded && rightImagesLoaded) {
      setAppPhase(1);
    }
  }, [leftImagesLoaded, rightImagesLoaded]);
  useEffect(() => {
    const handleResize = () => {
      setIsLandscape(window.innerWidth > window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const preventDefaultTouchmove = (event) => event.preventDefault();

    window.addEventListener("touchmove", preventDefaultTouchmove, {
      passive: false,
    });

    // Cleanup function
    return () => {
      window.removeEventListener("touchmove", preventDefaultTouchmove);
    };
  }, []);

  // useEffect(() => {
  //   if (fullScreen) {
  //     document.documentElement.requestFullscreen();
  //   } else {
  //     document.exitFullscreen();
  //   }
  // }, [fullScreen]);

  const theme = createTheme({
    typography: {
      fontFamily: "IQOS-Regular, IQOS-Light, sans-serif",
    },
  });

  return (
    <div
      className="App"
      style={{
        // height: window.innerHeight,
        overflow: "hidden",
      }}
    >
      <ThemeProvider theme={theme}>
        <Terrea
          isLandscape={isLandscape}
          setWon={setWon}
          setLeftImagesLoaded={setLeftImagesLoaded}
          setRightImagesLoaded={setRightImagesLoaded}
          restart={restart}
          setRestart={setRestart}
        />
        <HowToPlay isLandscape={isLandscape} appPhase={appPhase} />
        <FirstScreen isLandscape={isLandscape} setAppPhase={setAppPhase} />
        {/* {appPhase !== 5 && (
        <HowTo
          isLandscape={isLandscape}
          appPhase={appPhase}
          setAppPhase={setAppPhase}
          setLeftImagesLoaded={setLeftImagesLoaded}
          setRightImagesLoaded={setRightImagesLoaded}
        />
      )} */}
        <Won
          isLandscape={isLandscape}
          won={won}
          setWon={setWon}
          setRestart={setRestart}
          restart={restart}
        />
      </ThemeProvider>
      {/* <IconButton
        sx={{
          position: "fixed",
          zIndex: 1000,
          bottom: 10,
          right: 10,
        }}
        onClick={() => {
          setFullScreen(!fullScreen);
        }}
      >
        {fullScreen ? <FullscreenExit /> : <Fullscreen />}
      </IconButton> */}
    </div>
  );
}

export default App;
