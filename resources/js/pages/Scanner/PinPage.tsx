import ScannerPinInput from '@/components/ScannerPinInput';
import { useState } from 'react';

const PinPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePinSubmit = async (pin: string) => {
        setLoading(true);
        setError(null);

        try {
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            const res = await fetch('/scanner/check-pin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken || '',
                },
                body: JSON.stringify({ pin }),
            });

            
            let data;
            try {
                data = await res.json();
            } catch {
                throw new Error('Invalid response');
            }

            if (res.ok && data.success) {
                // Redirect to scanner page for this activity
                window.location.href = data.redirect;
            } else {
                // Use backend message or fallback
                setError(data.message || 'Invalid or expired PIN.');
            }
        } catch {
            setError('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
            <ScannerPinInput onComplete={handlePinSubmit} disabled={loading} error={!!error} clearError={() => setError(null)} />
        </div>
    );
};

export default PinPage;
