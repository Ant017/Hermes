import { Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import { useSelector } from "react-redux";
import ProfilePage from "./pages/ProfilePage";
import { Navigate } from "react-router-dom";
import "./App.scss";
import Auth from "./components/organisms/auth";

function App() {
  const { token } = useSelector((state) => state.user);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/chats" replace /> : <Auth />}
        />
        <Route
          path="/signup"
          element={token ? <Navigate to="/chats" replace /> : <Auth />}
        />
        <Route
          path="/profile"
          element={token ? <ProfilePage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/chats"
          element={token ? <ChatPage /> : <Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
