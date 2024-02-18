export class CertificationData {
    domain: string;
    certificateDetails: {
        issuer: {
            C: string;
            O: string;
            CN: string;
        };
        validFrom: string;
        validTo: string;
        serialNumber: string;
        fingerprint: string;
    };

    constructor(formattedData: any) {
        this.domain = formattedData.domain;
        this.certificateDetails = {
            issuer: formattedData.certificateDetails.issuer,
            validFrom: formattedData.certificateDetails.validFrom,
            validTo: formattedData.certificateDetails.validTo,
            serialNumber: formattedData.certificateDetails.serialNumber,
            fingerprint: formattedData.certificateDetails.fingerprint
        };
    }
}
