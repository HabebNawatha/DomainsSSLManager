import express, { Request, Response, Router } from 'express';
import sslService from '../services/sslService'; // Import your SSL service module

// Create a new Express router
const router: Router = express.Router();

// Define routes for SSL-related requests

// Example SSL endpoint to get certificate data for a domain
router.get('/certificate', async (req: Request, res: Response) => {
    const domain = req.query.domain as string;

    try {
        const certificateData = await sslService.getCertificateData(domain); // Await the promise
        if (certificateData) { // Check if data exists
            console.log('Certificate data from service:', certificateData);

            const formattedData = {
                domain: certificateData.domain,
                certificateDetails: {
                    issuer: certificateData.certificateDetails.issuer,
                    validFrom: new Date(certificateData.certificateDetails.validFrom).toLocaleDateString(),
                    validTo: new Date(certificateData.certificateDetails.validTo).toLocaleDateString(),
                    serialNumber: certificateData.certificateDetails.serialNumber,
                    fingerprint: certificateData.certificateDetails.fingerprint
                }
            };

            res.json({
                message: 'Certificate data retrieved successfully', // Add human-readable message
                data: formattedData,
            });
        } else {
            res.status(500).json({ message: 'No certificate data found in response' });
        }
    } catch (error: any) {
        console.error('Error from service:', error); // Log the error
        res.status(500).json({ message: 'Failed to fetch certificate data', error: error.message });
    }
});

// Export the router to be used in the main application
export default router; 
