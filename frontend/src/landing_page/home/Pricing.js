import React from 'react';

function Pricing() {
    return ( 
        <div className='container p-5 pt-1 pb-0 mx-20'>
            <div className='row'>
                <div className='col-5 p-3'>
                    <h1 className='fs-2 text-muted mb-4'>Unbeatable pricing</h1>
                    <p className='text-muted'>We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                        <a href='' style={{textDecoration:'none'}}>See pricing<i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>                    
                </div>
                <div className='col-7 p-3' style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src='media/images/pricing-eq.svg' alt='pricing' style={{width:'45%'}}></img>
                        <p style={{lineHeight:'1.5', fontSize:'12px', whiteSpace:'wrap'}}>Free account <br></br> opening</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src='media/images/pricingEquity.svg' alt='pricing' style={{width:'45%'}}></img>
                        <p style={{lineHeight:'1.5', fontSize:'12px', whiteSpace:'wrap'}}>Free equity delivery <br></br> and direct mutual funds</p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src='media/images/intradayTrades.svg' alt='pricing' style={{width:'45%'}}></img>
                        <p style={{lineHeight:'1.5', fontSize:'12px', whiteSpace:'wrap'}}>Intraday and <br></br> F&O</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Pricing;