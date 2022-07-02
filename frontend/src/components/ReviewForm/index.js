import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createReview } from "../../store/reviews";

import './ReviewForm.css'

const ReviewForm = ({ setShowReviewForm }) => {
  const [reviewComment, setReviewComment] = useState("");
  const updateReviewComment = (e) => setReviewComment(e.target.value);

  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const {id} = useParams();

  if (!sessionUser){
    return;
  }
  const userId = sessionUser.id

  const onSubmit = async (e) => {
    e.preventDefault();

    const data = {
      comment: reviewComment,
      userId,
      id
    }

    let newReview = await dispatch(createReview(data))
    setShowReviewForm(false)
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
                  type="text"
                  placeholder="Type your review here"
                  value={reviewComment}
                  onChange={updateReviewComment}
                  className="create-comment-input"
                  />
        <button className="create-comment-submit">Submit</button>
        <button onClick={() => setShowReviewForm(false)} className="create-comment-cancel">Cancel</button>
      </form>
    </>

  )
}

export default ReviewForm;
