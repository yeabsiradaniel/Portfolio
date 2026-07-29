// Contact-form email notifications via Gmail SMTP (nodemailer).
//
// Requires two env vars (never commit them):
//   GMAIL_USER          — the Gmail address that sends + receives notifications
//   GMAIL_APP_PASSWORD  — a 16-char Google App Password (NOT the account password)
//
// Two layers of safety, because this module runs inside the Netlify function:
// 1. nodemailer is lazy-required — if the dependency is ever missing from a
//    bundle, requiring this file can NOT crash the whole API.
// 2. Mail failures never break the contact flow — the message is already
//    saved to MongoDB, so a bad/missing config just logs and moves on.

const NOTIFY_TO = 'yeabsirad9@gmail.com';

const isConfigured = () => Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);

const createTransport = () => {
  // eslint-disable-next-line global-require
  const nodemailer = require('nodemailer');
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
};

/**
 * Send the "new contact message" notification. Fire-and-forget from the
 * route's perspective — resolves true on success, false on any failure.
 */
const sendContactNotification = async ({ name, email, message }) => {
  if (!isConfigured()) {
    console.warn('[mailer] GMAIL_USER/GMAIL_APP_PASSWORD not set — skipping notification email');
    return false;
  }
  let transporter;
  try {
    transporter = createTransport();
  } catch (err) {
    console.error('[mailer] nodemailer unavailable in this deployment:', err.message);
    return false;
  }
  try {
    await transporter.sendMail({
      from: `Portfolio Contact <${process.env.GMAIL_USER}>`,
      to: NOTIFY_TO,
      replyTo: email,
      subject: `Portfolio message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
      `,
    });
    return true;
  } catch (err) {
    console.error('[mailer] failed to send notification:', err.message);
    return false;
  }
};

const escapeHtml = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

module.exports = { sendContactNotification, isConfigured };

