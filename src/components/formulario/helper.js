const resticaoNomePessoa = /^[a-zA-ZçÇáÁàÀâÂãÃéÉèÈêÊíÍìÌîÎóÓòÒôÔõÕúÚùÙûÛ]{2,15}$/;
export const regexNamePessoa = {
  restricao: resticaoNomePessoa,
  feedbackInvalido: 'Apenas o primeiro nome'
};

const restricaoNomeMaterial = /^[a-zA-ZçÇáÁàÀâÂãÃéÉèÈêÊíÍìÌîÎóÓòÒôÔõÕúÚùÙûÛ0-9\s.\-]{2,60}$/;
export const regexNameMaterial = {
  restricao: restricaoNomeMaterial,
  feedbackInvalido: 'Apenas letras ou números'
};


const regexQdt = /^[0-9]+$/;
export const regexNumero = {
  restricao: regexQdt,
  feedbackInvalido: 'Apenas números positivos'
};


export const regexLastName = /^[a-zA-ZçÇáÁàÀâÂãÃéÉèÈêÊíÍìÌîÎóÓòÒôÔõÕúÚùÙûÛ\s]{2,30}$/;
export const regexNumber = /^(\d+|\d+\.\d+)$/;
export const regexPhoneNumber = /^([\d()\s\-]{15})?$/
export const regexSenha = /^(?=.*[a-zA-Z])(?=.*\d).{6,30}$/;


export const hasCampoIncorreto = (props) => {
    return props.some((prop) => prop === true);
  };
