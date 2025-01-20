import React, { useState, useEffect } from "react"; 
import endpoints from "../constants/endpoints";
import FallbackSpinner from "./FallbackSpinner";
import Typewriter from "typewriter-effect";
import { Reveal, Fade } from "react-awesome-reveal";

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(endpoints.home, { method: "GET" });
        const res = await response.json();
        setData(res);
      } catch (err) {
        console.error("Home fetch Error", err);
      }
    };
    fetchData();
  }, []);

  return data ? (
    <div id="/" className="home">
      {/* Circular Image Section */}
      <Reveal duration={3000} triggerOnce>
        <div className="homeimage">
          <img
            src="https://github.com/amitpokharel12/Frontend/blob/master/472755462_1252446982708743_705169505450762670_n.jpg?raw=true"
            alt="ProfilePic"
            style={{
              width: "300px",
              height: "300px",
              borderRadius: "50%", // Perfect circle
              objectFit: "cover",
            }}
          />
        </div>
      </Reveal>

      {/* Text Section */}
      <Fade direction="right" duration={3000} cascade damping={1e3} triggerOnce>
        <div className="hometext">
          <h1 className="name">{data.name}</h1>
          <div className="textanimation">
            <h2 className="im">I'm</h2>
            <span>&nbsp;</span>
            <Typewriter
              options={{
                strings: data.roles,
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <div className="home-paragraph">
            <p>{data.paragraph}</p>
          </div>
        </div>
      </Fade>
    </div>
  ) : (
    <FallbackSpinner />
  );
};

export default Home;
