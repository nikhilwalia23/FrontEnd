import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../componets/small_components/Card.js";
 import Advanture from "./advantures.js";
import Service from "./small_components/service.js";
import "./home.css";
import Loading from "./small_components/loading" 
import Banner from "./small_components/Topbanner.js";
import Gallary from "./small_components/gallary";

import { baseUrl } from "../BackendApi/auth.js";

function temp(product,index) {
  return (
    <Card {...product} index={index}  />
  );
}
let Home = () => {

  console.log(process.env);
  const [loading, setloading] =useState(false);
  let [products,setProucts]=useState([]);
  console.log(process.env.NODE_ENV);
  useEffect(() => {
    //Fectching Products Data from Backend
    var config = {
      method: 'get',
      url: baseUrl+'/package/showallpackage',
      headers: {}
    };
  
    axios(config)
      .then(function (response) {
      setProucts(response.data);
      setloading(false);
      // for(let i=0;i<products.length;i++)
      // {
      //   setProucts([...products,products[i].link=img1])
      // }
      })
      .catch(function (error) {
        setloading(false);
        console.log(error);
      });
  }, []);

  if(loading){
    return(
      <main>
<Loading/>
      </main>
    )
  }

  return (
    <main>
    <div className="home-container">
      <Banner />
      {/* Top Packages currently Trending */}
      <div className="package-top">
        <h3>Top Trending Packages</h3>
      </div>
      <div className="listed-packages">{products.map(temp)}</div>

      {/* Advanture page */}
      <Advanture/>

      {/* gallary page  */}
      <Gallary />
      {/* service page */}
      <Service />
    </div>
    </main>
  );
};
export default Home;
