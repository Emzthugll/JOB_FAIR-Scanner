import { createContext, ReactNode, useContext, useState } from 'react';

interface Activity {
    id: number;
    type: string;
    start?: string;
    end?: string;
    venue?: string;
}

interface ActivityContextType {
    currentActivity: Activity | null;
    setCurrentActivity: (activity: Activity) => void;
}

const ActivityContext = createContext<ActivityContextType>({
    currentActivity: null,
    setCurrentActivity: () => {},
});

export const ActivityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);

    return <ActivityContext.Provider value={{ currentActivity, setCurrentActivity }}>{children}</ActivityContext.Provider>;
};

export const useActivity = () => useContext(ActivityContext);
