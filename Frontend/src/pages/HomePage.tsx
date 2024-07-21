import React, { useEffect, useState } from 'react';
import '../assets/styles/HomePageStyle.css';
import CustomisedButton from '../components/ui/CustomisedButton';
import { CertificationData } from '../models/CertificationData';
import useFetchData from '../hooks/useFetchData';
import axios, { AxiosResponse } from 'axios';
import CustomisedModal from '../components/ui/CustomisedModal';
import renderCertificateData from '../utils/renderCertificateData';

export default function HomePage() {

    const [url, setUrl] = useState('');
    const [certificateData, setCertificateData] = useState<CertificationData | null>(null);
    const [customrError, setError] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);

    const fetchData = async () => {
        try {
            if (!url) return; // Skip data fetch if URL is empty

            const response = await fetch(`http://localhost:8000/certificate/certificate?domain=${url}`, {
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
                setShowModal(true);
                setError(null); // Clear error if successful
            } else {
                setError(`Failed to fetch data: ${response.statusText}`);
            }
        } catch (error: any) {
            setError(error.message);
        }
    };

    const handleSubmit = async () => {
        setShowModal(true)
        //fetchData();
    };

    //MockCertificate
    const mockCertificateData = {
        domain: 'google.com',
        certificateDetails: {
            issuer: { C: 'US', O: 'Google Trust Services LLC', CN: 'GTS CA 1C3' },
            validFrom: 'Feb  5 08:03:56 2024 GMT',
            validTo: 'Apr 29 08:03:55 2024 GMT',
            serialNumber: 'C389D85E94B24B6909EC2AA96C658A5A',
            fingerprint: '15:64:B9:36:57:83:FF:80:1D:11:90:74:39:EC:B1:FC:98:E7:B7:C7'
        },
        accessToken: localStorage.getItem('accessToken')
    };

    return (
        <div className="home-page-container">
            <div className="home-page-introduction-container">
                <h1 className="home-page-introduction-h1">Simplify SSL Certificate Management</h1>
                <h1>Easy Links, Simple as It Gets!</h1>
                <div className="home-page-link-container">
                    <input
                        className="home-page-input-field"
                        placeholder="Enter your Domain URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <CustomisedButton onClick={handleSubmit}>Submit
                    </CustomisedButton>
                </div>
            </div>

            {mockCertificateData && showModal && (

                <CustomisedModal title="Certificate Data" onClose={() => setShowModal(false)}> {/* Render the Modal component */}
                    {renderCertificateData(mockCertificateData)}
                </CustomisedModal>
            )}
            {customrError && <p className="error-message">{customrError}</p>}

        </div>
    );
}


