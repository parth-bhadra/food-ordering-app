import { useState, useEffect } from 'react';
import Card from '../UI/Card';
import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import 'dotenv/config';
/* const DUMMY_MEALS = [
    {
        id: 'm1',
        name: 'Sushi',
        description: 'Finest fish and veggies',
        price: 22.99,
    },
    {
        id: 'm2',
        name: 'Schnitzel',
        description: 'A german specialty!',
        price: 16.5,
    },
    {
        id: 'm3',
        name: 'Barbecue Burger',
        description: 'American, raw, meaty',
        price: 12.99,
    },
    {
        id: 'm4',
        name: 'Green Bowl',
        description: 'Healthy...and green...',
        price: 18.99,
    },
]; */

const AvailableMeals = () => {
    const [meals, setMeals] = useState([]);
    // console.log(process.env);
    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch(process.env.REACT_APP_FIREBASE);
            const responseData = await response.json();
            // console.log(responseData);
            const loadedMeals = [];

            for (const key in responseData){
                loadedMeals.push({
                    id: key,
                    key: key,
                    name: responseData[key].name,
                    description: responseData[key].description,
                    price: responseData[key].price
                })
            }

            // console.log(loadedMeals);
            // once you have this data
            // you would like your component to be re evaluated
            // and for the same, you will manage a state
            setMeals(loadedMeals);

        }
        fetchMeals();
        
    }, []);
    const mealsList = meals.map(meal => (
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />))
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