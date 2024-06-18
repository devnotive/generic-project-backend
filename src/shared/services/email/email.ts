import sgMail from '@sendgrid/mail';
import axios from 'axios';
import Env from '../../../shared/utils/env';
import { apiConstants } from '../../utils/constants';

const key = Env.get('SENDGRID_API_KEY');
const purpleVestEmail = Env.get('SENDGRID_EMAIL');
const { __test__ } = apiConstants;
sgMail.setApiKey(key);

interface SendMailProps {
  recepient: string;
  name: string;
  subject: string;
  emailContent: string;
}

/* istanbul ignore next */
export class EmailServices {
  /*
   * Sends an email
   * @param {any} options
   * @returns {Promise<object | string>}
   */
  static send({ recepient, name = '', subject, emailContent }: SendMailProps) {
    console.log({ purpleVestEmail });
    const url = 'https://api.sendgrid.com/v3/mail/send';

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    };

    const data = {
      personalizations: [
        {
          to: [{ email: recepient, name }],
          subject,
        },
      ],
      content: [{ type: 'text/html', value: emailContent }],
      from: { email: purpleVestEmail, name: 'Purple Pay' },
      reply_to: {
        email: purpleVestEmail,
        name: 'Purple Pay',
      },
    };

    return __test__ ? 'success' : axios.post(url, data, { headers });
  }
}