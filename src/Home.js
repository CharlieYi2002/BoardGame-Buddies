import React, {useEffect } from "react";
import "./styles.css";
import Slideshow from "./Slideshow";

export default function Home() {
  useEffect(() => {
    document.title = "Home";
  }, []);
  return (
    <div>
      <Slideshow />
      <div className="text">
        <h2>About</h2>
        <p>
          BoardGame Buddies is your boardgame night companion. You can log your
          boardgame nights with to keep track of winners and even see statistics on it later!
        </p>
        <p>
          New to boardgames? Navigate to our games tab to check out our top
          picks!
        </p>
      </div>
    </div>
  );
}
