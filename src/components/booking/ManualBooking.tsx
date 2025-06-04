
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { searchHotels } from "@/data/hotels";
import { HotelCard } from "./HotelCard";
import { useBooking, Hotel } from "@/contexts/BookingContext";
import { toast } from "sonner";

const formSchema = z.object({
  city: z.string().min(2, "City is required"),
  checkIn: z.date({ required_error: "Check-in date is required" }),
  checkOut: z.date({ required_error: "Check-out date is required" }),
  guests: z.number().min(1, "At least 1 guest is required").max(10, "Maximum 10 guests"),
  preferences: z.string().optional(),
  email: z.string().email("Valid email is required"),
}).refine((data) => data.checkOut > data.checkIn, {
  message: "Check-out date must be after check-in date",
  path: ["checkOut"],
});

interface ManualBookingProps {
  onBookingComplete: (booking: any) => void;
}

const ManualBooking: React.FC<ManualBookingProps> = ({ onBookingComplete }) => {
  const [searchResults, setSearchResults] = useState<Hotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const { addBooking } = useBooking();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guests: 1,
      preferences: "",
    },
  });

  const onSearch = async (values: z.infer<typeof formSchema>) => {
    setIsSearching(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const results = searchHotels(values.city, format(values.checkIn, "yyyy-MM-dd"), format(values.checkOut, "yyyy-MM-dd"), values.guests);
    setSearchResults(results);
    setIsSearching(false);
    
    if (results.length === 0) {
      toast.error("No hotels found for your search criteria");
    } else {
      toast.success(`Found ${results.length} hotels`);
    }
  };

  const onConfirmBooking = () => {
    if (!selectedHotel) return;
    
    const formValues = form.getValues();
    const nights = Math.ceil((formValues.checkOut.getTime() - formValues.checkIn.getTime()) / (1000 * 60 * 60 * 24));
    const totalCost = selectedHotel.price * nights;
    
    const booking = addBooking({
      hotel: selectedHotel,
      checkIn: format(formValues.checkIn, "yyyy-MM-dd"),
      checkOut: format(formValues.checkOut, "yyyy-MM-dd"),
      guests: formValues.guests,
      preferences: formValues.preferences || "",
      totalCost,
      userEmail: formValues.email,
    });
    
    onBookingComplete(booking);
    toast.success("Booking confirmed! Check your email for confirmation.");
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSearch)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Destination City</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Paris, New York, Tokyo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="checkIn"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Check-in Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date()}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="checkOut"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Check-out Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date() || (form.getValues().checkIn && date <= form.getValues().checkIn)}
                        initialFocus
                        className="pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guests"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Number of Guests</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min={1} 
                      max={10} 
                      {...field} 
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="preferences"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferences (Optional)</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Special requests, room preferences, etc."
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full" disabled={isSearching}>
            {isSearching ? "Searching..." : "Search Hotels"}
          </Button>
        </form>
      </Form>

      {searchResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Available Hotels</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {searchResults.map((hotel) => (
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                isSelected={selectedHotel?.id === hotel.id}
                onSelect={() => setSelectedHotel(hotel)}
                checkIn={form.getValues().checkIn}
                checkOut={form.getValues().checkOut}
              />
            ))}
          </div>
          
          {selectedHotel && (
            <div className="flex justify-center pt-4">
              <Button onClick={onConfirmBooking} size="lg" className="px-8">
                Confirm Booking - {selectedHotel.currency} {selectedHotel.price * Math.ceil((form.getValues().checkOut.getTime() - form.getValues().checkIn.getTime()) / (1000 * 60 * 60 * 24))}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManualBooking;
