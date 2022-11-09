import React, { useReducer, useEffect, useRef } from 'react';
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
    const countriesList = useRef(null);

    useEffect(() => {
        if (!countriesList.length) {
            axios
                .get('http://localhost:4000/countries-list')
                .then(data => countriesList.current = data);
        }
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.get('http://localhost:4000/add-credentials', {
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
                            label: 'Country',
                            type: 'text',
                            id: 'country',
                            options: countriesList.current
                        },
                        {
                            label: 'Resume',
                            type: 'file',
                            id: 'resume'
                        }
                    ].map(({ id, type, label, options }) => (
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
                            >
                                {options?.map(opt => (
                                    <option value={opt}>{opt}</option>
                                ))}
                            </input>
                        </div>
                    ))}
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