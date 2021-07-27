import './post.css'
import { MoreVert } from "@material-ui/icons"
import { Users } from "../../dummyData"


export default function Post( {post}) {

          const user = Users.filter(e => e.id === 1)

          console.log(user);

          return (
                    <div className= "post">
                              <div className="postWrapper">
                                        <div className="postTop">
                                                  <div className="postTopLeft">
                                                            <img 
                                                                      src={
                                                                                Users.filter(u => u.id === post?.userId)[0].profilePicture
                                                                      }  
                                                                      alt="" 
                                                                      className="postProfileImg"
                                                            />
                                                            
                                                            <span className="postUsername">
                                                                      {
                                                                                Users.filter(u => u.id === post?.userId)[0].username
                                                                      }
                                                            </span>

                                                            <span className="postDate">{post.date}</span>
                                                            
                                                  </div>

                                                  <div className="postTopRight">
                                                            <MoreVert />
                                                  </div>
                                        </div>

                                        <div className="postCenter">
                                                  <span className="postText">{post?.desc}</span>
                                                  <img src={post.photo} alt="" className="postImg" />
                                        </div>

                                        <div className="postBottom">
                                                  <div className="postBottomLeft">
                                                            <img src="/assets/like.png" alt="" className="likeIcon" />
                                                            <img src="/assets/heart.png" alt="" className="likeIcon" />
                                                            <span className="postLikeCounter">{post.like} likes</span>
                                                  </div>

                                                  <div className="postBottomRight">
                                                            <div className="postCommentText">{post.comment} comments</div>
                                                  </div>
                                        </div>
                              </div>
                    </div>
          )
}
