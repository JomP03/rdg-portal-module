export default interface RegistrationRequestResponseList {
    registrationRequests: SignUpRequestInDto[];
}

export interface SignUpRequestInDto {
    iamId: string;
    id: string;
    email: string;
    name: string;
    phoneNumber: string;
    nif: string;
    status: string;
    creationTime: string;
    actionTime: string;
    actionedBy: string;
}