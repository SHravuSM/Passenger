import React from "react";
import Loader from "./Loader";

const Navbar = ({ currentLocation }) => {
  return (
    <nav className="text-white shadow-md py-4 pl-5 pr-2">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold text-black">Vihar</div>
        <div className="relative h-10 w-52 md:w-72 bg-black flex items-center justify-between pr-2 rounded-lg shadow-md">
          <Loader />
          {currentLocation ? (
            <div className="overflow-hidden w-5/6">
              <div className="whitespace-nowrap animate-scroll">
                <span className="sm:font-light">{currentLocation.locationName}</span>
              </div>
            </div>
          ) : (
            <p>Fetching location...</p>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;