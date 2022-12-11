import {
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { trailSign, warning } from "ionicons/icons";
import { useEffect, useState } from "react";
import { getAllTrip } from "../database/databaseHandler";

const Home: React.FC = () => {
  const [amountTrips, setAmountTrips] = useState(0);
  const [amountRiskTrips, setAmountRiskTrips] = useState(0);
  const fetchTripAll = async () => {
    const amountTripsDB = await getAllTrip();
    setAmountTrips(amountTripsDB.length);
    const amountRiskTripsDB = amountTripsDB.filter(
      (trip) => trip.is_risk === true
    );
    setAmountRiskTrips(amountRiskTripsDB.length);
  };
  useEffect(() => {
    fetchTripAll();
  }, []);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonTitle>Expense Management</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard color="success">
          <IonCardHeader>
            <IonRow
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <IonCardSubtitle>Total number of trips</IonCardSubtitle>
              <IonIcon icon={trailSign} size="large" />
            </IonRow>
            <IonCardTitle>{`${amountTrips}`}</IonCardTitle>
          </IonCardHeader>
        </IonCard>
        <IonCard color="tertiary">
          <IonCardHeader>
            <IonRow
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <IonCardSubtitle>Total number of risk trips</IonCardSubtitle>
              <IonIcon icon={warning} size="large" />
            </IonRow>
            <IonCardTitle>{`${amountRiskTrips}`}</IonCardTitle>
          </IonCardHeader>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Home;
