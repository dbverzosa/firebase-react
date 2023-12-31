import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
  
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  }
  
  const Auth = ({setActive, setUser}) => {
    const [state, setState] = useState(initialState);
    const [signUp, setSignUp] = useState(false);

    const {email, password, name, confirmPassword} = state;

    const navigate = useNavigate();

const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
};


const handleAuth = async (e) => {
    e.preventDefault();
    if(!signUp){
        if (email && password) {
            const {user} = await signInWithEmailAndPassword(
              auth,
              email,
              password
            );
            setUser(user)
            setActive("home");
        } else {
            return toast.error('All fields are required to fill');
        }


    } else {
        if(password !== confirmPassword) {
            return toast.error('Password do not match. Please try again!')
        }
        if (name && email && password) {
            const {user} = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(user, { displayName: `${name}` });
            setActive("home");
        } else {
           return toast.error('All fields are required to fill');

        }
        
    }
    navigate('/');
}

    return (
        <div className="container-fluid mb-4"> 
            <div className="container">
                <div className="col-12 text-center">
                    <div className="text-center heading py-2">
                    {!signUp ? "Sign-In" : "Sign-Up"}
                    </div>
                </div>
                <div className="row h-100 justify-content-center align-items-center">
                    <div className="col-10 col-md-8 col-lg-6">
                        <form className="row" onSubmit={handleAuth}>
                            {signUp && (
                                <>
                                    <div className="col-12 py-3">
                                    <input
                                    type="text"
                                    className="form-control input-text-box"
                                    placeholder="Name"
                                    name="name"
                                    value={name}
                                    onChange={handleChange}
                                    />
                                    </div>
                                </>
                            )}
                            <div className="col-12 py-3">
                                <input
                                type="email"
                                className="form-control input-text-box"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                />
                            </div>
                            <div className="col-12 py-3">
                                <input
                                type="password"
                                className="form-control input-text-box"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                />
                            </div>
                            {signUp && (
                                <div className="col-12 py-3">
                                    <input
                                    type="password"
                                    className="form-control input-text-box"
                                    placeholder="Confirm Password"
                                    name="confirmPassword"
                                    value={confirmPassword}
                                    onChange={handleChange}
                                    />
                                </div>
                            )}
                            
                            <div className="col-12 py-3 text-center">
                                <button
                                    className={`btn ${!signUp ? "btn-sign-in" : "btn-sign-up"}`}
                                    type="submit"
                                >
                                    {!signUp ? "Sign-in" : "Sign-up"}
                                </button>
                            </div>
                        </form>
                        <div>
                            {!signUp ? (
                                    <>
                                        <div className="text-center justify-content-center mt-2 pt-2">
                                            <p className="small fw-bold mt-2 pt-1 mb-0">
                                                Don't have an account ?&nbsp;
                                                <span
                                                className="link-danger"
                                                style={{ textDecoration: "none", cursor: "pointer" }}
                                                onClick={() => setSignUp(true)}
                                                >
                                                Sign Up
                                                </span>
                                            </p>
                                        </div>  
                                    </>
                                ): (
                                    <>
                                    <div className="text-center justify-content-center mt-2 pt-2">
                                            <p className="small fw-bold mt-2 pt-1 mb-0">
                                                Already have an account ?&nbsp;
                                                <span
                                                style={{ textDecoration: "none", cursor: "pointer", color: '#298af2'}}
                                                onClick={() => setSignUp(false)}
                                                >
                                                Sign In
                                                </span>
                                            </p>
                                        </div>
                                    </>
                                )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </div>
    
    )
  }
  
  export default Auth
  
  



//   import React, { useState } from "react";
 
//   const initialState = {
//     email: "",
//     password: "",
//   };
  
//   const Auth = () => {
//     const [state, setState] = useState(initialState);
//     const [signUp, setSignUp] = useState(false);
//     const { email, password } = state;
// };


// const handleChange = (e) => {
//     setState({ ...state, [e.target.name]: e.target.value });
//   };

  
//     return (
//       <div className="container-fluid mb-4">
//         <div className="container">
//           <div className="col-12 text-center">
//             <div className="text-center heading py-2">
//               {!signUp ? "Sign-In" : "Sign-Up"}
//             </div>
//           </div>
//           <div className="row h-100 justify-content-center align-items-center">
//             <div className="col-10 col-md-8 col-lg-6">
//               <form className="row">
                
//                     <div className="col-12 py-3">
//                       <input
//                         type="text"
//                         className="form-control input-text-box"
//                         placeholder="Email"
//                         name="email"
//                         value={email}
//                         onChange={handleChange}
//                       />
//                     </div>
//                     <div className="col-12 py-3">
//                       <input
//                         type="text"
//                         className="form-control input-text-box"
//                         placeholder="Password"
//                         name="password"
//                         value={password}
//                         onChange={handleChange}
//                       />
//                     </div>
  
//                 <div className="col-12 py-3 text-center">
//                   <button
//                     className={`btn ${!signUp ? "btn-sign-in" : "btn-sign-up"}`}
//                     type="submit"
//                   >
//                     {!signUp ? "Sign-in" : "Sign-up"}
//                   </button>
//                 </div>
//               </form>
//               <div>
//                 {!signUp ? (
//                   <>
//                     <div className="text-center justify-content-center mt-2 pt-2">
//                       <p className="small fw-bold mt-2 pt-1 mb-0">
//                         Don't have an account ?&nbsp;
//                         <span
//                           className="link-danger"
//                           style={{ textDecoration: "none", cursor: "pointer" }}
//                           onClick={() => setSignUp(true)}
//                         >
//                           Sign Up
//                         </span>
//                       </p>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div className="text-center justify-content-center mt-2 pt-2">
//                       <p className="small fw-bold mt-2 pt-1 mb-0">
//                         Already have an account ?&nbsp;
//                         <span
//                           style={{
//                             textDecoration: "none",
//                             cursor: "pointer",
//                             color: "#298af2",
//                           }}
//                           onClick={() => setSignUp(false)}
//                         >
//                           Sign In
//                         </span>
//                       </p>
//                     </div>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );

  
//   export default Auth;