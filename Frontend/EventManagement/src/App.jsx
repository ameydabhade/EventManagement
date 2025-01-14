import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import Header from './components/Header'
import SignupPage from './components/SignupPage'
import SigninPage from './components/SigninPage'
import Home from './components/Home'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    <Header/>
      <Home/>
      </>
  )
}

export default App


// import { useState } from 'react';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import Header from './components/Header';
// import Home from './components/Home';
// import SignUp from './components/SignUp'

// function App() {
//   const [count, setCount] = useState(0);

//   // Correct Router setup
//   const router = createBrowserRouter([
//     {
//       path: '/',
//       element: <Home />,
//     },
//     {
//       path: '/sign',
//       element: <SignUp />,
//     },
//   ]);

//   return (
//     <div className="bg-black">
//       <Header />
//       <RouterProvider router={router} />
//     </div>
//   );
// }

// export default App;
