import React from 'react';

function Hero() {
    return ( 
        <div className='container p-5 mb-5'>
            <div className='row text-center'>
                <img src='media/images/homeHero.png' alt='hero img' className='mb-5' style={{width: '70%', margin: '0 auto'}}></img>
                <h1 className='mt-3 text-muted fs-2'>Invest in everything</h1>
                <p className='text-muted fs-5 mb-5'>Online platform to invest in stocks, derivatives, mutual funds, ETFs, bonds, and more.</p>
                <button className='p-2 btn btn-primary fs-5 ' style={{width: '18%', margin: '0 auto'}}>Sign up for free</button>
            </div>
        </div>
     );
}

export default Hero;