import './App.css'
import {Outlet} from 'react-router'
import Navbar from './components/navbar/Navbar'
import Footer from './components/Footer/Footer'



function App() {


  return (
   <>
   <div className='app-container'>
    <Navbar />
    <Outlet />
    <Footer />
   </div>
   
   </>
  )
}

export default App
