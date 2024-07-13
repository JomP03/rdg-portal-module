import {render} from '@testing-library/react';
import RoomPage from "./RoomPage";
import {roomsMock} from "../../../../mocks/roomsMock";
import {useDataGet} from "../../../../hooks/useApiRequest";


describe('RoomPage', () => {

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
      data: roomsMock,
      error: undefined,
      loading: false,
      refreshData: refreshData,
    });
  });

  it('Basic render', () => {
    const {getByText, getByAltText} = render(<RoomPage/>);

    // Check if the page panel is rendered
    expect(getByText('Rooms')).toBeInTheDocument();
    expect(getByText('Create and List Rooms')).toBeInTheDocument();
    expect(getByAltText('Image not found')).toBeInTheDocument();

    // Check if the title is rendered
    expect(getByText('All Rooms')).toBeInTheDocument();
    expect(getByText('Create a Room')).toBeInTheDocument();

  });

  // Check if the page has a loading gif
  test('does not render loading gif', () => {
    const {queryByAltText} = render(<RoomPage/>);
    const loadingImage = queryByAltText('Loading');
    expect(loadingImage).toBeNull();
  });

});

