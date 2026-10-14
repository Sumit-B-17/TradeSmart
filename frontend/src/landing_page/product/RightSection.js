import React from 'react';

function RightSection({
    imageUrl,
    productName,
    productDescription,
    tryDemo,
    learnMore,
    googlePlay,
    appStore
}) {
    return ( 
    <div className='container product'>
        <div className='row productRow'>
            <div className='col-4 product-description'>
                <h2>{productName}</h2>
                <p>{productDescription}</p>
                <div className='row product-links'>
                    <div className='col-6'>
                        <a href={learnMore}>Learn More →</a>
                    </div>
                </div>
            </div>
            
            <div className='col-1'></div>
            
            <div className='col-7 text-center'>
                <img src={imageUrl}/>
            </div>
        </div>
    </div>
    );
}

export default RightSection;