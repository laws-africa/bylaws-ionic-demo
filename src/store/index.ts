export interface Place {
  name: string;
  id: string;
  works: string[];
}

export interface Work {
  title: string;
  frbr_uri: string;
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
  'frbr_uri': 'w',
  'content': 'some <b>html</b>'
}, {
  'title': 'Refuse',
  'frbr_uri': 'b',
  'content': 'some <b>more html</b>'
}];

export function getPlace(id: string): Place | null {
  const place = PLACES.find(p => p.id === id);
  if (!place) return null;
  return place;
}

export function getWorks(place: Place): Work[] {
  return WORKS.filter(w => place.works.includes(w.frbr_uri));
}