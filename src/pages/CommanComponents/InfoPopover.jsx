import * as React from 'react';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import { Info } from '@mui/icons-material';
import { Box, Typography, Button } from '@mui/material';

const InfoPopover = ({ title, description }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'info-popover' : undefined;

  return (
    <div>
      <IconButton onClick={handleClick}>
        <Info sx={{ fontSize: 20, ml: 1, alignSelf: 'center', color: '#878787ff' }} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, maxWidth: 250 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            {description}
          </Typography>
          <Box display="flex" justifyContent="flex-end" gap={2}>
            <Button size="small" onClick={handleClose}>Cancel</Button>
            <Button size="small" variant="contained" onClick={handleClose}>
              Ok
            </Button>
          </Box>
        </Box>
      </Popover>
    </div>
  );
};

export default InfoPopover;
