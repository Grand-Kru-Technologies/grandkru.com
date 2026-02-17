import emailjs from "@emailjs/browser";
import { useSettings } from "./settings";

export interface EmailFormData {
  from_name: string;
  from_email: string;
  custom_subject: string;
  message: string;
}

export function useEmails() {
  const settings = useSettings();

  const sendEmail = async (formData: EmailFormData): Promise<boolean> => {
    const credentials = settings.getCredentialsForEmailJS();

    if (!credentials.publicKey || !credentials.serviceId || !credentials.templateId) {
      console.error("EmailJS credentials not configured");
      return false;
    }

    try {
      await emailjs.send(
        credentials.serviceId,
        credentials.templateId,
        formData as unknown as Record<string, unknown>,
        credentials.publicKey
      );
      return true;
    } catch (error) {
      console.error("Failed to send email:", error);
      return false;
    }
  };

  return {
    sendEmail,
  };
}
