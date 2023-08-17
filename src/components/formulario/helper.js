const resticaoNomePessoa = /^[a-zA-ZçÇáÁàÀâÂãÃéÉèÈêÊíÍìÌîÎóÓòÒôÔõÕúÚùÙûÛ]{2,15}$/;

export const regexNamePessoa = {
  restricao: resticaoNomePessoa,
  feedbackInvalido: 'Apenas o primeiro nome'
};



export const regexLastName = /^[a-zA-ZçÇáÁàÀâÂãÃéÉèÈêÊíÍìÌîÎóÓòÒôÔõÕúÚùÙûÛ\s]{2,30}$/;
export const regexNumber = /^(\d+|\d+\.\d+)$/;
export const regexPhoneNumber = /^(\d{11})?$/;


export const hasCampoIncorreto = (props) => {
    return props.some((prop) => prop === true);
  };
