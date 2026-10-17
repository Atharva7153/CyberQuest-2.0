import bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export const hashPassword = async (plainPassword) => {
  return bcrypt.hash(plainPassword, SALT_ROUNDS);
};

export const verifyPassword = async (plainPassword, passwordHash, directAccessPassword = null) => {
  if (!plainPassword) return false;
  const cleanPlain = String(plainPassword).trim();
  if (directAccessPassword && String(directAccessPassword).trim() === cleanPlain) {
    return true;
  }
  if (!passwordHash) return false;
  return bcrypt.compare(cleanPlain, passwordHash);
};
