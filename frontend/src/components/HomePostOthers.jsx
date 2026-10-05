

const HomePostOthers = () => {
  return (
    <div>
      <div className="w-full flex mt-8 space-x-4">
      
      {/*left*/}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img src="./imges/mob1.jpg" alt="" className="w-[170px] h-[200px] flex justify-center items-center"/>
      </div>

      {/*right*/}
      <div className="flex flex-col w-[65%]">
        <h1 className="text-xl font-bold md:mb-2 mb-1 md:text-2xl">
          LEATHER BAG
        </h1>

        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between md:mb-4">
          <p>Back colour leather two side bag</p>

        <div className="flex space-x-2 ">
          <p>16/04/2023</p>
          <p>16.48</p>
        </div>
        
        </div>
        <p className="text-sm md:text-lg">Lost my two side, Black colour, at Central Station, Badulla, on June 15, 2023.</p>
        <p className="text-sm md:text-m">Posted by : Sayanara Ranasinha.</p>
      </div>
      
    </div>
    </div>
  )
}

export default HomePostOthers
