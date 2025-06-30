import React, { useState, useEffect } from 'react';
import styles from '../styles/ContactUsPage.module.css';
import {
  getUniversities,
  getCategories,
  getUniversityMap,
} from '../api/api.js'; 

const ContactUsPage = () => {
  const [universities, setUniversities] = useState([]);
  const [allPrograms, setAllPrograms] = useState([]);
  const [universityMap, setUniversityMap] = useState([]);
  const [programs, setPrograms] = useState([]);

  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    start: '',
    consent: true,
  });

  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      const uni = await getUniversities();
      const cat = await getCategories();
      const map = await getUniversityMap();

      setUniversities(uni);
      setAllPrograms(cat);
      setUniversityMap(map);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedUniversity) {
      const mapped = universityMap.filter(item => item.u_id === selectedUniversity);
      const programIds = mapped.map(item => item.catg_id);

      const filteredPrograms = allPrograms.filter(prog => programIds.includes(prog.catg_id));
      setPrograms(filteredPrograms);
    } else {
      setPrograms([]);
    }
    setSelectedProgram('');
  }, [selectedUniversity, universityMap, allPrograms]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      university: selectedUniversity,
      program: selectedProgram,
    };

    try {
      // Example: Replace with your actual submit endpoint
      const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/submit_form.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage('Your details have been submitted successfully!');
        setStatus('success');
        setFormData({ name: '', phone: '', email: '', start: '', consent: true });
        setSelectedUniversity('');
        setSelectedProgram('');
        setPrograms([]);
      } else {
        setMessage('Failed to submit form. Please try again.');
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setMessage('Error submitting form. Please try again.');
      setStatus('error');
    }

    setTimeout(() => setMessage(''), 5000);
  };

  return (
    
    <div className={styles.contactPage}>
      <div className={styles.navSpacer}></div>
      <div className={styles.topSection}>
        <div className={styles.leftText}>
          <h1>Contact Us</h1>
          <p>Don’t hesitate to reach out! Our team is here to answer your questions and help you at every step.</p>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.leftInfo}>
          <h2>Get in touch</h2>
          <p>Questions about courses, admissions, or anything else? We’re happy to help!</p>
          <div>
            <strong>📧 Email</strong>
            <p>enquiries@myonlinecollegegmail.in</p>
          </div>
          <div>
            <strong>📞 Call</strong>
            <p>+91 9990005082</p>
          </div>
          <div>
            <strong>📍 Address</strong>
            <p>E-15 First Floor, Sector 3 Noida, Uttar Pradesh 201301</p>
          </div>
        </div>

        <div className={styles.rightForm}>
          <h3>Leave us a Message</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="+91    Enter phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="start"
              placeholder="When do you want to start?"
              value={formData.start}
              onChange={handleInputChange}
            />

            <select
              value={selectedUniversity}
              onChange={(e) => setSelectedUniversity(e.target.value)}
              required
            >
              <option value="">Select university</option>
              {universities.map(uni => (
                <option key={uni.u_id} value={uni.u_id}>{uni.u_name}</option>
              ))}
            </select>

            <select
              value={selectedProgram}
              onChange={(e) => setSelectedProgram(e.target.value)}
              required
              disabled={!programs.length}
            >
              <option value="">Select program</option>
              {programs.map(prog => (
                <option key={prog.catg_id} value={prog.catg_id}>{prog.catg_name}</option>
              ))}
            </select>

            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                name="consent"
                checked={formData.consent}
                onChange={handleInputChange}
              />
              <small>
                By submitting your details, you authorise MyOnlineCollege to contact you even if you’re on DND.
              </small>
            </div>

            <button type="submit">Submit</button>
          </form>

          {message && (
            <p
              className={status === 'success' ? styles.successMsg : styles.errorMsg}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
