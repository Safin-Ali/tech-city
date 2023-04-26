import React from 'react';
import HeroSection from './Shared/Hero-Section';
import Navbar from '../../Components/App-Bar/Navbar';
import PrimaryButton from '../../Components/Button/Primary-Button';
import ServiceSection from './Shared/Service-Section';

function Home() {


  return (
    <>
        <Navbar/>
        <main>
          <HeroSection />
          <ServiceSection/>
        </main>
    </>
  );
};

Home.defaultProps = {}
export default Home;