import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, Button, Paper, Divider, Grid } from "@mui/material";
import { tokens } from "../../theme";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { useParams, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import VerifiedUserSharpIcon from '@mui/icons-material/VerifiedUserSharp';


const CargoFinderProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const [recentLocations, setRecentLocations] = useState({
    location: "",
    destination: ""
  });

  const rejctButtonOnClick = () =>{
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false);
  };



  // const handleVerifiedEcSeller = async () =>{

  //   console.log(id)

  //   try {
        
  //     const userId = parseInt(id, 10);

  //     const response = await fetch(`http://127.0.0.1:8000/ec_seller/verfied/${userId}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ EC_seller_id: userId }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Network response was not ok ' + response.statusText);
  //     }

  //   //   fetchPendingUsers();

  //     // Handle successful verification here if needed
  //     console.log('User verified successfully');
  //     handleClose();  // Close the modal after successful verification
  //     setIsVerified(true);

  //   } catch (error) {
  //     console.error('Error verifying user:', error);
  //   }

    
  // }


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/admin/cargo_finder/${id}`,{
            method: "GET",
            headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log('fetch data:',data)
        setUserData(data);
      } catch (error) {
        console.error('Error fetching driver data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/get_location_destination_recent_ride/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log('Fetched data:', data);
        setRecentLocations(data);
      } catch (error) {
        console.error('Error fetching cargo finder data:', error);
      }
    };

    fetchUserData();
  }, [id]);
  



  return (
    <Box m="10px" sx={{ width: '100%', height: '100px', ml:'30%'}} >
        <Box
            m="0 0 0 0"
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
            <Box sx={{width:'60%'}}>
            
                <Paper sx={{ backgroundColor: colors.blueAccent[800], borderRadius: '16px', p: 2, mr:'7px' }}>
                    <Box sx={{ alignItems:'center', justifyContent:'center', display:'flex',flexDirection:'column'}}>
                      {/* <img
                          alt="profile-user"
                          width="100px"
                          height="100px"
                          src={`../../assets/user.png`}
                          style={{ cursor: "pointer", borderRadius: "50%" }}
                      /> */}

                      <Avatar
                        alt="Remy Sharp"
                        src={`../../assets/user.png`}
                        sx={{ width: 100, height: 100 }}
                      />
                      <Typography sx={{mt:'5px',fontSize:'16px'}}>Cargo Finder</Typography>

                      <Box sx={{
                          mt:2,
                          display:'flex', 
                          backgroundColor:colors.greenAccent[400], 
                          height:'30px', 
                          width:'120px', 
                          borderRadius:'16px',
                          justifyContent:'center', 
                          alignItems:'center'}}
                      >
                        <VerifiedUserSharpIcon sx={{ fontSize: 24 }} />
                        <Typography sx={{fontSize:20}}>Verified</Typography>
                      </Box>

                      
                        <Typography sx={{mt:'30px',fontSize:'15px',color: colors.greenAccent[500]}}>Personal Information</Typography>
                        <Divider sx={{ width: '80%', backgroundColor: colors.grey[300], my: 2 }} />
                      
                        <Grid container spacing={1} justifyContent="center" alignItems="center" paddingLeft="21%">
                          <Grid item xs={6} >
                            <Typography variant="subtitle1">User ID</Typography>
                            <Typography variant="subtitle1">Full Name</Typography>
                            <Typography variant="subtitle1">Age</Typography>
                            <Typography variant="subtitle1">Email Address</Typography>
                            <Typography variant="subtitle1">Contact Number</Typography>
                            <Typography variant="subtitle1">Gender</Typography>
                            <Typography variant="subtitle1">Address</Typography>
                            <Typography variant="subtitle1">Created At</Typography>
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle1"> {userData.id}</Typography>
                            <Typography variant="subtitle1"> {userData.fname} {userData.lname}</Typography>
                            <Typography variant="subtitle1"> {userData.age} Years</Typography>
                            <Typography variant="subtitle1"> {userData.email}</Typography>
                            <Typography variant="subtitle1"> {userData.phone}</Typography>
                            <Typography variant="subtitle1"> {userData.gender === 'M' ? 'Male' : 'Female'}</Typography>
                            <Typography variant="subtitle1"> 1234 Main Street, New York</Typography>
                            <Typography variant="subtitle1"> {userData.created}</Typography>
                          </Grid>
                        </Grid>
                        
                        <Typography sx={{mt:'30px',fontSize:'15px',color: colors.greenAccent[500]}}>Ride Summary</Typography>
                        <Divider sx={{ width: '80%', backgroundColor: colors.grey[300], my: 2 }} />

                        <Grid container spacing={1} justifyContent="center" alignItems="center" paddingLeft="21%">
                          <Grid item xs={6} >
                            <Typography variant="subtitle1">Total Rides</Typography>
                            <Typography variant="subtitle1">Details of recent rides</Typography>
                            {/* <Typography variant="subtitle1">Overview of ride status</Typography> */}
                           
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle1"> {userData.ride_count}</Typography>
                            <Typography variant="subtitle1"> 
                                  
                                  {recentLocations.location} to {recentLocations.destination}
                            </Typography>
                            {/* <Typography variant="subtitle1"> Completed: rideStatusOverview.completed</Typography> */}
                            
                          </Grid>
                        </Grid> 

                        <Typography sx={{mt:'30px',fontSize:'15px',color: colors.greenAccent[500]}}>Statistics</Typography>
                        <Divider sx={{ width: '80%', backgroundColor: colors.grey[300], my: 2 }} /> 

                        <Grid container spacing={1} justifyContent="center" alignItems="center" paddingLeft="21%">
                          <Grid item xs={6} >
                            <Typography variant="subtitle1">Average rating</Typography>
                            <Typography variant="subtitle1">Number of positive feedbacks</Typography>
                            <Typography variant="subtitle1">Number of complaints or issues.</Typography>
                            <Typography variant="subtitle1">Feedback and reviews from clients.</Typography>
                            
                          </Grid>
                          <Grid item xs={6}>
                            <Typography variant="subtitle1"> 4</Typography>
                            <Typography variant="subtitle1"> N/A</Typography>
                            <Typography variant="subtitle1"> N/A</Typography>
                            <Typography variant="subtitle1">N/A</Typography>
                            
                          </Grid>
                        </Grid>
                           
                          
                        

                      <Box sx={{display:'flex', justifyContent:'space-between'}}>
                        {/* <Button
                                  sx={{
                                      backgroundColor: colors.blueAccent[700],
                                      color: colors.grey[100],
                                      fontSize: "14px",
                                      fontWeight: '600',
                                      padding: "10px 20px",
                                  }}
                                  // onClick={handleVerifiedEcSeller}
                              >
                              <HowToRegOutlinedIcon sx={{ mr: "10px" }} />
                                  Verify Driver
                        </Button> */}

                        {/* <Button
                                  sx={{
                                      backgroundColor: colors.blueAccent[700],
                                      color: colors.grey[100],
                                      fontSize: "14px",
                                      fontWeight: '600',
                                      padding: "10px 20px",
                                  }}
                                  // onClick={handleVerifiedEcSeller}
                              >
                              <HowToRegOutlinedIcon sx={{ mr: "10px" }} />
                                  Reject Driver
                        </Button> */}
                      </Box>
                    </Box>

                    

                </Paper>
                
            </Box>
            
        
        </Box>
    </Box>
  );
};

export default CargoFinderProfile;
