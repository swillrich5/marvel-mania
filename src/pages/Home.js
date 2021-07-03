import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import captainamerica from '../images/characters.png';

const Home = () => {

    return (
        <div className="container space-background">
            <div className="jumbotron">
                <h2>Welcome to Marvel-API-Browser</h2>
                <h2>Learning More about the Marvel API</h2>
                <p className="lead">This is my attempt at exploiting Marvel Comics API (Application Programming Interface) to learn more about the API and APIs in general.  I'm also hopeful that this will help others to learn more about Marvel and how their API works.
                    I'll add more API queries over time.  This is a work in progress that I plan to continue to add to over time.  However, it's far enough along to be useful.  I hope this is helpful 
                    and maybe a little fun!
                </p>
                <p className="lead mt-3 mb-5">My code repo for this app can be found in my <a  className="text-primary" href="https://github.com/swillrich5/marvel-api-browser">GitHub</a>.  Also, here's a link to my <a className="text-primary" href="https://www.scottwillrich.com/">portfolio site</a>.
                </p>
                <Link className="row justify-content-center" to='/characters'>
                    <div className="card col-md-12 col-lg-3 justify-content-center shadow-lg bg-light rounded">
                        <img className="card-img-top mx-auto pt-3 character-img" src={captainamerica} alt="Captain America"/>
                        <div className="card-body">
                            <p className="card-text text-center">Characters</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>


    )

}

export default Home;