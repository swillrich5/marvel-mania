import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import SearchCharacters from './pages/SearchCharacters';
import Character from './pages/Character';
import './App.css';


function App() {
  return (
    <Router>  
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/characters' component={SearchCharacters}/>  
          <Route path='/character/:id' component={Character} />        
        </Switch>
      </div>
    </Router>
  );
}

export default App;
