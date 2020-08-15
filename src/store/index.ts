export interface Place {
  name: string;
  id: string;
  works: string[];
}

export interface Work {
  title: string;
  frbrUri: string;
  content: string;
}

export const PLACES: Place[] = [{
  'name': 'Cape Town',
  'id': 'za-cpt',
  'works': ['w', 'b']
}, {
  'name': 'Johannesburg',
  'id': 'za-jhb',
  'works': ['c', 'd']
}];
PLACES.sort((a, b) => a.name.localeCompare(b.name));

export const WORKS: Work[] = [{
  'title': 'Water',
  'frbrUri': 'w',
  'content': 'some <b>html</b>'
}, {
  'title': 'Refuse',
  'frbrUri': 'b',
  'content': 'some <b>more html</b>'
}];

export function getPlace(id: string): Place | null {
  const place = PLACES.find(p => p.id === id);
  return place ? place : null;
}

export function getPlaceWorks(place: Place): Work[] {
  return WORKS.filter(w => place.works.includes(w.frbrUri));
}

export function getWork(frbrUri: string): Work | null {
  const work = WORKS.find(w => w.frbrUri === frbrUri);
  return work ? work : null;
}
