import React, { useState, useEffect } from 'react'
import CheckoutProduct from '../Checkout/CheckoutProduct/CheckoutProduct'
import { useStateValue } from '../StateProvider'
import FlipMove from 'react-flip-move';
import './Payment.css';
import { Link, useHistory } from 'react-router-dom';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../reducer';
import axios from '../axios';
import {db}from '../firebase';
function Payment() {
    const [{basket, user}, dispatch]=useStateValue();
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError]=useState(null);
    const [disabled, setDisabled]=useState(true);
    const [succeeded, setSucceded]=useState(false);
    const [processing, setProcessing]=useState('');
    const [clientSecret, setClinetSecret]=useState(true);
    console.log('user',user)
    useEffect (()=>{
           // generate the special stripe wich allows us to charge a customer
        const getClientSecret = async ()=>{
           const response = await axios({
               method:'post',
               // Stripe excepts the total in a currencies subunits 
               url :`/payments/create?total=${getBasketTotal(basket)*100}`
           });
            console.log('respone payment', response)
           setClinetSecret(response.data.clientSecret);
        } 
        getClientSecret();  
    },[basket]);
    console.log('client secret is', clientSecret);
    const handelSubmit = async(event)=>{
        event.preventDefault();
        console.log('submut buy now clikck')
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({paymentIntent}) => {
           db.collection('users').doc(user?.uid).collection('orders').doc(paymentIntent.id).set({
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created
            })
            console.log('data firebase', basket, user.uid,paymentIntent.id)
            setSucceded(true);
            setError(null);
            setProcessing(false);
            dispatch({
                type: 'EMPTY_BASKET'
            })
            history.replace('/orders');
        })
    }
    const handelChange = event =>{
        console.log('card element', event)
      // Listen for changes in the CardElement
      // and display any errors as the customer types their card details
      setDisabled(event.empty);
      setError(event.error ? event.error.message: '');
    }
    return (
        <div className='payment'>
          
            <div className='payment__container'>
            <h1>Checkout (<Link to='/checkout'> {basket?.length} </Link>) </h1>
                {/**Payment section- delivery address */} 
                <div className='payment__section'>
                  <div className='payment__title'>
                      <h3>Delivery Address</h3>
                  </div>
                  <div className='payment__address'>
                      <p>{user?.email} </p>
                      <p>123 React Lane</p>
                      <p>Los Angeles,CA</p>
                  </div>
                </div>
                {/**Payment section- Review Items */} 
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                     <FlipMove>
                      {basket.map(item=>(
                          <CheckoutProduct key={item.id} title={item.title} image={item.image} id={item.id} price={item.price} rating={item.rating}  />
                      ))}
                     </FlipMove>   
                      
                  </div>
                </div>
                {/**Payment section- Payment method */} 
                <div className='payment__section'>
                  <div className='payment__title'>
                      <h3>Payment Method</h3>
                  </div>
                  <div className='payment_details' >
                       <form >
                           <CardElement onChange={handelChange} />
                           <div className='payment__priceContainer'>
                               
                             <CurrencyFormat
                                renderText ={(value)=>(
                                    <h3>Order Total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getBasketTotal(basket)}
                                displayType={'text'}
                                thousandSeparator={true} 
                                prefix={'$'}
                             />
                              <button disabled={processing || disabled || succeeded} onClick={handelSubmit}>
                              <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                               </button>
                             {/** Errors if there is an error only(&&) then show the error message */}
                             {error && <div>{error} </div> }
                           </div>
                       </form>
                  </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
