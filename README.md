# Object-modal

## Description
This is a simple modal that takes in an object

## API
### sendUpdate(Subject, message, type, delay)
`Subject` [Rxjs Subject](https://rxjs-dev.firebaseapp.com/guide/subject)

`message` string

`type` (optional), string, MODAL_UPDATE, MODAL_ERROR, MODAL_SUCCESS 

`delay` (optional), number

Submits an update using the input modal

Return: void

## QuickStart
### Creates Simple app 
```
$ npm install object-modal
```
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

### Customize colors
```
<Modal modalUpdater={modalUpdater}
    successColor={'#49A078'}
    updateColor={'#006098'}
    errorColor={'#C03B5A'}/>
```

### Run w/ Redux
To update the modal from any component, redux would be the easiest - the subject can be initialized into the store when 
the app initialized and be provided to components that need them.

In App,
```
import Modal from "object-modal";

function App() {
    ...
    const modalUpdater = new Subject();
    reduxDispatcher(dispatch, modalUpdater);        # Update store w/ subject
 
    const modalUpdater = useSelector(state => state[STATE_MODAL_UPDATER] );
    ...
    return (
        <div className="App">
            <ModalContainer modalUpdater={modalUpdater}></ModalContainer>
        </div>
    );
}
```

In nested child component,
```
import {sendUpdate} from "object-modal";

function Child() {
    ...
    # Retrieve modal updater to asynchronously send modal updates from any component
    const modalUpdater =  useSelector(state => state[STATE_MODAL_UPDATER] );
    
    sendUpdate(modalUpdater, "Feedback Submitted. Thanks!", MODAL_SUCCESS);
    ...
}
```
