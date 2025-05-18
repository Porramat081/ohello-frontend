const MIN = {
  content: {
    value: 1,
    message: "",
  },
  firstname: {
    value: 2,
    message: "",
  },
  surname: {
    value: 2,
    message: "",
  },
  password: {
    value: 8,
    message: "",
  },
};

const MAX = {
  content: {
    value: 50,
    message: "",
  },
  firstname: {
    value: 20,
    message: "",
  },
  surname: {
    value: 20,
    message: "",
  },
};

const VALID_EMAIL_DOMAINS = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
];

const EMAIL_ERROR = {
  format: "Email is not valid , Please enter a valid email",
  domain:
    "Email must be from one of the following domains: " +
    VALID_EMAIL_DOMAINS.join(", "),
};

MIN.content.message = `Comment must have at least ${MIN.content.value} character`;
MIN.firstname.message = `Firstname must be at least ${MIN.firstname.value} character`;
MIN.surname.message = `Surname must be at least ${MIN.surname.value} character`;
MIN.password.message = `Password must be at least ${MIN.password.value} character`;

MAX.content.message = `Comment must not have more than ${MAX.content.value} character`;
MAX.firstname.message = `Firstname must not have more than ${MAX.firstname.value} character`;
MAX.surname.message = `Surname must not have more than ${MAX.surname.value} character`;
export { MIN, MAX, EMAIL_ERROR };
