import IndividualBooking from "./IndividualBooking";

const ProfileBookingContainer = ({ bookings }) => {
    return (
        <div className='booking-container'>
            <p className='list-title'>Your Bookings:</p>
            <div className='booking-list'>
                {bookings ?
                    Object.values(bookings).map((ele, i) => {
                        if (ele) {
                            return (
                                <IndividualBooking key={i} data={ele}/>
                            );
                        } else {
                            return <></>
                        }
                    })
                : null}
            </div>
        </div>
    );
}

export default ProfileBookingContainer;
