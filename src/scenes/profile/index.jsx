import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, Button, Paper, Divider, Grid } from "@mui/material";
import { tokens } from "../../theme";
import { useParams, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import VerifiedUserSharpIcon from '@mui/icons-material/VerifiedUserSharp';
import StarRating from "../../components/StarRating";
import Person4RoundedIcon from '@mui/icons-material/Person4Rounded';
import LicenseImageModal from "./LicenseImageModal";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ProfileRejectReasonModal from "./ProfileRejectReasonModal";


const CargoFinderProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();

  const [userData, setUserData] = useState([]);
  const [open, setOpen] = React.useState(false);


  const [isVerified, setIsVerified] = useState(false);
  const [openLicenseModal, setOpenLicenseModal] = useState(false);
  const [averageReview, setAverageReview] = useState(0);
  const [showVerifiedBadge, setShowVerifiedBadge] = useState(false);

  
  const rejctButtonOnClick = () => {setOpen(true);};

  const handleClose = () => {setOpen(false);};

  const handleViewLicenseImage = () => {setOpenLicenseModal(true);};

  

  const handleVerifiedDriver = async () => {
    try {
      const userId = parseInt(id, 10);
      const response = await fetch(`http://127.0.0.1:8000/driver/varified/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id: userId }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      console.log('User verified successfully');
      
      setIsVerified(true);
      // setShowVerifiedBadge(true);
      setUserData((prevState) => ({
        ...prevState,
        verified: true,
      }));
      handleClose();
    } catch (error) {
      console.error('Error verifying user:', error);
    }
  };

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/driver_all_detals/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log('fetch data:', data);
        setUserData(data);
        setAverageReview(data.average_rating);
        if (data.verified === 1) {
          setIsVerified(true);
          setShowVerifiedBadge(true);
        } else if (data.verified === 2) {
          setIsVerified(false);
          setShowVerifiedBadge(false);
        }
      } catch (error) {
        console.error('Error fetching driver data:', error);
      }
    };

    fetchDriverData();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };



  return (
    <Box m="10px" sx={{ width: '100%', height: '100px'}} >
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
            <Box sx={{width:'60%', ml:'30%'}}>
            
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
                      <Typography sx={{mt:'5px',fontSize:'16px'}}>Driver</Typography>


                            {isVerified && (
                              <Box sx={{
                                mt: 1,
                                display: 'flex',
                                backgroundColor: colors.greenAccent[400],
                                height: '30px',
                                width: '120px',
                                borderRadius: '16px',
                                justifyContent: 'center',
                                alignItems: 'center'
                                }}>
                                <VerifiedUserSharpIcon sx={{ fontSize: 24 }} />
                                <Typography sx={{ fontSize: 20 }}>Verified</Typography>
                              </Box>
                            )}
                      <Box> <StarRating averageReview={averageReview}/></Box>

                      
                        <Typography sx={{mt:'1px',fontSize:'15px',color: colors.greenAccent[500]}}>Personal Information</Typography>
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
                        
                        <Typography sx={{mt:'30px',fontSize:'15px',color: colors.greenAccent[500]}}>Driver Performance</Typography>
                        <Divider sx={{ width: '80%', backgroundColor: colors.grey[300], my: 2 }} />

                        <Grid container spacing={1} justifyContent="center" alignItems="center" paddingLeft="21%">
                          <Grid item xs={6} >
                            
                            <Typography variant="subtitle1">Active Since</Typography>
                            <Typography variant="subtitle1">Total Rides Completed</Typography>
                            <Typography variant="subtitle1">Acceptance Rate</Typography>
                            <Typography variant="subtitle1">Cancellation Rate</Typography>
                            <Typography variant="subtitle1">Response Time</Typography>
                            <Typography variant="subtitle1">Current Status</Typography>
                            <Typography variant="subtitle1">Total Earning of this month</Typography>
                            <Typography variant="subtitle1">Average Review</Typography>                          
                            
                           
                          </Grid>
                          <Grid item xs={6}>
                            
                            <Typography variant="subtitle1"> {formatDate(userData.created)}</Typography>
                            <Typography variant="subtitle1"> {userData.completed_rides}</Typography>
                            <Typography variant="subtitle1">N/A</Typography>
                            <Typography variant="subtitle1">N/A</Typography>
                            <Typography variant="subtitle1">N/A</Typography>
                            <Typography variant="subtitle1">Active</Typography>
                            <Typography variant="subtitle1">{userData.total_earnings ? userData.total_earnings : 0}</Typography>
                            <Typography variant="subtitle1"> {averageReview}</Typography>
                                                    
                          </Grid>
                        </Grid> 
                        <Box sx={{display:'flex'}}>
                              <Box>
                              <Typography variant="subtitle1" sx={{mt:2}}>
                                <Button
                                    sx={{
                                      backgroundColor: "#eb1b0c",
                                      color: colors.grey[100],
                                      fontSize: "12px",
                                      fontWeight: "bold",
                                      padding: "8px 16px",
                                    }}
                                    onClick={handleViewLicenseImage}
                                >
                                    <Person4RoundedIcon sx={{ mr: "8px" }} />
                                    View Driver's License
                                    <LicenseImageModal
                                        open={openLicenseModal}
                                        onClose={() => setOpenLicenseModal(false)}
                                        driverId={userData.id}
                                    />
                                </Button> 
                              </Typography>
                            </Box>

                        </Box>

                        {/* <Typography sx={{mt:'30px',fontSize:'15px',color: colors.greenAccent[500]}}>Statistics</Typography>
                        <Divider sx={{ width: '80%', backgroundColor: colors.grey[300], my: 2 }} />  */}

                        <Grid container spacing={1} justifyContent="center" alignItems="center" paddingLeft="21%">
                          <Grid item xs={6} >
                            {/* <Typography variant="subtitle1">Average Review</Typography> */}
                            {/* <Typography variant="subtitle1">Number of positive feedbacks</Typography>
                            <Typography variant="subtitle1">Number of complaints or issues.</Typography>
                            <Typography variant="subtitle1">Feedback and reviews from clients.</Typography> */}
                            
                          </Grid>
                          <Grid item xs={6}>
                            {/* <Typography variant="subtitle1"> {averageReview}</Typography> */}
                            {/* <Typography variant="subtitle1"> 50</Typography>
                            <Typography variant="subtitle1"> 10</Typography>
                            <Typography variant="subtitle1">button</Typography> */}
                            
                          </Grid>
                        </Grid>
                        <Box sx={{mt:3, display:'flex', justifyContent:'space-between', gap: 3}}>
                          <Button
                              sx={{
                                backgroundColor: colors.blueAccent[700],
                                color: colors.grey[100],
                                fontSize: "14px",
                                fontWeight: '600',
                                padding: "10px 20px",

                              }}
                              onClick={handleVerifiedDriver}
                          >
                              <HowToRegOutlinedIcon sx={{ mr: "10px" }} />
                              Verify Driver
                          </Button>

                          <Button
                            sx={{
                              backgroundColor: colors.blueAccent[700],
                              color: colors.grey[100],
                              fontSize: "14px",
                              fontWeight: "600",
                              padding: "10px 20px",
                            }}
                            onClick={rejctButtonOnClick}
                          >
                            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
                            Reject Driver
                          </Button>
                          <ProfileRejectReasonModal open={open} onClose={handleClose} driverId={userData.id} />
                        </Box>                
                    </Box>

                    

                </Paper>
                
            </Box>
            
        
        </Box>
    </Box>
  );
};

export default CargoFinderProfile;





