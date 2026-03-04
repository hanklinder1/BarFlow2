import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MapPage from './pages/MapPage';
import { FriendsPage } from './pages/FriendsPage';
import { ProfilePage } from './pages/ProfilePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MapPage />} />
          <Route path="friends" element={<FriendsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
