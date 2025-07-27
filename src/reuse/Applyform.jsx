import React, { useEffect, useState } from "react";
import styles from "../styles/Applyform.module.css";
import {
  getUniversities,
  getCategories,
  getUniversityMap,
} from "../api/api";

const ApplyForm = ({
  heading = "Choose the University",
  onClose,
  showClose = true,
}) => {
  const [universities, setUniversities] = useState([]);
  const [allPrograms, setAllPrograms] = useState([]);
  const [universityMap, setUniversityMap] = useState([]);
  const [programs, setPrograms] = useState([]);

  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    start: "",
    consent: true,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const unis = await getUniversities();
      const cats = await getCategories();
      const maps = await getUniversityMap();
      setUniversities(unis);
      setAllPrograms(cats);
      setUniversityMap(maps);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedUniversity) {
      const mapped = universityMap.filter((item) => item.u_id === selectedUniversity);
      const programIds = mapped.map((item) => item.catg_id);
      const filteredPrograms = allPrograms.filter((p) => programIds.includes(p.catg_id));
      setPrograms(filteredPrograms);
    } else {
      setPrograms([]);
    }
    setSelectedProgram("");
  }, [selectedUniversity, universityMap, allPrograms]);

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

    const selectedUniversityObj = universities.find((u) => u.u_id === selectedUniversity);

    const payload = {
      contact_name: formData.name,
      contact_email: formData.email,
      contact_num: formData.phone,
      contact_university: selectedUniversityObj?.u_name || "",
      contact_course: selectedProgram,
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
        setMessage("Form submitted successfully ✅");
        setStatus("success");
        setFormData({
          name: "",
          phone: "",
          email: "",
          start: "",
          consent: true,
        });
        setSelectedUniversity("");
        setSelectedProgram("");
        setPrograms([]);
      } else {
        setMessage(result.message || "Submission failed ❌");
        setStatus("error");
      }
    } catch (error) {
      setMessage("Error: Could not submit form ❌");
      setStatus("error");
    }

    setLoading(false);
    setTimeout(() => setMessage(""), 4000);
  };

  return (
    <div className={styles.overlayOne}>
      <div className={styles.formWrapperOne}>
        {showClose && (
          <button className={styles.closeBtnOne} onClick={onClose}>
            ×
          </button>
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
            value={selectedUniversity}
            onChange={(e) => setSelectedUniversity(e.target.value)}
            required
            className={styles.selectOne}
          >
            <option value="">Select university</option>
            {universities.map((u) => (
              <option key={u.u_id} value={u.u_id}>
                {u.u_name}
              </option>
            ))}
          </select>

          <select
            value={selectedProgram}
            onChange={(e) => setSelectedProgram(e.target.value)}
            required
            disabled={!programs.length}
            className={styles.selectOne}
          >
            <option value="">Select program</option>
            {programs.map((p) => (
              <option key={p.catg_id} value={p.catg_name}>
                {p.catg_name}
              </option>
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
              By submitting your contact details, you authorise MyOnlineCollege to
              contact you via email, text, WhatsApp or call even though you may be registered on DND.
            </label>
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>

          {message && (
            <p
              style={{
                color: status === "success" ? "green" : "red",
                marginTop: "6px",
              }}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;
