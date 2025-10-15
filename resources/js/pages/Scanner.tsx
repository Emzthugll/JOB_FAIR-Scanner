import Html5QrcodePlugin from '@/components/Html5QrcodePlugin';
import { Head } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

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
    const [scannedResults, setScannedResults] = useState<string[]>([]);
    const [message, setMessage] = useState<string | null>(null);

    const handleScanSuccess = async (decodedText: string) => {
        if (!currentActivity) {
            setMessage('No active recruitment activity!');
            return;
        }

        if (scannedResults.includes(decodedText)) {
            setMessage('Already scanned!');
            return;
        }

        setScannedResults((prev) => [decodedText, ...prev]);
        setMessage(null);

        try {
            await axios.post(
                '/jobfair/attendees',
                {
                    applicant_profile_id: decodedText,
                    recruitment_activity_id: currentActivity.id,
                    status: 'scanned',
                },
                {
                    headers: {
                        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
                    },
                },
            );
            setMessage('Scan successful!');
        } catch (error: any) {
            console.error(error);
            setMessage(error.response?.data?.message || 'Scan failed!');
        }
    };

    return (
        <>
            <Head title="QR Scanner" />
            <div className="flex min-h-screen flex-col items-center justify-start bg-[#FDFDFC] p-2 pt-24 text-[#1b1b18] sm:pt-32 md:pt-40">
                <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-gray-200 p-2 shadow-sm">
                    <div className="mb-6 flex flex-col items-center">
                        <img src="/images/work.png" alt="Scanner Logo" className="mb-3 h-12 w-30" />
                    </div>

                    <div className="mb-4 h-[60vh] w-full overflow-hidden">
                        <Html5QrcodePlugin
                            fps={10}
                            qrbox={{ width: 250, height: 250 }}
                            disableFlip={false}
                            qrCodeSuccessCallback={handleScanSuccess}
                        />
                    </div>

                    {message && <p className="mb-2 text-center text-sm font-medium text-blue-600">{message}</p>}

                    <div className="max-h-32 space-y-2 overflow-y-auto">
                        {scannedResults.length === 0 ? (
                            <p className="text-center text-sm text-gray-500">No QR code scanned yet.</p>
                        ) : (
                            scannedResults.map((item, index) => (
                                <div
                                    key={index}
                                    className="rounded-lg border border-green-200 bg-green-50 p-2 text-sm font-medium break-words text-green-700"
                                >
                                    {item}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
