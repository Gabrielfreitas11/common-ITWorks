const LEVEL_DEBUG = "debug";
const LEVEL_PENDING = "pending";
const LEVEL_INFO = "info";
const LEVEL_FAIL = "fail";
const LEVEL_ERROR = "error";
const LEVEL_WARN = "warn";
const dateOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  weekday: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  era: "long",
  timeZoneName: "long",
};

export {
  LEVEL_DEBUG,
  LEVEL_ERROR,
  LEVEL_FAIL,
  LEVEL_INFO,
  LEVEL_PENDING,
  LEVEL_WARN,
  dateOptions,
};
