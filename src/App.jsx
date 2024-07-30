import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Business from "./components/Business";
import Billing from "./components/Billing";
import CardDeal from "./components/CardDeal";
import Testimonials from "./components/Testimonials";
import Clients from "./components/Clients";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import Button from "./components/Button";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Signup from "./components/Signup";
import MultiStepForm from "./components/MultiStepForm";
import styles from "./style";
import ChatComponent from "./components/ChatComponent";
import AudioStreamer from "./components/AudioStreamer";
import Dboard from "./components/Dboard";
import ErrorBoundary from "./ErrorBoundary";

const App = () => {
  //  const x = useParams();
  //  console.log(x);

  return (
    <Router>
      <div className="bg-primary w-full overflow-hidden">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className={`${styles.paddingX} ${styles.flexCenter}`}>
                  <div className={`${styles.boxWidth}`}>
                    <Navbar />
                  </div>
                </div>

                <div className={`bg-primary ${styles.flexStart}`}>
                  <div className={`${styles.boxWidth}`}>
                    <Hero />
                  </div>
                </div>
                <div
                  className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}
                >
                  <div className={`${styles.boxWidth}`}>
                    <Stats />
                    <Business />
                    <Billing />
                    <CardDeal />
                    <Testimonials />
                    <Clients />
                    <CTA />
                  </div>
                </div>
              </>
            }
          />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/onboarding/*" element={<MultiStepForm />} />
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/chatSection" element={<ChatComponent />} />
          <Route path="/audioStreamer" element={<AudioStreamer />} />
          <Route path="/dashboard" element={
            
            <Dboard />}/>
        </Routes>

        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
