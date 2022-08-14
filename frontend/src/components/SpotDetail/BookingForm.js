import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createBookingThunk } from '../../store/booking'

const BookingForm = ({ userId, price }) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const spot = useSelector(state => state.spot);
    const user = useSelector(state => state.session.user);

    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrow = tomorrowDate.toISOString().split('T')[0];
    const threeDaysFromTodayDate = new Date();
    threeDaysFromTodayDate.setDate(threeDaysFromTodayDate.getDate() + 3); // 3 days from today
    const threeDaysFromToday = threeDaysFromTodayDate.toISOString().split('T')[0];

    const [errors, setErrors] = useState([]);
    const [startDate, setStartDate] = useState(tomorrow);
    const [endDate, setEndDate] = useState(threeDaysFromToday);
    const [cost, setCost] = useState(price)
    const [submitState, setSubmitState] = useState(false);

    useEffect(() => {
        if (spot.bookings && spot.bookings[userId]) setSubmitState(true);
        if (!user) setSubmitState(false);
        // Calculate difference between start & end date
        const formattedStart = new Date(startDate);
        const formattedEnd = new Date(endDate);

        const diffInTime = formattedEnd.getTime() - formattedStart.getTime();
        const diffInDays = diffInTime / (1000 * 3600 * 24);

        setCost(parseInt(price, 10) + (parseInt(price, 10) * diffInDays));
    }, [startDate, endDate, price, user, spot.bookings, userId])

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) return history.push(`/login`)
        if (!submitState) {
            setErrors([]);
            let dispatchData;
            dispatchData = await dispatch(createBookingThunk({spotId: spot.data.id, userId, startDate, endDate, cost}))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
            if (!dispatchData) setSubmitState(false);
            setSubmitState(true);
            return dispatchData;
        } else {
            return history.push(`/users/${user.id}`)
        }
    }

    return (
        <>
            { (spot.data.userId === userId) ? null :
                <form id='booking-form' onSubmit={handleSubmit}>
                    {errors.length > 0 ?
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul> : null}
                    <p id='book-your-stay'>Book your stay:</p>
                    <>
                    {submitState ?
                    <p>Looks like you've booked this spot! Visit your profile to change the details.</p>
                    :
                    <>
                        <label id='start-date'>
                            Start Date:
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                min={tomorrow}
                                max={endDate}
                                className='dates'
                                required
                            />
                        </label>
                        <label id='end-date'>
                            End Date:
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                min={tomorrow}
                                className='dates'
                                required
                            />
                        </label>
                        <p id='spot-details-total'>Total Cost: <span>${cost}</span></p>
                    </>
                    }
                    </>
                    <button type='submit' id='submit-booking-button'>
                        {(submitState || spot.bookings[userId]) && user ? 'Profile'
                        : 'Submit Booking'}</button>
                </form>
            }
        </>
    );
}

export default BookingForm;
