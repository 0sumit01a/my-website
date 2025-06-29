import React, { useState, useEffect } from "react";
import style from "../styles/CompareUniversityPage.module.css";
import defaultLogo from "../assets/university logo.png";
import courselogo from "../assets/course logo.jpeg";
import { getCategories, getUniversities, getUniversityMap } from "../api/api";

const CompareUniversityPage = () => {
  const [categories, setCategories] = useState([]);
  const [universities, setUniversities] = useState([]);
  const [universityMap, setUniversityMap] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [filteredUniversities, setFilteredUniversities] = useState([]);
  const [selectedUniversities, setSelectedUniversities] = useState(["", "", ""]);
  const [showComparison, setShowComparison] = useState(false);

  useEffect(() => {
    getCategories().then(setCategories);
    getUniversities().then(setUniversities);
    getUniversityMap().then(setUniversityMap);
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      setFilteredUniversities([]);
      return;
    }

    // Get university IDs that offer this category
    const mappedIds = universityMap
      .filter((map) => map.catg_id === selectedCategory)
      .map((m) => m.u_id);

    const filtered = universities.filter((uni) => mappedIds.includes(uni.u_id));
    setFilteredUniversities(filtered);
    setSelectedUniversities(["", "", ""]);
    setShowComparison(false);
  }, [selectedCategory, universityMap, universities]);

  const handleUniversityChange = (index, value) => {
    const newSelection = [...selectedUniversities];
    newSelection[index] = value;
    setSelectedUniversities(newSelection);
  };

  const renderDetailsRow = (label, key) => (
    <tr>
      <td className={style.label}>{label}</td>
      {selectedUniversities.map((id, i) => {
        const uni = universities.find((u) => u.u_id === id);
        return <td key={i}>{uni ? uni[key] : ""}</td>;
      })}
    </tr>
  );

  const renderSpecializationRow = () => (
    <tr>
      <td className={style.label}>Specialization</td>
      {selectedUniversities.map((id, i) => {
        const uni = universities.find((u) => u.u_id === id);
        const specs = uni?.u_program?.split(",").map((p) => p.trim()) || [];
        return (
          <td key={i}>
            <ul>
              {specs.map((spec, j) => (
                <li key={j}>{spec}</li>
              ))}
            </ul>
          </td>
        );
      })}
    </tr>
  );

  return (
    <section className={style.comparePage}>
      <div className={style.header}>
        <h1>
          Compare Universities <br /> & Choose Best Fit For You
        </h1>
        <p>
          Discover your ideal university and explore a wide range of factors such as
          academic programs, faculty expertise, campus culture, and facilities.
        </p>
      </div>

      <div className={style.cardContainer}>
        <div className={style.card}>
          <img src={courselogo} alt="Course" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="" disabled>Select Category</option>
            {categories.map((cat) => (
              <option key={cat.catg_id} value={cat.catg_id}>
                {cat.catg_name}
              </option>
            ))}
          </select>
        </div>

        {selectedUniversities.map((id, i) => (
          <div className={style.card} key={i}>
            <img
              src={
                universities.find((u) => u.u_id === id)?.u_logo
                  ? `http://b4l.640.mytemp.website/backend/${universities.find((u) => u.u_id === id).u_logo}`
                  : defaultLogo
              }
              alt="University"
            />
            <select
              value={id}
              onChange={(e) => handleUniversityChange(i, e.target.value)}
              disabled={!selectedCategory}
            >
              <option value="" disabled>Select University</option>
              {filteredUniversities.map((uni) => (
                <option key={uni.u_id} value={uni.u_id}>
                  {uni.u_name}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>

      {!showComparison && (
        <div className={style.buttonContainer}>
          <button
            className={style.compareBtn}
            onClick={() => setShowComparison(true)}
            disabled={selectedUniversities.every((id) => id === "")}
          >
            Compare Now
          </button>
        </div>
      )}

      {showComparison && (
        <div className={style.tableWrapper}>
          <table className={style.compareTable}>
            <thead>
              <tr>
                <th></th>
                {selectedUniversities.map((id, i) => {
                  const uni = universities.find((u) => u.u_id === id);
                  return <th key={i}>{uni ? uni.u_name : ""}</th>;
                })}
              </tr>
            </thead>
            <tbody>
              {renderDetailsRow("📍 Location", "u_location")}
              {renderDetailsRow("Established Year", "u_date")}
              {renderDetailsRow("✅ Approvals", "u_approved")}
              {renderDetailsRow("Type", "u_type")}
              {renderSpecializationRow()}
              <tr>
                <td className={style.label}>More</td>
                {selectedUniversities.map((id, i) => (
                  <td key={i}>
                    {id && (
                      <a href={`/universities/${id}`} target="_blank" rel="noopener noreferrer">
                        Know More
                      </a>
                    )}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {!showComparison && (
        <p className={style.note}>Select universities and click Compare.</p>
      )}
    </section>
  );
};

export default CompareUniversityPage;
