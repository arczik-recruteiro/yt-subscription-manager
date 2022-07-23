import React, { FC } from 'react';

interface IAppTableProps {
  children?: JSX.Element | JSX.Element[];
}

const AppTable: FC<IAppTableProps> = ({ children }) => (
  <table className="border-collapse table-auto w-full text-sm">
    {children}
  </table>
);

export default AppTable;
