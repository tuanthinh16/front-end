
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
          <Route path="/front-end/login"><Login /></Route>
          <Route path="/front-end/register"><Register /></Route>
          <Route path="/front-end/logout"><Logout /></Route>
          <Route path="/front-end/profile/:value" children={<Profile />}></Route>
          <Route path="/front-end/user-profile/:username" children={<UserProfile />}></Route>
          <Route path="/front-end/book/add-book"><AddBook /></Route>
          <Route path="/front-end/book/profile/:idBook" children={<BProfile />}></Route>
          <Route path='/front-end/book/sell-book'><SellForm /></Route>
          <Route path='/front-end/wallet/:username' children ={<Wallet />}></Route>
          <Route path='/front-end/'><Home /></Route>

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
