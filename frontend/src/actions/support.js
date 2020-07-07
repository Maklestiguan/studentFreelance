import axios from 'axios';

import { SUPPORT_TICKET_ADDED } from './types';
import { supportTicketCreateUrl } from '../endpoints';
import { displayMessage } from './messages';

export const addSupportTicket = data => dispatch => {
  axios.post(supportTicketCreateUrl, data)
    .then(response => {
      dispatch({ type: SUPPORT_TICKET_ADDED, payload: response.data });
      dispatch(displayMessage('success', 'Ваше сообщение успешно отправлено'));
    }).catch(error => {
      dispatch(displayMessage('danger', error.response.data));
      // console.log(`Status: ${error.response.status}`, error.response.data)
    })
};
