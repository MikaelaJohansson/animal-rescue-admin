import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import AppLayout from "./components/AppLayout/AppLayout";
import Animals from "./pages/Animals/Animals";

export default function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return unsubscribe;
  }, []);


  return (
    <Routes>

      <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute isLoggedIn={isLoggedIn}/>}>
        {/* AppLayout, responsible for the layout */}
        <Route element={<AppLayout/>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/animals" element={<Animals/>}/>
        </Route>
      </Route>

    </Routes>
  );
}