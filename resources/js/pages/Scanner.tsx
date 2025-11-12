import AppLayout from '@/layouts/AppLayout';
import { useEffect, useRef, useState } from 'react';
import Html5QrcodePlugin from '../components/Html5QrcodePlugin';
import Alerts from '../components/ui/Alert';
import { handleScanSuccess } from '../utils/scanAlerts';
import { getTotalScannedAttendees } from '../utils/scannedAttendees';

interface EventType {
    id: number;
    type: string;
    start: string;
    end: string;
    venue: string;
    details: string;
}

interface PageProps {
    currentActivity: EventType;
}

export default function Scanner({ currentActivity: initialActivity }: PageProps) {
    const [currentActivity, setCurrentActivity] = useState<EventType>(initialActivity);
    const scannedSet = useRef<Set<string>>(new Set());
    const successSound = useRef<HTMLAudioElement>(new Audio('/sounds/success.mp3'));
    const errorSound = useRef<HTMLAudioElement>(new Audio('/sounds/error.mp3'));
    const isScanning = useRef(false);

    const [totalScanned, setTotalScanned] = useState(0);
    const [alert, setAlert] = useState({
        type: 'success' as 'success' | 'warning' | 'error',
        title: '',
        message: '',
        show: false,
    });

    
    const scannerRef = useRef<HTMLDivElement>(null);
    const [qrBoxSize, setQrBoxSize] = useState(250);

    const showAlert = (type: 'success' | 'warning' | 'error', title: string, message: string) => {
        setAlert({ type, title, message, show: true });
    };

    // Fetch total scanned based on the event
    const fetchTotalScanned = async (activityId?: number) => {
        const id = activityId || currentActivity?.id;
        if (!id) return;
        const total = await getTotalScannedAttendees(id);
        setTotalScanned(total);
    };

    const onQrCodeSuccess = (decodedText: string) => {
        if (!currentActivity) {
            showAlert('warning', 'No Event Selected', 'Please select an event first.');
            return;
        }

        if (isScanning.current) return;
        isScanning.current = true;

        handleScanSuccess(decodedText, {
            currentActivity,
            scannedSet,
            showAlert,
            successSound: successSound.current,
            errorSound: errorSound.current,
        }).finally(() => {
            setTimeout(() => {
                isScanning.current = false;
                fetchTotalScanned(currentActivity.id);
            }, 4000);
        });
    };

    // Refresh total scanned when currentActivity changes
    useEffect(() => {
        fetchTotalScanned(currentActivity.id);
    }, [currentActivity]);

    // Dynamically update QR box size
    useEffect(() => {
        const updateQrBoxSize = () => {
            if (!scannerRef.current) return;
            const width = scannerRef.current.offsetWidth;
            const boxSize = Math.min(width * 0.8, 300); // 80% of container, max 300px
            setQrBoxSize(boxSize);
        };

        updateQrBoxSize();
        window.addEventListener('resize', updateQrBoxSize);
        return () => window.removeEventListener('resize', updateQrBoxSize);
    }, []);

    return (
        <AppLayout>
            <div className="mt-10 flex w-full flex-col items-center justify-center px-4 sm:px-6">
                <div className="relative flex w-full max-w-md flex-col items-center justify-center" ref={scannerRef}>
                    {alert.show && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center">
                            <Alerts
                                type={alert.type}
                                title={alert.title}
                                message={alert.message}
                                show={alert.show}
                                onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
                            />
                        </div>
                    )}

                    {/* Scanner container */}
                    <div className="w-full rounded-2xl border-4 border-[#084896] bg-white p-3 shadow-lg">
                        <div className="relative w-full pb-[100%]">
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Html5QrcodePlugin
                                    fps={10}
                                    qrbox={{ width: qrBoxSize, height: qrBoxSize }}
                                    disableFlip={false}
                                    verbose={false}
                                    qrCodeSuccessCallback={onQrCodeSuccess}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Total scanned counter */}
                    <div className="mt-4 w-full max-w-xs rounded-md border border-[#084896] bg-[#084896] p-2 text-center text-sm text-white">
                        Total Scanned: {totalScanned}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
