import { useState, useEffect } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import 'dotenv/config';

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    const [isloading, setIsLoading] = useState(false);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchMeals = async () => {
            setIsLoading(true);
            const response = await fetch(process.env.REACT_APP_FIREBASE + 'bla');
            if (!response.ok) {
                throw new Error('something went wrong...');
            }
            const responseData = await response.json();
            const loadedMeals = [];

            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    key: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                })
            }
            setMeals(loadedMeals);
            setIsLoading(false);
            setHttpError(null);
        }
        // what happens here
        // Uncaught (in promise) Error: something went wrong... at fetchMeals (AvailableMeals.js:17:1)
        // why
        // because fetch meals is an async function
        // when error is thrown
        // the async function rejects it 
        // to capture the error, you need to await it
        // but that is not possible because it would require us to alter the signature of our useEffect function
        // which is not allowed
        // useEffect fuctions cannot return a promise
        // you can hover over and check it
        // if you still want to go with try catch approach, you will have to wrap this in another function and call it

        const fetchMealsAsyncWrapper = async () => {
            try {
                await fetchMeals();
            } catch (error) {
                console.log(error.message);
                setIsLoading(false);
                setHttpError(error.message);
            }
        }

        fetchMealsAsyncWrapper();


    }, []);
    const mealsList = meals.map(meal => (
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />))

    if (isloading) {
        return (
            <section className={classes.MealsLoading}>
                <p>loading...</p>
            </section>
        )
    }

    if (httpError) {
        return (
            <section className={classes.MealsError}>
                <p>failed to load data...</p>
            </section>
        )
    }

    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals