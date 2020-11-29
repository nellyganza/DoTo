import React, { Fragment, useState } from 'react';

const EditTodo = ({todo}) => {
    const [description, setdescription] = useState(todo.description);

    const updateTodo = async () =>{
        const body = {description};
        try {
            await fetch(`http://localhost:5000/todos/${todo.todo_id}`,{
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            })
            window.location = "/"
        } catch (error) {
            console.error(error.messages);
        }
    }
    return <Fragment>

        <button type="button" className="btn btn-warning" data-toggle="modal" data-target={`#id${todo.todo_id}`}>
        Edit
        </button>

        <div className="modal" id={`id${todo.todo_id}`} onClick={() =>{setdescription(todo.description)}}>
        <div className="modal-dialog">
            <div className="modal-content">

            <div className="modal-header">
                <h4 className="modal-title">Edit Todo</h4>
                <button type="button" className="close" data-dismiss="modal" onClick={() =>{setdescription(todo.description)}}>&times;</button>
            </div>

            <div className="modal-body">
                <input type="text" className="form-control" value={description} onChange={e =>{setdescription(e.target.value)}}></input>
            </div>

            <div className="modal-footer">
                <button type="button" className="btn btn-warning" data-dismiss="modal" onClick={updateTodo}>Edit</button>
                <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() =>{setdescription(todo.description)}}>Close</button>
            </div>

            </div>
        </div>
        </div>
    </Fragment>
}

export default EditTodo;