import React, { useRef, useState } from 'react';
import { PrintOutlined } from '@mui/icons-material';
import { Box, Button, Container, Typography, Card, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { QRCodeCanvas } from 'qrcode.react';
import { Template1, Template2, Template3, Template4 } from './QRTemplates';
export default function PrintQR() {
  const qrRef = useRef();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

   const [templateIndex, setTemplateIndex] = useState(0);
   const templates = [Template1, Template2, Template3, Template4];

   const handleChangeTemplate = () => {
    setTemplateIndex((prev) => (prev + 1) % templates.length);
  };

  const CurrentTemplate = templates[templateIndex];

  const handlePrint = useReactToPrint({
    contentRef: qrRef, 
    documentTitle: 'QR Code',
    pageStyle: `
      @page { size: auto; margin: 20mm; }
      body {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
        background: white !important;
        font-family: 'Roboto', sans-serif !important;
      }
      .MuiCard-root {
        page-break-inside: avoid;
      }
    `,
  });

  // Generate dynamic QR data
  const qrDataList = [...Array(6)].map((_, idx) => {
    const serial = 1234567890 + idx;
    return {
      serial,
      coupon: `COUPON${idx + 1}`,
      qrValue: `${serial}`,
    };
  });

  return (
    <Box>
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
          <Button variant="contained" sx={{ backgroundColor: '#000000', color: '#ffffff' }}
            onClick={() => navigate(-1)}> Back
          </Button>
        </Box>

        <Typography variant="h6"  gutterBottom
          sx={{ background: 'linear-gradient(195deg, #49a3f1, #1A73E8)', p: 1, color: '#ffffff',
            borderRadius: '4px', mb: 3, display: 'flex', alignItems: 'center',}}>
          <PrintOutlined sx={{ mx: 1 }} /> Print QR Code
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
             <Button variant="contained" sx={{background: 'linear-gradient(195deg, #49a3f1, #1A73E8)', color: '#ffffff',}}
              onClick={handleChangeTemplate}> Change Template </Button>
             <Button variant="contained" sx={{ background: 'linear-gradient(195deg, #42424a, #191919)', color: '#ffffff', ml:1}}
              onClick={handlePrint} > <PrintOutlined sx={{ mx: 1 }} /> Print </Button>
       </Box>

      
        <Box ref={qrRef} sx={{ display: 'flex', flexWrap: 'wrap', border: '2px dashed #ccc', borderRadius: '8px', p: 2 }}>
          {qrDataList.map((qr, idx) => (
            <CurrentTemplate key={idx} qr={qr} user={user} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
