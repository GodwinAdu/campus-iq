
interface Address {
    schoolAddress?: string;
    schoolCity?: string;
    schoolState?: string;
    schoolZipcode?: string;
    schoolCountry?: string;
}
interface Notification {
    overdueSubscriptionAlert: boolean;
    emailNotifications: boolean;
    // Other notification settings
}

interface Subscription {
    period: {
        frequency: "monthly" | "3 months" | "6 months" | "yearly" | "term";
        value: number;
        price: number;
    },
    renewDate: Date;
    expiryDate: Date;
    plan: 'basic' | 'pro' | 'custom';
    currentStudent: number;
}

interface ISchool extends Document {
    _id?: Types.ObjectId;
    schoolCode: string; // Unique identifier for each school
    schoolLogo?: string; // URL for the school's logo
    establishedYear?: number; // Year the school was established
    affiliation?: string; // Affiliated education boards
    category?: "primary" | "secondary" | "college" | "university"; // School category
    type: "public" | "private" | "charter";
    schoolName: string;
    motto?: string;
    schoolPhone?: string;
    schoolEmail?: string;
    website?: string;
    addresses?: Address;
    notifications: Notification;
    subscriptionPlan: Subscription;
    banned: boolean;
    createdBy?: Types.ObjectId | null;
    modifiedBy?: Types.ObjectId | null;
    mod_flag?: boolean;
    del_flag?: boolean;
    action_type?: "create" | "update" | "delete";
    createdAt?: Date;
    updatedAt?: Date;
}

// employes types checks
interface IEmployee extends Document {
    _id?: Types.ObjectId;
    schoolId: Types.ObjectId; // Reference to the school
    username: string; // Unique username for the employee
    fullName: string; // Full name of the employee
    staffId: string; // Unique staff ID
    imgUrl?: string; // Profile image URL
    name: string;
    dob?: Date; // Date of birth
    email: string; // Unique email
    gender: string;
    phone: string;
    password: string; // Encrypted password
    religion?: string;
    permanentAddress?: string;
    presentAddress?: string;
    role: string; // Employee's role in the school
    joinedDate?: Date;
    qualification?: string;
    experience?: string;
    totalExperience?: string;
    idCardType?: string;
    idCard?: string;
    accountType?: string;
    accountName?: string;
    accountNumber?: string;
    salaryId?: Types.ObjectId | null; // Reference to Salary Structure
    departmentId?: Types.ObjectId | null; // Reference to Department
    createdBy?: Types.ObjectId | null; // Reference to the employee who created this record
    mod_flag?: boolean;
    del_flag?: boolean;
    modifiedBy?: Types.ObjectId | null; // Reference to the employee who modified this record
    deletedBy?: Types.ObjectId | null; // Reference to the employee who deleted this record
    action_type?: "create" | "update" | "delete";
    createdAt?: Date;
    updatedAt?: Date;
}

// students type check
interface IStudent extends Document {
    _id?: string;
    schoolId: Types.ObjectId;
    username: string;
    fullName: string;
    email: string;
    imgUrl?: string;
    dob: Date;
    role: string;
    gender: string;
    phone: string;
    password: string;
    addresses: Address;
    currentAddress: string;
    permanentAddress?: string;
    classId: Types.ObjectId;
    studentID: string;
    roomId?: Types.ObjectId;
    parentId?: Types.ObjectId;
    emergencyContact?: EmergencyContact;
    examResult: boolean;
    enrollmentDate?: Date;
    previousSchool?: string;
    section?: string;
    medicalHistory?: MedicalHistory;
    studentStatus: string;
    createdBy?: Types.ObjectId;
    mod_flag?: boolean;
    del_flag?: boolean;
    modifiedBy?: Types.ObjectId;
    deletedBy?: Types.ObjectId;
    action_type: "create" | "update" | "delete";
    createdAt?: Date;
    updatedAt?: Date;
}

interface Address {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    emergencyContact: EmergencyContact;
}

interface EmergencyContact {
    name: string;
    relationship: string;
    phone: string;
}


interface MedicalHistory {
    medicalConditions?: string[] | []; // A description of any known medical conditions
    medications?: string[] | []; // Any current medications being taken
    allergies?: string[] | []; // Known allergies
    immunizations?: Immunization[] | []; // List of immunizations
    medicalNotes?: string | undefined; // Additional notes from health professionals
}

interface Immunization {
    vaccineName: string; // Name of the vaccine
    dateAdministered: Date; // Date the vaccine was administered
    administeredBy: string; // Name of the person or facility administering the vaccine
}

// account types checks
interface IAccount extends Document {
    _id?: string; //
    schoolId: Types.ObjectId;
    accountName: string;
    balance: number;
    deposits: Types.Array<Types.ObjectId>;
    expenses: Types.Array<Types.ObjectId>;
    createdBy: Types.ObjectId;
    modifiedBy?: Types.ObjectId;
    deletedBy?: Types.ObjectId;
    mod_flag?: boolean;
    del_flag?: boolean;
    action_type: "create" | "update" | "delete";
    createdAt?: Date;
    updatedAt?: Date;
}


interface IClass extends Document {
    _id?: string;
    schoolId: Types.ObjectId;
    name: string;
    code: string;
    subjects: Types.ObjectId[]; // Array of Subject IDs
    students: Types.ObjectId[]; // Array of Student IDs
    teachers: Types.ObjectId[]; // Array of Teacher IDs
    createdBy?: Types.ObjectId; // Optional reference to Employee
    mod_flag: boolean;
    del_flag: boolean;
    modifiedBy?: Types.ObjectId; // Optional reference to Employee
    deletedBy?: Types.ObjectId; // Optional reference to Employee
    action_type?: "create" | "update" | "delete"; // Optional action type (could be used for actions like delete, modify, etc.)
    createdAt: Date; // Automatically handled by timestamps
    updatedAt: Date; // Automatically handled by timestamps
}

type UserType = 'Employee' | 'Teacher' | 'Student' | 'Parent';

interface IOTP {
    userId: Schema.Types.ObjectId;
    userType: UserType;
    otp: string;
    createdBy: Schema.Types.ObjectId;
    mod_flag: boolean;
    del_flag: boolean;
    modifiedBy: Schema.Types.ObjectId;
    deletedBy: Schema.Types.ObjectId;
    action_type: "create" | "update" | "delete";
    createdAt: Date;
    updatedAt: Date;
    // ... other fields
}


interface IParent extends Document {
    _id?: string;
    schoolId: Schema.Types.ObjectId;
    username: string;
    fullName: string;
    email: string;
    phone: string;
    relationship: string;
    occupation: string;
    address: string;
    password: string;
    role: string;
    children: Schema.Types.ObjectId[];
    createdBy?: Schema.Types.ObjectId | null;
    mod_flag?: boolean;
    del_flag?: boolean;
    modifiedBy?: Schema.Types.ObjectId | null;
    deletedBy?: Schema.Types.ObjectId | null;
    action_type?: "create" | "update" | "delete";
}

interface ITeacher extends Document {
    _id: string;
    username: string;
    fullName: string;
    email: string;
    dob: Date;
    password?: string;
    imgUrl: string;
    role: string;
    gender: string;
    phone: string;
    maritalStatus: string;
    country: string;
    state: string;
    city: string;
    permanentAddress?: string;
    currentAddress: string;
    kin: string;
    kinPhone: string;
    kinRelationship: string;
    idCardType: string;
    idCard: string;
    occupation: string;
    accountType: string;
    accountName: string;
    accountNumber: string;
    classId?: Schema.Types.ObjectId;
    schoolId: Schema.Types.ObjectId;
    createdBy?: Schema.Types.ObjectId | null;
    mod_flag?: boolean;
    del_flag?: boolean;
    modifiedBy?: Schema.Types.ObjectId | null;
    deletedBy?: Schema.Types.ObjectId | null;
    action_type?: "create" | "update" | "delete";
}

interface IAward extends Document {
    schoolId: Types.ObjectId;
    role: "Student" | "Employee";
    awardToId: Types.ObjectId;
    awardName: string;
    giftItem: string;
    cashPrice: number;
    awardReason: string;
    givenDate: Date;
    createdBy?: Types.ObjectId;
    mod_flag?: boolean;
    del_flag?: boolean;
    modifiedBy?: Types.ObjectId | null;
    deletedBy?: Types.ObjectId | null;
    action_type?: "create" | "update" | "delete";
    createdAt?: Date;
    updatedAt?: Date;
}

interface IBookFine extends Document {
    schoolId: Types.ObjectId;
    amount: number;
    createdBy?: Types.ObjectId;
    mod_flag?: boolean;
    del_flag?: boolean;
    modifiedBy?: Types.ObjectId | null;
    deletedBy?: Types.ObjectId | null;
    action_type?: "create" | "update" | "delete";
    createdAt?: Date;
    updatedAt?: Date;
}

interface IBookTransaction extends Document {
    schoolId: Types.ObjectId;
    bookId: Types.ObjectId;
    studentId: Types.ObjectId;
    issuedDate?: Date;
    librarian: Types.ObjectId;
    dueDate: Date;
    fine?: number;
    returnedDate?: Date;
    createdBy?: Types.ObjectId | null;
    mod_flag?: boolean;
    del_flag?: boolean;
    modifiedBy?: Types.ObjectId | null;
    deletedBy?: Types.ObjectId | null;
    action_type?: "create" | "update" | "delete";
    createdAt?: Date;
    updatedAt?: Date;
}

interface IBook extends Document {
    schoolId: Types.ObjectId;
    title: string;
    author: string;
    isbn: string;
    publicationYear: number;
    copiesAvailable?: number;
    copiesIssued?: number;
    createdBy?: Types.ObjectId | null;
    mod_flag?: boolean;
    del_flag?: boolean;
    modifiedBy?: Types.ObjectId | null;
    deletedBy?: Types.ObjectId | null;
    action_type?: "create" | "update" | "delete";
    createdAt?: Date;
    updatedAt?: Date;
}

interface IDepartment extends Document {
    _id?: string;
    schoolId: Types.ObjectId;
    name: string;
    employees?: Types.ObjectId[];
    createdBy?: Types.ObjectId | null;
    mod_flag?: boolean;
    del_flag?: boolean;
    modifiedBy?: Types.ObjectId | null;
    deletedBy?: Types.ObjectId | null;
    action_type?: "create" | "update" | "delete";
    createdAt?: Date;
    updatedAt?: Date;
}

interface IDeposit extends Document {
    schoolId: Types.ObjectId;
    accountId: Types.ObjectId;
    depositName: string;
    depositAmount: number;
    depositDate: Date;
    reference?: string;
    payVia: string;
    attachmentUrl?: string;
    createdBy?: Types.ObjectId | null;
    mod_flag?: boolean;
    del_flag?: boolean;
    modifiedBy?: Types.ObjectId | null;
    deletedBy?: Types.ObjectId | null;
    action_type?: "create" | "update" | "delete";
    createdAt?: Date;
    updatedAt?: Date;
}

interface IDistribution extends Document {
    _id?: string;
    schoolId: Types.ObjectId;
    markDistribution: string;
    createdBy?: Types.ObjectId | null;
    mod_flag?: boolean;
    delete_flag?: boolean;
    modifyBy?: Types.ObjectId | null;
    deletedBy?: Types.ObjectId | null;
    action_type?: "create" | "update" | "delete";
    createdAt?: Date;
    updatedAt?: Date;
}

interface IEmailCoin extends Document {
    schoolId: Types.ObjectId;
    coins: number;
    createdBy?: Types.ObjectId | null;
    mod_flag?: boolean;
    del_flag?: boolean;
    modifiedBy?: Types.ObjectId | null;
    deletedBy?: Types.ObjectId | null;
    action_type?: "create" | "update" | "delete";
    createdAt?: Date;
    updatedAt?: Date;
}



// Type for DistributionItem
interface IDistributionExams {
    distribution: string;
    fullMark?: number;
    passMark?: number;
}

// Type for SubjectItem
interface ISubjectItem {
    subjectName: string;
    hallId: Types.ObjectId | null;
    date?: Date;
    startTime?: string;
    endTime?: string;
    distributionItems: IDistributionExams[];
}

// Type for ExamSchedule
interface IExamSchedule extends Document {
    schoolId: Types.ObjectId;
    examId: Types.ObjectId;
    classId: Types.ObjectId;
    subjectItems: ISubjectItem[];
    createdBy?: Types.ObjectId | null;
    mod_flag?: boolean;
    del_flag?: boolean;
    modifiedBy?: Types.ObjectId | null;
    deletedBy?: Types.ObjectId | null;
    action_type?: "create" | "update" | "delete";
    createdAt: Date;
    updatedAt: Date;
}


// Type for ExamSetup
interface IExamSetup extends Document {
    schoolId: Types.ObjectId; // Reference to the school
    name: string; // Name of the exam setup (e.g., "Final Exam")
    termId: Types.ObjectId; // Reference to the term
    sessionId: Types.ObjectId; // Reference to the session
    examType: string; // Type of the exam (e.g., "Mid-Term", "Final")
    markDistributions: string[]; // List of mark distributions
    nextTerm?: string; // Information about the next term (optional)
    publish: boolean; // Whether the exam setup is published
    publishResult: boolean; // Whether the results are published
    createdBy?: Types.ObjectId | null; // Reference to the employee who created the exam setup
    mod_flag?: boolean; // Modification flag
    del_flag?: boolean; // Deletion flag
    modifiedBy?: Types.ObjectId | null; // Reference to the employee who modified the exam setup
    deletedBy?: Types.ObjectId | null; // Reference to the employee who deleted the exam setup
    action_type?: "create" | "update" | "delete"; // Action type (create, update, delete)
    createdAt: Date; // Automatically managed timestamp
    updatedAt: Date; // Automatically managed timestamp
}

// Type for ExamHall
interface IExamHall extends Document {
    _id?: string;
    schoolId: Types.ObjectId; // Reference to the school
    name: string; // Name of the exam hall (e.g., "Hall 1")
    seats: number; // Number of seats in the hall
    createdBy: Types.ObjectId; // Reference to the employee who created the exam hall
    mod_flag: boolean; // Modification flag
    del_flag: boolean; // Deletion flag
    modifiedBy?: Types.ObjectId | null; // Reference to the employee who modified the exam hall
    deletedBy?: Types.ObjectId | null; // Reference to the employee who deleted the exam hall
    createdAt: Date; // Automatically managed timestamp
    updatedAt: Date; // Automatically managed timestamp
}

// Define the TypeScript interface for the session document
interface ISession extends Document {
    _id?: string;
    schoolId: Types.ObjectId;
    name: string;
    period: string;
    present: boolean;
    createdBy?: Types.ObjectId | null;
    mod_flag: boolean;
    del_flag: boolean;
    modifiedBy?: Types.ObjectId | null;
    deletedBy?: Types.ObjectId | null;
    action_type?: "create" | "update" | "delete";
    createdAt: Date;
    updatedAt: Date;
}

// Define the Subject interface
interface ISubject extends Document {
    _id?: string;
    schoolId: Types.ObjectId;
    subjectName: string;
    subjectCredit: string;
    subjectHour: string;
    subjectAttribute: string;
    description?: string;
    status?: boolean;
    code: string;
    classId?: Types.ObjectId;
    createdBy?: Types.ObjectId | null;
    mod_flag?: boolean;
    del_flag?: boolean;
    modifiedBy?: Types.ObjectId | null;
    deletedBy?: Types.ObjectId | null;
    action_type?: "create" | "update" | "delete";
    createdAt?: Date;
    updatedAt?: Date;
}

// Define the StudentCategory interface
interface IStudentCategory extends Document {
    _id: string;
    schoolId: Types.ObjectId;
    name: string;
    students: Types.ObjectId[];
    createdBy?: Types.ObjectId | null;
    mod_flag?: boolean;
    del_flag?: boolean;
    modifiedBy?: Types.ObjectId | null;
    deletedBy?: Types.ObjectId | null;
    action_type?: "create" | "update" | "delete";
    createdAt?: Date;
    updatedAt?: Date;
}

interface IFeesStructure extends Document {
    _id?: string;
    schoolId: Types.ObjectId;
    classId: Types.ObjectId;
    termId: Types.ObjectId;
    sessionId: Types.ObjectId;
    fees: {
        category: string;
        amount: number;
    }[];
    dueDate?: Date;
    createdBy?: Types.ObjectId | null;
    mod_flag: boolean;
    del_flag: boolean;
    modifiedBy?: Types.ObjectId | null;
    deletedBy?: Types.ObjectId | null;
    action_type?: "create" | "update" | "delete";
    createdAt: Date;
    updatedAt: Date;
}

interface IFeesFine extends Document {
    _id?: string;
    schoolId: Types.ObjectId;
    classId: Types.ObjectId;
    feesType: string;
    fineType: string;
    fineAmount: number;
    frequency?: string;
    createdBy?: Types.ObjectId | null;
    mod_flag: boolean;
    del_flag: boolean;
    modifiedBy?: Types.ObjectId | null;
    deletedBy?: Types.ObjectId | null;
    action_type?: "create" | "update" | "delete";
    createdAt: Date;
    updatedAt: Date;
}


interface IAllowance {
    allowanceName: string;
    amount: number;
}

interface IDeduction {
    deductionName: string;
    amount: number;
}

interface ISalaryStructure extends Document {
    _id?: string;
    schoolId: Types.ObjectId;
    salaryName: string;
    basicSalary: number;
    overtimeRate: number;
    allowances: IAllowance[];
    deductions: IDeduction[];
    createdBy?: Types.ObjectId | null;
    mod_flag: boolean;
    delete_flag: boolean;
    modifyBy?: Types.ObjectId | null;
    deletedBy?: Types.ObjectId | null;
    action_type?: "create" | "update" | "delete";
    createdAt: Date;
    updatedAt: Date;
}

interface ISalaryPayment extends Document {
    schoolId: Types.ObjectId;
    employeeId: Types.ObjectId;
    salaryStructureId: Types.ObjectId;
    paymentDate: Date;
    paymentAmount: number;
    status: 'paid' | 'unpaid';
    createdBy?: Types.ObjectId | null;
    mod_flag: boolean;
    del_flag: boolean;
    modifiedBy?: Types.ObjectId | null;
    deletedBy?: Types.ObjectId | null;
    action_type?: "create" | "update" | "delete";
    createdAt: Date;
    updatedAt: Date;
}


interface ILeaveCategory extends Document {
    schoolId: Types.ObjectId;
    name: string;
    createdBy: Types.ObjectId;
    mod_flag: boolean;
    del_flag: boolean;
    modifiedBy?: Types.ObjectId | null;
    deletedBy?: Types.ObjectId | null;
    action_type?: "create" | "update" | "delete";
    createdAt: Date;
    updatedAt: Date;
}

interface IFeesPayment extends Document {
    schoolId: Schema.Types.ObjectId;
    invoiceNo: string;
    studentId: Schema.Types.ObjectId;
    classId: Schema.Types.ObjectId;
    termId: Schema.Types.ObjectId;
    sessionId: Schema.Types.ObjectId;
    fullName?: string;
    studentNo?: string;
    status: string;
    dueDate?: Date;
    fees: {
        category: string;
        amount: number;
        status: boolean;
        fine: number;
        discount: number;
        paid: number;
    }[];
    createdBy?: Schema.Types.ObjectId;
    mod_flag?: boolean;
    del_flag?: boolean;
    modifiedBy?: Schema.Types.ObjectId;
    deletedBy?: Schema.Types.ObjectId;
    action_type: "create" | "update" | "delete";
    createdAt?: Date;
    updatedAt?: Date;
}


interface IAttendance extends Document {
    _id?: string;
    schoolId: Types.ObjectId;
    userId: Schema.Types.ObjectId;
    userType: 'student' | 'employee';
    classId: Schema.Types.ObjectId;
    year: number;
    month: number;
    records: Map<string, boolean>; // { "1": true, "2": false, ... } - true = present, false = absent
    createdBy?: Schema.Types.ObjectId;
    mod_flag?: boolean;
    del_flag?: boolean;
    modifiedBy?: Schema.Types.ObjectId;
    deletedBy?: Schema.Types.ObjectId;
    action_type: "create" | "update" | "delete";
    createdAt?: Date;
    updatedAt?: Date;
}

interface IExpense extends Document {
    schoolId: Schema.Types.ObjectId;
    accountId: Schema.Types.ObjectId;
    expenseName: string;
    expenseAmount: number;
    expenseDate: Date;
    reference?: string;
    payVia: string;
    attachmentUrl?: string;
    createdBy?: Schema.Types.ObjectId;
    mod_flag?: boolean;
    del_flag?: boolean;
    modifiedBy?: Schema.Types.ObjectId | null;
    deletedBy?: Schema.Types.ObjectId | null;
    action_type?: "create" | "update" | "delete";
    createdAt?: Date;
    updatedAt?: Date;
}

interface DaySchedule {
    subject: string;
    type: string;
    location: string;
};

interface TimetableEntry {
    time: string;
    monday: DaySchedule;
    tuesday: DaySchedule;
    wednesday: DaySchedule;
    thursday: DaySchedule;
    friday: DaySchedule;
};

interface ITimetable {
    schoolId: Types.ObjectId;
    classId: Types.ObjectId;
    timetable: TimetableEntry[];
    createdBy?: Types.ObjectId | null;
    mod_flag?: boolean;
    del_flag?: boolean;
    modifiedBy?: Types.ObjectId | null;
    deletedBy?: Types.ObjectId | null;
    action_type?: "create" | "update" | "delete";
    createdAt?: Date;
    updatedAt?: Date;
};

// Define the interface for the House document
interface IHouse extends Document {
    _id?: string;
    schoolId: Schema.Types.ObjectId;
    name: string;
    roomIds: Schema.Types.ObjectId[];
    createdBy?: Schema.Types.ObjectId;
    mod_flag?: boolean;
    del_flag?: boolean;
    modifiedBy?: Schema.Types.ObjectId | null;
    deletedBy?: Schema.Types.ObjectId | null;
    action_type?: "create" | "update" | "delete";
    createdAt: Date;
    updatedAt: Date;
}

// Define the interface for the Room document
interface IRoom extends Document {
    _id?: string;
    schoolId: Schema.Types.ObjectId;
    name: string;
    capacity?: number;
    studentIds: Schema.Types.ObjectId[];
    createdBy?: Schema.Types.ObjectId;
    mod_flag?: boolean;
    del_flag?: boolean;
    modifiedBy?: Schema.Types.ObjectId | null;
    deletedBy?: Schema.Types.ObjectId | null;
    action_type?: "create" | "update" | "delete";
    createdAt: Date;
    updatedAt: Date;
}

interface IRoomMaintenance extends Document {
    schoolId: Types.ObjectId;
    roomId: Types.ObjectId;
    issue: string;
    status: "pending" | "in progress" | "resolved";
    createdBy: string;
    modifiedBy?: Types.ObjectId | null;
    mod_flag: boolean;
    del_flag: boolean;
    action_type: "create" | "update" | "delete";
    createdAt: Date;
    updatedAt: Date;
}

interface IInventoryCategory extends Document {
    _id?:string;
    schoolId: Types.ObjectId;
    name: string;
    products: Types.ObjectId[];
    storeId?: Types.ObjectId;
    createdBy?: Types.ObjectId | null;
    modifiedBy?: Types.ObjectId | null;
    deletedBy?: Types.ObjectId | null;
    mod_flag: boolean;
    del_flag: boolean;
    action_type?: string | null;
    createdAt: Date;
    updatedAt: Date;
}


interface IIssueItem {
    categoryId: Types.ObjectId;
    productId: Types.ObjectId;
    quantity: number;
}

interface IInventoryIssue extends Document {
    schoolId: Types.ObjectId;
    role: "Student" | "Employee" | "Parent";
    saleToId: Types.ObjectId;
    issueDate: Date;
    returnDate?: Date;
    status: string;
    issuedBy?: Types.ObjectId;
    issueItems: IIssueItem[];
    createdBy?: Types.ObjectId | null;
    modifiedBy?: Types.ObjectId | null;
    deletedBy?: Types.ObjectId | null;
    mod_flag: boolean;
    del_flag: boolean;
    action_type?: string | null;
    createdAt: Date;
    updatedAt: Date;
}


interface IInventoryProduct extends Document {
    schoolId: Types.ObjectId;
    name: string;
    categoryId?: Types.ObjectId;
    purchasePrice: number;
    salePrice: number;
    quantity: number;
    createdBy?: Types.ObjectId | null;
    modifiedBy?: Types.ObjectId | null;
    deletedBy?: Types.ObjectId | null;
    mod_flag: boolean;
    del_flag: boolean;
    action_type?: string | null;
    createdAt: Date;
    updatedAt: Date;
}


interface IPurchaseItem {
    product: Types.ObjectId;
    quantity: number;
    discount: number;
}

interface IInventoryPurchase extends Document {
    _id?: string;
    schoolId: Types.ObjectId;
    supplierId: Types.ObjectId;
    storeId: Types.ObjectId;
    status: "Pending" | "Ordered" | "Received" | "Rejected";
    purchaseDate: Date;
    purchaseItems: IPurchaseItem[];
    createdBy?: Types.ObjectId | null;
    modifiedBy?: Types.ObjectId | null;
    deletedBy?: Types.ObjectId | null;
    mod_flag: boolean;
    del_flag: boolean;
    action_type?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

interface IInventoryStore extends Document {
    _id?: string;
    schoolId: Types.ObjectId;
    name: string;
    address: string;
    contactNumber: string;
    categories: Types.ObjectId[];
    createdBy?: Types.ObjectId | null;
    modifiedBy?: Types.ObjectId | null;
    deletedBy?: Types.ObjectId | null;
    mod_flag: boolean;
    del_flag: boolean;
    action_type?: string | null;
    createdAt: Date;
    updatedAt: Date;
}

interface IInventorySupplier extends Document {
    _id?:string;
    schoolId: Types.ObjectId;
    name: string;
    email: string;
    companyName?: string;
    contactNumber: string;
    address: string;
    createdBy?: Types.ObjectId | null;
    modifiedBy?: Types.ObjectId | null;
    deletedBy?: Types.ObjectId | null;
    mod_flag: boolean;
    del_flag: boolean;
    action_type?: string | null;
    createdAt: Date;
    updatedAt: Date;
  }



type UserIdParams = Promise<{ userId: string }>
type SchoolIdParams = Promise<{ schoolId: string }>
type SchoolIdAndUserIdParams = Promise<{ schoolId: string, userId: string }>