import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { DataGrid, type GridColDef, type GridPaginationModel } from "@mui/x-data-grid";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { FaEye } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { HiOutlineRefresh } from "react-icons/hi";
import { Link, useNavigate } from "react-router";
const DsButton = lazy(() => import("../../components/design-system/DsButton"))

import { default as PageHeader } from "../../components/design-system/DsLoading";
import { getPostsApi } from "../../services/post-service";
import { lazy, useState } from 'react';


const Posts = () => {

  const navigate = useNavigate()
  
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 10
  })

  const {data, isLoading, isFetching, refetch} = useQuery({
    queryKey: ['posts-list', paginationModel.page, paginationModel.pageSize],
    queryFn: () => getPostsApi({page: paginationModel.page , pageSize: paginationModel.pageSize}),
    placeholderData: keepPreviousData
  })

  const columns: GridColDef[] = [
  { field: 'id', headerName: 'Row', width: 50 },
  { field: 'title', headerName: 'title', width: 300 },
  { field: 'userId', headerName: 'User', width: 50 },
  { field: 'body', headerName: 'Text', width: 500 },
  { field: 'views', headerName: 'views', width: 100 },
  { field: 'tags', headerName: 'Tags', width: 200 },
  { 
    field: 'action', 
    headerName: 'Action', 
    width: 150,
    renderCell: (params) => {

      const onclick = (action: 'show' | 'edit' | 'delete') => {
        switch (action){
          case "show": navigate(`/app/posts/${params.id}`)
          break
          case "delete":
        }
      }

      return(
        <>
        <ButtonGroup variant="outlined" size="medium" className="mt-2">
          <Button color="info" onClick={() => onclick('show')} className="h-9"><FaEye /></Button>
          <Button color="error" onClick={() => onclick('delete')} className="h-9"><FaTrashCan /></Button>
        </ButtonGroup>
        </>
      )
    }
  },
];


  return (
    <>
      <div className="flex justify-between mt-0 border-2 p-4 rounded-xl border-blue-600">
        <PageHeader text="Posts:" />
        <div className="rounded-2xl flex justify-between gap-2 border-4 border-slate-700 p-3">
          <DsButton 
          classname="bg-slate-300 dark:bg-slate-700 text-gray-900 dark:text-gray-100 min-w-15 text-3xl" 
          icon={<HiOutlineRefresh />} 
          onClick={refetch}
          isLoading={!isLoading && isFetching}
          toolTip="Refetch"
          />
          <Link to={"/app/posts/create"}>
            <DsButton classname="bg-slate-300 dark:bg-slate-700 text-gray-900 dark:text-gray-100 min-w-15 text-3xl">
              Create
            </DsButton>
          </Link>
        </div>

      </div>



      <DataGrid 
      rows={data?.posts} 
      columns={columns} 
      paginationMode= "server"
      paginationModel={paginationModel}
      onPaginationModelChange={setPaginationModel}
      rowCount={data?.total ?? 0}
      pageSizeOptions={[5, 10, 20, 50]}
      loading={isLoading || isFetching}
      />

    </>
  );
};
export default Posts;
