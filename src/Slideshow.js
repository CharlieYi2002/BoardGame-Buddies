import React from "react";
import "./styles.css";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

const Slideshow = () => {

  return (
    <Slide
      autoplay={true}
      onChange={function noRefCheck() {}}
      onStartChange={function noRefCheck() {}}
    >
      <div className="each-slide-effect">
        <div
          style={{
            backgroundImage:
              "url(https://www.happierhuman.com/wp-content/uploads/2020/10/Best-Board-Games-at-Night.jpg)",
          }}
        >
          <span>Log boardgame nights!</span>
        </div>
      </div>
      <div className="each-slide-effect">
        <div
          style={{
            backgroundImage:
              "url(https://www.usatoday.com/gcdn/media/2021/04/01/USATODAY/usatsports/Reviewed.com-RvEW-27144-boardgames.jpg)",
          }}
        >
          <span>Keep track of winners!</span>
        </div>
      </div>
      <div className="each-slide-effect">
        <div
          style={{
            backgroundImage:
              "url(https://assetsio.reedpopcdn.com/board-game-friends-playing-table-sofa.jpeg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp)",
          }}
        >
          <span>Explore New Games!</span>
        </div>
      </div>
    </Slide>
  );
};

export default Slideshow;
