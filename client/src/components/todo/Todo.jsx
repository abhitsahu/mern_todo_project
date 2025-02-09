import { useEffect, useState, useCallback } from 'react'
import './Todo.css'
import TodoCards from './TodoCards';
import { ToastContainer, toast } from 'react-toastify';
import Update from './update';
import axios from 'axios';

let id = sessionStorage.getItem("id");//user data ko backend mein add karne k liye

const Todo = () => {

    const [Inputs,setInputs] = useState({title:"",body:""});
    const [Array, setArray] = useState([]);
    const [toUpdateArray, setToUpdateArray] = useState({
      title: "",
      body: "",
      _id: ""
    });

    
    

    const show = ()=>{
      document.getElementById("textarea").style.display="block";
    };

    const change = (e)=>{

      const {name,value} = e.target;
      setInputs({...Inputs,[name]:value});

    };

    const submit = useCallback(async ()=>{
      if (!Inputs.title || !Inputs.body) {
        toast.error("Title or body should not be empty");
      } else {
        if(id){ //user data ko backend mein add karne k liye

          await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v2/addTask`, {title: Inputs.title, body: Inputs.body, id: id}).then(()=>{//user data ko backend mein add karne k liye
      
            toast.success("Your Task Is Added");
          })
          setInputs({title:"",body:""});
 
        }
        else{
          setArray(prev => [...prev, Inputs]);
          setInputs({title:"",body:""});
          toast.success("Your Task Is Added");
          toast.error("Your Task Is Not Saved! Please SignUp");
        }
      }
      

    },[Inputs]);

    const del = async (cargid) => {
      if(id){

          try {
            await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/v2/deleteTask/${cargid}`, { data: { id: id } });
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v2/getTasks/${id}`);
            setArray(res.data.list);  // Update the tasks list immediately
            toast.success("Your Task is Deleted");
          } catch (error) {
            toast.error(`Failed to delete task: ${error.message}`);
          }
      }
      else{
        toast.error(`Please signup first`);
        
      }
    };

    const dis = (value)=>{
      document.getElementById("todo-update").style.display = value
    }

    const update = (value) => {
      const taskToUpdate = Array[value];
      if (taskToUpdate) {
        setToUpdateArray({
          title: taskToUpdate.title || "",
          body: taskToUpdate.body || "",
          _id: taskToUpdate._id || ""
        });
      }
    };

    useEffect(() => {
      const fetch = async () => {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v2/getTasks/${id}`);
        setArray(res.data.list);
      };

      if (id) fetch();
    }, [submit]);


  return (
    <div>
      <div className='todo'>
        <ToastContainer/>
        <div className="todo-main container d-flex justify-content-center align-items-center">

            <div className='d-flex flex-column todo-inputs-div w-50'>
                <input type="text" placeholder='TITLE' name='title' value={Inputs.title} className='my-2 p-2 todo-inputs' onClick={show} onChange={change} />
                <textarea id='textarea' type="text" placeholder='BODY' name='body' value={Inputs.body} className='p-2 todo-inputs' onChange={change} />
            </div>

            <div className='w-50 d-flex justify-content-end my-3'>
              <button className='home-btn px-2 py-1' onClick={submit} >Add</button>
            </div>
        </div>

        <div className="todo-body">
          <div className="container-fluid">

            <div className="row">

                {Array && Array.map((item, index) => (
                  <div className="col-lg-3 col-10 mx-5 my-2" key={index}>
                    <TodoCards title={item.title} body={item.body} id={item._id} delid={del} display={dis} UpdateId={index} toBeUpdate={update} />
                  </div>
                ))}
              
            </div>
          </div>
        </div>


      </div>

      <div className="todo-update" id="todo-update">
          <div className="container update">
            <Update display={dis} update={toUpdateArray} refreshTasks={() => {
              if (id) {
                const fetch = async () => {
                  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v2/getTasks/${id}`);
                  setArray(res.data.list);
                };
                fetch();
              }
            }} />
          </div>
      </div>
    </div>
  )
}

export default Todo