import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './features/auth/AuthContext';
import { AppContent } from './AppContent';
import { AdminLayout } from './features/admin/components/AdminLayout';
import { QuestionPlayground } from './features/questions/components/QuestionPlayground';

export const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<AppContent />} />
          <Route path="/admin/*" element={<AdminLayout />}>
            <Route path="questions/playground" element={<QuestionPlayground />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;