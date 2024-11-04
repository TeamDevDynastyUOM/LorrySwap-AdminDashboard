import React from "react";
import {
  Box,
  Typography,
  useTheme,
  Button,
  Modal,
  TextField,
} from "@mui/material";
import { tokens } from "../../theme";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function ProfileRejectReasonModal({ open, onClose, driverId }) {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

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
            height: 230,
            width: 800,
            bgcolor: "background.paper",
            border: "1px solid #000",
            boxShadow: 24,
            p: 2,
          }}
        >
          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialRejectReason}
            validationSchema={schema}
            height="50px"
          >
            {({
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }) => (
              <form onSubmit={handleSubmit}>
                <Box>
                  <Typography variant="h6" component="h2">
                    Reason for Rejection
                  </Typography>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Reject Reason"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.rejectReason}
                    name="rejectReason"
                    error={touched.rejectReason && Boolean(errors.rejectReason)}
                    helperText={touched.rejectReason && errors.rejectReason}
                    multiline
                    rows={4}
                  />
                </Box>
                <Box display='flex' justifyContent='flex-end'>
                  <Box display="flex" gap='1rem' mt='20px'>
                    <Button
                        sx={{
                            backgroundColor: colors.blueAccent[400],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                        onClick={onClose}
                    >
                      <CloseOutlinedIcon sx={{ mr: "10px" }} />
                      Close
                    </Button>
                    <Button
                        type="submit"
                        sx={{
                            backgroundColor: colors.greenAccent[400],
                            color: colors.grey[100],
                            fontSize: "14px",
                            fontWeight: "bold",
                            padding: "10px 20px",
                        }}
                        onClick={handleFormSubmit}
                    >
                      <CheckOutlinedIcon sx={{ mr: "10px" }} />
                      Ok
                    </Button>
                  </Box>
                </Box>
              </form>
            )}
          </Formik>
          
          
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default ProfileRejectReasonModal;
