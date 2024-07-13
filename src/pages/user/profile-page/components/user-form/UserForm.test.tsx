import {fireEvent, render} from "@testing-library/react";
import UserForm from "./UserForm";


describe('SignUpRequestForm', () => {
    const handleChangeTextField = jest.fn();

    it('should place the correct elements', () => {
        const {getAllByRole, getByLabelText} = render(
            <UserForm
            name={""}
            nif={""}
            phoneNumber={""}
            handleChangeTextField={handleChangeTextField} 
            isEndUser={true}
            />
        );

        // Test if the fields are being rendered correctly
        const textField = getAllByRole('textbox');
        expect(textField.length).toBe(3);
        expect(getByLabelText('Name*')).toBeInTheDocument();
        expect(getByLabelText('Nif*')).toBeInTheDocument();
        expect(getByLabelText('Phone Number*')).toBeInTheDocument();

    });

    it('should handle inputs change', () => {
        const handleChangeTextField = jest.fn();


        const {getByLabelText} = render(
            <UserForm
            name={""}
            nif={""}
            phoneNumber={""}
            handleChangeTextField={handleChangeTextField} 
            isEndUser={true}
            />
        );

    
        fireEvent.change(getByLabelText('Name*'), {target: {value: 'Name'}});
        expect(handleChangeTextField).toHaveBeenCalled();

        fireEvent.change(getByLabelText('Nif*'), {target: {value: 'Nif'}});
        expect(handleChangeTextField).toHaveBeenCalled();

        fireEvent.change(getByLabelText('Phone Number*'), {target: {value: 'Phone Number'}});
        expect(handleChangeTextField).toHaveBeenCalled();

    });

    it('UserForm works correctly', () => {
        const handleChangeTextField = jest.fn();


        const {getByLabelText} = render(
            <UserForm
            name={""}
            nif={""}
            phoneNumber={""}
            handleChangeTextField={handleChangeTextField} 
            isEndUser={true}
            />
        );

        const textField = getByLabelText('Name*');
        const textField2 = getByLabelText('Nif*');
        const textField3 = getByLabelText('Phone Number*');

        // Test if the fields are being correctly filled


        textField.textContent = 'This is a test comment';
        expect(textField.textContent).toBe('This is a test comment');

        textField2.textContent = 'This is a test nif';
        expect(textField2.textContent).toBe('This is a test nif');

        textField3.textContent = 'This is a test phone number';
        expect(textField3.textContent).toBe('This is a test phone number');

    });
    
});

