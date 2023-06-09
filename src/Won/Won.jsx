import React, { useState, useEffect } from "react";
import packs from "../assets/images/won/packs.png";
import circleBg from "../assets/images/won/shape.png";
import { Box, Button, Fade, Typography } from "@mui/material";
import { useDebouncedState } from "@mantine/hooks";

const Won = ({ isLandscape, won }) => {
  const [phase, setPhase] = useDebouncedState(0);
  // const [scale, setScale] = useState(0)

  useEffect(() => {
    if (won && phase === 0) {
      setPhase(1);
    }
    if (phase === 1) {
      setPhase(2);
    }
  }, [won, setPhase]);

  return (
    <Fade in={phase > 0} timeout={1000} appear={true}>
      <Box
        style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          height: "100%",
          zIndex: "100",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          flexDirection: isLandscape ? "row" : "column-reverse",
          backgroundColor: "rgba(25,204,186,1)",
          // transform: `scale(${phase === 1 ? 1 : 0})`,
          // borderRadius: phase === 1 ? "0" : "20%",
          // transition: "all 2s ease",
        }}
      >
        <Box
          style={{
            width: "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            // gap: "0.1rem",
          }}
        >
          <Typography
            style={{
              fontSize: "5vh",
            }}
          >
            Čestitamo!
          </Typography>
          <Typography
            style={{
              fontSize: "2.5vh",
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            Osvojili ste 200 bodova.
          </Typography>
          <a href="https://hr.pmiopen.com/s/terea-points" target="_blank">
            <Button
              style={{
                fontSize: "2vh",
                padding: "1rem 3rem",
                borderRadius: "2.5rem",
                marginTop: "4rem",
                backgroundColor: "rgb(51, 47, 60)",
                color: "white",
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              PREUZMI BODOVE
            </Button>
          </a>
        </Box>
        <Box
          style={{
            width: isLandscape ? "50%" : "100%",
            height: isLandscape ? "100%" : "50%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
          }}
        >
          <img
            src={packs}
            alt="packs"
            style={{
              // position: "absolute",
              // top: "0",
              // left: "0",
              // width: "100%",
              height: "78%",
              rotate: `${phase === 2 ? -360 : -90}deg`,
              transform: `scale(${phase === 2 ? 1 : 0})`,
              transition: "all 3s ease",
            }}
          />
          <img
            src={circleBg}
            alt="circleBg"
            style={{
              position: "absolute",
              bottom: "50%",
              left: "50%",
              transform: isLandscape
                ? "translate(-50%, 50%)"
                : "translate(-50%, 70%)",
              width: isLandscape ? "90%" : "80%",
              // =height: "100%",
              userSelect: "none",
              zIndex: "-1",
            }}
          />
        </Box>
      </Box>
    </Fade>
  );
};

export default Won;
