import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { editBookingThunk } from '../../store/booking';
import { deleteBookingThunk } from '../../store/booking';

const IndividualBooking = ({ data }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    const [errors, setErrors] = useState([]);
    const [editForm, setEditForm] = useState(false);
    const [startDate, setStartDate] = useState(data.startDate.split('T')[0]);
    const [endDate, setEndDate] = useState(data.endDate.split('T')[0]);
    const [cost, setCost] = useState(data.cost);
    const [deleteMsg, setDeleteMsg] = useState('Delete');
    const [disable, setDisable] = useState(false);

    const tomorrowDate = new Date();
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrow = tomorrowDate.toISOString().split('T')[0];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        let dispatchData;
        dispatchData = await dispatch(editBookingThunk({
            spotId: data.spotId,
            userId: user.id,
            startDate,
            endDate,
            cost
        }))
            .catch(async (res) => {
                const data = await res.json();
                if (data && data.errors) setErrors(data.errors);
            })
        if (dispatchData) setEditForm(!editForm);
        return dispatchData;
    }

    const handleDelete = async (e) => {
        if (deleteMsg === 'Delete') {
            setDeleteMsg('Confirm Deletion');
            e.target.disabled = true;
            setTimeout(() => {
                e.target.disabled = false;
            }, 2000)
        } else {
            await dispatch(deleteBookingThunk({spotId: data.spotId, userId: user.id}));
            setDeleteMsg('Delete');
        }
    }

    const handleCancel = () => {
        setEditForm(!editForm);
        setStartDate(data.startDate.split('T')[0]);
        setEndDate(data.endDate.split('T')[0]);
        setCost(data.cost);
        setDeleteMsg('Delete');
    }

    useEffect(() => {
        // Calculate difference between start & end date
        const formattedStart = new Date(startDate);
        const formattedEnd = new Date(endDate);
        const newToday = new Date();

        if (formattedStart.getTime() - newToday.getTime() > 0) {
            setDisable(false);
        } else {
            setDisable(true);
        }

        const diffInTime = formattedEnd.getTime() - formattedStart.getTime();
        const diffInDays = diffInTime / (1000 * 3600 * 24);

        if (!diffInDays) {
            setCost(parseInt(data.price, 10));
        } else {
            setCost(parseInt(data.price, 10) + (parseInt(data.price, 10) * diffInDays));
        }
    }, [startDate, endDate, data]);

    return (
        <>
            {!editForm ?
            <div className='individual-booking-container'>
                <p className='individual-review-title'>{data.spot}</p>
                <div className='individual-booking-info'>
                    <p className='individual-booking-info-dates-title'>Start: </p>
                    <p className='individual-booking-info-dates-start'>{data.startDate.split('T')[0]}</p>
                    <p className='individual-booking-info-dates-title'>End: </p>
                    <p>{data.endDate.split('T')[0]}</p>
                </div>
                <div className='individual-booking-info'>
                    <p className='individual-booking-info-dates-title'>Total Cost: </p>
                    <p>${data.cost}</p>
                </div>
                <div className='individual-booking-edit-button'>
                    <button onClick={!editForm ? (e) => setEditForm(!editForm)
                                : handleCancel}>{editForm ? 'Cancel' : 'Edit'}</button>
                </div>
            </div>
            :
            <>
                <form onSubmit={handleSubmit} className='individual-booking-container'>
                    <p className='individual-review-title'>{data.spot}</p>
                    {errors.length > 0 ?
                        <ul>
                            {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                        </ul> : null}
                    <label className='individual-booking-label'>
                        Start:
                        <input
                            className='individual-booking-input'
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            min={tomorrow}
                            max={endDate}
                            required
                        />
                    </label>
                    <label className='individual-booking-label'>
                        End:
                        <input
                            className='individual-booking-input'
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            min={tomorrow}
                            required
                        />
                    </label>
                    <p>Total Cost: ${cost}</p>
                    {disable ? <p>You cannot edit a booking while it's in progress.</p> : null}
                    <div className='individual-booking-edit-button' id='individual-booking-edit-button'>
                        <button type='submit' disabled={disable}>Submit Edit</button>
                    </div>
                    <div className='individual-booking-edit-button'>
                        <button onClick={!editForm ? (e) => setEditForm(!editForm)
                                    : handleCancel}>{editForm ? 'Cancel' : 'Edit'}</button>
                        <button onClick={handleDelete}>{deleteMsg}</button>
                    </div>
                </form>
            </>
            }
        </>
    );
}

export default IndividualBooking;
