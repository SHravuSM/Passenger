// import React, { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebaseConfig"; // Adjust the import path for your Firebase config
// import Loader from "./Loader";

// export default function Passenger() {
//   const [drivers, setDrivers] = useState([]); // State to hold driver data
//   const [loading, setLoading] = useState(true); // State to show loading indicator
//   const [currentLocation, setCurrentLocation] = useState(null); // Passenger's current location
//   const [error, setError] = useState(null); // State for error messages

//   const MAX_DISTANCE_KM = 20; // Maximum distance to filter drivers

//   // Fetch drivers from Firestore
//   useEffect(() => {
//     const fetchDrivers = async () => {
//       try {
//         const driversCollection = collection(db, "drivers");
//         const querySnapshot = await getDocs(driversCollection);

//         if (!querySnapshot.empty) {
//           const driversList = querySnapshot.docs.map((doc) => ({
//             id: doc.id,
//             ...doc.data(),
//           }));
//           setDrivers(driversList);
//         }
//       } catch (err) {
//         console.error("Error fetching drivers:", err);
//         setError("Unable to fetch drivers. Please try again later.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDrivers();
//   }, []);

//   // Calculate distance between two coordinates using the Haversine formula
//   const calculateDistance = (lat1, lng1, lat2, lng2) => {
//     const toRad = (value) => (value * Math.PI) / 180;
//     const earthRadius = 6371; // Radius of the Earth in kilometers

//     const dLat = toRad(lat2 - lat1);
//     const dLng = toRad(lng2 - lng1);

//     const a =
//       Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//       Math.cos(toRad(lat1)) *
//       Math.cos(toRad(lat2)) *
//       Math.sin(dLng / 2) *
//       Math.sin(dLng / 2);

//     const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//     return earthRadius * c; // Distance in kilometers
//   };

//   // Reverse geocoding to get human-readable location
//   const reverseGeocode = async (latitude, longitude) => {
//     const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
//     const response = await fetch(url);
//     const data = await response.json();
//     return data.display_name || "Unknown location";
//   };

//   // Fetch passenger's current location
//   useEffect(() => {
//     const watchId = navigator.geolocation.watchPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         const locationName = await reverseGeocode(latitude, longitude);

//         setCurrentLocation({
//           lat: latitude,
//           lng: longitude,
//           locationName,
//         });
//       },
//       (err) => {
//         console.error("Error fetching location:", err);
//         setError("Unable to fetch your location. Please enable location services.");
//       },
//       { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
//     );

//     return () => {
//       navigator.geolocation.clearWatch(watchId);
//     };
//   }, []);

//   // Filter drivers within the maximum distance
//   const nearbyDrivers = drivers.filter((driver) => {
//     if (currentLocation && driver.location) {
//       const distance = calculateDistance(
//         currentLocation.lat,
//         currentLocation.lng,
//         driver.location.lat,
//         driver.location.lng
//       );
//       return distance <= MAX_DISTANCE_KM;
//     }
//     return false;
//   });

//   return (
//     <div>
//       {/* Navbar */}
// <nav className="text-white shadow-md py-4 pl-5 pr-2">
//   <div className="flex items-center justify-between">
//     <div className="text-2xl font-bold text-black ">Vihar</div>
//     <div className="relative h-10 w-52 md:w-72 bg-black flex items-center justify-between pr-2 rounded-lg shadow-md">
//       <Loader />
//       {currentLocation ? (
//         <div className="overflow-hidden w-5/6">
//           <div className="whitespace-nowrap animate-scroll">
//             <span className="sm:font-light">{currentLocation.locationName}</span>
//           </div>
//         </div>
//       ) : (
//         <p>Fetching location...</p>
//       )}
//     </div>
//   </div>
// </nav>

//       {/* Available Drivers Section */}
//       <div className="p-6">
//         <h1 className="text-xl font-bold mb-4">Available Drivers</h1>
//         {error ? (
//           <p className="text-red-500">{error}</p>
//         ) : loading ? (
//           <p>Loading drivers...</p>
//         ) : nearbyDrivers.length > 0 ? (
//           <ul className="space-y-4">
//             {nearbyDrivers.map((driver) => {
//               const distance = calculateDistance(
//                 currentLocation.lat,
//                 currentLocation.lng,
//                 driver.location?.lat || 0,
//                 driver.location?.lng || 0
//               ).toFixed(2);

//               return (
//                 <li key={driver.id} className="border p-4 rounded shadow">
//                   <p>
//                     <strong>Name:</strong> {driver.name || "Unknown"}
//                   </p>
//                   <p>
//                     <strong>Email:</strong> {driver.email || "No email provided"}
//                   </p>
//                   <p>
//                     <strong>Location:</strong>{" "}
//                     {driver.location?.locationName || "Location not available"}
//                   </p>
//                   <p>
//                     <strong>Distance from you:</strong> {distance} km
//                   </p>
//                   <p>
//                     <strong>Vehicle:</strong> {driver.vehicleType || "Unknown"}
//                   </p>
//                 </li>
//               );
//             })}
//           </ul>
//         ) : (
//           <p>No drivers available within {MAX_DISTANCE_KM} km.</p>
//         )}
//       </div>
//     </div>
//   );
// }



import React, { useEffect, useState } from "react";
import { addDoc, collection, doc, getDocs, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // Adjust the import path for your Firebase config
import Loader from "./Loader";
import { useAuth } from "../context/AuthContext";

export default function Passenger() {
  const [drivers, setDrivers] = useState([]); // State to hold driver data
  const [loading, setLoading] = useState(true); // State to show loading indicator
  const [currentLocation, setCurrentLocation] = useState(null); // Passenger's current location
  const [error, setError] = useState(null); // State for error messages
  const [rideRequestStatus, setRideRequestStatus] = useState(null);
  const { user } = useAuth();

  const passengerId = user?.uid; // Replace with actual passenger ID

  const MAX_DISTANCE_KM = 20; // Maximum distance to filter drivers

  // Fetch drivers from Firestore
  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const driversCollection = collection(db, "drivers");
        const querySnapshot = await getDocs(driversCollection);

        if (!querySnapshot.empty) {
          const driversList = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDrivers(driversList);
        }
      } catch (err) {
        console.error("Error fetching drivers:", err);
        setError("Unable to fetch drivers. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDrivers();
  }, []);

  // Calculate distance between two coordinates using the Haversine formula
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const earthRadius = 6371; // Radius of the Earth in kilometers

    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c; // Distance in kilometers
  };

  // Reverse geocoding to get human-readable location
  const reverseGeocode = async (latitude, longitude) => {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    return data.display_name || "Unknown location";
  };

  // Fetch passenger's current location
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const locationName = await reverseGeocode(latitude, longitude);

        const newLocation = {
          lat: latitude,
          lng: longitude,
          locationName,
        };

        setCurrentLocation(newLocation);

        if (user != null) {
          const passengerRef = doc(db, "passengers", user?.uid);

          await setDoc(passengerRef, { location: newLocation }, { merge: true })
            .then(() => {
              console.log("Location updated in Firestore");
            })
            .catch((error) => {
              console.error("Error updating location in Firestore:", error);
            });
        }
      },
      (error) => {
        console.error("Error fetching location:", error);
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  console.log(user);
  // Handle "Pick Me Up" button click
  const handlePickMeUp = async (driver) => {
    if (!currentLocation) {
      alert("Your location is not available.");
      return;
    }

    try {
      setPicLoad(true)
      // Add the ride request to Firestore
      const rideRequest = {
        passengerName: user?.displayName, // Replace with the logged-in user's name
        passengerLocation: currentLocation,
        driverId: driver.id,
        driverName: driver.name,
        status: "pending", // Initial status
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "rideRequests"), rideRequest);

      alert(`Request sent to driver ${driver.name}`);
    } catch (error) {
      console.error("Error sending ride request:", error);
      alert("Failed to send ride request. Please try again.");
    }
  };

  // Listen for ride request status changes
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "rideRequests"),
      (snapshot) => {
        const passengerRequest = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .find(
            (request) => request.status !== "pending"
          );

        if (passengerRequest) {
          setRideRequestStatus(passengerRequest.status);
        }
      },
      (error) => {
        console.error("Error fetching ride request status:", error);
      }
    );

    return () => unsubscribe(); // Cleanup listener
  }, [passengerId]);

  // Filter drivers within the maximum distance
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
    <div>
      {/* Navbar */}
      <nav className="text-white shadow-md py-4 pl-5 pr-2">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold text-black ">Vihar</div>
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

      <div className="bg-red-500 max-h-max w-full">
        {/* Notifications */}
        {rideRequestStatus && (
          <div
            className={`p-4 border-2 text-blue-500 text-center mb-4 ${rideRequestStatus === "accepted" ? "bg-green-500" : "bg-red-500"
              }`}
          >

            {rideRequestStatus === "accepted"
              ? "Your ride request was accepted!"
              : "Your ride request was rejected."}
          </div>
        )}
      </div>

      {/* Available Drivers Section */}
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Available Drivers</h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : loading ? (
          <p>Loading drivers...</p>
        ) : nearbyDrivers.length > 0 ? (
          <ul className="space-y-4">
            {nearbyDrivers.map((driver) => {
              const distance = calculateDistance(
                currentLocation.lat,
                currentLocation.lng,
                driver.location?.lat || 0,
                driver.location?.lng || 0
              ).toFixed(2);

              return (
                <li key={driver.id} className={`border p-4 rounded shadow`}>
                  <p>
                    <strong>Name:</strong> {driver.name || "Unknown"}
                  </p>
                  <p>
                    <strong>Email:</strong> {driver.email || "No email provided"}
                  </p>
                  <p>
                    <strong>Location:</strong>{" "}
                    {driver.location?.locationName || "Location not available"}
                  </p>
                  <p>
                    <strong>Distance from you:</strong> {distance} km
                  </p>
                  <p>
                    <strong>Vehicle:</strong> {driver.vehicleType || "Unknown"}
                  </p>
                  <div className="flex w-full h-14 mt-2 p-2 gap-2 items-center justify-around">
                    <button
                      onClick={() => handlePickMeUp(driver)}
                      className="bg-blue-500 w-6/12 h-full text-white rounded hover:bg-blue-600"
                    >
                      Pick Me Up
                    </button>
                    {rideRequestStatus === "accepted"
                      ? <p className="text-center bg-green-500 w-6/12 text-sm rounded-md h-full flex items-center justify-center text-white">Accepted!</p>
                      : <p>Rejected.</p>}
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No drivers available within {MAX_DISTANCE_KM} km.</p>
        )}
      </div>
    </div>
  );
}