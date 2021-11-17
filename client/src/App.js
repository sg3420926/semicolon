
import './App.css';
import Ragister from './component/Ragister'
import Login from './component/Login'
import {Switch,Route} from 'react-router-dom';
import About from './component/About';
import Account from './component/Account';
import Profile from './component/Profile'
import Edit from './component/Edit'
function App() {
  return (
    <div className="App">
      <Switch>
      <Route exact path="/" component={Ragister}/>
      <Route exact path="/Login" component={Login}/>
      <Route exact path='/About' component={About}/>
      <Route exact path="/Welcome" component={Account}/>
      <Route exact path='/profile' component={Profile}/>
      <Route exact path='/editor' component={Edit}/>
     </Switch>
    </div>
  );
}

export default App;
