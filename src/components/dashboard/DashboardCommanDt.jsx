import { DataGrid, gridPageCountSelector, gridPageSelector, useGridSelector, useGridApiRef} from '@mui/x-data-grid';
import { Box, Button, Container, Typography, Pagination, PaginationItem, useMediaQuery,} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function CustomPagination({page, pageCount, onPageChange }) {
  

  return (
     <Pagination
      color="primary"
      variant="outlined"
      shape="rounded"
      page={page + 1}
      count={pageCount || 1}
      renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
      onChange={(event, value) => onPageChange(value - 1)} 
    />
  );
}

export default function DashboardCommanDt({ title, icon, columns, rows, toolbar, showCheckbox, totalRowCount = 0, paginationModel,
     onPaginationModelChange}) 
{
  const navigate = useNavigate();
  const apiRef = useGridApiRef();
  const isMobile = useMediaQuery('(max-width:768px)');

  //  const [paginationModel, setPaginationModel] = useState({
  //   pageSize: 10,
  //   page: 0,
  //  });
   
    


  useEffect(() => {
    if (isMobile && apiRef.current) {
      apiRef.current.autosizeColumns({ includeHeaders: true });
    }
  }, [isMobile]);
 
//  const handlePaginationChange = (newModel) => {
//     setPaginationModel(newModel);
//     if (onPageChange) {
//       onPageChange(newModel.page, newModel.pageSize);
//     }
//   };

  const totalPages =
    totalRowCount > 0
      ? Math.ceil(totalRowCount / paginationModel.pageSize)
      : paginationModel.page + 2;

  return (
    <Container>
       <Box sx={{ display: 'flex', justifyContent: 'start', mb: 2 }}>
      
        <Button variant="contained" sx={{ backgroundColor: '#000000', color: '#ffffff' }}
          onClick={() =>  navigate(-1)}> Back
        </Button>
      </Box>
      {/* Title */}
      <Typography variant="h6" gutterBottom
        sx={{ background: 'linear-gradient(195deg, #49a3f1, #1A73E8)',
          p: 1, color: '#ffffff', borderRadius: '4px', mb: 3, display: 'flex',
          alignItems: 'center' }}>
        {icon}{title}
      </Typography>
    
       
      {/* Back Button */}
      <Box sx={{ mb: 2 , display:'flex', justifyContent:'end'}}>
        <Box>{toolbar}</Box>
      </Box>

      {/* DataGrid */}
      <Box sx={{ height: 'auto',  width: '100%', marginBottom: 4 }}>
         <DataGrid
          apiRef={apiRef}
          rows={rows}
          columns={columns}
          checkboxSelection={showCheckbox}
          paginationMode="server" 
           rowCount={totalRowCount}
            paginationModel={paginationModel}
            onPaginationModelChange={onPaginationModelChange}
           disableRowSelectionOnClick
          pageSizeOptions={[10, 25, 50]}
         
           slots={{
            pagination: () => (
              <CustomPagination
                page={paginationModel.page}
                pageCount={totalPages}
                onPageChange={(newPage) => {
                  // Only trigger when page actually changes
                  if (newPage !== paginationModel.page) {
                    onPaginationModelChange({ ...paginationModel, page: newPage });
                  }
                }}
              />
            ),
          }}
          showToolbar
          getRowHeight={() => "auto"}
       
          sx={{
            "& .MuiDataGrid-cell": {
              whiteSpace: "normal",
              wordBreak: "break-word",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f0f0f0",
              color: "#000",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-columnHeaderTitle": {
              fontSize: 14,
              fontWeight: 600,
              whiteSpace: "normal",
              wordBreak: "break-word",
            },
          }}
        />
           

         {/* {showCheckbox && (
        <Box
          sx={{
            mt: 1,
            p: 1,
            borderTop: "1px solid #ddd",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
         
        </Box>
      )} */}
      </Box>
    </Container>
  );
}