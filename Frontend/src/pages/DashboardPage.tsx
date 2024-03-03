import React, { useState, useEffect } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    Typography,
    Grid,
    Container,
    Select,
    MenuItem,
    IconButton,
    InputLabel,
    FormControl,
    FormHelperText,
} from '@mui/material';
import DomainCard from '../components/ui/DomainCard'; // Import your DomainCard component
import '../assets/styles/DashboardPageStyle.css';
import { CertificationData } from '../models/CertificationData';
import { sortByDomainNameAsc, sortByDomainNameDesc, sortByValidToDateAsc, sortByValidToDateDesc } from '../models/CertificationData';


// Replace with your actual data or data fetching logic
const domainData: CertificationData[] = [
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
        domain: 'Linkedin.com',
        certificateDetails: {
            issuer: { C: 'US', O: 'Google Trust Services LLC', CN: 'GTS CA 1C3' },
            validFrom: 'Jan 29 08:04:47 2024 GMT',
            validTo: 'Apr 23 08:04:46 2024 GMT',
            serialNumber: '929CDF7F59C08AE9099B8CC9716EB04A',
            fingerprint: '66:92:08:3D:8D:29:C3:CF:50:3F:34:A3:87:1B:18:29:A9:9A:66:A2',
        },
    },

];



const DashboardPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
    const applyFilter = (data: CertificationData[], filter: string): CertificationData[] => {
        switch (filter) {
            case 'domainNameAsc':
                return sortByDomainNameAsc(data);
            case 'domainNameDesc':
                return sortByDomainNameDesc(data);
            case 'expiryDateAsc':
                return sortByValidToDateAsc(data);
            case 'expiryDateDesc':
                return sortByValidToDateDesc(data);
            default:
                return data;
        }
    };

    const filteredData = selectedFilter ? applyFilter(domainData, selectedFilter) : domainData; // Sorted data based on filter (if available)

    const handleFilterChange = (event: any) => {
        setSelectedFilter(event.target.value as string | null);
    };



    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid container spacing={2} alignItems="center" mb={2} item xs={12}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-helper-label">Sort By</InputLabel>
                        <Select
                            value={selectedFilter}

                            label="Sort By"
                            onChange={handleFilterChange}
                            fullWidth
                        >
                            <MenuItem value="domainNameAsc">Domain Name (A-Z)</MenuItem>
                            <MenuItem value="domainNameDesc">Domain Name (Z-A)</MenuItem>
                            <MenuItem value="expiryDateAsc">Expiry Date (Ascending)</MenuItem>
                            <MenuItem value="expiryDateDesc">Expiry Date (Descending)</MenuItem>
                        </Select>
                    </FormControl>
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
                        {filteredData.map((domain: CertificationData) => (
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
