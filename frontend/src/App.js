import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CheckoutModal from './components/CheckoutModal';
import SuccessPage from './components/SuccessPage';

const App = () => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [purchaseData, setPurchaseData] = useState(null);

  const handlePurchaseClick = () => {
    setShowCheckout(true);
  };

  const handlePurchaseSuccess = (email, hasUpsell) => {
    setPurchaseData({ email, hasUpsell });
    setShowCheckout(false);
    // Redirect to success page
    window.history.pushState({}, '', '/success?email=' + encodeURIComponent(email));
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/" 
            element={
              <>
                <LandingPage onPurchaseClick={handlePurchaseClick} />
                <CheckoutModal 
                  isOpen={showCheckout}
                  onClose={() => setShowCheckout(false)}
                  onSuccess={handlePurchaseSuccess}
                />
              </>
            } 
          />
          <Route 
            path="/success" 
            element={<SuccessPageWrapper />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

const SuccessPageWrapper = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || 'user@example.com';
  const hasUpsell = searchParams.get('upsell') === 'true';

  return <SuccessPage email={email} hasUpsell={hasUpsell} />;
};

export default App;