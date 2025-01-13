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
            src="https://scontent.fktm21-1.fna.fbcdn.net/v/t39.30808-6/472755462_1252446982708743_705169505450762670_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_ohc=ij7_8MxwzmMQ7kNvgHazPA0&_nc_zt=23&_nc_ht=scontent.fktm21-1.fna&_nc_gid=A4yrqEPddWBzI6XqCwS7AKR&oh=00_AYBkSTSCLCC3kLebVEZBVHnJ1N-HOoJgujzGaNB4pMOHaQ&oe=67897B06"
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
