import React, { useReducer, useEffect, useState } from 'react';
import axios from 'axios';
import './Form.css';

const initialState = {
    name: "",
    dob: "",
    country: "",
    resume: "",
};

const reducer = (state, { type, payload }) => {
    switch (type) {
        case 'handleUpdate':
            return ({
                ...state,
                [payload.field]: payload.value
            });
        case 'reset':
            return ({ ...initialState });
        default:
            throw new Error();
    }
};

function Form() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [countriesList, setCountriesList] = useState([]);

    useEffect(() => {
        if (!countriesList.length) {
            axios
                .get('https://cors-anywhere-proxy-app-heroku.herokuapp.com/https://addictive-media-backend-app.herokuapp.com/countries-list')
                .then(({ data }) => setCountriesList(data));
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.get('https://cors-anywhere-proxy-app-heroku.herokuapp.com/https://addictive-media-backend-app.herokuapp.com/add-credentials', {
                params: state
            });
            dispatch({ type: 'reset' });
        }
        catch (e) {
            console.error(e);
        }
    };

    return (
        <React.Fragment>
            <div className='form-wrapper'>
                <form className="form" onSubmit={handleSubmit}>
                    {[
                        {
                            label: 'Name',
                            type: 'text',
                            id: 'name'
                        },
                        {
                            label: 'Date Of Birth',
                            type: 'date',
                            id: 'dob'
                        },
                        {
                            label: 'Resume',
                            type: 'file',
                            id: 'resume'
                        }
                    ].map(({ id, type, label }) => (
                        <div className='form__field' key={id}>
                            <label
                                className='form__field-label'
                                htmlFor={id}
                            >
                                {label}:
                            </label>
                            <input
                                className='form__field-input'
                                type={type}
                                id={id}
                                value={state[id]}
                                onChange={(e) => dispatch({
                                    type: 'handleUpdate',
                                    payload: {
                                        field: id,
                                        value: e.target.value
                                    }
                                })}
                            />
                        </div>
                    ))}

                    <select name='country' value={state['country']} onChange={(e) => dispatch({
                        type: 'handleUpdate',
                        payload: {
                            field: 'country',
                            value: e.target.value
                        }
                    })}>
                        {countriesList?.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                        ))}
                    </select>

                    <div className="form__btn-group">
                        <button
                            className='form__btn form__submit'
                            type='submit'
                        >
                            Submit
                        </button>
                        <button
                            className='form__btn form__reset'
                            type='reset'
                            onClick={() => dispatch({ type: 'reset' })}
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

export default Form;