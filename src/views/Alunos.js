import React from "react";
import{
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
} from '@coreui/react';
import CIcon from "@coreui/icons-react";
import TabelaAluno from "src/components/tabelaAluno";


export default () => {

    return (
        <CRow>
            <CCol>
                <h2> Meus Alunos</h2>

                <CCard>

                    <CCardHeader>
                        <CButton color="primary">
                            <CIcon icon="cil-check" /> Cadastrar Aluno
                        </CButton>

                    </CCardHeader>
                    
                    <CCardBody>

                        <TabelaAluno>
                        </TabelaAluno> 

                    </CCardBody>

                </CCard>

            </CCol>
        </CRow>



        
    );
}