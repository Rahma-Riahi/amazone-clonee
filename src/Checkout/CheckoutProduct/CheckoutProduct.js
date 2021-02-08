import React, {forwardRef } from 'react'
import { useStateValue } from '../../StateProvider';
import './CheckoutProduct.css';

const CheckoutProduct= forwardRef (({image, price, rating,id, title, hideButton}, ref )=> { 
           const [{}, dispatch] = useStateValue();

     console.log('id', id)
    const removefromBasket =()=>{
        dispatch({
            type:'REMOVE_FROM_BASKET',
            id:id
        })
    }
    return (
        <div className='checkoutProduct' ref={ref}>
              <img src={image} alt='checkoutProduct' /> 
                             <div className='checkoutProduct__info'>
                               <strong>{title}</strong> 
                               <p className='checkoutProduct__price'>
                                <small> $</small>
                                <strong>{price} </strong>
                              </p>
                              <p className='checkoutProduct__rating'>  
                                {Array(rating).fill().map((_,i)=>(
                                    <p>  ★ </p> 
                                ) )}
                        
                                </p>  
                                {!hideButton &&(
                                       <button className='checkoutProduct__Removebutton'onClick={removefromBasket}>Remove from basket</button>  
                                ) }
                             
                             </div>
                           
                     
        </div>
    );
});

export default CheckoutProduct
