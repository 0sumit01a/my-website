import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { DataContext } from "../api/DataContext";
import { getUniversityMap, getCategories, getUniversities  } from "../api/api";
import styles from "../styles/UniversityInfo.module.css";
import UniversityGrid from "../reuse/UniversityGrid";

const UniversityInfo = () => {
  const { slug } = useParams();
  const { universities } = useContext(DataContext);
const [relatedUniversities, setRelatedUniversities] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    start: "",
    consent: true,
    program: "",
  });
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const id = slug.split("-").pop();
  const university = universities.find((u) => u.u_id === id);
useEffect(() => {
  const fetchRelatedUniversities = async () => {
    if (!university) return;

    try {
      const maps = await getUniversityMap();
      const allUniversities = await getUniversities();

      console.log("Current University ID:", university.u_id);
      console.log("University Map:", maps);
      console.log("All Universities:", allUniversities);

      const relatedIds = maps
        .filter(
          (m) =>
            m.u_id?.toString() === university.u_id?.toString() &&
            m.r_u_id
        )
        .map((m) => m.r_u_id?.toString());

      const related = allUniversities.filter((u) =>
        relatedIds.includes(u.u_id?.toString())
      );

      setRelatedUniversities(related);
    } catch (err) {
      console.error("Error fetching related universities:", err);
      setRelatedUniversities([]);
    }
  };

  fetchRelatedUniversities();
}, [university]);

  useEffect(() => {
    const fetchPrograms = async () => {
      if (!university) return;

      const maps = await getUniversityMap();
      const categories = await getCategories();

      const mappedPrograms = maps
        .filter((m) => m.u_id === university.u_id)
        .map((m) => categories.find((cat) => cat.catg_id === m.catg_id))
        .filter(Boolean);

      setPrograms(mappedPrograms);
    };

    fetchPrograms();
  }, [university]);

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const payload = {
      contact_name: formData.name,
      contact_email: formData.email,
      contact_num: formData.phone,
      contact_university: university?.u_name,
      contact_course: formData.program,
      contact_start_date: formData.start,
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_URL}/add-contact.php`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": import.meta.env.VITE_REACT_APP_API_KEY,
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      if (response.ok) {
        setMessage("Your details have been submitted successfully!");
        setStatus("success");
        setFormData({
          name: "",
          phone: "",
          email: "",
          start: "",
          consent: true,
          program: "",
        });
      } else {
        setMessage(result.message || "Submission failed ❌");
        setStatus("error");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error submitting form ❌");
      setStatus("error");
    }

    setLoading(false);
    setTimeout(() => setMessage(""), 5000);
  };

  if (!university) return <h2>University not found.</h2>;

  return (
    <div className={styles.container}>
      <div className={styles.navSpacer}></div>

      <div
        className={styles.top}
        style={{
          backgroundImage: `url(${university.u_imege ||
            "https://via.placeholder.com/800x400?text=No+Image"
            })`,
        }}
      >
        <div className={styles.tLeft}>
          <div className={styles.card}>
            <div className={styles.rating}>
              ⭐ {university.u_ranking} &nbsp;&nbsp; 4.5
            </div>
            <div className={styles.cardTop}>
              <img
                src={
                  university.u_logo ||
                  "https://via.placeholder.com/50x50?text=Logo"
                }
                alt="University Logo"
              />
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
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className={styles.input}
              />
              <div className={styles.phoneWrapper}>
                <span className={styles.countryCode}>+91</span>
                <input
                  type="tel"
                  placeholder="Enter phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className={styles.input}
                />
              </div>
              <input
                type="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className={styles.input}
              />
              <select
                name="start"
                value={formData.start}
                onChange={handleInputChange}
                required
                className={styles.select}
              >
                <option value="">When do you want to start?</option>
                <option>July 2025</option>
                <option>August 2025</option>
              </select>
              <input
                type="text"
                value={university.u_name}
                readOnly
                disabled
                className={styles.input}
              />
              <select
                name="program"
                value={formData.program}
                onChange={handleInputChange}
                required
                className={styles.select}
              >
                <option value="">Select program</option>
                {programs.map((prog) => (
                  <option key={prog.catg_id}>{prog.catg_name}</option>
                ))}
              </select>
              <div className={styles.checkboxWrapper}>
                <input
                  type="checkbox"
                  id="consent"
                  name="consent"
                  checked={formData.consent}
                  onChange={handleInputChange}
                />
                <label htmlFor="consent">
                  By submitting your contact details, you authorise
                  MyOnlineCollege to contact you via email, text, WhatsApp or
                  call even if you are on DND.
                </label>
              </div>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              {message && (
                <p
                  style={{
                    color: status === "success" ? "green" : "red",
                    marginTop: "10px",
                  }}
                >
                  {message}
                </p>
              )}
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

          <button className={styles.applyBtn} onClick={() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}>Apply Now</button>
        </div>

        <div className={styles.content}>
          <div className={styles.section} id="about">
            <h2>About University</h2>
            <p>{university.u_about || "Description not available."}</p>
          </div>

          <div className={styles.section} id="rankings">
            <h2>Rankings & Accreditations</h2>

            {university.u_ranking ? (
              <div className={styles.rankingGrid}>
                {university.u_ranking
                  .split(",")
                  .filter((img) => img.trim() !== "")
                  .map((img, index) => (
                    <div className={styles.rankingCard} key={index}>
                      <img
                        src={`https://edunexsys.com/backend/admin/${img.trim()}`}
                        alt={`Ranking ${index + 1}`}
                      />
                    </div>
                  ))}
              </div>
            ) : (
              <p>Ranking details not available.</p>
            )}
          </div>

          <div className={styles.section} id="programs">
            <h2>Choose Your Programs</h2>

            {programs.length === 0 && <p>No programs available for this university.</p>}

            {/* Post Graduate Programs */}
            {programs.filter((p) =>
              p.catg_type?.toLowerCase().includes("post") ||
              p.catg_type?.toLowerCase() === "pg" ||
              (!p.catg_type && /m\.|mba|msc|mcom|mca/i.test(p.catg_name))
            ).length > 0 && (
                <>
                  <h3>Post Graduate Programs</h3>
                  <div className={styles.programList}>
                    {programs
                      .filter((p) =>
                        p.catg_type?.toLowerCase().includes("post") ||
                        p.catg_type?.toLowerCase() === "pg" ||
                        (!p.catg_type && /m\.|mba|msc|mcom|mca/i.test(p.catg_name))
                      )
                      .map((p) => (
                        <div className={styles.programCard} key={p.catg_id}>
                          <h4>{p.catg_name}</h4>
                          <p>{p.catg_heading || "Explore our curriculum and career paths."}</p>
                          <div className={styles.buttonGroup}>
                            <button
                              onClick={() => {
                                const slug = `${p.catg_name
                                  .toLowerCase()
                                  .replace(/[^a-z0-9]+/g, "-")}-${p.catg_id}`;
                                window.location.href = `/post-graduate/${slug}`;
                              }}
                            >
                              Know More
                            </button>
                            <button
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, program: p.catg_name }));
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                            >
                              Apply Now
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              )}

            {/* Under Graduate Programs */}
            {programs.filter((p) =>
              p.catg_type?.toLowerCase().includes("under") ||
              p.catg_type?.toLowerCase() === "ug" ||
              (!p.catg_type && /b\.|btech|bsc|bba|bca/i.test(p.catg_name))
            ).length > 0 && (
                <>
                  <h3>Under Graduate Programs</h3>
                  <div className={styles.programList}>
                    {programs
                      .filter((p) =>
                        p.catg_type?.toLowerCase().includes("under") ||
                        p.catg_type?.toLowerCase() === "ug" ||
                        (!p.catg_type && /b\.|btech|bsc|bba|bca/i.test(p.catg_name))
                      )
                      .map((p) => (
                        <div className={styles.programCard} key={p.catg_id}>
                          <h4>{p.catg_name}</h4>
                          <p>{p.catg_heading || "Kickstart your academic journey with us."}</p>
                          <div className={styles.buttonGroup}>
                            <button
                              onClick={() => {
                                const slug = `${p.catg_name
                                  .toLowerCase()
                                  .replace(/[^a-z0-9]+/g, "-")}-${p.catg_id}`;
                                window.location.href = `/under-graduate/${slug}`;
                              }}
                            >
                              Know More
                            </button>
                            <button
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, program: p.catg_name }));
                                window.scrollTo({ top: 0, behavior: "smooth" });
                              }}
                            >
                              Apply Now
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </>
              )}
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
            {/* <p>{university.u_certifictions || "Information coming soon."}</p> */}
            <div
              className={styles.certificationContent}
              dangerouslySetInnerHTML={{ __html: university.u_certifictions || "Information coming soon." }}
            />l
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
  {relatedUniversities.length > 0 ? (
    <UniversityGrid universities={relatedUniversities} columns={3} />
  ) : (
    <p>No related universities listed.</p>
  )}
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
