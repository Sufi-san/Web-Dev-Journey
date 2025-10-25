import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import authService from './appwrite/auth';
import { login, logout } from './store/authSlice';
import { Footer, Header } from './components';
import { Outlet } from 'react-router';


function App() {

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        }
        else {
          dispatch(logout());
        }
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, []);
  
  return !loading ?
    (
      <div className='min-h-screen flex flex-wrap p-8 bg-gray-400'>
        <div className='w-full flex flex-col items-center'>
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    )
    : null
}

export default App;
