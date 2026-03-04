import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Map, { Source, Layer } from 'react-map-gl';
import type { CircleLayer } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { BARS, MAP_CENTER } from '../data/bars';

const token = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined;

// Mock: current bar (null = not at a bar)
const MOCK_CURRENT_BAR = 'Study Hall'; // or null
const MOCK_FRIENDS_OUT = [
  { id: '1', username: 'john', currentBar: 'Roar' },
  { id: '2', username: 'emma', currentBar: null },
];

export default function MapPage() {
  const [locationEnabled] = useState(true);

  const barGeoJSON = useMemo(
    () => ({
      type: 'FeatureCollection' as const,
      features: BARS.map((bar) => ({
        type: 'Feature' as const,
        properties: { id: bar.id, name: bar.name },
        geometry: {
          type: 'Point' as const,
          coordinates: [bar.coordinates[1], bar.coordinates[0]], // [lng, lat]
        },
      })),
    }),
    []
  );

  const barLayerStyle: CircleLayer = {
    id: 'bars',
    type: 'circle',
    source: 'bars',
    paint: {
      'circle-radius': 10,
      'circle-color': '#f97316',
      'circle-stroke-width': 2,
      'circle-stroke-color': '#ea580c',
    },
  };

  // Friend markers at bars
  const friendGeoJSON = useMemo(() => {
    const features = MOCK_FRIENDS_OUT
      .filter((f) => f.currentBar)
      .map((f) => {
        const bar = BARS.find((b) => b.name === f.currentBar);
        if (!bar) return null;
        return {
          type: 'Feature' as const,
          properties: { username: f.username, bar: f.currentBar },
          geometry: {
            type: 'Point' as const,
            coordinates: [bar.coordinates[1], bar.coordinates[0]] as [number, number],
          },
        };
      })
      .filter((f): f is NonNullable<typeof f> => f !== null);
    return {
      type: 'FeatureCollection' as const,
      features,
    };
  }, []);

  if (!token || token === '') {
    return (
      <div className="map-placeholder">
        <p><strong>Map token missing</strong></p>
        <p>Local: Add VITE_MAPBOX_TOKEN to frontend/.env</p>
        <p>Vercel: Add VITE_MAPBOX_TOKEN in Project Settings → Environment Variables, then redeploy.</p>
      </div>
    );
  }

  return (
    <div className="map-page">
      {/* Location status panel */}
      <div className="location-panel">
        <div className="location-status">
          <div className="location-dot" data-active={locationEnabled} />
          <div>
            <div className="location-bar">
              {MOCK_CURRENT_BAR ? `At ${MOCK_CURRENT_BAR}` : 'Not currently at a bar'}
            </div>
            <div className="location-sub">
              Location {locationEnabled ? 'enabled' : 'disabled'}
              {locationEnabled && !MOCK_CURRENT_BAR && ' — Detecting...'}
            </div>
          </div>
        </div>
        <Link to="/profile" className="settings-btn">Settings</Link>
      </div>

      {/* Map heading */}
      <div className="map-heading">
        <h2>Live Clemson Map</h2>
        <p>See where your friends are.</p>
      </div>

      <div className="map-container" style={{ minHeight: 280 }}>
      <Map
        mapboxAccessToken={token}
        initialViewState={{
          longitude: MAP_CENTER[1],
          latitude: MAP_CENTER[0],
          zoom: 17,
        }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        style={{ width: '100%', height: '100%', minHeight: 280 }}
      >
        <Source id="bars" type="geojson" data={barGeoJSON}>
          <Layer {...barLayerStyle} />
        </Source>
        {friendGeoJSON.features.length > 0 && (
          <Source id="friends" type="geojson" data={friendGeoJSON}>
            <Layer
              id="friends"
              type="circle"
              paint={{
                'circle-radius': 8,
                'circle-color': '#3b82f6',
                'circle-stroke-width': 1,
                'circle-stroke-color': '#fff',
              }}
            />
          </Source>
        )}
      </Map>
      </div>

      {/* Friends Out list */}
      <div className="friends-out">
        <div className="friends-out-header">
          <h3>Friends Out ({MOCK_FRIENDS_OUT.filter((f) => f.currentBar).length})</h3>
          <Link to="/friends" className="manage-link">Manage friends</Link>
        </div>
        <div className="friends-out-list">
          {MOCK_FRIENDS_OUT.map((f) => (
            <div key={f.id} className="friend-out-row">
              <div>
                <span className="friend-username">{f.username}</span>
                <span className="friend-at">@{f.username}</span>
              </div>
              <div className="friend-bar">{f.currentBar ? `At ${f.currentBar}` : '—'}</div>
              {f.currentBar && (
                <button className="msg-btn" aria-label={`Message ${f.username}`}>Message</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
