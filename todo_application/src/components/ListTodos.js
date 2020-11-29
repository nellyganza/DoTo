import React, { Fragment, useEffect, useState } from 'react';
import EditTodo from './EditTodo';

const ListTodos =() =>{
    const [todos, setTodos] = useState([])
    const deleteTodo = async (id) => {
        try {
            await fetch(`http://localhost:5000/todos/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            })
            setTodos(todos.filter(todo => todo.todo_id !== id))
            // window.location = "/"
        } catch (error) {
            console.error(error.messages);
        }
    }
    const getTodos = async () => {
        try {
            const todos = await fetch("http://localhost:5000/todos");
            const jsonData = await todos.json();

            setTodos(jsonData);
        } catch (e) {
            console.error(e.messages);
        }
    }

    useEffect(() => {
        getTodos();
    }, [])

    return <Fragment>
        <h1>List Todos</h1>
        <table className="table mt-5 text-center">
            <thead>
                <tr>
                    <th>Description</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {/* <tr>
                    <td>Default</td>
                    <td>Defaultson</td>
                    <td>def@somemail.com</td>
                </tr>   */}

                {todos.map(todo => (
                    <tr key={todo.todo_id}>
                        <td>{todo.description}</td>
                        <td><EditTodo todo={todo}/></td>
                        <td><button className="btn btn-danger" onClick={() => deleteTodo(todo.todo_id)}>Delete</button></td>
                    </tr>
                ))
                }
                    
            </tbody>
        </table>


    </Fragment>
}

export default ListTodos;