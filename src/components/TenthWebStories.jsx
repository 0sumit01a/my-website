import React from "react";
import style from '../styles/TenthWebStories.module.css';
import storiesData from "../data/stories.json";

const TenthWebStories = () => {
  const topFiveStories = storiesData.slice(0, 5); 

  return (
    <section className={style.webStories}>
      <div className={style.header}>
        <h1>Web Stories</h1>
      </div>

      <div className={style.storiesGrid}>
        <ul>
          {topFiveStories.map((story, index) => (
            <li key={index}>
              <a href={`/web-stories/${story.id}`}>
                <div className={style.cardImage}>
                  <img src={story.thumbnail} alt={story.title} />
                </div>
                <div className={style.cardTitle}>
                  <h4>{story.title}</h4>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className={style.viewAllBtnWrapper}>
        <a href="/web-stories" className={style.viewAllBtn}>
          View All Webstories
        </a>
      </div>
    </section>
  );
};

export default TenthWebStories;
