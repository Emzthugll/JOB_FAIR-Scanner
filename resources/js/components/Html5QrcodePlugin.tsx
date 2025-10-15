import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';

interface Html5QrcodePluginProps {
    fps?: number;
    qrbox?: number | { width: number; height: number } | null;
    aspectRatio?: number;
    disableFlip?: boolean;
    verbose?: boolean;
    qrCodeSuccessCallback: (decodedText: string, decodedResult?: any) => void;
    qrCodeErrorCallback?: (errorMessage: string) => void;
}

const qrcodeRegionId = 'html5qr-code-full-region';

const createConfig = (props: Html5QrcodePluginProps) => {
    const config: any = {};
    if (props.fps) config.fps = props.fps;
    if (props.qrbox !== undefined) config.qrbox = props.qrbox;
    if (props.aspectRatio) config.aspectRatio = props.aspectRatio;
    if (props.disableFlip !== undefined) config.disableFlip = props.disableFlip;
    return config;
};

const Html5QrcodePlugin: React.FC<Html5QrcodePluginProps> = (props) => {
    useEffect(() => {
        if (!props.qrCodeSuccessCallback || typeof props.qrCodeSuccessCallback !== 'function') {
            throw new Error('qrCodeSuccessCallback is required and must be a function.');
        }

        const config = createConfig(props);
        const verbose = props.verbose === true;

        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);

        html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);

        // Make the scanner div fill the container
        const container = document.getElementById(qrcodeRegionId);
        if (container) {
            container.style.height = '100%';
            container.style.width = '100%';
        }

        return () => {
            html5QrcodeScanner.clear().catch((error) => {
                console.error('Failed to clear html5QrcodeScanner.', error);
            });
        };
    }, []);

    // Fill its parent container fully
    return <div id={qrcodeRegionId} className="h-full w-full" />;
};

export default Html5QrcodePlugin;
