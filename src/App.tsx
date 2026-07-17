/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */
import LandingPage from './modules/landing/pages/LandingPage';
import { NavigationProvider } from './modules/landing/context/NavigationContext';
import { AuthProvider } from './modules/landing/context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <NavigationProvider>
        <LandingPage />
      </NavigationProvider>
    </AuthProvider>
  );
}


