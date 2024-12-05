import {
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
    IonImg,
    IonText,
    IonButton
  } from "@ionic/react";
  import React, { useEffect } from "react";
  import useProduct, {Product, Category} from "../store/useProduct";
  import './Card.css';
  import { useHistory } from "react-router";
  import { useWishlistStore } from "../store/useWishlistStore";
  import { useUserStore } from "../store/useUserStore";
  import { heartOutline, heart } from 'ionicons/icons';

  export const Card: React.FC<Product> = ({id,title,price,description,images,creationAt,updatedAt,category} : Product) => {
    const { addProduct } = useProduct();
    const { user } = useUserStore(); // Obtener los datos del usuario logeado
    const { favorites, toggleFavorite } = useWishlistStore(); // Usar store para wishlist
    const history = useHistory();
    const _handleDetail = () => {
      addProduct({
        id:id,
        title:title,
        price:price,
        description:description,
        images:images,
        creationAt:creationAt,
        updatedAt:updatedAt,
        category:category
      });
      setTimeout(() => history.push("/details"), 100);
    };

    const handleAddToWishlist = () => {
      if (user) {
        // Verifica si el usuario está logeado
        toggleFavorite({
          userId: user.id.toString(), // Añadimos el id del usuario
          product: {
            id: id,
            title: title,
            price: price,
            description:description,
            images:images,
            creationAt:creationAt,
            updatedAt:updatedAt,
            category:category
          }, // Creamos el objeto con solo los campos id, title y price
        });  // Alterna el producto en la lista de deseos
      } else {
        console.log('Usuario no logeado<zx<zx');
      }
    };
    
    return (
      <IonCard className="card">
        <IonButton 
          onClick={handleAddToWishlist} 
          color="light"
          fill="clear"
          size="small"
          className="wishlist-btn"
        >
          <IonIcon icon={user?.id && favorites[user.id]?.some(item => item.id === id) ? heart : heartOutline} />
        </IonButton>
        <IonImg onClick={_handleDetail} src={'https://via.placeholder.com/150'} alt={title} />
        <IonCardHeader>
            <IonCardTitle onClick={_handleDetail} className="card__custom-title">{title}</IonCardTitle>
            <IonCardSubtitle onClick={_handleDetail} className="card__custom-subtitle"> 
                <section className="card__custom-category">
                    <IonText>
                        {category.name}
                    </IonText>
                </section>
                <IonText>
                    {new Intl.NumberFormat("es-CO", {
                        style: "currency",
                        currency: "COP",
                        minimumFractionDigits: 0,
                    }).format(price)}
                </IonText>
            </IonCardSubtitle>
        </IonCardHeader>
      </IonCard>
    );
  };