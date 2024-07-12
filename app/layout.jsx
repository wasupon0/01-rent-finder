import "@/assets/styles/globals.css";
import AuthProvider from "@/components/AuthProvider";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { GlobalProvider } from "@/context/GlobalContext";
import "photoswipe/dist/photoswipe.css";
import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
  title: "RentFinder",
  description: "Simplifying Apartment Searches",
  keywords: "rental, find rentals, find apartments, ",
};

const MainLayout = ({ children }) => {
  return (
    <GlobalProvider>
      <AuthProvider>
        <html lang="en">
          <body>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer
              position="bottom-right"
              autoClose={1200}
              hideProgressBar
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable={false}
              pauseOnHover
              theme="colored"
            />
          </body>
        </html>
      </AuthProvider>
    </GlobalProvider>
  );
};

export default MainLayout;
