import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Home from './components/Home';
import { getNewExpirationTime, accessTokenText, refreshTokenText, expirationTimeText } from './Util/token-util';

function App() {

  useEffect(() => {
    getTokensFromQueryParams();
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const GererateGoogleAuthLink = async () => {
    try {
      const request = await fetch(
        "http://localhost:8080/generateAuthLink",
        { method: "POST" }
      );
      const response = await request.json();
      window.location.href = response.url;
    } catch (error) {
      console.log(error.message);
    }
  };

  const getTokensFromQueryParams = () => {
    const query = new URLSearchParams(window.location.search);
    const accessToken = query.get(accessTokenText);
    const refreshToken = query.get(refreshTokenText);
    const expirationTime = getNewExpirationTime();
    if (accessToken && refreshToken) {
      storeTokensAndExpirationTime(accessToken, refreshToken, expirationTime);
      setIsLoggedIn(true);
    }
  };

  const storeTokensAndExpirationTime = async (accessToken, refreshToken, expirationTime) => {
    sessionStorage.setItem(accessTokenText, accessToken);
    sessionStorage.setItem(refreshTokenText, refreshToken);
    sessionStorage.setItem(expirationTimeText, expirationTime);
  };

  const signOut = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <div className="App">

      <div className="header-container">
        <div className="title-txt"><h1>Event scheduler</h1></div>
        <div className="sign-out-btn">{isLoggedIn ? (<Button variant="contained" color="error" if onClick={signOut}>Sign Out</Button>) : (<span></span>)}</div>
      </div>

      {!isLoggedIn ?
        (
          <Button variant="contained" color="primary" onClick={GererateGoogleAuthLink}>Sign in with Google</Button>
        ) :
        (
          <Home />
        )}

    </div>
  );
}

export default App;