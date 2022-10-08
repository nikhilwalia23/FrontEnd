import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"
import "../profile.css";
const Packagetaken = (props) => 
{
    return (<div className="about">
    <div className="container_prof" >
      <h1 className="order_head common_head">order Detail's</h1>
      <h3 className="number" >{props.packageName}</h3>
      <h3 className="number" >{props.member} member</h3>
      <h3 className="number" >{props.amount} Rs</h3>
    </div>

  </div>);
}
export default Packagetaken;