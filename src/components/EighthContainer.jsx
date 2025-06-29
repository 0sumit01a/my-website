import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../api/DataContext";
import style from "../styles/EightContainer.module.css";
import { generateSlug } from "../utils/slug";

const EighthContainer = () => {
  const navigate = useNavigate();
  const { universities } = useContext(DataContext);

  return (
    <section className={style.eighthContainer}>
      <div className={style.textBlock}>
        <h1>Choose from Accredited and Globally Recognized Universities</h1>
        <p>
          All the Universities featured on MyOnlineCollege are not only UGC
          recognised but authorised by UGC to offer online programs. So when you
          choose a program on MyOnlineCollege you can do so without worry.
          Whether you are a seasoned professional or an aspiring student, you
          will find the path to your academic and career success here!
        </p>
      </div>
      <div>
        <ul className={style.universityGrid}>
          {universities.map((university, index) => (
            <li
              key={index}
              className={style.universityCard}
              onClick={() =>
                navigate(`/universities/${generateSlug(university.u_name, university.u_id)}`)
              }
            >
              <img
                src={
                  university.u_imege
                    ? `http://b4l.640.mytemp.website/backend/${university.u_imege}`
                    : "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={university.u_name}
                className={style.universityImage}
              />
              <span>{university.u_program?.split(",").length || 0} Courses</span>
              <h4>{university.u_name}</h4>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default EighthContainer;
