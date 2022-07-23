import { FC } from 'react';

interface IAppTableTdProps {
  children?: JSX.Element | string;
  className?: string;
}

const AppTableTd: FC<IAppTableTdProps> = ({ children, className }) => (
  <td className={className}>{children}</td>
);

AppTableTd.defaultProps = {
  className: ''
};

export default AppTableTd;
