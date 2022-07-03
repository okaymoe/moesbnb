// import React from 'react'
// import { useState } from 'react'
// import Card from '../Card'
// // import EditSpotModal from '../EditSpotModal'
// import './UserSpotsPage.css'
// const UserSpotsPage = ({ spots, user }) => {
//   const [cname, setCname] = useState('')
//   const [userSpotRendered, setUserSpotRendered] = useState(true)
//   const userSpots = spots.filter(spot => spot.userId === user.id)

//   return (
//     <div className='user-listings'>
//       {userSpots.map((spot) => (

//           <div className="user-listing">
//             <Card userSpotRendered={userSpotRendered} spot={spot} cname={cname}/>
//             <div className="user-listing-btns">
//               <button className='delete-listing'>Delete</button>
//             </div>
//           </div>

//       ))}
//     </div>
//   )
// }

// export default UserSpotsPage
