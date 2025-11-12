import SummaryCard from '../SummaryCard';
import { MapPin } from 'lucide-react';

interface VenueCardProps {
  venue?: string;
  title?: string;
}

const VenueCard: React.FC<VenueCardProps> = ({ venue, title = 'Venue' }) => {
  return (
    <SummaryCard title={title} className="h-[200px]">
      {venue ? (
        <div className="flex flex-col items-center gap-2 text-center">
          <MapPin className="w-6 h-6 text-blue-600" />
          <span className="text-lg font-semibold text-gray-800">{venue}</span>
        </div>
      ) : (
        <span className="text-gray-400">No venue available</span>
      )}
    </SummaryCard>
  );
};

export default VenueCard;
