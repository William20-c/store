import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import { filter, searchCircle } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import "./Home.css";
import {Product} from "../store/useProduct";
import {Card} from "../components/Card";
import { useWishlistStore } from "../store/useWishlistStore";
import { useUserStore } from "../store/useUserStore";

const Favoritos: React.FC = () => {
  const { user } = useUserStore(); 
  const { favorites, toggleFavorite } = useWishlistStore(); 
  const [productos, setProductos] = useState<Product[]>([]);
  let timerSearch: any;

  useEffect(() => {
    if (user?.id) {
      // Filtramos los productos que corresponden al usuario logueado
      const userFavorites = favorites[user.id] || [];
      setProductos(userFavorites);
    }
  }, [user, favorites]);

  const _handleSearchInput = async (e: CustomEvent) => {
    clearTimeout(timerSearch);
    const value = (e.target as HTMLInputElement)?.value || "";
  
    // Asegurarnos de que `user?.id` esté definido antes de acceder a `favorites`
    if (user?.id) {
      const userFavorites = favorites[user.id.toString()] || []; // Asegurarse de que existe la lista de favoritos
      const filteredFavorites = userFavorites.filter((product: Product) =>
        product?.title.toLowerCase().includes(value.toLowerCase())
      );
  
      timerSearch = setTimeout(() => {
        // Si hay resultados filtrados, mostrar solo esos
        if (filteredFavorites.length > 0) {
          setProductos(filteredFavorites);
        } else {
          // Si no hay coincidencias, mostrar todos los favoritos
          setProductos(userFavorites);
        }
      }, 500);
    }
  };
  

  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Productos</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonSearchbar
          searchIcon={searchCircle}
          animated={true}
          placeholder={'Buscar...'}
          onIonInput={_handleSearchInput}
        />
        <IonGrid fixed={true}>
          {productos?.length > 0 ?
            <IonRow>
              {productos?.map((product:any) => (
                <IonCol
                  title={product?.title}
                  key={`idx-product-${product?.id}`}
                  size="6"
                  size-sm="3"
                >
                  <Card 
                    id={product?.id}
                    title={product?.title}
                    price={product?.price}
                    description={product?.description}
                    images={product?.images}
                    creationAt={product?.creationAt}
                    updatedAt={product?.updatedAt}
                    category={product?.category}
                  ></Card>
                </IonCol>
              ))}
            </IonRow>
          : 
            <IonTitle size="large">No hay productos...</IonTitle>
          }
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Favoritos;