import React from 'react';
import { useSelector } from 'react-redux';

const ErrorComponent = () => {

    const { origin, destination } = useSelector(state => state.GUI)
    const errorMessage = origin.errorMessage || destination.errorMessage
    console.log('ErrorState', errorMessage)
    const firstSentence = errorMessage.split('.')[0]

    return (
        <div>
            <p>{firstSentence}</p>
            <p>Hello</p>

        </div>
    )
}

export default ErrorComponent

