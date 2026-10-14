import React from 'react';

function Education() {
    return ( 
        <div className='container p-3'>
            <div className='row p-5'>
                <div className='col-6 p-5'>
                    <img src='media/images/index-education.svg' alt='varsity' style={{width:'80%'}}></img>
                </div>
                <div className='col-6 p-5'>
                    <div className=''>
                        <h1 className='fs-3 text-muted mb-4'>Free and open market education</h1>
                        <p className='fs-6 text-muted'>Varsity, the largest online stock market education book in the world covering everything from the basics to advanced trading.</p>
                        <a href='' className='my-5' style={{textDecoration:'none'}}>Varsity <i class="fa fa-long-arrow-right" aria-hidden="true"></i> </a>
                        <p className='fs-6 text-muted mt-4'>TradingQ&A, the most active trading and investment community in India for all your market related queries.</p>
                        <a href='' style={{textDecoration:'none'}}>TradingQ&A<i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
                    </div>
                </div>
            </div>
        </div>
     ); 
}

export default Education;