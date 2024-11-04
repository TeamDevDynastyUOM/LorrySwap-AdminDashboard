import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, useTheme, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import Header from "../../components/Header";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";



const CargoRidesHistory = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [cargoRides, setCargoRides] = useState([]);
  const navigate = useNavigate();



  const columns = [
    { field: "id", headerName: "Cargo Ride ID",minWidth: 100 },
    { field: "user_id", headerName: "Cargo Finder ID", flex: 1, cellClassName: "name-column--cell", minWidth: 150 },
    {
      field: "driver_id",
      headerName: "Driver ID",
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
      field: "cost",
      headerName: "Cost",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 100
    },
    {
      field: "status",
      headerName: "Finished Status",
      flex: 1,
      cellClassName: "name-column--cell",
      minWidth: 100,
      renderCell: ({ row: { status } }) => {
        // function for get success icon
        const getAccessIcon = (status) => {
          switch (status) {
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
        status === 1
            ? colors.greenAccent[600]
            : status === 2
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
            {getAccessIcon(status)}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {status === 1
                ? "Finish"
                : status === 2
                ? "Pending"
                : "Cancelled"}
            </Typography>
          </Box>
        );
      },
      
    },

    
  
  
    
  ];

  useEffect(() => {
    const fetchCargoRides = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/admin/finished_cargo_ride_details`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch cargo rides");
        }
  
        const cargoRidesData = await response.json();
        console.log("Fetched cargo rides data:", cargoRidesData);
        setCargoRides(cargoRidesData);
      } catch (error) {
        console.error("Error fetching cargo rides:", error);
        // Handle error (e.g., show error message to user)
      }
    };
  
    fetchCargoRides();
  }, []);
  



  return (
    <Box m="20px" marginLeft="18%">
      <Header title="Finished Cargo Rides" subtitle="Managing finished cargo rides" />
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

export default CargoRidesHistory;
