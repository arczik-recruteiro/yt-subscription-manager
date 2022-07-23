import { FC } from 'react';

interface IAppTableThProps {
  children?: JSX.Element | string;
}

const AppTableTh: FC<IAppTableThProps> = ({ children }) => (
  <th className="py-4 px-8">{children}</th>
);

export default AppTableTh;
