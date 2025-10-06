import React, { useState } from "react";
import { Dialog, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function ImagePreview({ src }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Thumbnail */}
      <img
        src={src}
        alt="offer"
        style={{
          width: "100%",
          maxHeight: "250px",
          objectFit: "contain",
          borderRadius: 8,
          cursor: "pointer",
        }}
        onClick={() => setOpen(true)}
      />

      {/* Fullscreen Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
         <IconButton
          onClick={() => setOpen(false)}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: "white",
            backgroundColor: "rgba(0,0,0,0.5)",
            "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
          }}
        >
          <Close />
        </IconButton>
        <img
          src={src}
          alt="offer-full"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </Dialog>
    </>
  );
}
