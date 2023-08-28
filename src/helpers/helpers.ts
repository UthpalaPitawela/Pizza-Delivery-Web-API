const bcrypt = require('bcrypt');

export async   function storePassword(password) {
  // Generate a salt
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);

  // Hash the password with the salt
    const hashedPassword = await bcrypt.hash(password, salt);
    return  hashedPassword;
  // Store the hashed password in the database
  // ...
}

export async function verifyPassword(enteredPassword, storedHashedPassword) {
    const isMatch = await bcrypt.compare(enteredPassword, storedHashedPassword);
    return isMatch;
  }