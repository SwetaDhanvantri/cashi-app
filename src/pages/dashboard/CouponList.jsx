
import * as React from 'react';
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridSelector, useGridApiRef } from '@mui/x-data-grid';
import { Box, Button, Container, Typography, Pagination, PaginationItem, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { callPostApi } from '../../components/API/ApiCallFunction';
import { Add, CurrencyRupee, Info } from '@mui/icons-material';
import Status from './StatusChip';
import ImagePreview from '../CommanComponents/ImagePreview';
import FullImgPreview from '../CommanComponents/FullImgPreview';
import GradientLoader from '../CommanComponents/GradientLoader';

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

export default function CouponList() {
  const navigate = useNavigate();
  const apiRef = useGridApiRef();
  const [datar, setDatar] = useState([]);
    const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState();
  const [selectedRow, setSelectedRow] = useState(null);
  const isMobile = useMediaQuery('(max-width:768px)');
  const [paginationModel, setPaginationModel] = useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });
  useEffect(()=> {
  couponListApi();
  }, []);

  // Autosize on mount and when screen size changes
  useEffect(() => {
    if (isMobile && apiRef.current) {
      apiRef.current.autosizeColumns({ includeHeaders: true });
    }
  }, [isMobile, apiRef]);

  // Offer List API
const couponListApi = async () => {
  setLoading(true)
  const payload = { mod: "CASHI_OFFER_LIST", data_arr: { store_id: "1020" } };
  const apiResult = await callPostApi("cashi-offer", payload);

  console.log("payload:", JSON.stringify(payload));
  console.log("response:", JSON.stringify(apiResult));

  if (apiResult.status === "200" && Array.isArray(apiResult.data?.success)) {
     setLoading(false)
    const formattedData = apiResult.data.success.map((item, index) => ({
      id: index + 1,
      offerId: item.offer_id || "NA",
      ctitle: item.offer_title || "NA",
      cvalue: item.coupon_coin || "NA",
      shortd: item.short_desc || "NA",
      longd: item.long_desc || "NA",
      activedate: item.offer_active || "NA",
      expdate: item.offer_expire || "NA",
     offimg: item.offer_logo  || "NA",
    }));

    setDatar(formattedData);
  } else {
    console.error("API Error:", apiResult);
  }
};

 const columns = [
    { field: 'id', headerName: 'Sr no.', flex: isMobile ? undefined : 0.5},
  { field: 'ctitle', headerName: 'Coupon Title',  flex: isMobile ? undefined : 1,},
   
  {
  field: "offimg",
  headerName: "Offer Img",
 flex: isMobile ? undefined : 1,
 renderCell: (params) => {
    if (!params.value || params.value === "NA") {
      return <Typography variant="body2">No Image</Typography>;
    }
    return (
        <FullImgPreview src={params.value} />
    );
  },
},
  { field: 'cvalue', headerName: 'Coupon value', flex: isMobile ? undefined : 1 },
  { field: 'activedate', headerName: 'Active Date', flex: isMobile ? undefined : 1 },
  { field: 'expdate', headerName: 'Expiry Date', flex: isMobile ? undefined : 1 },
 


  // { field: 'code', headerName: 'Coupon Code', flex: isMobile ? undefined : 1,
  //    renderCell: (params) => (
  //              <span style={{color:'#37ad52', fontWeight:600}}>
  //                {params.value}
  //              </span>
  //              ),
  //  },
 
  // { field: 'minamount', headerName: 'Min Amount', flex: isMobile ? undefined : 1,
  //    renderCell: (params) => (
  //              <>
  //                <CurrencyRupee sx={{ verticalAlign: 'middle', mr: 0.5, fontSize:'16px', marginBottom:'2px' }} />
  //                {params.value}
  //              </>
  //              ),
  //  },
 
   {
    field: 'generateIssued',
    headerName: 'Generate/Issued',
    flex: isMobile ? undefined : 1,
    renderCell: (params) => `${params.row.generate} / ${params.row.issued}`,
  },
  { field: 'redemption', headerName: 'Redemption',flex: isMobile ? undefined : 1,
     renderCell: (params) => (
      <>
      <span onClick={() => navigate('/redeemed')} style={{cursor:'pointer'}}>{params.value}</span>
      </>
     )
  },
   { field: 'status', headerName: 'Status', flex: isMobile ? undefined : 1, minWidth: 140, 
     renderCell: (params) => <Status status={params.value} />,
  },
  {
    field:'action', headername:'Action', flex: isMobile ? undefined : 1, minWidth: 140, 
     renderCell: (params) => 
      <Button onClick={() => {
            setSelectedRow(params.row); // store row
            setOpen(true);              // open dialog
          }}><Info /></Button>
  }
  
];



  return (
    <Container>
        {loading && <GradientLoader text="Loading" />}        {/* // loader */}
        {/* Back Button */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
        <Button
          variant="contained"
          sx={{ backgroundColor: '#000000', color: '#ffffff' }}
          onClick={() => navigate(-1)}
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
       Coupon List
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button
          variant="contained"
          sx={{ background:'linear-gradient(195deg, #49a3f1, #1A73E8)', color: '#ffffff' }}
          onClick={() => navigate('/createcoupon')}
        >
         <Add/> Create Coupon
        </Button>
      </Box>
    

      {/* DataGrid */}
      <Box sx={{ height: 'auto', maxHeight: 500, width: '100%' }}>
        <DataGrid
        apiRef={apiRef}  
          rows={datar}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[PAGE_SIZE]}
           getRowHeight={() => 'auto'} 
          slots={{
            pagination: () => <CustomPagination apiRef={apiRef} isMobile={isMobile} />,
          }}
          sx={{
             '& .MuiDataGrid-cell': {
               whiteSpace: 'normal',     // Allow wrapping
               lineHeight:'20px',
               wordBreak: 'break-word', 
               display: 'flex',
              alignItems: 'center', // Vertically center content
              padding:'5px',
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
        />
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth sx={{overflowY:'auto'}}>
        
        <Box>
          {selectedRow ? (
            <>
             <DialogTitle sx={{background:'linear-gradient(195deg, #49a3f1, #1A73E8)', color:'#fff'}}>
           <Typography variant="h6" gutterBottom >
                {selectedRow.ctitle}
              </Typography>
        </DialogTitle>
        <DialogContent sx={{py:1}}>
           <Typography><b>Coupon Value:</b> {selectedRow.cvalue}</Typography>
              <Typography><b>Short Description:</b> {selectedRow.shortd}</Typography>
              <Typography><b>Long Description:</b> {selectedRow.longd}</Typography>
              {selectedRow.offimg && selectedRow.offimg !== "NA" && (
                <Box mt={2}>
                  <ImagePreview src={selectedRow.offimg} />

                </Box>
              )}
             </DialogContent>
             <DialogActions>
                <Box sx={{ textAlign: "right", mt: 2 }}>
                <Button onClick={() => setOpen(false)} variant="contained">
                  Close
                </Button>
              </Box>
             </DialogActions>
              
            </>
          ) : (
            <Typography>No details available</Typography>
          )}
        </Box>
      </Dialog>
    </Container>
  );
}
