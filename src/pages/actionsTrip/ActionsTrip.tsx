import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import "./actionsTrip.css";
import { trash, arrowBackOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
  deleteTrip,
  getTripByID,
  insertTrip,
  updateTrip,
} from "../../database/databaseHandler";
import { Trips } from "../../models/Trips";
const tripTypes = [
  {
    id: 1,
    name: "Travel",
  },
  {
    id: 2,
    name: "Work",
  },
  {
    id: 3,
    name: "Visit relatives",
  },
];

interface IdParams {
  id?: string;
}
const ActionsTrip: React.FC = () => {
  const [trip, setTrip] = useState<Trips>({
    description: "",
    name: "",
    date_from: "",
    date_to: "",
    destination: "",
    is_risk: false,
    trip_type: -1,
  });
  const [loading, setLoading] = useState(false);
  const [presentAlert] = useIonAlert();
  const { id: idTrip } = useParams<IdParams>();
  const [present] = useIonToast();
  const history = useHistory();

  const handleChangeInformationTrip = (e: any) => {
    const value = e.target.value;
    const name = e.target.name;
    setTrip((trip) => {
      return {
        ...trip,
        [name]: e.target.checked === undefined ? value : e.target.checked,
      };
    });
  };

  const handleAddTrip = async () => {
    if (trip.name === "") {
      present({
        message: "Field name is required!",
        duration: 500,
        position: "top",
      });
      return;
    }
    if (trip.date_from === "") {
      present({
        message: "Field date from is required!",
        duration: 500,
        position: "top",
      });
      return;
    }
    if (trip.date_to === "") {
      present({
        message: "Field date to is required!",
        duration: 500,
        position: "top",
      });
      return;
    }
    if (trip.destination === "") {
      present({
        message: "Field destination is required!",
        duration: 500,
        position: "top",
      });
      return;
    }
    if (trip.trip_type === -1) {
      present({
        message: "Field type trip is required!",
        duration: 500,
        position: "top",
      });
      return;
    }

    setLoading(true);
    await insertTrip(trip);
    setTimeout(() => {
      setLoading(false);
      setTrip({
        description: "",
        name: "",
        date_from: "",
        date_to: "",
        destination: "",
        is_risk: false,
        trip_type: -1,
      });
      history.push("/trip/view");
      history.go(0);
      present({
        message: "Add trip successfully!",
        duration: 500,
        position: "top",
      });
    }, 1000);
  };

  const fetchTripByID = async (id: number) => {
    const tripData = await getTripByID(id);
    setTrip(tripData);
  };
  const handleUpdateTrip = async () => {
    if (trip.name === "") {
      present({
        message: "Field name is required!",
        duration: 500,
        position: "top",
      });
      return;
    }
    if (trip.date_from === "") {
      present({
        message: "Field date from is required!",
        duration: 500,
        position: "top",
      });
      return;
    }
    if (trip.date_to === "") {
      present({
        message: "Field date to is required!",
        duration: 500,
        position: "top",
      });
      return;
    }
    if (trip.destination === "") {
      present({
        message: "Field destination is required!",
        duration: 500,
        position: "top",
      });
      return;
    }
    if (trip.trip_type === -1) {
      present({
        message: "Field type trip is required!",
        duration: 500,
        position: "top",
      });
      return;
    }
    setLoading(true);
    await updateTrip(trip);
    setTimeout(() => {
      setLoading(false);
      history.push("/trip/view");
      history.go(0);
      present({
        message: "Update trip successfully!",
        duration: 500,
        position: "top",
      });
    }, 1000);
  };

  const handleShowModalDeleteTrip = () => {
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
            setTimeout(() => {
              history.push("/trip/view");
              history.go(0);
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
  useEffect(() => {
    if (idTrip === undefined) {
      return;
    }
    fetchTripByID(Number(idTrip));
  }, [idTrip]);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="danger">
          <IonTitle>Expense Management</IonTitle>

          {idTrip && (
            <>
              <IonIcon
                slot="end"
                icon={trash}
                style={{
                  paddingRight: "10px",
                  cursor: "pointer",
                }}
                onClick={handleShowModalDeleteTrip}
              ></IonIcon>
              <IonIcon
                slot="start"
                icon={arrowBackOutline}
                style={{
                  paddingLeft: "10px",
                  cursor: "pointer",
                }}
                onClick={() => history.goBack()}
              ></IonIcon>
            </>
          )}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonLabel position="floating">Name</IonLabel>
          <IonInput
            name="name"
            value={trip.name}
            onIonChange={handleChangeInformationTrip}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Description</IonLabel>
          <IonInput
            value={trip.description}
            name="description"
            onIonChange={handleChangeInformationTrip}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Date From</IonLabel>
          <IonInput
            type="date"
            name="date_from"
            value={trip.date_from}
            onIonChange={handleChangeInformationTrip}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Date To</IonLabel>
          <IonInput
            type="date"
            name="date_to"
            min={trip.date_from}
            value={trip.date_to}
            onIonChange={handleChangeInformationTrip}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Destination</IonLabel>
          <IonInput
            name="destination"
            value={trip.destination}
            onIonChange={handleChangeInformationTrip}
          ></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="floating">Trip type</IonLabel>
          <IonSelect
            name="trip_type"
            value={trip.trip_type}
            onIonChange={handleChangeInformationTrip}
          >
            {tripTypes.map((type) => (
              <IonSelectOption value={type.id} key={type.id}>
                {type.name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel>Risk</IonLabel>
          <IonToggle
            color="danger"
            name="is_risk"
            slot="end"
            checked={trip.is_risk}
            onIonChange={handleChangeInformationTrip}
          ></IonToggle>
        </IonItem>
        {idTrip ? (
          <IonButton
            expand="block"
            className="ion-margin"
            color="danger"
            onClick={handleUpdateTrip}
          >
            {loading ? <span className="loading"></span> : "Update Trip"}
          </IonButton>
        ) : (
          <IonButton
            expand="block"
            className="ion-margin"
            color="danger"
            onClick={handleAddTrip}
          >
            {loading ? <span className="loading"></span> : "Add Trip"}
          </IonButton>
        )}
      </IonContent>
    </IonPage>
  );
};
export default ActionsTrip;
