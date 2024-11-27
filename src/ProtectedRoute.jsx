// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebase";

// const ProtectedRoute = ({ children, role }) => {
//   const { user, loading } = useAuth();
//   const [userRole, setUserRole] = useState(null);

//   useEffect(() => {
//     const fetchRole = async () => {
//       if (user) {
//         const userRef = doc(db, "users", user.uid);
//         const userSnapshot = await getDoc(userRef);
//         if (userSnapshot.exists()) {
//           setUserRole(userSnapshot.data().role);
//         }
//       }
//     };
//     fetchRole();
//   }, [user]);

//   if (loading || userRole === null) return <p>Loading...</p>;

//   if (!user) return <Navigate to="/login" />;
//   if (userRole !== role) return <Navigate to="/unauthorized" />;

//   return children;
// };

// export default ProtectedRoute;