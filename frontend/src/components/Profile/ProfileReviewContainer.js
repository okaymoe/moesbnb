const ProfileReviewContainer = ({ reviews }) => {
    return (
        <div className='review-container'>
            <p className='list-title'>Your Reviews:</p>
            <div className='review-list'>
                {reviews ?
                    Object.values(reviews).map((ele, i) => {
                        return (
                            <div key={i} className='individual-review-container'>
                                <p className='individual-review-title'>{ele.spot}</p>
                                <p>{ele.rating}/5 <i className={'fa-solid fa-star fa-lg rating-star'}></i></p>
                                <p>Description: </p>
                                <p>{ele.description}</p>
                            </div>
                        )
                    })
                : null}
            </div>
        </div>
    );
}

export default ProfileReviewContainer;
