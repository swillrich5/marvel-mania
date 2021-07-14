import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import SearchCharacters from './pages/SearchCharacters';
import Character from './pages/Character';
import CharacterComics from './pages/CharacterComics';
import Comic from './pages/Comic';
import Event from './pages/Event';
import EventList from './pages/EventList';
import SeriesList from './pages/SeriesList';
import CreatorsList from './pages/CreatorsList';
import CharactersByURI from './pages/CharactersByURI';
import './App.css';


function App() {
  return (
    <Router>  
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/characters' component={SearchCharacters}/> 
          <Route exact path='/events' component={EventList}/> 
          <Route exact path='/series' component={SeriesList}/>     
          <Route exact path='/creators' component={CreatorsList}/>   
          <Route path='/charactercomics/:id' component={CharacterComics} />
          <Route path='/character/:id' component={Character} />   
          <Route path='/comic/:id' component={Comic} />   
          <Route path='/event/:id' component={Event} />   
          <Route path='/charactersbyuri/:id' component={CharactersByURI} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
