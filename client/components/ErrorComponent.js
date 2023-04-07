import React from 'react';
import { useSelector } from 'react-redux';

const ErrorComponent = () => {
    const {errorMessage} = useSelector(state => state.GUI)
    console.log('ErrorState',errorMessage)
    const firstSentence = errorMessage.split('.')[0]
    
    return (
        <div>
            <p>{firstSentence}</p>
            
        </div>
    )
}

export default ErrorComponent

