import React from 'react';

function Universe() {
    return ( 
    <div className='universe-container'>
        <div className='universe'>
            <div className='container'>
                <p>Want to know more about our technology stack? Check out the <a href=''>Zerodha.tech</a> blog.</p>
            </div>
        </div>
        <div className='partner-products'>
            <h2 className='text-center' style={{fontSize: "25px"}}>The Zerodha Universe</h2>
            <p className='text-center'>Extend your trading and investment experience even further with our partner platforms</p>
            <div className='row universeRow'>
                <div className='col-4 unicols'>
                    <a href=''>
                        <img src='media/images/zerodhaFundhouse.png' />
                        <br/>
                        <span className='text-12 text-light-grey'>
                            Our asset management venture
                            <br/>
                            that is creating simple and transparent index
                            <br/>
                            funds to help you save for your goals.
                        </span>
                    </a>
                    <br/>
                    <a href=''>
                        <img src='media/images/streakLogo.png' />
                        <br/>
                        <span className='text-12 text-light-grey'>
                            Systematic trading platform
                            <br/>
                            that allows you to create and backtest
                            <br/>
                            strategies without coding.
                        </span>
                    </a>
                </div>
                <div className='col-4 unicols'>
                    <a href=''>
                        <img src='media/images/sensibullLogo.svg' style={{width: "220px"}}/>
                        <br/>
                        <span className='text-12 text-light-grey'>
                            Options trading platform that lets you
                            <br/>
                            create strategies, analyze positions, and examine 
                            <br/>
                            data points like open interest, FII/DII, and more.
                        </span>
                    </a>
                    <br/>
                    <a href=''>
                        <img src='media/images/smallcaseLogo.png'/>
                        <br/>
                        <span className='text-12 text-light-grey'>
                            Thematic investment platform
                            <br/>
                            that helps you invest in diversified
                            <br/>
                            baskets of stocks on ETFs.
                        </span>
                    </a>
                </div>
                <div className='col-4 unicols'>
                    <a href=''>
                        <img src='media/images/tijori.svg' />
                        <br/>
                        <span className='text-12 text-light-grey'>
                            Investment research platform
                            <br/>
                            that offers detailed insights on stocks,
                            <br/>
                            sectors, supply chains, and more.
                        </span>
                    </a>
                    <br/>
                    <a href=''>
                        <img src='media/images/dittoLogo.png' />
                        <br/>
                        <span className='text-12 text-light-grey'>
                            Personalized advice on life
                            <br/>
                            and health insurance. No spam
                            <br/>
                            and no mis-selling.
                        </span>
                    </a>
                </div>
                <button className='p-2 btn btn-primary fs-5 signUpbtn' style={{width: '18%', margin: '70px 0'}}>Sign up for free</button>
            </div>
        </div>
    </div>
    );
}

export default Universe;