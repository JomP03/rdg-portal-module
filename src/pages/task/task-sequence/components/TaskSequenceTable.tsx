import React, {useEffect} from "react";
import LoadingAnimation from "../../../../components/loading-animation/LoadingAnimation";
import {useTableData} from "../../../../hooks/useTableData";
import Table from "../../../../components/table/Table";
import {SequenceDTO} from "../../../../dtos/in/TaskSequenceInDto";
import {mapTaskSequenceInToTaskSequenceView} from "../../../../mappers/taskSequenceMapper";


interface TaskSequenceTableProps {
  tasks: SequenceDTO[];
  error: any;
  loading: boolean;
  refreshData: () => void;
}

const TaskSequenceTable: React.FC<TaskSequenceTableProps> = ({tasks, error, loading, refreshData}) => {

  const columns = [
    {Header: 'Task Code', accessor: 'taskCode'},
    {Header: 'Task Type', accessor: 'taskType'},
    {Header: 'Robisep Type', accessor: 'robisepType'},
    {Header: 'State', accessor: 'state'},
    {Header: 'Goal', accessor: 'points'},
  ];

  // Use the useTableData hook
  const {tableData, handleTableData} = useTableData();


  useEffect(() => {
    // Map the data to the format that the table expects
    const taskSequenceDto = tasks?.map((task) =>
      mapTaskSequenceInToTaskSequenceView(task));

    // Update the table data
    handleTableData(taskSequenceDto || []);
  }, [tasks]); // Depend on rooms

  useEffect(() => {
    if (error) {
      console.error('Error fetching rooms:', error);
    }
  }, [error]);

  // Show loading animation while loading
  if (loading) {
    return <LoadingAnimation/>;
  }

  return (
    <Table columns={columns} data={tableData}
           entityFilters={<> </>}
           tableEntity={'Sequence'}
           text={'It was impossible to calculate the sequence for the given Robisep'}
           refreshData={refreshData}
           isFilterOn={-1}
           isEditable={false}
           isFilterable={false}
           refreshButton={false}
    />
  )
}

export default TaskSequenceTable;