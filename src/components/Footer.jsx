import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/Footer.module.css";
import {
  getUniversities,
  getUGPrograms,
  getPGPrograms,
  getMBAPrograms,
} from "../api/api";

const Footer = () => {
  const [universities, setUniversities] = useState([]);
  const [pgPrograms, setPGPrograms] = useState([]);
  const [ugPrograms, setUGPrograms] = useState([]);
  const [mbaPrograms, setMBAPrograms] = useState([]);
  const [openSection, setOpenSection] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setUniversities(await getUniversities());
      setPGPrograms(await getPGPrograms());
      setUGPrograms(await getUGPrograms());
      setMBAPrograms(await getMBAPrograms());
    };
    fetchData();
  }, []);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className={styles.footer}>
      {/* === Desktop View === */}
      <div className={styles.desktopOnly}>
        <h3>All Universities</h3>
        <div className={styles.grid}>
          {universities.map((uni) => (
            <Link key={uni.u_id} to={`/university/${uni.u_id}`}>
              {uni.u_name}
            </Link>
          ))}
        </div>

        {/* PG, UG, MBA in one row */}
        <div className={styles.programRow}>
          <div>
            <h3>Post Graduate Programs</h3>
            <ul>
              {pgPrograms.map((p) => (
                <li key={p.catg_id}>
                  <Link to={`/post-graduate/${p.catg_id}`}>{p.catg_name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Under Graduate Programs</h3>
            <ul>
              {ugPrograms.map((p) => (
                <li key={p.catg_id}>
                  <Link to={`/under-graduate/${p.catg_id}`}>{p.catg_name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Online & Distance MBA</h3>
            <ul>
              {mbaPrograms.map((p) => (
                <li key={p.catg_id}>
                  <Link to={`/online-mba/${p.catg_id}`}>{p.catg_name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* === Mobile View === */}
      <div className={styles.mobileOnly}>
        {[
          { label: "All Universities", id: "universities", data: universities, type: "uni" },
          { label: "Post Graduate Programs", id: "pg", data: pgPrograms },
          { label: "Under Graduate Programs", id: "ug", data: ugPrograms },
          { label: "Online & Distance MBA", id: "mba", data: mbaPrograms },
        ].map((section) => (
          <div className={styles.collapsibleBox} key={section.id}>
            <button
              className={styles.collapsibleHeader}
              onClick={() => toggleSection(section.id)}
            >
              {section.label}{" "}
              <span>{openSection === section.id ? "-" : "+"}</span>
            </button>
            {openSection === section.id && (
              <div className={styles.contentBox}>
                {section.data.length === 0 ? (
                  <p>No Data</p>
                ) : section.type === "uni" ? (
                  <div className={styles.grid}>
                    {section.data.map((uni) => (
                      <Link key={uni.u_id} to={`/university/${uni.u_id}`}>
                        {uni.u_name}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <ul>
                    {section.data.map((p) => (
                      <li key={p.catg_id}>
                        <Link to={`/${section.id}/${p.catg_id}`}>
                          {p.catg_name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer Bottom */}
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomLeft}>
          © 2025 MyOnlineCollege. All rights reserved.
        </div>
        <div className={styles.footerBottomRight}>
          <Link to="/blog">Blog</Link>
          <Link to="/disclaimer">Disclaimer</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Website Terms</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
