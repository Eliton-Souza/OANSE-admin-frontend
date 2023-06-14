export const regexName = /^[a-zA-ZçÇ]{2,15}$/;
export const regexLastName = /^[a-zA-ZçÇ\s]{2,30}$/;

export const hasCampoIncorreto = (props) => {
    return props.some((prop) => prop === true);
  };
