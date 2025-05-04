import { f as ref, o as openBlock, c as createElementBlock, a as createBaseVNode, g as createCommentVNode, h as withModifiers, i as withDirectives, v as vModelText, n as normalizeClass, t as toDisplayString } from "./index-a63217b0.js";
class EmailJSResponseStatus {
  constructor(_status = 0, _text = "Network Error") {
    this.status = _status;
    this.text = _text;
  }
}
const createWebStorage = () => {
  if (typeof localStorage === "undefined")
    return;
  return {
    get: (key) => Promise.resolve(localStorage.getItem(key)),
    set: (key, value) => Promise.resolve(localStorage.setItem(key, value)),
    remove: (key) => Promise.resolve(localStorage.removeItem(key))
  };
};
const store = {
  origin: "https://api.emailjs.com",
  blockHeadless: false,
  storageProvider: createWebStorage()
};
const buildOptions = (options) => {
  if (!options)
    return {};
  if (typeof options === "string") {
    return {
      publicKey: options
    };
  }
  if (options.toString() === "[object Object]") {
    return options;
  }
  return {};
};
const init = (options, origin = "https://api.emailjs.com") => {
  if (!options)
    return;
  const opts = buildOptions(options);
  store.publicKey = opts.publicKey;
  store.blockHeadless = opts.blockHeadless;
  store.storageProvider = opts.storageProvider;
  store.blockList = opts.blockList;
  store.limitRate = opts.limitRate;
  store.origin = opts.origin || origin;
};
const sendPost = async (url, data, headers = {}) => {
  const response = await fetch(store.origin + url, {
    method: "POST",
    headers,
    body: data
  });
  const message = await response.text();
  const responseStatus = new EmailJSResponseStatus(response.status, message);
  if (response.ok) {
    return responseStatus;
  }
  throw responseStatus;
};
const validateParams = (publicKey2, serviceID, templateID) => {
  if (!publicKey2 || typeof publicKey2 !== "string") {
    throw "The public key is required. Visit https://dashboard.emailjs.com/admin/account";
  }
  if (!serviceID || typeof serviceID !== "string") {
    throw "The service ID is required. Visit https://dashboard.emailjs.com/admin";
  }
  if (!templateID || typeof templateID !== "string") {
    throw "The template ID is required. Visit https://dashboard.emailjs.com/admin/templates";
  }
};
const validateTemplateParams = (templateParams) => {
  if (templateParams && templateParams.toString() !== "[object Object]") {
    throw "The template params have to be the object. Visit https://www.emailjs.com/docs/sdk/send/";
  }
};
const isHeadless = (navigator2) => {
  return navigator2.webdriver || !navigator2.languages || navigator2.languages.length === 0;
};
const headlessError = () => {
  return new EmailJSResponseStatus(451, "Unavailable For Headless Browser");
};
const validateBlockListParams = (list, watchVariable) => {
  if (!Array.isArray(list)) {
    throw "The BlockList list has to be an array";
  }
  if (typeof watchVariable !== "string") {
    throw "The BlockList watchVariable has to be a string";
  }
};
const isBlockListDisabled = (options) => {
  var _a;
  return !((_a = options.list) == null ? void 0 : _a.length) || !options.watchVariable;
};
const getValue = (data, name) => {
  return data instanceof FormData ? data.get(name) : data[name];
};
const isBlockedValueInParams = (options, params) => {
  if (isBlockListDisabled(options))
    return false;
  validateBlockListParams(options.list, options.watchVariable);
  const value = getValue(params, options.watchVariable);
  if (typeof value !== "string")
    return false;
  return options.list.includes(value);
};
const blockedEmailError = () => {
  return new EmailJSResponseStatus(403, "Forbidden");
};
const validateLimitRateParams = (throttle, id) => {
  if (typeof throttle !== "number" || throttle < 0) {
    throw "The LimitRate throttle has to be a positive number";
  }
  if (id && typeof id !== "string") {
    throw "The LimitRate ID has to be a non-empty string";
  }
};
const getLeftTime = async (id, throttle, storage) => {
  const lastTime = Number(await storage.get(id) || 0);
  return throttle - Date.now() + lastTime;
};
const isLimitRateHit = async (defaultID, options, storage) => {
  if (!options.throttle || !storage) {
    return false;
  }
  validateLimitRateParams(options.throttle, options.id);
  const id = options.id || defaultID;
  const leftTime = await getLeftTime(id, options.throttle, storage);
  if (leftTime > 0) {
    return true;
  }
  await storage.set(id, Date.now().toString());
  return false;
};
const limitRateError = () => {
  return new EmailJSResponseStatus(429, "Too Many Requests");
};
const send = async (serviceID, templateID, templateParams, options) => {
  const opts = buildOptions(options);
  const publicKey2 = opts.publicKey || store.publicKey;
  const blockHeadless = opts.blockHeadless || store.blockHeadless;
  const storageProvider = opts.storageProvider || store.storageProvider;
  const blockList = { ...store.blockList, ...opts.blockList };
  const limitRate = { ...store.limitRate, ...opts.limitRate };
  if (blockHeadless && isHeadless(navigator)) {
    return Promise.reject(headlessError());
  }
  validateParams(publicKey2, serviceID, templateID);
  validateTemplateParams(templateParams);
  if (templateParams && isBlockedValueInParams(blockList, templateParams)) {
    return Promise.reject(blockedEmailError());
  }
  if (await isLimitRateHit(location.pathname, limitRate, storageProvider)) {
    return Promise.reject(limitRateError());
  }
  const params = {
    lib_version: "4.4.1",
    user_id: publicKey2,
    service_id: serviceID,
    template_id: templateID,
    template_params: templateParams
  };
  return sendPost("/api/v1.0/email/send", JSON.stringify(params), {
    "Content-type": "application/json"
  });
};
const validateForm = (form) => {
  if (!form || form.nodeName !== "FORM") {
    throw "The 3rd parameter is expected to be the HTML form element or the style selector of the form";
  }
};
const findHTMLForm = (form) => {
  return typeof form === "string" ? document.querySelector(form) : form;
};
const sendForm = async (serviceID, templateID, form, options) => {
  const opts = buildOptions(options);
  const publicKey2 = opts.publicKey || store.publicKey;
  const blockHeadless = opts.blockHeadless || store.blockHeadless;
  const storageProvider = store.storageProvider || opts.storageProvider;
  const blockList = { ...store.blockList, ...opts.blockList };
  const limitRate = { ...store.limitRate, ...opts.limitRate };
  if (blockHeadless && isHeadless(navigator)) {
    return Promise.reject(headlessError());
  }
  const currentForm = findHTMLForm(form);
  validateParams(publicKey2, serviceID, templateID);
  validateForm(currentForm);
  const formData = new FormData(currentForm);
  if (isBlockedValueInParams(blockList, formData)) {
    return Promise.reject(blockedEmailError());
  }
  if (await isLimitRateHit(location.pathname, limitRate, storageProvider)) {
    return Promise.reject(limitRateError());
  }
  formData.append("lib_version", "4.4.1");
  formData.append("service_id", serviceID);
  formData.append("template_id", templateID);
  formData.append("user_id", publicKey2);
  return sendPost("/api/v1.0/email/send-form", formData);
};
const emailjs = {
  init,
  send,
  sendForm,
  EmailJSResponseStatus
};
const _hoisted_1 = { class: "min-h-screen bg-white py-16" };
const _hoisted_2 = { class: "container mx-auto px-4" };
const _hoisted_3 = {
  key: 0,
  class: "fixed top-4 right-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative",
  role: "alert"
};
const _hoisted_4 = {
  key: 1,
  class: "fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative",
  role: "alert"
};
const _hoisted_5 = { class: "max-w-2xl mx-auto" };
const _hoisted_6 = {
  key: 0,
  class: "text-red-500 text-sm mt-1"
};
const _hoisted_7 = {
  key: 0,
  class: "text-red-500 text-sm mt-1"
};
const _hoisted_8 = {
  key: 0,
  class: "text-red-500 text-sm mt-1"
};
const _hoisted_9 = {
  key: 0,
  class: "text-red-500 text-sm mt-1"
};
const _hoisted_10 = ["disabled"];
const serviceId = "YOUR_SERVICE_ID";
const templateId = "YOUR_TEMPLATE_ID";
const publicKey = "YOUR_PUBLIC_KEY";
const _sfc_main = {
  __name: "ContactView",
  setup(__props) {
    const form = ref({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
    const errors = ref({});
    const isSubmitting = ref(false);
    const showSuccess = ref(false);
    const showError = ref(false);
    const validateForm2 = () => {
      errors.value = {};
      if (!form.value.name) {
        errors.value.name = "Name is required";
      }
      if (!form.value.email) {
        errors.value.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.value.email)) {
        errors.value.email = "Please enter a valid email address";
      }
      if (!form.value.subject) {
        errors.value.subject = "Subject is required";
      }
      if (!form.value.message) {
        errors.value.message = "Message is required";
      }
      return Object.keys(errors.value).length === 0;
    };
    const handleSubmit = async () => {
      if (!validateForm2())
        return;
      isSubmitting.value = true;
      showSuccess.value = false;
      showError.value = false;
      try {
        const templateParams = {
          from_name: form.value.name,
          from_email: form.value.email,
          subject: form.value.subject,
          message: form.value.message
        };
        await emailjs.send(serviceId, templateId, templateParams, publicKey);
        form.value = {
          name: "",
          email: "",
          subject: "",
          message: ""
        };
        showSuccess.value = true;
      } catch (error) {
        console.error("Error sending email:", error);
        showError.value = true;
      } finally {
        isSubmitting.value = false;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          _cache[16] || (_cache[16] = createBaseVNode("h1", { class: "text-4xl font-bold text-primary text-center mb-12" }, "Contact Us", -1)),
          showSuccess.value ? (openBlock(), createElementBlock("div", _hoisted_3, [
            _cache[7] || (_cache[7] = createBaseVNode("strong", { class: "font-bold" }, "Success!", -1)),
            _cache[8] || (_cache[8] = createBaseVNode("span", { class: "block sm:inline" }, " Your message has been sent successfully.", -1)),
            createBaseVNode("span", {
              class: "absolute top-0 bottom-0 right-0 px-4 py-3",
              onClick: _cache[0] || (_cache[0] = ($event) => showSuccess.value = false)
            }, _cache[6] || (_cache[6] = [
              createBaseVNode("svg", {
                class: "fill-current h-6 w-6 text-green-500",
                role: "button",
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20"
              }, [
                createBaseVNode("title", null, "Close"),
                createBaseVNode("path", { d: "M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" })
              ], -1)
            ]))
          ])) : createCommentVNode("", true),
          showError.value ? (openBlock(), createElementBlock("div", _hoisted_4, [
            _cache[10] || (_cache[10] = createBaseVNode("strong", { class: "font-bold" }, "Error!", -1)),
            _cache[11] || (_cache[11] = createBaseVNode("span", { class: "block sm:inline" }, " An error occurred. Please try again.", -1)),
            createBaseVNode("span", {
              class: "absolute top-0 bottom-0 right-0 px-4 py-3",
              onClick: _cache[1] || (_cache[1] = ($event) => showError.value = false)
            }, _cache[9] || (_cache[9] = [
              createBaseVNode("svg", {
                class: "fill-current h-6 w-6 text-red-500",
                role: "button",
                xmlns: "http://www.w3.org/2000/svg",
                viewBox: "0 0 20 20"
              }, [
                createBaseVNode("title", null, "Close"),
                createBaseVNode("path", { d: "M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" })
              ], -1)
            ]))
          ])) : createCommentVNode("", true),
          createBaseVNode("div", _hoisted_5, [
            createBaseVNode("form", {
              onSubmit: withModifiers(handleSubmit, ["prevent"]),
              class: "space-y-6"
            }, [
              createBaseVNode("div", null, [
                _cache[12] || (_cache[12] = createBaseVNode("label", {
                  for: "name",
                  class: "block text-dark-gray font-medium mb-2"
                }, "Name", -1)),
                withDirectives(createBaseVNode("input", {
                  type: "text",
                  id: "name",
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => form.value.name = $event),
                  class: normalizeClass(["w-full px-4 py-2 border border-medium-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary", { "border-red-500": errors.value.name }])
                }, null, 2), [
                  [vModelText, form.value.name]
                ]),
                errors.value.name ? (openBlock(), createElementBlock("p", _hoisted_6, toDisplayString(errors.value.name), 1)) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", null, [
                _cache[13] || (_cache[13] = createBaseVNode("label", {
                  for: "email",
                  class: "block text-dark-gray font-medium mb-2"
                }, "Email", -1)),
                withDirectives(createBaseVNode("input", {
                  type: "email",
                  id: "email",
                  "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => form.value.email = $event),
                  class: normalizeClass(["w-full px-4 py-2 border border-medium-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary", { "border-red-500": errors.value.email }])
                }, null, 2), [
                  [vModelText, form.value.email]
                ]),
                errors.value.email ? (openBlock(), createElementBlock("p", _hoisted_7, toDisplayString(errors.value.email), 1)) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", null, [
                _cache[14] || (_cache[14] = createBaseVNode("label", {
                  for: "subject",
                  class: "block text-dark-gray font-medium mb-2"
                }, "Subject", -1)),
                withDirectives(createBaseVNode("input", {
                  type: "text",
                  id: "subject",
                  "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => form.value.subject = $event),
                  class: normalizeClass(["w-full px-4 py-2 border border-medium-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary", { "border-red-500": errors.value.subject }])
                }, null, 2), [
                  [vModelText, form.value.subject]
                ]),
                errors.value.subject ? (openBlock(), createElementBlock("p", _hoisted_8, toDisplayString(errors.value.subject), 1)) : createCommentVNode("", true)
              ]),
              createBaseVNode("div", null, [
                _cache[15] || (_cache[15] = createBaseVNode("label", {
                  for: "message",
                  class: "block text-dark-gray font-medium mb-2"
                }, "Message", -1)),
                withDirectives(createBaseVNode("textarea", {
                  id: "message",
                  "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => form.value.message = $event),
                  rows: "4",
                  class: normalizeClass(["w-full px-4 py-2 border border-medium-gray rounded-lg focus:outline-none focus:ring-2 focus:ring-primary", { "border-red-500": errors.value.message }])
                }, null, 2), [
                  [vModelText, form.value.message]
                ]),
                errors.value.message ? (openBlock(), createElementBlock("p", _hoisted_9, toDisplayString(errors.value.message), 1)) : createCommentVNode("", true)
              ]),
              createBaseVNode("button", {
                type: "submit",
                class: "w-full bg-primary text-white py-3 rounded-lg hover:bg-opacity-90 transition-colors",
                disabled: isSubmitting.value
              }, toDisplayString(isSubmitting.value ? "Sending..." : "Send Message"), 9, _hoisted_10)
            ], 32)
          ])
        ])
      ]);
    };
  }
};
export {
  _sfc_main as default
};
//# sourceMappingURL=ContactView-a4d2df90.js.map
