import { FC } from 'react';

interface IAppTableTHeadProps {
  children?: JSX.Element | JSX.Element[];
}

const AppTableTHead: FC<IAppTableTHeadProps> = ({ children }) => (
  <thead className="border-b text-gray-400 text-left ">{children}</thead>
);

export default AppTableTHead;
