import { useEffect, useState } from "react";
import { Box, Button, Container, Typography, Dialog, DialogTitle, DialogContent, DialogActions, useMediaQuery,} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Style } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { callPostApi } from "../../../components/API/ApiCallFunction";
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

export function IssuedList() {
  const isMobile = useMediaQuery("(max-width:768px)");
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");

  const [open, setOpen] = useState(false);
  const [openD, setOpenD] = useState(false);
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
    { field: "id", headerName: "Sr No.", flex: 0.5 },
    {
      field: "offerlogo",
      headerName: "Coupon Image",
      flex: 0.7,
      renderCell: (params) => (
        <img  src={params.value} alt="Coupon"
          style={{ width: 50, height: 40,  objectFit: "cover",  borderRadius: 4, margin: "3px", }}
        />
      ),
    },
    { field: "ctitle", headerName: "Coupon Title", flex: 1.5 },
    { field: "date", headerName: "Issued Date", flex: 1 },
    { field: "expdate", headerName: "Validity", flex: 1 },
  ];

  // API call with pagination
  const issueListApi = async (page = 0, pageSize = 10) => {
    try {
      setLoading(true);
      const storeid = user.store_info?.store_id;
      const start = page * pageSize + 1;

      const payload = {
        mod: "CASHI_ISSUE_COUPON",
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
          coupon_id: item.coupon_id || "NA",
          ctitle: item.offer_title || "NA",
          date: item.coupon_active || "NA",
          expdate: item.coupon_expire || "NA",
          coupon_code: item.coupon_code || "NA",
          coupon_coin: item.coupon_coin || "NA",
          short_desc: item.short_desc || "NA",
          long_desc: item.long_desc || "NA",
          offerlogo: item.offer_logo || "",
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
    issueListApi(paginationModel.page, paginationModel.pageSize);
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
        <Style sx={{ mr: 1 }} /> Issued Coupons
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
           showToolbar
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10]}
          disableRowSelectionOnClick
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
      </Box>

      {/* Add Campaign Dialog */}
      <ReusableDialog open={open} onClose={handleClose} />

      {/* Detail Dialog */}
      <Dialog  open={openD} onClose={() => setOpenD(false)} maxWidth="sm"  fullWidth sx={{ overflowY: "auto" }}>
        <Box>
          {selectedRow ? (
            <>
              <DialogTitle sx={{ background: "linear-gradient(195deg, #49a3f1, #1A73E8)", color: "#fff", }}>
                <Typography variant="h6"> Coupon Code: {selectedRow.coupon_code} </Typography>
              </DialogTitle>
              <DialogContent>
                <Typography sx={{ my: 1 }}> Coupon Coin: {selectedRow.coupon_coin} </Typography>
                <Typography sx={{ mb: 2 }}> Validity: {selectedRow.expdate} </Typography>

                <Box sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom> Short Description </Typography>
                  <Box sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2, background: "#fafafa",}}
                    dangerouslySetInnerHTML={{
                      __html: decodeHTML(selectedRow.short_desc),
                    }}
                  />
                  <Typography variant="subtitle1" sx={{ mt: 2 }} gutterBottom> Long Description </Typography>
                  <Box sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2, background: "#fafafa",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: decodeHTML(selectedRow.long_desc),
                    }}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenD(false)} variant="contained">
                  Close
                </Button>
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
