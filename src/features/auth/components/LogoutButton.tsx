import React, { useState } from 'react';
import './LogoutButton.css';

interface ILogoutButton {
  onLogoutStart: () => Promise<void>;
  onLogoutComplete?: () => void;
  onLogoutError?: (error: Error) => void;
  confirmationRequired?: boolean;
  confirmationMessage?: string;
}

export const LogoutButton: React.FC<ILogoutButton> = ({
  onLogoutStart,
  onLogoutComplete,
  onLogoutError,
  confirmationRequired = true,
  confirmationMessage = 'Are you sure you want to logout?'
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogoutClick = () => {
    if (confirmationRequired) {
      setShowConfirmation(true);
    } else {
      handleConfirm();
    }
  };

  const handleConfirm = async () => {
    try {
      setIsLoggingOut(true);
      await onLogoutStart();
      onLogoutComplete?.();
    } catch (error) {
      onLogoutError?.(error as Error);
    } finally {
      setIsLoggingOut(false);
      setShowConfirmation(false);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="logout-container">
      <button 
        className="logout-button"
        onClick={handleLogoutClick}
        disabled={isLoggingOut}
        aria-label="logout"
      >
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </button>

      {showConfirmation && (
        <div className="logout-confirmation">
          <p>{confirmationMessage}</p>
          <div className="logout-confirmation-buttons">
            <button 
              onClick={handleConfirm}
              disabled={isLoggingOut}
            >
              Confirm
            </button>
            <button 
              onClick={handleCancel}
              disabled={isLoggingOut}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}; 