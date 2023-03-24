import { useState } from "react";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState(null);

  const fetchComments = async () => {
    const res = await fetch("/api/comments");
    const data = await res.json();
    setComments(data.data);
  };
  const submitComment = async () => {
    const url = commentId ? `/api/comments/${commentId}` : "/api/comments"
    const method = commentId ? "PATCH" : "POST"
    const res = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },           
      body: JSON.stringify({comment}),
    })
    const data = await res.json()
    console.log(data);
    setComment(""); // clear comment input field after submit
    setCommentId(null); // clear commentId after submit
    fetchComments();
  }
  const deleteComment = async (commentId) =>{
    const res = await fetch(`/api/comments/${commentId}`,{
      method: "DELETE"
    })
    const data = await res.json()
    console.log(data);
    fetchComments()
  }
  const updateComment = async (commentId) => {
    const comment = comments.find(comment => comment.id === commentId)
    setComment(comment.text)
    setCommentId(commentId)
  }
  return (
    <div>
      <input type="text" value={comment} onChange={(e)=> setComment(e.target.value)}/>
      <button onClick={submitComment}>{commentId ? "Update Comment" : "Submit Comment"}</button>
      <button onClick={fetchComments}>See All Comments</button>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.id} {comment.text}</p>
          <button onClick={()=> deleteComment(comment.id)}>Delete</button>
          <button onClick={()=>updateComment(comment.id)}>Update</button>
        </div>
      ))}
    </div>
  );
};

export default Comments;
