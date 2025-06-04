
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Hotel } from "@/contexts/BookingContext";
import { Star } from "lucide-react";

interface HotelCardProps {
  hotel: Hotel;
  isSelected: boolean;
  onSelect: () => void;
  checkIn?: Date;
  checkOut?: Date;
}

export const HotelCard: React.FC<HotelCardProps> = ({ 
  hotel, 
  isSelected, 
  onSelect, 
  checkIn, 
  checkOut 
}) => {
  const nights = checkIn && checkOut 
    ? Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
    : 1;
  
  const totalPrice = hotel.price * nights;

  return (
    <Card className={`cursor-pointer transition-all hover:shadow-md ${isSelected ? 'ring-2 ring-primary' : ''}`}>
      <CardHeader className="p-0">
        <div className="relative">
          <img 
            src={hotel.image} 
            alt={hotel.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <Badge className="absolute top-2 right-2 bg-white text-gray-800">
            {hotel.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg line-clamp-1">{hotel.name}</h3>
          <p className="text-sm text-gray-600">{hotel.city}, {hotel.country}</p>
          
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{hotel.rating}</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {hotel.amenities.slice(0, 3).map((amenity) => (
              <Badge key={amenity} variant="secondary" className="text-xs">
                {amenity}
              </Badge>
            ))}
            {hotel.amenities.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{hotel.amenities.length - 3} more
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <div className="w-full space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {nights > 1 ? `${nights} nights` : 'Per night'}
            </span>
            <span className="font-bold text-lg">
              {hotel.currency} {nights > 1 ? totalPrice : hotel.price}
            </span>
          </div>
          
          <Button 
            onClick={onSelect} 
            variant={isSelected ? "default" : "outline"}
            className="w-full"
          >
            {isSelected ? "Selected" : "Select Hotel"}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};
