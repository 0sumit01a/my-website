import React, { useState } from "react";
import style from "../styles/LoginPage.module.css";

const Login = ({ onClose, onSwitch }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className={style.loginoverlay}>
      <div className={style.loginbox}>
        <button className={style.closebtn} onClick={onClose}>&times;</button>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label className={style.consent}>
            <input type="checkbox" defaultChecked />
            <span>
              By submitting your contact details, you authorise MyOnlineCollege to
              contact you about our services via email, text, WhatsApp or call even
              though you may be registered on DND.
            </span>
          </label>
          <button type="submit" className={style.submitbtn}>
            Submit
          </button>
        </form>
        <p className={style.register}>
            Don't have an account? <span onClick={onSwitch}>Register</span>
        </p>

        <div className={style.recaptchabox}>
          <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" />
          <span>protected by reCAPTCHA</span>
        </div>
      </div>
    </div>
  );
};

export default Login;












// import React, { useState } from "react";
// import style from "../styles/LoginPage.module.css";
// import Register from "./RegistrationPage";

// const Login = ({ onClose }) => {
//   const [showRegister, setShowRegister] = useState(false);
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Username:", username);
//     console.log("Password:", password);
//   };

//   if (showRegister) {
//     return <Register onBackToLogin={() => setShowRegister(false)} />;
//   }

//   return (
//     <div className={style.loginoverlay}>
//       <div className={style.loginbox}>
//         <button className={style.closebtn} onClick={onClose}>&times;</button>
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Enter username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <label className={style.consent}>
//             <input type="checkbox" defaultChecked />
//             <span>
//               By submitting your contact details, you authorise MyOnlineCollege to
//               contact you about our services via email, text, WhatsApp or call even
//               though you may be registered on DND.
//             </span>
//           </label>
//           <button type="submit" className={style.submitbtn}>
//             Submit
//           </button>
//         </form>
//         <p className={style.register}>
//           Don't have an account?{" "}
//           <span onClick={() => setShowRegister(true)}>Register</span>
//         </p>
//         <div className={style.recaptchabox}>
//           <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" />
//           <span>protected by reCAPTCHA</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
