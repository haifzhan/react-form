import React, { useState } from 'react';
import Input from './Input';

const initialState = {
    recordName: '',
    artistName: '',
    description: ''
};

const Form = ({ onSubmit }) => {
    const [entry, setEntry] = useState(initialState);

    const onSubmitHandler = e => {
        e.preventDefault();

        if (!entry.recordName || !entry.artistName) {
            return;
        }
        onSubmit({ ...entry });
        setEntry(initialState);
        console.log({ entry });
    }

    const onChangeHandler = e => {
        const { name, type } = e.target;
        const value = type === 'checkbox' ? e.target.checked : e.target.value;
        setEntry({ ...entry, [name]: value });
    }

    return (
        <>
            <form
                style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <Input
                    labelText="Record Name"
                    name="recordName"
                    value={entry.recordName}
                    onChange={onChangeHandler}
                />

                <Input
                    labelText="Artist Name"
                    name="artistName"
                    value={entry.artistName}
                    onChange={onChangeHandler}
                />

                <Input
                    type="textarea"
                    labelText="Description"
                    name="description"
                    value={entry.description}
                    onChange={onChangeHandler}
                />

                <button style={{ marginTop: '16px' }} type="submit">Add</button>
            </form>
        </>
    );
}

export default Form;