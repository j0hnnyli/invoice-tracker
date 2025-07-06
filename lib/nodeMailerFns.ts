import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_APP_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});


type SendInvoiceOptions = {
  senderName: string;
  senderEmail: string;
  clientName: string;
  clientEmail: string;
  invoiceLink: string;
  isUpdate?: boolean;
};

export const sendInvoiceEmail = async ({
  senderName,
  senderEmail,
  clientName,
  clientEmail,
  invoiceLink,
  isUpdate = false,
}: SendInvoiceOptions) => {
  const subject = `Invoice from ${senderName}`;
  const greeting = isUpdate
    ? 'Please find your updated invoice below.'
    : 'Please find your invoice below.';

  await transporter.sendMail({
    from: `"${senderName}" <${process.env.GMAIL_APP_USER}>`,
    to: clientEmail,
    subject,
    replyTo: senderEmail,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #f9f9f9; color: #333;">
        <h2 style="color: #2c3e50;">Hello, ${clientName}</h2>

        <p style="font-size: 16px; line-height: 1.5;">
          I hope this message finds you well. ${greeting} If you have any questions, please feel free to reach out at 
          <a href="mailto:${senderEmail}" style="color: #3498db;">
            ${senderEmail}
          </a>.
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a 
            href="${invoiceLink}" 
            target="_blank" 
            style="
              display: inline-block;
              padding: 12px 24px;
              background-color: #2ecc71;
              color: #ffffff;
              text-decoration: none;
              font-size: 16px;
              border-radius: 6px;
            "
          >
            View Your Invoice
          </a>
        </div>

        <p style="font-size: 14px; color: #666;">
          <strong>Note:</strong> Please download your invoice to your device. The link may not be available later.
        </p>

        <p style="font-size: 16px;">Best Regards,<br/>${senderName}</p>
      </div>
    `,
  });
};

type sendReminderInvoiceEmailProps = {
  senderName: string;
  senderEmail: string;
  clientName: string;
  clientEmail: string;
  invoiceLink: string;
};

export const sendReminderInvoiceEmail = async ({
  senderName,
  senderEmail,
  clientName,
  clientEmail,
  invoiceLink,
}: sendReminderInvoiceEmailProps) => {
  await transporter.sendMail({
    from: `"${senderName}" <${process.env.GMAIL_APP_USER}>`,
    to: clientEmail,
    subject : `Overdue invoice reminder from ${senderName}`,
    replyTo: senderEmail,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #f9f9f9; color: #333;">
        <h2 style="color: #2c3e50;">Hello, ${clientName}</h2>

        <p style="font-size: 16px; line-height: 1.5;">
            This is a friendly reminder that your invoice is now overdue. You can view the invoice using the link below. If you have any questions or concerns, feel free to reach out to 
          <a href="mailto:${senderEmail}" style="color: #3498db;">
            ${senderEmail}
          </a>.
        </p>

        <div style="text-align: center; margin: 32px 0;">
          <a 
            href="${invoiceLink}" 
            target="_blank" 
            style="
              display: inline-block;
              padding: 12px 24px;
              background-color: #2ecc71;
              color: #ffffff;
              text-decoration: none;
              font-size: 16px;
              border-radius: 6px;
            "
          >
            View Your Invoice
          </a>
        </div>

        <p style="font-size: 14px; color: #666;">
          <strong>Note:</strong> Please download your invoice to your device. The link may not be available later.
        </p>

        <p style="font-size: 16px;">Best Regards,<br/>${senderName}</p>
      </div>
    `,
  });
};
