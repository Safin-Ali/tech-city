import React from 'react';
import HeroSection from './Shared/Hero-Section';
import Navbar from '../../Components/App-Bar/Navbar';
import PrimaryButton from '../../Components/Button/Primary-Button';

function Home() {


  return (
    <>
        <Navbar/>
        <main>
          <HeroSection />
        </main>
    </>
  );
};

Home.defaultProps = {}
export default Home;