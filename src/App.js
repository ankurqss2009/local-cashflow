import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./global";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import {
  CreateRoomScreen,
  GameScreen,
  LobbyRoomScreen,
  LoginScreen,
  RoomListScreen,
} from "./screens";
import { GameProvider } from "./contexts";
import { FirebaseService, theme } from "./utility";
import { RegisterScreen } from "./screens/Register";
import { AuthProvider, ProtectRoute } from "./contexts/auth";

FirebaseService.init();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Router>
          <GameProvider>
            <GlobalStyles />

            <Routes>
              <Route
                path="game/:id"
                element={
                  <ProtectRoute>
                    <GameScreen />
                  </ProtectRoute>
                }
              />
              <Route index element={<Navigate to="/login" replace />} />
              <Route path="login" element={<LoginScreen />} />
              <Route path="register" element={<RegisterScreen />} />
              <Route
                path="rooms"
                element={
                  <ProtectRoute>
                    <Outlet />
                  </ProtectRoute>
                }
              >
                <Route index element={<RoomListScreen />} />
                <Route path="create" element={<CreateRoomScreen />} />
                <Route path="lobby/:id" element={<LobbyRoomScreen />} />
              </Route>
            </Routes>
          </GameProvider>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
