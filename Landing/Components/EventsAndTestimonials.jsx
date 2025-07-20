import React from 'react';
import TopEvents from './TopEvents';
import Testimonials from './Testimonials';
import UpcomingEventsCarousel from './UpcomingEventsCarousel';

const EventsAndTestimonials = () => {
  return (
    <div>
      <TopEvents />
      <Testimonials />
      <UpcomingEventsCarousel />
    </div>
  );
};

export default EventsAndTestimonials;