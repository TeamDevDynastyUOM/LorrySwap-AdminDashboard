import React, { useEffect, useState } from "react";
import { Box,Typography, useTheme,  Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Person4RoundedIcon from '@mui/icons-material/Person4Rounded';
import ToggleOnOutlinedIcon from '@mui/icons-material/ToggleOnOutlined';
import ToggleOffOutlinedIcon from '@mui/icons-material/ToggleOffOutlined';

const CargoFinder = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [cargoFinders, setCargoFinders] = useState([]);


  useEffect(() => {
    const fetchCargoFinders = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/cargo_finders`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("Fetched drivers data:", data); // Log the fetched data
        setCargoFinders(data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchCargoFinders();
  }, []);

  const columns = [

    { field: "id", headerName: "Cargo Finder ID" },
    {
      field: "fname",
      headerName: "First Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "lname",
      headerName: "Last Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    

    {
      field: "view_profile",
      headerName: "View Profile",
      flex: 1,
      renderCell: (params) => {
        const handleViewProfile = (id) => {
          // Function to handle view profile action
          console.log(`View profile for driver ID: ${id}`);
          navigate(`/cargoFinderProfile/${id}`);
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
              onClick={() => handleViewProfile(params.row.id)}
              sx={{
                color: colors.grey[100], 
                
              }}
            >
              <Person4RoundedIcon sx={{color:colors.greenAccent[500]}}/>
              View Profile
            </Button>
          </Box>
        );
      },
    },

  ];

  return (
    <Box m="20px"marginLeft="18%">
      <Header
        title="Cargo Finder"
        subtitle="List of Cargo Finder"
      />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={cargoFinders}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default CargoFinder;
