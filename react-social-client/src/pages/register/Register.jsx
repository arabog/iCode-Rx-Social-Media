import axios from "axios"
import { useRef } from "react"
import './register.css'
import { useHistory } from "react-router"

export default function Register() {
          const username = useRef()
          const email = useRef()
          const password = useRef()
          const passwordAgain = useRef()
          const history = useHistory()

          const handleClick = async (e) => {
                    e.preventDefault()

                    if(passwordAgain.current.value !== password.current.value) {
                              return passwordAgain.current.setCustomValidity("Passwords don't match!")
                    }else {
                              const user = {
                                        username: username.current.value,
                                        email: email.current.value,
                                        password: password.current.value,
                              }

                              try {
                                        await axios.post("/auth/register", user)
                                        
                                        history.push('/login')
                              } catch (err) {
                                        console.log(err);
                              }
                    }
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

                                        <form className="loginRight" onSubmit={handleClick}>
                                                  <div className="loginBox">
                                                            <input 
                                                                      type="text" 
                                                                      placeholder="Username" 
                                                                      required 
                                                                      ref= {username} 
                                                                      className="loginInput" 
                                                            />

                                                            <input 
                                                                      type="email" 
                                                                      placeholder="Email" 
                                                                      required 
                                                                      ref= {email} 
                                                                      className="loginInput" 
                                                            />

                                                            <input 
                                                                      type="password" 
                                                                      placeholder="Password" 
                                                                      required 
                                                                      ref= {password} 
                                                                      className="loginInput" 
                                                                      minLength= "6"
                                                            />

                                                            <input 
                                                                      type="password" 
                                                                      placeholder="Password Again" 
                                                                      required 
                                                                      ref= {passwordAgain} 
                                                                      className="loginInput" 
                                                            />

                                                            <button type="submit" className="loginButton">Sign Up</button>
                                                            <button type="submit" className="loginRegisterButton">Log into Account </button>

                                                  </div>
                                        </form>
                              </div>
                    </div>
          )
}
