import React, {useState} from 'react';
import './modal-container.css';
import ModalContainer, {sendUpdate} from "./modal-container";
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
                <button onClick={() => sendUpdate(modalUpdater, 'hey', 'MODAL_ERROR', 1000000)}>hey</button>
                <button onClick={() => sendUpdate(modalUpdater, 'ho', 'MODAL_ERROR', 2000)}>ho</button>
                <button onClick={() => sendUpdate(modalUpdater, 'hello', 'MODAL_ERROR', 3000)}>hello</button>
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
