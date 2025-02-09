import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { authActions } from '../../store'
// import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';



const Navbar = () => {

  
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch(); //useDispatch is use to call the function of redux file
  // console.log(isLoggedIn);
  // const histor = useNavigate();

  const logOut = ()=>{
    sessionStorage.removeItem("id");
    dispatch(authActions.logout()); // to change the isLoggedIn func to true
    toast.success(`LogOut Successfully`);
    window.location.reload(); // Refresh the entire page
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container">
      <Link className="navbar-brand" to="#">TODO</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/about">About Us</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/todo">Todo</Link>
          </li>
          {!isLoggedIn && <>
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/signup">Sign Up</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/login">Login</Link>
            </li>
          </>}
          
          {isLoggedIn && <>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="#" onClick={logOut} >Log Out</Link>
            </li>
          </>}
        </ul>
        </div>
        </div>
    </nav>

    </>
  )
}

export default Navbar