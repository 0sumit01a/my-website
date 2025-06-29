import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "../styles/SixthContainer.module.css";
import ApplyForm from "../reuse/Applyform";
import { getUniversities } from "../api/api";
import { generateSlug } from "../utils/slug";

const SixthContainer = () => {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  useEffect(() => {
    getUniversities().then(data => setUniversities(data));
  }, []);

  return (
    <section className={style.sixthContainer}>
      <div className={style.header}>
        <h1>Find your perfect University</h1>
        <p>
          Not sure what program to select? Here you have the opportunity to select the university
          that best matches your interests, goals, and aspirations. By choosing your preferred
          university, you can access the courses, facilities, and support that will help you succeed
          in your academic journey.
        </p>
      </div>

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
              <div className={style.logoContainer}>
                <img
                  src={
                    univ.u_logo
                      ? `http://b4l.640.mytemp.website/backend/${univ.u_logo}`
                      : "https://via.placeholder.com/100x100?text=No+Logo"
                  }
                  alt="logo"
                />
              </div>
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
                className={style.apply}
                onClick={() => setSelectedUniversity(univ)}
              >
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

      <div className={style.btn} onClick={() => navigate("/universities")}>
        View All Universities
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

export default SixthContainer;
