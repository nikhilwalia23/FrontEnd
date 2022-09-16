import {useContext, useEffect} from 'react'
import Card from "../componets/small_components/Card.js"
import { apiContext } from '../ContextApi/ContextProvider.js';
import img1 from "../static/images/1.webp"
import "./home.css"
import Banner from './small_components/Topbanner.js';
let main_destination=["MechlodeGanj","Bhagsu Nag","BrjeshWari Temple","Naddi"];
let products=[
   {packageName:"Him Darshan",id:"1",price:"5600",link:img1,main_destination:main_destination},
   {packageName:"Shimla Kuffri",id:"2",price:"6600",link:img1,main_destination:main_destination},
   {packageName:"Kullu Manali", id:"3",price:"7600",link:img1,main_destination:main_destination},
   {packageName:"Dharmshala", id:"4",price:"8000",link:img1,main_destination:main_destination},
   {packageName:"Darjling Bharmor", id:"5",price:"2600",link:img1,main_destination:main_destination},
]


function temp(product)
{
   return  <Card id ={product.id} price={product.price} link={product.link} main_destination={product.main_destination} packageName={product.packageName} description="just checking "></Card>
}

let Home = () =>  
{
   const {cart,setCart} = useContext(apiContext);
   return (<div>
   <Banner/>
   {/* Top Packages currently Trending */}
   <div className="package-top">
      <h3>Top Trending Packages</h3>
   </div>
  <div className="listed-packages">
   {products.map(temp)}
  </div>


   </div>
   );
};
export default Home;