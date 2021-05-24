const path = require('path');
const express = require('express');
const Authenticator = require('./authenticator.js') 
const FFDC = require('./ffdc.js');
const cors = require('cors');

const app = express();
const B2B = new Authenticator();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(
    path.resolve(__dirname, '../dist'),
    { maxAge: '1y', etag: false})
);
app.use(cors());

app.get('/api/login', async (req, res) => {
    try {
        var token = await B2B.getToken();
        res.setHeader('Content-Type', 'application/json');
        res.json(token);
    } catch(err) {
        res.status(500).send(err);
    };   
})

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
})

pp.post('/api/payment', async (req, res) => {
    console.log("in payment");
    var data = 
      {
        "sourceId": "Fake Web Payment - RTP App",
        "initiatingParty": "LOCALOFFICEUS1",
        // MEMO field 
        "paymentInformationId": req.body.paymentInformationId,
        "requestedExecutionDate": "2021-05-04",
        "instructedAmount": 
          {
            // USER SETTABLE AMOUNT FIELD
            "amount": req.body.amount,
            // CUURENCY FIELD
            "currency": req.body.currency
              
          },
        "paymentIdentification": 
          {
              
            "endToEndId": "0020012021001"
              
          },
        "debtor": 
          {
          //   DEBTOR NAME field in app
            "name": req.body.debtor
              
          },
        "debtorAgent": 
          {
          // Hardcoded
            "identification": "020010001"
              
          },
        "debtorAccountId": 
          {
          // hardcoded to identify RTP app
            "identification": "0009132003"
              
          },
        "creditor": 
          {
          //   CREDITOR NAME FIELD IN APP
            "name": req.body.creditor
              
          },
        "creditorAgent": 
          {
          // 131000000 - Bank of America *or* 000000007 - CitiBank
            "identification": "131000000"
              
          },
        "creditorAccountId": 
          
          {
          // HARDCODED FOR RTP APP
            "identification": "0987654321"
          },
        "remittanceInformationUnstructured": "RmtInf7890"
          
      };
    const url = "https://api.fusionfabric.cloud/payment/payment-initiation/realtime-payments/v2/us-real-time-payment/tch-rtps/initiate";
  
    try {
      if (!req.body.token) {
        res.status(500).send("Missing token!");
      }
          
      const ffdc = new FFDC(req.body.token);
      const result = await ffdc.callAPI(url, data);
  
      res.status(200).send(result);
    } catch (err) {
      res.status(500).send(err);
    }
      
  });

app.listen(process.env.BACK_PORT || 8000, () => {
    console.log(`Server is listening on port ${process.env.BACK_PORT}`);
});
