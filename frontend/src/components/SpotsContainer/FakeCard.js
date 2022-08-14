import './SpotsContainer.css';

const FakeCard = () => {
    return (
        <div className='individual-spot-fake'>
            <div className='img-container'>
                <div className='slide-active'>
                    <div className='individual-spot-img-fake'></div>
                </div>
            </div>
            <div>
                <div className='spot-card-topinfo'>
                    <div className='spot-card-name-fake'></div>
                    <div className='spot-card-rating-fake'></div>
                </div>
                <div className='spot-card-price-fake'></div>
            </div>
        </div>
    );
}

export default FakeCard;
