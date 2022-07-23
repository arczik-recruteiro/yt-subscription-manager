import React, { FC, ReactElement } from 'react';

interface IAppTableTrProps {
  children?: JSX.Element | JSX.Element[] | ReactElement | ReactElement[];
  className?: string;
}

const AppTableTr: FC<IAppTableTrProps> = ({ children, className }) => (
  <tr className={className}>{children}</tr>
);

AppTableTr.defaultProps = {
  className: ''
};

export default AppTableTr;
