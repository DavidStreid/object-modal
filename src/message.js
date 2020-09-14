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

function Message({update, onClose, successColor = '#49A078', updateColor = '#006098', errorColor = '#C03B5A'}) {
    const type = parseType(update.type);
    const msg = update.msg;
    const key = msg;

    let backgroundColor = '';
    switch(type) {
        case MODAL_ERROR:
            backgroundColor = errorColor;
            break;
        case MODAL_UPDATE:
            backgroundColor = updateColor;
            break;
        case MODAL_SUCCESS:
            backgroundColor = successColor;
            break;
        default:
            throw new Error('Invalid modal update');
    }

    if(update.closed){
        // User closed modal via onClick
        return <div key={key}></div>;
    }
    return <div className={'object-modal'}
                key={key}
                style={ { background: backgroundColor } }>
        <div className={'close-container'}>
            <button className="close" onClick={onClose}></button>
        </div>
        <div className={'modal-text-container'}>
            <p className="word-break white-color">{msg}</p>
        </div>
    </div>;
}

export default Message;

Message.propTypes = {
    update: PropTypes.object
};
