import RegistrationRequestResponseList from "../dtos/in/RegistrationRequestResponseList";

export const requestsMock: RegistrationRequestResponseList = {
    registrationRequests:[
        {
            iamId: 'iam1',
            id: 'id1',
            email: 'email 1',
            name: 'name 1',
            phoneNumber: 'phoneNumber 1',
            nif: 'nif 1',
            status: 'status 1',
            creationTime: 'creationTime 1',
            actionTime: 'actionTime 1',
            actionedBy: 'actionedBy 1',
        },
        {
            iamId: 'iam2',
            id: 'id2',
            email: 'email 2',
            name: 'name 2',
            phoneNumber: 'phoneNumber 2',
            nif: 'nif 2',
            status: 'status 2',
            creationTime: 'creationTime 2',
            actionTime: 'actionTime 2',
            actionedBy: 'actionedBy 2',
        }
    ]
}