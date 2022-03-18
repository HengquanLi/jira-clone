import React, { useState } from 'react'
import Login from './Login';
import Register from './Register';

const UnAuthenticatedApp = () => {
   const [isRegister, setIsRegister] = useState(false);

   return (
     <div>
       {isRegister ? <Register /> : <Login />}
       <button onClick={() => setIsRegister(!isRegister)}>
         To
         {isRegister ? 'Login' : 'Register'}
       </button>
     </div>
   );
}

export default UnAuthenticatedApp