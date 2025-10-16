import axios from 'axios';

interface HandleScanDeps {
    currentActivity?: { id: number };
    scannedSet: React.MutableRefObject<Set<string>>;
    showAlert: (type: 'success' | 'warning' | 'error', title: string, message: string) => void;
    successSound: HTMLAudioElement;
    errorSound: HTMLAudioElement;
}

export const handleScanSuccess = async (decodedText: string, deps: HandleScanDeps) => {
    const { currentActivity, scannedSet, showAlert, successSound, errorSound } = deps;

    if (!currentActivity) {
        showAlert('error', 'No Activity!', 'No active recruitment activity!');
        errorSound.play();
        return;
    }

    if ('vibrate' in navigator) navigator.vibrate(200);

    if (scannedSet.current.has(decodedText)) {
        showAlert('warning', 'Duplicate Scan!', 'This QR code has already been scanned in this session!');
        errorSound.play();
        return;
    }

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

        scannedSet.current.add(decodedText);
        showAlert('success', 'Scan Successful!', 'QR code scanned successfully!');
        successSound.play();
    } catch (error: any) {
        if (error.response?.status === 409) {
            showAlert('warning', 'Duplicate Scan!', 'This QR code has already been scanned!');
        } else if (error.response?.status === 404) {
            showAlert('error', 'Invalid QR!', 'This identification card does not exist.');
        } else {
            console.error(error);
            showAlert('error', 'Scan Failed', error.response?.data?.message || 'Scan failed!');
        }
        errorSound.play();
    }
};
