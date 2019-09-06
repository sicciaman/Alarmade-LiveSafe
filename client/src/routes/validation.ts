const validation: any = {
  email: {
    length: {
      minimum: 4
    },
    special_char: {
      chars: ['@', '.'],
    }
  },
  psw: {
    length: {
      minimum: 8
    }
  }
}

export default validation;
