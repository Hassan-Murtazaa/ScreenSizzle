import React from 'react'
import CarouselFadeExample from './CarouselFadeExample';
import NowShowingDiv from './NowShowingDiv';
import Titled from './Titled';
import Titled2 from './Titled2';
import Navbar from '../Nav/Navbar';
import Footer from '../Foot/Footer';
import { useEffect } from 'react';

export default function Homepage() {

  useEffect(() => {
    window.scrollTo(0, 0); // scroll to top of page
  }, []);

  return (
    <div>
      <Navbar />
      <CarouselFadeExample />
      <NowShowingDiv title="Now Showing" />
      <Titled />
      <NowShowingDiv title="Coming Soon" />
      <Titled2 />
      <Footer />
    </div>
  )
}