import React from 'react';

function NotFound() {
    return ( 
        <div className='openAcc container p-5'>
            <div className='row text-center'>
                <h1 className='mt-3 text-muted fs-3 mb-4'>404 Not Found</h1>
                <p className='text-muted fs-6 mb-5'>The page you are looking for does not exist.</p>
            </div>
        </div>
     );
}

export default NotFound;