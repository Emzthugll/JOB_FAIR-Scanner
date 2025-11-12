import SummaryCard from '../SummaryCard';
import { Calendar } from 'lucide-react';

interface TypeCardProps {
  activityType?: string;
  title?: string;
}

const TypeCard: React.FC<TypeCardProps> = ({ activityType, title = 'Type' }) => {
  return (
    <SummaryCard title={title} className="h-[200px]">
      {activityType ? (
        <div className="flex flex-col items-center gap-2 text-center">
          <Calendar className="w-6 h-6 text-green-600" />
          <span className="text-lg font-semibold text-gray-800">{activityType}</span>
        </div>
      ) : (
        <span className="text-gray-400">No type available</span>
      )}
    </SummaryCard>
  );
};

export default TypeCard;
