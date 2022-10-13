import React from "react";
import axios from "axios";
import {BeatLoader} from "react-spinners"
import "./profile.css";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiContext } from "../ContextApi/ContextProvider";
import Pic1 from "../static/images/pic-1.png";
import Packagetaken from "./small_components/Packagetaken"
import { baseUrl } from "../BackendApi/auth";


function Profile() {

  const [showOrder, setShowOrders] = useState(false);
  const [Orders,setOrders]  = useState([]);
  const [loading,setLoading] = useState(false);
  const openOrderBox = () => {
    setLoading(true);
    var data = {
      id: localStorage.getItem("id")
    }

    var config = {
      method: 'post',
      url: baseUrl+'/package/showpackage',
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(response.data.Packages_taken);
        setOrders(response.data.Packages_taken);
        console.log(Orders);
        setLoading(false);
        setShowOrders(true);
      })
      .catch(function (error) {
        console.log(error);
        setLoading(false);
      });
  }

  const userDetails = {
    img: Pic1,
    mobileNo: localStorage.getItem('number'),
    email: localStorage.getItem('email'),
    address: 'Himachal Pradesh',
  }

  const navigate = useNavigate();
  
  const goToSignUpPage = () => {
    navigate("/singin");
  };

  const [items, setItems] = useState();

  return (
    <div className="profile">
            <div>
              {!showOrder && 
              <div>
              <img className="myImage" src={userDetails.img} alt="can't display" />
              <div className="container_prof" >
                <h1 className="persional_head common_head" >persional detail's</h1>
                <h2 className="name_profile persional">{items}</h2>
                <h3 className="email persional" >{userDetails.email}</h3>
                <h3 className="mobileNo persional" >{userDetails.mobileNo}</h3>
                <h3 className="address persional" >{userDetails.address}</h3>
              </div>
              </div>
            }
              <button className="orderdetails" onClick={openOrderBox} >view orders</button>
              {showOrder && <div><h1>Yours Packages </h1></div>}
              {loading && <BeatLoader/>}
            </div>
    </div>
  )
}

export default Profile;
{/* */ }