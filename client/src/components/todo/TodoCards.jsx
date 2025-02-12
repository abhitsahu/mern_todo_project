import PropTypes from 'prop-types'
import { AiFillDelete, AiFillEdit } from 'react-icons/ai'

const TodoCards = ({title, body, id, delid, display, UpdateId, toBeUpdate }) => {
  return (
    <div className='p-3 todo-card'>
        <div>
            <h3>{title}</h3>
            <p className='todo-card-p'>{body.split("", 40)}</p>
        </div>

        <div className="d-flex justify-content-between ">

            <div className="d-flex justify-content-center align-items-center card-icon-head" onClick={()=>{
              display("block");
              toBeUpdate(UpdateId);
            }}>
                <AiFillEdit className='card-icon'/>Update

            </div>
            <div className="d-flex justify-content-center align-items-center card-icon-head">
                <AiFillDelete className='card-icon' onClick={()=>{
                    delid(id)
                }} />Delete
            </div>

        </div>
        
    </div>
  )
}

TodoCards.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  delid: PropTypes.func.isRequired,
  display: PropTypes.func.isRequired,
  UpdateId: PropTypes.number.isRequired,
  toBeUpdate: PropTypes.func.isRequired
}

export default TodoCards