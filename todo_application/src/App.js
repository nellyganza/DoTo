import { Fragment } from 'react';
import './App.css';
import InputDodo from './components/InputTodo';
import ListTodos from './components/ListTodos';

function App() {
    return <Fragment >
            <div className="container">
                <InputDodo />
                <ListTodos />
            </div>
        </Fragment>
}

export default App;