import React, {useEffect, useState} from 'react';
import Table from '../../../../../components/table/Table';
import {useTableData} from "../../../../../hooks/useTableData";
import LoadingAnimation from '../../../../../components/loading-animation/LoadingAnimation';
import TaskInDto from "../../../../../dtos/in/TaskInDto";
import {mapTaskInToTaskView} from "../../../../../mappers/taskMapper";
import {useModal} from "../../../../../hooks/useModal";
import TasksFilters from "../tasks-filters/TasksFilters";
import EditModal from "../../../../../components/edit-modal/EditModal";
import UpdateStateForm from '../update-state-form/UpdateStateForm';

interface TaskTableProps {
    tasks: TaskInDto[];
    error: any;
    loading: boolean;
    refreshData: () => void;
    isFilterOn: number;
    setIsFilterOn: React.Dispatch<React.SetStateAction<number>>;
}

const TaskTable: React.FC<TaskTableProps> =
    ({tasks, error, loading, refreshData, isFilterOn, setIsFilterOn}) => {
        const columns = [
            {Header: 'Requester', accessor: 'requester'},
            {Header: 'Task Code', accessor: 'taskCode'},
            {Header: 'Task Type', accessor: 'taskType'},
            {Header: 'Robisep Type', accessor: 'robisepType'},
            {Header: 'State', accessor: 'state'},
        ];

        // State for the modal
        const {showModal, handleOpenModal, handleCloseModal} = useModal();

        // State for the row content
        const [rowContent, setRowContent]
            = useState<{ [key: string]: string }>({});

        // Use the useTableData hook
        const {tableData, handleTableData} = useTableData();

        // Initialize the table data, only executed once
        useEffect(() => {
            refreshData();
        }, []);


        useEffect(() => {
            // Map the data to the format that the table expects
            const taskDto = tasks?.map((task) =>
                mapTaskInToTaskView(task));

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

        const handleRefreshData = () => {
            refreshData();
            setIsFilterOn(-1);
        }

        const handleEdit = (data: { [value: string]: string }) => {
            setRowContent(data);
            handleOpenModal();
        }

        return (
            <>
                <Table columns={columns}
                       data={tableData}
                       tableEntity={'Task'}
                       refreshData={handleRefreshData}
                       entityFilters={<TasksFilters handleDataChange={handleTableData} refreshData={refreshData} setFilterOn={setIsFilterOn}/>}
                       isFilterOn={isFilterOn}
                       isEditable={isFilterOn === -1}
                       handleEdit={handleEdit}
                       isFilterable={true}/>

                <EditModal
                    id={'manage-task-modal'}
                    isOpen={showModal}
                    onRequestClose={handleCloseModal}
                    title={'Manage Task Requistion'}
                    form={<UpdateStateForm formData={rowContent} handleCloseModal={handleCloseModal} refreshData={refreshData}
                    />}
                />
            </>
        );
    };

export default TaskTable;
