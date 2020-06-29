import React from 'react';
import {act, render, fireEvent, waitForElementToBeRemoved} from '@testing-library/react';
import Index, {sendUpdate} from './index';
import {Subject} from 'rxjs';
import {MODAL_UPDATE} from './message';

let subj;
beforeEach(() => {
  subj = new Subject();
});

test('No modal is rendered if an event is not published', async () => {
  const { queryByTestId } = render(<Index modalUpdater={subj}/>);

  // Modal on no-update should appear
  expect(queryByTestId('no-modal')).toBeTruthy();
});

test('A modal is rendered when a valid event is published', async () => {
  const {queryByTestId} = render(<Index modalUpdater={subj}/>);
  const delay = 100;
  act(() => {
    sendUpdate(subj, 'TEST-MODAL-UPDATE', MODAL_UPDATE, delay);
  });
  expect(queryByTestId('no-modal')).toBeNull();

  await waitForElementToBeRemoved(document.querySelector('div.modal-container'),{
    timeout: delay,
    interval: delay,
    onTimeout: (err) => {}
  });
});

test('A modal is removed after its delay expires', async () => {
  const delay = 100;
  const {queryByTestId} = render(<Index modalUpdater={subj}/>);
  act(() => {
    sendUpdate(subj, 'TEST-MODAL-UPDATE', MODAL_UPDATE, delay);
  });
  expect(queryByTestId('no-modal')).toBeNull();

  await waitForElementToBeRemoved(document.querySelector('div.modal-container'),{
    onTimeout: (err) => {}
  });

  expect(queryByTestId('no-modal')).toBeTruthy();
});


test('Multiple modals are removed correctly', async () => {
  const shortDelay = 100;
  const longDelay = 200;

  const shortMsg = 'TEST-MODAL-UPDATE-SHORT';
  const longMsg = 'TEST-MODAL-UPDATE-LONG';

  const {queryByTestId, queryByText} = render(<Index modalUpdater={subj}/>);
  expect(queryByTestId('no-modal')).toBeTruthy();

  act(() => {
    sendUpdate(subj, shortMsg, MODAL_UPDATE, shortDelay);
  });
  act(() => {
    sendUpdate(subj, longMsg, MODAL_UPDATE, longDelay);
  });

  // All modals should be present
  expect(queryByText(longMsg)).toBeTruthy();
  expect(queryByText(shortMsg)).toBeTruthy();
  expect(queryByTestId('no-modal')).toBeNull();

  // Modals w/ short-delay should be gone
  await waitForElementToBeRemoved(queryByText(shortMsg));
  expect(queryByText(longMsg)).toBeTruthy();
  expect(queryByText(shortMsg)).toBeNull();
  expect(queryByTestId('no-modal')).toBeNull();

  // All modals should be gone
  await waitForElementToBeRemoved(queryByText(longMsg));
  expect(queryByText(longMsg)).toBeNull();
  expect(queryByText(shortMsg)).toBeNull();
  expect(queryByTestId('no-modal')).toBeTruthy();
});

test('A closed modal is removed', async () => {
  const delay = 100;
  const closedMsg = 'TEST-MODAL-UPDATE-CLOSED';

  const {queryByTestId, queryByText, queryByRole} = render(<Index modalUpdater={subj}/>);
  expect(queryByTestId('no-modal')).toBeTruthy();

  act(() => {
    sendUpdate(subj, closedMsg, MODAL_UPDATE, delay);
  });

  // Modal will be present until closed
  expect(queryByText(closedMsg)).toBeTruthy();
  fireEvent.click(queryByRole('button'));
  expect(queryByText(closedMsg)).toBeNull();
});
