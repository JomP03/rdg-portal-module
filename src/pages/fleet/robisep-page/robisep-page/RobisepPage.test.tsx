import RobisepPage from "./RobisepPage";
import {fireEvent, render, waitFor} from "@testing-library/react";
import {robisepsMock} from "../../../../mocks/robisepsMock";


describe('RobisepPage', () => {

  const refreshData = jest.fn();
  const sendData = jest.fn();
  const useApiRequest = require('../../../../hooks/useApiRequest');

  beforeEach(() => {
    // Create a spy for the usePost hook
    const usePostSpy = jest.spyOn(useApiRequest, 'useDataPost');
    const useGetSpy = jest.spyOn(useApiRequest, 'useDataGet');
    // Simulate the usePost hook
    usePostSpy.mockReturnValue({
      sendData: sendData(),
      loading: false,
    });
    // Simulate the useGet hook
    useGetSpy.mockReturnValue({
      data: robisepsMock,
      error: undefined,
      loading: false,
      refreshData: refreshData,
    });
  });

  it('Basic render', () => {
    const {getByText, getByAltText} = render(<RobisepPage/>);

    // Check if the page panel is rendered
    expect(getByText('Robiseps')).toBeInTheDocument();
    expect(getByText('Create, Edit and List Robiseps')).toBeInTheDocument();
    expect(getByAltText('Image not found')).toBeInTheDocument();

    // Check if the title is rendered
    expect(getByText('All Robiseps')).toBeInTheDocument();
    expect(getByText('Create a Robisep')).toBeInTheDocument();
  });


  it('Check if Table Filter is rendered', async () => {

        const {getByText, getByTitle} = render(<RobisepPage/>);

        const filterButton = getByTitle('Filter Menu');
        fireEvent.click(filterButton);

        await waitFor(() => {
          expect(getByText('Filter Robiseps')).toBeInTheDocument();
          expect(getByText('By Nickname')).toBeInTheDocument();
          expect(getByText('By Task Type')).toBeInTheDocument();
        });
  });

  // Check if the page has a loading gif
  test('does not render loading gif', () => {
    const {queryByAltText} = render(<RobisepPage/>);
    const loadingImage = queryByAltText('Loading');
    expect(loadingImage).toBeNull();
  });
});