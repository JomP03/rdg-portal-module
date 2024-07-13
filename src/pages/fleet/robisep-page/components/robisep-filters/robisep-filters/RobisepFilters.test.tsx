import {fireEvent, getByText, render} from "@testing-library/react";
import RobisepFilters from "./RobisepFilters";


describe('RobisepFilters', () => {

    const handleChangeTextField = jest.fn();

    it('Basic render', () => {
      const {getByPlaceholderText, getByLabelText, getByText} = render(<RobisepFilters
        handleDataChange={handleChangeTextField} setIsFilterOn={() => {}}
      />);

      // Check if the form is rendered
      expect(getByText('By Nickname')).toBeInTheDocument();
      expect(getByPlaceholderText('Enter a nickname')).toBeInTheDocument();
      expect(getByText('By Task Type')).toBeInTheDocument();
      expect(getByLabelText('Task Types')).toBeInTheDocument();
    });

  it('Check that apply button works', async () => {
    const {getAllByText} = render(<RobisepFilters
      handleDataChange={handleChangeTextField} setIsFilterOn={() => {}}
    />);

    const buttons = getAllByText('Apply');
    expect(buttons.length).toBe(2);

    // Click the button
    fireEvent.click(buttons[0]);

    // Check if the button is enabled
    expect(buttons[0]).toBeEnabled();
    expect(buttons[1]).toBeEnabled();
  });
});