// External dependencies
import { ObjectId } from 'mongodb';

// Interface for CertificationData with ownerEmail property
export default class Certificate {
constructor(
  public domain: string,
  public certificateDetails: {
    issuer: { C: string; O: string; CN: string };
    validFrom: string;
    validTo: string;
    serialNumber: string;
    fingerprint: string;
  },
  public ownerEmail: string // Added owner's email property

){};
}

// Certificate model class implementing the CertificationData interface
