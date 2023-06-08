import React, { useEffect } from "react";
import { Box, Button, Fade, Typography } from "@mui/material";
import { useDebouncedState } from "@mantine/hooks";
import shape from "../../assets/images/firstscreen/shape.png";
import packs from "../../assets/images/firstscreen/packs.png";
import packsBig from "../../assets/images/firstscreen/packsBig.png";

const FirstScreen = ({ isLandscape, setAppPhase }) => {
  const [phase, setPhase] = useDebouncedState(0, 1000);

  useEffect(() => {
    if (phase === 0) {
      setPhase(1);
    }
    if (phase === 1) {
      setPhase(2);
    }
    if (phase === 2) {
      setPhase(3);
    }
  }, [phase, setPhase]);

  const handleBtn = () => {
    setPhase(4);
    setInterval(() => {
      setAppPhase(2);
    }, 1000);
  };

  return (
    <Fade in={phase < 4} timeout={1000} appear={false}>
      {isLandscape ? (
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
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Fade in={phase > 0} timeout={1000} appear={false}>
            <Box sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "space-between",
                width: "100%",

            }}>
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "5vh",
                width: "50%",
            }}>
              <Box>
                <Typography
                  variant={isLandscape ? "h1" : "h3"}
                  sx={{
                    color: "white",
                    textAlign: "center",
                    fontSize: "7vw",
                    fontWeight: "normal",
                    fontFamily: " IQOS-Light, sans-serif",
                  }}
                >
                  TEREA
                </Typography>
                <Typography
                  variant={isLandscape ? "h1" : "h3"}
                  sx={{
                    color: "white",
                    textAlign: "center",
                    fontSize: "3vw",
                    fontWeight: "400",
                  }}
                >
                  GAME
                </Typography>
              </Box>
              <Button
                variant="contained"
                onClick={handleBtn}
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
                <Typography variant="h6" sx={{ color: "white" }}>
                  Započni
                </Typography>
              </Button>
            </Box>
            <Box
            sx={{
                backgroundImage: `url(${shape})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
                // height: "100vh",
            }}
            >
                <img src={packsBig} alt="shape" style={{ height: "100vh" }} />
            </Box>
            </Box>
          </Fade>
        </Box>
      ) : (
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
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <Fade in={phase > 0} timeout={1000} appear={false}>
            <Box>
              <Typography
                variant={isLandscape ? "h1" : "h3"}
                sx={{
                  color: "white",
                  textAlign: "center",
                  fontSize: "20vw",
                  fontWeight: "normal",
                  fontFamily: " IQOS-Light, sans-serif",
                }}
              >
                TEREA
              </Typography>
              <Typography
                variant={isLandscape ? "h1" : "h3"}
                sx={{
                  color: "white",
                  textAlign: "center",
                  fontSize: "7vw",
                  fontWeight: "400",
                }}
              >
                GAME
              </Typography>
            </Box>
          </Fade>
          <Fade in={phase > 1} timeout={1000} appear={false}>
            <Box
              sx={{
                //   display: "flex",
                //   justifyContent: "space-evenly",
                // //   flexDirection: isLandscape ? "row" : "column",
                //   alignItems: "center",
                //   gap: "20px",
                width: "100vw",
                // mt: "10vh",
                backgroundImage: `url(${shape})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
              }}
            >
              <img src={packs} alt="shape" style={{ width: "100%" }} />
            </Box>
          </Fade>
          <Fade in={phase > 2} timeout={1000} appear={false}>
            <Button
              variant="contained"
              onClick={handleBtn}
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
              <Typography variant="h6" sx={{ color: "white" }}>
                Započni
              </Typography>
            </Button>
          </Fade>
        </Box>
      )}
    </Fade>
  );
};

export default FirstScreen;
