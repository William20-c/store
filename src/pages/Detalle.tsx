import React, { useEffect,useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonImg,
  IonIcon
} from '@ionic/react';
import useProduct, { Category } from '../store/useProduct';
import { useHistory } from "react-router";
import { heartOutline, heart } from 'ionicons/icons';
import { useWishlistStore } from "../store/useWishlistStore";
import { useUserStore } from "../store/useUserStore";

export const Detalle: React.FC = () => {
    const { product } = useProduct();
    const { user } = useUserStore(); // Obtener el id del usuario logueado
    const { favorites, toggleFavorite } = useWishlistStore(); // Usamos el store de wishlist
    const history = useHistory();
      // Estado para gestionar si está en la lista de deseados
    const [isFavorite, setIsFavorite] = useState(false);

    const handleToggleFavorite = () => {
      if (user?.id) {
        toggleFavorite({
          userId: user.id.toString(), // Usamos el id del usuario logueado
          product: {
            id: product?.id ?? 0, 
            title: product?.title ?? "", 
            price: product?.price ?? 0, 
            description: product?.description ?? "", 
            images: product?.images ?? [], 
            creationAt: product?.creationAt ?? "", 
            updatedAt: product?.updatedAt ?? "",
            category: product?.category ?? { id: 0, name: "", image: "", creationAt: "", updatedAt: "" },
          },
        });
        setIsFavorite((prev) => !prev);
      } else {
        console.log("Usuario no logeado");
      }
    };

    useEffect(() => {
        if (!product) history.push("/store");
    }, [product]);

    return (
        <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Detalle Producto</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
        <IonCard>
          <IonImg src={'https://via.placeholder.com/150'} alt={product?.title} />
          <IonCardHeader>
            <IonCardTitle>{product?.title}</IonCardTitle>
            <IonCardSubtitle>${product?.price.toFixed(2)}</IonCardSubtitle>
          </IonCardHeader>
          <IonCardContent>
            <p>{product?.description}</p>
          </IonCardContent>
        </IonCard>

        <div style={{ display: "flex", justifyContent: "space-around", margin: "20px" }}>
          <IonButton fill="clear" onClick={handleToggleFavorite}>
            <IonIcon
              icon={user?.id && favorites[user.id]?.some(item => item.id === product?.id) ? heart : heartOutline}
              color={user?.id && favorites[user.id]?.some(item => item.id === product?.id) ? "danger" : "medium" }
              size="large"
            />
          </IonButton>
        </div>
      </IonContent>
      </IonPage>
    );
};

