import bcryptjs from 'bcryptjs';

const encryptPassword = (password: string) => {
  return bcryptjs.hashSync(password, 10);
};

const comparePasswords = async (
  passwordOne: string,
  passwordTwo: string
): Promise<boolean> => {
  const isValid = await bcryptjs.compare(passwordOne, passwordTwo);
  return isValid;
};

export { encryptPassword, comparePasswords };
