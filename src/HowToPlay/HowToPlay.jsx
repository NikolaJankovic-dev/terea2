import { Box, Button, Fade, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDebouncedState } from "@mantine/hooks";
import howToPlay01 from "../assets/images/howtoplay/slo/01.png";
import howToPlay02 from "../assets/images/howtoplay/slo/02.png";
import howToPlay03 from "../assets/images/howtoplay/03.png";
import howToPlay01P from "../assets/images/howtoplay/01P.png";
import howToPlay02P from "../assets/images/howtoplay/02P.png";
import howToPlay03P from "../assets/images/howtoplay/03P.png";

const HowToPlay = ({ isLandscape, appPhase }) => {
  const [phase, setPhase] = useDebouncedState(0, 1000);

  useEffect(() => {
    if (appPhase === 2) {
      if (phase === 0) {
        setPhase(1);
      }
      if (phase === 1) {
        setPhase(2);
      }
      if (phase === 2) {
        setPhase(3);
      }
      if (phase === 3) {
        setPhase(4);
      }
      if (phase === 4) {
        setPhase(5);
      }
    }
  }, [phase, setPhase, appPhase]);
  return (
    <Fade in={phase < 6} timeout={1000} appear={false}>
      <Box
        sx={{
          position: "fixed",
          width: "100vw",
          height: "100vh",
          top: 0,
          //   left: 0,
          //   right: 0,
          //   bottom: 0,
          backgroundColor: "rgba(0, 206, 186, 1)",
          zIndex: 100,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Typography
          variant={isLandscape ? "h1" : "h3"}
          sx={{
            color: "white",
            textAlign: "center",
            fontSize: isLandscape ? "4vw" : "8vw",
          }}
        >
          Navodila:
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            flexDirection: isLandscape ? "row" : "column",
            alignItems: "space-between",
            gap: "20px",
            width: "100vw",
            // mt: "10vh",
          }}
        >
          <Fade in={phase > 1} timeout={1000}>
            <Box
              sx={{
                display: "flex",
                flexDirection: isLandscape ? "column" : "row",
                justifyContent: "space-between",
                alignItems: "center",
                // gap: "5vh",
                gap: isLandscape ? "2vw" : "0vh",
                width: !isLandscape ? "80vw" : "30vw",
                marginInline: "auto",
              }}
            >
              <Typography
                variant={isLandscape ? "h1" : "h3"}
                sx={{
                  color: "white",
                  textAlign: "center",
                  fontSize: isLandscape ? "1.9vw" : "4vw",
                  fontWeight: "normal",
                  fontFamily: " IQOS-Regular, sans-serif",
                }}
              >
                Povežite TEREA{!isLandscape && <br />} in HEETS različice.
              </Typography>
              <img
                src={isLandscape ? howToPlay01 : howToPlay01P}
                alt="how to play 01"
                style={{
                  maxWidth: isLandscape ? "30vw" : "50%",
                }}
              />
            </Box>
          </Fade>
          <Fade in={phase > 2} timeout={1000}>
            <Box
              sx={{
                display: "flex",
                flexDirection: isLandscape ? "column" : "row-reverse",
                justifyContent: "space-between",
                alignItems: "center",
                gap: isLandscape ? "2vw" : "0vh",

                width: !isLandscape ? "80vw" : "30vw",
                marginInline: "auto",
              }}
            >
              <Typography
                variant={isLandscape ? "h1" : "h3"}
                sx={{
                  color: "white",
                  textAlign: "center",
                  fontSize: isLandscape ? "1.9vw" : "4vw",
                  fontWeight: "normal",
                  fontFamily: " IQOS-Regular, sans-serif",
                }}
              >
                S puščicami{!isLandscape && <br />} izberite{isLandscape && <br />} ustrezno{!isLandscape && <br />} TEREA različico.
              </Typography>
              <img
                src={isLandscape ? howToPlay02 : howToPlay02P}
                alt="how to play 02"
                style={{
                  maxWidth: isLandscape ? "30vw" : "50%",
                }}
              />
            </Box>
          </Fade>
          <Fade in={phase > 3} timeout={1000}>
            <Box
              sx={{
                display: "flex",
                flexDirection: isLandscape ? "column" : "row",
                justifyContent: "space-evenly",
                alignItems: "center",
                gap: isLandscape ? "2vw" : "0vh",

                width: !isLandscape ? "80vw" : "30vw",
                marginInline: "auto",
              }}
            >
              <Typography
                variant={isLandscape ? "h1" : "h3"}
                sx={{
                  color: "white",
                  textAlign: "center",
                  fontSize: isLandscape ? "1.9vw" : "4vw",
                  fontWeight: "normal",
                  fontFamily: " IQOS-Regular, sans-serif",
                }}
              >
                {/* UPARI SVIH 10 TEREA OKUSA I OSVOJI 200 BODOVA */}
                {/* Povežite vseh 10 TEREA <br/> različic in osvojite 200 točk. */}
                Povežite vseh 10 TEREA <br /> različic in osvojite{" "}
                {!isLandscape && <br />} 150 točk.
              </Typography>
              <img
                src={isLandscape ? howToPlay03 : howToPlay03P}
                alt="how to play 03"
                style={{
                  maxWidth: isLandscape ? "30vw" : "50%",
                }}
              />
            </Box>
          </Fade>
        </Box>{" "}
        <Fade in={phase > 4} timeout={1000}>
          <Button
            variant="contained"
            onClick={() => setPhase(6)}
            sx={{
              backgroundColor: "rgba(51, 47, 60, 1)",
              mb: "10vh",
              padding: "10px 70px",
              borderRadius: "3rem",
              "&:hover": {
                backgroundColor: "rgba(51, 47, 60, 0.9)",
              },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "white",

                // fontSize: isLandscape ? "1.2vw" : "5vw",
              }}
            >
              ZAČNITE
            </Typography>
          </Button>
        </Fade>
      </Box>
    </Fade>
  );
};

export default HowToPlay;
