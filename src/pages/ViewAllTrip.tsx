import { getAllTrip } from "../database/databaseHandler";
import {
    IonCheckbox,
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonPage,
    IonRouterLink,
    IonSearchbar,
    IonTitle,
    IonToolbar,
} from "@ionic/react";
import { Trips } from "../models/Trips";
import { useEffect, useRef, useState } from "react";

const ViewAllTrip: React.FC = () => {
    const [trips, setTrips] = useState<Trips[]>([]);
    const tripsRef = useRef<Trips[]>([]);
    const fetchTripAll = async () => {
        const allTrip = await getAllTrip();
        setTrips(allTrip);
        tripsRef.current = allTrip;
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
                                {/* <IonCheckbox slot="start"></IonCheckbox> */}
                                <IonLabel>
                                    <IonRouterLink
                                        routerLink={`/trip/view/${trip.id}`}
                                        color="dark"
                                    >
                                        {trip.name} - {trip.description}
                                    </IonRouterLink>
                                </IonLabel>
                            </IonItem>
                        ))}
                </IonList>
            </IonContent>
        </IonPage>
    );
};
export default ViewAllTrip;
