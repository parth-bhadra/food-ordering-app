import classes from './Checkout.module.css';
import { useState, useRef } from 'react';

const isNotEmpty = (value) => value.trim() !== '';
const isNotFiveCharsLong = (value) => value.length !== 5;

const Checkout = props => {

    const [formValidity, setFormValidity] = useState({
        name: true,
        street: true,
        postalCode: true,
        city: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();



    const confirmHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = isNotEmpty(enteredName);
        const enteredStreetIsValid = isNotEmpty(enteredStreet);
        const enteredPostalCodeIsValid = !isNotFiveCharsLong(enteredPostalCode);
        const enteredCityIsValid = isNotEmpty(enteredCity);

        setFormValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postalCode: enteredPostalCodeIsValid,
            city: enteredCityIsValid
        });
    }

    const nameControlClasses = `${classes.control} ${formValidity.name ? '' : classes.invalid}`;
    const streetControlClasses = `${classes.control} ${formValidity.street ? '' : classes.invalid}`;
    const postalCodeControlClasses = `${classes.control} ${formValidity.postalCode ? '' : classes.invalid}`;
    const cityControlClasses = `${classes.control} ${formValidity.city ? '' : classes.invalid}`;
    return <form onSubmit={confirmHandler}>
        <div className={nameControlClasses}>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" ref={nameInputRef}></input>
            {!formValidity.name && <p>Please enter valid name</p>}
        </div>
        <div className={streetControlClasses}>
            <label htmlFor="street">Your Address</label>
            <input type="text" id="street" ref={streetInputRef}></input>
            {!formValidity.street && <p>Please enter valid street</p>}
        </div>
        <div className={postalCodeControlClasses}>
            <label htmlFor="postal">Postal Code</label>
            <input type="text" id="postal" ref={postalCodeInputRef}></input>
            {!formValidity.postalCode && <p>Please enter valid postal code, 5 chars long</p>}
        </div>
        <div className={cityControlClasses}>
            <label htmlFor="city">City</label>
            <input type="text" id="city" ref={cityInputRef}></input>
            {!formValidity.city && <p>Please enter valid city</p>}
        </div>
        <div className={classes.actions}>
            <button onClick={props.onCancel}>Cancel</button>

            {/* this button will trigger form submission because it does not do anything else */}
            <button className={classes.submit}>Confirm</button>


        </div>

    </form>
}

export default Checkout;