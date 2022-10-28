import { openDB } from "idb";
import { Trips } from "../models/Trips";

const DATABASE_NAME = "TripDB";
const TABLE_NAME = "Trips";

const db = openDB(DATABASE_NAME, 1, {
    upgrade(database) {
        database.createObjectStore(TABLE_NAME, {
            keyPath: "id",
            autoIncrement: true,
        });
    },
});

export const insertTrip = async (trip: Trips) => {
    (await db).add(TABLE_NAME, trip);
};

export const getAllTrip = async () => {
    return (await db).getAll(TABLE_NAME);
};

export const getTripByID = async (id: number) => {
    return (await db).get(TABLE_NAME, id);
};

export const updateTrip = async (trip: Trips) => {
    (await db).put(TABLE_NAME, trip);
};

export const deleteTrip = async (id: number) => {
    (await db).delete(TABLE_NAME, id);
};
