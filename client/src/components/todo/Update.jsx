import axios from 'axios';
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Update = ({display, update, refreshTasks}) => {
    const [Inputs, setInputs] = useState({title: "", body: ""});

    useEffect(() => {
        setInputs({
            title: update.title,
            body: update.body
        });
    }, [update]);

    const change = (e)=>{
        const { name, value } = e.target;
        setInputs({ ...Inputs, [name]: value });
    }

    const submit = async ()=>{
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/v2/updateTask/${update._id}`,Inputs).then((res)=>{
        toast.success(res.data.message);
        refreshTasks();
      })
      display("none");
    }

    
    
    return (
        <div className='p-5 d-flex justify-content-center align-item-center flex-column update'>
            <h3>Update your Task </h3>
            <input type="text" className='todo-inputs my-4 w-100 p-3' name="title" value={Inputs.title} onChange={change} />
            <textarea className='todo-inputs w-100 p-3' name="body" value={Inputs.body} onChange={change} />
            <div>
                <button className='btn btn-dark my-4' onClick={submit}>Update</button>
                <button className='btn btn-danger my-4 mx-3' onClick={()=>display("none")}>Close</button>
            </div>
        </div>
    )
}

Update.propTypes = {
  display: PropTypes.func.isRequired,
  update: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired
  }).isRequired,
  refreshTasks: PropTypes.func.isRequired
}

export default Update