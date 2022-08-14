import ReviewForm from "./ReviewForm";
import EditReviewForm from "./EditReviewForm";
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteReviewThunk } from '../../store/review'

import './ReviewContainer.css';

const ReviewContainer = ({ reviews }) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    let userId;
    if (sessionUser) userId = sessionUser.id;

    let review;
    review = useSelector((state) => state.spot.reviews[userId]);

    const [delMessage, setDelMessage] = useState('Delete');
    const [editForm, setEditForm] = useState(false);

    const handleDelete = async (e) => {
        e.preventDefault();

        if (delMessage === 'Delete') {
            setDelMessage('Are you sure?');
            e.target.disabled = true;
            setTimeout(() => {
                e.target.disabled = false;
            }, "2000")
        } else {
            await dispatch(deleteReviewThunk({review}));
            setDelMessage('Delete');
        }
    }

    return (
        <div id='spot-review-wrapper'>
            <div id='review-container-title'>
                <p>Reviews</p>
            </div>
            <div id='spot-review-container'>
            {sessionUser &&
                (!reviews[userId] || (reviews[userId] && !reviews[userId].id))
                ?
                <div id='review-form-container'>
                    <p>Post a review:</p>
                    <ReviewForm
                        setDelMessage={setDelMessage}
                        setEditForm={setEditForm}/>
                </div>
                : null}

            {sessionUser && reviews[userId] && reviews[userId].id ?
                <div className='spot-individual-review-container'>
                    <p>{`${sessionUser.username}'s Review:`}</p>
                    {editForm ?
                        <EditReviewForm
                            setDelMessage={setDelMessage}
                            setEditForm={setEditForm}/>
                        :
                        <>
                            <p>{reviews[userId].rating}/5 <i className={'fa-solid fa-star fa-lg rating-star'}></i></p>
                            <p>{reviews[userId].description}</p>
                        </>
                    }
                    {userId === reviews[userId].userId ?
                        <button className='review-modify-buttons' onClick={handleDelete}>{delMessage}</button> : null}
                    {userId === reviews[userId].userId ?
                        <button
                            className='review-modify-buttons'
                            id='edit-review-button'
                            onClick={() => {
                                setEditForm(!editForm)
                                setDelMessage('Delete')
                            }}
                            >{editForm ? 'Cancel' : 'Edit'}</button> : null}
                </div> : null }

            {Object.values(reviews).map((review, i) => {
                if (review.userId && review.userId !== userId) {
                    return (
                        <div key={i} className='spot-individual-review-container'>
                            <p>Anonymous Review:</p>
                            <p>{review.rating}/5 <i className={'fa-solid fa-star fa-lg rating-star'}></i></p>
                            <p>{review.description}</p>
                        </div>
                    );
                }
                return null;
            })}
            </div>
        </div>
    );
}

export default ReviewContainer;
