import React, { useEffect, useState } from 'react';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonLabel, IonAvatar, IonItem, IonInput, IonIcon } from '@ionic/react';
import { personCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useUserStore } from '../store/useUserStore'; // Suponiendo que tienes un store para el usuario
import './Perfil.css';

const Perfil: React.FC = () => {
  const { user, clearUser } = useUserStore(); // Usando el store para obtener los datos del usuario y la función de cerrar sesión
  const history = useHistory();
  
  // Manejo de estado para mostrar información del usuario
  const [username, setUsername] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    if (!user) {
      history.push("/store"); // Si no hay un usuario, redirigir a la página de login
    }
  }, [user]);

  const handleLogout = () => {
    clearUser(); // Llama la función de logout del store
    history.push("/store");
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >
        <IonCard >
          <IonCardHeader class="card-header">
            <IonAvatar>
              <img src={user?.avatar || 'https://via.placeholder.com/150'} alt="Avatar" />
            </IonAvatar>
            <IonCardSubtitle class='ion-text-center'>{user?.email}</IonCardSubtitle>
            <IonCardTitle class='ion-text-center'>{user?.name}</IonCardTitle>
          </IonCardHeader>

          <IonButton expand="full" color="danger" onClick={handleLogout}>
            Cerrar sesión
          </IonButton>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Perfil;
