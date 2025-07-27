import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../styles/TopUniversityPage.module.css";
import image from '../assets/top uni image.svg';
import ApplyForm from "../reuse/Applyform";
import { getUniversities } from "../api/api";
import { generateSlug } from "../utils/slug";

const TopUniversity = () => {
  const [universities, setUniversities] = useState([]);
  const [currentUniName, setCurrentUniName] = useState("Top University");
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const navigate = useNavigate();

  // Fetch universities on mount
  useEffect(() => {
    getUniversities().then((data) => {
      setUniversities(Array.isArray(data) ? data : []);
      if (data.length > 0 && data[0].u_name) {
        setCurrentUniName(data[0].u_name);
      }
    });
  }, []);

  // Update university name every 3s
  useEffect(() => {
    const interval = setInterval(() => {
      if (universities.length > 0) {
        const randomIndex = Math.floor(Math.random() * universities.length);
        const uni = universities[randomIndex];
        if (uni?.u_name) {
          setCurrentUniName(uni.u_name);
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [universities]);

  // Fallback image
  const fallbackImage = "https://placehold.co/300x200?text=No+Image";

  return (
    <section className={style.topUniversityPage}>
      {/* Banner */}
      <div className={style.headerSection}>
        <img src={image} alt="Student" className={style.bannerImg} />
        <div className={style.headerText}>
          <h1>I Want to Study in</h1>
          <h2><span>{currentUniName}</span></h2>
        </div>
      </div>

      {/* University Cards */}
      <div className={style.universitySection}>
        <h2>Choose From India’s Top Universities</h2>
        <div className={style.cardGrid}>
          {universities.map((univ, index) => {
            const rawImage = univ.u_imege;
            const imageUrl = rawImage
              ? rawImage.startsWith("http")
                ? rawImage
                : `https://edunexsys.com/backend/${rawImage}`
              : fallbackImage;

            return (
              <div key={index} className={style.card}>
                <div className={style.imageContainer}>
                  <img
                    src={imageUrl}
                    alt={univ.u_name}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = fallbackImage;
                    }}
                  />
                  <div className={style.cardTitle}>{univ.u_name}</div>
                </div>

                <div className={style.details}>
                  <p>📍 {univ.u_location}</p>
                  <p>📌 {univ.u_date}</p>
                  <p>⭐ {univ.u_type}</p>
                  <p>🛡 {univ.u_approved}</p>
                </div>

                <div className={style.buttons}>
                  <button
                    onClick={() => setSelectedUniversity(univ)}
                    className={style.apply}
                  >
                    Apply Now
                  </button>
                  <button
                    className={style.know}
                    onClick={() =>
                      navigate(`/universities/${generateSlug(univ.u_name, univ.u_id)}`)
                    }
                  >
                    Know More
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Apply Modal */}
      {selectedUniversity && (
        <ApplyForm
          university={selectedUniversity}
          onClose={() => setSelectedUniversity(null)}
        />
      )}
    </section>
  );
};

export default TopUniversity;
