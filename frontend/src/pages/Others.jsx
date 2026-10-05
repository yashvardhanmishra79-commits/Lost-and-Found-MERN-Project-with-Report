import HomePostOthers from "../components/HomePostOthers.jsx"
import {IoArrowBackSharp} from  'react-icons/io5'
import { Link } from "react-router-dom"

const Others = () => {
  return (
    <div>
       <HomePostOthers/>
       <h1>other</h1>
       <div className="absolute top-10 left-10 flex items-center space-x-1">
        <p><Link to="/"><IoArrowBackSharp/></Link></p>
        </div>
    </div>
  )
}

export default Others
