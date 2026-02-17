export interface EmailJSCredentials {
  publicKey: string;
  serviceId: string;
  templateId: string;
}

export function useSettings() {
  const getLoaderEnabled = (): boolean => {
    return true;
  };

  const getCredentialsForEmailJS = (): EmailJSCredentials => {
    return {
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "",
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || "",
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "",
    };
  };

  const getStagingPassword = (): string => {
    return import.meta.env.VITE_STAGING_PASSWORD || "staging123";
  };

  return {
    getLoaderEnabled,
    getCredentialsForEmailJS,
    getStagingPassword,
  };
}
