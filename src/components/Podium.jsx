import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

const width = 100;
const height = 100;
const Podium = ({ topUsers }) => {
  const firstPlace = topUsers[0];
  const secondPlace = topUsers[1];
  const thirdPlace = topUsers[2];
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="flex-end"
      bgcolor="linear-gradient(to bottom, #222, #555)"
      gap={2}
    >
      {secondPlace && (
        <Box
          width={width}
          height={height + 25}
          bgcolor="silver"
          textAlign="center"
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          color="white"
          borderRadius="10px 10px 0 0"
          padding={2}
        >
          <Avatar alt={secondPlace.name} src={secondPlace.picture} />
          <Typography variant="body1" fontWeight="bold">
            {secondPlace.name}
          </Typography>
          <Typography variant="body2">{`${secondPlace.score}`}</Typography>
        </Box>
      )}
      {firstPlace && (
        <Box
          width={width}
          height={height + 50}
          bgcolor="gold"
          textAlign="center"
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          color="white"
          borderRadius="10px 10px 0 0"
          padding={2}
        >
          <Avatar alt={firstPlace.name} src={firstPlace.picture} />
          <Typography variant="body1" fontWeight="bold">
            {firstPlace.name}
          </Typography>
          <Typography variant="body2">{firstPlace.score}</Typography>
        </Box>
      )}
      {thirdPlace && (
        <Box
          width={width}
          height={height}
          bgcolor="#cd7f32"
          textAlign="center"
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          color="white"
          borderRadius="10px 10px 0 0"
          padding={2}
        >
          <Avatar alt={thirdPlace.name} src={thirdPlace.picture} />
          <Typography variant="body1" fontWeight="bold">
            {thirdPlace.name}
          </Typography>
          <Typography variant="body2">{thirdPlace.score}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Podium;
