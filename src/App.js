import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [maskedEmail, setMaskedEmail] = useState('');
  const [notification, setNotification] = useState('');

  const maskEmail = () => {
    const atIndex = email.indexOf('@');
    if (atIndex === -1) {
      showNotification('Por favor, insira um e-mail válido.');
      return;
    }

    // Calcular 10% do comprimento antes do '@'
    const visibleLength = Math.ceil(atIndex * 0.1);
    const maskedLength = atIndex - 2 * visibleLength;

    let masked = email.substring(0, visibleLength);
    masked += '*'.repeat(maskedLength);
    masked += email.substring(atIndex - visibleLength, atIndex);
    masked += email[atIndex]; // Inclui o '@'

    const parts = email.substring(atIndex + 1).split('.');
    for (let i = 0; i < parts.length; i++) {
      if (parts[i].length > 0) {
        masked += parts[i][0]; // Primeiro caractere de cada parte
        if (i < parts.length - 1) {
          masked += '*'.repeat(parts[i].length - 1) + '.'; // Mascara o restante e adiciona o ponto
        } else {
          masked += '*'.repeat(parts[i].length - 1); // Mascara o restante da última parte
        }
      }
    }
    setMaskedEmail(masked);
  };

  const clearFields = () => {    setEmail('');
    setMaskedEmail('');
  };

  const copyToClipboard = text => {
    navigator.clipboard.writeText(text)
    .then(() => showNotification('Texto copiado!'))
      .catch(err => showNotification('Falha ao copiar: ', err));
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 3000); // A notificação desaparece após 3 segundos
  };
  
  return (
    <div className="App">
      <header className="App-header">
      {notification && <div className="notification">{notification}</div>} {/* Notificação aqui */}        
        <div className="email-container">
          <div>
            <label>E-mail: </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="email-input"
            />
            <button onClick={maskEmail} className="button_Mask_Limpar">Mascarar</button>
            <button onClick={clearFields} className="button_Mask_Limpar">Limpar</button>
          </div>
          <p>{maskedEmail || " "}</p>
          <div className="masked-Email">
              <button 
                onClick={() => copyToClipboard(maskedEmail)} 
                disabled={!maskedEmail} 
                className="button_Copy">
                  Copiar Email Mascarado
              </button>
              <button 
                onClick={() => copyToClipboard(`Segue o e-mail cadastrado em sua conta: ${maskedEmail}.\nPor medidas de segurança não é possível informar o email cadastrado por completo.`)} 
                disabled={!maskedEmail} 
                className="button_Copy">
                  Copiar Mensagem Completa
              </button>
            </div>
        </div>
      </header>
   </div>
  );
}

export default App;



