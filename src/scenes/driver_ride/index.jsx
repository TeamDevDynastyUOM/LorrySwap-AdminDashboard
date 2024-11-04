import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
// import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
// import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
// import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
// import Person4TwoToneIcon from "@mui/icons-material/Person4TwoTone";
import Person4RoundedIcon from '@mui/icons-material/Person4Rounded';
// import Profile from "../profile";
import Lottie from "lottie-react";
import { Player } from '@lottiefiles/react-lottie-player';
import Pending from '../../animation/Pending.json'


const DriverRide = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [driverRide, setDriverRide] = useState([]);
  const navigate = useNavigate();
  const [remainingTimes, setRemainingTimes] = useState({});

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/admin/driver_ride`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("Fetched drivers data:", data); // Log the fetched data
        setDriverRide(data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, []);

  const calculateRemainingTime = (rideDate) => {
    const currentTime = new Date();
    const rideTime = new Date(rideDate);
    const difference = rideTime - currentTime;

    if (difference <= 0) {
      return { timeString: "Time's up", hoursRemaining: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / 1000 / 60) % 60);
    const seconds = Math.floor((difference / 1000) % 60);
    const hoursRemaining = Math.floor(difference / (1000 * 60 * 60));

    return { timeString: `${days}d ${hours}h ${minutes}m ${seconds}s`, hoursRemaining };
  };

//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       const newRemainingTimes = cargoRides.reduce((acc, ride) => {
//         const { timeString, hoursRemaining } = calculateRemainingTime(ride.date);
//         acc[ride.id] = { timeString, hoursRemaining };
//         return acc;
//       }, {});
//       setRemainingTimes(newRemainingTimes);
//     }, 1000);

//     return () => clearInterval(intervalId);
//   }, [cargoRides]);


  const columns = [
    { field: "id", headerName: "Ride ID",minWidth: 100 },
    {
      field: "user_id",
      headerName: "Driver ID",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 150
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 150
    },
    
    {
      field: "destination",
      headerName: "Destination",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 150
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 150
    },
    {
      field: "time",
      headerName: "Date",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 150
    },

    {
      field: "finished_ride",
      headerName: "Finish Status",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 150,
      renderCell: (params) => {
        console.log("Finished Ride Value:", params.value); // Debugging line
        console.log("Params:", params); // Debugging line

        let statusText;
        let statusColor;
    
        switch (params.value) {
          case 0:
            statusText = "In Progress";
            statusColor = "red";
            break;
          case 1:
            statusText = "Finished";
            statusColor = "green";
            break;
          case 2:
            statusText = "Ride Started";
            statusColor = "blue";
            break;
          default:
            statusText = "Unknown";
            statusColor = "grey";
        }
    
        return (
          <Typography style={{ color: statusColor }}>
            {statusText}
          </Typography>
        );
      }
    },
  ];

  return (
    <Box m="20px" marginLeft="18%">
      <Header title="Drivers Ride" subtitle="Managing all Driver Ride" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        width="100%"
        sx={{
          overflowX:"auto",

          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={driverRide} columns={columns} />
      </Box>
    </Box>
  );
};

export default DriverRide;
