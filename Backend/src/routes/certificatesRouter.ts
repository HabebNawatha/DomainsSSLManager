import express, { Request, Response, Router } from 'express';
import certificateController from '../controllers/certificateController'

// Global Config
export const certificatesRouter: Router = express.Router();

//GET certificate
certificatesRouter.get('/certificate', async (req: Request, res: Response) => {
    const domain = req.query.domain as string;

    try {
        const certificateData = await certificateController.getCertificateData(domain);
        if (certificateData) {
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
            console.log("formatted data: ",formattedData);
            res.json({
                message: 'Certificate data retrieved successfully',
                data: formattedData,
            });
        } else {
            res.status(500).json({ message: 'No certificate data found in response' });
        }
    } catch (error: any) {
        console.error('Error from service:', error);
        res.status(500).json({ message: 'Failed to fetch certificate data', error: error.message });
    }
});

