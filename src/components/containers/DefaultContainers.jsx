import React, { useState } from "react";
import "./DefaultContainers.css?v=1.0";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { useTheme } from "../../theme/ThemeContext.jsx"; // Adjusted import path
import { Fade } from "react-awesome-reveal";

const DefaultContainers = (props) => {
    const { sectionType } = props;
    const bullets = sectionType?.bodyText?.split(/\r\n|\r|\n/) || [];
    const [showMore, setShowMore] = useState(false);
    const { theme } = useTheme();

    const toggleShowMore = () => setShowMore(!showMore);

    const renderBullets = () => {
        if (bullets.length <= 2) {
            return (
                <ul>
                    {bullets.map((text, index) => (
                        <li key={index}>{text}</li>
                    ))}
                </ul>
            );
        }
        return showMore ? (
            bullets.map((text, index) => (
                <ul key={index}>
                    <li>{text}</li>
                </ul>
            ))
        ) : (
            <ul>
                <li>{bullets[0]}</li>
                <li>{bullets[1]}...</li>
            </ul>
        );
    };

    return (
        <Fade duration={5000} cascade damping={0.5}>
            <div className="container">
                {sectionType?.image && (
                    <img
                        className="image"
                        src={
                            sectionType.image.startsWith("http") 
                                ? sectionType.image 
                                : process.env.PUBLIC_URL + sectionType.image // Handling local image paths
                        }
                        alt="ProjectImage"
                    />
                )}
                <div className="container-content">
                    <h3>{sectionType.title}</h3>
                    {sectionType.bodyText && (
                        <div className="button">
                            {renderBullets()}
                            {bullets.length > 2 && (
                                <Button variant="primary" onClick={toggleShowMore}>
                                    {showMore ? "Show Less" : "Show More"}
                                </Button>
                            )}
                        </div>
                    )}
                    {sectionType.links && (
                        <div className="links">
                            {sectionType.links.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        color: theme.color,
                                        border: `1px solid ${theme.color}`,
                                    }}
                                >
                                    <FontAwesomeIcon
                                        style={{
                                            marginRight: "5px",
                                            color: theme.socialIconBgColor,
                                        }}
                                        icon={faGithub}
                                    />
                                    {link.text}
                                </a>
                            ))}
                        </div>
                    )}
                    <div className="tags-container" style={{ background: theme.tagContainerBg }}>
                        {sectionType?.tags?.map((tag, index) => (
                            <span key={index} className="badge">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                {sectionType.credentialUrl && (
                    <div className="footerUrl" style={{ background: theme.tagContainerBg }}>
                        <a
                            href={sectionType.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: theme.color,
                                border: `1px solid ${theme.color}`,
                            }}
                        >
                            Verify Credential
                        </a>
                    </div>
                )}
            </div>
        </Fade>
    );
};

export default DefaultContainers;
