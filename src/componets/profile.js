import React from "react";
import axios from "axios";
import "./profile.css";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiContext } from "../ContextApi/ContextProvider";
import Pic1 from "../static/images/pic-1.png";
import Packagetaken from "./small_components/Packagetaken"
import { baseUrl } from "../BackendApi/auth";


function Profile() {

  const {showOrder, setOrder} = useState(false);
  const [Orders,setOrders]  = useState([]);
  const openOrderBox = () => {
    var data = JSON.stringify({
      "id": "62c1412388a98f5e6fd4c76f"
    });

    var config = {
      method: 'get',
      url: baseUrl+'/package/showpackage',
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true,
      data: data
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        setOrder(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setOrder(true);
  }

  const userDetails = {
    img: Pic1,
    mobileNo: localStorage.getItem('number'),
    email: localStorage.getItem('email'),
    address: 'delhi',
  }

  const navigate = useNavigate();
  let { logedin } = useContext(apiContext);


  const goToSignUpPage = () => {
    navigate("/singin");
  };

  const [items, setItems] = useState();

  return (
    <div>
      {logedin ? (
        <div className="profile">
          <div>
            <img className="myImage" src={userDetails.img} alt="can't display" />
            <div className="container_prof" >
              <h1 className="persional_head common_head" >persional detail's</h1>
              <h2 className="name_profile persional">{items}</h2>
              <h3 className="email persional" >{userDetails.email}</h3>
              <h3 className="mobileNo persional" >{userDetails.mobileNo}</h3>
              <h3 className="address persional" >{userDetails.address}</h3>
            </div>
            <button className="orderdetails" onClick={openOrderBox} >view orders</button>
          </div>
        </div>
      ) : (
        <div className="beforeLoginCont" >
          <div className="lofinBtnContainer" >
            <div className="profileLogin btn" onClick={goToSignUpPage}>
              login First{" "}

            </div>

            <p className="Join_us" >Join us to explore more </p>
          </div>

        </div>
      )}
      <Packagetaken packageName="Kullu Manli" amount="342" member="3" />
    </div>
  );
}

export default Profile;
{/* */ }