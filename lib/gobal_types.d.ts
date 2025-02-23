interface Immunization {
    vaccineName: string;
    dateAdministered: Date;
    administeredBy: string;
}

interface MedicalHistory {
    medicalConditions: string[];
    medications: string[];
    allergies: string[];
    immunizations: Immunization[];
    medicalNotes?: string;
}

interface PersonalInfo {
    fullName: string;
    imgUrl?: string;
    dob?: Date;
    email: string;
    gender?: "Male" | "Female" | "Other";
    phone?: string;
    religion?: string;
    maritalStatus?: "Single" | "Married" | "Divorced" | "Widowed";
    addresses?: {
        street?: string;
        city?: string;
        state?: string;
        zipCode?: string;
        country?: string;
    };
    emergencyContact?: {
        name: string;
        relationship: string;
        phone: string;
        email?: string;
    };
    currentAddress?: string;
    permanentAddress?: string;
}

interface Identification {
    idCardType: string;
    idCard: string;
    socialSecurityNumber?: string;
    taxIdentificationNumber?: string;
    workPermit: boolean;
    bankDetails?: {
        accountName: string;
        accountNumber: string;
        bankName: string;
    };
}

interface Employment {
    dateOfJoining: Date;
    jobTitle: string;
    departmentId: string;
    classIds: string[];
    workSchedule: "Full-time" | "Part-time";
}
interface ProfessionalDetails {
    highestDegree: {
        degree: string;
        institution: string;
        year: number;
    };
    certifications?: string[];
    specialization?: string[];
    experienceYears: number;
    previousEmployment: {
        school: string;
        position: string;
        duration: string;
    }[];
    references?: {
        name?: string;
        contact?: string;
        relationship?: string;
    }[];
    backgroundCheck?: {
        criminalRecord: boolean;
        details?: string;
    };
}
interface employeeSchema {
    personalInfo: PersonalInfo;
    role: string;
    identification?: Identification;
    employment: Employment;
    professionalDetails?: ProfessionalDetails;
    medicalHistory: MedicalHistory;
}


interface StudentCanteen extends IStudent {
    payed: boolean;
}

type EmailFolder = "inbox" | "sent" | "drafts" | "important" | "trash"

type EmailLabel = "work" | "personal" | "urgent" | "follow-up"

type Email = {
    id: string
    sender: string
    recipients: string[]
    subject: string
    message: string
    time: string
    unread: boolean
    attachments?: {
        name: string
        url: string
    }[]
    folder: EmailFolder
    labels: EmailLabel[]
}

type EmailFilter = {
    folder: EmailFolder
    labels: EmailLabel[]
    search: string
}

