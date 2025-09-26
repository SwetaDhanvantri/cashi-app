
import * as React from 'react';
import { DataGrid, gridPageCountSelector, gridPageSelector, useGridSelector, useGridApiRef } from '@mui/x-data-grid';
import { Box, Button, Container, Typography, Pagination, PaginationItem, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import campimg from '../../assets/marketing.png'
// import { callPostApi } from '../../components/API/ApiCallFunction';
// import ReusableDialog from '../CommanComponents/ReusableDialog';

function CustomPagination({ apiRef, isMobile }) {
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  const [open, setOpen] = useState(false);
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

export default function CampaignList() {
  const navigate = useNavigate();
  const apiRef = useGridApiRef();
  const [datar, setDatar] = useState([]);
  const isMobile = useMediaQuery('(max-width:768px)');
  const [paginationModel, setPaginationModel] = useState({
    pageSize: PAGE_SIZE,
    page: 0,
  });
  // useEffect(()=> {
  // couponListApi();
  // }, []);
  // Autosize on mount and when screen size changes
  useEffect(() => {
    if (isMobile && apiRef.current) {
      apiRef.current.autosizeColumns({ includeHeaders: true });
    }
  }, [isMobile]);

  // Offer List API
// const couponListApi = async () => {
//   const payload = { mod: "CASHI_OFFER_LIST", data_arr: { store_id: "1020" } };
//   const apiResult = await callPostApi("cashi-offer", payload);

//   console.log("payload:", JSON.stringify(payload));
//   console.log("response:", JSON.stringify(apiResult));

//   if (apiResult.status === "200" && Array.isArray(apiResult.data?.success)) {
//     const formattedData = apiResult.data.success.map((item, index) => ({
//       id: index + 1,
//       offerId: item.offer_id || "NA",
//       ctitle: item.offer_title || "NA",
//       cvalue: item.coupon_coin || "NA",
//       shortd: item.short_desc || "NA",
//       longd: item.long_desc || "NA",
//       activedate: item.offer_active || "NA",
//       expdate: item.offer_expire || "NA",
//      offimg: item.offer_logo  || "NA",
//     }));

//     setDatar(formattedData);
//   } else {
//     console.error("API Error:", apiResult);
//   }
// };


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
      <img
        src={params.value}
        alt="offer"
        style={{ width: 50, height: 50, objectFit: "cover", borderRadius: 4 }}
      />
    );
  },
},
  { field: 'cvalue', headerName: 'Coupon Value', flex: isMobile ? undefined : 1 },
  { field: 'activedate', headerName: 'Active Date', flex: isMobile ? undefined : 1 },
  { field: 'expdate', headerName: 'Expiry Date', flex: isMobile ? undefined : 1 },
  { field: 'shortd', headerName: 'Short Description', flex: isMobile ? undefined : 1 },
  { field: 'longd', headerName: 'Long Description', flex: 2, },
 ]
const rows = [
  {
    cvalue: '122', activedate:'888', expdate:'8899', shortd:'778', longd:'88'
  }
]

  return (
    <Container>
        {/* Back Button */}
      <Box sx={{ display: 'flex', justifyContent: 'start', mb: 2 }}>
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
       Campaign List
      </Typography>
       <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
         <Button
          variant="contained"
          sx={{ background:'linear-gradient(195deg, #49a3f1, #1A73E8)', color: '#ffffff'}}
          onClick={() => navigate('/totalcustomer')}
        >
         <img src={campimg} alt="campaign" style={{height:'25px', width:'auto', marginRight:'5px'}} /> New Campaign
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
    </Container>
  );
}
