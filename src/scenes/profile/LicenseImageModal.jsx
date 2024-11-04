import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Modal,
  TextField,
  IconButton
} from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function LicenseImageModal({ open, onClose, driverId }) {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [licenseImages, setLicenseImages] = useState({
      licence_side1: "",
      licence_side2: ""
    });

    const initialRejectReason = {
    reason: "",
  };

  const schema = yup.object().shape({
    rejectReason: yup.string().required("required reject reason"),
  });

  const handleFormSubmit = async (values, { resetForm }) => {

    try {
        const response = await fetch(`http://127.0.0.1:8000/pending_driver/reject/${driverId}/${encodeURIComponent(values.rejectReason)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: driverId,
            reject_reason :values.rejectReason,
            
          }),
        });
  
        if (response.ok) {
          console.log('Rejection reason submitted successfully');
          resetForm();
          onClose();
        } else {
          console.error('Failed to submit rejection reason');
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    console.log(values);
  };

  useEffect(() => {
    const fetchLicenseImagesFromApi = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/get_license_images/${driverId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'cors',
        });
        if (response.ok) {
          const data = await response.json();
          setLicenseImages(data);
          console.log('License images:', data);
        } else {
          console.error('Failed to fetch license images');
        }
      } catch (error) {
        console.error('Error fetching license images:', error);
      }
    };
  
    // Example: Fetch license images for a specific driver ID
    fetchLicenseImagesFromApi(); // Replace with your driverId or logic to obtain driverId
  }, [driverId]);

  const handleClick = (url) => {
    window.location.href = url; // Redirect to the specified URL
  };



  return (
    <React.Fragment>
      <Modal
        open={open}
        onClose={onClose}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: 400,
            width: 900,
            bgcolor: "background.paper",
            border: "1px solid #000",
            boxShadow: 24,
            p: 1,
            overflowY: "auto",
            display: "flex",
            flexDirection: "row",
            gap:'2'
          }}
        >
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            color: colors.grey[100],
            backgroundColor: colors.primary[500],
            "&:hover": {
              backgroundColor: colors.primary[700],
            },
          }}
        >
          <CloseOutlinedIcon />
        </IconButton>
       
            <Box display="flex" flexDirection="column" alignItems="center" mt={7}>
                <img
                    
                    // source={{ uri: licenseImages.licence_side1}}
                    src={licenseImages.licence_side1}
                    alt="Driver's License 1"
                    style={{ width: "100%", maxHeight: "100%", objectFit: "contain" }}
                />

                
                <Typography variant="subtitle1" mt={2} >
                    License Side 1
                </Typography>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="center" mt={7}>
                <img
                    
                    src={licenseImages.licence_side2}
                    // source={{ uri: licenseImages.licence_side2}}
                    alt="Driver's License 2"
                    style={{ width: "100%", maxHeight: "100%", objectFit: "contain" }}
                />

                <Typography variant="subtitle1" mt={2}>
                    License Side 2
                </Typography>
            </Box>


            <Box sx={{mt:20, display:'flex' ,gap:5}}>
            <Button
              variant="contained"
              color="primary"
              style={{ 
                backgroundColor: '#2196f3', 
                color: '#ffffff', 
                fontWeight: '400', 
                padding: '8px 16px', 
                fontSize: '10px', 
                height: '36px', 
                width: '180px', 

                
            }}
            onClick={() => handleClick(licenseImages.licence_side1)}
            >
                  Click Here licence Image One
            </Button>

            <Button
              variant="contained"
              color="primary"
              style={{ 
                  backgroundColor: '#2196f3', 
                  color: '#ffffff', 
                  fontWeight: '400', 
                  padding: '8px 16px', 
                  fontSize: '10px', 
                  height: '36px', 
                  width: '180px',
                  
            }}
            onClick={() => handleClick(licenseImages.licence_side2)}
            >
                  Click Here licence Image Two
            </Button>
   

            </Box>
            
        
          
          
          
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default LicenseImageModal;
