import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = async (values, { setSubmitting, resetForm }) => {
    console.log("Submitting form with values:", values);
    try {

      const formattedValues = {
        fname: values.firstName,
        lname: values.lastName,
        email: values.email,
        contact_no: values.contact, // Change 'contact' to 'contact_no'
        age: parseInt(values.age, 10),  // Ensure age is converted to integer if needed
        gender: values.gender,
        nic: values.nic,
        username: values.username,
        password: values.password,
      };
  
      
      const response = await fetch(`http://127.0.0.1:8000/admin/create_admin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedValues),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      resetForm();
      alert("New admin created successfully");
      console.log("New admin created successfully:", values);
    } catch (error) {
      console.error("Admin creation failed:", error.message);
      alert("Admin creation failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const phoneRegExp =
    /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

  const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("First Name is required").min(2, 'Too Short!').max(50, 'Too Long!'),
    lastName: yup.string().required("Last Name is required").min(2, 'Too Short!').max(50, 'Too Long!'),
    email: yup.string().email("Invalid email format").required("Email is required"),
    contact: yup.string().matches(phoneRegExp, "Phone number is not valid").required("Contact Number is required"),
    age: yup.number().required("Age is required").positive("Age must be positive").integer("Age must be an integer").min(18, "Age must be at least 18 years old"),
    gender: yup.string().required("Gender is required"),
    nic: yup.string().matches(/^[0-9]{9}[vVxX]$|^[0-9]{12}$/, "Invalid NIC format").required("NIC is required"),
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "Passwords must match").required("Confirm Password is required"),
  });

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    contact: '',
    age: '',
    gender: '',
    nic: '',
    username: '',
    password: '',
    confirmPassword: '',
  };

  return (
    <Box m="20px" marginLeft="18%">
      <Header title="CREATE ADMIN" subtitle="Create a New Admin" />

      <Formik
        initialValues={initialValues}
        validationSchema={checkoutSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                name="firstName"
                value={values.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.firstName && touched.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                name="lastName"
                value={values.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.lastName && touched.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="email"
                label="Email"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.email && touched.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Username"
                name="username"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.username && touched.username}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                name="contact"
                value={values.contact}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.contact && touched.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="number"
                label="Age"
                name="age"
                value={values.age}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.age && touched.age}
                helperText={touched.age && errors.age}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Gender"
                name="gender"
                value={values.gender}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.gender && touched.gender}
                helperText={touched.gender && errors.gender}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="NIC"
                name="nic"
                value={values.nic}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.nic && touched.nic}
                helperText={touched.nic && errors.nic}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.password && touched.password}
                helperText={touched.password && errors.password}
                sx={{ gridColumn: "span 2" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={!!errors.confirmPassword && touched.confirmPassword}
                helperText={touched.confirmPassword && errors.confirmPassword}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={isSubmitting}
              >
                Create New Admin
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Form;
