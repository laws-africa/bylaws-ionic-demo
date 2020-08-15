export interface Place {
  name: string;
  id: string;
  works: string[];
}

export const PLACES: Place[] = [];

// load places
const loading = new Promise((resolve) => {
  fetch('/places.json').then(resp => {
    resp.json().then(places => {
      (places as Place[]).forEach(p => PLACES.push(p));
      PLACES.sort((a, b) => a.name.localeCompare(b.name));
      resolve();
    });
  });
});

export function getPlace(id: string): Place | null {
  const place = PLACES.find(p => p.id === id);
  return place ? place : null;
}

export function fetchPlace(id: string): Promise<Place | null> {
  return new Promise<Place | null>((resolve) => {
    loading.then(() => resolve(getPlace(id)));
  });
}

export function getPlaces(): Place[] {
  return PLACES;
}
