import React, { FC } from 'react';

interface ILoginButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

const LoginButton: FC<ILoginButtonProps> = ({ onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled} className="app-btn">
    Login Into Google
  </button>
);

export default LoginButton;
