// import React, { FC, useContext, ComponentType } from 'react';
// import {
//   Route,
//   Redirect,
//   RouteProps,
//   RouteComponentProps
// } from 'react-router-dom';

// import { GoogleAuthContextTypeData } from 'Interfaces';
// import GoogleAuthContext from 'Contexts/googleAuth';

// interface AppRouteProps extends RouteProps {
//   component: ComponentType<RouteComponentProps<any>> | ComponentType<any>;
//   needsAuth?: Boolean;
// }

// const AppRoute: FC<AppRouteProps> = ({
//   component: Component,
//   needsAuth = false,
//   ...rest
// }) => {
//   const googleAuthContext =
//     useContext<GoogleAuthContextTypeData>(GoogleAuthContext);
//   const isLogged =
//     typeof googleAuthContext.value !== 'undefined' &&
//     googleAuthContext.value !== null;

//   return (
//     <Route
//       {...rest}
//       element={(props) =>
//         (needsAuth && isLogged) || !needsAuth ? (
//           <Component {...props} />
//         ) : (
//           <Route render={() => <Redirect to="/" />} />
//         )
//       }
//     />
//   );
// };

// export default AppRoute;

export default function () {
  return `not in use anymoar`;
}
