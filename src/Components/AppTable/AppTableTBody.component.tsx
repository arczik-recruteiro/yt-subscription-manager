import React, { FC } from 'react';

interface IAppTableTBodyProps {
  children?: JSX.Element | JSX.Element[];
}

const AppTableTBody: FC<IAppTableTBodyProps> = ({ children }) => (
  <tbody>{children}</tbody>
);

export default AppTableTBody;
