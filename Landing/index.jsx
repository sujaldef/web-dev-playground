import React from 'react';
import Herosection from './Components/Herosection';
import Guestandnewsletter from './Components/Guestandnewsletter';
import KpiAndEvents from './Components/KpiAndEvents';
import EventsAndTestimonials from './Components/EventsAndTestimonials';
import FaqKpiContact from './Components/FaqKpiContact';

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      <Herosection />
      <KpiAndEvents />
      <Guestandnewsletter />
      <EventsAndTestimonials />
      <FaqKpiContact />
    </div>
  );
};

export default Index;