import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
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


const CargoRide = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [cargoRides, setCargoRides] = useState([]);
  const navigate = useNavigate();
  const [remainingTimes, setRemainingTimes] = useState({});

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/admin/cargo_ride_details`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("Fetched drivers data:", data); // Log the fetched data
        setCargoRides(data);
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

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newRemainingTimes = cargoRides.reduce((acc, ride) => {
        const { timeString, hoursRemaining } = calculateRemainingTime(ride.date);
        acc[ride.id] = { timeString, hoursRemaining };
        return acc;
      }, {});
      setRemainingTimes(newRemainingTimes);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [cargoRides]);


  const columns = [
    { field: "id", headerName: "Cargo Ride ID",minWidth: 100 },
    {
      field: "user_id",
      headerName: "Cargo Finder ID",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 150
    },
    {
      field: "date",
      headerName: "Ride Date",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 150
    },
    {
      field: "remaining_time",
      headerName: "Remaining Time",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => {
        if (params.row.driver_confirmation) {
          return (
            <Typography style={{ color: 'green' }}>
              Confirmed
            </Typography>
          );
        }
        const { timeString, hoursRemaining } = remainingTimes[params.row.id] || {};
        return (
          <Typography
            style={{
              color: hoursRemaining <= 12 ? 'orange' : 'inherit',
            }}
          >
            {timeString}
          </Typography>
        );
      }
    },
    {
      field: "package_type",
      headerName: "Package Type",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 150
    },
    {
      field: "weight",
      headerName: "Weight Kg",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 150
    },
    {
      field: "height",
      headerName: "Height",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 150
    },
    {
      field: "length",
      headerName: "Length",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 150
    },
    {
      field: "width",
      headerName: "Width",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 150
    },
    {
      field: "truck_type",
      headerName: "Truck Type",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 150
    },
    {
      field: "location",
      headerName: "Start Location",
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
      field: "special_request",
      headerName: "Special Request",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 150,
      renderCell: ({ value }) => {
        return (
          <Typography>
            {value === false ? "Yes" : value === true ? "No" : ""}
          </Typography>
        );
      },
    },
    { field: "driver_confirmation", 
      headerName: "Driver Confirmation", 
      flex: 1,
      minWidth: 100,

      renderCell: (params) => (
        params.value === false ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height:'100%'}}>
            <Player
              autoplay
              loop
              src={Pending}
              style={{ height: '180px', width: '180px' }}
            />

          </Box>
         
        ) : (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height:'100%'}}>
            <HowToRegOutlinedIcon style={{ color: 'green',justifyContent: 'center', alignItems: 'center', width: '60%', height:'60%' }} />
          </Box>
        )
      )
     },
    
    // {
    //   field: "driver_rejection",
    //   headerName: "Driver Rejection",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    //   minWidth: 150,
    //   renderCell: ({ value }) => {
    //     return (
    //       <Typography>
    //         {value === false ? "No" : value === true ? "Yes" : ""}
    //       </Typography>
    //     );
    //   },
    // },

    // {
    //   field: "cf_confirmation",
    //   headerName: "CF Rejection",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    //   minWidth: 150,
    //   renderCell: ({ value }) => {
    //     return (
    //       <Typography>
    //         {value === false ? "Yes" : value === true ? "No" : ""}
    //       </Typography>
    //     );
    //   },
    // },
    {
      field: "cf_rejection",
      headerName: "CF Confirmation",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 150,
      renderCell: ({ value }) => {
        return (
          <Typography>
            {value === false ? "Yes" : value === true ? "No" : ""}
          </Typography>
        );
      },
    },
    {
      field: "finish_status",
      headerName: "Finish Status",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 150,
      renderCell: ({ row: { finish_status } }) => {
        // function for get success icon
        const getAccessIcon = (finish_status) => {
          switch (finish_status) {
            case 1:
              return <HowToRegOutlinedIcon />;
            case 2:
              return <PendingOutlinedIcon />;
            case 0:
              return <CancelOutlinedIcon />;
            default:
              return null;
          }
        };

        const backgroundColor =
        finish_status === 1
            ? colors.greenAccent[600]
            : finish_status === 0
            ? colors.blueAccent[700]
            : colors.redAccent[500];

        return (
          <Box
            width="90%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={backgroundColor}
            borderRadius="4px"
          >
            {getAccessIcon(finish_status)}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {finish_status === 1
                ? "Finish"
                : finish_status === 0
                ? "Ongoing"
                : "Cancelled"}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px" marginLeft="18%">
      <Header title="Cargo Ride" subtitle="Manage Catgo Ride" />
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
        <DataGrid checkboxSelection rows={cargoRides} columns={columns} />
      </Box>
    </Box>
  );
};

export default CargoRide;
