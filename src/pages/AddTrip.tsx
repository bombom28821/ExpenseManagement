import {
    IonButton,
    IonContent,
    IonDatetime,
    IonDatetimeButton,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonModal,
    IonPage,
    IonSelect,
    IonSelectOption,
    IonTitle,
    IonToggle,
    IonToolbar,
    useIonToast,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import {
    deleteTrip,
    getTripByID,
    insertTrip,
    updateTrip,
} from "../database/databaseHandler";
import { Trips } from "../models/Trips";
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
const AddTrip: React.FC = () => {
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
    const [loadingDelete, setLoadingDelete] = useState(false);
    const { id: idTrip } = useParams<IdParams>();
    const [present] = useIonToast();
    const history = useHistory();

    const handleChangeInformationTrip = (e: any) => {
        const value = e.target.value;
        const name = e.target.name;
        setTrip((trip) => {
            return {
                ...trip,
                [name]:
                    e.target.checked === undefined ? value : e.target.checked,
            };
        });
    };

    const handleAddTrip = async () => {
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
        setLoading(true);
        await updateTrip(trip);
        setTimeout(() => {
            setLoading(false);
            present({
                message: "Update trip successfully!",
                duration: 500,
                position: "top",
            });
        }, 1000);
    };
    const handleDeleteTrip = async () => {
        setLoadingDelete(true);
        await deleteTrip(Number(idTrip));
        setTimeout(() => {
            setLoadingDelete(false);
            history.push("/trip/view");
            present({
                message: "Delete trip successfully!",
                duration: 500,
                position: "top",
            });
        }, 1000);
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
                    <IonLabel>Date From</IonLabel>
                    <IonDatetimeButton
                        datetime="datetime_from"
                        slot="end"
                    ></IonDatetimeButton>

                    <IonModal keepContentsMounted={true}>
                        <IonDatetime
                            id="datetime_from"
                            name="date_from"
                            value={trip.date_from}
                            onIonChange={handleChangeInformationTrip}
                        ></IonDatetime>
                    </IonModal>
                </IonItem>
                <IonItem>
                    <IonLabel>Date To</IonLabel>
                    <IonDatetimeButton
                        datetime="datetime_to"
                        slot="end"
                    ></IonDatetimeButton>

                    <IonModal keepContentsMounted={true}>
                        <IonDatetime
                            id="datetime_to"
                            name="date_to"
                            value={trip.date_to}
                            onIonChange={handleChangeInformationTrip}
                        ></IonDatetime>
                    </IonModal>
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
                        {loading ? (
                            <span className="loading"></span>
                        ) : (
                            "Update Trip"
                        )}
                    </IonButton>
                ) : (
                    <IonButton
                        expand="block"
                        className="ion-margin"
                        color="danger"
                        onClick={handleAddTrip}
                    >
                        {loading ? (
                            <span className="loading"></span>
                        ) : (
                            "Add Trip"
                        )}
                    </IonButton>
                )}

                {idTrip && (
                    <IonButton
                        expand="block"
                        className="ion-margin"
                        color="danger"
                        onClick={handleDeleteTrip}
                    >
                        {loadingDelete ? (
                            <span className="loading"></span>
                        ) : (
                            "Delete Trip"
                        )}
                    </IonButton>
                )}
            </IonContent>
        </IonPage>
    );
};
export default AddTrip;
