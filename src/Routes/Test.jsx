import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { useStorage } from "../Context/StorageContext";
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Login = () => {
  const [user, setUser] = useState({ usernameOrEmail: "", password: "" });
  const { usernameOrEmail, password } = user;
  const { loginAPICall, storeToken, saveLoggedInUser, storeRol } = useStorage();
  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    // e.preventDefault();
    const token = window.btoa(usernameOrEmail + ":" + password, "utf8").toString("base64");
    const config = {
      headers: {
        Authorization: "Basic " + token,
      },
    };

    try {
      const result = await loginAPICall(user,config); 
      console.log(result);
      storeRol(result.role.name);
      storeToken(token);
      saveLoggedInUser(usernameOrEmail);
      setUser({ usernameOrEmail: "", password: ""});
      succesMessage();
      setTimeout(() => {
      // navigator("/");
      // window.location.reload();
      }, 2499);
      
    } catch (error) {
      errorMessage();
    }
  };


  const succesMessage = () =>
    toast.success("Login exitoso!!!", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const errorMessage = () =>
    toast.error("Verifique los campos!", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    const validationSchema = yup.object({
      usernameOrEmail: yup
        .string('Enter your name')
        .email('Enter a valid email')
        .required('Name is required'),
      password: yup
        .string('Enter your password')
        .min(4, 'Password should be of minimum 4 characters length')
        .required('Password is required'),
    });
    const formik = useFormik({
      initialValues: {
        usernameOrEmail: '',
        password: '',
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        alert(JSON.stringify(values, null, 2));
        handleSubmit(); 
      },
    });

  return (
    
    <div className="flex-container centered">
    <form onSubmit={formik.handleSubmit} className="card ">
    <p className="title-form">Iniciar sesión</p>
      <TextField
      // className="inputContainer"
        fullWidth
        id="usernameOrEmail"
        name="usernameOrEmail"
        label="Email"
        value={formik.values.usernameOrEmail}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.usernameOrEmail && Boolean(formik.errors.usernameOrEmail)}
        helperText={formik.touched.usernameOrEmail && formik.errors.usernameOrEmail}
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <Button color="secondary" variant="contained" fullWidth type="submit" onSubmit={handleSubmit}>
        Submit
      </Button>
    </form>
  </div>
  );
};
export default Login;
