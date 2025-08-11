import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";


const Section = ({ children, className }) => (
  <div className={`p-3 bg-white mb-3 rounded ${className || ""}`}>
    {children}
  </div>
);

const RowItem = ({ label, value }) => (
  <div className="d-flex justify-content-between">
    <strong>{label}</strong>
    <span>{value}</span>
  </div>
);

const SrvmeInvoice = () => {
  return (
   
    <div className="container my-4 srvme-invoice">
        <style>{`
        .btn-success1{
        background-color:#53C675;
        }
          .text-success1{
        color:#53C675;
        }
        .bg-success1{
        background-color:#53C675;
        }
            .srvme-invoice * {
  font-size: 0.95rem;
  font-family: 'Open Sans', Helvetica, sans-serif;
}

.text-justify {
  text-align: justify;
}

@media (max-width: 768px) {
  .srvme-invoice h5 {
    font-size: 1rem;
  }
  .srvme-invoice img {
    max-width: 100%;
    height: auto;
  }
}

        `}</style>
      {/* Logo */}
      <div className="text-center p-3 bg-dark rounded-top">
        <img src="https://srvme.com/assets/logo.png" alt="Logo" className="img-fluid" style={{ maxWidth: "250px" }} />
      </div>

      {/* Invoice Header */}
      <div className="bg-success1 text-white d-flex justify-content-between p-2 flex-wrap">
        <div><strong>Invoice No:</strong> #D1298</div>
        <div><strong>Invoice Date:</strong> 1/0/2023</div>
      </div>

      {/* Invoice Details */}
      <Section className="d-flex flex-wrap justify-content-between">
        <div>
          <p className="mb-1"><strong>Invoice To:</strong></p>
          <h5 className="text-success1 m-0">Jordon Smith</h5>
          <p className="mb-0">454545454</p>
        </div>
        <div>
          <p className="mb-1"><strong>Provider Name:</strong>    <span className="text-success1 m-0">MOHAMMED</span></p>
       
          <p className="mb-2"><strong>Provider Comment:</strong> test comments for view !important;</p>
          <p className="mb-2"><strong>Payment Mode:</strong> Cash</p>
          <p className="mb-2"><strong>Warranty Validity:</strong> July 20th, 2024</p>
        </div>
      </Section>

      {/* Service List */}
      <Section>
        <div className="d-flex justify-content-between pb-2" style={{borderBottom:'3px solid #000'}}>
          <strong>Service</strong>
          <strong>Price</strong>
        </div>
        <div className="d-flex justify-content-between align-items-center py-2 " style={{borderBottom:'3px solid #000'}}>
          <div className="d-flex align-items-center">
            <img src="https://srvme.com/image/data/serviceIcon/serviceIcon_2_240123_141934_63cfbec6b1210.png" 
                 alt="Service" className="me-2" width="60" height="60" />
            Service 4 Door Closet
          </div>
          <span>0.000</span>
        </div>
      </Section>

      {/* Terms & Charges */}
      <div className="row g-3">
        <div className="col-md-8">
          <Section>
            <h5 style={{fontWeight:600}}>Terms & Conditions</h5>
            <p className="mb-0 text-justify">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation"
            </p>
          </Section>
        </div>
        <div className="col-md-4">
          <Section>
            <RowItem label="Service Charge" value="0.000" />
            <RowItem label="Service Charge 2" value="2.100" />
            <RowItem label="Other Charges" value="0.000" />
            <RowItem label="Discount" value="0.000" />
            <hr />
            <RowItem label={<span className="text-success1">Total Charge</span>} value={<strong>2.100</strong>} />
          </Section>
        </div>
      </div>

      {/* Payment Details */}
      <Section className="col-md-4"  style={{border:'3px solid #000'}}>
        <div style={{border:'3px solid #000', padding:'10px'}}>
          <RowItem label="Payment Mode:" value="Cash" />
        <RowItem label="Date:" value="12/07/2024" />
        <RowItem label="Amount:" value="10.00" />
        </div>
     
      </Section>


      {/* Footer */}
      <Section className="text-center">
        <a href="call:2212 4554545" className="text-success1 d-block mb-1">+2212 4554545</a>
        <a href="mailto:contact@srvme.com" className="text-success1">contact@srvme.com</a>
        <p className="mt-3">Thank you for choosing us. See you soon</p>
      </Section>

      {/* Buttons */}
      <div style={{backgroundColor:'#000', padding:'20px 0'}}>
         <div className="text-center my-3">
        <button className="btn btn-success1 rounded-start-pill px-4 text-white">Print</button>
        <button className="btn btn-success1 rounded-end-pill px-4 ms-1 text-white">Download</button>
      </div>

      <p className="text-center text-white  p-2 rounded-bottom mb-0">
        <strong>Note:</strong> This is computer generated receipt and does not require physical signature.
      </p>
      </div>
      
    </div>
  );
};

export default SrvmeInvoice;
