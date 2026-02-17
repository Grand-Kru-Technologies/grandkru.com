const STRING_MAP: Record<string, string> = {
  about: "About",
  all_categories: "All",
  contact_thank_you: "*Thank you* for getting in touch!",
  contact_thank_you_description:
    "Your message has been received, and our team will be in touch with you shortly.",
  contact_thank_you_reply: "Our reply will be sent to your email address *{email}*.",
  copyright_message:
    "Copyright ©{year} <a href='{url}' target='_blank'>{holder}</a> – {license}",
  email: "E-mail",
  error_fill_all_fields: "Please fill all the fields.",
  error_invalid_email: "Please enter a valid e-mail address.",
  error_sending_message: "There was an error sending the message.",
  latest_release: "Latest Release",
  loading: "Loading...",
  message: "Message",
  name: "Name",
  project_available_here:
    "<strong>@{title}</strong> is available on the following platforms or services:",
  send: "Send Message",
  sending_message: "Sending Message...",
  subject: "Subject",
  tags: "Tags:",
  where_to_find: "Where To Find",
};

interface Replacement {
  key: string;
  replacement: string;
}

export function useStrings() {
  const get = (key: string, replacements?: Replacement[]): string => {
    let str = STRING_MAP[key] || "strings." + key;

    if (replacements) {
      replacements.forEach(({ key, replacement }) => {
        str = str.replaceAll("@{" + key + "}", replacement);
      });
    }

    return str;
  };

  const getCopyrightMessage = (
    year: string | number,
    holder: string,
    url: string,
    license: string
  ): string => {
    return get("copyright_message")
      .replaceAll("{year}", year.toString())
      .replaceAll("{url}", url)
      .replaceAll("{holder}", holder)
      .replaceAll("{license}", license);
  };

  const truncate = (str: string, maxLength: number, suffix = "..."): string => {
    if (str.length <= maxLength) return str;
    return str.slice(0, maxLength - suffix.length) + suffix;
  };

  const capitalize = (str: string): string => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const capitalizeWords = (str: string): string => {
    return str
      .split(" ")
      .map((word) => capitalize(word))
      .join(" ");
  };

  const slugify = (str: string): string => {
    return str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const stripHtml = (html: string): string => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  const formatNumber = (num: number, locale = "en-US"): string => {
    return new Intl.NumberFormat(locale).format(num);
  };

  return {
    get,
    getCopyrightMessage,
    truncate,
    capitalize,
    capitalizeWords,
    slugify,
    stripHtml,
    formatNumber,
  };
}
