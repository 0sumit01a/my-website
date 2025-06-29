import React, { useState, useEffect } from "react";
import styles from '../styles/TopContainer.module.css';
import { getSliders } from "../api/api";

const TopContainer = () => {
  const [sliders, setSliders] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    getSliders().then(setSliders).catch(console.error);
  }, []);

  useEffect(() => {
    if (!sliders.length) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % sliders.length);
    }, 5000);
    return () => clearInterval(id);
  }, [sliders]);

  if (!sliders.length) return <div>Loading…</div>;

  return (
    <section className={styles.topcon}>
      <div className={styles.sliderContainer}>
        <div
          className={styles.sliderWrapper}
          style={{ transform: `translateX(-${current * 100}vw)` }}
        >
          {sliders.map((s, i) => (
            <section key={s.slider_id} className={styles.section1}>
              <div className={styles.imageBox}>
                <img
                  src={`http://b4l.640.mytemp.website/backend/${s.slider_image}`}
                  alt={s.slider_t1}
                />
              </div>
              <div className={styles.textBox}>
                <div className={styles.heading1}>
                  <h2>{s.slider_t1}</h2>
                </div>
                <div className={styles.heading2}>
                  <h2 className={styles.online}>{s.slider_t2}</h2>
                </div>
                <p className={styles.description}>{s.slider_line}</p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopContainer;
