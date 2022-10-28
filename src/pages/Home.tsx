import {
    IonButton,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonLabel,
    IonPage,
    IonRouterLink,
    IonRow,
    IonTitle,
    IonToolbar,
} from "@ionic/react";

const Home: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="danger">
                    <IonTitle>Expense Management</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid>
                    <IonRow>
                        <IonCol>
                            <IonButton>
                                <IonRouterLink
                                    routerLink={`trip/add`}
                                    color="light"
                                >
                                    Add Trip
                                </IonRouterLink>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                            <IonButton>
                                <IonRouterLink
                                    routerLink={`trip/view`}
                                    color="light"
                                >
                                    View Trip
                                </IonRouterLink>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Home;
