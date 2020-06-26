// src/store/chat.js

import { Subject, interval } from 'rxjs';

const subject = new Subject();
const initialQueue = {};

let state = initialQueue;

const messageQueue = {
    init: () => {
        state = {...state};
        subject.next(state);
    },
    subscribe: setState => subject.subscribe(setState),     // setter of useSTate
    sendMessage: message => {
        state = {
            ...state,
            data: [...state.data, message]
        };
        subject.debounce(
            () => interval(1000)
        ).next(state);
    },
    clearQueue: () => {
        state = {...state, data: []};
        subject.next(state);
    },
    initialQueue
};

export default messageQueue;
