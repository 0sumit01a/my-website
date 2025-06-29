import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../styles/TopUniversityPage.module.css";
import image from '../assets/top uni image.svg';
import ApplyForm from "../reuse/Applyform";
import { getUniversities } from "../api/api";
import { generateSlug } from "../utils/slug";
const TopUniversity = () => {
  const [universities, setUniversities] = useState([]);
  const [currentUniName, setCurrentUniName] = useState("");
  const [selectedUniversity, setSelectedUniversity] = useState(null);
  const navigate = useNavigate();

  // Fetch data from backend
  useEffect(() => {
    getUniversities().then(data => {
      setUniversities(data);
      if (data.length > 0) setCurrentUniName(data[0].u_name || "Top University");
    });
  }, []);

  // Change university name every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (universities.length > 0) {
        const randomIndex = Math.floor(Math.random() * universities.length);
        const uni = universities[randomIndex];
        if (uni && uni.u_name) {
          setCurrentUniName(uni.u_name);
        }
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [universities]);

  return (
    <section className={style.topUniversityPage}>
      <div className={style.headerSection}>
        <img src={image} alt="Student" className={style.bannerImg} />
        <div className={style.headerText}>
          <h1>I Want to Study in</h1>
          <h2><span>{currentUniName}</span></h2>
        </div>
      </div>

      <div className={style.universitySection}>
        <h2>Choose From India’s Top Universities</h2>
        <div className={style.cardGrid}>
          {universities.map((univ, index) => (
            <div key={index} className={style.card}>
              <div className={style.imageContainer}>
                <img
                  src={
                    univ.u_imege
                      ? `http://b4l.640.mytemp.website/backend/${univ.u_imege}`
                      : "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  alt={univ.u_name}
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
                <button onClick={() => setSelectedUniversity(univ)} className={style.apply}>
                  Apply Now
                </button>
                <button
                  className={style.know}
                 onClick={() => navigate(`/universities/${generateSlug(univ.u_name, univ.u_id)}`)}
                >
                  Know More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

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
