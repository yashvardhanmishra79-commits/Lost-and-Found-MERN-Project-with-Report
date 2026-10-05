/* eslint-disable react/prop-types */
import { IF } from '../url';

const ProfilePosts = ({ p }) => {
  return (
    <div className="w-full flex mt-8 space-x-4 rounded-lg overflow-hidden bg-white shadow-lg">
      {/* Left */}
      <div className="w-[35%] h-[200px] flex justify-center items-center">
        <img src={IF + p.photo} alt={p.title} className="h-[70%] w-[50%] " />
      </div>
      {/* Right */}
      <div className="flex flex-col w-[65%] p-4">
        <h1 className="text-xl font-bold md:text-2xl text-gray-800 mb-1">
          {p.title}
        </h1>
        <div className="flex mb-2 text-sm font-semibold text-gray-500 items-center justify-between">
          <p>@{p.username}</p>
          <div className="flex space-x-2">
            <p>{new Date(p.updatedAt).toDateString()}</p>
            <p>{new Date(p.updatedAt).toLocaleTimeString()}</p>
          </div>
        </div>
        <p className="text-sm md:text-md text-gray-600">
          {p.desc.slice(0, 200)} ...<span className="text-blue-600 cursor-pointer hover:underline">Read more</span>
        </p>
      </div>
    </div>
  );
};

export default ProfilePosts;
