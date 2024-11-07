export type EntityType = 'Individual' | 'PrivateLimitedCompany' | 'LimitedCompany' | 'Trust' | 'LLP' | 'PartnershipFirm' | 'HUF';

export interface BankDetail {
  bankName: string;
  accountNumber: string;
  ifscCode: string;
}

export interface Trustee {
  name: string;
  position: string;
}

export interface Partner {
  name: string;
  designation: string;
}

export interface ClientData {
  id?: number;
  clientType: EntityType;
  name: string;
  panNumber: string;
  gstin?: string;
  registeredOfficeAddress: string;
  communicationAddress?: string;
  city?: string;
  state?: string;
  pincode: string;
  mobileNo: string;
  alternateMobileNo?: string;
  email: string;
  bankDetails: string; // This will be a JSON string
  individual?: {
    firstName: string;
    middleName?: string;
    lastName: string;
    businessName?: string;
    dateOfBusinessStarting?: string;
    groupName?: string;
  };
  company?: {
    companyType: 'PrivateLimitedCompany' | 'LimitedCompany';
    dateOfIncorporation: string;
    cinNumber: string;
    tanNumber?: string;
    authorizedCapital?: string;
    issuedCapital?: string;
    paidUpCapital?: string;
  };
  trust?: {
    dateOfIncorporation: string;
    trustees: string; // This will be a JSON string
  };
  partnership?: {
    partnershipType: 'LLP' | 'PartnershipFirm';
    dateOfIncorporation: string;
    frn?: string;
    partners: string; // This will be a JSON string
  };
  huf?: {
    dateOfIncorporation: string;
    members: string; // This will be a JSON string
  };
}