import { Search, Person, Chat, Notifications } from "@material-ui/icons"
import { Link } from "react-router-dom"
import "./topbar.css"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export default function Topbar() {

          const { user } = useContext(AuthContext)
          const PF = process.env.REACT_APP_PUBLIC_FOLDER

          return (

                              // topbarContainer is divided into 3parts: left, center, right
                              <div className="topbarContainer">

                                        {/* left */}
                                        <div className="topbarLeft">
                                                  <Link to="/" style={{textDecoration: 'none'}}> 
                                                            <span className="logo">iCode-Rx</span>
                                                  </Link>
                                        </div>

                                        {/* center */}
                                        <div className="topbarCenter">
                                                  <div className="searchbar">
                                                            <Search  className="searchIcon" />

                                                            <input 
                                                                      type="text" 
                                                                      placeholder = "Search for friend, post or video"
                                                                      className="searchInput" 
                                                            />
                                                  </div>
                                        </div>

                                        {/* right: divided into 3 parts: links, icons, img */}

                                        <div className="topbarRight">
                                                  <div className="topbarLinks">
                                                            <span className="topbarLink">Homepage</span>
                                                            <span className="topbarLink">Timeline</span>
                                                  </div>

                                                  <div className="topbarIcons">
                                                            <div className="topbarIconItem">
                                                                      <Person />

                                                                      <span className="topbarIconBadge">1</span>
                                                            </div>

                                                            <div className="topbarIconItem">
                                                                      <Chat />

                                                                      <span className="topbarIconBadge">2</span>
                                                            </div>

                                                            <div className="topbarIconItem">
                                                                      <Notifications />

                                                                      <span className="topbarIconBadge">1</span>
                                                            </div>
                                                  </div>

                                                  <Link to={ `/profile/${user.username}`}>
                                                            <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} alt="" className="topbarImg" />
                                                  </Link>
                                        </div>

                              </div>
                              
          )
}