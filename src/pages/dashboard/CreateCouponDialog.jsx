import React, { useState } from 'react'
import Button from '@mui/material/Button';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import Slider from '@mui/material/Slider';
export default function CreateCouponDialog() {
 const [date, setDate] = useState('');
 const navigate = useNavigate();
 const [content, setContent] = useState('');

 const marks = [
  {
    value: 0,
    label: '0°C',
  },
  {
    value: 20,
    label: '20°C',
  },
  {
    value: 37,
    label: '37°C',
  },
  {
    value: 100,
    label: '100°C',
  },
];

function valuetext(value) {
  return `${value}°C`;
}
  return (
     <Typography sx={{ my:6}}>
    
      <Container>
       
        <Box>
          <Typography id="alert-dialog-description">
            <Grid container spacing={2}>
              <Grid size={{ xs: 12,sm:12, md: 12,}}>
                <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Offer Title:</label>
                <div class="col-sm-10">
                 <input type="text"  class="form-control" id="staticEmail" value=""/>
               </div>
               </div>
              </Grid>
                <Grid size={{ xs: 12,sm:12, md: 12,}}>
                  <div  class="mb-3 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Short Description:</label>
                   <div class="col-sm-10">
                      <Editor
                     apiKey="c08v0mzmmmku032emoeacdwxx6xip8dze3a01kjcj1vb3i1f" 
                     value={content}
                     init={{
                       height: 200,
                       menubar: false,
                       plugins: [
                         'advlist autolink lists link image charmap preview anchor',
                         'searchreplace visualblocks code fullscreen',
                         'insertdatetime media table paste code help wordcount'
                       ],
                       toolbar:
                         'undo redo | formatselect | ' +
                         'bold italic backcolor | alignleft aligncenter ' +
                         'alignright alignjustify | bullist numlist outdent indent | ' +
                         'removeformat | help'
                     }}
                     onEditorChange={(newContent) => setContent(newContent)}
                   />
                   </div> 
                 
                 </div>
         
              </Grid>
                 <Grid size={{ xs: 12,sm:12, md: 12,}}>
                  <div  class="mb-3 row">
                    <label for="staticEmail" class="col-sm-2 col-form-label">Long Description:</label>
                   <div class="col-sm-10">
                      <Editor
                     apiKey="c08v0mzmmmku032emoeacdwxx6xip8dze3a01kjcj1vb3i1f" 
                     value={content}
                     init={{
                       height: 200,
                       menubar: false,
                       plugins: [
                         'advlist autolink lists link image charmap preview anchor',
                         'searchreplace visualblocks code fullscreen',
                         'insertdatetime media table paste code help wordcount'
                       ],
                       toolbar:
                         'undo redo | formatselect | ' +
                         'bold italic backcolor | alignleft aligncenter ' +
                         'alignright alignjustify | bullist numlist outdent indent | ' +
                         'removeformat | help'
                     }}
                     onEditorChange={(newContent) => setContent(newContent)}
                   />
                   </div> 
                 
                 </div>
         
              </Grid>
               <Grid size={{ xs: 12,sm:12, md: 6,}}>
                 <Slider
                   aria-label="Custom marks"
                   defaultValue={20}
                   getAriaValueText={valuetext}
                   step={10}
                   valueLabelDisplay="auto"
                   marks={marks}
                 />
              </Grid>
              <Grid size={{ xs: 12,sm:12, md: 12,}}>
                <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Maximum Coupon:</label>
                <div class="col-sm-10">
                 <input type="text"  class="form-control" id="staticEmail" value=""/>
               </div>
               </div>
              </Grid>
              <Grid size={{ xs: 12,sm:12, md: 12,}}>
                <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Active Date :</label>
                <div class="col-sm-10">
                <input type="date" class="form-control"  value={date} onChange={(e) => setDate(e.target.value)} width="100%"   />
               </div>
               </div>
              </Grid>
                <Grid size={{ xs: 12,sm:12, md: 12,}}>
                <div class="mb-3 row">
                <label for="staticEmail" class="col-sm-2 col-form-label">Expiry Date :</label>
                <div class="col-sm-10">
                <input type="date" class="form-control"  value={date} onChange={(e) => setDate(e.target.value)} width="100%"   />
               </div>
               </div>
              </Grid>
            </Grid>
          
          </Typography>
        </Box>
        <Box>
     
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
