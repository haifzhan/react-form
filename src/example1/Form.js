import React, { useState, useEffect } from 'react';
import './form.css';

const initialState = {
    firstName: '',
    lastName: '',
    biography: '',
    transport: 'planes',
    agree: true,
    breakfast: false,
    lunch: false,
    dinner: false,
    shirtSize: 'medium'
};

const loadedState = {
    firstName: 'Haifeng',
    lastName: 'Zhang',
    biography: 'A full stack developer',
    transport: 'planes',
    agree: true,
    breakfast: true,
    lunch: false,
    dinner: false,
    shirtSize: 'large'
}

const FormContainer = () => {
    const [data, setData] = useState(initialState);

    const onSubmitHandler = formState => {
        console.log({ formState });
    }

    const onClickClearHandler = () => {
        setData(initialState);
    }

    const onClickLoadHandler = () => {
        setData(loadedState);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column'}}>
            <Form onSubmit={onSubmitHandler} data={data} />
            <button type="button" onClick={onClickClearHandler}>Clear Values</button>
            <button type="button" onClick={onClickLoadHandler}>Load Data</button>
        </div>
    );
}

const Form = ({ onSubmit, data }) => {
    const [formState, setFormState] = useState(initialState)
    useEffect(() => {
        setFormState(data)
    }, [data]);
    const onChangeHandler = e => {
        const { name, type } = e.target;
        const value = type === 'checkbox' ? e.target.checked : e.target.value;
        setFormState({
            ...formState,
            [name]: value
        });
        console.log({ formState });
    }

    const onSubmitHandler = e => {
        e.preventDefault();
        onSubmit(formState);
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <span>{`Your name is ${formState.firstName} ${formState.lastName}`}</span>
            <label htmlFor="firstName">First Name</label>
            <input
                id="firstName"
                name="firstName"
                value={formState.firstName}
                onChange={onChangeHandler}
            />

            <label htmlFor="lastName">Last Name</label>
            <input
                id="lastName"
                name="lastName"
                value={formState.lastName}
                onChange={onChangeHandler}
            />

            <label htmlFor="biography">Biography</label>
            <textarea
                id="biography"
                name="biography"
                rows="10"
                onChange={onChangeHandler}
                value={formState.biography}
            />

            <label htmlFor="transport">Preferred Transport</label>
            <select
                name="transport"
                id="transport"
                value={formState.transport}
                onChange={onChangeHandler}
            >
                <option>None selected</option>
                <option value="planes">Planes</option>
                <option value="trains">Trains</option>
                <option value="cars">Cars</option>
            </select>

            <fieldset>
                <legend>Select your meals</legend>
                <label htmlFor="breakfast">Breakfast</label>
                <input
                    type="checkbox"
                    id="breakfast"
                    name="breakfast"
                    onChange={onChangeHandler}
                    checked={formState.breakfast}
                />
                <label htmlFor="lunch">Lunch</label>
                <input
                    type="checkbox"
                    id="lunch"
                    name="lunch"
                    onChange={onChangeHandler}
                    checked={formState.lunch}
                />
                <label htmlFor="dinner">Dinner</label>
                <input
                    type="checkbox"
                    id="dinner"
                    name="dinner"
                    onChange={onChangeHandler}
                    checked={formState.dinner}
                />
            </fieldset>

            <fieldset>
                <legend>T-shirt Size</legend>
                <label htmlFor="sizeS">Small</label>
                <input
                    id="sizeS"
                    name="shirtSize"
                    type="radio"
                    value="small"
                    checked={formState.shirtSize === 'small'}
                    onChange={onChangeHandler}
                />
                <label htmlFor="sizeS">Medium</label>
                <input
                    id="sizeM"
                    name="shirtSize"
                    type="radio"
                    value="medium"
                    checked={formState.shirtSize === 'medium'}
                    onChange={onChangeHandler}
                />
                <label htmlFor="sizeL">Large</label>
                <input
                    id="sizeL"
                    name="shirtSize"
                    type="radio"
                    value="large"
                    checked={formState.shirtSize === 'large'}
                    onChange={onChangeHandler}
                />
            </fieldset>


            <label htmlFor="agree">I agree to the TOC</label>
            <input
                type="checkbox"
                id="agree"
                name="agree"
                onChange={onChangeHandler}
                checked={formState.agree}
            />
            <button type="submit">Save</button>
        </form>
    );
};

export default FormContainer;