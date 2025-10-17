import { Head } from '@inertiajs/react';
import { useRef, useState } from 'react';
import Alerts from '../components/Alert';
import Html5QrcodePlugin from '../components/Html5QrcodePlugin';
import { handleScanSuccess } from '../utils/scanHandlers';

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

    const [alert, setAlert] = useState({
        type: 'success' as 'success' | 'warning' | 'error',
        title: '',
        message: '',
        show: false,
    });

    const showAlert = (type: 'success' | 'warning' | 'error', title: string, message: string) => {
        setAlert({ type, title, message, show: true });
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
            // Scan delay
            setTimeout(() => {
                isScanning.current = false;
            }, 4000);
        });
    };

    return (
        <>
            <Head title="QR Scanner" />
            <div className="relative flex min-h-screen flex-col items-center justify-start bg-[#FDFDFC] p-2 pt-24 text-[#1b1b18] sm:pt-32 md:pt-40">
                <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-gray-200 p-2 shadow-sm">
                    <Alerts
                        type={alert.type}
                        title={alert.title}
                        message={alert.message}
                        show={alert.show}
                        onClose={() => setAlert((prev) => ({ ...prev, show: false }))}
                    />

                    <div className="mb-6 flex flex-col items-center">
                        <img src="/images/work.png" alt="Scanner Logo" className="mt-3 mb-1 h-12 w-30" />
                    </div>

                    <div className="mb-4 h-[50vh] w-full overflow-hidden">
                        <Html5QrcodePlugin
                            fps={10}
                            qrbox={{ width: 250, height: 250 }}
                            disableFlip={false}
                            verbose={false}
                            qrCodeSuccessCallback={onQrCodeSuccess}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
