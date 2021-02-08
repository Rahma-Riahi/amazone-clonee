import {useEffect} from 'react'
import './App.css';
import Header from './Header/Header';
import Home from './Home/Home';
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Checkout from './Checkout/Checkout';
import Login from './Login/Login';
import {auth} from './firebase'
import { useStateValue } from './StateProvider';
import Payment from './Payment/Payment';
import {loadStripe} from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js';
import Orders from './Orders/Orders';
const promise = loadStripe('pk_test_51IGNabKavGvweDqwsQ9cA1Lz9fy19JaMtuKtg8KRmywLE5wtwjiAeXl0FURwBQ21aG4l8y3VpUqXjn8yfAQ0ZHAY00iVVqoIVn');

function App() {
  const [{}, dispatch] = useStateValue();
  
  useEffect(()=>{
      auth.onAuthStateChanged(authUser=>{
        console.log('the uses is :', authUser);
        if(authUser){
            // the user just logged in / the user was logged in
          dispatch({
            type: 'SET_USER',
            user: authUser
          })     
        }else {
          // the user is loggrd
          dispatch({
            type: 'SET_USER',
            user: null
          }) 
        }
      })
  },[])
  return (
    <div className="app">
       
    <Router>
    
      <Switch>
         <Route path='/checkout'>
          <Header/>
           <Checkout/>
         </Route>  
          <Route path='/login'>
            <Login/>
           </Route> 
           <Route path='/payment'>
            <Header/>
            <Elements stripe={promise} >
              <Payment/>
            </Elements>
           </Route> 
           <Route path='/orders'>
            <Header/>
            <Orders/>
         </Route> 
         <Route path='/' exact={true}>
          <Header/>
           <Home/>
          </Route>
          
           
          
      </Switch>
     
    </Router>
   
    </div>
  );
}

export default App;
