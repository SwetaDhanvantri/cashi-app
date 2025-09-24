import React, { useState, useCallback, useMemo, useRef } from 'react';
import {Box,Grid, TextField, Typography, Button, Container, Slider, Radio, RadioGroup, FormControlLabel, FormControl,
  FormLabel} from '@mui/material';
import { Add, Info} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'
import { callPostApi } from '../../components/API/ApiCallFunction';
import InfoPopover from '../CommanComponents/InfoPopover';
import GradientLoader from '../CommanComponents/GradientLoader';

export default function CreateCouponDialog() {
  const navigate = useNavigate();
  const [campusid, setCampusid] = useState(sessionStorage.getItem("campusid") || "");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const inputRef1 = useRef(null);
  const [imageFile, setImageFile] = useState('');
  const [imagePreview, setImagePreview] = useState(null);  
  const [distributionBid, setDistributionBid] = useState(5);
  const [redemptionBid, setRedemptionBid] = useState(15);
  const handleImageChange = (e) => {
  const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };  
  const [formData, setFormData] = useState({
    offerTitle: '',
    couponValue: '',
    minAmount: '',
    maxAmount: '',
    shortDesc: '',
    longDesc: '',
    dateStart: '',
    dateEnd: '',
   valueType: 'fixed', // fixed or percentage
      image: null, // <-- for image file
  });

  const [errors, setErrors] = useState({});

  const shortDescMaxLength = 150;
  const longDescMaxLength = 500;

  // Memoized slider marks
  const marks = useMemo(() => [
    { value: 5, label: '5₹' }, { value: 10, label: '10₹' },
    { value: 15, label: '15₹' }, { value: 20, label: '20₹' },
    { value: 25, label: '25₹' }, { value: 30, label: '30₹' },
  ], []);

  const marks1 = useMemo(() => [
    { value: 15, label: '15₹' }, { value: 20, label: '20₹' },
    { value: 25, label: '25₹' }, { value: 30, label: '30₹' },
    { value: 35, label: '35₹' }, { value: 40, label: '40₹' },
    { value: 45, label: '45₹' }, { value: 50, label: '50₹' },
  ], []);

  // Handlers
  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  }, []);


// inside handleSubmit
const handleSubmit = async () => {
  const tempErrors = {};
  
  if (!formData.offerTitle.trim()) tempErrors.offerTitle = 'Offer title is required';
  if (!formData.dateStart) tempErrors.dateStart = 'Active date is required';
  if (!formData.dateEnd) tempErrors.dateEnd = 'Expiry date is required';

  if (!formData.shortDesc.trim()) tempErrors.shortDesc = 'Short description is required';
  if (formData.shortDesc.length > shortDescMaxLength) tempErrors.shortDesc = `Short description cannot exceed ${shortDescMaxLength} characters`;

  if (!formData.longDesc.trim()) tempErrors.longDesc = 'Long description is required';
  if (formData.longDesc.length > longDescMaxLength) tempErrors.longDesc = `Long description cannot exceed ${longDescMaxLength} characters`;

  if (!formData.minAmount || Number(formData.minAmount) <= 0) {
    tempErrors.minAmount = 'Minimum order amount is required';
  }
  if (!formData.maxAmount || Number(formData.maxAmount) <= 0) {
    tempErrors.maxAmount = 'Number of coupons is required';
  }
  if (!formData.couponValue || Number(formData.couponValue) <= 0) {
    tempErrors.couponValue = 'Coupon value is required';
  }
  if (!distributionBid) {
    tempErrors.distributionBid = 'Distribution Bid is required';
  }
  if (!redemptionBid) {
    tempErrors.redemptionBid = 'Redemption Bid is required';
  }

  if (!imageFile) {
    tempErrors.image = 'Coupon image is required';
  }

  setErrors(tempErrors);
  if (Object.keys(tempErrors).length > 0) return;

  try {
     setLoading(true);
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result.split(",")[1]);
        reader.onerror = (error) => reject(error);
      });

    let fileData = "";
    if (imageFile) {
      fileData = await toBase64(imageFile);
    }

    const payload = {
      mod: "ADD_CASHI_OFFER",
      data_arr: {
        store_id: "1020",
        offer_title: formData.offerTitle,
        short_desc: formData.shortDesc,
        long_desc: formData.longDesc,
        coupon_coin: formData.couponValue,
        max_coupon: formData.maxAmount,
        // min_order: formData.minAmount,  
        // distribution_bid: distributionBid,
        // redemption_bid: redemptionBid,
        // value_type: formData.valueType,
        offer_active: formData.dateStart,
        offer_expire: formData.dateEnd,
        offerImage: {
          file_name: imageFile ? imageFile.name : "",
          file_data: fileData,
        },
      },
    };

    const apiResult = await callPostApi("cashi-offer", payload);
    console.log("payload" + JSON.stringify(payload) )
    if (apiResult.status === "200" && apiResult.data) {
      toast.success("Coupon created successfully!");
      navigate(-1);
    } else {
      if (apiResult.status === "406") {
        toast.error(apiResult.status_message || "Validation error");
      } else {
        toast.error("Failed to create coupon");
      }
    }
  } catch (error) {
    console.error(error);
    toast.error("Something went wrong. Please try again.");
  }
  finally {
      setLoading(false); 
    }
};



  return (
    <Container sx={{ my: 6 }}>
       <ToastContainer />
        {loading && <GradientLoader text="Creating Coupon" />}        {/* // loader */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
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
          color: '#fff',
          borderRadius: '4px',
          mb: 3
        }}
      >
        <Add /> Create Coupon
      </Typography>
           
      <Grid container spacing={2}>
         
        {/* Coupon Title */}
        <Grid item  size={{ xs: 12,sm:12, md: 12,  }} sx={{ display: 'flex' }}>
          <TextField
            fullWidth
            label="Coupon Title"
            value={formData.offerTitle}
            onChange={(e) => updateField('offerTitle', e.target.value)}
            autoFocus
            error={!!errors.offerTitle}
            helperText={errors.offerTitle}
          />
            <InfoPopover 
             title="Use Google's location service?" 
             description="Let Google help apps determine location." 
           />

        </Grid>

        {/* Min & Max Amount */}
        <Grid item  size={{ xs: 12,sm:12, md: 6,  }} sx={{ display: 'flex' }}>
          <TextField
            fullWidth
            label="Min Order Amount"
            type="number"
            value={formData.minAmount}
            onChange={(e) => updateField('minAmount', e.target.value)}
          />
        <InfoPopover 
            title="Use Google's location service?" 
            description="Let Google help apps determine location." 
          />

        </Grid>
        <Grid item  size={{ xs: 12,sm:12, md: 6,  }} sx={{ display: 'flex' }}>
          <TextField
            fullWidth
            label="No. of Coupon"
            type="number"
            value={formData.maxAmount}
            onChange={(e) => updateField('maxAmount', e.target.value)}
          />
         <InfoPopover 
          title="Use Google's location service?" 
          description="Let Google help apps determine location." 
        />

        </Grid>

        {/* Value Type + Value */}
        <Grid item  size={{ xs: 12,sm:12, md: 12,  }}>
          <FormControl>
            <FormLabel>Coupon Value Type</FormLabel>
            <RadioGroup
              row
              value={formData.valueType}
              onChange={(e) => updateField('valueType', e.target.value)}
            >
              <FormControlLabel value="fixed" control={<Radio />} label="Fixed" />
              <FormControlLabel value="percentage" control={<Radio />} label="Percentage" />
            </RadioGroup>
          </FormControl>

          <Typography sx={{ display: 'flex' }}>
           <TextField
            fullWidth
            label="Coupon Value"
            value={formData.couponValue}
            onChange={(e) => updateField('couponValue', e.target.value)}
            error={!!errors.couponValue}
            helperText={errors.couponValue}
          />
          <InfoPopover 
            title="Use Google's location service?" 
            description="Let Google help apps determine location." 
          />

          </Typography>
         
        </Grid>

        {/* Short Description */}
        <Grid item  size={{ xs: 12,sm:12, md: 12,  }}  sx={{ display: 'flex' }}>
          <TextField
            fullWidth
            label="Short Description"
            value={formData.shortDesc}
            onChange={(e) => updateField('shortDesc', e.target.value)}
            error={!!errors.shortDesc}
            helperText={errors.shortDesc}
          />
          <InfoPopover 
             title="Use Google's location service?" 
             description="Let Google help apps determine location." 
           />

        </Grid>

        {/* Long Description */}
        <Grid item  size={{ xs: 12,sm:12, md: 12,  }}  sx={{ display: 'flex' }}>
          <TextField
            fullWidth
            label="Long Description"
            multiline
            minRows={5}
            value={formData.longDesc}
            onChange={(e) => updateField('longDesc', e.target.value)}
            error={!!errors.longDesc}
            helperText={errors.longDesc}
          />
         <InfoPopover 
            title="Use Google's location service?" 
            description="Let Google help apps determine location." 
          />

        </Grid>

        {/* Sliders */}
        <Grid item  size={{ xs: 12,sm:12, md: 6,  }} sx={{px:1}}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Distribution Bid <Info sx={{ fontSize: 20 ,  color:'#878787ff'}} />
          </Typography>
          <Slider
            min={5}
            max={30}
            defaultValue={5}
            step={1}
            marks={marks}
             value={distributionBid}
             onChange={(e, val) => setDistributionBid(val)}
            valueLabelDisplay="auto"
          />
          {errors.distributionBid && <Typography color="error">{errors.distributionBid}</Typography>}
        </Grid>

        <Grid item  size={{ xs: 12,sm:12, md: 6,  }} sx={{px:1}}>
          <Typography variant="subtitle1" sx={{ mb: 1 }}>
            Redemption value <Info sx={{ fontSize: 20 , color:'#878787ff'}} />
          </Typography>
          <Slider
            min={15}
            max={50}
            defaultValue={15}
            step={1}
            marks={marks1}
             value={redemptionBid}
            onChange={(e, val) => setRedemptionBid(val)}
            valueLabelDisplay="auto"
          />
           {errors.redemptionBid && <Typography color="error">{errors.redemptionBid}</Typography>}
        </Grid>
        
        {/* Dates */}
        <Grid item  size={{ xs: 12,sm:12, md: 6,  }}>
          <TextField
            fullWidth
            type="date"
            label="Active Date"
            InputLabelProps={{ shrink: true }}
            value={formData.dateStart}
            onChange={(e) => updateField('dateStart', e.target.value)}
            error={!!errors.dateStart}
            helperText={errors.dateStart}
            inputRef={inputRef}
             onClick={() => {
            if (inputRef.current && inputRef.current.showPicker) {
              inputRef.current.showPicker(); // Triggers calendar
            }
      }}
          />
        </Grid>
        <Grid item  size={{ xs: 12,sm:12, md: 6,  }}>
          <TextField
            fullWidth
            type="date"
            label="Expiry Date"
            InputLabelProps={{ shrink: true }}
            value={formData.dateEnd}
            onChange={(e) => updateField('dateEnd', e.target.value)}
            error={!!errors.dateEnd}
            helperText={errors.dateEnd}
             inputRef={inputRef1}
             onClick={() => {
            if (inputRef1.current && inputRef1.current.showPicker) {
              inputRef1.current.showPicker();
            }}}
          />
        </Grid>
          <Grid item size={{ xs: 12,sm:12, md: 6,  }}>
            <Typography gutterBottom>Offer Logo</Typography>
            <Button variant="outlined" component="label">
              {imageFile ? imageFile.name : "Upload Image"}
              <input type="file" accept="image/*" hidden 
              onChange={handleImageChange}
              
               />
            </Button>
            
            {imagePreview && <Box sx={{ mt: 2 }}><img src={imagePreview} alt="Preview" style={{ width: "100%", maxHeight: "200px", objectFit: "contain", border: "1px solid #ccc", borderRadius: "8px" }} /></Box>}
          </Grid>
         {errors.image && <Typography color="error">{errors.image}</Typography>}
      </Grid>

      {/* Buttons */}
      <Box sx={{ mt: 4, textAlign: 'center' }}>
        {/* <Button
          variant="contained"
          sx={{ backgroundColor: '#000', color: '#fff' }}
          onClick={() => navigate(-1)}
        >
          Back
        </Button> */}
        <Button
          variant="contained"
          sx={{ mx: 1 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}
