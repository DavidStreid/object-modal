import React from 'react';
import { render, screen } from '@testing-library/react';
import ModalContainer from './modal-container';
import {Subject} from "rxjs";

test('renders learn react link', async () => {
  const subj = new Subject();
  const { container, debug } = render(<ModalContainer modalUpdater={subj}/>);
  subj.next({msg: 'hey', type: 'MODAL_ERROR', delay: 1000});
  debug();
  // const linkElement = getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
