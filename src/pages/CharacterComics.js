import React from 'react';
import '../App.css';
import './Home.css';

console.log("Am I getting here");

const CharacterComics = ({ match }) => {

    console.log("Am I getting here???");
    console.log("params = " + match.params.id);

    return (
        <div className="container space-background">
            {console.log("Hello")}
            <div className="jumbotron">
                <div className="row justify-content-center pb-3">
                    <h1>Hello - this is the comics page</h1>
                </div>
            </div>
        </div>
    )
}

export default CharacterComics;
