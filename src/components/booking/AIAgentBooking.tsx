
import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Bot, User } from "lucide-react";
import { searchHotels } from "@/data/hotels";
import { useBooking, Hotel } from "@/contexts/BookingContext";
import { HotelCard } from "./HotelCard";
import { toast } from "sonner";

interface Message {
  id: string;
  type: 'user' | 'agent';
  content: string;
  timestamp: Date;
  hotels?: Hotel[];
}

interface BookingData {
  city?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: number;
  preferences?: string;
  email?: string;
  selectedHotel?: Hotel;
}

interface AIAgentBookingProps {
  onBookingComplete: (booking: any) => void;
}

const AIAgentBooking: React.FC<AIAgentBookingProps> = ({ onBookingComplete }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'agent',
      content: "Hello! I'm your AI booking assistant. I'll help you find the perfect hotel. Let's start with your destination - which city would you like to visit?",
      timestamp: new Date()
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [bookingData, setBookingData] = useState<BookingData>({});
  const [currentStep, setCurrentStep] = useState<'city' | 'dates' | 'guests' | 'email' | 'search' | 'selection' | 'confirmation'>('city');
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { addBooking } = useBooking();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const addMessage = (type: 'user' | 'agent', content: string, hotels?: Hotel[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      hotels
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const simulateTyping = async (response: string, hotels?: Hotel[]) => {
    setIsTyping(true);
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    setIsTyping(false);
    addMessage('agent', response, hotels);
  };

  const processUserInput = async (input: string) => {
    addMessage('user', input);
    
    switch (currentStep) {
      case 'city':
        setBookingData(prev => ({ ...prev, city: input }));
        setCurrentStep('dates');
        await simulateTyping(`Great! You want to visit ${input}. Now, what are your check-in and check-out dates? Please provide them in the format: "Check-in: YYYY-MM-DD, Check-out: YYYY-MM-DD"`);
        break;
        
      case 'dates':
        const dateRegex = /check-in:\s*(\d{4}-\d{2}-\d{2}).*check-out:\s*(\d{4}-\d{2}-\d{2})/i;
        const dateMatch = input.match(dateRegex);
        
        if (dateMatch) {
          const [, checkIn, checkOut] = dateMatch;
          setBookingData(prev => ({ ...prev, checkIn, checkOut }));
          setCurrentStep('guests');
          await simulateTyping(`Perfect! Check-in: ${checkIn}, Check-out: ${checkOut}. How many guests will be staying?`);
        } else {
          await simulateTyping("I couldn't understand the date format. Please provide dates like this: 'Check-in: 2024-06-10, Check-out: 2024-06-15'");
        }
        break;
        
      case 'guests':
        const guests = parseInt(input);
        if (guests && guests > 0 && guests <= 10) {
          setBookingData(prev => ({ ...prev, guests }));
          setCurrentStep('email');
          await simulateTyping(`Got it! ${guests} guest${guests > 1 ? 's' : ''}. I'll need your email address for the booking confirmation.`);
        } else {
          await simulateTyping("Please enter a valid number of guests (1-10).");
        }
        break;
        
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(input)) {
          setBookingData(prev => ({ ...prev, email: input, preferences: '' }));
          setCurrentStep('search');
          
          // Search for hotels
          const hotels = searchHotels(bookingData.city!, bookingData.checkIn!, bookingData.checkOut!, bookingData.guests!);
          const topHotels = hotels.slice(0, 3);
          
          await simulateTyping(
            `Excellent! I found ${hotels.length} hotels in ${bookingData.city}. Here are the top 3 options for you:`,
            topHotels
          );
          setCurrentStep('selection');
        } else {
          await simulateTyping("Please enter a valid email address.");
        }
        break;
        
      case 'selection':
        const hotelNumber = parseInt(input);
        const lastAgentMessage = messages.filter(m => m.type === 'agent').pop();
        
        if (lastAgentMessage?.hotels && hotelNumber >= 1 && hotelNumber <= lastAgentMessage.hotels.length) {
          const selectedHotel = lastAgentMessage.hotels[hotelNumber - 1];
          setBookingData(prev => ({ ...prev, selectedHotel }));
          
          const checkIn = new Date(bookingData.checkIn!);
          const checkOut = new Date(bookingData.checkOut!);
          const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
          const totalCost = selectedHotel.price * nights;
          
          setCurrentStep('confirmation');
          await simulateTyping(
            `Excellent choice! ${selectedHotel.name} in ${selectedHotel.city}. 
            
**Booking Summary:**
- Hotel: ${selectedHotel.name}
- Dates: ${bookingData.checkIn} to ${bookingData.checkOut} (${nights} night${nights > 1 ? 's' : ''})
- Guests: ${bookingData.guests}
- Total Cost: ${selectedHotel.currency} ${totalCost}

Type "confirm" to complete your booking, or "change" to select a different hotel.`
          );
        } else {
          await simulateTyping("Please enter a valid hotel number (1, 2, or 3).");
        }
        break;
        
      case 'confirmation':
        if (input.toLowerCase().includes('confirm')) {
          const booking = addBooking({
            hotel: bookingData.selectedHotel!,
            checkIn: bookingData.checkIn!,
            checkOut: bookingData.checkOut!,
            guests: bookingData.guests!,
            preferences: bookingData.preferences!,
            totalCost: bookingData.selectedHotel!.price * Math.ceil((new Date(bookingData.checkOut!).getTime() - new Date(bookingData.checkIn!).getTime()) / (1000 * 60 * 60 * 24)),
            userEmail: bookingData.email!,
          });
          
          await simulateTyping(`🎉 Booking confirmed! Your booking ID is ${booking.id}. A confirmation email will be sent to ${bookingData.email}. Thank you for choosing us!`);
          
          setTimeout(() => {
            onBookingComplete(booking);
            toast.success("Booking completed successfully!");
          }, 2000);
        } else if (input.toLowerCase().includes('change')) {
          setCurrentStep('search');
          const hotels = searchHotels(bookingData.city!, bookingData.checkIn!, bookingData.checkOut!, bookingData.guests!);
          const topHotels = hotels.slice(0, 3);
          await simulateTyping("No problem! Here are the hotel options again:", topHotels);
          setCurrentStep('selection');
        } else {
          await simulateTyping("Please type 'confirm' to complete your booking or 'change' to select a different hotel.");
        }
        break;
    }
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;
    
    processUserInput(currentMessage);
    setCurrentMessage("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[600px]">
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI Booking Assistant
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col">
          <ScrollArea className="flex-1 pr-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.type === 'user' ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                    }`}>
                      {message.type === 'user' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                    </div>
                    
                    <div className={`rounded-lg p-3 ${
                      message.type === 'user' 
                        ? 'bg-primary text-primary-foreground ml-auto' 
                        : 'bg-secondary'
                    }`}>
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      
                      {message.hotels && (
                        <div className="mt-4 space-y-3">
                          {message.hotels.map((hotel, index) => (
                            <div key={hotel.id} className="bg-white p-3 rounded border">
                              <div className="flex items-start gap-3">
                                <Badge className="mt-1">{index + 1}</Badge>
                                <div className="flex-1">
                                  <h4 className="font-semibold text-gray-900">{hotel.name}</h4>
                                  <p className="text-sm text-gray-600">{hotel.city}, {hotel.country}</p>
                                  <p className="text-sm text-gray-600">⭐ {hotel.rating} • {hotel.currency} {hotel.price}/night</p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    {hotel.amenities.slice(0, 3).join(', ')}
                                    {hotel.amenities.length > 3 && ` +${hotel.amenities.length - 3} more`}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                          <p className="text-sm text-gray-600 mt-2">
                            Type the number (1, 2, or 3) of the hotel you'd like to book.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-secondary rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          <div className="flex gap-2 mt-4">
            <Input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              disabled={isTyping}
            />
            <Button onClick={handleSendMessage} disabled={isTyping || !currentMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAgentBooking;
