import React, { useState } from 'react';
import { firebaseAuth } from '../Initializers/firebaseConfig';
import Login from './login/Login';
import Home from "./home/Home"

const Page = () => {

    const [isLogedIn, setIsLogedIn] = useState(false);

    firebaseAuth.onAuthStateChanged((user) => {
        if (user) {
            return setIsLogedIn(true);
        } else {
            return setIsLogedIn(false);
        }
    });
    return (
        <>
            {isLogedIn 
                ? <Home/>
                : <Login/> }
        </>
    );
};

export default Page;