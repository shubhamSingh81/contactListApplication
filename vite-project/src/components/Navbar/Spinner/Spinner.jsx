import React from 'react';
import spinner from '../../../assets/loading.gif';

let Spinner =() =>{
    return(
        <>
        <div>
            <img src={spinner} alt="" className='d-block m-auto' style={{width: '200px'}} />
        </div>
        </>
    ) 
}

export default Spinner;