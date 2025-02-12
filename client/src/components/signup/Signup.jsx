import { useState } from 'react'
import './Signup.css'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from "react-router-dom"


const Signup = () => {

    const histor = useNavigate();

    const [Inputs, setInputs] = useState({email:"",username: "",password: ""});

    const change = (e)=>{
        const { name , value }= e.target;
        setInputs({...Inputs, [name]:value});
    }

    const submit = async (e)=>{
        e.preventDefault();
        await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/register`, Inputs).then((res) =>{
            // alert(res.data.message)
            if(res.data.message === "user already exists"){

                toast.error(res.data.message); //to send backend message to the user
            }
            else{

                toast.success(res.data.message); //to send backend message to the user
                // console.log(res);
                setInputs({email:"",username: "",password: ""}) //to clear the form again
                histor("/login")
            }
        });
    }

  return (
    <div className='signup-container'>
        <ToastContainer />
        <form className="form">
            <p className="title">Register </p>
            <p className="message">Signup now and get full access to our app. </p>
                    
            <label>
                <input required={true} type="email" name="email" className="input" onChange={change} value={Inputs.email} />
                <span>Email</span>
            </label> 
                
            <label>
                <input required={true} type="username" name="username" className="input" onChange={change} value={Inputs.username} />
                <span>username</span>
            </label>

            <label>
                <input required={true} type="password" name="password" className="input" onChange={change} value={Inputs.password} />
                <span>Password</span>
            </label>
            <button className="submit" onClick={submit}>Submit</button>
            <p className="signin">Already have an acount ? <Link to={'/login'} >Signin</Link> </p>
        </form>
    </div>
  )
}

export default Signup