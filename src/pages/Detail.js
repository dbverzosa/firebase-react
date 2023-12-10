import { Timestamp, collection, doc, getDoc, getDocs, limit, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebaseConfig'
import FeatureBlogs from '../components/FeatureBlogs'
import Tags from '../components/Tags'
import { isEmpty } from 'lodash'
import UserComments from '../components/UserComments'
import CommentBox from '../components/CommentBox'
import { toast } from 'react-toastify'
import Like from '../components/Like'
import Spinner from '../components/Spinner'

const Detail = ({ setActive, user }) => {

  const userId = user?.uid;

  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [comments, setComments] = useState([]);
  const [userComment, setUserComment] = useState("");
  let [likes, setLikes] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const getRecentBlogs = async () => {
      const blogRef = collection(db, "blogs");
      const recentBlogs = query(
        blogRef,
        orderBy("timestamp", "desc"),
        limit(5)
      );
      const docSnapshot = await getDocs(recentBlogs);
      setBlogs(docSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    getRecentBlogs();
  }, []);


  useEffect(() => {
    id && getBlogDetail();
    // eslint-disable-next-line 
  }, [id]);

  if(loading) {
    return <Spinner/>
  }

  const getBlogDetail = async () => {
    setLoading(true);
    const blogRef = collection(db, "blogs");
    const docRef = doc(db, "blogs", id);
    const blogDetail = await getDoc(docRef);
    const blogs = await getDocs(blogRef);
    let tags = [];
    blogs.docs.map((doc) => tags.push(...doc.get("tags")));
    let uniqueTags = [...new Set(tags)];
    setTags(uniqueTags);
    setBlog(blogDetail.data());
    setComments(blogDetail.data().comments ? blogDetail.data().comments : []);
    setLikes(blogDetail.data().likes ? blogDetail.data().likes : []);
    setActive(null);
    setLoading(false);

  };


  const handleComment = async (e) => {
    e.preventDefault();
    comments.push({
      createdAt: Timestamp.fromDate(new Date()),
      userId,
      name: user?.displayName,
      body: userComment,
    });
    toast.success("Comment posted successfully");
    await updateDoc(doc(db, "blogs", id), {
      ...blog,
      comments,
      timestamp: serverTimestamp(),
    });
    setComments(comments);
    setUserComment("");
  };

  const handleLike = async () => {
    if (userId) {
      if (blog?.likes) {
        const index = likes.findIndex((id) => id === userId);
        if (index === -1) {
          likes.push(userId);
          setLikes([...new Set(likes)]);
        } else {
          likes = likes.filter((id) => id !== userId);
          setLikes(likes);
        }
      }
      await updateDoc(doc(db, "blogs", id), {
        ...blog,
        likes,
        timestamp: serverTimestamp(),
      });
    }
  };

  return (
    <div className="single">
      <div
        className="blog-title-box"
        style={{ backgroundImage: `url('${blog?.imgUrl}')` }}
      >
        <div className="overlay"></div>
        <div className="blog-title">
          <span>{blog?.timestamp.toDate().toDateString()}</span>
          <h2>{blog?.title}</h2>
        </div>
      </div>
      <div className="container-fluid pb-4 pt-4 padding blog-single-content">
        <div className="container padding">
          <div className="row mx-0">
            <div className="col-md-8">
              <span className="meta-info text-start">
                By <p className="author">{blog?.author}</p> -&nbsp;
                {blog?.timestamp.toDate().toDateString()}
                <Like handleLike={handleLike} likes={likes} userId={userId} />
              </span>
              <p className="text-start">{blog?.description}</p>
              <div className="text-start">
                <Tags tags={blog?.tags} />
              </div>
              <br />
              <div className="custombox">
              <div className="scroll">
                <h4 className='small-title'>
                  {comments?.length} Comment</h4>
                {isEmpty(comments) ? (
                  <UserComments msg={"This blog has no comments yet"} />
                ) : (
                  <>
                    {comments.map((comment) => (
                      <UserComments {...comment} />
                    ))}
                  </>
                )}
                </div>
              </div>
              <CommentBox userId={userId} userComment={userComment} setUserComment={setUserComment} handleComment={handleComment} />
            </div>
            <div className="col-md-3">
              <div className="blog-heading text-start py-2 mb-4">  <Tags tags={tags} /></div>
              {/* <Tags tags={tags} /> */}
              <FeatureBlogs title={"Recent Blogs"} blogs={blogs} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Detail