# Object-modal

## Description
This is a simple modal that takes in an object

## QuickStart
```
import Modal, {sendUpdate} from "object-modal";

function App() {
    ... 
    const [modalUpdater, setModalUpdater] = useState(new Subject());
    ...
    return (
        <div className="App">
            <ModalContainer modalUpdater={modalUpdater}></ModalContainer>
            <button onClick={() => sendUpdate(modalUpdater, 'Hello World')}>hey</button>
        </div>
    );
}

export default App;
```
