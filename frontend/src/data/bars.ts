export interface Bar {
  id: string;
  name: string;
  coordinates: [number, number]; // [lat, lng]
}

export const BARS: Bar[] = [
  { id: 'tds', name: "TD's", coordinates: [34.682314, -82.837301] },
  { id: 'backstreets', name: 'Backstreets', coordinates: [34.6836255716976, -82.83666011989295] },
  { id: 'study-hall', name: 'Study Hall', coordinates: [34.683367925520535, -82.83780545981314] },
  { id: 'loose-change', name: 'Loose Change', coordinates: [34.68261587100437, -82.8374952770089] },
  { id: '356-bar', name: '356 Bar', coordinates: [34.68301778370416, -82.83740070964124] },
  { id: 'nicks-tavern', name: "Nick's Tavern", coordinates: [34.68363585964464, -82.83791220836441] },
  { id: 'triple-ts', name: "Triple T's", coordinates: [34.68334154440909, -82.83732431237765] },
  { id: 'roar', name: 'Roar', coordinates: [34.68377598519009, -82.83715758322684] },
  { id: 'charleston-sports-pub', name: 'Charleston Sports Pub', coordinates: [34.682784409471665, -82.83757047577707] },
];

export const MAP_CENTER: [number, number] = [34.6833, -82.8375];
