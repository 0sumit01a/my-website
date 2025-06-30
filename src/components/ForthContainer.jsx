import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "../styles/ForthContainer.module.css";
import { getCategories } from "../api/api";
import { generateSlug } from "../utils/slug";

const ForthContainer = () => {
  const [active, setActive] = useState("post");
  const [cats, setCats] = useState([]);

  useEffect(() => {
    getCategories().then(setCats).catch(console.error);
  }, []);

  const filtered = cats.filter((c) =>
    active === "post"
      ? c.catg_type?.toLowerCase() === "post graduate"
      : c.catg_type?.toLowerCase() === "under graduate" || c.catg_type?.toLowerCase() === "ug"
  );

  return (
    <section className={style.forthContainer}>
      <h1 className={style.heading}>Choose Your Online Program</h1>

      <div className={style.heading2}>
        <div
          className={active === "post" ? style.active : ""}
          onClick={() => setActive("post")}
        >
          Post Graduate
        </div>
        <div
          className={active === "under" ? style.active : ""}
          onClick={() => setActive("under")}
        >
          Under Graduate
        </div>
      </div>

      <div className={style.courseContainer}>
        {!filtered.length && <p>No programs found.</p>}
        {filtered.map((cat) => (
          <Link
            key={cat.catg_id}
            to={`/${active === "post" ? "post-graduate" : "under-graduate"}/${generateSlug(cat.catg_name, cat.catg_id)}`}
            className={style.innerCourseContainer}
          >
            <span className={style.durationTag}>{cat.catg_type}</span>
            <div className={style.courseContent}>
              <p className={style.courseTitle}>{cat.catg_name}</p>
              <p className={style.coursePrice}>{cat.catg_heading}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ForthContainer;
