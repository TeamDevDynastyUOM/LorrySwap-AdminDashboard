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
import Profile from "../profile";

const Driver = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [drivers, setDrivers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/driver_details`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("Fetched drivers data:", data); // Log the fetched data
        setDrivers(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    

    fetchDrivers();
  }, []);

  const columns = [
    { field: "id", headerName: "Driver ID" },
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
    // {
    //   field: "email",
    //   headerName: "Gender",
    //   flex: 1,
    //   cellClassName: "name-column--cell",
    // },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "nic", headerName: "NIC", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
  
    {
      field: "varified",
      headerName: "Profile Status",
      flex: 1,
      renderCell: ({ row: { varified } }) => {
        // function for get success icon
        const getAccessIcon = (varified) => {
          switch (varified) {
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
          varified === 1
            ? colors.greenAccent[600]
            : varified === 2
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
            {getAccessIcon(varified)}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {varified === 1
                ? "Verified"
                : varified === 2
                ? "Pending"
                : "Cancelled"}
            </Typography>
          </Box>
        );
      },
    },
    {
      field: "view_profile",
      headerName: "View Profile",
      flex: 1,
      renderCell: (params) => {
        const handleViewProfile = (id) => {
          // Function to handle view profile action
          console.log(`View profile for driver ID: ${id}`);
          navigate(`/profile/${id}`);
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
    <Box m="20px" marginLeft="18%">
      <Header title="Drivers" subtitle="Managing Drivers" />
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
        <DataGrid checkboxSelection rows={drivers} columns={columns} />
      </Box>
    </Box>
  );
};

export default Driver;
