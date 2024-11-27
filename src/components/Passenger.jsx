import React, { useEffect, useState } from "react";
import { addDoc, collection, getDocs, onSnapshot, serverTimestamp, setDoc, doc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig"; // Adjust the import path for your Firebase config
import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import DriverList from "./DriverList";

export default function Passenger() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState(null);
  const [rideRequestStatus, setRideRequestStatus] = useState(null);
  const { user } = useAuth();

  const passengerId = user?.uid;
  const MAX_DISTANCE_KM = 100; // Adjusted to a reasonable number

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

  const handlePickMeUp = async (driver) => {
    if (!currentLocation) {
      alert("Your location is not available.");
      return;
    }

    try {
      // Add the ride request to Firestore
      const rideRequest = {
        passengerName: user?.displayName,
        passengerLocation: currentLocation,
        driverId: driver.id,
        driverName: driver.name,
        status: "pending",
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
          .find((request) => request.status !== "pending");

        if (passengerRequest) {
          setRideRequestStatus(passengerRequest.status);
        }
      },
      (error) => {
        console.error("Error fetching ride request status:", error);
      }
    );

    return () => unsubscribe();
  }, [passengerId]);

  // Fetch passenger's current location
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const newLocation = { lat: latitude, lng: longitude, locationName: "Current Location" };
        setCurrentLocation(newLocation);

        if (user != null) {
          const passengerRef = doc(db, "passengers", user?.uid);

          await setDoc(passengerRef, { location: newLocation }, { merge: true });
        }
      },
      (error) => {
        console.error("Error fetching location:", error);
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 5000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar currentLocation={currentLocation} />
      {/* <RideRequestStatus rideRequestStatus={rideRequestStatus} /> */}
      {loading ? (
        <p>Loading drivers...</p>
      ) : (
        <DriverList
          drivers={drivers}
          currentLocation={currentLocation}
          handlePickMeUp={handlePickMeUp}
          MAX_DISTANCE_KM={MAX_DISTANCE_KM}
          rideRequestStatus={rideRequestStatus}
        />
      )}
      {error && <p>{error}</p>}
    </div>
  );
}
