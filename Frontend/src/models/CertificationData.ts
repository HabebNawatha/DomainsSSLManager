export interface CertificationData {
    domain: string;
    certificateDetails: {
      issuer: { C: string; O: string; CN: string };
      validFrom: string;
      validTo: string;
      serialNumber: string;
      fingerprint: string;
    };
  }
  
  export class CertificationData {
    domain: string;
    certificateDetails: {
      issuer: { C: string; O: string; CN: string };
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
        fingerprint: formattedData.certificateDetails.fingerprint,
      };
    }
  }
  
  // Move sorting logic outside the class
  export function sortByDomainNameAsc(data: CertificationData[]): CertificationData[] {
    return data.sort((a, b) => a.domain.localeCompare(b.domain));
  }
  
  export function sortByDomainNameDesc(data: CertificationData[]): CertificationData[] {
    return data.sort((a, b) => b.domain.localeCompare(a.domain)); // Sort by domain name (Z-A)
  }
  
  export function sortByValidToDateAsc(data: CertificationData[]): CertificationData[] {
    return data.sort((a, b) => {
      const dateA = new Date(a.certificateDetails.validTo);
      const dateB = new Date(b.certificateDetails.validTo);
      return dateA.getTime() - dateB.getTime(); // Sort by milliseconds (ascending)
    });
  }
  
  export function sortByValidToDateDesc(data: CertificationData[]): CertificationData[] {
    return data.sort((a, b) => {
      const dateA = new Date(a.certificateDetails.validTo);
      const dateB = new Date(b.certificateDetails.validTo);
      return dateB.getTime() - dateA.getTime(); // Sort by milliseconds (descending)
    });
  }
  