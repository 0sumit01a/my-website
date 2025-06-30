import React, { useEffect, useState } from "react";
import styles from "../styles/Applyform.module.css";
import { getUniversities, getCategories, getUniversityMap } from "../api/api";

const ApplyForm = ({ heading = "Choose the University", onClose, showClose = true }) => {
  const [universities, setUniversities] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [filteredPrograms, setFilteredPrograms] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    start: "",
    university: "",
    program: "",
    consent: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const unis = await getUniversities();
      const cats = await getCategories();
      const maps = await getUniversityMap();
      setUniversities(unis);
      setPrograms(cats);

      // Save mapping data for filtering
      setFilteredPrograms([]);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedUniversity) {
      // Filter programs based on university mapping
      (async () => {
        const maps = await getUniversityMap();
        const universityObj = universities.find((u) => u.u_name === selectedUniversity);
        if (universityObj) {
          const uniId = universityObj.u_id;
          const programIds = maps.filter((m) => m.u_id === uniId).map((m) => m.catg_id);
          const filtered = programs.filter((p) => programIds.includes(p.catg_id));
          setFilteredPrograms(filtered);
        } else {
          setFilteredPrograms([]);
        }
      })();
    } else {
      setFilteredPrograms([]);
    }
  }, [selectedUniversity, universities, programs]);

  const handleChange = (e) => {
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

    try {
      // ⚠️ Replace this URL with your actual backend submit URL
      const response = await fetch("http://b4l.640.mytemp.website/backend/api/submit_form.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.status === "success") {
        setMessage("Form submitted successfully ✅");
        setFormData({
          name: "",
          phone: "",
          email: "",
          start: "",
          university: "",
          program: "",
          consent: true,
        });
        setSelectedUniversity("");
        setFilteredPrograms([]);
      } else {
        setMessage("Error: Something went wrong ❌");
      }
    } catch (error) {
      setMessage("Error: Could not submit form ❌");
    }
    setLoading(false);
  };

  return (
    <div className={styles.overlayOne}>
      <div className={styles.formWrapperOne}>
        {showClose && (
          <button className={styles.closeBtnOne} onClick={onClose}>×</button>
        )}

        <h3 className={styles.heading}>{heading}</h3>

        <form className={styles.formOne} onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.inputOne}
          />

          <div className={styles.phoneWrapper}>
            <span className={styles.countryCode}>+91</span>
            <input
              type="tel"
              placeholder="Enter phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className={styles.inputOne}
            />
          </div>

          <input
            type="email"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.inputOne}
          />

          <select
            name="start"
            value={formData.start}
            onChange={handleChange}
            required
            className={styles.selectOne}
          >
            <option value="">When do you want to start?</option>
            <option>July 2025</option>
            <option>August 2025</option>
          </select>

          <select
            name="university"
            value={formData.university}
            onChange={(e) => {
              handleChange(e);
              setSelectedUniversity(e.target.value);
            }}
            required
            className={styles.selectOne}
          >
            <option value="">Select university</option>
            {universities.map((u) => (
              <option key={u.u_id} value={u.u_name}>{u.u_name}</option>
            ))}
          </select>

          <select
            name="program"
            value={formData.program}
            onChange={handleChange}
            required
            className={styles.selectOne}
          >
            <option value="">Select program</option>
            {filteredPrograms.map((p) => (
              <option key={p.catg_id} value={p.catg_name}>{p.catg_name}</option>
            ))}
          </select>

          <div className={styles.checkboxWrapperOne}>
            <input
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
            />
            <label htmlFor="consent">
              By submitting your contact details, you authorise MyOnlineCollege to contact you via email, text, WhatsApp or call even though you may be registered on DND.
            </label>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>

          {message && <p style={{ color: message.includes("successfully") ? "green" : "red", marginTop: "6px" }}>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;
