import React, {Dispatch, SetStateAction} from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {PRIMARY_COLOR} from "../../../utils/colors";
import { Modal } from '@mui/material';
import { Button } from '@mui/base';

interface CustomCheckboxProps {
  checked: boolean;
  setChecked: Dispatch<SetStateAction<boolean>>;
  normalText?: string;
  linkText?: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({checked, setChecked, normalText, linkText}) => {

  const handleChange = (event: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
    setChecked(event.target.checked);
  };

  // Flag to control the toggle of the modal
  const [flag, setFlag] = React.useState(false);

  // Function to handle the click on the hyperlink
  const handleLinkClick = (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // Prevents the default behavior of the hyperlink
      setFlag(true); // Sets the flag to true to show the modal  
  };  

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked}
          onChange={handleChange}
          sx={{
            color: 'grey', // Cor quando não está marcada
            '&.Mui-checked': {
              color: PRIMARY_COLOR, // Cor quando está marcada
            },
          }}
        />
      }
      label={
        <span>
          {normalText}
          <a
            href="#"
            onClick={handleLinkClick}
            style={{
              color: PRIMARY_COLOR, // Substitua 'suaCorEscolhida' pela cor desejada
              textDecoration: 'none', // Remove o sublinhado do hyperlink
              cursor: 'pointer' // Muda o cursor para indicar que é clicável
            }}
          >
            {linkText}
          </a>
          <Modal 
            open={flag} 
            onClose={() => setFlag(false)} // The modal closes when the user clicks outside of it
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                position: 'absolute',
                width: 800,
                height: 600,
                backgroundColor: 'white',
                padding: 20,
                borderRadius: 20,
                outline: 'none',
              }}>
                <Button
                  onClick={() => setFlag(false)} //when the button is clicked, the modal closes
                  style={{ 
                    backgroundColor: 'transparent',
                    border: 'none',
                    float: 'right',
                    fontSize: 30,
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}>&times;</Button>
                <h1>RobDroneGo Privacy Policy</h1>
                <div style={{ //make the text scrollable
                  overflowY: 'scroll',
                  height: 500,
                }}>
                <p>
                  No Instituto Superior de Engenharia do Porto, valorizamos e consideramos de extrema
                  importância a confiança que nos é depositada e fazemos por garantir a segurança e privacidade
                  do processamento dos seus dados. Licitude e transparência são elementos essenciais na relação
                  de confiança que estabelecemos com os nossos Clientes.
                  <br/>
                  <br/>
                  Para oferecer os serviços requisitados, o ISEP irá recolher, organizar e utilizar o nome
                  completo, o contacto telefónico, o número de identificação fiscal, o tipo de utilizador (cargos:
                  gestor de campus, gestor de frota, administrador de sistemas, gestor de tarefas e utente), o
                  identificador digital do utilizador, sendo que este está previsto que seja divulgado, e as imagens
                  de videovigilância capturadas pelos robots (robiseps).
                  <br/>
                  <br/>
                  Os dados anteriormente referidos podem ser categorizados por identificação (nome
                  completo, contacto telefónico, identificador digital do utilizador e tipo de utilizador), autenticação
                  (identificador digital do utilizador), faturação (número de identificação fiscal) e vigilância
                  (captura de imagens).
                  <br/>
                  <br/>
                  O tratamento dos dados referidos permite, entre outras finalidades, a identificação para
                  transporte de objetos, a autenticação no sistema, a distinção de funcionalidades dentro da
                  aplicação, a faturação de serviços fornecidos através do uso da aplicação e a vigilância do campus.
                  <br/>
                  <br/>
                  Para as finalidades acima referidas, é relevante fundamentar as utilizações dos dados
                  correspondentes. O nome completo e o contacto telefónico são utilizados para que possa ser
                  identificado o utilizador que requisitou a tarefa de transporte e o utilizador destinatário dessa
                  tarefa. O tipo de utilizador permite que seja feita uma distinção das funcionalidades que lhe estão
                  disponíveis, aquando do uso da aplicação. O identificador digital do utilizador permite identificá-
                  lo e autenticá-lo no sistema. O número de identificação fiscal do utilizador é utilizado para a
                  faturação de serviços disponíveis aos utilizadores na aplicação. A captura de imagens permite que
                  exista uma vigilância no campus por questões de segurança de todos os seus utentes e permite ao
                  robot/drone reconhecer o espaço que o rodeia para a correta execução das suas tarefas.
                  <br/>
                  <br/>
                  O ISEP segue o Regulamento Geral de Proteção de Dados (RGPD), que define que os
                  dados pessoais devem ser conservados durante o menor período de tempo possível, através do
                  critério onde o nome, contacto, identificador digital, número de identificação fiscal e tipo de
                  utilizador devem ser armazenados apenas enquanto o utilizador estiver vinculado com o ISEP e
                  devem ser sistematicamente atualizados. Já a captura de imagens tem algumas variantes: tratando-se
                  tratar de um robot que executa apenas tarefas de entregas, as imagens devem ficar armazenadas
                  até ao término da tarefa, por outro lado, tratando-se de um robot que executa tarefas de videovigilância,
                  está legalmente estabelecido no n.º 2 do artigo 31.º da Lei n.º 34/2013, de 16 de maio que 
                  estabelece como período máximo de conservação 30 dias.
                  <br/>
                  <br/>
                  Como cliente do sistema:
                  </p>
                  <ul>
                    <li>Segundo os artigos 6.º e 7.º do RGPD, tem o direito de retirar o seu consentimento a qualquer altura, sem qualquer complicação ou constrangimento.</li>
                    <li>Segundo o artigo 13.º do RGPD, tem o direito de informação aquando da recolha, ou seja, quando a recolha de dados é efetuada, são fornecidas informações adicionais ao titular dos dados, relativamente ao tratamento desses dados.</li>
                    <li>Segundo o artigo 14.º do RGPD, tem o direito de ser informado quando os dados não são recolhidos junto do titular, ou seja, ser informado quando são recolhidos dados que não foram fornecidos pelo titular dos mesmos.</li>
                    <li>Segundo o artigo 15.º do RGPD, tem o direito de obter uma cópia dos dados pessoais recolhidos, tendo ainda o direito de saber:
                      <ul>
                        <li>Se os seus dados são objeto de tratamento.</li>
                        <li>As finalidades.</li>
                        <li>A categoria dos dados.</li>
                        <li>O prazo de conservação ou critério de conservação.</li>
                        <li>Existência de direito à retificação, apagamento, limitação (quando os dados deixarem de ser necessários para a finalidade) e reclamação dos dados.</li>
                      </ul>
                      </li>
                  </ul>
                  <br/>
                  <p>
                  Para mais informações, entre em contacto connosco (Instituto Superior de Engenharia do
                  Porto – ISEP | Rua Dr. António Bernardino de Almeida, 431, 4249-015 Porto, Portugal | Tel:
                  +351 22 83 40 500 | Fax: +351 22 83 21 159 | e-mail: info-sa@isep.ipp.pt).

                </p>
                </div>
              </div>
            </Modal>
        </span>
      }
    />
  );
};

export default CustomCheckbox;