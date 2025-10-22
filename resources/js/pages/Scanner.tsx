import AppLayout from '@/layouts/AppLayout';
import { useEffect, useRef, useState } from 'react';
import Alerts from '../components/Alert';
import Html5QrcodePlugin from '../components/Html5QrcodePlugin';
import { handleScanSuccess } from '../utils/scanAlerts';
import { getTotalScannedAttendees } from '../utils/scannedAttendees';

interface ScannerProps {
    currentActivity?: {
        id: number;
        type: string;
        start: string;
        end: string;
        venue: string;
        details: string;
    };
}

export default function Scanner({ currentActivity }: ScannerProps) {
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

    const showAlert = (type: 'success' | 'warning' | 'error', title: string, message: string) => {
        setAlert({ type, title, message, show: true });
    };

    const fetchTotalScanned = async () => {
        if (!currentActivity) return;
        const total = await getTotalScannedAttendees(currentActivity.id);
        setTotalScanned(total);
    };

    const onQrCodeSuccess = (decodedText: string) => {
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
                fetchTotalScanned();
            }, 4000);
        });
    };

    useEffect(() => {
        fetchTotalScanned();
    }, [currentActivity]);

    return (
        <AppLayout>
            <div className="mt-10 flex w-full flex-col items-center justify-center">
                <div className="relative flex flex-col items-center justify-center">
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

                    {/* Scanner container  */}
                    <div className="rounded-2xl border-4 border-[#084896] bg-white p-3 shadow-lg">
                        <div className="flex items-center justify-center sm:h-70 sm:w-80 md:h-[350px] md:w-[400px]">
                            <Html5QrcodePlugin
                                fps={10}
                                qrbox={{ width: 230, height: 230 }}
                                disableFlip={false}
                                verbose={false}
                                qrCodeSuccessCallback={onQrCodeSuccess}
                            />
                        </div>
                    </div>

                    {/* Total scanned counter */}
                    <div className="mt-4 w-44 rounded-md border border-[#084896] bg-[#084896] p-1 text-center text-sm text-white">
                        Total Scanned: {totalScanned}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
