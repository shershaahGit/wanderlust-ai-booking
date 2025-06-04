
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import ManualBooking from "@/components/booking/ManualBooking";
import AIAgentBooking from "@/components/booking/AIAgentBooking";
import { BookingProvider } from "@/contexts/BookingContext";
import { BookingConfirmation } from "@/components/booking/BookingConfirmation";

const Index = () => {
  const [currentBooking, setCurrentBooking] = useState(null);

  return (
    <BookingProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">HotelBook AI</h1>
                <p className="text-gray-600 mt-1">Your intelligent hotel booking companion</p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>🏨</span>
                <span>Premium Hotel Booking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            {currentBooking ? (
              <BookingConfirmation 
                booking={currentBooking} 
                onNewBooking={() => setCurrentBooking(null)}
              />
            ) : (
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur">
                <CardContent className="p-8">
                  <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                      How would you like to book your hotel?
                    </h2>
                    <p className="text-gray-600">
                      Choose between our AI assistant or manual booking form
                    </p>
                  </div>

                  <Tabs defaultValue="manual" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 mb-8">
                      <TabsTrigger value="manual" className="flex items-center gap-2">
                        📝 Book Manually
                      </TabsTrigger>
                      <TabsTrigger value="ai" className="flex items-center gap-2">
                        🤖 Book with AI Agent
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="manual">
                      <ManualBooking onBookingComplete={setCurrentBooking} />
                    </TabsContent>

                    <TabsContent value="ai">
                      <AIAgentBooking onBookingComplete={setCurrentBooking} />
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </BookingProvider>
  );
};

export default Index;
