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
import useFilterProducts from "../hooks/useFilterProducts";
import { useWishlistStore } from "../store/useWishlistStore";
import { useUserStore } from "../store/useUserStore";

export const Store: React.FC = () => {
  const { user } = useUserStore(); // Obtener los datos del usuario logeado
  const { favorites, toggleFavorite } = useWishlistStore(); // Usar store para wishlist
  const [productos, setProductos] = useState<Product[]>([]);
  const [bandera, setBandera] = useState<boolean>(false);
  const { _handleFilter } = useFilterProducts();
  let timerSearch: any;
  useEffect(() => {
    getAllProducts();
  }, [user]);

  const getAllProducts = async() => {
    await fetch('https://api.escuelajs.co/api/v1/products?limit=10&offset=1')
    .then((response: any) => {
      return response.json();
    }).then((res: Product[]) => {
      setProductos(res);
    }).catch((err: any) => {
      console.error(err);
    })
  }

  const _handleSearchInput = async(e: CustomEvent) => {
    clearTimeout(timerSearch);
    const value = (e.target as HTMLInputElement)?.value || "";

    const res =await _handleFilter(value);
    timerSearch = setTimeout(() => {

      if (res)
        if(res?.length > 0)
          setProductos(res);
        else
          getAllProducts();
      else getAllProducts();
    }, 500);
  }

  

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
            <IonTitle size="large">No se han encontrado productos</IonTitle>
          }
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};