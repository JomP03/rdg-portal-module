import {fireEvent, render} from "@testing-library/react";
import FloorsTable from "./FloorsTable";
import {floorsMock} from "../../../../../mocks/floorsMock";


describe('FloorTable', () => {
  const sendData = jest.fn();
  const useApiRequest = require('../../../../../hooks/useApiRequest');

  beforeEach(() => {
    const usePatchSpy = jest.spyOn(useApiRequest, 'useDataPatch');

    usePatchSpy.mockReturnValue({
      sendData: sendData(),
      loading: false,
    });
  });

  // Basic page rendering
  test('renders robisep table', () => {
    const { getByText, getAllByText, getByTitle} = render(<FloorsTable floors={floorsMock} isFilterOn={0} setIsFilterOn={() => {}}
                                                refreshData={() => {}} loading={false} error={null}/>);

    // Check if all columns are rendered
    expect(getByText('Building Code')).toBeInTheDocument();
    expect(getAllByText('Floor Number')[0]).toBeInTheDocument();
    expect(getAllByText('Floor Description')[0]).toBeInTheDocument();
    expect(getAllByText('Floor Plan')[0]).toBeInTheDocument();
    expect(getByText('Action')).toBeInTheDocument();
    expect(getByTitle('Filter Menu')).toBeInTheDocument();
  });

  // Check if the data is placed in the table
  test('renders table data', () => {
    const { getByText, getAllByText } = render(<FloorsTable floors={floorsMock} isFilterOn={0} setIsFilterOn={() => {}}
                                                              refreshData={() => {}} loading={false} error={null}/>);
    expect(getByText('Code1')).toBeInTheDocument();
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('Floor 1')).toBeInTheDocument();

    expect(getByText('Code2')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('Floor 2')).toBeInTheDocument();

    expect(getAllByText('no floor plan')[0]).toBeInTheDocument();
  });

  // Check if the page has refresh button
  test('previous and next buttons', () => {
    const { getByText } = render(<FloorsTable floors={floorsMock} isFilterOn={-1} setIsFilterOn={() => {}}
                                                refreshData={() => {}} loading={false} error={null}/>);
    expect(getByText('Refresh')).toBeInTheDocument();
  });
  test('renders table data', () => {
    const { getByText, getAllByText } = render(<FloorsTable floors={floorsMock} isFilterOn={0} setIsFilterOn={() => {}}
                                                              refreshData={() => {}} loading={false} error={null}/>);
    expect(getAllByText('Code1')[0]).toBeInTheDocument();
    expect(getByText('1')).toBeInTheDocument();
    expect(getByText('Floor 1')).toBeInTheDocument();

    expect(getByText('Code2')).toBeInTheDocument();
    expect(getByText('2')).toBeInTheDocument();
    expect(getByText('Floor 2')).toBeInTheDocument();
    expect(getAllByText('no floor plan')[0]).toBeInTheDocument();
  });


  it('should render the filter and open the filter menu', async () => {
    const { getByText, getByTitle, getAllByText } = render(<FloorsTable floors={floorsMock} isFilterOn={0} setIsFilterOn={() => {}}
                                                                          refreshData={() => {}} loading={false} error={null}/>);
    const filterButton = getByTitle('Filter Menu');
    fireEvent.click(filterButton);
    expect(getByText('Filter Floors')).toBeInTheDocument();
    const byBuilding = getByText('Floors By Building');
    expect(byBuilding).toBeInTheDocument();
    fireEvent.click(byBuilding);

    const byPassageWIthBuilding = getByText('Floors With Passage By Building');
    expect(byPassageWIthBuilding).toBeInTheDocument();
    fireEvent.click(byPassageWIthBuilding);

    const withElevatorByBuilding = getByText('Floors With Elevator By Building');
    expect(withElevatorByBuilding).toBeInTheDocument();
    fireEvent.click(withElevatorByBuilding);

    const button = getAllByText('Apply')[0];
    expect(button).toBeInTheDocument();

    // Apply the filter
    fireEvent.click(button);
    // Check if button was clicked
    expect(button).toBeEnabled();
  });


  it('should render the edit modal', () => {
    const { getByText, getAllByAltText, getAllByPlaceholderText } = render(<FloorsTable floors={floorsMock} isFilterOn={0} setIsFilterOn={() => {}}
                                                                 refreshData={() => {}} loading={false} error={null}/>);
    const editButton = getAllByAltText('Image Not Found')[1];
    fireEvent.click(editButton!);
    expect(getByText('Edit the Floor')).toBeInTheDocument();

    // Check if the form is filled with the correct data
    expect(getByText('Edit the Floor')).toBeInTheDocument();
    expect(getAllByPlaceholderText('Enter a Floor Number')[0]).toBeInTheDocument();
    expect(getAllByPlaceholderText('Enter a Floor Description')[0]).toBeInTheDocument();

    // Check if the buttons are rendered
    const submitButton = getByText('Submit');
    expect(getByText('Select a Floor Plan')).toBeInTheDocument();

    // Disable Robisep
    fireEvent.click(submitButton);

    // Check if the sendData function is called
    expect(sendData).toHaveBeenCalled();
  });
});

