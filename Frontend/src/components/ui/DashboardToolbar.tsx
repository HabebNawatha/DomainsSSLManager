import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import './DashboardToolbar.css';

interface CertificatesToolbarProps {
    onSortChange: (sortOption: string) => void;
    onEditClick: () => void;
}

const CertificatesToolbar: React.FC<CertificatesToolbarProps> = ({ onSortChange, onEditClick }) => {
    return (
        <div className="toolbar">
            <div className="left">
                <FormControl variant="outlined" className="dropdown">
                    <InputLabel id="sort-label">Sort By</InputLabel>
                    <Select
                        labelId="sort-label"
                        onChange={(e) => onSortChange(e.target.value as string)}
                        label="Sort By"
                    >
                        <MenuItem value="domainAsc">Domain Name (A-Z)</MenuItem>
                        <MenuItem value="domainDesc">Domain Name (Z-A)</MenuItem>
                        <MenuItem value="validToAsc">Valid To Date (Ascending)</MenuItem>
                        <MenuItem value="validToDesc">Valid To Date (Descending)</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div>
                <Button variant="contained" color='primary' onClick={onEditClick}>
                    Edit
                </Button>
            </div>
        </div>
    );
};

export default CertificatesToolbar;
