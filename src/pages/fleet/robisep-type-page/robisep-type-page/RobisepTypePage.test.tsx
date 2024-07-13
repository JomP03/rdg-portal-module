
import {robisepTypesMock} from "../../../../mocks/robisepTypesMock";
import {render} from "@testing-library/react";
import RobisepTypePage from "./RobisepTypePage";


describe('RobisepType', () => {

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
      data: robisepTypesMock,
      error: undefined,
      loading: false,
      refreshData: refreshData,
    });
  });

  it('Basic render', () => {
    const {getByText, getByAltText} = render(<RobisepTypePage/>);

    // Check if the page panel is rendered
    expect(getByText('Robisep Types')).toBeInTheDocument();
    expect(getByText('Create and List RobisepTypes')).toBeInTheDocument();
    expect(getByAltText('Image not found')).toBeInTheDocument();

    // Check if the title is rendered
    expect(getByText('All Robisep Types')).toBeInTheDocument();
    expect(getByText('Create a Robisep Type')).toBeInTheDocument();
  });

  // Check if the page has a loading gif
  test('does not render loading gif', () => {
    const {queryByAltText} = render(<RobisepTypePage/>);
    const loadingImage = queryByAltText('Loading');
    expect(loadingImage).toBeNull();
  });
});