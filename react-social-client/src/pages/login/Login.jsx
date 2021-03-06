import { useContext, useRef } from "react";
import './login.css';
import { loginCall  } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext"
import { CircularProgress } from "@material-ui/core"

export default function Login() {
          const email = useRef()
          const password = useRef()

          const { isFetching, error, dispatch } = useContext(AuthContext)

          const handleClick = (e) => {
                    e.preventDefault()

                    loginCall( 
                              {
                                        email: email.current.value, 
                                        password: password.current.value
                              }, 

                              dispatch 
                    )
          }

          return (
                    <div className="login">
                              <div className="loginWrapper">
                                        <div className="loginLeft">
                                                  <h3 className="loginLogo">iCode-Rx</h3>
                                                  <span className="loginDesc">
                                                            Connect with friends and the world around you on iCode-Rx social
                                                  </span>
                                        </div>

                                        <div className="loginRight">
                                                  <form className="loginBox" onSubmit={handleClick}>
                                                            <input 
                                                                      type="email" 
                                                                      required
                                                                      placeholder="Email" 
                                                                      className="loginInput" 
                                                                      ref = {email}
                                                            />

                                                            <input 
                                                                      type="password" 
                                                                      required
                                                                      minLength= "6"
                                                                      placeholder="Password" 
                                                                      className="loginInput" 
                                                                      ref={password}
                                                            />

                                                            <button className="loginButton" type="submit" disabled= {isFetching}>
                                                                      {isFetching ? <CircularProgress color= "white" size= "22px" /> : "Log In"} 
                                                            </button>

                                                            <span className="loginForgot">Forgot Password?</span>

                                                            <button className="loginRegisterButton" type="submit">
                                                                      {isFetching ? <CircularProgress color= "white" size= "22px" /> : "Create a New Account "} 
                                                            </button>

                                                  </form>
                                        </div>
                              </div>
                    </div>
          )
}
