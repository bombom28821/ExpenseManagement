export interface Trips {
  id?: number;
  description: string;
  name: string;
  date_from: string;
  date_to: string;
  destination: string;
  is_risk: boolean;
  trip_type: number;
}
