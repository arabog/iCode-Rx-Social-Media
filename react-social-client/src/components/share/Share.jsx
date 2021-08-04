import './share.css'
import { PermMedia, Label, Room, EmojiEmotions } from "@material-ui/icons"
import { useContext, useRef, useState } from 'react'
import { AuthContext } from "../../context/AuthContext"

export default function Share() {
          const { user } = useContext(AuthContext)
          const PF = process.env.REACT_APP_PUBLIC_FOLDER;
          const desc = useRef()
          const [file, setFile] = useState(null)

          const submitHandler =(e) => {
                    e.preventDefault()

                    const newPost = {
                              userId: user._id,
                              desc: desc.current.value
                    }
          }

          return (
                    <div className = "share">
                              <div className="shareWrapper">
                                        <div className="shareTop">
                                                  <img src={user.profilePicture ? PF+user.profilePicture : PF+"person/noAvatar.png"} alt="" className="shareProfileImg" />

                                                  <input 
                                                            type="text"  
                                                            placeholder= {"What's on your mind " + user.username + "?" }
                                                            className="shareInput" 
                                                            ref= {desc}
                                                  />
                                        </div>

                                        <hr className="shareHr" />

                                        <form className="shareBottom" onSubmit={submitHandler}>
                                                  <div className="shareOptions">

                                                            <label htmlFor="file" className="shareOption">
                                                                      <PermMedia htmlColor ="tomato" className="shareIcon" />
                                                                      <span className="shareOptionText">Photo or Video</span>
                                                                      
                                                                      <input 
                                                                                style={{display: "none"}}
                                                                                type="file" 
                                                                                id="file" 
                                                                                accept=".png,.jpeg,.jpg" 
                                                                                onChange={ (e) => setFile(e.target.files[0])}          
                                                                      />
                                                            </label>

                                                            <div className="shareOption">
                                                                      <Label htmlColor ="blue" className="shareIcon" />
                                                                      <span className="shareOptionText">Tag</span>
                                                            </div>

                                                            <div className="shareOption">
                                                                      <Room htmlColor ="green" className="shareIcon" />
                                                                      <span className="shareOptionText">Location</span>
                                                            </div>

                                                            <div className="shareOption">
                                                                      <EmojiEmotions htmlColor ="goldenrod" className="shareIcon" />
                                                                      <span className="shareOptionText">Feelings</span>
                                                            </div>

                                                  </div>

                                                  <div className="shareButton" type="submit">Share</div>
                                        </form>
                              </div>
                    </div>
          )
}
