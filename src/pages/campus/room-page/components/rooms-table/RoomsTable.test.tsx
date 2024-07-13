import { render, fireEvent } from '@testing-library/react';
import RoomsTable from "./RoomsTable";
import {roomsMock} from "../../../../../mocks/roomsMock";


describe('RoomsTable', () => {

  // Basic page rendering
  test('renders rooms table', () => {
    const { getByText } = render(<RoomsTable rooms={roomsMock}
                             refreshData={() => {}} loading={false} error={null}/>);

    // Check if all columns are rendered
    expect(getByText('Name')).toBeInTheDocument();
    expect(getByText('Category')).toBeInTheDocument();
    expect(getByText('Building')).toBeInTheDocument();
    expect(getByText('Floor')).toBeInTheDocument();
    expect(getByText('Description')).toBeInTheDocument();
    expect(getByText('InitialX')).toBeInTheDocument();
    expect(getByText('InitialY')).toBeInTheDocument();
    expect(getByText('FinalX')).toBeInTheDocument();
    expect(getByText('FinalY')).toBeInTheDocument();
    expect(getByText('DoorX')).toBeInTheDocument();
    expect(getByText('DoorY')).toBeInTheDocument();
    expect(getByText('Door Orientation')).toBeInTheDocument();
  });

  // Check if the data is placed in the table
  test('renders loading gif', () => {
    const { getByText, getAllByText } = render(<RoomsTable rooms={roomsMock}
                             refreshData={() => {}} loading={false} error={null}/>);
    expect(getByText('Room 1')).toBeInTheDocument();
    expect(getByText('Category 1')).toBeInTheDocument();
    expect(getByText('BuildingCode 1')).toBeInTheDocument();
    const ones = getAllByText('1');
    expect(ones.length).toBe(7);
    expect(getByText('DoorOrientation 1')).toBeInTheDocument();

    expect(getByText('Room 2')).toBeInTheDocument();
    expect(getByText('Category 2')).toBeInTheDocument();
    expect(getByText('BuildingCode 2')).toBeInTheDocument();
    const twos = getAllByText('2');
    expect(twos.length).toBe(7);
    expect(getByText('DoorOrientation 2')).toBeInTheDocument();
  });

  // Check if the page has refresh button
  test('previous and next buttons', () => {
    const { getByText } = render(<RoomsTable rooms={roomsMock}
                                             refreshData={() => {}} loading={false} error={null}/>);
    expect(getByText('Refresh')).toBeInTheDocument();
  });


  // Check if refresh button is working
  test('refresh button', () => {
    const refreshData = jest.fn();
    const { getByText } = render(<RoomsTable rooms={roomsMock}
                             refreshData={refreshData} loading={false} error={null}/>);
    const refreshButton = getByText('Refresh');
    fireEvent.click(refreshButton);
    expect(refreshData).toHaveBeenCalledTimes(2);
  });

  // Check that when refresh button is clicked, the data is refreshed
  test('refresh button', async () => {

    const { getByText } = render(<RoomsTable rooms={roomsMock}
                                             refreshData={() => {}} loading={false} error={null}/>);
    const refreshButton = getByText('Refresh');
    fireEvent.click(refreshButton);

    // Check if all columns are rendered
    const name = getByText('Name');
    expect(name).toBeInTheDocument();
    const category = getByText('Category');
    expect(category).toBeInTheDocument();
    const building = getByText('Building');
    expect(building).toBeInTheDocument();
    const floor = getByText('Floor');
    expect(floor).toBeInTheDocument();
    const description = getByText('Description');
    expect(description).toBeInTheDocument();
    const initialX = getByText('InitialX');
    expect(initialX).toBeInTheDocument();
    const initialY = getByText('InitialY');
    expect(initialY).toBeInTheDocument();
    const finalX = getByText('FinalX');
    expect(finalX).toBeInTheDocument();
    const finalY = getByText('FinalY');
    expect(finalY).toBeInTheDocument();
    const doorX = getByText('DoorX');
    expect(doorX).toBeInTheDocument();
    const doorY = getByText('DoorY');
    expect(doorY).toBeInTheDocument();
    const doorOrientation = getByText('Door Orientation');
    expect(doorOrientation).toBeInTheDocument();

    // Check if the data is placed in the table
    const room1 = getByText('Room 1');
    expect(room1).toBeInTheDocument();

  });

  // Check if the page has previous and next buttons
  test('previous and next buttons', () => {
    const { getByTitle } = render(<RoomsTable rooms={roomsMock}
                             refreshData={() => {}} loading={false} error={null}/>);
    expect(getByTitle('Previous Page')).toBeInTheDocument();
    expect(getByTitle('Next Page')).toBeInTheDocument();
  });

  // Check if page is loading
  test('renders loading gif', () => {
    const { } = render(<RoomsTable rooms={roomsMock}
                             refreshData={() => {}} loading={true} error={null}/>);
  });


  // Check if page has error message
  test('renders error message', () => {
    const { } = render(<RoomsTable rooms={roomsMock}
                             refreshData={() => {}} loading={false} error={'Error'}/>);
  });
});
