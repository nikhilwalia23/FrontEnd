import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiContext } from "../../ContextApi/ContextProvider";
import "./Card.css";
let Card = (props) => {
  const navigate = useNavigate();
  let [cartadd, setCartadd] = useState(false);
  let [memberCount, setMemberCount] = useState(1);
  let { cart, setCart } = useContext(apiContext);
  //Function to increase and decrese member count
  // const add = () => {
  //   setMemberCount(memberCount + 1);
  // };
  // const rem = () => {
  //   if (memberCount !== 1) {
  //     setMemberCount(memberCount - 1);
  //   }
  // };
  //Add and remove from Cart
  const cartManupulation = () => {
    // console.log(cartadd);
    if (!cartadd) {
      setCart([...cart, { id: props.id, count: memberCount }]);
      setCartadd(!cartadd);
    } else {
      let newcart = cart.filter((ele) => {
        return ele.id !== props.id;
      });
      setCart(newcart);
      setCartadd(!cartadd);
    }
  };
  console.log(cart, "cart");

  const handlePage = () => {
    navigate(`/cardetails`, { state: { props } });
  };
  return (
    <div>
      <div className="packagecard">
        <img className="packageimage" alt="link" src={props.link} />
        <div className="card__text">
          <h3 className="cardName">{props.packageName}</h3>
          <p className="card_destination">{props.main_destination}</p>
          <h6 className="packagePrice">{props.price} / person </h6>
          {/* <div className="member_count">
            <button
              className="min sign"
              onClick={(e) => {
                e.stopPropagation();
                rem();
              }}
            >
              -
            </button>
            <p>Member: {memberCount}</p>
            <button
              className="add sign "
              onClick={(e) => {
                e.stopPropagation();
                add();
              }}
            >
              +
            </button>
          </div> */}
         
            <button className="buypackage">book Now</button>
            <button className="addtoCartpackage" onClick={cartManupulation}>
              {!cartadd ? "Add to Cart" : "Remove from cart"}
            </button>
          
          <div className="readMore">
            <button key={props.id} onClick={handlePage} className="readMoreBtn">
              {props.description}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Card;
