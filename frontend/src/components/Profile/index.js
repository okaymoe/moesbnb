import { useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getUserDetail } from '../../store/session';
import ProfileReviewContainer from './ProfileReviewContainer';
import ProfileBookingContainer from './ProfileBookingContainer';

import './Profile.css';

const Profile = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { userId } = useParams();
    const sesh = useSelector(state => state.session);

    useEffect(() => {
        if (!sesh.user) return history.push('/');
        if (!sesh.user.id) return history.push('/');
        if (sesh.user.id !== parseInt(userId, 10)) return history.push('/');
        dispatch(getUserDetail(userId));
    }, [dispatch, history, sesh.user, userId]);

    return (
        <div className='profile-wrapper'>
            {sesh.user ?
            <div className='profile-container'>
                <h2>{sesh.user.username}'s Profile</h2>
                <div className='profile-info'>
                    <ProfileReviewContainer reviews={sesh.user.reviews} />
                    <ProfileBookingContainer bookings={sesh.user.bookings} />
                </div>
            </div>
                : null
            }
        </div>
    );
}

export default Profile;
