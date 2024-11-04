import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, useTheme, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import Person4RoundedIcon from '@mui/icons-material/Person4Rounded';
import Profile from "../profile";

const Vehicle = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [vehicles, setVehicles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/admin/get_pending_vehicles`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("Fetched drivers data:", data); // Log the fetched data
        setVehicles(data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };
    fetchDrivers();
  }, []);


  const verifyVehicle = async (vehicleId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/admin/confirm_vehicle/${vehicleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Vehicle verified successfully");
        // Update the vehicle list or re-fetch the vehicles
        setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId));
      } else {
        console.error("Failed to verify vehicle");
      }
    } catch (error) {
      console.error("Error verifying vehicle:", error);
    }
  };

  const rejectVehicle = async (vehicleId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/admin/reject_vehicle/${vehicleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Vehicle rejected successfully");
        // Update the vehicle list or re-fetch the vehicles
        setVehicles(vehicles.filter(vehicle => vehicle.id !== vehicleId));
      } else {
        console.error("Failed to reject vehicle");
      }
    } catch (error) {
      console.error("Error rejecting vehicle:", error);
    }
  };

  const columns = [
    { field: "vehicleNo", headerName: "Vehicle No" },
    {
      field: "brand",
      headerName: "Brand",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "model",
      headerName: "Model",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "type",
      headerName: "Type",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "length",
      headerName: "Length",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "width", headerName: "Width", flex: 1 },
    { field: "height", headerName: "Height", flex: 1 },
    { field: "tonnage", headerName: "Tonnage", flex: 1 },

    
    {
      field: "verify vehicle",
      headerName: "Verify Vehicle",
      flex: 1,
      renderCell: (params) => {
        const handleViewProfile = (vehicleNo) => {
          // Function to handle view profile action
          console.log(`View profile for driver ID: ${vehicleNo}`);
          navigate(`/profile/${vehicleNo}`);
        };

        return (
          <Box
            height='30px'
            width="100%"
            m="0 auto"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.blueAccent[800]}
            borderRadius="4px">
            <Button 
              onClick={() => verifyVehicle(params.row.id)}
              sx={{
              color: colors.grey[100],
            }}
            >
              <Person4RoundedIcon sx={{color:colors.greenAccent[500]}}/>
              Verify Vehicle
            </Button>
          </Box>
        );
      },
    },
    {
      field: "reject vehicle",
      headerName: "Reject Vehicle",
      flex: 1,
      renderCell: (params) => {
        const handleViewProfile = (vehicleNo) => {
          // Function to handle view profile action
          console.log(`View profile for driver ID: ${vehicleNo}`);
          navigate(`/profile/${vehicleNo}`);
        };

        return (
          <Box
            height='30px'
            width="100%"
            m="0 auto"
            display="flex"
            justifyContent="center"
            backgroundColor={colors.blueAccent[800]}
            borderRadius="4px">
            <Button 
              onClick={() => rejectVehicle(params.row.id)}
              sx={{
              color: colors.grey[100],
              }}
            >
              <Person4RoundedIcon sx={{color:colors.greenAccent[500]}}/>
              Reject Vehicle
            </Button>
          </Box>
        );
      },
    },

    
  ];

  return (
    <Box m="20px" marginLeft="18%">
      <Header title="Vehicle" subtitle="Managing Vehicle" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
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
        <DataGrid checkboxSelection rows={vehicles} columns={columns} />
      </Box>
    </Box>
  );
};

export default Vehicle;

