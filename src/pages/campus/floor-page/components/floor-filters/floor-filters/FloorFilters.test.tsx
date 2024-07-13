import {fireEvent, render} from "@testing-library/react";
import FloorFilters from "./FloorFilters";


describe('FloorFilters', () => {

  const handleChangeTextField = jest.fn();

  it('Basic render', () => {
    const {getAllByLabelText, getByText} = render(<FloorFilters
      handleDataChange={handleChangeTextField} setIsFilterOn={() => {}}
    />);

    // Check if the form is rendered
    expect(getByText('Floors By Building')).toBeInTheDocument();
    expect(getByText('Floors With Passage By Building')).toBeInTheDocument();
    expect(getByText('Floors With Elevator By Building')).toBeInTheDocument();
    const comboBox = getAllByLabelText('Building');
    expect(comboBox.length).toBe(3);
  });

  it('Check that apply button works', async () => {
    const {getAllByText} = render(<FloorFilters
      handleDataChange={handleChangeTextField} setIsFilterOn={() => {}}
    />);

    const buttons = getAllByText('Apply');
    expect(buttons.length).toBe(3);

    // Click the button
    fireEvent.click(buttons[0]);
    fireEvent.click(buttons[1]);
    fireEvent.click(buttons[2]);

    // Check if the button is enabled
    expect(buttons[0]).toBeEnabled();
    expect(buttons[1]).toBeEnabled();
    expect(buttons[2]).toBeEnabled();
  });
});