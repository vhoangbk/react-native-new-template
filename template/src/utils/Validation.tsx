export const validateEmail = (email: string) => {
  if (!email) {
    return false;
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
    return false;
  }
  return true;
};

export const validatePassword = (password: string) => {
  if (!password) {
    return false;
  }
  if (!/^[\S]{6,10}$/i.test(password)) {
    return false;
  }
  return true;
};
