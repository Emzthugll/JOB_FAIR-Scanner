import { LucideIcon } from 'lucide-react';
import { FC, ReactNode } from 'react';

interface SummaryCardProps {
    title: string;
    value?: number | string;
    icon: LucideIcon;
    children?: ReactNode;
}

const SummaryCard: FC<SummaryCardProps> = ({ title, value, icon: Icon, children }) => {
    return (
        <div className="shadow-3xl shadow-shadow-500 rounded-2xl border border-gray-200 p-5 shadow-lg shadow-gray-400 md:p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#084896]">
                <Icon className="h-6 w-6 text-white" />
            </div>

            <div className="mt-3 flex flex-col">
                {value !== undefined && <h4 className="mt-2 text-2xl font-bold text-green-500">{value}</h4>}
                {children}
                <span className="mt-5 text-sm text-gray-500">{title}</span>
            </div>
        </div>
    );
};

export default SummaryCard;
