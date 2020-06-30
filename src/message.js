import React from 'react';
import PropTypes from 'prop-types';
import {MODAL_ERROR, MODAL_SUCCESS, MODAL_UPDATE} from './modal-container';

/**
 * Returns a valid modal type
 *
 * @param type
 * @returns {string|*}
 */
export function parseType(type) {
    const MODAL_TYPES = [MODAL_UPDATE, MODAL_SUCCESS, MODAL_ERROR];
    for(const mt of MODAL_TYPES){
        if(mt === type) return type;
    }
    console.error(`Couldn't read modal type: ${type}. Using update type - ${MODAL_UPDATE}`);
    return MODAL_UPDATE;
}

function Message({update, onClose}) {
    const type = parseType(update.type);
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
        <div className={'close-container'}>
            <button className="close" onClick={onClose}>
                <a href="#"></a>
            </button>
        </div>
        <p className="word-break">{msg}</p>
    </div>;
}

export default Message;

Message.propTypes = {
    update: PropTypes.object
};
