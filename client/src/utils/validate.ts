import validation from './validation';

const checkEmail = (value: string): boolean => {

  if (value.length < validation.email.length.minimum) {
    return true;
  }

  for (var i = 0; i < validation.email.special_char.chars.length; i++){
    if (!value.includes(validation.email.special_char.chars[i])) {
      return true;
    }
  }

  return false;
}

const checkPsw = (value: string): boolean => {

  if (value.length < validation.psw.length.minimum) {
    return true;
  }

  return false;
}


export default function validate(fieldName: string, value: string): boolean {

  switch(fieldName) {
    case 'email':
      return checkEmail(value);
      break;
    case 'psw':
      return checkPsw(value);
      break;
    default:
      return true;
  }
}
