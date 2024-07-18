import express, { Request, Response } from "express";
import { authenticateToken } from '../middleware/AuthenticateToken'; // Import your authentication middleware
import Certificate from '../models/Certificate'; // Import your Certificate model
import { collections } from '../services/database.service';

//Global Config
export const dashboardRouter = express.Router();
dashboardRouter.use(express.json());

//GET
dashboardRouter.get('/', authenticateToken, async (req: Request, res: Response) => {
    try {
        const userEmail = req.user?.email;
        console.log(userEmail);

        if (!userEmail) {
            return res.status(401).json({ message: 'Unauthorized' }); 
        }
        if (!collections.certificates) {
            throw new Error("Certificates collection is not initialized");
        }

        const certificateDocuments = await collections.certificates.find({ ownerEmail: userEmail }).toArray();

        const certificates: Certificate[] = certificateDocuments?.map(doc => {
            const { _id, domain, certificateDetails, ownerEmail } = doc;
            return new Certificate(domain, certificateDetails, ownerEmail);

        })

        res.status(200).json({ certificates });
    } catch (error) {
        console.error('Error fetching certificates:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//POST
dashboardRouter.post('/', authenticateToken, async (req: Request, res: Response) => {
    try {
        const userEmail = req.user?.email;
        if (!userEmail) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const { domain, certificateDetails } = req.body;

        if (!domain || !certificateDetails) {
            return res.status(400).json({ message: 'Missing domain or certificate details' });
        }
        if (!collections.certificates) {
            throw new Error("Certificates collection is not initialized");
        }

        const newCertificate = new Certificate(domain, certificateDetails, userEmail);
        const result = await collections.certificates.insertOne(newCertificate);

        res.status(201).json({ message: 'Certificate created successfully', certificate:result.insertedId});
    } catch (error) {
        console.error('Error creating certificate:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

