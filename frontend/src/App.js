import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './context/AuthContext';
import { theme } from './styles/theme';
import { GlobalStyle } from './styles/GlobalStyle';
import { AppContainer } from './styles/AppStyles';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import TodoList from './pages/TodoList';
import TodoHistory from './pages/TodoHistory';
import MyPage from './pages/MyPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <AuthProvider>
        <Router>
          <AppContainer>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/todos" element={<TodoList />} />
              <Route
                path="/todos/:id/history"
                element={
                  <PrivateRoute>
                    <TodoHistory />
                  </PrivateRoute>
                }
              />
              <Route
                path="/mypage"
                element={
                  <PrivateRoute>
                    <MyPage />
                  </PrivateRoute>
                }
              />
              <Route path="/" element={<Navigate to="/todos" replace />} />
            </Routes>
          </AppContainer>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

