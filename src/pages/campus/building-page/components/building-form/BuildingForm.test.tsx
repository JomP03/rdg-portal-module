import {fireEvent, render} from "@testing-library/react";
import React from "react";
import BuildingForm from "./BuildingForm";

describe('BuildingForm', () => {
    const handleChangeTextField = jest.fn();

    test('BackofficeUserForm works correctly', () => {
        const {getAllByRole, getByLabelText, container} = render(
            <BuildingForm
                codeValue=""
                nameValue=""
                descriptionValue=""
                widthValue=""
                lengthValue=""
                handleChangeTextField={handleChangeTextField}
            />
        );

        const textField = getAllByRole('textbox');
        expect(textField.length).toBe(5);
        expect(getByLabelText('Code*')).toBeInTheDocument();
        expect(getByLabelText('Name')).toBeInTheDocument();
        expect(getByLabelText('Description')).toBeInTheDocument();
        expect(getByLabelText('Width*')).toBeInTheDocument();
        expect(getByLabelText('Length*')).toBeInTheDocument();
    });

    test('BackofficeUserForm inputs change', () => {
        const handleChangeTextField = jest.fn();
        const {getByLabelText} = render(
            <BuildingForm
                codeValue=""
                nameValue=""
                descriptionValue=""
                widthValue=""
                lengthValue=""
                handleChangeTextField={handleChangeTextField}
            />
        );

        const codeInput = getByLabelText('Code*');
        const nameInput = getByLabelText('Name');
        const descriptionInput = getByLabelText('Description');
        const widthInput = getByLabelText('Width*');
        const lengthInput = getByLabelText('Length*');

        expect(codeInput).toBeInTheDocument();
        expect(nameInput).toBeInTheDocument();
        expect(descriptionInput).toBeInTheDocument();
        expect(widthInput).toBeInTheDocument();
        expect(lengthInput).toBeInTheDocument();

        fireEvent.change(codeInput, {target: {value: 'Code'}});
        fireEvent.change(nameInput, {target: {value: 'Name'}});
        fireEvent.change(descriptionInput, {target: {value: 'Description'}});
        fireEvent.change(widthInput, {target: {value: 'Width'}});
        fireEvent.change(lengthInput, {target: {value: 'Length'}});

        expect(handleChangeTextField).toHaveBeenCalledTimes(5);
    });
});