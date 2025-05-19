// <rootDir>/test/mocks/emailjs.ts
export const send = async (serviceID: string, templateID: string, templateParams?: any, publicKey?: string) => {
  console.log('Mock emailjs.send called with:', serviceID, templateID, templateParams, publicKey);
  return Promise.resolve({ status: 200, text: 'OK' });
};

export const init = (publicKey: string, origin?: string) => {
  console.log('Mock emailjs.init called with:', publicKey, origin);
};

const emailjsMock = {
  send,
  init,
  // ... other functions if needed
};
export default emailjsMock; // If the library has a default export as well/instead