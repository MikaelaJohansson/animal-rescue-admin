import { useState, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AppLayout from "./components/AppLayout/AppLayout";
import Animals from "./pages/Animals/Animals";
import AnimalDetails from "./pages/Animals/AnimalDetails/AnimalDetails";
import Adoptions from "./pages/Adoptions/Adoptions";
import AdoptionDetails from "./pages/Adoptions/AdoptionDetails/AdoptionDetails";
import Calendar from "./pages/Calendar/Calendar";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null)

  // Checks if a user is signed in and loads the user's profile

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (user) {

        setIsLoggedIn(true);

        try {
          const userDocumentReference = doc(db, "users", user.uid);
          const userDocumentSnapshot = await getDoc(userDocumentReference);

          if (userDocumentSnapshot.exists()) {

            setUserProfile(userDocumentSnapshot.data());

          } else {

            console.error("No user profile was found in Firestore");
            setUserProfile(null);

          }

        } catch (error) {
          console.error("Could not load the user profile:", error);
          setUserProfile(null);
        }

        
      } else {

        setIsLoggedIn(false);
        setUserProfile(null);

      }

      setIsAuthLoading(false);

    });

    return unsubscribe;

  }, []);


  if (isAuthLoading) {
    return <p>Loading...</p>;
  }


  return (
    <Routes>

      <Route
        path="/" 
        element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login setIsLoggedIn={setIsLoggedIn} />}
      />

      {/* Protected routes */}
      <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>

        {/* AppLayout is responsible for the shared layout */}
        <Route element={<AppLayout userProfile={userProfile} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route path="/animals" element={<Animals />} />
          <Route path="/animals/:animalId" element={<AnimalDetails/>}/>

          <Route path="/adoptions" element={<Adoptions/>}/>
          <Route path="/adoptionDetails/:adoptionId" element={<AdoptionDetails/>}/>

          <Route path="/calendar" element={<Calendar/>} />
        </Route>

      </Route>
      
    </Routes>
  );
}