import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme, Button, Paper } from "@mui/material";
import { tokens } from "../../theme";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import { useParams, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import VerifiedUserSharpIcon from '@mui/icons-material/VerifiedUserSharp';


const EC_seller_profile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { id } = useParams();
  const navigate = useNavigate();

  const [userData, setUserData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const rejctButtonOnClick = () =>{
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false);
  };



  const handleVerifiedEcSeller = async () =>{

    console.log(id)

    try {
        
        const userId = parseInt(id, 10);
      // Replace with your API endpoint
      const response = await fetch(`http://127.0.0.1:8000/ec_seller/verfied/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ EC_seller_id: userId }),
      });

      // Check if the response is okay
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

    //   fetchPendingUsers();

      // Handle successful verification here if needed
      console.log('User verified successfully');
      handleClose();  // Close the modal after successful verification
      setIsVerified(true);

    } catch (error) {
      console.error('Error verifying user:', error);
    }

    
  }


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/ec_seller_details/${id}`,{
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
  



  return (
    <Box m="10px" sx={{ width: '100%', height: '100px',ml:'40%'}} >
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
            <Box sx={{width:'40%'}}>
            
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
                      <Typography sx={{mt:'5px'}}>EC Seller</Typography>

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

                      
                        <Typography sx={{mt:'30px'}}>Personal Information</Typography>
                      

                      <Box sx={{mt:'30px', display:'flex'}}>
                        <Box sx={{mr:8}}>
                          <Typography>User ID</Typography>
                          <Typography>Full Name</Typography>
                          <Typography>Age</Typography>
                          <Typography>Email Address</Typography>
                          <Typography>Contact Number</Typography>
                          <Typography>Gender</Typography>
                          <Typography>Address</Typography>
                          <Typography>Created At</Typography>
                        </Box>

                        <Box>
                          <Typography> {userData.id}</Typography>
                          <Typography> {userData.fname} {userData.lname}</Typography>
                          <Typography> {userData.age}</Typography>
                          <Typography> {userData.email}</Typography>
                          <Typography> {userData.phone}</Typography>
                          <Typography> {userData.gender === 'M' ? 'Male' : 'Female'}</Typography>
                          <Typography> 1234 Main Street, New York</Typography>
                          <Typography> {userData.created}</Typography>
                        </Box>
                      </Box>

                      <Box sx={{display:'flex', justifyContent:'space-between'}}>
                        <Button
                                  sx={{
                                      backgroundColor: colors.blueAccent[700],
                                      color: colors.grey[100],
                                      fontSize: "14px",
                                      fontWeight: '600',
                                      padding: "10px 20px",
                                  }}
                                  onClick={handleVerifiedEcSeller}
                              >
                              <HowToRegOutlinedIcon sx={{ mr: "10px" }} />
                                  Verify Driver
                        </Button>

                        <Button
                                  sx={{
                                      backgroundColor: colors.blueAccent[700],
                                      color: colors.grey[100],
                                      fontSize: "14px",
                                      fontWeight: '600',
                                      padding: "10px 20px",
                                  }}
                                  onClick={handleVerifiedEcSeller}
                              >
                              <HowToRegOutlinedIcon sx={{ mr: "10px" }} />
                                  Reject Driver
                        </Button>
                      </Box>
                    </Box>

                    

                </Paper>
                
            </Box>
            
        
        </Box>
    </Box>
  );
};

export default EC_seller_profile;
