// Base
import React, {useEffect} from 'react';
import Table from '../../../../../components/table/Table';
import {useTableData} from "../../../../../hooks/useTableData";
import LoadingAnimation from '../../../../../components/loading-animation/LoadingAnimation';

// Task
import TaskInDto from "../../../../../dtos/in/TaskInDto";
import {mapTaskInToRequestTaskView} from "../../../../../mappers/taskMapper";

interface RequestTaskProps {
  tasks: TaskInDto[];
  error: any;
  loading: boolean;
  refreshData: () => void;
  isFilterOn: number;
}

const RequestTaskTable: React.FC<RequestTaskProps> =
  ({tasks, error, loading, refreshData, isFilterOn}) => {
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
      const taskDto = tasks?.map((task) =>
        mapTaskInToRequestTaskView(task));

      // Update the table data
      handleTableData(taskDto || []);
    }, [tasks]); // Depend on tasks (for updating the table data)


    useEffect(() => {
      if (error) {
        console.error('Error fetching tasks:', error);
      }
    }, [error]);


    // Show loading animation while loading
    if (loading) {
      return <LoadingAnimation/>;
    }

    return (
      <>
        <Table columns={columns}
               data={tableData}
               tableEntity={'Task'}
               refreshData={refreshData}
               entityFilters={null}
               isFilterable={false}
               isFilterOn={isFilterOn}
               isEditable={false}
        />
      </>
    );
  };

export default RequestTaskTable;
