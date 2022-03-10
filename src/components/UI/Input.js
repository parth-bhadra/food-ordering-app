import classes from './Input.module.css';

const Input = (props) => {
    return(
        <div className={classes.input}>
            <label htmlFor={props.input.id}>{props.label}</label>
            <input {...props.input} />
            {/* {props.children}        */}
        </div>
        
    )
};

export default Input;