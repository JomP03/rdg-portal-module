import {fireEvent, render} from "@testing-library/react";
import EditFloorForm from "./EditFloorForm";


describe('EditFloorForm', () => {

      const handleClose = jest.fn();
      const refreshData = jest.fn();

      it('Basic render', () => {
        const {getByPlaceholderText, getByText} = render(<EditFloorForm
          formData={{}} handleCloseModal={handleClose} refreshData={refreshData}
        />);

        // Check if the form is rendered
        expect(getByPlaceholderText('Enter a Floor Number')).toBeInTheDocument();
        expect(getByPlaceholderText('Enter a Floor Description')).toBeInTheDocument();
        expect(getByText('Select a Floor Plan')).toBeInTheDocument();
        expect(getByText('Submit')).toBeInTheDocument();
      });

  it('Check that the button works', async () => {
    const {getByText} = render(<EditFloorForm
      formData={{}}
      handleCloseModal={handleClose}
      refreshData={refreshData}
    />);

    const button = getByText('Submit');
    expect(button).toBeInTheDocument();

    // Click the button
    fireEvent.click(button);
    // Check if the button is enabled
    expect(button).toBeEnabled();
  });
});