// import React, { useState } from 'react';
// import {
//   Box,
//   Grid,
//   TextField,
//   Typography,
//   Button,
//   Container
// } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import { Editor } from '@tinymce/tinymce-react';

// import Slider from '@mui/material/Slider';
// import { Add } from '@mui/icons-material';

// export default function CreateCouponDialog() {
//   const navigate = useNavigate();
//   const [dateStart, setDateStart] = useState('');
//   const [dateEnd, setDateEnd] = useState('');
//   const [shortDesc, setShortDesc] = useState('');
//   const [longDesc, setLongDesc] = useState('');
//   const [longDescL, setLongDescL] = useState('');
//   const [imageFile, setImageFile] = useState('');
//   const [imagePreview, setImagePreview] = useState(null);
//   const [imageFileOffer, setImageFileOffer] = useState('');
//   const [imagePreviewOffer, setImagePreviewOffer] = useState(null);
//   const [errors, setErrors] = useState({});
//   // Limits
//   const shortDescMaxLength = 150;
//   const longDescMaxLength = 500;
//   const marks = [
//     { value: 5, label: '5₹' },
//     { value: 10, label: '10₹' },
//     { value: 15, label: '15₹' },
//     { value: 20, label: '20₹' },
//     { value: 25, label: '25₹' },
//     { value: 30, label: '30₹' },
//   ];
//   const marks1 = [
//     { value: 15, label: '15₹' },
//     { value: 20, label: '20₹' },
//     { value: 25, label: '25₹' },
//     { value: 30, label: '30₹' },
//     { value: 35, label: '35₹' },
//     { value: 40, label: '40₹' },
//     { value: 45, label: '45₹' },
//     { value: 50, label: '50₹' },
//   ];
//   function valuetext(value) {
//     return `${value}₹`;
//   }
//    const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };
//    const handleImageChangeoffer = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFileOffer(file);
//       setImagePreviewOffer(URL.createObjectURL(file));
//     }
//   };

//   //validations
//   const validateForm = () => {
//     let tempErrors = {};

//     if (!offerTitle.trim()) tempErrors.offerTitle = "Offer title is required";
//     if (!dateStart) tempErrors.dateStart = "Active date is required";
//     if (!dateEnd) tempErrors.dateEnd = "Expiry date is required";
//     if (!shortDesc.trim()) tempErrors.shortDesc = "Short description is required";
//     if (shortDesc.length > shortDescMaxLength) tempErrors.shortDesc = `Short description cannot exceed ${shortDescMaxLength} characters`;
//     if (!longDesc.trim()) tempErrors.longDesc = "Long description is required";
//     if (longDesc.length > longDescMaxLength) tempErrors.longDesc = `Long description cannot exceed ${longDescMaxLength} characters`;
//     if (!imageFile) tempErrors.imageFile = "Offer logo is required";
//     if (!imageFileOffer) tempErrors.imageFileOffer = "Offer image is required";

//     setErrors(tempErrors);
//     return Object.keys(tempErrors).length === 0;
//   };

//   const handleSubmit = () => {
//     // if (!validateForm()) return;

//     // console.log({
//     //   offerTitle,
//     //   minAmount,
//     //   maxAmount,
//     //   shortDesc,
//     //   longDesc,
//     //   dateStart,
//     //   dateEnd,
//     //   imageFile,
//     //   imageFileOffer
//     // 
//     //});

//     navigate('/dashboard');
//   };


  

//   return (
//     <Container  sx={{ my: 6 }}>
//       <Typography variant="h6" gutterBottom sx={{background:'linear-gradient(195deg, #49a3f1, #1A73E8)', p:1, color:'#ffffff', borderRadius:'4px'}}>
//        <Add /> Create Coupon
//       </Typography>

//       <Grid container spacing={2}>
//         {/* Offer Title */}
//         <Grid item size={{ xs: 12,sm:12, md: 12,}}>
//           <TextField
//             fullWidth
//             label="Offer Title"
//             variant="outlined"
//           />
//         </Grid>
//          <Grid item size={{ xs: 12,sm:12, md: 6,}}>
//           <TextField
//             fullWidth
//             label="Min Order Amount"
//             variant="outlined"
//             type="number"
//              inputProps={{ min: 0 }}
//           />
//         </Grid>
//           <Grid item size={{ xs: 12,sm:12, md: 6,}}>
//           <TextField
//             fullWidth
//             label="Max Order Amount"
//             variant="outlined"
//              type="number"
//              inputProps={{ min: 0 }}
//           />
//         </Grid>
//         {/* Short Description */}
//         <Grid item size={{ xs: 12,sm:12, md: 12,}}>
//           <Typography variant="subtitle1" sx={{ mb: 1 }}>
//             Short Description
//           </Typography>
//              <Editor
//             apiKey="c08v0mzmmmku032emoeacdwxx6xip8dze3a01kjcj1vb3i1f"
//             value={longDesc}
//             init={{
//               height: 200,
//               menubar: false,
//               plugins: [
//                 'advlist autolink lists link image charmap preview anchor',
//                 'searchreplace visualblocks code fullscreen',
//                 'insertdatetime media table paste code help wordcount',
//               ],
//               toolbar:
//                 'undo redo | formatselect | bold italic backcolor | ' +
//                 'alignleft aligncenter alignright alignjustify | ' +
//                 'bullist numlist outdent indent | removeformat | help',
//             }}
//             onEditorChange={(content) => setLongDesc(content)}
//            // onEditorChange={handleEditorChange}
//           />
//         </Grid>

//         {/* Long Description */}
//         <Grid item size={{ xs: 12,sm:12, md: 12,}}>
//           <Typography variant="subtitle1" sx={{ mb: 1 }}>
//             Long Description
//           </Typography>
//           <Editor
//             apiKey="c08v0mzmmmku032emoeacdwxx6xip8dze3a01kjcj1vb3i1f"
//             value={longDescL}
//             init={{
//               height: 200,
//               menubar: false,
//               plugins: [
//                 'advlist autolink lists link image charmap preview anchor',
//                 'searchreplace visualblocks code fullscreen',
//                 'insertdatetime media table paste code help wordcount',
//               ],
//               toolbar:
//                 'undo redo | formatselect | bold italic backcolor | ' +
//                 'alignleft aligncenter alignright alignjustify | ' +
//                 'bullist numlist outdent indent | removeformat | help',
//             }}
//             onEditorChange={(content) => setLongDescL(content)}
//            // onEditorChange={handleEditorChange}
//           />
            
//         </Grid>

//         {/* Slider */}
//         <Grid item size={{ xs: 12,sm:12, md: 6,}}>
//           <Box sx={{mx:2}}>
//            <Typography variant="subtitle1" sx={{ mb: 1 }}>
//             Distribution Bid
//           </Typography>
//           <Box sx={{ width: '100%', }}>
//             <Slider
//               aria-label="Custom marks"
//                min={5}        // starting value
//                max={30}       // ending value
//               defaultValue={5}
//               getAriaValueText={valuetext}
//               step={1}
//               valueLabelDisplay="auto"
//               marks={marks}
//             />
//           </Box>
//           </Box>
         
//         </Grid>

//         <Grid item size={{ xs: 12,sm:12, md: 6,}}>
//           <Box sx={{mx:2}}>
//            <Typography variant="subtitle1" sx={{ mb: 1 }}>
//             Redemption Bid
//           </Typography>
//           <Box sx={{ width: '100%' , mx:2}}>
//             <Slider
//               aria-label="Custom marks"
//                min={15}        // starting value
//                max={50}       // ending value
//               defaultValue={15}
//               getAriaValueText={valuetext}
//               step={1}
//               valueLabelDisplay="auto"
//               marks={marks1}
//             />
//           </Box>
//           </Box>
         
//         </Grid>
//         {/* Active Date */}
//         <Grid item size={{ xs: 12,sm:12, md: 6,}}>
//           <TextField
//             fullWidth
//             type="date"
//             label="Active Date"
//             InputLabelProps={{ shrink: true }}
//             value={dateStart}
//             onChange={(e) => setDateStart(e.target.value)}
//           />
//         </Grid>

//         {/* Expiry Date */}
//         <Grid item size={{ xs: 12,sm:12, md: 6,}}>
//           <TextField
//             fullWidth
//             type="date"
//             label="Expiry Date"
//             InputLabelProps={{ shrink: true }}
//             value={dateEnd}
//             onChange={(e) => setDateEnd(e.target.value)}
//             error={!!errors.dateEnd}
//             helperText={errors.dateEnd}
//           />
//         </Grid>

//         <Grid item size={{ xs: 12,sm:12, md: 6,}}>
         
//            <Box sx={{ mt: 3 }}>
//           <Typography gutterBottom>Offer Logo</Typography>
//           <Button variant="outlined" component="label">
//               {imageFile ? imageFile.name : "Upload Image"}
//             <input
//               type="file"
//               accept="image/*"
//               hidden
//               onChange={handleImageChange}
//             />
//           </Button>

//           {/* Image Preview */}
//           {imagePreview && (
//             <Box sx={{ mt: 2 }}>
//               <img
//                 src={imagePreview}
//                 alt="Preview"
//                 style={{
//                   width: "100%",
//                   maxHeight: "200px",
//                   objectFit: "contain",
//                   border: "1px solid #ccc",
//                   borderRadius: "8px",
//                 }}
//               />
//             </Box>
//           )}
//         </Box>
//         </Grid>
//         <Grid item size={{ xs: 12,sm:12, md: 6,}}>
//             <Box sx={{ mt: 3 }}>
//           <Typography gutterBottom>Offer Image</Typography>
//           <Button variant="outlined" component="label">
//              {imageFileOffer ? imageFileOffer.name : "Upload Image"}
//             <input
//               type="file"
//               accept="image/*"
//               hidden
//               onChange={handleImageChangeoffer}
//             />
//           </Button>

//           {/* Image Preview */}
//           {imagePreviewOffer && (
//             <Box sx={{ mt: 2 }}>
//               <img
//                 src={imagePreviewOffer}
//                 alt="Preview"
//                 style={{
//                   width: "100%",
//                   maxHeight: "200px",
//                   objectFit: "contain",
//                   border: "1px solid #ccc",
//                   borderRadius: "8px",
//                 }}
//               />
//             </Box>
//           )}
//         </Box>
//         </Grid>
//       </Grid>

//       {/* Buttons */}
//       <Box sx={{ mt: 4, textAlign: 'center' }}>
//         <Button
//           variant="contained"
//           sx={{ backgroundColor: '#000', color: '#fff' }}
//           onClick={() => navigate('/dashboard')}
//         >
//           Back
//         </Button>
//         <Button
//           variant="contained"
//           sx={{ mx: 1 }}
//           autoFocus onClick={handleSubmit}
//         >
//           Submit
//         </Button>
//       </Box>
//     </Container>
//   );
// }


import React, { useState } from 'react';
import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import Slider from '@mui/material/Slider';
import { Add } from '@mui/icons-material';

export default function CreateCouponDialog() {
  const navigate = useNavigate();
  
  // Form States
  const [dateStart, setDateStart] = useState('');
  const [dateEnd, setDateEnd] = useState('');
  const [offerTitle, setOfferTitle] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [longDesc, setLongDesc] = useState('');

  const [imageFile, setImageFile] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFileOffer, setImageFileOffer] = useState('');
  const [imagePreviewOffer, setImagePreviewOffer] = useState(null);
  const [errors, setErrors] = useState({});
  
  // Limits
  const shortDescMaxLength = 150;
  const longDescMaxLength = 500;
   const [formData, setFormData] = useState({
   offerTitle:"",
      minAmount:"",
      maxAmount:"",
      shortDesc:"",
      longDesc:"",
      dateStart:"",
      dateEnd:"",
      imageFile:"",
      imageFileOffer:""
  });
  // Sliders
  const marks = [
    { value: 5, label: '5₹' }, { value: 10, label: '10₹' },
    { value: 15, label: '15₹' }, { value: 20, label: '20₹' },
    { value: 25, label: '25₹' }, { value: 30, label: '30₹' },
  ];
  const marks1 = [
    { value: 15, label: '15₹' }, { value: 20, label: '20₹' },
    { value: 25, label: '25₹' }, { value: 30, label: '30₹' },
    { value: 35, label: '35₹' }, { value: 40, label: '40₹' },
    { value: 45, label: '45₹' }, { value: 50, label: '50₹' },
  ];
 function valuetext(value) {
//     return `${value}₹`;
  }
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageChangeOffer = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFileOffer(file);
      setImagePreviewOffer(URL.createObjectURL(file));
    }
  };

  // Validation
  const validateForm = () => {
    let tempErrors = {};

    if (!offerTitle.trim()) tempErrors.offerTitle = "Offer title is required";
    if (!dateStart) tempErrors.dateStart = "Active date is required";
    if (!dateEnd) tempErrors.dateEnd = "Expiry date is required";
    if (!shortDesc.trim()) tempErrors.shortDesc = "Short description is required";
    if (shortDesc.length > shortDescMaxLength) tempErrors.shortDesc = `Short description cannot exceed ${shortDescMaxLength} characters`;
    if (!longDesc.trim()) tempErrors.longDesc = "Long description is required";
    if (longDesc.length > longDescMaxLength) tempErrors.longDesc = `Long description cannot exceed ${longDescMaxLength} characters`;
    if (!imageFile) tempErrors.imageFile = "Offer logo is required";
    if (!imageFileOffer) tempErrors.imageFileOffer = "Offer image is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

 const clearError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    clearError(field);
  };

  // Remove error when user types or presses enter
const handleFieldChange = (field, value) => {
  setErrors((prev) => ({ ...prev, [field]: "" }));
  switch (field) {
    case "offerTitle":
      setOfferTitle(value);
      break;
    case "shortDesc":
      setShortDesc(value);
      break;
    case "longDesc":
      setLongDesc(value);
      break;
    case "minAmount":
      setMinAmount(value);
      break;
    case "maxAmount":
      setMaxAmount(value);
      break;
    default:
      break;
  }
};

const handleKeyDown = (field) => {
  setErrors((prev) => ({ ...prev, [field]: "" }));
};

  const handleSubmit = () => {
    if (!validateForm()) return;

    console.log({
      offerTitle,
      minAmount,
      maxAmount,
      shortDesc,
      longDesc,
      dateStart,
      dateEnd,
      imageFile,
      imageFileOffer
    });

    navigate('/dashboard');
  };

  return (
    <Container sx={{ my: 6 }}>
      <Typography variant="h6" gutterBottom sx={{ background: 'linear-gradient(195deg, #49a3f1, #1A73E8)', p: 1, color: '#ffffff',
         borderRadius: '4px', mb:3 }}>
        <Add /> Create Coupon
      </Typography>

      <Grid container spacing={2}>
        {/* Offer Title */}
        <Grid item size={{ xs: 12,sm:12, md: 12,  }}>
          <TextField
            fullWidth
            label="Offer Title"
            variant="outlined"
            value={offerTitle}
          //  onChange={(e) => setOfferTitle(e.target.value)}
          onChange={(e) => {
            setOfferTitle(e.target.value);
            setErrors((prev) => ({ ...prev, offerTitle: '' }));
           }}
            onKeyDown={() => handleKeyDown("offerTitle")}
            error={!!errors.offerTitle}
            helperText={errors.offerTitle}
          />
        </Grid>

        {/* Amount Fields */}
        <Grid item size={{ xs: 12,sm:12, md: 6,  }}>
          <TextField
            fullWidth
            label="Min Order Amount"
            variant="outlined"
            type="number"
            value={minAmount}
            onChange={(e) => {
              setMinAmount(e.target.value);
               setErrors((prev) => ({ ...prev, minAmount: '' }));
            }}
             onKeyDown={() => handleKeyDown("minAmount")}
            inputProps={{ min: 0 }}
          />
        </Grid>
        <Grid item size={{ xs: 12,sm:12, md: 6,  }}>
          <TextField
            fullWidth
            label="Max Order Amount"
            variant="outlined"
            type="number"
            value={maxAmount}
            onChange={(e) => {setMaxAmount(e.target.value);
                setErrors((prev) => ({ ...prev, maxAmount: '' }));
            }}
             onKeyDown={() => handleKeyDown("maxAmount")}
            inputProps={{ min: 0 }}
          />
        </Grid>

        {/* Short Description */}
        <Grid item size={{ xs: 12,sm:12, md: 12,  }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Short Description ({shortDesc.length}/{shortDescMaxLength})
          </Typography>
          <Editor
            apiKey="c08v0mzmmmku032emoeacdwxx6xip8dze3a01kjcj1vb3i1f"
            
              value={shortDesc}
                init={{
              height: 200,
              menubar: false,
              plugins: ['wordcount', 'code'],
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
              setup: (editor) => {
                editor.on('input', () => {
                  const content = editor.getContent({ format: 'text' });
                  if (content.length <= shortDescMaxLength) {
                    setShortDesc(content);
                  } else {
                    editor.setContent(shortDesc);
                  }
                });
              }
            }}
         
                onChange={(e) => handleChange("shortDesc", e.target.value)}
                onKeyDown={() => handleKeyDown("shortDesc")}
            />
            {errors.shortDesc && <Typography color="error">{errors.shortDesc}</Typography>}
        </Grid>

        {/* Long Description */}
        <Grid item size={{ xs: 12,sm:12, md: 12,  }}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Long Description ({longDesc.length}/{longDescMaxLength})
          </Typography>
          <Editor
            apiKey="c08v0mzmmmku032emoeacdwxx6xip8dze3a01kjcj1vb3i1f"
            value={longDesc}
            init={{
              height: 200,
              menubar: false,
              plugins: ['wordcount', 'code'],
              toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
              setup: (editor) => {
                editor.on('input', () => {
                  const content = editor.getContent({ format: 'text' });
                  if (content.length <= longDescMaxLength) {
                    setLongDesc(content);
                  } else {
                    editor.setContent(longDesc);
                  }
                });
              }
            }}
            onChange={(e) => handleChange("longDesc", e.target.value)}
             onKeyDown={() => handleKeyDown("longDesc")}
          />
          {errors.longDesc && <Typography color="error">{errors.longDesc}</Typography>}
        </Grid>
        {/* Slider */}
        <Grid item size={{ xs: 12,sm:12, md: 6,}}>
          <Box sx={{mx:2}}>
           <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Distribution Bid
          </Typography>
          <Box sx={{ width: '100%', }}>
            <Slider
              aria-label="Custom marks"
               min={5}        // starting value
               max={30}       // ending value
              defaultValue={5}
              getAriaValueText={valuetext}
              step={1}
              valueLabelDisplay="auto"
              marks={marks}
            />
          </Box>
          </Box>
         
        </Grid>

        <Grid item size={{ xs: 12,sm:12, md: 6,}}>
          <Box sx={{mx:2}}>
           <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Redemption Bid
          </Typography>
          <Box sx={{ width: '100%' , mx:2}}>
            <Slider
              aria-label="Custom marks"
               min={15}        // starting value
               max={50}       // ending value
              defaultValue={15}
              getAriaValueText={valuetext}
              step={1}
              valueLabelDisplay="auto"
              marks={marks1}
            />
          </Box>
          </Box>
         
        </Grid>
        {/* Dates */}
        <Grid item size={{ xs: 12,sm:12, md: 6,  }}>
          <TextField
            fullWidth
            type="date"
            label="Active Date"
            InputLabelProps={{ shrink: true }}
            value={dateStart}
            onChange={(e) => {setDateStart(e.target.value)
                setErrors((prev) => ({ ...prev, dateStart: '' }));
            }}
             onKeyDown={() => handleKeyDown("dateStart")}
            error={!!errors.dateStart}
            helperText={errors.dateStart}
          />
        </Grid>
        <Grid item size={{ xs: 12,sm:12, md: 6,  }}>
          <TextField
            fullWidth
            type="date"
            label="Expiry Date"
            InputLabelProps={{ shrink: true }}
            value={dateEnd}
            onChange={(e) => {setDateEnd(e.target.value);
               setErrors((prev) => ({ ...prev, dateEnd: '' }));
            }}
             onKeyDown={() => handleKeyDown("dateEnd")}
            error={!!errors.dateEnd}
            helperText={errors.dateEnd}
          />
        </Grid>

        {/* Image Uploads */}
        <Grid item size={{ xs: 12,sm:12, md: 6,  }}>
          <Typography gutterBottom>Offer Logo</Typography>
          <Button variant="outlined" component="label">
            {imageFile ? imageFile.name : "Upload Image"}
            <input type="file" accept="image/*" hidden onChange={handleImageChange}
            onClick={() => clearError("imageFile")}
             />
          </Button>
          {errors.imageFile && <Typography color="error">{errors.imageFile}</Typography>}
          {imagePreview && <Box sx={{ mt: 2 }}><img src={imagePreview} alt="Preview" style={{ width: "100%", maxHeight: "200px", objectFit: "contain", border: "1px solid #ccc", borderRadius: "8px" }} /></Box>}
        </Grid>

        <Grid item size={{ xs: 12,sm:12, md: 6,  }}>
          <Typography gutterBottom>Offer Image</Typography>
          <Button variant="outlined" component="label">
            {imageFileOffer ? imageFileOffer.name : "Upload Image"}
            <input type="file" accept="image/*" hidden onChange={handleImageChangeOffer} 
            onClick={() => clearError("imageFileOffer")}/>
          </Button>
          {errors.imageFileOffer && <Typography color="error">{errors.imageFileOffer}</Typography>}
          {imagePreviewOffer && <Box sx={{ mt: 2 }}><img src={imagePreviewOffer} alt="Preview" style={{ width: "100%", maxHeight: "200px", objectFit: "contain", border: "1px solid #ccc", borderRadius: "8px" }} /></Box>}
        </Grid>
      </Grid>

      {/* Buttons */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Button variant="contained" sx={{ backgroundColor: '#000', color: '#fff' }} onClick={() => navigate('/dashboard')}>Back</Button>
        <Button variant="contained" sx={{ mx: 1 }} autoFocus onClick={handleSubmit}>Submit</Button>
      </Box>
    </Container>
  );
}
