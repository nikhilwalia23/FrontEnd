import React from "react";
import "./profile.css";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiContext } from "../ContextApi/ContextProvider";
import Pic1 from "../static/images/pic-1.png";



function Profile() {

  const [vieworder , setOrder] = useState(false)

  const openOrderBox = ()=>{
        return(
          setOrder((prev)=>!prev)
        )
  }

  const data = [
    {
      img:Pic1,
      mobileNo: localStorage.getItem('number'),
      email: localStorage.getItem('email'),
      address:'delhi',
      myOrder:{
         packageName:"kullu",
         member:4,
         amount:15000,
      },
    }
  ]

  const navigate = useNavigate();
  let { logedin } = useContext(apiContext);
  

  const goToSignUpPage = () => {
    navigate("/singin");
  };

  const [items, setItems] = useState();



  const user = data.map((users)=>{
return(

  <div className="about">
  {vieworder? <div  className="container_prof" >
<h1 className="order_head common_head">order Detail's</h1>
<h3  className="number" >{users.myOrder.packageName}</h3>
<h3 className="number" >{users.myOrder.member} member</h3>
<h3 className="number" >{users.myOrder.amount} Rs</h3>
<button className="orderdetails" onClick={openOrderBox} >back to profile</button>
</div> :
<div>
  <img className="myImage" src={users.img} alt="can't display" />
  <div className="container_prof" > 
  <h1 className="persional_head common_head" >persional detail's</h1>
  <h2 className="name_profile persional">{items}</h2>
  <h3 className="email persional" >{users.email}</h3>
  <h3 className="mobileNo persional" >{users.mobileNo}</h3>
  <h3 className="address persional" >{users.address}</h3>
  </div>
 <button className="orderdetails" onClick={openOrderBox} >view orders</button>
 </div>
  }
</div>
)
  })

  return (
    <div>
      {logedin ? (
        <div className="profile">
      {user}
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
    </div>
  );
}

export default Profile;
{/* */}