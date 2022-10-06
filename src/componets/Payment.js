import { useContext, useEffect, useState } from "react";
import {apiContext} from "../ContextApi/ContextProvider"
import {axios} from 'axios'
let Payment = (props) => 
{
  let {paymentId,setpaymentId} = useState();
  let {razorpaySignature,setrazorpaySignature} = useState();
  let {orderid,setorderId} = useState();
  let {Ammount,orderId} = useContext(apiContext);
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
    });  
    const options = {
        key: "rzp_test_8qugw0DaMh84Fe",
        currency: "INR",
        amount: Ammount,
        name: "Tourist",
        description: "Test Wallet Transaction",
        order_id: orderId,
        handler: function (response) {
          alert(response.razorpay_signature);
          
        },
        prefill: {
          name: "Anirudh Jwala",
          email: "anirudh@gmail.com",
          contact: "9999999999",
        },
      };
    function pay()
    {
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();  
    }    
    return (
    <>
    <button onClick={pay}>Pay Securaly</button>
    </>);
}
export default Payment;