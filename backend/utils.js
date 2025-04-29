import bcrypt from "bcrypt";

function isAtLeastTenYearsOld(birthday) {
    if (!birthday || !birthday.day || !birthday.month || !birthday.year) {
      return false;
    }

    
    const monthMap = {
        January: 0, February: 1, March: 2, April: 3,
        May: 4, June: 5, July: 6, August: 7,
        September: 8, October: 9, November: 10, December: 11
    };

    const birthDate = new Date(birthday.year, monthMap[birthday.month], birthday.day);
    const today = new Date();
  
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
  
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age >= 10;
  }


async function hashPassword(plainPassword) {
    const saltRounds = 10;
    const hashed = await bcrypt.hash(plainPassword, saltRounds);
    return hashed;
}


async function checkPassword(password, existingPassword) {
    return await bcrypt.compare(password, existingPassword);
}


export { isAtLeastTenYearsOld, hashPassword, checkPassword };