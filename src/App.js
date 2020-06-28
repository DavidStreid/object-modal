import React, {useState} from 'react';
import './modal-container.css';
import ModalContainer from "./modal-container";
import {Subject} from "rxjs";

function App() {
    const setModalUpdate = (update) => {
        modalUpdater.next(update);
    };

    const [modalUpdater, setModalUpdater] = useState(new Subject());

    return (
        <div className="App">
            <ModalContainer modalUpdater={modalUpdater}></ModalContainer>
            <header className="App-header">
                <button onClick={() => setModalUpdate({msg: 'hey', type: 'MODAL_ERROR', delay: 1000})}>hey</button>
                <button onClick={() => setModalUpdate({msg: 'ho', type: 'MODAL_ERROR', delay: 2000})}>ho</button>
                <button onClick={() => setModalUpdate({msg: 'hello', type: 'MODAL_ERROR', delay: 3000})}>hello</button>

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
