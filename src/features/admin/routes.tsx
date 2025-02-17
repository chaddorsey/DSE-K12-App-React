import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { QuestionPlayground } from '../questions/components/QuestionPlayground';

export const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="questions/playground" element={<QuestionPlayground />} />
    </Routes>
  );
}; 