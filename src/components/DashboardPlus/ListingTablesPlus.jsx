import  {useState } from 'react'
import DashboardCommanPlus from './DashboardCommanPlus';
import { Diversity3, LocalOffer, Style } from '@mui/icons-material';
import { Box, Button ,  useMediaQuery,TextField, } from '@mui/material';
import ReusableDialog from '../CommanComponents/ReusableDialog';
import {InfoOutline,Verified, CheckCircleOutline} from '@mui/icons-material';
import { Chip } from "@mui/material";
import { MenuItem } from '@mui/material';
import { callPostApi } from "../../components/API/ApiCallFunction";

export function GeneratedQRDt() {
    const isMobile = useMediaQuery('(max-width:768px)');
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

        const columns = [
          { field: 'id', headerName: 'Sr no.', flex:isMobile ? undefined : 0.5},
          { field: 'qr', headerName: 'QR',  flex:isMobile ? undefined : 1,},
          { field: 'expdate', headerName: 'Expiry Date', flex:isMobile ? undefined : 1 },
          { field: 'amount', headerName: 'Amount', flex:isMobile ? undefined : 1 },
          { field: 'status', headerName: 'Status', flex:isMobile ? undefined : 1,
            renderCell: (params) => {
               let color = "default";
              let icon = null;
              let border = "default";
        
              switch (params.value) {
                case "Activated":
                  color = "#098665";
                  border= '1px solid #098665';
                  icon = <Verified sx={{ fontSize: 18 }} />;
                  break;
                case "Pending":
                  color = "#e9aa0aff";
                    border= '1px solid #e9aa0aff';
                 
                  icon = <InfoOutline sx={{ fontSize: 18 }} />;
                  break;
                case "Loading":
                   color = "#0a32d4ff";
                  border= '1px solid #0a32d4ff';
                  icon = <CheckCircleOutline sx={{ fontSize: 18 }} />;
                  break;
                default:
                  color = "default";
              }
                return (
                <Chip
                  icon={icon}
                  label={params.value || "Unknown"}
                  variant="outlined"
                  color={color}
                  sx={{ borderRadius: "18px", fontWeight: 500, border:{border}, color:{color} }}
                />
              );
            }
           },
          { field: 'lotno', headerName: 'Lot No', flex:isMobile ? undefined :  1 },
          { field: 'loadedno', headerName: 'Loading No', flex:isMobile ? undefined :  1 },
        
         ]

      
          const rows = [
              { id: 1, qr:'123',amount:'NA',status:'Pending', lotno:'3456', loadedno:'NA' ,expdate:'12-07-2028',},
              { id: 2, qr:'124',amount:'NA',status:'Pending', lotno:'3459', loadedno:'NA' ,expdate:'12-07-2028',},
  
       
          ];

           const [filterStatus, setFilterStatus] = useState('Pending');
           const [filterLotNo, setFilterLotNo] = useState('');
           const [filterLoadedNo, setFilterLoadedNo] = useState('');
          
            const lotNoRows = filterStatus
              ? rows.filter(row => row.status === filterStatus)
              : rows;
            const uniqueLotNos = Array.from(new Set(lotNoRows.map(row => row.lotno).filter(lot => lot)));
           
          
            // Filter rows based on status , lot no  and Loaded no
             const filteredRows = rows.filter(row => {
              const statusMatch = filterStatus ? row.status === filterStatus : true;
              const lotNoMatch = filterLotNo ? row.lotno === filterLotNo : true;
              const loadedNoMatch = filterLoadedNo ? row.loadedno === filterLoadedNo : true;
              return statusMatch && lotNoMatch && loadedNoMatch;
            });
            
        const filterBar = ( <>
           <Box sx={{ display: 'flex', flexWrap:'wrap', gap: 2, mb: 2 }}>
            <TextField select label="Filter Status" value={filterStatus}
              onChange={e => {
                setFilterStatus(e.target.value);
                setFilterLotNo('');
                setFilterLoadedNo('');
              }}
              sx={{ minWidth: 140 }}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Activated">Activated</MenuItem>
              <MenuItem value="Loading">Loading</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </TextField>
            <TextField  select label="Lot No." value={filterLotNo}  onChange={e => setFilterLotNo(e.target.value)}
              sx={{ minWidth: 140 }}  disabled={uniqueLotNos.length === 0} >
              <MenuItem value="">All</MenuItem>
              {uniqueLotNos.map(lot => (
                <MenuItem key={lot} value={lot}>{lot}</MenuItem>
              ))}
            </TextField>
        
        <Button variant="outlined" color="error" sx={{ height: 56 }}
          onClick={() => {
            setFilterStatus('Pending');
            setFilterLotNo('');
            setFilterLoadedNo('');
          }}
        >
          Clear Filter
        </Button>
      </Box> 
        </>
       )
          
  return (
    <>
     
        

      {/* DataGrid */}
   
     <DashboardCommanPlus 
     title="Generated QR" 
     icon={<Style sx={{ mr: 1 }} />} 
     columns={columns}   
     rows={filteredRows} 
     showCheckbox={true} 
     filterBar={filterBar}
     /> 
      <ReusableDialog open={open} onClose={handleClose} />
    </>
  );
}


export function LoadedORDt() {
   const isMobile = useMediaQuery('(max-width:768px)');
   const [open, setOpen] = useState(false);
   const handleClose = () => setOpen(false);
      const columns = [
          { field: 'id', headerName: 'Sr no.', flex:isMobile ? undefined : 0.5},
          { field: 'qr', headerName: 'QR',  flex:isMobile ? undefined : 1,},
          { field: 'expdate', headerName: 'Expiry Date', flex:isMobile ? undefined : 1 },
          { field: 'amount', headerName: 'Amount', flex:isMobile ? undefined : 1 },
          { field: 'status', headerName: 'Status', flex:isMobile ? undefined : 1,
            renderCell: (params) => {
               let color = "default";
              let icon = null;
              let border = "default";
        
              switch (params.value) {
                case "Activated":
                  color = "#098665";
                  border= '1px solid #098665';
                  icon = <Verified sx={{ fontSize: 18 }} />;
                  break;
                case "Pending":
                  color = "#e9aa0aff";
                    border= '1px solid #e9aa0aff';
                 
                  icon = <InfoOutline sx={{ fontSize: 18 }} />;
                  break;
                case "Loading":
                   color = "#0a32d4ff";
                  border= '1px solid #0a32d4ff';
                  icon = <CheckCircleOutline sx={{ fontSize: 18 }} />;
                  break;
                default:
                  color = "default";
              }
                return (
                <Chip
                  icon={icon}
                  label={params.value || "Unknown"}
                  variant="outlined"
                  color={color}
                  sx={{ borderRadius: "18px", fontWeight: 500, border:{border}, color:{color} }}
                />
              );
            }
           },
          { field: 'lotno', headerName: 'Lot No', flex:isMobile ? undefined :  1 },
          { field: 'loadedno', headerName: 'Loading No', flex:isMobile ? undefined :  1 },
        
         ]

      
          const rows = [
              { id: 1, qr:'123',amount:'155',status:'Loading', lotno:'3456', loadedno:'122' ,expdate:'12-07-2028',},
              { id: 2, qr:'124',amount:'200',status:'Loading', lotno:'3459', loadedno:'244' ,expdate:'12-07-2028',},
  
       
          ];

      const [filterStatus, setFilterStatus] = useState('Loading');
            const [filterLotNo, setFilterLotNo] = useState('');
            const [filterLoadedNo, setFilterLoadedNo] = useState('');
          
            const lotNoRows = filterStatus
              ? rows.filter(row => row.status === filterStatus)
              : rows;
            const uniqueLotNos = Array.from(new Set(lotNoRows.map(row => row.lotno).filter(lot => lot)));
            const uniqueLoadedNos = Array.from(new Set(lotNoRows.map(row => row.loadedno).filter(loaded => loaded)));
          
          
          
            // Filter rows based on status , lot no  and Loaded no
             const filteredRows = rows.filter(row => {
              const statusMatch = filterStatus ? row.status === filterStatus : true;
              const lotNoMatch = filterLotNo ? row.lotno === filterLotNo : true;
              const loadedNoMatch = filterLoadedNo ? row.loadedno === filterLoadedNo : true;
              return statusMatch && lotNoMatch && loadedNoMatch;
            });
            
        const filterBar = ( <>
           <Box sx={{ display: 'flex',flexWrap:'wrap', gap: 2, mb: 2 }}>
             <TextField select label="Filter Status" value={filterStatus}
               onChange={e => {
                 setFilterStatus(e.target.value);
                 setFilterLotNo('');
                 setFilterLoadedNo('');
               }}
               sx={{ minWidth: 140 }}
              >
               <MenuItem value="">All</MenuItem>
               <MenuItem value="Activated">Activated</MenuItem>
               <MenuItem value="Loading">Loading</MenuItem>
               <MenuItem value="Pending">Pending</MenuItem>
           </TextField>
        <TextField  select label="Lot No." value={filterLotNo}  onChange={e => setFilterLotNo(e.target.value)}
          sx={{ minWidth: 140 }}  disabled={uniqueLotNos.length === 0} >
          <MenuItem value="">All</MenuItem>
          {uniqueLotNos.map(lot => (
            <MenuItem key={lot} value={lot}>{lot}</MenuItem>
          ))}
        </TextField>
        <TextField select label="Loading No" value={filterLoadedNo} onChange={e => setFilterLoadedNo(e.target.value)}
          sx={{ minWidth: 140 }} disabled={uniqueLoadedNos.length === 0}
        >
          <MenuItem value="">All</MenuItem>
          {uniqueLoadedNos.map(loaded => (
            <MenuItem key={loaded} value={loaded}>{loaded}</MenuItem>
          ))}
        </TextField>
        <Button variant="outlined" color="error" sx={{ height: 56 }}
          onClick={() => {
            setFilterStatus('Pending');
            setFilterLotNo('');
            setFilterLoadedNo('');
          }}
        >
          Clear Filter
        </Button>
      </Box> 
        </>
       )

 
   return (<>
   <DashboardCommanPlus title="Loaded QR" icon={<LocalOffer sx={{ mr: 1 }} />} columns={columns}  rows={filteredRows}   filterBar={filterBar}
     showCheckbox={true} />
    <ReusableDialog open={open} onClose={handleClose} />
    </>) ;
}


export function ActivatedQrDt() {
   const isMobile = useMediaQuery('(max-width:768px)');
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
     const columns = [
          { field: 'id', headerName: 'Sr no.', flex:isMobile ? undefined : 0.5},
          { field: 'qr', headerName: 'QR',  flex:isMobile ? undefined : 1,},
          { field: 'expdate', headerName: 'Expiry Date', flex:isMobile ? undefined : 1 },
          { field: 'amount', headerName: 'Amount', flex:isMobile ? undefined : 1 },
          { field: 'status', headerName: 'Status', flex:isMobile ? undefined : 1,
            renderCell: (params) => {
               let color = "default";
              let icon = null;
              let border = "default";
        
              switch (params.value) {
                case "Activated":
                  color = "#098665";
                  border= '1px solid #098665';
                  icon = <Verified sx={{ fontSize: 18 }} />;
                  break;
                case "Pending":
                  color = "#e9aa0aff";
                    border= '1px solid #e9aa0aff';
                 
                  icon = <InfoOutline sx={{ fontSize: 18 }} />;
                  break;
                case "Loading":
                   color = "#0a32d4ff";
                  border= '1px solid #0a32d4ff';
                  icon = <CheckCircleOutline sx={{ fontSize: 18 }} />;
                  break;
                default:
                  color = "default";
              }
                return (
                <Chip
                  icon={icon}
                  label={params.value || "Unknown"}
                  variant="outlined"
                  color={color}
                  sx={{ borderRadius: "18px", fontWeight: 500, border:{border}, color:{color} }}
                />
              );
            }
           },
          { field: 'lotno', headerName: 'Lot No', flex:isMobile ? undefined :  1 },
          { field: 'loadedno', headerName: 'Loading No', flex:isMobile ? undefined :  1 },
        
         ]

     const rows = [
              { id: 1, qr:'123',amount:'233',status:'Activated', lotno:'3456', loadedno:'244' ,expdate:'12-07-2028',},
              { id: 2, qr:'124',amount:'400',status:'Activated', lotno:'3459', loadedno:'100' ,expdate:'12-07-2028',},
  
       
          ];

       const [filterStatus, setFilterStatus] = useState('Activated');
            const [filterLotNo, setFilterLotNo] = useState('');
            const [filterLoadedNo, setFilterLoadedNo] = useState('');
          
            const lotNoRows = filterStatus
              ? rows.filter(row => row.status === filterStatus)
              : rows;
            const uniqueLotNos = Array.from(new Set(lotNoRows.map(row => row.lotno).filter(lot => lot)));
            const uniqueLoadedNos = Array.from(new Set(lotNoRows.map(row => row.loadedno).filter(loaded => loaded)));
          
          
          
            // Filter rows based on status , lot no  and Loaded no
             const filteredRows = rows.filter(row => {
              const statusMatch = filterStatus ? row.status === filterStatus : true;
              const lotNoMatch = filterLotNo ? row.lotno === filterLotNo : true;
              const loadedNoMatch = filterLoadedNo ? row.loadedno === filterLoadedNo : true;
              return statusMatch && lotNoMatch && loadedNoMatch;
            });
            
        const filterBar = ( <>
           <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField select label="Filter Status" value={filterStatus}
              onChange={e => {
                setFilterStatus(e.target.value);
                setFilterLotNo('');
                setFilterLoadedNo('');
              }}
              sx={{ minWidth: 140 }}
            >
             <MenuItem value="">All</MenuItem>
             <MenuItem value="Activated">Activated</MenuItem>
             <MenuItem value="Loading">Loading</MenuItem>
             <MenuItem value="Pending">Pending</MenuItem>
         </TextField>
        <TextField  select label="Lot No." value={filterLotNo}  onChange={e => setFilterLotNo(e.target.value)}
          sx={{ minWidth: 140 }}  disabled={uniqueLotNos.length === 0} >
          <MenuItem value="">All</MenuItem>
          {uniqueLotNos.map(lot => (
            <MenuItem key={lot} value={lot}>{lot}</MenuItem>
          ))}
        </TextField>
        <TextField select label="Loading No" value={filterLoadedNo} onChange={e => setFilterLoadedNo(e.target.value)}
          sx={{ minWidth: 140 }} disabled={uniqueLoadedNos.length === 0}
        >
          <MenuItem value="">All</MenuItem>
          {uniqueLoadedNos.map(loaded => (
            <MenuItem key={loaded} value={loaded}>{loaded}</MenuItem>
          ))}
        </TextField>
        <Button variant="outlined" color="error" sx={{ height: 56 }}
          onClick={() => {
            setFilterStatus('Pending');
            setFilterLotNo('');
            setFilterLoadedNo('');
          }}
        >
          Clear Filter
        </Button>
      </Box> 
        </>
       )

   return (<>
   <DashboardCommanPlus title="Activated QR" icon={<LocalOffer sx={{ mr: 1 }} />} columns={columns}  rows={filteredRows} filterBar={filterBar}
     showCheckbox={true} />
    <ReusableDialog open={open} onClose={handleClose} />
    </>) ;
}


export function TotalCustomerPlusDt() {
  const isMobile = useMediaQuery('(max-width:768px)');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = () => setOpen(false);
  const user = JSON.parse(sessionStorage.getItem("user") || "{}");
  const columns = [
         
        { field: 'id', headerName: 'Sr no.', flex: isMobile ? undefined : 0.5},
        { field: 'cname', headerName: 'Customer Name',  flex: isMobile ? undefined : 1,},
        { field: 'ctype', headerName: 'Customer Type',  flex: isMobile ? undefined : 1,},
        { field: 'contact', headerName: 'Customer Contact', flex: isMobile ? undefined : 1,
         },
        { field: 'date', headerName: 'Date',flex: isMobile ? undefined : 1 },
       ]
      
      const rows = [
        { id: 1,cname:'Aalok Shrivastav',ctype:'Plumber',contact:' 7087654326', code: 'COUPON53', date:'12-07-2025',},
        { id: 2,cname:'Mona bhatt',ctype:'Sailor', contact:'9087654326', code: 'COUPON23',date:'10-07-2025' },
        { id: 3,cname:'Monika bhatt',ctype:'Electrician', contact:'9087654328', code: 'COUPON24',date:'10-07-2025' },
      ];

      
      const [filterCtype, setFilterCtype] = useState('');

      const uniqueCTypes = [...new Set(rows.map(r => r.ctype))];

      const filteredRows = rows.filter(row =>
        filterCtype ? row.ctype === filterCtype : true
      );
        
            
       const filterBar = ( <>
           <Box sx={{ display: 'flex', flexWrap:'wrap', gap: 2, mb: 2 }}>
              <TextField select label="Customer Type" value={filterCtype}
                onChange={e => setFilterCtype(e.target.value)}
                sx={{ minWidth: 180 }} >
                <MenuItem value="">All</MenuItem>
                {uniqueCTypes.map(ctype => (
                  <MenuItem key={ctype} value={ctype}>{ctype}</MenuItem>
                ))}
              </TextField>

              <Button variant="outlined"  color="error" sx={{ height: 56 }} onClick={() => setFilterCtype('')}>
               Clear Filter
              </Button>
           </Box> 
        </>
       )

       //Customer API 
  //       const customerListApi = async () => {
  //         setLoading(true)
  //         const storeid = user.store_info.store_id;
  //         const payload = { mod: "CASHI_CUSTOMER_LIST", data_arr: { store_id: storeid ,start:"1", limit:"1000" } };
  //         const apiResult = await callPostApi("cashi-customer", payload);
        
  //         if (apiResult.status === "200" && Array.isArray(apiResult.data?.success)) {
  //            setLoading(false)
  //           const formattedData = apiResult.data.success.map((item, index) => ({
  //             id: index + 1,
             
  //           }));
        
  //           setDatar(formattedData);
  //         } else {
        
  //         }
  //       };

  // useEffect(() => {
  //    customerListApi();
  // }, []);


   return (
    <>
      <DashboardCommanPlus
        title="Total Customer"
        icon={<Diversity3 sx={{ mr: 1 }} />}
        columns={columns}
        rows={filteredRows} filterBar={filterBar}
        showCheckbox={true}
        
      />

    <ReusableDialog open={open} onClose={handleClose} />

    </>
  );
}



