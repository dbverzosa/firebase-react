import React from "react";
import { Link } from "react-router-dom";

const Header = ({ active, setActive, user, handleLogout }) => {
  const userId = user?.uid;
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid bg-faded padding-media">
        <div className="container padding-media">
          <nav className="navbar navbar-toggleable-md navbar-light">
            <button
              className="navbar-toggler mt-3"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              data-bs-parent="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="true"
              aria-label="Toggle Navigation"
            >
              <span className="fa fa-bars"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${
                      active === "home" ? "active" : ""
                    }`}
                    onClick={() => setActive("home")}
                  >
                    Home
                  </li>
                </Link>
                <Link to="/blogs" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${
                      active === "blogs" ? "active" : ""
                    }`}
                    onClick={() => setActive("blogs")}
                  >
                    Blogs
                  </li>
                </Link>

                <Link to="/create" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${
                      active === "create" ? "active" : ""
                    }`}
                    onClick={() => setActive("create")}
                  >
                    Write
                  </li>
                </Link>

                <Link to="/about" style={{ textDecoration: "none" }}>
                  <li
                    className={`nav-item nav-link ${
                      active === "about" ? "active" : ""
                    }`}
                    onClick={() => setActive("about")}
                  >
                    About
                  </li>
                </Link>
              </ul>
              <div className="row g-3">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  {userId ? (
                    <>
                      <div className="profile-logo">
                        <img
                          src="logo192.png" //lchange this logo to profile
                          alt="logo"
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            marginTop: "12px",
                          }}
                        />
                      </div>
                      <p style={{ marginTop: "12px", marginLeft: "5px" }}>
                        {user?.displayName}
                      </p>
                      <li className="nav-item nav-link" onClick={handleLogout}>
                        Logout
                      </li>
                    </>
                  ) : (
                    <Link to="/auth" style={{ textDecoration: "none" }}>
                      <li
                        className={`nav-item nav-link ${
                          active === "login" ? "active" : ""
                        }`}
                        onClick={() => setActive("login")}
                      >
                        Login
                      </li>
                    </Link>
                  )}
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </nav>
  );
};

export default Header;


// import React from "react";
// import { NavLink } from "react-router-dom";

// const activeLinkStyle = {
//   backgroundColor: "blue",
//   color: "white",
//   textDecoration: "none", // Remove underline
// };

// const linkStyle = {
//   textDecoration: "none", // Remove underline for all links
// };

// const Header = () => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       <div className="container-fluid bg-faded padding-media">
//         <div className="container padding-media">
//           <nav className="navbar navbar-toggleable-md navbar-light">
//             <button
//               className="navbar-toggler mt-3"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarSupportedContent"
//               data-bs-parent="#navbarSupportedContent"
//               aria-controls="navbarSupportedContent"
//               aria-expanded="true"
//               aria-label="Toggle Navigation"
//             >
//               <span className="fa fa-bars"></span>
//             </button>
//             <div
//               className="collapse navbar-collapse"
//               id="navbarSupportedContent"
//             >
//               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                 <NavLink to="/" activeStyle={activeLinkStyle} style={linkStyle}>
//                   <li className="nav-item nav-link">Home</li>
//                 </NavLink>
//                 <NavLink to="/about" activeStyle={activeLinkStyle} style={linkStyle}>
//                   <li className="nav-item nav-link">About</li>
//                 </NavLink>
//                 <NavLink to="/Contacts" activeStyle={activeLinkStyle} style={linkStyle}>
//                   <li className="nav-item nav-link">Contacts</li>
//                 </NavLink>
//                 <NavLink to="/create" activeStyle={activeLinkStyle} style={linkStyle}>
//                   <li className="nav-item nav-link">Write</li>
//                 </NavLink>
//               </ul>
//               <div className="row g-3">
//                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                   <NavLink to="/auth" style={linkStyle}>
//                     <li className="nav-item nav-link">Login</li>
//                   </NavLink>
//                 </ul>
//               </div>
//             </div>
//           </nav>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Header;
