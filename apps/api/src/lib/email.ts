import { Resend } from 'resend';

// eslint-disable-next-line node/no-process-env
const { RESEND_API_KEY } = process.env;

export const resend = new Resend(RESEND_API_KEY as string);
