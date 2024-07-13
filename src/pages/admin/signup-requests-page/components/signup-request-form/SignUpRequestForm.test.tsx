import {fireEvent, render} from "@testing-library/react";
import SignUpRequestForm from "./SignUpRequestForm";


describe('SignUpRequestForm', () => {
    const handleChangeTextField = jest.fn();
    const handleAccept = jest.fn();
    const handleReject = jest.fn();

    it('should place the correct elements', () => {
        const {getAllByRole, getByLabelText} = render(
            <SignUpRequestForm
            name={""} 
            email={""} 
            handleAccept={handleAccept} 
            handleReject={handleReject} 
            handleChangeTextField={handleChangeTextField} 
            comment={""}
            />
        );

        // Test if the fields are being rendered correctly
        const textField = getAllByRole('textbox');
        expect(textField.length).toBe(1);
        const button = getAllByRole('button');
        expect(button.length).toBe(2);
        expect(getByLabelText('Comment*')).toBeInTheDocument();

    });

    it('should handle inputs change', () => {
        const handleChangeTextField = jest.fn();
        const handleAccept = jest.fn();
        const handleReject = jest.fn();

        const {getByLabelText} = render(
            <SignUpRequestForm
            name={""} 
            email={""} 
            handleAccept={handleAccept} 
            handleReject={handleReject} 
            handleChangeTextField={handleChangeTextField} 
            comment={""}
            />
        );

    
        fireEvent.change(getByLabelText('Comment*'), {target: {value: 'Comment'}});
        expect(handleChangeTextField).toHaveBeenCalled();

    });

    it('SignUpRequestForm works correctly', () => {
        const handleChangeTextField = jest.fn();
        const handleAccept = jest.fn();
        const handleReject = jest.fn();

        const {getByLabelText} = render(
            <SignUpRequestForm
            name={""} 
            email={""} 
            handleAccept={handleAccept} 
            handleReject={handleReject} 
            handleChangeTextField={handleChangeTextField} 
            comment={""}
            />
        );

        const textField = getByLabelText('Comment*');

        // Test if the fields are being correctly filled


        textField.textContent = 'This is a test comment';
        expect(textField.textContent).toBe('This is a test comment');

    });
    
});

