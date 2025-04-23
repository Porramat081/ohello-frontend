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

MIN.content.message = `Comment must have at least ${MIN.content.value} character`;
MIN.firstname.message = `Firstname must be at least ${MIN.firstname.value} character`;
MIN.surname.message = `Surname must be at least ${MIN.surname.value} character`;

MAX.content.message = `Comment must not have more than ${MAX.content.value} character`;
MAX.firstname.message = `Firstname must not have more than ${MAX.firstname.value} character`;
MAX.surname.message = `Surname must not have more than ${MAX.surname.value} character`;
export { MIN, MAX };
