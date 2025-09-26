import Button from '@mui/material/Button';
import { Box, Grid, Typography } from '@mui/material';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Add} from '@mui/icons-material';

export default function CreatePromotionDialog() {

  
  const [imageFile, setImageFile] = useState('');
  const [imagePreview, setImagePreview] = useState(null);     
  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };


  return (
     <Typography sx={{ my:6}}>
           
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
        <Typography variant="h6" gutterBottom sx={{ background: 'linear-gradient(195deg, #49a3f1, #1A73E8)', p: 1, color: '#ffffff',
                 borderRadius: '4px', mb:3 }}>
                <Add /> Create Promotion
          </Typography>
         <Box>
          <Typography id="alert-dialog-description">
            <Grid container spacing={2}>
            {/* Image Uploads */}
                <Grid item size={{ xs: 12,sm:12, md: 6,  }}>
                  <Typography gutterBottom>Offer Logo</Typography>
                  <Button variant="outlined" component="label">
                    {imageFile ? imageFile.name : "Upload Image"}
                    <input type="file" accept="image/*" hidden onChange={handleImageChange}
                    
                     />
                  </Button>
                 
                  {imagePreview && <Box sx={{ mt: 2 }}><img src={imagePreview} alt="Preview" style={{ width: "100%", maxHeight: "200px", objectFit: "contain", border: "1px solid #ccc", borderRadius: "8px" }} /></Box>}
                </Grid>
        
            </Grid>
          
          </Typography>
        </Box>
          <Box className="my-4 text-center" > 
          <Button variant="contained" sx={{backgroundColor:'#000000', color:'#ffffff'}} 
          onClick={()=> navigate('/dashboard')}>Back</Button>
         <Button variant="contained" sx={{mx:1}} autoFocus> Save </Button>
        
        </Box>
      </Container>
    </Typography>
  )
}
