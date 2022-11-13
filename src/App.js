
import './App.css';

import {BrowserRouter as Router, Route,Switch} from 'react-router-dom';
import {SnackbarProvider} from 'notistack';
import Login from './templates/account/login';
import Register from './templates/account/register';
import Logout from './templates/account/logout';
import Profile from './templates/account/profile';
import UserProfile from './templates/account/userprofile';
import Home from './templates/index2';
//book
import BProfile from './templates/book/profile';
//wallet
import { Wallet } from './templates/wallet/wallet';
import AddBook from './templates/book/addbook';
import SellForm from './templates/book/sellForm';
function App() {
  return (
    <SnackbarProvider>
    <Router>
      <Switch>
          <Route path="/login"><Login /></Route>
          <Route path="/register"><Register /></Route>
          <Route path="/logout"><Logout /></Route>
          <Route path="/profile/:value" children={<Profile />}></Route>
          <Route path="/user-profile/:username" children={<UserProfile />}></Route>
          <Route path="/book/add-book"><AddBook /></Route>
          <Route path="/book/profile/:idBook" children={<BProfile />}></Route>
          <Route path='/book/sell-book'><SellForm /></Route>
          <Route path='/wallet/:username' children ={<Wallet />}></Route>
          <Route path='/'><Home /></Route>

{/* 
        <Route path="/">
          <Index />
        </Route> */}
        
      </Switch>
    </Router>
  </SnackbarProvider>
  );
}

export default App;
