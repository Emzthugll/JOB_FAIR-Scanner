import { useRef, useState } from 'react';

interface ScannerPinInputProps {
    length?: number;
    onComplete: (pin: string) => void;
    disabled?: boolean;
    error?: boolean;
    errorMessage?: string;
    clearError?: () => void;
}

const ScannerPinInput: React.FC<ScannerPinInputProps> = ({ length = 4, onComplete, disabled = false, error, errorMessage, clearError }) => {
    const [pin, setPin] = useState(Array(length).fill(''));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (value: string, index: number) => {
        if (!/^\d*$/.test(value)) return; // only allow digits

        const newPin = [...pin];
        newPin[index] = value;
        setPin(newPin);

        if (value !== '' && clearError) clearError(); // clear error when user types

        // Move focus to next input automatically
        if (value && index < length - 1) {
            inputsRef.current[index + 1]?.focus();
        }

        // When all inputs are filled
        if (newPin.every((digit) => digit !== '')) {
            onComplete(newPin.join(''));
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, idx: number) => {
        if (disabled) return;
        if (e.key === 'Backspace' && !pin[idx] && idx > 0) {
            inputsRef.current[idx - 1]?.focus();
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
            <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-xl bg-white p-6 shadow-lg sm:p-8">
                <img className="h-12 w-12 object-contain" src="/images/work.png" alt="Logo" />
                <h2 className="text-center text-lg font-extrabold text-gray-700 sm:text-xl">Please Input Your 4-Digit PIN</h2>
                <p className="text-center text-sm font-medium text-gray-500">You can get the code from the Peso Admin.</p>

                <div className="mt-3 flex flex-wrap justify-center gap-3">
                    {pin.map((digit, i) => (
                        <input
                            key={i}
                            type="text"
                            inputMode="numeric"
                            pattern="\d*"
                            maxLength={1}
                            value={digit}
                            ref={(el) => {
                                inputsRef.current[i] = el;
                            }}
                            onChange={(e) => handleChange(e.target.value, i)}
                            onKeyDown={(e) => handleKeyDown(e, i)}
                            disabled={disabled}
                            className={`h-14 w-14 rounded-lg border text-center text-2xl font-semibold transition-all duration-200 focus:ring-2 focus:outline-none disabled:bg-gray-100 disabled:text-gray-400 ${
                                error ? 'animate-shake border-red-500 bg-red-50 focus:ring-red-500' : 'border-gray-300 bg-white focus:ring-[#084896]'
                            } sm:h-16 sm:w-16`}
                        />
                    ))}
                </div>

                {/* Error message below inputs */}
                {error && <p className="mt-2 text-center text-sm font-bold text-red-500">{errorMessage || 'Invalid PIN. Please try again.'}</p>}
            </div>
        </div>
    );
};

export default ScannerPinInput;
