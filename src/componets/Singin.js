import React, { useEffect, useState, useContext, createContext } from "react";

import ForgetForm from "./forgetForm";
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import "../style/Auth.css";
import {apiContext} from "../ContextApi/ContextProvider"
import {
  faAt, faKey

} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { baseUrl } from "../BackendApi/auth";

const data = createContext();
const data1 = createContext();

function Singin() {
  
  let { setLogedin } = useContext(apiContext);
  const navigate = useNavigate();
  const [signinForm, setForm] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [submitBtn, StSubmitBtn] = React.useState({
    btnText: "login",
    disabled: false,
  });

  const { btnText, disabled } = submitBtn;

  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [forgetPassword, setForgetPassword] = useState(false);

  const showForgetForm = () => {
    setForgetPassword((prev) => !prev);
  };



  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

    setError(validate(signinForm));

  }
  function handleSubmit(event) {
    event.preventDefault();
      if (Object.keys(error).length === 0) {
        setIsSubmit(true);
        StSubmitBtn({ btnText: "submitting...", disabled: true });
      }
  }

 

  useEffect(() => {
    if(isSubmit){
    var config = {
        method: "post",
        url: baseUrl+"/login",
      headers: {
          "Content-Type": "application/json",
      },
        data: signinForm,
    };        
    axios(config)
      .then(function (response) {
          console.log(response);
       
          localStorage.setItem("id", response.data.id);
          localStorage.setItem("name", response.data.name);
          localStorage.setItem("email",response.data.email);
          localStorage.setItem("number",response.data.number);
          StSubmitBtn({ btnText: "login ", disabled: false });
          navigate("/singin");
         if(response.data?.role === 0)
         {
              localStorage.setItem('user',true)
         }
         if(response.data?.role === 1)
         {
              localStorage.setItem('admin',true)
         }
        setLogedin(true);
        navigate("/");
      })
      .catch(function (error) {
          setErrorMessage(error.response.data.error);
          StSubmitBtn({ btnText: "Login", disabled: false });
          setIsSubmit(false);
      });
  }
  }, [isSubmit]);

  const validate = (values) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "email is required";
    } else if (!regex.test(values.email)) {
      error.email = "this is not a valid format";
    }

    else if (!(values.password)) {
      error.password = "password is required";
    }
    else if(!(values.password)){
         error.password = "password is required"
    }
    return error;
  };



  return (
    <div className="signin">
      {forgetPassword ?  
        <data.Provider value={forgetPassword}>
        <data1.Provider value={setForgetPassword}>
          <ForgetForm/>
          
        </data1.Provider>
      </data.Provider>
       : 
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <div class="IPWithError">
            <div class="input-group has-validation">
              <span class="input-group-text" id="inputGroupPrepend3">
                <FontAwesomeIcon icon={faAt}></FontAwesomeIcon>
              </span>
              <input
                name="email"
                placeholder="email"
                onChange={handleChange}
                value={signinForm.email}
                type="email"
                class="form-control"
              />
            </div>
            <p className="error">{error.email}</p>
          </div>
          <div className="IPWithError" >
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
              <p className="error">{errorMessage}</p>
          </div>
          <div class="col-md-8 check">
            <div>
              <p className="forgetPassword" onClick={showForgetForm}>
                forget password
              </p>{" "}
            </div>
          </div>
            <button
              class="sign_btn btn"
              style={{ width: "100%" }}
              type="submit"
              disabled={disabled}
            >
               {btnText}
            </button>
          
        </form>
      }

      <ToastContainer />
    </div>
  );
}

export default Singin;
export {data , data1};
 
