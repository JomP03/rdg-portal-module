import {useState} from 'react';

export function useTableData() {

  const [tableData, setTableData] = useState<any[]>([]);

  function handleTableData(data: any[]) {
    setTableData(data);
  }

  return {
    tableData,
    handleTableData
  }
}
