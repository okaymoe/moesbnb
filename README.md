# moesbnb #

**Created using:** 
- ***Javascript***
- ***React***
- ***Redux***
- ***Sequelize***
- ***PostgreSQL***
- ***Express***
- ***CSS***

Welcome to moesbnb! The functionality and essence similarly mimics airbnb. With moesbnb, users are able to create Spots and host their homes, apartments, etc. Users can also view other host's spots. After a spot has been created, users may leave a review of the spot, which can be deleted if the user wishes.  

**Take a trip to moesbnb:** https://moesbnb.herokuapp.com/

## **Home** ##
Upon landing on the home page, you may sign up or log in if you already have an account. If you wish to not create an account for convenience or confidential reasons, you may click the "Demo User" button on the Log In modal, which can be previewed below.

![Home](https://user-images.githubusercontent.com/97005259/177262467-9dec35b5-9d45-4575-a6fd-e9c65f8b5016.PNG)

### **Log In & Demo User** ###
![logindemo](https://user-images.githubusercontent.com/97005259/177262912-07dc0d11-61ef-4961-adab-a5e63cbe3a7a.PNG)

## **Home after Signing Up or Logging In** ##
After logging in or creating an account, you will be granted access to view all the Spots that have been created by hosts. If you create a spot, yours will be on this page too. You will also notice a navigation button render at the top right of the site, which will display your username, email, a button to host a Spot, and to see your already created spots (if you made any).

![spots](https://user-images.githubusercontent.com/97005259/177263084-1256757f-6767-4879-9dfd-e53020e4771a.PNG)

## **Create a Spot** ##
Here is the form to create a spot. Enter your spots details, which is the address of your spot, the city, state, country, title or name of your spot, and the nightly cost to rent your spot. If all looks well, you will be redirected to the second phase, which is adding an image to your spot. Users can post an image using a URL. Once all said is done, you will be taken to the *Your Spots* page, which shows you all the Spots you've created.  

![host](https://user-images.githubusercontent.com/97005259/177264645-4bfbf1c7-a38a-467c-a8e5-407a9e5d218e.PNG)

![addimage](https://user-images.githubusercontent.com/97005259/177265368-7867ffc0-ad01-47c5-9794-3b2ed759e613.PNG)

## **Your Spots** ##
Upon creation of your Spot, you may review all of them. If you want to edit the spot details, or remove the spot entirely, you can click the buttons respectively to do so. (Editing an image to be implemented in the future).

![yourspots](https://user-images.githubusercontent.com/97005259/177265577-5611f055-4a2b-47a8-9e99-b338affd164a.PNG)

## **Creating a Review** ##
As a user visitng a Spot, you are able to leave a review. If the review belongs to you, you do have the option to delete the review.

![reviews](https://user-images.githubusercontent.com/97005259/177267573-079a53b8-dae5-47b6-ac87-bec27d61f3cd.PNG)

## **Challenges and Future Implementations** ##
Where do I begin! Let's start off by saying I had a week to do this project. On day three, I was fully done, with extra functionality and features, such as adding more than one image to a spot, a calendar search to view available spots on certain dates, and a bookings feature which allowed users to book a Spot. On day four, a very weird bug occured. I'd fix said bug, and then another one popped up, each worse than the last. That took 3 days and many restless hours to fix. Although I fixed the chain of bugs that were destroying the entire functionality of the website, I had to let go of the extra features I implemented, and redesign the website. I am eager to find the extra time to come back to this project, re-add those features, and make this a better constructed website. Always taking the good from the bad, this sharpened my debugging skills, and ultimately made me a better developer.

## **Code Snippet** ##
### The Home Page ###
```const Home = () => {
  const sessionUser = useSelector(state => state.session.user);
  const spots = useSelector(state => Object.values(state.spots).map(spot => {
    return spot;
  }));

  
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSpots());
  }, [dispatch]);

  
  return (
    sessionUser &&
    <div>
        <p id="home_title">Check out some of our available spots below!</p>
        <ul className='container-home'>
        {spots.map(spot => {
        return (
          spot.Images &&
          <li key={spot.id} className="user-listings__cards_home" >
            <SpotCard spot={spot} />
          </li>
        )
        })}
        </ul>
    </div>
  )
}```
