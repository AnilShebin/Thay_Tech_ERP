export type EntityType = 'Individual' | 'PrivateLimitedCompany' | 'LimitedCompany' | 'Trust' | 'LLP' | 'PartnershipFirm' | 'HUF';

export interface BankDetail {
  id: string;
  bankName: string;
  branch: string;
  accountType: string;
  accountNo: string;
  ifscCode: string;
}

export interface ContactPerson {
  id: string;
  name: string;
  designation: string;
  phoneNumber: string;
  email: string;
}

export interface TrusteeDetail {
  id: string;
  name: string;
  pan: string;
  authorizedSignatory: boolean;
  permanentAddress: string;
  presentAddress: string;
}

export interface PartnerDetail {
  id: string;
  name: string;
  pan: string;
  authorizedSignatory: boolean;
  address: string;
  profitRatio: number;
}

export interface MemberDetail {
  id: string;
  name: string;
  relation: string;
  authorizedSignatory: boolean;
  pan: string;
  address: string;
  profitRatio: number;
}

export interface Entity {
  id?: string;
  type: EntityType;
  details: Record<string, any>;
  bankDetails: BankDetail[];
  contactPersons: ContactPerson[];
  trusteeDetails?: TrusteeDetail[];
  partnerDetails?: PartnerDetail[];
  memberDetails?: MemberDetail[];
}