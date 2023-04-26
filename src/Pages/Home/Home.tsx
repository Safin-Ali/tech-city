import React from 'react';
import HeroSection from './Shared/Hero-Section';
import Navbar from '../../Components/App-Bar/Navbar';
import PrimaryButton from '../../Components/Button/Primary-Button';
import ServiceSection from './Shared/Service-Section';
import CategorySection from './Shared/Category-Section';
import Footer from './Shared/Footer';

function Home() {


  return (
    <>
        <Navbar/>
        <main>
          <HeroSection />
          <ServiceSection/>
          <CategorySection/>
          <Footer/>
        </main>
    </>
  );
};

Home.defaultProps = {}
export default Home;