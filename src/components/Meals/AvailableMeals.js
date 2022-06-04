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
            const response = await fetch(process.env.REACT_APP_FIREBASE + 'meals.json');
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