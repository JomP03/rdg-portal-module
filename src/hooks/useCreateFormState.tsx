import React from "react";
import {useState} from 'react';
import {SelectChangeEvent} from '@mui/material';


export function useCreateFormState() {
    // form and setForm are used to store the values of the form
    const [formContent, setFormContent]
        = useState<{ [key: string]: string }>({});

    const [formContentMultiSelect, setFormContentMultiSelect]
        = useState<{ [key: string]: string[] }>({});


    // handleChangeTextField is used to update the form values when the user types in the text fields
    const handleChangeTextField = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormContent({
            ...formContent,
            [e.target.name]: e.target.value
        });
    };

    // handleChangeSelect is used to update the form values when the user selects an option from the combo box
    const handleChangeSelect = (e: SelectChangeEvent) => {
        setFormContent({
            ...formContent,
            [e.target.name]: e.target.value
        });
    };

    const handleChangeMultiSelect = (e: SelectChangeEvent<string[]>) => {
        setFormContentMultiSelect({
            ...formContentMultiSelect,
            [e.target.name]: e.target.value as string[]
        });
    }

    return {
        formContent,
        formContentMultiSelect,
        handleChangeTextField,
        handleChangeSelect,
        handleChangeMultiSelect
    };
}