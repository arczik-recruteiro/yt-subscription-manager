import React, { FC } from 'react';

interface ILogoutButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const LogoutButton: FC<ILogoutButtonProps> = ({ onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled} className="app-btn">
    Logout
  </button>
);

export default LogoutButton;
