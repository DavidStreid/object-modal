import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

export const MODAL_ERROR = 'MODAL_ERROR';
export const MODAL_SUCCESS = 'MODAL_SUCCESS';
export const MODAL_UPDATE = 'MODAL_UPDATE';

function Message({update, onClose}) {
    const type = update.type || 'ERROR';
    const msg = update.msg;
    const key = msg;

    let modalClass = 'modal';
    switch(type) {
        case MODAL_ERROR:
            modalClass += ' modal-fail';
            break;
        case MODAL_UPDATE:
            modalClass += ' modal-update';
            break;
        case MODAL_SUCCESS:
            modalClass += ' modal-success';
            break;
        default:
            throw new Error('Invalid modal update');
    }

    if(update.closed){
        // User closed modal via onClick
        return <div key={key}></div>;
    }
    return <div className={modalClass} key={key}>
        <div className={"close-container"}>
            <a href="#" className="close" onClick={onClose}></a>
        </div>
        <p className="word-break">{msg}</p>
    </div>
}

export default Message;

Message.propTypes = {
    update: PropTypes.object
};
