import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom"

const SectionCatagorize = () => {
  return (
    <div className="flex w-full  bg-gray-900 rounded-lg shadow-md">
      <Carousel
        autoPlay
        showThumbs={false}
        infiniteLoop
        interval={5000}
        transitionTime={500}
        stopOnHover
      >
        <div>
          <img
            src="./imges/mobile-2262928_1920.jpg"
            alt="Category Image 1"
            className="object-cover h-screen w-full"
          />
        </div>
        <div>
          <img
            src="./imges/ios-1091302.jpg"
            alt="Category Image 2"
            className="object-cover h-screen w-full"
          />
        </div>
        <div>
          <img
            src="./imges/man-5932703.jpg"
            alt="Category Image 3"
            className="object-cover h-screen w-full"
          />
        </div>
      </Carousel>
      <div className="flex inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h2 className="text-3xl font-extrabold mb-10 mt-4">Find Your Lost Items From Here</h2>
          <p className="text-lg mt-4 mb-10">Publish Your Lost Item Post Here</p>
          <Link
            to="/Electronic"
            className="mt-10 px-6 py-2 bg-blue-600 rounded-full hover:bg-blue-700 text-white text-sm font-semibold transition duration-300 ease-in-out"
          >
            Explore Now
          </Link>
        </div>
      </div>

    </div>
  );
};

export default SectionCatagorize;
