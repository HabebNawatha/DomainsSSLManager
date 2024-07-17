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
import axios from 'axios';

const DashboardPage = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
    const [certificates, setCertificates] = useState<CertificationData[]>([]);

    //Fetch certificates for user.
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

    //Applying filter
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
    const filteredData = selectedFilter ? applyFilter(certificates, selectedFilter) : certificates;
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
