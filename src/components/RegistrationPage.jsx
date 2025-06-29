import React, { useState, } from "react";
import styles from "../styles/RegistrationPage.module.css";

const Register = ({ onClose, onSwitch }) => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="username" placeholder="Enter username" required onChange={handleChange} />
          <input type="text" name="name" placeholder="Enter name" required onChange={handleChange} />
          <input type="email" name="email" placeholder="Enter email" required onChange={handleChange} />
          <input type="tel" name="phone" placeholder="Enter Phone Number" required onChange={handleChange} />
          <input type="password" name="password" placeholder="Enter Password" required onChange={handleChange} />

          <label className={styles.checkboxLabel}>
            <input type="checkbox" defaultChecked />
            <span>
              By submitting your contact details, you authorise MyOnlineCollege to contact you about our services via
              email, text, WhatsApp or call even though you may be registered on DND.
            </span>
          </label>

          <button type="submit" className={styles.submitBtn}>Submit</button>
        </form>
        <p className={styles.loginLink}>
            Already have an account? <span onClick={onSwitch}>Sign in</span>
        </p>

        <div className={styles.recaptcha}>
          <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" />
          <span>protected by reCAPTCHA</span>
        </div>
      </div>
    </div>
  );
};

export default Register;















// import React, { useState } from "react";
// import styles from "../styles/RegistrationPage.module.css";

// const Register = ({ onBackToLogin }) => {
//   const [formData, setFormData] = useState({
//     username: "",
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.container}>
//         <button className={styles.closeBtn} onClick={onBackToLogin}>&times;</button>
//         <h2>Sign Up</h2>
//         <form onSubmit={handleSubmit}>
//           <input type="text" name="username" placeholder="Enter username" required onChange={handleChange} />
//           <input type="text" name="name" placeholder="Enter name" required onChange={handleChange} />
//           <input type="email" name="email" placeholder="Enter email" required onChange={handleChange} />
//           <input type="tel" name="phone" placeholder="Enter Phone Number" required onChange={handleChange} />
//           <input type="password" name="password" placeholder="Enter Password" required onChange={handleChange} />

//           <label className={styles.checkboxLabel}>
//             <input type="checkbox" defaultChecked />
//             <span>
//               By submitting your contact details, you authorise MyOnlineCollege to contact you about our services via
//               email, text, WhatsApp or call even though you may be registered on DND.
//             </span>
//           </label>

//           <button type="submit" className={styles.submitBtn}>Submit</button>
//         </form>
//         <p className={styles.loginLink}>
//           Already have an account? <span onClick={onBackToLogin}>Sign in</span>
//         </p>
//         <div className={styles.recaptcha}>
//           <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" />
//           <span>protected by reCAPTCHA</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;

