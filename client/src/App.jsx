import { Navigate, Route, Routes} from 'react-router-dom'
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUp";
import Footer from './component/Footer';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/authUser';
import { useEffect } from 'react';
import { Loader } from 'lucide-react';
import WatchPage from './pages/WatchPage';
import SearchPage from './pages/SearchPage';
import SearchHistory from './pages/SearchHistory';
import NotFoundPage from './pages/NotFoundPage';
function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore()

  useEffect(()=>{
    authCheck()
  },[authCheck])

  if(isCheckingAuth){
    return (
      <div className='h-screen' >
        <div className='flex justify-center items-center bg-balck h-full ' >
          <Loader className=' animate-spin text-red-600 size-10 ' /> 
        </div>
      </div>
    )
  }
  return (
    <>
    <Routes>
      <Route path='/' element={ <HomePage/> } />
      <Route path='/login' element={ !user ? <LoginPage/> : <Navigate to={"/"}/> } />
      <Route path='/signup' element={ !user ? <SignUp/> : <Navigate to={"/"} /> } />
      <Route path='/watch/:id' element={ user ? <WatchPage/> : <Navigate to={"/login"} /> } />
      <Route path='/search' element={ user ? <SearchPage/> : <Navigate to={"/login"} /> } />
      <Route path='/history' element={ user ? <SearchHistory/> : <Navigate to={"/login"} /> } />
      <Route path='/*' element={<NotFoundPage/>} />
    </Routes>
    <Footer/>
    <Toaster/>
    </>
  )
}

export default App