import React, { useState, useEffect } from "react";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import "../style/Auth.css";
import { toast } from "react-toastify";
import { baseUrl } from "../BackendApi/auth";



const ResetPassword = () => {

  const navigate = useNavigate();
  const { token } = useParams();
  const goToLoginPage = () => {
    navigate(`/singin`);
  };

  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  const [signinForm, setForm] = React.useState({
    password: "",
    confirm_password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setForm({
      ...signinForm,
      [name]: value,
    })
    setIsSubmit(false);
  }
  useEffect(()=>{
    setError(validate(signinForm));
  },[signinForm])

  const validate = (values) => {
    const error = {};
    if (!signinForm.password) {
      error.password = "password is required";
    } else if (!signinForm.confirm_password) {
      error.confirm_password = "confirm password is required";
    }
    else if(signinForm.password!=signinForm.confirm_password)
    {
      error.confirm_password="Password did't , match";
    }
    else {
      setIsSubmit(true)
    }
    return error;
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (isSubmit) {
      var data = JSON.stringify({
        "token": token,
        "password": signinForm.password
      });
      
      var config = {
        method: 'post',
        url: baseUrl+'/user/resetpassword',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        toast("Password Changes Sucessfully");
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  }


  return (
    <div className="resetform" >
      <div className=" formCont" >
        <h1 style={{ color: "#000" }} > Reset Password </h1>
        <div className=" box" >
          <form onSubmit={handleSubmit} style={{ width: "100%" }}>
            <div className="IPWithError">
              <div class="input-group has-validation">
                <span class="input-group-text" id="inputGroupPrepend3">
                  <FontAwesomeIcon icon={faKey}></FontAwesomeIcon>
                </span>
                <input
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={handleChange}
                  value={signinForm.password}
                  class="form-control"
                />
              </div>
              <p className="error">{error.password}</p>
            </div>
            <div className="IPWithError">
              <div className="input-group has-validation">
                <span className="input-group-text" id="inputGroupPrepend3">
                  <FontAwesomeIcon icon={faKey}></FontAwesomeIcon>
                </span>
                <input
                  name="confirm_password"
                  placeholder=" confirm_Password"
                  type="password"
                  onChange={handleChange}
                  value={signinForm.confirm_password}
                  className="form-control"

                />
              </div>
              <p className="error">{error.confirm_password}</p>
            </div>
            <div className="col-md-8 check">
              <div></div>
            </div>
            <button
              className="sign_btn btn resetBtn"
              style={{ width: "100%" }}
              type="submit"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
