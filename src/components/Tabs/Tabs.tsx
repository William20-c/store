import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { Redirect, Route } from "react-router";
import { Store } from "../../pages/Productos/Store";
import Favoritos from "../../pages/Productos/Favoritos";
import { heart, logIn, person, pricetags } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import { Login } from "../../pages/Auth/Login";
import Perfil from "../../pages/Perfil";
import { Detalle } from "../../pages/Productos/Detalle";
import { useUserStore } from "../../store/useUserStore";

export const Tabs: React.FC = () => {
  const { isLoading, setLoading, user } = useUserStore();

  useEffect(() => {
    // Simula una verificación inicial (usualmente verificarías la persistencia aquí)
    const checkUser = async () => {
      try {
        // Simula un pequeño retraso para cargar la persistencia
        await new Promise((resolve) => setTimeout(resolve, 500));
      } finally {
        setLoading(false); // Finaliza la carga
      }
    };

    checkUser();
  }, [setLoading]);

  // No renderizamos nada hasta que se haya cargado el estado del usuario
  if (isLoading) {
    return <div>Cargando...</div>; // O una pantalla de carga si lo prefieres
  }
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/store">
            <Store />
          </Route>
          <Route exact path="/details">
            <Detalle />
          </Route>
          <Route exact path="/favorites">
            {user  ? <Favoritos /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/profile">
            {user  ? <Perfil /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/">
            <Redirect to="/store" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="store" href="/store">
            <IonIcon aria-hidden="true" icon={pricetags} />
            <IonLabel>Productos</IonLabel>
          </IonTabButton>
          <IonTabButton tab="favorites" href="/favorites">
            <IonIcon aria-hidden="true" icon={heart} />
            <IonLabel>Favoritos</IonLabel>
          </IonTabButton>
          <IonTabButton tab="profile" href={user ? "/profile" : "/login"}>
            <IonIcon aria-hidden="true" icon={user ? person : logIn} />
            <IonLabel>{user ? "Perfil" : "Iniciar sesión"}</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
};
