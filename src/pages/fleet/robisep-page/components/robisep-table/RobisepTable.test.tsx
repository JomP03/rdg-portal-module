import {robisepsMock} from "../../../../../mocks/robisepsMock";
import {fireEvent, render} from "@testing-library/react";
import RobisepsTable from "./RobisepsTable";



describe('RobisepTable', () => {

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
    const { getByText } = render(<RobisepsTable robiseps={robisepsMock} isFilterOn={0} setIsFilterOn={() => {}}
                             refreshData={() => {}} loading={false} error={null}/>);

    // Check if all columns are rendered
    expect(getByText('Nickname')).toBeInTheDocument();
    expect(getByText('Serial Number')).toBeInTheDocument();
    expect(getByText('Code')).toBeInTheDocument();
    expect(getByText('Descripton')).toBeInTheDocument();
    expect(getByText('State')).toBeInTheDocument();
    expect(getByText('Robisep Type')).toBeInTheDocument();
    expect(getByText('Action')).toBeInTheDocument();
  });

  // Check if the data is placed in the table
  test('renders table data', () => {
    const { getByText, getAllByText } = render(<RobisepsTable robiseps={robisepsMock} isFilterOn={0} setIsFilterOn={() => {}}
                             refreshData={() => {}} loading={false} error={null}/>);
    expect(getAllByText('Robisep 1')[0]).toBeInTheDocument();
    const ones = getAllByText('1');
    expect(ones.length).toBe(2);
    expect(getByText('Descripton 1')).toBeInTheDocument();
    expect(getAllByText('ACTIVE')[0]).toBeInTheDocument();

    expect(getByText('Robisep 2')).toBeInTheDocument();
    const twos = getAllByText('2');
    expect(twos.length).toBe(2);
    expect(getByText('Descripton 2')).toBeInTheDocument();
  });

  // Check if the page has refresh button
  test('previous and next buttons', () => {
    const { getByText } = render(<RobisepsTable robiseps={robisepsMock} isFilterOn={-1} setIsFilterOn={() => {}}
                                             refreshData={() => {}} loading={false} error={null}/>);
    expect(getByText('Refresh')).toBeInTheDocument();
  });
  test('renders table data', () => {
    const { getByText, getAllByText } = render(<RobisepsTable robiseps={robisepsMock} isFilterOn={0} setIsFilterOn={() => {}}
                                                              refreshData={() => {}} loading={false} error={null}/>);
    expect(getAllByText('Robisep 1')[0]).toBeInTheDocument();
    const ones = getAllByText('1');
    expect(ones.length).toBe(2);
    expect(getByText('Descripton 1')).toBeInTheDocument();
    expect(getAllByText('ACTIVE')[0]).toBeInTheDocument();

    expect(getByText('Robisep 2')).toBeInTheDocument();
    const twos = getAllByText('2');
    expect(twos.length).toBe(2);
    expect(getByText('Descripton 2')).toBeInTheDocument();
  });


  it('should render the filter and open the filter menu', async () => {
    const { getByText, getByTitle, getAllByText } = render(<RobisepsTable robiseps={robisepsMock} isFilterOn={0} setIsFilterOn={() => {}}
                                                                          refreshData={() => {}} loading={false} error={null}/>);
    const filterButton = getByTitle('Filter Menu');
    fireEvent.click(filterButton);
    expect(getByText('Filter Robiseps')).toBeInTheDocument();
    const byNickname = getByText('By Nickname');
    expect(byNickname).toBeInTheDocument();
    fireEvent.click(byNickname);

    const byTaskType = getByText('By Task Type');
    expect(byTaskType).toBeInTheDocument();
    fireEvent.click(byTaskType);

    const button = getAllByText('Apply')[0];
    expect(button).toBeInTheDocument();

    // Apply the filter
    fireEvent.click(button);
    // Check if button was clicked
    expect(button).toBeEnabled();
  });


  it('should render the edit modal', () => {
    const { getByText, getAllByAltText } = render(<RobisepsTable robiseps={robisepsMock} isFilterOn={0} setIsFilterOn={() => {}}
                                                                 refreshData={() => {}} loading={false} error={null}/>);
    const editButton = getAllByAltText('Image Not Found')[1];
    fireEvent.click(editButton!);
    expect(getByText('Edit a Robisep')).toBeInTheDocument();
    const button = getByText('Disable Robisep');
    expect(button).toBeInTheDocument();

    // Disable Robisep
    fireEvent.click(button);

    // Check if the sendData function is called
    expect(sendData).toHaveBeenCalled();
  });
});