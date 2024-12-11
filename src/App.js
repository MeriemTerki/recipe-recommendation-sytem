import React from "react";
import './App.css';
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HowItWorks from "./components/HowItWorks";
import Form from "./components/Form";
import Recipes from "./components/Recipes";
import Footer from "./components/Footer";


import AOS from "aos";
import "aos/dist/aos.css";


function App() {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 700,
      easing: "ease-in",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <div className="text-myBrown duration-200 overflow-x-hidden">
      <Navbar />
      <Hero />
      <HowItWorks/>
      <Form/> 
      <Recipes/>
      <Footer/>
     


      
    </div>
  );
}

export default App;
