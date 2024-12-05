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
  IonFooter,
  IonButton
} from "@ionic/react";
import { searchCircle } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import {Product} from "../../store/useProduct";
import {Card} from "../../components/Card/Card";
import useFilterProducts from "../../hooks/useFilterProducts";
import { useWishlistStore } from "../../store/useWishlistStore";
import { useUserStore } from "../../store/useUserStore";
import './Store.css';

export const Store: React.FC = () => {
  const { user } = useUserStore(); // Obtener los datos del usuario logeado
  const { _handleFilter } = useFilterProducts();
  let timerSearch: any;
  const { favorites, toggleFavorite } = useWishlistStore(); // Usar store para wishlist
  const [productos, setProductos] = useState<Product[]>([]);
  const [bandera, setBandera] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1); // Página actual
  const [totalProducts, setTotalProducts] = useState<number>(0); // Total de productos
  const [productsPerPage] = useState<number>(10); // Productos por página
  
  
  useEffect(() => {
    getAllProducts();
  }, [user, currentPage]);

  const getAllProducts = async () => {
    const offset = (currentPage - 1) * productsPerPage;
    await fetch(
      `https://api.escuelajs.co/api/v1/products?limit=${productsPerPage}&offset=${offset}`
    )
      .then((response: any) => response.json())
      .then((res: Product[]) => {
        setProductos(res);
        setTotalProducts(100); // Cambia esto si la API devuelve el total de productos
      })
      .catch((err: any) => {
        console.error(err);
      });
  };

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

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalProducts / productsPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const renderPaginator = () => (
    <div className="paginator">
      <IonButton
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        expand="block"
      >
        Anterior
      </IonButton>
      <span className="page-info">
        Página {currentPage} de {Math.ceil(totalProducts / productsPerPage)}
      </span>
      <IonButton
        onClick={handleNextPage}
        disabled={currentPage === Math.ceil(totalProducts / productsPerPage)}
        expand="block"
      >
        Siguiente
      </IonButton>
    </div>
  );

  

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
        {renderPaginator()}
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
        {renderPaginator()}
      </IonContent>
      
    </IonPage>
  );
};