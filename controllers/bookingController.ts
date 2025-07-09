import { Request, Response } from 'express';

import { Bookings } from '../models/Booking';
import mongoose from 'mongoose';
import  Users  from '../models/users';
import Traveller from '../models/traveller';
import { Properties } from '../models/Properties';



export const getBookingsByUser = async (req: Request, res: Response) => {
  try {
    console.log(mongoose.models);
    const { travellerId } = req.params;
    
    if (!travellerId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    const bookings = await Bookings.find({ travellerId })
      .populate({
        path: "propertyId",
        select: "propertyName placeName city country propertyCoverFileUrl basePrice ",
      })
      .populate({
        path: "userId",
        select: "name email phone",
      })
      

    if (!bookings.length) {
      res.status(404).json({ message: "No bookings found for this user" });
      return;
    }
    
    res.status(200).json({
      totalBookings: bookings.length,
      bookings,
    });

  } catch (error: any) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

    function calculateNights(start: string, end: string): number {
      const startDate = new Date(start);
      const endDate = new Date(end);
      const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    
    // Utility: Check if dates overlap with existing bookings
    async function isOverlapping(propertyId: string, startDate: string, endDate: string): Promise<boolean> {
      const overlap = await Bookings.findOne({
        propertyId,
        bookingStatus: { $ne: 'cancelled' },
        $or: [
          {
            startDate: { $lte: new Date(endDate) },
            endDate: { $gte: new Date(startDate) },
          },
        ],
      });
    
      return !!overlap;
    }
    
    // Controller: Create Booking
    export const createBooking = async (req: Request, res: Response): Promise<void> => {
        try {
          const {
            propertyId,
            userId,
            travellerId,
            startDate,
            endDate,
            guests,
            travellers,
            price,
            notes,
          } = req.body;
      
          if (
            !propertyId || !userId || !travellerId ||
            !startDate || !endDate || !guests || !travellers || !price
          ) {
            res.status(400).json({ message: 'Missing required fields' });
          } else {
            const hasOverlap = await isOverlapping(propertyId, startDate, endDate);
      
            if (hasOverlap) {
              res.status(409).json({ message: 'Dates are already booked' });
            } else {
              const totalNights = calculateNights(startDate, endDate);
      
              const newBooking = await Bookings.create({
                propertyId,
                userId,
                travellerId,
                startDate,
                endDate,
                guests,
                travellers,
                totalNights,
                price,
                notes,
              });
      
              res.status(201).json(newBooking);
            }
          }
        } catch (error) {
          console.error('Booking error:', error);
          res.status(500).json({ message: 'Internal server error' });
        }
    };

    export const cancelBooking = async (req:Request, res:Response) => {
  try {
    const { id } = req.params
    const booking = await Bookings.findById(id)
    if (!booking) {
    
      res.status(404).json({ message: "Booking not found" })
    }

    if (booking.bookingStatus === "cancelled") {
      res.status(400).json({ message: "Booking is already cancelled." })
    }

    const today = new Date()
    const startDate = new Date(booking.startDate)
    const daysUntilBooking = Math.ceil((startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))


    let refundPercentage = 0
    if (booking.paymentStatus === "paid") {
      if (daysUntilBooking > 7) {
        refundPercentage = 100
      } else if (daysUntilBooking > 0) {
        refundPercentage = 70
      } else {
        refundPercentage = 50
      }
    }

    const refundAmount = Math.round((booking.price * refundPercentage) / 100)

    booking.bookingStatus = "cancelled"

    if (booking.paymentStatus === "paid") {
      booking.paymentStatus = "refunded"
    }

    await booking.save()

    res.status(200).json({
      message: "Booking cancelled successfully.",
      refundAmount,
      refundPercentage,
    })
  } catch (error) {
    console.error("Error cancelling booking:", error)
    res.status(500).json({ message: "Failed to cancel booking." })
  }
}