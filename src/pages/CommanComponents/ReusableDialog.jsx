import React, { useState } from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel,
  Grid, Radio, RadioGroup, Slide, TextField, Typography, useMediaQuery, Tabs, Tab,} from "@mui/material";
import { Card } from "react-bootstrap";
import { CardBody, CardTitle } from "react-bootstrap";
import CampaignIcon from "@mui/icons-material/Campaign";

import imgdrak from "../../assets/cashilogosmall-03.png";
import bgcashi from "../../assets/patteren.png";
import { useNavigate } from "react-router-dom";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function TabPanel({ children, value, index }) {
  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  );
}

function ReusableDialog({ open, onClose }) {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:768px)");
  const [tab, setTab] = useState(0);
  const [channel, setChannel] = useState("sms");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [imageFile3, setImageFile3] = useState(null);
  const [image3Preview, setImage3Preview] = useState(null);

  const [imageFileMail, setImageFileMail] = useState(null);
  const [imageMailPreview, setImageMailPreview] = useState(null);

  const [contentPreview, setContentPreview] = useState("");
  const [campTitlePreview, setCampTitlePreview] = useState("");

  const [content2Preview, setContent2Preview] = useState("");
  const [campTitle2Preview, setCampTitle2Preview] = useState("");

  const [content3Preview, setContent3Preview] = useState("");
  const [campTitle3Preview, setCampTitle3Preview] = useState("");

  const [contentSmsPreview, setContentSmsPreview] = useState("");
  const [campTitleSmsPreview, setCampTitleSmsPreview] = useState("");

  const [contentMailPreview, setContentMailPreview] = useState("");
  const [campTitleMailPreview, setCampTitleMailPreview] = useState("");

  const handleChangeTab = (e, newValue) => setTab(newValue);
  const handleChannelChange = (e) => {
    setChannel(e.target.value);
    setTab(0); // reset to first template when switching channel
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleImageChange3 = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile3(file);
      setImage3Preview(URL.createObjectURL(file));
    }
  };
  const handleImageChangeMail = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFileMail(file);
      setImageMailPreview(URL.createObjectURL(file));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} TransitionComponent={Transition}
     PaperProps={{
        sx: { maxWidth: 800, minHeight: 600 },
      }}
    >
      <DialogTitle sx={{
          background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
          color: "#fff",
        }} >
        <CampaignIcon sx={{ mr: 1 }} /> Campaign
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          <RadioGroup  row value={channel} onChange={handleChannelChange} sx={{ mb: 2 }}>
            <FormControlLabel value="sms" control={<Radio />} label="SMS" />
            <FormControlLabel value="mail" control={<Radio />} label="Mail" />
            <FormControlLabel value="whatsapp" control={<Radio />} label="WhatsApp" />
          </RadioGroup>

          {channel === "whatsapp" && ( 
          <Box className="hor-tab1"
           sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", border: 1, borderColor: "divider",}}>
            <Tabs
              orientation={isMobile ? "horizontal" : "vertical"}
              value={tab}
              onChange={handleChangeTab}
              sx={{ minWidth: isMobile ? "100%" : 150 }}
            >
              <Tab label="Template 1" />
              <Tab label="Template 2" />
              <Tab label="Template 3" />
            </Tabs>

            {/* Template 1 */}
            <TabPanel value={tab} index={0}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12,sm:12, md: 7,  }}>
                  <TextField fullWidth label="Campaign Name" value={campTitlePreview}
                    onChange={(e) => setCampTitlePreview(e.target.value)} sx={{ my: 1 }} />
                  <TextField fullWidth label="Content" value={contentPreview}
                    onChange={(e) => setContentPreview(e.target.value)}
                    multiline minRows={5} sx={{ my: 1 }} />
                  <Button variant="outlined" component="label">
                    {imageFile ? imageFile.name : "Upload Image"}
                    <input type="file" accept="image/*" hidden onChange={handleImageChange} />
                  </Button>
                </Grid>

                <Grid size={{ xs: 12,sm:12, md: 5,  }}>
                  <Typography variant="h6">Preview</Typography>
                  <Card>
                    <CardTitle
                      style={{ background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
                        padding: "10px 15px",  display: "flex", alignItems: "center", margin:0 }} >
                      <img src={imgdrak} alt=""
                        style={{ height: "30px",  width: "auto", background: "#fff", borderRadius: "50%",
                          padding: "4px 2px", }}
                      />
                      <Typography variant="h6" sx={{ color: "#fff", ml: 1 }}> Cashi </Typography>
                    </CardTitle>
                    <CardBody
                      style={{ padding: "10px 20px", backgroundImage: `url(${bgcashi})`, backgroundSize: "cover",
                        minHeight: "250px",}}>
                      <Box sx={{ backgroundColor: "#fff", p: 1, borderRadius: "8px",
                          boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(27, 31, 35, 0.1) 0px 0px 0px 1px",}} >
                        {imagePreview && (
                          <Box sx={{ mb: 2 }}>
                            <img src={imagePreview} alt="Preview"
                              style={{ width: "100%", maxHeight: "200px", objectFit: "contain", borderRadius: "8px", }} />
                          </Box>
                        )}
                        {contentPreview && (
                          <Typography>{contentPreview}</Typography>
                        )}
                      </Box>
                    </CardBody>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12,sm:12, md: 7,  }}>
                  <TextField fullWidth label="Campaign Name" value={campTitle2Preview} 
                   onChange={(e) => setCampTitle2Preview(e.target.value)} sx={{ my: 1 }} />
                  <TextField fullWidth label="Content" value={content2Preview}
                    onChange={(e) => setContent2Preview(e.target.value)}
                    multiline minRows={5} sx={{ my: 1 }}  />
                </Grid>

                <Grid size={{ xs: 12,sm:12, md: 5,  }}>
                  <Typography variant="h6">Preview</Typography>
                  <Card>
                    <CardTitle style={{ background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
                        padding: "10px 15px", display: "flex", alignItems: "center", margin:0 }} >
                      <img src={imgdrak} alt="img"
                        style={{ height: "30px", width: "auto", background: "#fff", borderRadius: "50%",
                          padding: "4px 2px", }} />
                      <Typography variant="h6" sx={{ color: "#fff", ml: 1 }}>  Cashi </Typography>
                    </CardTitle>
                    <CardBody
                      style={{ padding: "10px 20px", backgroundImage: `url(${bgcashi})`, backgroundSize: "cover",
                        minHeight: "250px",}}>
                      <Box sx={{ backgroundColor: "#fff", p: 1, borderRadius: "8px",
                          boxShadow: "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(27, 31, 35, 0.1) 0px 0px 0px 1px",
                        }}>
                        {content2Preview && (
                          <Typography>{content2Preview}</Typography>
                        )}
                      </Box>
                    </CardBody>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={tab} index={2}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12,sm:12, md: 7,  }}>
                  <TextField fullWidth label="Campaign Name" value={campTitle3Preview}
                    onChange={(e) => setCampTitle3Preview(e.target.value)}  sx={{ my: 1 }} />
                  <TextField fullWidth label="Content" value={content3Preview} onChange={(e) => setContent3Preview(e.target.value)}
                    multiline minRows={5} sx={{ my: 1 }} />
                  <Button variant="outlined" component="label">
                    {imageFile3 ? imageFile3.name : "Upload Image"}
                    <input type="file" accept="image/*"  hidden onChange={handleImageChange3}
                    />
                  </Button>
                </Grid>

                <Grid size={{ xs: 12,sm:12, md: 5,  }}>
                  <Typography variant="h6">Preview</Typography>
                  <Card>
                    <CardTitle style={{ background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
                        padding: "10px 15px", display: "flex", alignItems: "center", margin:0 }}>
                      <img src={imgdrak} alt="img"
                        style={{ height: "30px", width: "auto", background: "#fff", borderRadius: "50%",
                          padding: "4px 2px",}} />
                      <Typography variant="h6" sx={{ color: "#fff", ml: 1 }}> Cashi </Typography>
                    </CardTitle>
                    <CardBody
                      style={{ padding: "10px 20px",backgroundImage: `url(${bgcashi})`,
                        backgroundSize: "cover", minHeight: "250px", }} >
                      <Box  sx={{ backgroundColor: "#fff",  p: 1, borderRadius: "8px",
                          boxShadow:"rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(27, 31, 35, 0.1) 0px 0px 0px 1px",}}>
                        {content3Preview && (
                          <Typography>{content3Preview}</Typography>
                        )}
                        {image3Preview && (
                          <Box sx={{ mb: 2 }}>
                            <img src={image3Preview} alt="Preview"
                              style={{ width: "100%", maxHeight: "200px", objectFit: "contain", borderRadius: "8px", }} />
                          </Box>
                        )}
                     
                      </Box>
                    </CardBody>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
         )}

         {channel === "mail" && ( 
          <Box className="hor-tab1"
           sx={{ display: "flex", flexDirection: isMobile ? "column" : "row", border: 1,  borderColor: "divider", }}>
            <Tabs orientation={isMobile ? "horizontal" : "vertical"} value={tab}
              onChange={handleChangeTab} sx={{ minWidth: isMobile ? "100%" : 150 }} >
              <Tab label="Template 1" />
            </Tabs>

            {/* Template 1 */}
            <TabPanel value={tab} index={0}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12,sm:12, md: 7,  }}>
                  <TextField fullWidth label="Campaign Name" value={campTitleMailPreview}
                    onChange={(e) => setCampTitleMailPreview(e.target.value)} sx={{ my: 1 }} />
                  <TextField fullWidth label="Content" value={contentMailPreview}
                    onChange={(e) => setContentMailPreview(e.target.value)}
                    multiline minRows={5} sx={{ my: 1 }}
                  />
                  <Button variant="outlined" component="label">
                    {imageFileMail ? imageFileMail.name : "Upload Image"}
                    <input type="file" accept="image/*" hidden onChange={handleImageChangeMail} />
                  </Button>
                </Grid>

                <Grid size={{ xs: 12,sm:12, md: 5,  }}>
                  <Typography variant="h6">Preview</Typography>
                  <Card>
                    <CardTitle
                      style={{ background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
                        padding: "10px 15px", display: "flex", alignItems: "center", margin:0 }}>
                      <img src={imgdrak}
                        alt="img"
                        style={{ height: "30px", width: "auto", background: "#fff", borderRadius: "50%", padding: "4px 2px", }} />
                      <Typography variant="h6" sx={{ color: "#fff", ml: 1 }}> Cashi </Typography>
                    </CardTitle>
                    <CardBody style={{
                        padding: "10px 20px",
                        backgroundColor:'#eeeeee',
                        minHeight: "250px",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "#fff",
                          p: 1,
                          borderRadius: "8px",
                          boxShadow:
                            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(27, 31, 35, 0.1) 0px 0px 0px 1px",
                        }}
                      >
                        {imageMailPreview && (
                          <Box sx={{ mb: 2 }}>
                            <img
                              src={imageMailPreview}
                              alt="Preview"
                              style={{
                                width: "100%",
                                maxHeight: "200px",
                                objectFit: "contain",
                                borderRadius: "8px",
                              }}
                            />
                          </Box>
                        )}
                        {contentMailPreview && (
                          <Typography>{contentMailPreview}</Typography>
                        )}
                      </Box>
                    </CardBody>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
          </Box>
         )}
           {channel === "sms" && (
            <Box className="hor-tab1"
           sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              border: 1,
              borderColor: "divider",
            }}
          >
            <Tabs
              orientation={isMobile ? "horizontal" : "vertical"}
              value={tab}
              onChange={handleChangeTab}
              sx={{ minWidth: isMobile ? "100%" : 150 }}
            >
              <Tab label="Template 1" />
              
            </Tabs>

            {/* Template 1 */}
            <TabPanel value={tab} index={0}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12,sm:12, md: 7,  }}>
                  <TextField
                    fullWidth
                    label="Campaign Name"
                    value={campTitleSmsPreview}
                    onChange={(e) => setCampTitleSmsPreview(e.target.value)}
                    sx={{ my: 1 }}
                  />
                  <TextField
                    fullWidth
                    label="Content"
                    value={contentSmsPreview}
                    onChange={(e) => setContentSmsPreview(e.target.value)}
                    multiline
                    minRows={5}
                    sx={{ my: 1 }}
                  />
                 
                </Grid>

                <Grid size={{ xs: 12,sm:12, md: 5,  }}>
                  <Typography variant="h6">Preview</Typography>
                  <Card>
                    <CardTitle
                      style={{
                        background: "linear-gradient(195deg, #49a3f1, #1A73E8)",
                        padding: "10px 15px",
                        display: "flex",
                        alignItems: "center",
                        margin:0
                      }}
                    >
                      <img
                        src={imgdrak}
                        alt=""
                        style={{
                          height: "30px",
                          width: "auto",
                          background: "#fff",
                          borderRadius: "50%",
                          padding: "4px 2px",
                         
                        }}
                      />
                      <Typography variant="h6" sx={{ color: "#fff", ml: 1 , mb:0}}>
                        Cashi
                      </Typography>
                    </CardTitle>
                    <CardBody
                      style={{
                        padding: "10px 20px",
                      backgroundColor:'#a6cff3ff',
                        minHeight: "250px",
                      }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "#fff",
                          p: 1,
                          borderRadius: "8px",
                          boxShadow:
                            "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(27, 31, 35, 0.1) 0px 0px 0px 1px",
                        }}
                      >
                       
                        {contentSmsPreview && (
                          <Typography>{contentSmsPreview}</Typography>
                        )}
                      </Box>
                    </CardBody>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
           
         
          </Box>
           )}
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="error">
          Cancel
        </Button>
        <Button onClick={() => navigate('/campaignList')} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ReusableDialog;
