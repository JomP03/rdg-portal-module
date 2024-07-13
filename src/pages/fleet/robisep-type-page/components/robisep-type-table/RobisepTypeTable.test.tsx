import {fireEvent, render} from "@testing-library/react";
import {robisepTypesMock} from "../../../../../mocks/robisepTypesMock";
import RobisepTypesTable from "./RobisepTypesTable";
import RoomsTable from "../../../../campus/room-page/components/rooms-table/RoomsTable";
import {roomsMock} from "../../../../../mocks/roomsMock";


describe('RobisepTypeTable', () => {

    // Basic page rendering
    test('renders robisep type table', () => {
      const { getByText } = render(<RobisepTypesTable robisepTypes={robisepTypesMock}
                              refreshData={() => {}} loading={false} error={null}/>);

      // Check if all columns are rendered
      expect(getByText('Designation')).toBeInTheDocument();
      expect(getByText('Brand')).toBeInTheDocument();
      expect(getByText('Model')).toBeInTheDocument();
      expect(getByText('Task Types')).toBeInTheDocument();
    });

    // Check if the data is placed in the table
    test('renders loading gif', () => {
      const { getByText, getAllByText } = render(<RobisepTypesTable robisepTypes={robisepTypesMock}
                              refreshData={() => {}} loading={false} error={null}/>);
      expect(getByText('RobisepType 1')).toBeInTheDocument();
      expect(getByText('Brand 1')).toBeInTheDocument();
      expect(getByText('Model 1')).toBeInTheDocument();
      const taskTypes = "PICKUP AND DELIVERY, SURVEILLANCE";
      expect(getAllByText(taskTypes)[0]).toBeInTheDocument();

      expect(getByText('RobisepType 2')).toBeInTheDocument();
      expect(getByText('Brand 2')).toBeInTheDocument();
      expect(getByText('Model 2')).toBeInTheDocument();
    });

    // Check if the page has refresh button
    test('previous and next buttons', () => {
      const { getByText } = render(<RobisepTypesTable robisepTypes={robisepTypesMock}
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
});