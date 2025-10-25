import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from "./App";
import { AboutUs, ContactUs, Home, Github, DataGithub, User } from "./components";
import { githubInfoLoader } from './components/DataGithub';
import { Routes, Route, BrowserRouter, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router";

/*
  Best to read the docs: 
  - https://reactrouter.com/start/declarative/installation (For Declarative Mode -> simple & flexible, will mostly use this)
  - https://reactrouter.com/start/data/installation (For Data Mode -> more react-router features for data loading and bundling)
  - https://reactrouter.com/start/framework/installation (For Framework Mode -> full-fledged opinionated architecture supporting features like server-side rendering)

  Notes:
  - linking using a simple '<a>' tag reloads the entire web page.
  - to avoid it and let react-router handle the navigation we use the 'Link' tag
  - on the other hand the component 'NavLink' provides some additional functionality on top of 'Link' behavior (mostly to check whether a specific section is currently active and to style its title differently in the navbar)
*/

const decarativeMode = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} /> {/*Default UI when URL exactly matches parent */}
        <Route path='about' element={<AboutUs />} /> {/* /about */}
        <Route path='contact' element={<ContactUs />} /> {/* /contact */}
        <Route
          path="github/:userName?"
          element={<Github />}
        />     {/* /github/:userName */}
        <Route path='user/:userId' element={<User />} />  {/* /user/:userId */}
      </Route>
    </Routes>
  </BrowserRouter>
);

// createRoutesFromElements() allows direct use of ReactNode Elements (JSX) to make use of declarative syntax even when use createBrowserRouter for Data Mode
// without using createRoutesFromElements, the syntax would be like: 
/* 
createBrowserRouter([
    {
      path: "/"
      element: <App />
      children: [{path: "/About", ...}, {...}, ...]
    },
]);
*/
const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path="" element={<App />}>
      <Route index element={<Home />} />
      <Route path='about' element={<AboutUs />} />
      <Route path='contact' element={<ContactUs />} />
      <Route
        path="github/:userName?"
        element={<DataGithub />}
        loader={githubInfoLoader}
      />
      <Route path='user/:userId' element={<User />} />
    </Route>
  </>
))


const dataMode = <RouterProvider router={router} />;


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {dataMode}
  </StrictMode>
  ,
)
