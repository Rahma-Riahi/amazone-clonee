import React  from 'react'
import './Home.css'
import Product from './Product/Product';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
function Home() {
  const banner= [
      {image : 'https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg'},
       {image : 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Toys_en_US_1x._CB431858161_.jpg'},
      {image : 'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Home_v2_en_US_1x._CB429090084_.jpg'},
      {image :'https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Computers_1x._CB432469755_.jpg'}           
    ]


      
    return (
        <div className='home'>
          <div className='home__container'>
            <Slider lassName="slider-wrapper" autoplay={1000}>
              {banner.map((img, index) =>
              <div key={index} >
                  <img className='home__image' src={img.image} />
              </div>)}     
              
            </Slider>
           
                <div className='home__row'>
              <Product id ='123456'
                       title='the lean startup' 
                       price ={29.99}
                       image='https://388760.smushcdn.com/1732391/wp-content/uploads/2013/01/The-Lean-Startup-Ed-Capaldi-681x1024.jpg?lossy=0&strip=1&webp=1'
                       rating={5}
                      />
              <Product 
                       id ='123457'
                       title='Kenwood kMix Stand Mixer for Baking, Stylish Kitchen Mixer with K-beater, Dough Hook and Whisk, 5 Litre Glass Bowl, Removable Splash Guard, 1000 W, Black' 
                       price ={239}
                       image='https://images-na.ssl-images-amazon.com/images/I/61etD4-IrPL._AC_SX425_.jpg'
                       rating={4}
              />

          </div>
          <div className='home__row'>
              <Product id='123458'
                       title='Amazon Echo Dot Smart Speaker with Alexa - Charcoal
                       Brand: UKB'
                       price={30}
                       rating={3}
                       image='https://images-na.ssl-images-amazon.com/images/I/61V5eFpSrGL._AC_SX679_.jpg'              
              />
              <Product  id='123459'
                        title='Bluetooth 5.0 Wireless Earbuds, Hi-Fi Stereo Earphones with 300Mah Charging Case IPX5 Waterproof Headset Built-in Mic for iPhone iOS and Android Devices'
                       price={25.49}
                       rating={3}
                       image='https://images-na.ssl-images-amazon.com/images/I/6161--0ZAuL._AC_SY450_.jpg'/>

              <Product id ='1234510'
                       title='Introducing Blink Mini | Compact indoor plug-in smart security camera, 1080p HD video, motion detection, Works with Alexa | 1'
                       price={40.99}
                       rating={5}
                       image='https://images-na.ssl-images-amazon.com/images/I/71VEryDkYKL._SY355_.jpg'/>
              
               </div>
               <div className='home__row'>
               <Product id ='1234511'
                        title='Philips 439P9H - 43 Inch Superwide Curved LED monitor, Webcam, Speakers, KVM switch, USB-C Docking, Ergonomic Stand (3840 x 1200, 100 Hz - VA - 450 cd/m² - 4 ms, HDMI/DP/USB-C)'
                        price={1.003}
                        rating={4}
                        image='https://images-na.ssl-images-amazon.com/images/I/617XViJ6fWL._AC_SX679_.jpg'





               />
             
                 
               </div>
          </div>
      
        </div>
    )
}

export default Home
