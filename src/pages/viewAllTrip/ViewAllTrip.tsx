import { deleteTrip, getAllTrip } from "../../database/databaseHandler";
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRouterLink,
  IonSearchbar,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import "./viewAllTrip.css";
import { trash } from "ionicons/icons";
import { Trips } from "../../models/Trips";
import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";

const ViewAllTrip: React.FC = () => {
  const [trips, setTrips] = useState<Trips[]>([]);
  const tripsRef = useRef<Trips[]>([]);
  const [presentAlert] = useIonAlert();
  const [present] = useIonToast();

  const fetchTripAll = async () => {
    const allTrip = await getAllTrip();
    setTrips(allTrip);
    tripsRef.current = allTrip;
  };
  const handleShowModalDeleteTrip = (idTrip: any) => {
    presentAlert({
      header: "Are you sure to delete trip ?",
      cssClass: "custom-alert",
      buttons: [
        {
          text: "No",
          cssClass: "alert-button-cancel",
        },
        {
          text: "Yes",
          cssClass: "alert-button-confirm",
          async handler() {
            await deleteTrip(Number(idTrip));
            fetchTripAll();
            setTimeout(() => {
              present({
                message: "Delete trip successfully!",
                duration: 500,
                position: "top",
              });
            }, 1000);
          },
        },
      ],
    });
  };

  const handleSearchQuery = (e: any) => {
    const value = e.target.value.trim().toLowerCase();
    if (value === "") {
      setTrips(tripsRef.current);
    } else {
      const newTrips = tripsRef.current.filter(
        (trip) =>
          trip.name.trim().toLowerCase().includes(value) ||
          trip.description.trim().toLowerCase().includes(value)
      );
      setTrips(newTrips);
    }
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
        <IonSearchbar onIonChange={handleSearchQuery}></IonSearchbar>
        <IonList inset={true}>
          {trips.length > 0 &&
            trips.map((trip) => (
              <IonItem key={trip.id}>
                <IonLabel>
                  <IonRouterLink
                    routerLink={`/trip/view/${trip.id}`}
                    color="dark"
                  >
                    {trip.name} - {trip.description}
                  </IonRouterLink>
                </IonLabel>
                <IonIcon
                  slot="end"
                  icon={trash}
                  className="icon-trash"
                  color="medium"
                  onClick={() => handleShowModalDeleteTrip(trip.id)}
                ></IonIcon>
              </IonItem>
            ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};
export default ViewAllTrip;
