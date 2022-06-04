import { useState, useContext } from 'react';
import Modal from '../UI/Modal';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const [isCheckout, setIsCheckout] = useState(false);


    const cartItems = cartCtx.items
        .map(item =>
            <CartItem
                key={item.id}
                name={item.name}
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
            />);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const onClickOrderHandler = () => {
        setIsCheckout(true);
    }

    const onCancelCheckoutHandler = () => {
        setIsCheckout(false);
    }

    const submitOrderHandler = (userData) => {
        // send the data to backend from here
        fetch(process.env.REACT_APP_FIREBASE + 'orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        })
    }

    const modalActions =
        <div className={classes.actions}>
            <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
            {hasItems && <button className={classes.button} onClick={onClickOrderHandler}>Order</button>}
        </div>;


    return (
        <Modal onClick={props.onClose}>
            <ul className={classes['cart-items']}>{cartItems}</ul>
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onSubmit={submitOrderHandler} onCancel={onCancelCheckoutHandler} />}
            {!isCheckout && modalActions}
        </Modal>

    );
}

export default Cart;