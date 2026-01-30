import React from 'react';
import BookingForm from '../components/BookingForm';

const BookingPage = () => {
  return (
    <div className="container mt-3">
      <h1>Book Your Appointment</h1>
      <BookingForm />
    </div>
  );
};

export default BookingPage;