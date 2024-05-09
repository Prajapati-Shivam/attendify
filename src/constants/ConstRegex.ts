export const ConstRegex = {
  GST_NO: /^\d{2}[A-Z]{5}\d{4}[A-Z][1-9A-Z]Z[\dA-Z]$/,
  GST_NO_OPTIONAL: /^(^[\dA-Z]{15}$)?$/,
  PAN_NO_OPTIONAL: /^(^[A-Z]{5}\d{4}[A-Z]$)?$/,
  URL_OPTIONAL: /^(https?:\/\/[^\s#$./?]+\.\S*)?$/,
  EMAIL_OPTIONAL: /^(^[\w%+.-]+@[\d.A-Za-z-]+\.[A-Za-z]{2,}$)?$/,
  UPI_ID: /^[\d.A-Za-z-]{2,256}@[A-Za-z]{2,64}$/,
  IFSC_CODE: /^[A-Z]{4}0[\dA-Z]{6}$/,
  DOMAIN: /^[\d.A-Za-z-]+\.[A-Za-z]{2,}$/,
  PHONE_NUMBER: /^\+\d{8,14}(,\+\d{8,14})*$/,
};
