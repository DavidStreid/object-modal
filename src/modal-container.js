import React, {useLayoutEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import Message, {parseType} from './message';
import './modal-container.css';

export const MODAL_ERROR = 'MODAL_ERROR';
export const MODAL_SUCCESS = 'MODAL_SUCCESS';
export const MODAL_UPDATE = 'MODAL_UPDATE';

function ModalContainer({modalUpdater}) {
  const [queue, setQueue] = useState({});
  const queueRef = useRef(queue);
  queueRef.current = queue;       // Inside of the subcription function to our input modalUpdater, we need a reference to this value

  const formatUpdate = (evt) => {
    const key = evt.msg;
    const delay = evt.delay;
    const update = { ...queueRef.current, [key]: {...evt, closed: false} };
    setQueue(update);

    setTimeout(() => {
      const updatedQueue = {...queueRef.current};
      delete updatedQueue[key];
      setQueue(updatedQueue);
    }, delay);
  };

  // Immediately subscribe prior to mounting
  useLayoutEffect(()=> {
    modalUpdater.subscribe(formatUpdate);
    return function cleanup() {
      modalUpdater.unsubscribe();
    };
  },[modalUpdater]);


  const closeModal = (msg) => {
    // Only close if setTimeout to remove this modal hasn't already fired
    const nxt = Object.assign({}, queue);
    nxt[msg].closed = true;
    setQueue(nxt);
  };

  const shouldDisplay = Object.keys(queue).length > 0;
  if(!shouldDisplay) {
    return <div data-testid="no-modal"></div>;
  }

  // Render all the modals inside a container
  return (<div className={'modal-container'}>
    { Object.keys(queue).map( (updateMsg) => {
      const viewUpdate = queue[updateMsg];
      const key = `${updateMsg}-${queue[updateMsg].type}`;
      return <Message key={key}
                      update={{...viewUpdate}}
                      onClose={() => closeModal(updateMsg)}></Message>;
    })}
  </div>);
}

/**
 * Sends update on subject, which should be passed to the ModalContainer
 *
 * @param subject
 * @param msg
 * @param inputType
 * @param delay
 */
export function sendUpdate(subject, msg, inputType = MODAL_UPDATE, delay = 1000) {
  const type = parseType(inputType);
  if(isNaN(delay)){
    throw new Error('Delay is not a number');
  }
  const update = { msg, type, delay };
  subject.next(update);
};
export default ModalContainer;
ModalContainer.propTypes = {
  modalUpdater: PropTypes.object  // Subject
};
