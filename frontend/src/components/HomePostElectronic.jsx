import { IF } from "../url";

const HomePostElectronic = ({ post }) => {
  return (
    <div className="w-full h-[300px] flex mt-8 space-x-4 bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Left */}
      <div className="w-[35%] relative">
        <img src={IF + post.photo} alt={post.title} className="w-[100%] h-[100%]" />
        <div className="absolute top-0 right-0 bg-blue-500 text-white px-3 py-2 rounded-bl-lg text-sm">
          New
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col w-[65%] p-4">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-800">
          {post.title}
        </h1>

        <div className="flex mb-4 text-sm font-medium text-gray-500 items-center justify-between">
          <div className="flex space-x-2">
            {post.categories?.map((c, i) => (
              <div key={i} className="bg-gray-200 rounded-md p-1">
                {c}
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <p>{new Date(post.updatedAt).toDateString()}</p>
            <p>{new Date(post.updatedAt).toLocaleTimeString()}</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          {post.desc.slice(0, 200)}{" "}
          <a href="#" className="text-blue-500 hover:underline">
            Read more
          </a>
        </p>

        <div className="text-sm font-medium text-gray-800">
          Posted by: {post.username}
        </div>
        <div className="text-sm font-medium text-gray-800">
          Contact Number: {post.contactNo}
        </div>
      </div>
    </div>
  );
};

export default HomePostElectronic;
