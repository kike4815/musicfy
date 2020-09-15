import React, { useState } from "react";
import firebase from "./utils/firebase";
import "firebase/auth";
import Auth from "./pages/Auth";
import { ToastContainer } from "react-toastify";
import LoggedLayout from "./layouts/LoggedLayout";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reloadApp, setReloadApp] = useState(false);

  firebase.auth().onAuthStateChanged((currentUser) => {
    if (!currentUser?.emailVerified) {
      firebase.auth().signOut();
      setUser(null);
    } else {
      setUser(currentUser);
    }
    setIsLoading(false);
  });

  if (isLoading) {
    return null;
  }

  return (
    <>
      {!user ? (
        <Auth />
      ) : (
        <LoggedLayout user={user} setReloadApp={setReloadApp} />
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        rtl={false}
        pauseOnHover={false}
        closeOnClick
        hideProgressBar
        newestOnTop
        pauseOnVisibilityChange
        draggable
      />
    </>
  );
}

export default App;
