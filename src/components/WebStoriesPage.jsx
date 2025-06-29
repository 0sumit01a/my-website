import React, { useState } from "react";
import styles from "../styles/WebStories.module.css";
import storiesData from "../data/stories.json";
import { Link } from "react-router-dom";

const WebStoriesPage = () => {
  const [selectedId, setSelectedId] = useState(null); 

  const handleClick = (id) => {
    setSelectedId(id);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Web Stories</h2>
      <div className={styles.grid}>
        {storiesData.map((story) => (
          <Link
            key={story.id}
            to={`/web-stories/${story.id}`}
            className={`${styles.card} ${selectedId === story.id ? styles.activeCard : ""}`}
            onClick={() => handleClick(story.id)}
          >
            <img src={story.thumbnail} alt={story.title} />
            <p>{story.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default WebStoriesPage;
