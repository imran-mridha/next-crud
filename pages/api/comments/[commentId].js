import { comments } from "@/data/comments"

export default function handler(req, res){
  const {commentId} = req.query
  console.log(commentId);
  if(req.method === "GET"){
    const comment = comments.find(comment => comment.id === parseInt(commentId))
    console.log(comment);
    res.status(200).json({
      message: "Success",
      data: comment
    })
  }else if(req.method === "DELETE"){
    const deletedComment = comments.find(comment => comment.id === parseInt(commentId))
    const index = comments.findIndex(comment => comment.id === parseInt(commentId))
    comments.splice(index, 1)
    res.status(200).json({
      message: "Success",
      data: deletedComment
    })
  }else if(req.method === "PATCH"){
    const commentIndex = comments.findIndex(comment => comment.id === parseInt(commentId))
    if(commentIndex === -1){
      res.status(404).json({error: 'Comment not found'})
    }else{
      const updatedComment = {...comments[commentIndex], text: req.body.comment}
      comments[commentIndex] = updatedComment
      res.status(200).json(updatedComment)
    }
  }
}