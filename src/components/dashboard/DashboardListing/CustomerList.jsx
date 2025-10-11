import { useEffect, useState } from "react";
import { Box, Button, Container, Typography, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery,} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Diversity3, Info } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { callPostApi } from "../../API/ApiCallFunction";
import GradientLoader from "../../CommanComponents/GradientLoader";
import ReusableDialog from "../../CommanComponents/ReusableDialog";
import { useNavigate } from "react-router-dom";

function CustomToolbar({ onAddCampaign }) {
  return (
    <Box>
      <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={onAddCampaign}>
        Campaign
      </Button>
    </Box>
  );
}

export function CustomerList() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const [openD, setOpenD] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [datar, setDatar] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 0,
  });
  const [rowCount, setRowCount] = useState(0);

  const handleAddCampaign = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const decodeHTML = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const columns = [
    { field: "id", headerName: "Sr no.", flex: 0.5 },
    {
      field: "customername",
      headerName: "Customer Name",
      flex:1,
    },
    {
      field: "contact",
      headerName: "Customer Contact",
      flex: 1,
    },
    { field: "email", headerName: "Email", flex: 1 },
     {
       field: "Action",
       headername: "Action",
       flex: isMobile ? undefined : 1,
       minWidth: 140,
       renderCell: (params) => (
         <Button
           onClick={() => {
             setSelectedRow(params.row); 
             setOpenD(true); 
           }}
         >
           <Info />
         </Button>
       ),
     },
  ];

  // API call with pagination
  
  const customerListApi = async (page = 0, pageSize = 10) => {
    try {
      setLoading(true);
      const storeid = user.store_info?.store_id;
      const start = page * pageSize + 1;

      const payload = {
        mod: "CASHI_CUSTOMER_LIST",
        data_arr: {
          store_id: storeid,
          start: start.toString(),
          limit: pageSize.toString(),
        },
      };

      const apiResult = await callPostApi("cashi-customer", payload);
      console.log("API Payload:", payload);
      console.log("API Result:", apiResult);

      if (apiResult.status === "200" && Array.isArray(apiResult.data)) {
        const formattedData = apiResult.data.map((item, index) => ({
          id: start + index,
          customername: item.customer_name || "NA",
          contact: item.customer_mobile || "NA",
          email: item.customer_email || "NA",
        }));

        setDatar(formattedData);
        setRowCount(apiResult.total_count || 100);
      } else {
        setDatar([]);
        setRowCount(0);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    customerListApi(paginationModel.page, paginationModel.pageSize);
  }, [paginationModel.page, paginationModel.pageSize]);

  return (
    <Container sx={{ my: 2 }}>
      {/* Back button */}
      <Box sx={{ display: "flex", justifyContent: "start", mb: 2 }}>
        <Button  variant="contained"  sx={{ backgroundColor: "#000000", color: "#ffffff" }}
          onClick={() => navigate(-1)}>
          Back
        </Button>
      </Box>

      {/* Title */}
      <Typography ariant="h6"  gutterBottom
        sx={{ background: "linear-gradient(195deg, #49a3f1, #1A73E8)",  p: 1, color: "#ffffff",
          borderRadius: "4px", mb: 3, display: "flex", alignItems: "center",}} >
        <Diversity3 sx={{ mr: 1 }} /> Total Customer
      </Typography>

      {/* Toolbar */}
      <Box sx={{ mb: 2, display: "flex", justifyContent: "end" }}>
        <CustomToolbar onAddCampaign={handleAddCampaign} />
      </Box>

      {/* DataGrid */}
      <Box sx={{ height: "auto", width: "100%", mb: 4 }}>
        <DataGrid
          rows={datar}
          columns={columns}
          paginationMode="server"
          rowCount={rowCount}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
          showToolbar
          getRowHeight={() => "auto"}
          sx={{
            "& .MuiDataGrid-cell": {
              whiteSpace: "normal",
              wordBreak: "break-word",
              display: "flex",
              alignItems: "center",
              gap: "6px",
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
      </Box>

      {/* Add Campaign Dialog */}
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
    </Container>
  );
}
