import AppLayout from '@/layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
import Alerts from '../components/Alert';
import Html5QrcodePlugin from '../components/Html5QrcodePlugin';
import { handleScanSuccess } from '../utils/scanHandlers';
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

    // Show alert helper
    const showAlert = (type: 'success' | 'warning' | 'error', title: string, message: string) => {
        setAlert({ type, title, message, show: true });
    };

    // Fetch total scanned for the current activity
    const fetchTotalScanned = async () => {
        if (!currentActivity) return;
        const total = await getTotalScannedAttendees(currentActivity.id);
        setTotalScanned(total);
    };

    // Handle QR code success
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
                fetchTotalScanned(); // update total after scan
            }, 4000);
        });
    };

    // Fetch total scanned on activity change
    useEffect(() => {
        fetchTotalScanned();
    }, [currentActivity]);

    return (
        <AppLayout>
            <Head title="QR Scanner" />

            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-2 shadow-sm">
                <Alerts
                    type={alert.type}
                    title={alert.title}
                    message={alert.message}
                    show={alert.show}
                    onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
                />

                <div className="mb-4 h-[50vh] w-full overflow-hidden">
                    <Html5QrcodePlugin
                        fps={10}
                        qrbox={{ width: 200, height: 200 }}
                        disableFlip={false}
                        verbose={false}
                        qrCodeSuccessCallback={onQrCodeSuccess}
                    />
                </div>
                <div className="mb-2 rounded-md border border-[#084896] bg-[#084896] text-center">
                    <p className="text-lg font-semibold text-white">Total Scanned Attendees: {totalScanned}</p>
                </div>
            </div>
        </AppLayout>
    );
}
