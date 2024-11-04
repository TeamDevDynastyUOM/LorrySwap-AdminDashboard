import React, { useEffect, useState } from "react";
import { Box,Typography, useTheme,  Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import StarPurple500SharpIcon from '@mui/icons-material/StarPurple500Sharp';



const FeedBack = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/admin/reviews`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("Fetched drivers data:", data);
        setReviews(data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchReviews();
  }, []);

  const columns = [

    { field: "id", headerName: "Review ID" },
    { field: "ride_id", headerName: "Ride ID" },
    {
      field: "sender",
      headerName: "Sender ID",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "receiver",
      headerName: "Reciever ID",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      headerAlign: "left",
      align: "left",
      flex: 1.2,
      renderCell: (params) => (
        <Box display="flex" alignItems="center">
          {Array.from({ length: 5 }, (_, index) => (
            <StarPurple500SharpIcon 
              key={index} 
              style={{ color: index < params.value ? '#FFD700' : '#e0e0e0' }} 
            />
          ))}
        </Box>
      ),
    },
    {
      field: "title",
      headerName: "Title",
      flex: 1,
    },
    {
      field: "comment",
      headerName: "Comment",
      flex: 2,
    },
    {
        field: "date",
        headerName: "Date",
        flex: 1,
    },
    
    
  ];

  return (
    <Box m="20px" marginLeft="18%">
      <Header
        title="FeedBack"
        subtitle="List of Feed Back"
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
          rows={reviews}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default FeedBack;
