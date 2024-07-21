import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CertificatesToolbar from '../components/ui/DashboardToolbar';
import DomainCard from '../components/ui/DomainCard';
import {
    sortByDomainNameAsc,
    sortByDomainNameDesc,
    sortByValidToDateAsc,
    sortByValidToDateDesc,
    CertificationData,
} from '../models/CertificationData';
import '../assets/styles/DashboardPageStyle.css';
import { Delete } from '@mui/icons-material';

const DashboardPage: React.FC = () => {
    const initialDomainData: CertificationData[] = [
        {
            domain: 'google.com',
            certificateDetails: {
                issuer: { C: 'US', O: 'Google Trust Services LLC', CN: 'GTS CA 1C3' },
                validFrom: 'Jan 29 08:04:47 2024 GMT',
                validTo: 'Apr 22 08:04:46 2024 GMT',
                serialNumber: '929CDF7F59C08AE9099B8CC9716EB04A',
                fingerprint: '66:92:08:3D:8D:29:C3:CF:50:3F:34:A3:87:1B:18:29:A9:9A:66:A2',
            },
        },
        {
            domain: 'youtube.com',
            certificateDetails: {
                issuer: { C: 'US', O: 'Google Trust Services LLC', CN: 'GTS CA 1C3' },
                validFrom: 'Jan 29 08:04:47 2024 GMT',
                validTo: 'Apr 21 08:04:46 2024 GMT',
                serialNumber: '929CDF7F59C08AE9099B8CC9716EB04A',
                fingerprint: '66:92:08:3D:8D:29:C3:CF:50:3F:34:A3:87:1B:18:29:A9:9A:66:A2',
            },
        },
        {
            domain: 'linkedin.com',
            certificateDetails: {
                issuer: { C: 'US', O: 'Google Trust Services LLC', CN: 'GTS CA 1C3' },
                validFrom: 'Jan 29 08:04:47 2024 GMT',
                validTo: 'Apr 23 08:04:46 2024 GMT',
                serialNumber: '929CDF7F59C08AE9099B8CC9716EB04A',
                fingerprint: '66:92:08:3D:8D:29:C3:CF:50:3F:34:A3:87:1B:18:29:A9:9A:66:A2',
            },
        },
    ];

    const [certificates, setCertificates] = useState<CertificationData[]>(initialDomainData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        const fetchCertificates = async () => {
            setLoading(true);
            try {
                const response = await axios.get('http://localhost:8000/dashboard/', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                });
                setCertificates(response.data.certificates);
            } catch (err) {
                console.error('Error fetching certificates:', err);
                setError('Failed to fetch certificates');
            } finally {
                setLoading(false);
            }
        };
        fetchCertificates();
    }, []);

    const handleSortChange = (sortOption: string) => {
        let sortedCertificates: CertificationData[];
        switch (sortOption) {
            case 'domainAsc':
                sortedCertificates = sortByDomainNameAsc(certificates);
                break;
            case 'domainDesc':
                sortedCertificates = sortByDomainNameDesc(certificates);
                break;
            case 'validToAsc':
                sortedCertificates = sortByValidToDateAsc(certificates);
                break;
            case 'validToDesc':
                sortedCertificates = sortByValidToDateDesc(certificates);
                break;
            default:
                sortedCertificates = certificates;
        }
        setCertificates([...sortedCertificates]); // Ensure state update triggers re-render
    };
    const handleEditClick = () => {
        setIsEditMode(!isEditMode);
    }
    const handleDeleteCard = (domain:string) => {
        setCertificates(certificates.filter(cert => cert.domain !== domain));
    }

    return (
        <div>
            <CertificatesToolbar onSortChange={handleSortChange} onEditClick={handleEditClick} />
            <div className='certificates-container'>
                {loading ? (
                    <div className='loading-certificates'> Loading...</div>
                ) : error ? (
                    <div className='error-certificates'> Error</div>
                ) : (
                    <div className='projects-section'>
                        {certificates.map((domain) => (
                            <div className='domain-card-div'>
                                <DomainCard
                                    key={domain.domain}
                                    domain={domain.domain}
                                    certificateDetails={domain.certificateDetails}
                                />
                                <button className={`card-delete-btn ${isEditMode ? 'visible' : ''}`}
                                    onClick={() => handleDeleteCard(domain.domain)}>
                                    <Delete />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;
