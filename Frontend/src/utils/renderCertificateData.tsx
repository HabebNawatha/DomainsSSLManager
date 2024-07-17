import React from 'react';
import { CertificationData } from '../models/CertificationData';

const renderObjectProperties = (obj : any) => {
    return Object.entries(obj).map(([key, value]) => {
        if (typeof value === 'object') {
            return (
                <div key={key}>
                    <strong>{key}: </strong>
                    {renderObjectProperties(value)}
                </div>
            );
        } else {
            return (
                <div key={key}>
                    <strong>{key}: </strong>
                    <span>{value?.toString()}</span>
                </div>
            );
        }
    });
};

const renderCertificateData = (mockCertificateData :CertificationData) => {
    if (!mockCertificateData) return null;

    return (
        <div>
            
            {renderObjectProperties(mockCertificateData)}
        </div>
    );
};

export default renderCertificateData;
