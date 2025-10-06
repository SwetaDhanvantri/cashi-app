import React from "react";
import { Box, Typography, CircularProgress } from "@mui/material";

const GradientLoader = ({ text = "Creating Coupon" }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(255,255,255,0.8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        zIndex: 2000,
      }}
    >
      {/* Gradient definition */}
      <svg width="0" height="0">
        <defs>
          <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C6FF" />
            <stop offset="50%" stopColor="#0072FF" />
            <stop offset="100%" stopColor="#FF00CC" />
          </linearGradient>
        </defs>
      </svg>

      {/* Spinner */}
      <CircularProgress
        size={50}
        thickness={5}
        sx={{
          "& .MuiCircularProgress-circle": {
            stroke: "url(#rainbowGradient)",
          },
        }}
      />

      {/* Animated Text */}
      <Box
        sx={{
          mt: 2,
          display: "flex",
          alignItems: "center",
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        {/* Gradient Text */}
        <Typography
          variant="h6"
          sx={{
           color:'#000000',
            fontWeight: "bold",
          }}
        >
          {text}
        </Typography>

        {/* Dots (separate so they stay visible) */}
        <span className="dot">.</span>
        <span className="dot">.</span>
        <span className="dot">.</span>
      </Box>

      {/* Keyframes for wave dots */}
      <style>
        {`
          .dot {
            animation: wave 1.5s infinite;
            font-weight: bold;
            font-size: 1.5rem;
            margin-left: 2px;
            color: #000000;
          }
          .dot:nth-of-type(2) {
            animation-delay: 0.2s;
          }
          .dot:nth-of-type(3) {
            animation-delay: 0.4s;
          }

          @keyframes wave {
            0%, 60%, 100% {
              opacity: 0;
              transform: translateY(0);
            }
            30% {
              opacity: 1;
              transform: translateY(-5px);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default GradientLoader;
