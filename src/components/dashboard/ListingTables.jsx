import { useEffect, useState, useCallback, useMemo } from "react";
import DashboardCommanDt from "./DashboardCommanDt";
import Status from "./StatusChip";
import { CurrencyRupee, Diversity3, Info, LocalOffer, Style, Widgets,} from "@mui/icons-material";
import { Box, Typography, useMediaQuery } from "@mui/material";
import { Dialog, DialogTitle, DialogContent, DialogActions,} from "@mui/material";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ReusableDialog from "../CommanComponents/ReusableDialog";
import { callPostApi } from "../../components/API/ApiCallFunction";
import GradientLoader from "../CommanComponents/GradientLoader";
import { render } from "@testing-library/react";
function CustomToolbar({ onAddCampaign }) {
  return (
    <Box>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={onAddCampaign}>
        Campaign
      </Button>
    </Box>
  );
}

function maskMobile(number) {
  if (!number) return "";
  const str = number.toString();
  // Show country code + first 5 digits, mask the rest
  return str.slice(0, 3) + "**********";
}

export function IssuedCouponDt() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [open, setOpen] = useState(false);
  const handleAddCampaign = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const [datar, setDatar] = useState([]);
  const [openD, setOpenD] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
  pageSize: 10,
  page: 0,
});

const [rowCount, setRowCount] = useState(0);

  const columns = [
    { field: "id", headerName: "Sr no.", flex: isMobile ? undefined : 0.5 },
     {
      field: "offerlogo",
      headerName: "Coupon Image",
      flex: isMobile ? undefined : 0.7,
      renderCell: (params) => ( 
        <img src={params.value} alt="Coupon" style={{ width: 50, height: 40, objectFit: 'cover', borderRadius: 4 , margin:"3px"}} />
      )
    },
    {
      field: "ctitle",
      headerName: "Coupon Title",
      flex: isMobile ? undefined : 1.5,
    },

    {
      field: "date",
      headerName: "Issued Date",
      flex: isMobile ? undefined : 1,
    },
    {
      field: "expdate",
      headerName: "Validity",
      flex: isMobile ? undefined : 1,
    },
   
  ];


  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  //Customer API
 const issueListApi = async (page = 0, pageSize = 10) => {
  setLoading(true);
  const storeid = user.store_info.store_id;
  const start = page * pageSize + 1;

  const payload = {
    mod: "CASHI_ISSUE_COUPON",
    data_arr: { store_id: storeid, start: start.toString(), limit: pageSize + 1 },
  };

  const apiResult = await callPostApi("cashi-customer", payload);
  console.log("API Payload:", JSON.stringify(payload));
  console.log("API Result:", JSON.stringify(apiResult));

  if (apiResult.status === "200" && Array.isArray(apiResult.data)) {
    const hasNextPage = apiResult.data.length > pageSize;
    const visibleData = hasNextPage ? apiResult.data.slice(0, pageSize) : apiResult.data;

    const formattedData = visibleData.map((item, index) => ({
      id: start + index,
      coupon_id: item.coupon_id || "NA",
      ctitle: item.offer_title || "NA",
      date: item.coupon_expire || "NA",
      expdate: item.coupon_active || "NA",
      coupon_code: item.coupon_code || "NA",
      coupon_coin: item.coupon_coin || "NA",
      short_desc: item.short_desc || "NA",
      long_desc: item.long_desc || "NA",
      offerlogo: item.offer_logo || "NA",
    }));

    setDatar(formattedData);


    const newRowCount = hasNextPage
      ? (page + 2) * pageSize
      : page * pageSize + formattedData.length; 

    setRowCount(newRowCount);
  } else {
    setDatar([]);
  }

  setLoading(false);
};


 useEffect(() => {
  issueListApi(paginationModel.page, paginationModel.pageSize);
}, [paginationModel.page, paginationModel.pageSize]);


  return (
    <>
      <DashboardCommanDt
        title="Issued Coupons"
        icon={<Style sx={{ mr: 1 }} />}
        columns={columns}
        rows={datar}
        toolbar={<CustomToolbar onAddCampaign={handleAddCampaign} />}
        totalRowCount={rowCount}
        paginationModel={paginationModel}
         onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
        showCheckbox={true}
      />
      <ReusableDialog open={open} onClose={handleClose} />
      <Dialog
        open={openD}
        onClose={() => setOpenD(false)}
        maxWidth="sm"
        fullWidth
        sx={{ overflowY: "auto" }}
      >
        <Box>
          {selectedRow ? (
            <>
              <DialogTitle
                sx={{
                  background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
                  color: "#fff",
                }}
              >
                <Typography variant="h6">
                  Coupon Code: {selectedRow.coupon_code}
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Box sx={{display:'flex', justifyContent:'space-between', my:1}}>
                  <Typography>Coupon Coin: {selectedRow.coupon_coin}</Typography>
                <Typography>Redeemed: {selectedRow.redeem_status}</Typography>
              
                </Box>
                
                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Short Description
                  </Typography>
                  <Box
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: 2,
                      p: 2,
                      background: "#fafafa",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: decodeHTML(selectedRow.short_desc),
                    }}
                  />

                  <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom>
                    Long Description
                  </Typography>
                  <Box
                    sx={{
                      border: "1px solid #ccc",
                      borderRadius: 2,
                      p: 2,
                      background: "#fafafa",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: decodeHTML(selectedRow.long_desc),
                    }}
                  />
                </Box>

                <Typography>
                  Balance Points: {selectedRow.balance_point}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Box sx={{ textAlign: "right", mt: 2 }}>
                  <Button onClick={() => setOpenD(false)} variant="contained">
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
      {loading && <GradientLoader text="Loading" />}
    </>
  );
}

export function RedeemedCouponDt() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [open, setOpen] = useState(false);
  const handleAddCampaign = () => setOpen(true);
  const handleClose = () => setOpen(false);
 const [loading, setLoading] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const [datar, setDatar] = useState([]);
  const [openD, setOpenD] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
  pageSize: 10,
  page: 0,
});
const [rowCount, setRowCount] = useState(0);

  const columns = [
    { field: "id", headerName: "Sr no.", flex: isMobile ? undefined : 0.5 },
    {
      field: "offerlogo",
      headerName: "Coupon Image",
      flex: isMobile ? undefined : 1,
      renderCell: (params) => ( 
        <img src={params.value} alt="Coupon" style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: 4,margin:"3px" }} />
      )
    },
    {
      field: "ctitle",
      headerName: "Coupon Title",
      flex: isMobile ? undefined : 1,
    },
    // { field: "contact", headerName: "Contact", flex: isMobile ? undefined : 1 },
    { field: "activedate", headerName: "Active Date", flex: isMobile ? undefined : 1 },
     { field: "expdate", headerName: "Expire Date", flex: isMobile ? undefined : 1 },
  ];

    const redeemedApi = async (page, pageSize) => {
    setLoading(true);
    const storeid = user.store_info.store_id;
    const start = page * pageSize + 1;
    const payload = {
      mod: "CASHI_REDEEM_COUPON",
      data_arr: { store_id: storeid, start: start.toString(), limit: pageSize },
    };
    const apiResult = await callPostApi("cashi-customer", payload);
    console.log("API Payload:", JSON.stringify(payload));
    console.log("API Result:", JSON.stringify(apiResult));
    if (apiResult.status === "200" && Array.isArray(apiResult.data)) {
      setLoading(false);
      const formattedData = apiResult.data.map((item, index) => ({
        id: index + 1,
        activedate: item.coupon_active || "NA",
        expdate: item.coupon_expire || "NA",
        ctitle: item.offer_title || "NA",
        offerlogo: item.offer_logo || "NA",
        
      }));

      setDatar(formattedData);
       setRowCount(apiResult.total_count || formattedData.length);
    } else {
      setLoading(false);
    }
  };

 useEffect(() => {
  redeemedApi(paginationModel.page, paginationModel.pageSize);
}, [paginationModel.page, paginationModel.pageSize]);


  return (
    <>
      <DashboardCommanDt
        title="Redeemed Coupons"
        icon={<LocalOffer sx={{ mr: 1 }} />}
        columns={columns}
        rows={datar}
        paginationModel={paginationModel}
        onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
        toolbar={<CustomToolbar onAddCampaign={handleAddCampaign} />}
        showCheckbox={true}
      />
      <ReusableDialog open={open} onClose={handleClose} />
      
      {loading && <GradientLoader text="Loading" />}
    </>
  );
}

export function TotalValueDt() {
  const columns = [
    { field: "id", headerName: "Sr No" },
    { field: "amount", headerName: "Amount" },
  ];

  const rows = [
    { id: 1, code: "Demo", amount: 50 },
    { id: 2, code: "Demo2", amount: 20 },
  ];
  return (
    <DashboardCommanDt
      title="Total Value"
      icon={<Widgets sx={{ mr: 1 }} />}
      columns={columns}
      rows={rows}
    />
  );
}

export function TotalCustomerDt() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const [open, setOpen] = useState(false);
  const handleAddCampaign = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openD, setOpenD] = useState(false);
  const [datar, setDatar] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const [selectedRow, setSelectedRow] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
  pageSize: 10,
  page: 0,
  });
  const [rowCount, setRowCount] = useState(0);
  
   useEffect(() => {
  customerListApi(paginationModel.page, paginationModel.pageSize);
   }, [paginationModel.page, paginationModel.pageSize]);
 
  const columns = [
    { field: "id", headerName: "Sr no.", flex: isMobile ? undefined : 0.5 },
    {
      field: "customername",
      headerName: "Customer Name",
      flex: isMobile ? undefined : 1,
    },
    {
      field: "contact",
      headerName: "Customer Contact",
      flex: isMobile ? undefined : 1,
    },
    { field: "email", headerName: "Email", flex: isMobile ? undefined : 1 },
    // {
    //   field: "Action",
    //   headername: "Action",
    //   flex: isMobile ? undefined : 1,
    //   minWidth: 140,
    //   renderCell: (params) => (
    //     <Button
    //       onClick={() => {
    //         setSelectedRow(params.row); 
    //         setOpenD(true); 
    //       }}
    //     >
    //       <Info />
    //     </Button>
    //   ),
    // },
  ];

  //Customer API
  const customerListApi = async (page = 0, pageSize = 10) => {
  setLoading(true);
  const storeid = user.store_info.store_id;
  const start = page * pageSize + 1;

  const payload = {
    mod: "CASHI_CUSTOMER_LIST",
    data_arr: { store_id: storeid, start: start.toString(), limit: pageSize + 1 },
  };

  const apiResult = await callPostApi("cashi-customer", payload);
  // console.log("API Payload:", JSON.stringify(payload));
  // console.log("API Result:", JSON.stringify(apiResult));

  if (apiResult.status === "200" && Array.isArray(apiResult.data)) {

    const hasNextPage = apiResult.data.length > pageSize;
    const visibleData = hasNextPage ? apiResult.data.slice(0, pageSize) : apiResult.data;

    const formattedData = visibleData.map((item, index) => ({
      id: start + index,
      customername: item.customer_name || "NA",
      contact: item.customer_mobile || "NA",
      email: item.customer_email || "NA",
    }));

    setDatar(formattedData);
    const newRowCount = hasNextPage
      ? (page + 2) * pageSize
      : page * pageSize + formattedData.length;

    setRowCount(newRowCount);
  } else {
    setDatar([]);
  }

  setLoading(false);
};


  return (
    <>
      <DashboardCommanDt
        title="Total Customer"
        icon={<Diversity3 sx={{ mr: 1 }} />}
        columns={columns}
        rows={datar}
        totalRowCount={rowCount}
        paginationModel={paginationModel}
        onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
        
        toolbar={<CustomToolbar onAddCampaign={handleAddCampaign} />}
        showCheckbox={true}
      />

      <ReusableDialog open={open} onClose={handleClose} />
      <Dialog
        open={openD}
        onClose={() => setOpenD(false)}
        maxWidth="sm"
        fullWidth
        sx={{ overflowY: "auto" }}
      >
        <Box>
          {selectedRow ? (
            <>
              <DialogTitle
                sx={{
                  background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
                  color: "#fff",
                }}
              >
                <Typography variant="h6">
                  {" "}
                  {selectedRow.customer_name}{" "}
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Typography>Total Visits: {selectedRow.total_visit}</Typography>
                <Typography>Order (₹): {selectedRow.order_amount}</Typography>
                <Typography>Payment (₹): {selectedRow.payment}</Typography>
                <Typography>Loyalty Points: {selectedRow.loyalty}</Typography>
                <Typography>
                  Balance Points: {selectedRow.balance_point}
                </Typography>
              </DialogContent>
              <DialogActions>
                <Box sx={{ textAlign: "right", mt: 2 }}>
                  <Button onClick={() => setOpenD(false)} variant="contained">
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
      {loading && <GradientLoader text="Loading" />}
    </>
  );
}
