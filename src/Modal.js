import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import Message from "./message";
import messageQueue from './messageQueue';

export const MODAL_ERROR = 'MODAL_ERROR';
export const MODAL_SUCCESS = 'MODAL_SUCCESS';
export const MODAL_UPDATE = 'MODAL_UPDATE';

function Modal({update}) {
  let msg, delay;

  const [msgQueue, setMsgQueeue] = useState(messageQueue.initialState);
  const [queue, setQueue] = useState({});
  const [lastUpdate, setLastUpdate] = useState(null);


  useLayoutEffect(()=> {
    messageQueue.subscribe(setQueue);
    messageQueue.init();
  },[]);

  // After a component is mounted, we keep track of the input update to compare against future updates
  useEffect(()=>{
    setLastUpdate(update);
  }, [update]);

  /*
  const closeModal = (msg) => {
    // Only close if setTimeout to remove this modal hasn't already fired
    const nxt = Object.assign({}, queue);
    nxt[msg].closed = true;
    setQueue(nxt);
  };
  */

  const updateQueue = (nextMsg) => {
    setTimeout(() => {
      const nxt = Object.assign({}, queue);
      messageQueue.sendMessage(nextMsg);
      delete nxt[nextMsg];
      setQueue(nxt);
    }, delay);
  };

  msg = update.msg;
  delay = update.delay || 0;

  // Update the queue if there is a new update not already in the queue
  // If multiple updates of the same message are sent during the lifetime of the message, they are ignored
  if(!queue[msg] && update !== lastUpdate){
    queue[msg] = {...update, closed: false};
    setQueue(queue);
    updateQueue(msg);
  }


  const shouldDisplay = Object.keys(queue).length > 0;
  if(!shouldDisplay) {
    return <div></div>
  }

  // Render all the modals inside a container
  return (<div className={"modal-container"}>
    { Object.keys(queue).map( (updateMsg) => {
      const viewUpdate = queue[updateMsg];
      const key = `${updateMsg}-${queue[updateMsg].type}`;
      return <Message key={key}
                      update={Object.assign({}, viewUpdate)}></Message>
    })}
  </div>);
}

export default Modal;

Modal.propTypes = {
  update: PropTypes.object
};
