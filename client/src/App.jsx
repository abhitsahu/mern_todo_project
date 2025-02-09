import { useEffect } from 'react'
import Navbar from './components/navbar/Navbar'
import Home from './components/home/Home'
import Footer from './components/footer/Footer'
import About from './components/about/About'
import { BrowserRouter as  Router,Routes,Route} from "react-router-dom"
import Signup from './components/signup/Signup'
import Login from './components/login/Login'
import Todo from './components/todo/Todo'
import { useDispatch } from 'react-redux'
import { authActions } from './store'


const App = () => {

  const dispatch = useDispatch(); //useDispatch is use to call the function of redux file


  //using useEffect to manage the logout error
  useEffect(() => {

    const id = sessionStorage.getItem("id");
    if(id){

      dispatch(authActions.login()); // to change the isLoggedIn func to true
    }
    
    // your effect code here
  }, [dispatch])

  const handleLogout = () => {
    sessionStorage.removeItem("id"); // Clear user ID from session storage
    dispatch(authActions.logout()); // Call logout action
    // Fetch tasks again after logout
    dispatch(authActions.fetchTasks()); // Assuming you have a fetchTasks action
  };

  
  return (
    <div>

      <Router>
        <Navbar onLogout={handleLogout}/>

        <Routes>

          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/about' element={<About/>}/>
          <Route exact path='/todo' element={<Todo/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
          <Route exact path='/login' element={<Login/>}/>



        </Routes>

      </Router>

    <Footer />

    </div>
  )
}

export default App