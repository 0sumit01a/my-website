import React, { useEffect, useState } from "react";
import styles from "../styles/AllUniversities.module.css";
import UniversityGrid from "../reuse/UniversityGrid";
import { getUniversities } from "../api/api";

export default function AllUniversities() {
  const [universities, setUniversities] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    getUniversities().then(data => setUniversities(data));
  }, []);

  useEffect(() => {
    if (universities.length === 0) return;
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % universities.length);
        setFade(true);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, [universities]);

  return (
    <main>
      <div className={styles.navSpacer}></div>
      <div className={styles.topDiv}>
        <div className={styles.topLeft}>
          <img
            src="https://myonlinecollege.in/_next/static/media/university-banner.9fd9ecdb.svg"
            alt="Student"
            className={styles.studentImg}
          />
        </div>
        <div className={styles.topRight}>
          <h1 className={styles.headOne}>I Want to Study in</h1>
          <div className={styles.headTwo}>
            <span className={fade ? styles.fadeIn : styles.fadeOut}>
              {universities[currentIndex]?.u_name || "Top University"}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.mainDiv}>
        <h1 className={styles.sectionTitle}>Choose From India’s Top Universities</h1>
        <p className={styles.description}>
          The best university aligns with your aspirations, fueling your intellectual fire...
        </p>
        <div className={styles.UGrid}>
          <UniversityGrid universities={universities} columns={3} />
        </div>
      </div>
    </main>
  );
}
