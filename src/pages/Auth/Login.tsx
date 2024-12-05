import React, { useState } from 'react';
import { IonContent, IonPage, IonInput, IonButton, IonItem, IonLabel, IonText, IonToast,IonHeader,IonTitle,IonToolbar } from '@ionic/react';
import useLoginUser from '../../hooks/useLoginUser';
import './Login.css';
import { useHistory } from "react-router";

export const Login: React.FC = () => {
  const history = useHistory();
  const { _handleLogin } = useLoginUser(); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false); 
  const [loading, setLoading] = useState(false); 
  const [toastMessage, setToastMessage] = useState(''); 
  
  // Validación del correo electrónico
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const handleLogin = async () => {
    setEmailError(null);
    setPasswordError(null);

    if (!validateEmail(email)) {
      setEmailError('Por favor, ingresa un correo electrónico válido.');
      return;
    }

    if (password.trim().length === 0) {
      setPasswordError('La contraseña no puede estar vacía.');
      return;
    }

    setLoading(true); // Inicia la carga

    try {
      // Llamamos a la función del hook useLoginUser para hacer el login
      const userData = await _handleLogin(email, password);
      
      if (userData) {
        history.push("/store"); 
      } else {
        setToastMessage('Correo o contraseña incorrectos');
        setShowToast(true);
      }
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Ocurrió un error inesperado';
      setToastMessage(errorMessage);
      setShowToast(true);
    } finally {
      setLoading(false); // Terminamos la carga
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding ion-text-center">
        <div className="login-container">
          {/* Correo Electrónico */}
          <IonItem className="form-item">
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
              placeholder="Correo Electrónico"
            />
          </IonItem>
          {emailError && <IonText color="danger"><p>{emailError}</p></IonText>}

          {/* Contraseña */}
          <IonItem className="form-item">
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              placeholder="Contraseña"
            />
          </IonItem>
          {passwordError && <IonText color="danger"><p>{passwordError}</p></IonText>}

          {/* Botón de login */}
          <IonButton expand="full" onClick={handleLogin} className="login-btn" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar sesión'}
          </IonButton>

          {/* Toast de error */}
          <IonToast
            isOpen={showToast}
            message={toastMessage}
            duration={2000}
            color="danger"
            onDidDismiss={() => setShowToast(false)}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};
