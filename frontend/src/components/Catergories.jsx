import { Link } from "react-router-dom"


const Catergories = () => {
  return (
    <div className="items-center md:px-[200px] py-10">

      <div className="w-[80%] items-center justify-center  ml-56 pr-52"> 
        <Link to ="/Electronic"><button className="w-full mt-10 px-4 py-4 text-3xl font-bold text-white bg-black rounded-xl
         hover:bg-gray-300 hover:text-black">Click Here To Continue !</button></Link>

         <p>Find Your Lost Items in Public Places Just a Click</p>

      </div>
      

    </div>
       
)
  }
export default Catergories
