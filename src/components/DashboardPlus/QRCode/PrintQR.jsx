import React, { useRef } from 'react';
import { PrintOutlined } from '@mui/icons-material';
import { Box, Button, Container, Typography, Card, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import { QRCodeCanvas } from 'qrcode.react';

export default function PrintQR() {
  const qrRef = useRef();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user') || '{}');

  // ✅ FIX 1: Proper useReactToPrint config
  const handlePrint = useReactToPrint({
    contentRef: qrRef, // ✅ use `contentRef` in latest react-to-print
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
          <Button
            variant="contained"
            sx={{ backgroundColor: '#000000', color: '#ffffff' }}
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </Box>

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
            alignItems: 'center',
          }}
        >
          <PrintOutlined sx={{ mx: 1 }} /> Print QR Code
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'end', mb: 2 }}>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(195deg, #42424a, #191919)',
              color: '#ffffff',
            }}
            onClick={handlePrint}
          >
            <PrintOutlined sx={{ mx: 1 }} /> Print
          </Button>
        </Box>

      
        <Box
          ref={qrRef}
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            border: '2px dashed #ccc',
            borderRadius: '8px',
            p: 2,
          }}
        >
          {qrDataList.map((qr, idx) => (
            <Card
              key={idx}
              sx={{
                p: 2,
                m: 2,
                background: 'linear-gradient(195deg, #42424a, #191919)',
                color: '#ffffff',
                boxShadow:
                  'rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px',
                maxWidth: '320px',
                width: '100%',
                minHeight: '180px',
              }}
            >
              <Typography
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                }}
              >
                <img
                  src={user.store_image?.[0]}
                  alt=""
                  style={{ height: '30px', width: 'auto' }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontSize: '12px', color: '#a1a1a1ff' }}
                >
                  Sr No: {qr.serial}
                </Typography>
              </Typography>

              <Grid container rowSpacing={2} columnSpacing={2} sx={{ mt: 2 }}>
                <Grid item size={{ xs: 8,sm:8, md: 8,}} sx={{ fontStyle: 'italic' }}>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: '12px', color: '#ccc' }}
                  >
                    Please scan the QR Code with Cashi App to claim your coupon.
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ fontSize: '12px', color: '#ccc', mt: 1 }}
                  >
                    *Terms & Conditions apply.
                    <Typography
                      variant="h6"
                      sx={{ fontSize: '12px', color: '#ccc' }}
                    >
                      Coupon valid till 31/12/2025
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item size={{ xs: 8,sm:4, md: 4,}} sx={{ textAlign: 'right' }}>
                  <QRCodeCanvas
                    value={qr.qrValue}
                    size={80}
                    bgColor="#ffffff"
                    fgColor="#000000"
                  />
                </Grid>
              </Grid>
            </Card>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
