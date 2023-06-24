export const regexName = /^[a-zA-ZçÇáÁàÀâÂãÃéÉèÈêÊíÍìÌîÎóÓòÒôÔõÕúÚùÙûÛ]{2,15}$/;
export const regexLastName = /^[a-zA-ZçÇáÁàÀâÂãÃéÉèÈêÊíÍìÌîÎóÓòÒôÔõÕúÚùÙûÛ\s]{2,30}$/;

export const hasCampoIncorreto = (props) => {
    return props.some((prop) => prop === true);
  };
