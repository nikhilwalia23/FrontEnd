import { useContext, useEffect, useState } from "react";
import { apiContext } from "../ContextApi/ContextProvider"
import { axios } from 'axios'
import { baseUrl } from "../BackendApi/auth";
import {Button} from "react-bootstrap"
import '../style/Payment.css'
let Payment = (props) => {
  let [done,setDone] = useState(false);
  let [payid,setPayid] = useState("");
  let { Ammount, orderId } = useContext(apiContext);
  let [name,setName] = useState();
  let [email,setEmail] = useState();
  let [number,setNumber] = useState();
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };
  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
    setName(localStorage.getItem('name'));
  setNumber(localStorage.getItem('number'));
  setEmail(localStorage.getItem('email'));
  });
  const options = {
    key: process.env.REACT_APP_razorPayKey,
    currency: "INR",
    amount: Ammount,
    name: "Tourist",
    description: "Test Wallet Transaction",
    order_id: orderId,
    handler: function (response) {
      //verify Payment
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        "razorpaySignature": response.razorpay_signature,
        "paymentId": response.razorpay_payment_id
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
  //     fetch(baseUrl+"payment/verfiy", requestOptions)
  // .then(response => response.text())
  // .then(result => console.log(result))
  // .catch(error => console.log('error', error));
  setPayid(response.razorpay_payment_id);
  setDone(true);
  console.log("dor verification by webhook");
    },
    prefill: {
      name: localStorage.getItem('name'),
      email: "anirudh@gmail.com",
      contact: "9999999999",
    },
  };
  function pay() {
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
  return (
    <div style={{padding:"auto"}}>
      {!done && <button onClick={pay}>Pay Securaly</button>}
      {/* Show Pay Successfully Message With Details */}
      {done && 
      <div className="paywindow">
        <div className="payhead">
          <h2>Payment Successfully</h2>
        </div>
        <div className="paypage">
          <div className="payprop">
            <p>Payment type</p>
            <p>Name</p>
            <p>Mobile</p>
            <p>Email</p>
            <p>Payment Id</p>
            <p>Ammount Paid</p>
            <Button variant="primary" size="lg">
          Print
        </Button>
          </div>
          <div className="payval">
          <p>Net Banking</p>
          <p>{name}</p>
          <p>{number}</p>
            <p>{email}</p>
            <p>{payid}</p>
            <p>{Ammount}</p>
            <Button variant="primary" size="lg">
          Close
        </Button>
          </div>
        </div>
        
      </div>
      }
    </div>);
}
export default Payment;