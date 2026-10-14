import React from 'react';
import { DASHBOARD_REGISTER_URL } from '../../config';

function SignupPage() {
    return ( 
        <>
        <main className="container p-5 text-center">
          <h1>Create your TradeSmart account</h1>
          <p className="text-muted">Create an account or sign in to open your dashboard.</p>
          <a className="p-2 btn btn-primary fs-5" href={DASHBOARD_REGISTER_URL}>Continue to account setup</a>
        </main>
        </>
     );
}

export default SignupPage;
