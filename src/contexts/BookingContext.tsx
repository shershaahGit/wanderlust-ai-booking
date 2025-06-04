
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  rating: number;
  price: number;
  currency: string;
  image: string;
  amenities: string[];
  description: string;
  address: string;
  category: string;
}

interface Booking {
  id: string;
  hotel: Hotel;
  checkIn: string;
  checkOut: string;
  guests: number;
  preferences: string;
  totalCost: number;
  bookingDate: string;
  userEmail: string;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'bookingDate'>) => Booking;
  getBookingById: (id: string) => Booking | undefined;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};

export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  const addBooking = (bookingData: Omit<Booking, 'id' | 'bookingDate'>): Booking => {
    const newBooking: Booking = {
      ...bookingData,
      id: `BK${Date.now()}${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      bookingDate: new Date().toISOString(),
    };

    setBookings(prev => [...prev, newBooking]);
    return newBooking;
  };

  const getBookingById = (id: string): Booking | undefined => {
    return bookings.find(booking => booking.id === id);
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, getBookingById }}>
      {children}
    </BookingContext.Provider>
  );
};

export type { Hotel, Booking };
