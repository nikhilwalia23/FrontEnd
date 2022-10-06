import React from "react";
import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";
import "animate.css";
import { apiContext } from "../../ContextApi/ContextProvider";
import {baseUrl} from "../../BackendApi/auth"

import "../../style/CardDetails.css";
import img1 from "../../static/images/gallary/1.jpg";
import img2 from "../../static/images/gallary/2.jpg";
import img3 from "../../static/images/gallary/3.jpg";
import img4 from "../../static/images/gallary/4.jpg";
import img5 from "../../static/images/gallary/5.jpg";
import img6 from "../../static/images/gallary/6.jpg";
import img7 from "../../static/images/gallary/7.jpg";
import img8 from "../../static/images/gallary/8.jpg";
import img9 from "../../static/images/5.jpg";
import img10 from "../../static/images/4.jpg";
import { useLocation } from "react-router-dom";
import {
  faStar,
  faArrowUp,
  faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CarDetails() {
  let {setOrderId,setAmmount} = useContext(apiContext);
  let [memberCount, setMemberCount] = useState(1);
  const [readMore, setreadMore] = useState(true);
  let { logedin } = useContext(apiContext);
  const [guest, setguest] = useState(false);
  const [paymentprocessing, setPaymentProcessing] = useState(false);

  const navigate = useNavigate();
  const { state } = useLocation();
  const goToSignUpPage = () => {
    navigate("/singin");
  };

console.log(state);
let makePayment = () => 
{
   //get data from local storage
   let data =
   {
     id: localStorage.getItem("id"),
     Package: state.props._id,
     name: "default",
     member: memberCount

   }
   //config request for create transection
   let config = {
     method: 'post',
     url: baseUrl + '/package/buypackage',
     headers: {
       'Content-Type': 'application/json'
     },
     withCredentials: true,
     data: data
   };

   axios(config)
     .then(function (response) {
       //get ready for order creation
       let data1 =
       {
         id: data.id,
         ammount: response.data.cost,
         transId: response.data._id
       }

       //configuring request to create order
       let config = {
         method: 'post',
         url: baseUrl + '/order/create',
         headers: {
           'Content-Type': 'application/json',
         },
         withCredentials: true,
         data: data1
       };

       //make requesst to create order

       axios(config)
         .then(function (response) {
           let pass = 
           {
             ammount:response.data.cost,
             orderId:response.data.orderId
           }
           setAmmount(response.data.cost);
           setOrderId(response.data.orderId);
           navigate("/payment");
         })
         .catch(function (error) {
           console.log(error);
         });


     })
     .catch(function (error) {
       console.log(error);
     });
}

  const paymentProcess = () => {
    setPaymentProcessing((prev) => !prev);
    setguest(false);
  };

  const reverseguest = () => {
    setguest((prev) => !prev);
  };

  const add = () => {
    setMemberCount(memberCount + 1);
  };
  const rem = () => {
    if (memberCount !== 1) {
      setMemberCount(memberCount - 1);
    }
  };
  const imgArr = [
    { Img: img1 },
    { Img: img2 },
    { Img: img3 },
    { Img: img4 },
    { Img: img5 },
    { Img: img6 },
    { Img: img7 },
    { Img: img8 },
    { Img: img9 },
    { Img: img10 },
  ];

  let imgtoShow = imgArr.map((img) => {
    return (
      <div className="slide">
        <img className="scrollImg" src={img.Img} alt="detailPgImg" />
      </div>
    );
  });

  return (
    <>
      {paymentprocessing && (
        <div onClick={paymentProcess} className="patment_cardModel">
          <div className="makePaymentBody">
            {" "}
            <h1>Payment is in processing mode</h1>{" "}
            <p>
              Please do not close this window or click the Back button on your
              browser{" "}
            </p>{" "}
          </div>
        </div>
      )}
      <div className="detailPage">
        <h1 className="packageName">{state.props.package_name}</h1>
        <div className="venu">
          <FontAwesomeIcon className="starState" icon={faStar} />
          <p>himachal INDIA</p>
        </div>

        <div className="detailPgImg">
          <div className="containerHeading">
            <h1>famous places in {state.props.package_name}</h1>
          </div>
          <div className="slider">
            <div className="slider_track">{imgtoShow}</div>
          </div>
        </div>

        <div className="famous_booking">
          <div className="AllPlaces">
            <h1 className="famousPLaces">famous places</h1>
            <p className="places">{state.props.main_destinations[0]}</p>
            <p className="places">{state.props.main_destinations[1]}</p>
            <p className="places">{state.props.main_destinations[2]}</p>
            <p className="places">{state.props.main_destinations[3]}</p>
            <p className="places">{state.props.main_destinations[4]}</p>
            <p className="places">{state.props.main_destinations[5]}</p>
          </div>
          <div className="booking_Side">
            <div className="booking_box">
              <p className="booking_price">
                from {state.props.price} <span className="person">/person</span>
              </p>
              <div className="capsule">
                <div className="guest_Container">
                  <h2 onClick={reverseguest}>guests</h2>
                  <div className="date">
                    <p onClick={reverseguest} className="add_date">
                      {memberCount} guest Added
                    </p>
                    <p>
                      {" "}
                      {guest ? (
                        <FontAwesomeIcon
                          onClick={reverseguest}
                          className="starIcon"
                          icon={faArrowDown}
                        />
                      ) : (
                        <FontAwesomeIcon
                          className="starIcon"
                          onClick={reverseguest}
                          icon={faArrowUp}
                        />
                      )}{" "}
                    </p>
                    {guest ? (
                      <div className="guestInfo">
                        <div className="addMember">
                          <div className="member_count">
                            <p className="member">member</p>
                            <div className="countNo">
                              <button
                                className="min sign"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  rem();
                                }}
                              >
                                -
                              </button>
                              <p className="memberNO"> {memberCount}</p>
                              <button
                                className="add sign"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  add();
                                }}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <button className="btn" onClick={reverseguest}>
                            save member
                          </button>
                        </div>
                      </div>
                    ) : (
                      " "
                    )}
                  </div>
                </div>
              </div>
              <div className="inline">
                <span className="selectDA">total Amount -</span>
                <span>{state.props.price * memberCount} Rs</span>
              </div>
              <div>
              </div>
              <button
                className="btn_card"
                onClick={logedin ? makePayment : goToSignUpPage}
              >
                book Now
              </button>
            </div>
          </div>
        </div>

        <div className="aboutState">
          <h3>about {state.props.package_name} </h3>
          <p>
            {readMore
              ? `${state.props.package_desription.substring(0, 200)}...`
              : state.props.package_desription}
            <button onClick={() => setreadMore(!readMore)}>
              {readMore ? "readmore" : `show less`}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default CarDetails;
