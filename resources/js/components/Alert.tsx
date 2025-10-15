import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';
import { useEffect } from 'react';

interface AlertProps {
    type: 'success' | 'warning' | 'error';
    title: string;
    message: string;
    show: boolean;
    onClose: () => void;
}

export default function Alerts({ type, title, message, show, onClose }: AlertProps) {
    const icons = {
        warning: <AlertTriangle className="mb-2 h-10 w-10 text-yellow-500" />,
        error: <XCircle className="mb-2 h-10 w-10 text-red-500" />,
        success: <CheckCircle2 className="mb-2 h-10 w-10 text-green-500" />,
    };

    const bgColors = {
        warning: 'bg-yellow-100 border-yellow-400 text-yellow-800',
        error: 'bg-red-100 border-red-400 text-red-800',
        success: 'bg-green-100 border-green-400 text-green-800',
    };

    useEffect(() => {
        if (show) {
            const timer = setTimeout(onClose, 2500); // auto-hide after 2.5 seconds
            return () => clearTimeout(timer);
        }
    }, [show, onClose]);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute top-1/2 left-1/2 z-50 w-80 -translate-x-1/2 -translate-y-1/2 rounded-xl border p-4 text-center shadow-lg ${bgColors[type]}`}
                >
                    <div className="flex flex-col items-center">
                        {icons[type]}
                        <h4 className="mb-1 font-semibold">{title}</h4>
                        <p className="text-sm">{message}</p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
