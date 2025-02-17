import React from 'react';
import { Outlet } from 'react-router-dom';

export const QuestionsLayout = () => {
  return (
    <div className="questions-layout">
      <Outlet />
    </div>
  );
}; 