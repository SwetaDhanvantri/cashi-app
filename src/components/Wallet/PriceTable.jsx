import React, { useState, useEffect } from 'react';
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  useGridApiRef,
} from '@mui/x-data-grid';
import {
  Box,
  Pagination,
  PaginationItem,
  Button,
  useMediaQuery
} from '@mui/material';
import { CurrencyRupee, Download } from '@mui/icons-material';

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount}
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}

const PAGE_SIZE = 5;

export default function PriceTable() {
  const apiRef = useGridApiRef();
  const isMobile = useMediaQuery('(max-width:768px)');

  const [paginationModel, setPaginationModel] = useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });

  const columns = [
    { field: 'id', headerName: 'Sr No.', flex: isMobile ? undefined : 0.5, minWidth: 80 },
    { field: 'invoice', headerName: 'Invoice Id', flex: isMobile ? undefined : 1, minWidth: 120 },
    {
      field: 'billing', headerName: 'Billing Cycle', flex: isMobile ? undefined : 1, minWidth: 120,
      renderCell: (params) => `${params.row.from} to ${params.row.to}`,
    },
    {
      field: 'amount', headerName: 'Amount', flex: isMobile ? undefined : 1, minWidth: 120,
      renderCell: (params) => (
        <>
          <CurrencyRupee sx={{ verticalAlign: 'middle', mr: 0.5, fontSize: '16px', mb: '2px' }} />
          {params.value}
        </>
      ),
    },
    { field: 'event', headerName: 'Event Count', flex: isMobile ? undefined : 1, minWidth: 120 },
    {
      field: 'download', headerName: 'Download', flex: isMobile ? undefined : 1, minWidth: 120,
      renderCell: () => (
        <Button
          variant="outlined"
          size="small"
          startIcon={<Download sx={{ fontSize: '16px', verticalAlign: 'middle', mb: '2px' }} />}
        >
          Download
        </Button>
      ),
    },
  ];

  const rows = [
    
  ];

  // Auto-size columns on mobile only
  useEffect(() => {
    if (isMobile && apiRef.current) {
      apiRef.current.autosizeColumns({ includeHeaders: true });
    }
  }, [isMobile, apiRef]);

  return (
    <Box sx={{ height: 'auto', maxHeight: 500, width: '100%' }}>
      <DataGrid
        apiRef={apiRef}
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        pageSizeOptions={[PAGE_SIZE]}
        slots={{
          pagination: CustomPagination,
        }}
         showToolbar
        sx={{
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f0f0f0',
            color: '#000',
            fontWeight: 'bold',
            
          },
          '& .MuiDataGrid-cell': {
               whiteSpace: 'normal',     // Allow wrapping
               wordBreak: 'break-word', },

          '& .MuiDataGrid-columnHeaderTitle': {
            fontSize: 14,
            fontWeight: '600',
            whiteSpace: 'normal',     // Allow wrapping
            wordBreak: 'break-word',
          },
        }}
      />
    </Box>
  );
}
