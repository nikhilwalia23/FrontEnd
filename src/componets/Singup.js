import React, { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  faSignature,
  faAt,
  faPhone,
  faLocationDot,
  faKey,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";

import { baseUrl, singUpApi } from "../BackendApi/auth";

function Singup(props) {
  const [signupForm, setForm] = React.useState({
    name: "",
    email: "",
    number: "",
    address: "",
    password: "",
    confirm_password: "",
  });

  const clearForm = () => {
    setForm((clear) => (clear.length = 0));
  };

  const navigate = useNavigate();

  const [submitBtn, StSubmitBtn] = React.useState({
    btnText: "sigin in",
    disabled: false,
  });

  const { btnText, disabled } = submitBtn;

  const [error, setError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    setIsSubmit(false);
  }

  function HandleSubmit(event) {
    event.preventDefault();
    event.target.reset();
    setError(validate(signupForm));
    setIsSubmit(true);
  }

  useEffect(() => {
    if (Object.keys(error).length === 0 && isSubmit) {
      StSubmitBtn({ btnText: "Loging...", disabled: true });
    }
  }, [isSubmit]);

  const validate = (values) => {
    const error = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // const pass =
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&.])[A-Za-z\d$@$!%*?&.]{6, 20}/;
    if (!values.name) {
      error.name = "name is required";
    } else if (values.name.length > 15) {
      error.name = "Must be 15 characters or less";
    } else if (!values.email) {
      error.email = "email is required";
    } else if (!regex.test(values.email)) {
      error.email = "this is not a valid format";
    } else if (!values.number) {
      error.number = "mobile No is required";
    } else if (values.number.length < 10) {
      error.number = "atleast 10 number must be require";
    } else if (values.number.length > 10) {
      error.number = "number more then 10 will not be acceptable";
    } else if (!(values.password && values.confirm_password)) {
      error.confirm_password = "password is required";
      error.password = "password is required";
    } else if (values.password !== values.confirm_password) {
      error.confirm_password = "password did'nt match";
    }
    else {
      // make API call
      let data = JSON.stringify(signupForm);
      var config = {
        method: 'post',
        url: baseUrl+'/signup',
        headers: { 
          'Content-Type': 'application/json'
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          //console.log(response);
          toast(response.data.message);
          if (response.status === 200) {
            StSubmitBtn({ btnText: "go to login form ", disabled: false });
            navigate("/singin");
            clearForm();
          } else {
            StSubmitBtn({ btnText: "sigin" });
            clearForm();
          }
          props.setShow(true);
        })
        .catch(function (error) {
          console.log(error.response.data.error);
          toast(error.response.data.error);
        });
    }
    return error;
  };

  return (
    <div className="signup">
      <form onSubmit={HandleSubmit} style={{ width: "100%" }}>
        <div className="IPWithError">
          <div class="input-group has-validation">
            <span class="input-group-text" id="inputGroupPrepend3">
              <FontAwesomeIcon icon={faSignature}></FontAwesomeIcon>
            </span>
            <input
              name="name"
              placeholder="Full Name"
              type="text"
              maxLength="20"
              class="form-control"
              onChange={handleChange}
              value={signupForm.name}
            />
          </div>
          <p className="error">{error.name}</p>
        </div>
        <div className="IPWithError">
          <div class="input-group has-validation">
            <span class="input-group-text" id="inputGroupPrepend3">
              <FontAwesomeIcon icon={faAt}></FontAwesomeIcon>
            </span>
            <input
              name="email"
              placeholder="email"
              type="text"
              maxLength="30"
              onChange={handleChange}
              value={signupForm.email}
              class="form-control"
            />
          </div>
          <p className="error">{error.email}</p>
        </div>
        <div className="IPWithError">
          <div class="input-group has-validation">
            <span class="input-group-text" id="inputGroupPrepend3">
              <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
            </span>
            <input
              name="number"
              placeholder="mobile no"
              type="text"
              onChange={handleChange}
              value={signupForm.number}
              minlength="10"
              maxlength="10"
              class="form-control"
            />
          </div>
          <p className="error">{error.number}</p>
        </div>
        <div>
          <div class="input-group has-validation">
            <span class="input-group-text" id="inputGroupPrepend3">
              <FontAwesomeIcon icon={faLocationDot}></FontAwesomeIcon>
            </span>
            <input
              name="address"
              placeholder="address"
              onChange={handleChange}
              value={signupForm.address}
              type="text"
              class="form-control"
            />
          </div>
        </div>
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
              value={signupForm.password}
              class="form-control"
            />
          </div>
          <p className="error">{error.password}</p>
        </div>
        <div className="IPWithError">
          <div class="input-group has-validation">
            <span class="input-group-text" id="inputGroupPrepend3">
              <FontAwesomeIcon icon={faKey}></FontAwesomeIcon>
            </span>
            <input
              name="confirm_password"
              placeholder="Confirm Password"
              type="password"
              onChange={handleChange}
              value={signupForm.confirm_password}
              class="form-control"
            />
          </div>
          <p className="error">{error.confirm_password}</p>
        </div>
        <div>
          <button
            class="sign_btn btn"
            disabled={disabled}
            style={{ width: "100%" }}
            type="submit"
          >
            {btnText}
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
}

export default Singup;
