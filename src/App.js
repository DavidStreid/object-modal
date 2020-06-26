import React, {useState} from 'react';
import './Modal.css';
import Modal from "./Modal";

function App() {
    const [modalUpdate, setModalUpdate] = useState({
        msg: 'hi',
        type: 'MODAL_ERROR',
        delay: 4000
    });

    return (
        <div className="App">
            <Modal update={modalUpdate}></Modal>
            <header className="App-header">
                <button onClick={() => setModalUpdate({msg: 'hey', type: 'MODAL_ERROR', delay: 4000})}>hey</button>
                <button onClick={() => setModalUpdate({msg: 'ho', type: 'MODAL_ERROR', delay: 4000})}>ho</button>
                <button onClick={() => setModalUpdate({msg: 'hello', type: 'MODAL_ERROR', delay: 4000})}>hello</button>

                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer">
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
