import { render, fireEvent } from '@testing-library/react';
import {SignUpRequestInDto} from '../../../../../dtos/in/RegistrationRequestResponseList';
import SignUpRequestTable from './SignUpRequestTable';

/*
export default interface SignUpRequestInDto {
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
*/

const requests: SignUpRequestInDto[] = [
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
    },
];


describe('SignUpRequestTable', () => {

    const refreshData = jest.fn();
    const sendData = jest.fn();
    const jwtDecode = require('jwt-decode');
    const useApiRequest = require('../../../../../hooks/useApiRequest');

    beforeEach(() => {

        const usePatchSpy = jest.spyOn(useApiRequest, 'useUserPatch');
        const useGetSpy = jest.spyOn(useApiRequest, 'useDataGet');

        usePatchSpy.mockReturnValue({
            data: undefined,
            loading: false,
            sendData: jest.fn(),
        });

        useGetSpy.mockReturnValue({
            data: undefined,
            error: undefined,
            loading: false,
            refreshData: jest.fn(),
        });
        // Create a spy for the jwtDecode hook
        const jwtDecodeSpy = jest.spyOn(jwtDecode, 'jwtDecode');
        // Simulate the jwtDecode hook
        jwtDecodeSpy.mockReturnValue({
            sub: '1',
        });
    });

    afterEach(() => {
        // restore the spy created with spyOn
        jest.restoreAllMocks();
    });

    it('should render the SignUpRequestTable component', () => {
        const {getByText} = render(<SignUpRequestTable requests={requests} error={null} loading={false}
                                                   refreshData={() => {
                                                   }}/>);
        expect(getByText('Name')).toBeInTheDocument();
        expect(getByText('Email')).toBeInTheDocument();
        expect(getByText('Nif')).toBeInTheDocument();
        expect(getByText('Phone Number')).toBeInTheDocument();
    });

    it('renders requests data when requests array is not empty', () => {
        const {getByText} = render(<SignUpRequestTable requests={requests} error={null} loading={false}
            refreshData={() => {
            }}/>);
        expect(getByText('email 1')).toBeInTheDocument();
        expect(getByText('email 2')).toBeInTheDocument();
        expect(getByText('name 1')).toBeInTheDocument();
        expect(getByText('name 2')).toBeInTheDocument();
        expect(getByText('phoneNumber 1')).toBeInTheDocument();
        expect(getByText('phoneNumber 2')).toBeInTheDocument();
        expect(getByText('nif 1')).toBeInTheDocument();
        expect(getByText('nif 2')).toBeInTheDocument();
    });

    it('renders refresh button', () => {
        const {getByText} = render(<SignUpRequestTable requests={requests} error={null} loading={false}
            refreshData={() => {
            }}/>);
        expect(getByText('Refresh')).toBeInTheDocument();
    });

    it('refresh button', () => {
        const refreshData = jest.fn();
        const {getByText} = render(<SignUpRequestTable requests={requests} error={null} loading={false}
            refreshData={refreshData}/>);
        fireEvent.click(getByText('Refresh'));
        expect(refreshData).toHaveBeenCalledTimes(2);
    });

    it('previous and next buttons', () => {
        const {getByTitle} = render(<SignUpRequestTable requests={requests} error={null} loading={false}
            refreshData={refreshData}/>);
        expect(getByTitle('Previous Page')).toBeInTheDocument();
        expect(getByTitle('Next Page')).toBeInTheDocument();
    });


});


