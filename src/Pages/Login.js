import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { Api } from "../Api/Api";
import { toast } from "react-toastify";
import Button from "@mui/material/Button";
import "../Styles/Login.css";
function Login() {
  const navigate = useNavigate();

  const validationSchema = yup.object({
    username: yup.string("Enter username").required("Username is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: validationSchema,

    onSubmit: async (values) => {
      try {
        const userlogin = await axios.post(`${Api.api}/admin/login`, values);
        if (userlogin.data.error) {
          toast.error("Error: " + userlogin.response.data.message);
        } else {
          toast.success(userlogin.data.message);
          const Token = userlogin.data.Datas.token;
          console.log(userlogin.data.Datas.token);
          localStorage.setItem("token", Token);
          navigate("/home");
        }
      } catch (error) {
        console.log(error);
        toast.error("Error: " + error.response.data.message);
      }
    },
  });

  return (
    <>
      <div className="container login-container">
        <section className="forget text-center">
          {/* <div className="image-login"></div> */}
          <div className="content-login">
            <h4 className="loginhead">Welcome</h4>
            <div>
              <form onSubmit={formik.handleSubmit}>
                <div className="form-box">
                  <div className="input-group mb-3">
                    <TextField
                      id="outlined-basic"
                      label="Username"
                      variant="outlined"
                      size="small"
                      sx={{ width: "52ch" }}
                      type={"text"}
                      error={
                        formik.touched.username &&
                        Boolean(formik.errors.username)
                      }
                      helperText={
                        formik.touched.username && formik.errors.username
                      }
                      name={"username"}
                      value={formik.values.username}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <TextField
                      id="outlined-basic"
                      label="Password"
                      variant="outlined"
                      size="small"
                      sx={{ width: "52ch" }}
                      type={"text"}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      name={"password"}
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                  </div>

                  <div className="d-grid gap-2">
                    <Button
                      color="primary"
                      variant="contained"
                      fullWidth
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Login;
