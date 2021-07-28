import './register.css'

export default function Register() {
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
                                                  <div className="loginBox">
                                                            <input type="text" placeholder="Email" className="loginInput" />
                                                            <input type="text" placeholder="Password" className="loginInput" />
                                                            <button className="loginButton">Log In</button>
                                                            <span className="loginForgot">Forgot Password?</span>
                                                            <button className="loginRegisterButton">Create a New Account </button>

                                                  </div>
                                        </div>
                              </div>
                    </div>
          )
}