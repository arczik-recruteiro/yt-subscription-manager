import { lazy, Suspense, FC } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import GoogleAuthContext from 'Contexts/googleAuth';
import { GoogleAuthContextType, GoogleAuthContextUpdate } from 'Interfaces';
import Navigation from 'Components/ui/Navigation';
import NeedsAuth from 'Components/NeedsAuth';

const LandingPage = lazy(() => import('Features/LandingPage'));
const Page404 = lazy(() => import('Features/Page404'));
const SubscribedChannels = lazy(() => import('Features/SubscribedChannels'));

interface IAppProps {
  contextValue: {
    value: GoogleAuthContextType;
    update: GoogleAuthContextUpdate;
    clear: () => void;
  };
}

const App: FC<IAppProps> = ({ contextValue }) => {
  return (
    <>
      <ToastContainer />
      <div className="w-screen h-screen bg-gradient-to-r from-teal-300 to-cyan-500">
        <div className="container px-0 py-0 bg-white mx-auto h-full">
          <Router>
            <GoogleAuthContext.Provider value={contextValue}>
              <Navigation />
              <Suspense fallback={<span>Loading...</span>}>
                <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route
                    path="/subscribed-channels"
                    element={
                      <NeedsAuth>
                        <SubscribedChannels />
                      </NeedsAuth>
                    }
                  />
                  <Route path="*" element={<Page404 />} />
                </Routes>
              </Suspense>
            </GoogleAuthContext.Provider>
          </Router>
        </div>
      </div>
    </>
  );
};

export default App;
