import React from "react";
import styles from "../styles/UniversityGrid.module.css";
import { useNavigate } from "react-router-dom";
import { generateSlug } from "../utils/slug";

export default function UniversityGrid({ universities, columns = 3 }) {
  const navigate = useNavigate();

  const handleImageError = (e, fallback) => {
    e.target.src = fallback;
  };

  return (
    <div
      className={styles.cardGrid}
      style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {universities.map((univ, index) => (
        <div key={index} className={styles.card}>
          <div className={styles.imageContainer}>
            <img
              src={
                univ.u_imege
                  ? univ.u_imege
                  : "https://placehold.co/300x200?text=No+Image"
              }
              alt={univ.u_name}
              onError={(e) =>
                handleImageError(e, "https://placehold.co/300x200?text=No+Image")
              }
            />

            <div className={styles.logoContainer}>
              <img
                src={
                  univ.u_logo
                    ? univ.u_logo
                    : "https://placehold.co/100x100?text=No+Logo"
                }
                alt={`${univ.u_name} logo`}
                onError={(e) =>
                  handleImageError(e, "https://placehold.co/100x100?text=No+Logo")
                }
              />
            </div>

            <div className={styles.cardTitle}>{univ.u_name}</div>
          </div>

          <div className={styles.details}>
            <p>📍 {univ.u_location}</p>
            <p>📅 {univ.u_date}</p>
            <p>🏫 {univ.u_type}</p>
            <p>✅ {univ.u_approved}</p>
          </div>

          <div className={styles.buttons}>
            <button className={styles.apply}>Apply Now</button>
            <button
              className={styles.know}
              onClick={() =>
                navigate(`/universities/${generateSlug(univ.u_name, univ.u_id)}`)
              }
            >
              Know More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
