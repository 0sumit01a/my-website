import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/UniversityProgramsPage.module.css";
import { getCategories, getUniversityMap } from "../api/api";

const UniversityProgramsPage = () => {
  const { slug } = useParams();
  const [universityId, setUniversityId] = useState(null);
  const [allPrograms, setAllPrograms] = useState([]);
  const [ugPrograms, setUgPrograms] = useState([]);
  const [pgPrograms, setPgPrograms] = useState([]);

  useEffect(() => {
    const fetchUniversityMap = async () => {
      const mapData = await getUniversityMap();
      const match = mapData.find((entry) => entry.uni_slug === slug);
      if (match) {
        setUniversityId(match.uni_id);
        
      }
    };
    fetchUniversityMap();
  }, [slug]);

  useEffect(() => {
    const fetchPrograms = async () => {
      const all = await getCategories();
      setAllPrograms(all);
    };
    fetchPrograms();
  }, []);

  useEffect(() => {
    if (!universityId || !allPrograms.length) return;

    const filtered = allPrograms.filter((cat) => cat.uni_id === universityId);

    const ug = filtered.filter(
      (cat) =>
        cat.catg_type?.toLowerCase().includes("under graduate") ||
        cat.catg_type?.toLowerCase() === "ug"
    );

    const pg = filtered.filter((cat) =>
      cat.catg_type?.toLowerCase().includes("post graduate")
    );

    setUgPrograms(ug);
    setPgPrograms(pg);
  }, [universityId, allPrograms]);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.heading}>Programs at Selected University</h1>

      {ugPrograms.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.subheading}>Undergraduate Programs</h2>
          <div className={styles.grid}>
            {ugPrograms.map((prog) => (
              <div key={prog.catg_id} className={styles.card}>
                <h3>{prog.catg_name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {pgPrograms.length > 0 && (
        <div className={styles.section}>
          <h2 className={styles.subheading}>Postgraduate Programs</h2>
          <div className={styles.grid}>
            {pgPrograms.map((prog) => (
              <div key={prog.catg_id} className={styles.card}>
                <h3>{prog.catg_name}</h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {ugPrograms.length === 0 && pgPrograms.length === 0 && (
        <p>No programs found for this university.</p>
      )}
    </div>
  );
};

export default UniversityProgramsPage;
