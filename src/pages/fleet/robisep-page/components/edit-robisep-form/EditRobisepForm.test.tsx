import {fireEvent, getByText, render} from "@testing-library/react";
import EditRobisepForm from "./EditRobisepForm";


describe('EditRobisepForm', () => {

      const handleClose = jest.fn();
      const refreshData = jest.fn();

  it('Basic render', async () => {
    const {getByText} = render(<EditRobisepForm
      formData={{}}
      handleCloseModal={handleClose}
      refreshData={refreshData}
    />);
    expect(getByText('Disable Robisep')).toBeInTheDocument();
  });

      it('Check that the button works', async () => {
        const {getByText} = render(<EditRobisepForm
          formData={{}}
          handleCloseModal={handleClose}
          refreshData={refreshData}
        />);

        const button = getByText('Disable Robisep');
        expect(button).toBeInTheDocument();

        // Click the button
        fireEvent.click(button);
        // Check if the button is enabled
        expect(button).toBeEnabled();
      });
});