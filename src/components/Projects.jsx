import React, { useState, useEffect } from "react";
import Header from "./Header";
import endpoints from "../constants/endpoints";
import FallbackSpinner from "./FallbackSpinner";
import DefaultContainers from "./containers/DefaultContainers";
import { useTheme } from '../theme/ThemeContext.jsx';
import { darkTheme } from '../theme/theme.js';

const Projects = (props) => {
    const [data, setData] = useState(null);
    const { theme } = useTheme();
    const { header } = props;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(endpoints.projects, { method: "GET" });
                const res = await response.json();
                setData(res);
            } catch (err) {
                console.error("Projects fetch Error", err);
            }
        };
        fetchData();
    }, []);

    return (
        data ? (
            <div id="/projects">
                <div id={theme === darkTheme ? 'stars' : ''} />
                <div id={theme === darkTheme ? 'stars2' : ''} />
                <div id={theme === darkTheme ? 'stars3' : ''} />
                <Header title={header} />
                <div className="parent-container">
                    {data.projects.map((project, index) => (
                        <div key={index}>
                            {/* Render Video if available */}
                            {project.videoUrl && (
                                <div className="video-container">
                                    <iframe
                                        width="320"
                                        height="300"
                                        src={project.videoUrl}
                                        title={project.title}
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </div>
                            )}

                            {/* Render Project Details Below the Video */}
                            <DefaultContainers sectionType={project} />
                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <FallbackSpinner />
        )
    );
};

export default Projects;
