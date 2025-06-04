
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Mail, Calendar, Users, MapPin, Star } from "lucide-react";
import { Booking } from "@/contexts/BookingContext";
import { format } from "date-fns";

interface BookingConfirmationProps {
  booking: Booking;
  onNewBooking: () => void;
}

export const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ 
  booking, 
  onNewBooking 
}) => {
  const checkInDate = new Date(booking.checkIn);
  const checkOutDate = new Date(booking.checkOut);
  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));

  const sendConfirmationEmail = () => {
    // Simulate sending email
    const emailContent = `
Dear Guest,

Thank you for booking with HotelBook AI! Here are your booking details:

BOOKING CONFIRMATION
Booking ID: ${booking.id}
Booking Date: ${format(new Date(booking.bookingDate), "PPP")}

HOTEL DETAILS
Hotel: ${booking.hotel.name}
Address: ${booking.hotel.address}
Rating: ${booking.hotel.rating}⭐

STAY DETAILS
Check-in: ${format(checkInDate, "PPP")}
Check-out: ${format(checkOutDate, "PPP")}
Nights: ${nights}
Guests: ${booking.guests}

AMENITIES INCLUDED
${booking.hotel.amenities.map(amenity => `• ${amenity}`).join('\n')}

COST BREAKDOWN
Room Rate: ${booking.hotel.currency} ${booking.hotel.price} per night
Total Nights: ${nights}
Total Cost: ${booking.hotel.currency} ${booking.totalCost}

${booking.preferences ? `SPECIAL REQUESTS\n${booking.preferences}\n` : ''}

We look forward to welcoming you!

Best regards,
HotelBook AI Team
    `;

    // In a real application, this would send an actual email
    console.log("Email sent to:", booking.userEmail);
    console.log("Email content:", emailContent);
    
    // Show email preview in a new window
    const emailWindow = window.open('', '_blank');
    if (emailWindow) {
      emailWindow.document.write(`
        <html>
          <head>
            <title>Booking Confirmation Email</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
              .email-container { max-width: 600px; margin: 0 auto; border: 1px solid #ddd; padding: 20px; }
              .header { background: #f8f9fa; padding: 15px; margin: -20px -20px 20px -20px; }
              .booking-id { background: #e3f2fd; padding: 10px; border-radius: 5px; font-weight: bold; }
              .section { margin: 20px 0; }
              .section h3 { color: #333; border-bottom: 1px solid #eee; padding-bottom: 5px; }
            </style>
          </head>
          <body>
            <div class="email-container">
              <div class="header">
                <h1>🏨 HotelBook AI - Booking Confirmation</h1>
              </div>
              <pre style="white-space: pre-wrap; font-family: Arial, sans-serif;">${emailContent}</pre>
            </div>
          </body>
        </html>
      `);
      emailWindow.document.close();
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <CardTitle className="text-2xl text-green-600">Booking Confirmed!</CardTitle>
        <p className="text-gray-600">Your reservation has been successfully created</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Booking ID */}
        <div className="bg-blue-50 p-4 rounded-lg text-center">
          <p className="text-sm text-gray-600 mb-1">Booking ID</p>
          <p className="text-2xl font-bold text-blue-600">{booking.id}</p>
        </div>

        {/* Hotel Information */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Hotel Details
            </h3>
            <div className="space-y-2">
              <div>
                <p className="font-semibold">{booking.hotel.name}</p>
                <p className="text-sm text-gray-600">{booking.hotel.address}</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{booking.hotel.rating}</span>
                <Badge variant="secondary" className="ml-2">{booking.hotel.category}</Badge>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Stay Details
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Check-in:</span>
                <span className="font-medium">{format(checkInDate, "PPP")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Check-out:</span>
                <span className="font-medium">{format(checkOutDate, "PPP")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Nights:</span>
                <span className="font-medium">{nights}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Guests:</span>
                <span className="font-medium flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {booking.guests}
                </span>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Amenities */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Included Amenities</h3>
          <div className="flex flex-wrap gap-2">
            {booking.hotel.amenities.map((amenity) => (
              <Badge key={amenity} variant="outline">
                {amenity}
              </Badge>
            ))}
          </div>
        </div>

        {/* Special Requests */}
        {booking.preferences && (
          <>
            <Separator />
            <div>
              <h3 className="font-semibold text-lg mb-3">Special Requests</h3>
              <p className="text-gray-600 bg-gray-50 p-3 rounded">{booking.preferences}</p>
            </div>
          </>
        )}

        <Separator />

        {/* Cost Breakdown */}
        <div>
          <h3 className="font-semibold text-lg mb-3">Cost Breakdown</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Room rate per night:</span>
              <span>{booking.hotel.currency} {booking.hotel.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Number of nights:</span>
              <span>{nights}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold text-lg">
              <span>Total Cost:</span>
              <span className="text-green-600">{booking.hotel.currency} {booking.totalCost}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Email Confirmation */}
        <div className="bg-yellow-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-5 w-5 text-yellow-600" />
            <span className="font-medium">Email Confirmation</span>
          </div>
          <p className="text-sm text-gray-600 mb-3">
            A confirmation email will be sent to: <strong>{booking.userEmail}</strong>
          </p>
          <Button onClick={sendConfirmationEmail} variant="outline" size="sm">
            Preview Email Confirmation
          </Button>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button onClick={onNewBooking} className="flex-1">
            Make Another Booking
          </Button>
          <Button variant="outline" className="flex-1" onClick={() => window.print()}>
            Print Confirmation
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
