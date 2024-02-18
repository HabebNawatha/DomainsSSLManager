import { useState, useEffect } from 'react';
import '../assets/styles/HomePageStyle.css';
import CustomizedButton from '../components/ui/CustomizedButton';
import { CertificationData } from '../models/CertificationData';

export default function HomePage() {
    const [url, setUrl] = useState('');
    const [certificateData, setCertificateData] = useState<CertificationData | null>(null);
    const [customrError, setError] = useState<string | null>(null);


    const fetchData = async () => {
        try {
            if (!url) return; // Skip data fetch if URL is empty

            const response = await fetch(`http://localhost:8000/ssl-service/certificate?domain=${url}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                const responseData = await response.json();
                console.log(responseData);
                // Construct a CertificateData instance from the response data
                const certificate = new CertificationData(
                    responseData.data
                );
                setCertificateData(certificate);
                setError(null); // Clear error if successful
            } else {
                setError(`Failed to fetch data: ${response.statusText}`);
            }
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleSubmit = async () => {
        fetchData();
    };


    return (
        <div className="home-page-container">
            <div className="home-page-introduction-container">
                <h1 className="home-page-inroduction-h1">Simplify SSL Certificate Management </h1>
                <h1>Easy Links, Simple as It Gets!</h1>
                <div className="home-page-link-container">
                    <input
                        className="home-page-input-field"
                        placeholder="Enter your Domain URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <CustomizedButton buttonText='Submit' onClick={handleSubmit} />
                </div>
            </div>
            <div className="certificate-data-container">

                {certificateData && (
                    <div>
                        <h2>Certificate Data</h2>
                        <p>Domain: {certificateData.domain}</p>
                        <p>Issuer: {certificateData.certificateDetails.issuer.CN}</p>
                        <p>Valid From: {certificateData.certificateDetails.validFrom}</p>
                        <p>Valid To: {certificateData.certificateDetails.validTo}</p>
                        <p>Serial Number: {certificateData.certificateDetails.serialNumber}</p>
                        <p>Fingerprint: {certificateData.certificateDetails.fingerprint}</p>
                    </div>
                )}
                {customrError && <p className="error-message">{customrError}</p>}
            </div>
        </div>
    );
}