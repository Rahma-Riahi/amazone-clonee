import React, {} from 'react'
import './Subtotal.css';
import CurrencyFormat from 'react-currency-format';
import { useStateValue } from '../../StateProvider';
import { useHistory } from 'react-router-dom';
import { getBasketTotal } from '../../reducer';

function Subtotal() {
    const [{basket}]=useStateValue();
    const history = useHistory();
    
   // const Sum = basket?.map((item)=>item.price).reduce((a,b)=>{return a+b},0);
    return (
        <div className='subtotal'>
            <CurrencyFormat 
              renderText={(value)=>(
                  <> 
                    <p>Subtotal ({basket.length} items): 
                    <strong>{value}  </strong> </p>
                    <small className='subtotal__gift'>
                      <input type='checkbox' /> This order contains a gift
                    </small>
                  </>
              )}
              decimalScale={2}
              value={getBasketTotal(basket)}
              displayType={'text'}
              thousandSeparator={true} 
              prefix={'$'}
            />
            <button onClick={e=>history.push('/payment')}>Procced to checkout</button>
        </div>
    )
}

export default Subtotal
