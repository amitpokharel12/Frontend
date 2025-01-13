import React, { useState, useEffect } from "react";
import Header from "./Header";
import endpoints from "../constants/endpoints";
import FallbackSpinner from "./FallbackSpinner";
import DefaultContainers from "./containers/DefaultContainers";
import { useTheme } from "../theme/ThemeContext.jsx";
import { darkTheme } from "../theme/theme.js";

const Certifications = (props) => {
    const [data, setData] = useState(null);
    const { theme } = useTheme();
    const { header } = props;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(endpoints.certifications, { method: "GET" });
                const res = await response.json();
                // Debugging fetched data
                console.log("Fetched Certifications Data:", res);
                setData(res);
            } catch (err) {
                console.error("Certifications fetch error", err);
            }
        };
        fetchData();
    }, []);

    return data ? (
        <div id="/certifications">
            {/* Dynamic Background */}
            <div id={theme === darkTheme ? "stars" : ""} />
            <div id={theme === darkTheme ? "stars2" : ""} />
            <div id={theme === darkTheme ? "stars3" : ""} />
            {/* Header */}
            <Header title={header} />
            {/* Content */}
            <div className="parent-container">
                {data.certifications.map((cert, index) => (
                    <DefaultContainers key={index} sectionType={cert} />
                ))}
            </div>
        </div>
    ) : (
        <FallbackSpinner />
    );
};

export default Certifications;
