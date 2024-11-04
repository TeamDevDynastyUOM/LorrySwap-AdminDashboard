
import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { tokens } from '../../theme';

const Footer = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        backgroundColor: colors.primary[700],
        color: colors.grey[100],
        p: 2,
        mt: 'auto',
        textAlign: 'center',
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
      }}
    >
      <Typography variant="body2">
        © {new Date().getFullYear()} LorrySwap. All rights reserved.
      </Typography>
      <Typography variant="body2">
        Developed by LorrySwap
      </Typography>
    </Box>
  );
};

export default Footer;
