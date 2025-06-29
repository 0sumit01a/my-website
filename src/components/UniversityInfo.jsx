import React, { useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../api/DataContext";
import styles from "../styles/UniversityInfo.module.css";

const UniversityInfo = () => {
  const { slug } = useParams();
  const { universities } = useContext(DataContext);

  // Extract ID from slug (last part after last dash)
  const id = slug.split("-").pop();

  // Find university using backend data
  const university = universities.find((u) => u.u_id === id);

  useEffect(() => {
    const navItems = document.querySelectorAll(`.${styles.navItem}`);
    const sections = document.querySelectorAll(`.${styles.section}`);

    navItems.forEach((item) => {
      item.addEventListener("click", () => {
        const targetId = item.getAttribute("data-target");
        const section = document.getElementById(targetId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            navItems.forEach((nav) => {
              nav.classList.toggle(styles.active, nav.dataset.target === id);
            });
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      navItems.forEach((item) => item.removeEventListener("click", null));
      observer.disconnect();
    };
  }, []);

  if (!university) return <h2>University not found.</h2>;

  return (
    <div className={styles.container}>
      <div className={styles.navSpacer}></div>
      <div
        className={styles.top}
        style={{
          backgroundImage: university.u_imege
            ? `url(http://b4l.640.mytemp.website/backend/${university.u_imege})`
            : `url(https://via.placeholder.com/800x400?text=No+Image)`,
        }}
      >
        <div className={styles.tLeft}>
          <div className={styles.card}>
            <div className={styles.rating}>⭐ 4.5</div>
            <div className={styles.cardTop}>
              {university.u_logo && (
                <img
                  src={`http://b4l.640.mytemp.website/backend/${university.u_logo}`}
                  alt="Logo"
                />
              )}
              <div className={styles.title}>{university.u_name}</div>
            </div>
            <div className={styles.info}>
              <span>📍 {university.u_location}</span>
              <span>📌 {university.u_date}</span>
              <span>⭐ {university.u_type}</span>
              <span>🛡️ {university.u_approved}</span>
            </div>
          </div>
        </div>

        <div className={styles.tRight}>
          <div className={styles.formContainer}>
            <h3 className={styles.heading}>Choose this University</h3>
            <form className={styles.form}>
              <input type="text" placeholder="Enter name" required className={styles.input} />
              <div className={styles.phoneWrapper}>
                <span className={styles.countryCode}>+91</span>
                <input type="tel" placeholder="Enter phone" required className={styles.input} />
              </div>
              <input type="email" placeholder="Enter email" required className={styles.input} />

              <select required className={styles.select}>
                <option value="">When do you want to start?</option>
                <option>July 2025</option>
                <option>August 2025</option>
              </select>

              <select required className={styles.select}>
                <option>{university.u_name || "Select university"}</option>
              </select>

              <select required className={styles.select}>
                <option>Select program</option>
              </select>

              <div className={styles.checkboxWrapper}>
                <input type="checkbox" id="consent" defaultChecked />
                <label htmlFor="consent">
                  By submitting your contact details, you authorise MyOnlineCollege to contact you via email,
                  text, WhatsApp or call even if you are on DND.
                </label>
              </div>

              <button type="submit" className={styles.submitBtn}>
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className={styles.mainWrapper}>
        <div className={styles.sidebar}>
          <div className={`${styles.navItem} ${styles.active}`} data-target="about">About University</div>
          <div className={styles.navItem} data-target="rankings">Rankings</div>
          <div className={styles.navItem} data-target="programs">Choose Your Programs</div>
          <div className={styles.navItem} data-target="sample-degree">Sample Degree</div>
          <div className={styles.navItem} data-target="why-choose">Why Choose University</div>
          <div className={styles.navItem} data-target="tools">Tools & Certifications</div>
          <div className={styles.navItem} data-target="placement">Placement Assistance</div>
          <div className={styles.navItem} data-target="eligibility">Eligibility</div>
          <div className={styles.navItem} data-target="admission">Admission Process</div>
          <div className={styles.navItem} data-target="news">News & Events</div>
          <div className={styles.navItem} data-target="related">Related Universities</div>
          <div className={styles.navItem} data-target="faqs">FAQs</div>

          <button className={styles.applyBtn}>Apply Now</button>
        </div>

        <div className={styles.content}>
          <div className={styles.section} id="about">
            <h2>About University</h2>
            <p>{university.u_about || "Description not available."}</p>
          </div>

          <div className={styles.section} id="rankings">
            <h2>Rankings</h2>
            <p>{university.u_ranking || "Ranking details not available."}</p>
          </div>

          <div className={styles.section} id="programs">
            <h2>Choose Your Programs</h2>
            <p>{university.u_program || "Program information coming soon."}</p>
          </div>

          <div className={styles.section} id="sample-degree">
            <h2>Sample Degree</h2>
            <p>{university.u_sample_degree || "Sample degree not available."}</p>
          </div>

          <div className={styles.section} id="why-choose">
            <h2>Why Choose University</h2>
            <p>{university.u_why_choose || "Details not available."}</p>
          </div>

          <div className={styles.section} id="tools">
            <h2>Tools & Certifications</h2>
            <p>{university.u_certifictions || "Information coming soon."}</p>
          </div>

          <div className={styles.section} id="placement">
            <h2>Placement Assistance</h2>
            <p>{university.u_placement || "Placement support information not available."}</p>
          </div>

          <div className={styles.section} id="eligibility">
            <h2>Eligibility</h2>
            <p>{university.u_eligibility || "Eligibility criteria not specified."}</p>
          </div>

          <div className={styles.section} id="admission">
            <h2>Admission Process</h2>
            <p>{university.u_admissionp || "Admission details not available."}</p>
          </div>

          <div className={styles.section} id="news">
            <h2>News & Events</h2>
            <p>{university.u_news_event || "No news at the moment."}</p>
          </div>

          <div className={styles.section} id="related">
            <h2>Related Universities</h2>
            <p>{university.u_related || "No related universities listed."}</p>
          </div>

          <div className={styles.section} id="faqs">
            <h2>FAQs</h2>
            <p>
              {university.u_faq_q && university.u_faq_ans
                ? `Q: ${university.u_faq_q}\nA: ${university.u_faq_ans}`
                : "No FAQs available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UniversityInfo;
