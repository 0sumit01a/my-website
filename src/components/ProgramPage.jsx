import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "../styles/ProgramPage.module.css";
import { getCategories, getUniversities, getUniversityMap } from "../api/api";
import SpecialisationCard from "../reuse/SpecialisationCard";

// 🔥 Updated slug function
function toSlug(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // remove special chars except spaces and hyphens
    .trim()
    .replace(/\s+/g, "-"); // convert spaces to dash
}

const ProgramPage = () => {
  const { category, programId } = useParams();
  const [categoryData, setCategoryData] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cats, univs, maps] = await Promise.all([
          getCategories(),
          getUniversities(),
          getUniversityMap(),
        ]);

        // 💡 Find correct category by matching slug
        const matchedCat = cats.find(c => toSlug(c.catg_name) === programId);
        if (!matchedCat) {
          setLoading(false);
          return;
        }
        setCategoryData(matchedCat);

        // Find universities linked to this category
        const uniIds = maps
          .filter(m => m.catg_id === matchedCat.catg_id)
          .map(m => m.u_id);

        const matchedUnivs = univs.filter(u => uniIds.includes(u.u_id));
        setUniversities(matchedUnivs);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [programId]);

  if (loading) return <div style={{ padding: "2rem" }}>Loading...</div>;
  if (!categoryData) return <div style={{ padding: "2rem", color: "red" }}>Program not found.</div>;

  return (
    <main>
      <section className={styles.programWrapper}>
        <div className={styles.left}>
          <h4>{category === "post-graduate" ? "Post Graduate Program" : "Under Graduate Program"}</h4>
          <h1>{categoryData.catg_name}</h1>
          <div className={styles.stats}>
            <span><b>{universities.length}</b> Universities</span>
            <span><b>{categoryData.catg_type || "-"}</b></span>
            <span><b>{categoryData.catg_heading || "—"}</b></span>
          </div>
          <p className={styles.description}>{categoryData.catg_parag || "No description available."}</p>
        </div>

        <div className={styles.right}>
          <div className={styles.formBox}>
            <h3>Choose this program</h3>
            <form>
              <input type="text" placeholder="Enter name" required />
              <div className={styles.phoneRow}>
                <span className={styles.countryCode}>+91</span>
                <input type="tel" placeholder="Enter phone" className={styles.phoneInput} required />
              </div>
              <input type="email" placeholder="Enter email" required />
              <select className={styles.selectIt} required>
                <option value="">When do you want to start?</option>
                <option>Within 1 Month</option>
                <option>1-3 Months</option>
                <option>3-6 Months</option>
                <option>Later</option>
              </select>
              <select className={styles.selectIt} required>
                <option value="">Select university</option>
                {universities.map(u => (
                  <option key={u.u_id}>{u.name}</option>
                ))}
              </select>
              <select className={styles.selectIt} required>
                <option value="">{categoryData.catg_name}</option>
              </select>
              <div className={styles.checkboxRow}>
                <input type="checkbox" id="agree" required />
                <label htmlFor="agree">
                  By submitting your contact details, you authorise MyOnlineCollege to contact you.
                </label>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </section>

      {universities.length > 0 && (
        <section className={styles.specialisationWrapper}>
          <h1>Universities offering this program</h1>
          <div className={styles.specialisationGrid}>
            {universities.map(u => (
              <SpecialisationCard
                key={u.u_id}
                data={{
                  title: u.name,
                  description: u.about,
                  universities: 1,
                  fee: u.fee || "See details",
                }}
                showButtons
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default ProgramPage;
