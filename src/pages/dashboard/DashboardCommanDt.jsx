// DashboardCommanDt.jsx
import * as React from 'react';
import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
  useGridApiRef
} from '@mui/x-data-grid';
import {
  Box,
  Button,
  Container,
  Typography,
  Pagination,
  PaginationItem,
  useMediaQuery,
  Checkbox
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function CustomPagination({ apiRef, isMobile }) {
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
      onChange={(event, value) => {
        apiRef.current.setPage(value - 1);
        // re-autosize on page change for mobile
        if (isMobile && apiRef.current) {
          setTimeout(() => {
            apiRef.current.autosizeColumns({ includeHeaders: true });
          }, 0);
        }
      }}
    />
  );
}

const PAGE_SIZE = 5;

export default function DashboardCommanDt({ title, icon, columns, rows, toolbar, showCheckbox }) {
  const navigate = useNavigate();
  const apiRef = useGridApiRef();
  const isMobile = useMediaQuery('(max-width:768px)');
  const [selectedRows, setSelectedRows] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });

  // Autosize on mount and when screen size changes
  useEffect(() => {
    if (isMobile && apiRef.current) {
      apiRef.current.autosizeColumns({ includeHeaders: true });
    }
  }, [isMobile]);

  return (
    <Container>
       <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
      
        <Button
          variant="contained"
          sx={{ backgroundColor: '#000000', color: '#ffffff' }}
          onClick={() => navigate('/dashboard')}
        >
          Back
        </Button>
      </Box>
      {/* Title */}
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          background: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
          p: 1,
          color: '#ffffff',
          borderRadius: '4px',
          mb: 3,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {icon}{title}
      </Typography>

      {/* Back Button */}
      <Box sx={{ mb: 2 }}>
        <Box>{toolbar}</Box>
      </Box>

      {/* DataGrid */}
      <Box sx={{ height: 'auto', maxHeight: 500, width: '100%' }}>
        <DataGrid
          apiRef={apiRef}
          rows={rows}
           columns={columns}
            checkboxSelection={showCheckbox}
          initialState={{ pagination: { paginationModel } }}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[PAGE_SIZE]}
          slots={{
            pagination: () => <CustomPagination apiRef={apiRef} isMobile={isMobile} />,
          }}
          sx={{
             '& .MuiDataGrid-cell': {
               whiteSpace: 'normal',     // Allow wrapping
               wordBreak: 'break-word', 
               display: 'flex',
              alignItems: 'center', // Vertically center content
              gap: '4px'},
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: '#f0f0f0',
              color: '#000',
              fontWeight: 'bold',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
              fontSize: 14,
              fontWeight: '600',
               whiteSpace: 'normal',
              wordBreak: 'break-word'
            },
          }}
          showToolbar
         disableRowSelectionOnClick
        />

         {showCheckbox && (
        <Box
          sx={{
            mt: 1,
            p: 1,
            borderTop: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="body2">
            {selectedRows.length} row(s) selected
          </Typography>
        </Box>
      )}
      </Box>
    </Container>
  );
}
