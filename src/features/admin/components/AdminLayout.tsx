import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdminMenu } from './AdminMenu';
import { QuestionPlayground } from '../../questions/components/QuestionPlayground';
import { QuestionProvider } from '../../questions/context/QuestionContext';
import './AdminLayout.css';

export const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <AdminMenu />
      <main className="admin-content">
        <Routes>
          <Route 
            path="questions/playground" 
            element={
              <QuestionProvider>
                <QuestionPlayground />
              </QuestionProvider>
            } 
          />
        </Routes>
      </main>
    </div>
  );
}; 