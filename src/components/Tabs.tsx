import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import React, { useEffect } from "react";
import { Redirect, Route } from "react-router";
import { Store } from "../pages/Store";
import Favoritos from "../pages/Favoritos";
import { heart, logIn, person, pricetags } from "ionicons/icons";
import { IonReactRouter } from "@ionic/react-router";
import {Login} from "../pages/Auth/Login";
import Perfil from "../pages/Perfil";
import { Detalle } from "../pages/Detalle";
import { useUserStore } from "../store/useUserStore";

export const Tabs: React.FC = () => {
  const { user } = useUserStore();
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
            {user != null ? <Favoritos /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/profile">
            {user != null ? <Perfil /> : <Redirect to="/login" />}
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