import React from "react";
import { FaCar, FaMapMarkerAlt } from "react-icons/fa";

// Helper function to calculate distance between two geographic coordinates
const calculateDistance = (lat1, lng1, lat2, lng2) => {
  const toRad = (value) => (value * Math.PI) / 180;
  const earthRadius = 6371; // Earth's radius in kilometers

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c; // Returns the distance in kilometers
};

const DriverList = ({ drivers, currentLocation, handlePickMeUp, MAX_DISTANCE_KM, rideRequestStatus }) => {
  // Filter drivers that are within the specified max distance
  const nearbyDrivers = drivers.filter((driver) => {
    if (currentLocation && driver.location) {
      const distance = calculateDistance(
        currentLocation.lat,
        currentLocation.lng,
        driver.location.lat,
        driver.location.lng
      );
      return distance <= MAX_DISTANCE_KM;
    }
    return false;
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Available Drivers</h1>
      {nearbyDrivers.length > 0 ? (
        <ul className="space-y-6">
          {nearbyDrivers.map((driver) => {
            const distance = calculateDistance(
              currentLocation.lat,
              currentLocation.lng,
              driver.location.lat,
              driver.location.lng
            ).toFixed(2); // Calculate distance for each driver

            return (
              <li
                key={driver.id}
                className="relative bg-gradient-to-br from-white to-gray-100 border border-gray-300 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Distance in top-right corner */}
                <div className="absolute top-4 right-4 bg-indigo-600 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                  {distance} km
                </div>

                {/* Decorative Accents */}
                <div className="absolute -top-8 -right-8 w-24 h-24 bg-indigo-400 rounded-full opacity-20 blur-xl"></div>
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-teal-300 rounded-full opacity-20 blur-xl"></div>

                {/* Header */}
                <div className="relative z-10 mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">{driver.name || "Unknown Driver"}</h3>
                </div>

                {/* Driver Information */}
                <div className="relative z-10 space-y-3">
                  <div className="flex items-center text-gray-700">
                    <FaCar className="text-indigo-500 mr-2" />
                    <span className="font-semibold text-gray-800">Vehicle Type:</span>
                    <span className="ml-2 text-gray-900">{driver.vehicleType || "Unknown"}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <FaMapMarkerAlt className="text-indigo-500 mr-2 text-3xl" />
                    <span className="font-semibold text-gray-800">Location:</span>
                    <span className="ml-2">{driver.location?.locationName || "Location not available"}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="relative z-10 mt-6 flex justify-between items-center">
                  <button
                    onClick={() => handlePickMeUp(driver)}
                    className="flex-1 bg-red-400 text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-gradient-to-r hover:from-green-600 hover:to-teal-500 hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 mr-3"
                  >
                    Pick Me
                  </button>
                  {rideRequestStatus === "accepted" ? (
                    <p className="flex-1 bg-black text-white font-semibold py-3 px-6 rounded-lg shadow-lg text-center">
                      Accepted!
                    </p>
                  ) : rideRequestStatus === "rejected" ? (
                    <p className="flex-1 text-red-600 font-semibold py-3 px-6 rounded-lg shadow-lg text-center">
                      Rejected
                    </p>
                  ) : (
                    <p className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg text-center">
                      Waiting for Response
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No drivers available within {MAX_DISTANCE_KM} km.</p>
      )}
    </div>
  );
};

export default DriverList;
