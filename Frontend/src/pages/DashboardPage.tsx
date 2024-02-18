import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, Typography, Grid, Container } from '@mui/material';
import DomainCard from '../components/ui/DomainCard' // Import your DomainCard component
import '../assets/styles/DashboardPageStyle.css'

// Replace with your actual data or data fetching logic
const domainData = [
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
        domain: 'google.com',
        certificateDetails: {
            issuer: { C: 'US', O: 'Google Trust Services LLC', CN: 'GTS CA 1C3' },
            validFrom: 'Jan 29 08:04:47 2024 GMT',
            validTo: 'Apr 22 08:04:46 2024 GMT',
            serialNumber: '929CDF7F59C08AE9099B8CC9716EB04A',
            fingerprint: '66:92:08:3D:8D:29:C3:CF:50:3F:34:A3:87:1B:18:29:A9:9A:66:A2',
        },
    },
    
];



const DashboardPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    return (
        <Container maxWidth="xl" >
            <Grid container spacing={3}>
                <Grid item xs={12} mb={4}>
                    <Typography variant="h3" align="center" className='grid-header'>
                        Domain Certificates Dashboard
                    </Typography>
                </Grid>
                {loading ? (
                    <Grid item xs={12} alignItems="center">
                        <Typography variant="body1">Loading data...</Typography>
                    </Grid>
                ) : error ? (
                    <Grid item xs={12} alignItems="center">
                        <Typography variant="body1">Error: {error}</Typography>
                    </Grid>
                ) : (
                    <Grid container spacing={4}>
                        {domainData.map((domain) => (
                            <Grid item key={domain.domain} xs={12} sm={6} md={4}>
                                <DomainCard
                                    key={domain.domain}
                                    domain={domain.domain}
                                    certificateDetails={domain.certificateDetails}
                                />
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Grid>
        </Container>
    );
};


export default DashboardPage;
