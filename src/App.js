import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import SearchCharacters from './pages/SearchCharacters';
import Character from './pages/Character';
import CharacterComics from './pages/CharacterComics';
import Comic from './pages/Comic';
import EventList from './pages/EventList';
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
          <Route path='/charactercomics/:id' component={CharacterComics} />
          <Route path='/character/:id' component={Character} />   
          <Route path='/comic/:id' component={Comic} />   
        </Switch>
      </div>
    </Router>
  );
}

export default App;
