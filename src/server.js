const path = require("path");
const express = require("express");
const Authenticator = require("./authenticator.js");
const FFDC = require("./ffdc.js");
const cors = require("cors");

const app = express();
const B2B = new Authenticator();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  express.static(path.resolve(__dirname, "../dist"), {
    maxAge: "1y",
    etag: false,
  })
);
app.use(cors());

app.get("/api/login", async (req, res) => {
  try {
    var token = await B2B.getToken();
    res.setHeader("Content-Type", "application/json");
    res.json(token);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// Make API Payment B2B
app.post("/api/payment", async (req, res) => {
  console.log("in payment");
  var data = {
    sourceId: "Fake Web Payment - RTP App",
    initiatingParty: "LOCALOFFICEUS1",
    // MEMO field
    paymentInformationId: req.body.paymentInformationId,
    requestedExecutionDate: req.body.executionDate,
    instructedAmount: {
      // USER SETTABLE AMOUNT FIELD
      amount: req.body.amount,
      // CURENCY FIELD
      currency: "USD",
    },
    paymentIdentification: {
      endToEndId: req.body.paymentInformationId,
    },
    debtor: {
      name: "First American",
    },
    debtorAgent: {
      identification: "020010001",
    },
    debtorAccountId: {
      identification: "276395636",
    },
    creditor: {
      name: req.body.creditor,
    },
    creditorAgent: {
      // 131000000 - Bank of America *or* 000000007 - CitiBank
      identification: "131000000",
    },
    creditorAccountId: {
      // HARDCODED FOR RTP APP
      identification: req.body.creditorAccountId,
    },
    remittanceInformationUnstructured: req.body.memo,
  };
  const url =
    "https://api.fusionfabric.cloud/payment/payment-initiation/realtime-payments/v2/us-real-time-payment/tch-rtps/initiate";

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

// Payment Request -- ISO20022 v2
app.post("/api/initiate-payment-request", async (req, res) => {
  console.log("payment request initiated");
  var paymentRequestInitiate = {
    InitiationContext: {
      id: "real_time",
      subId: "string",
      schmeNm: "TCH_RTPS",
      saveOnError: true,
      sourceId: "string",
    },
    CdtrPmtActvtnReq: {
      GrpHdr: {
        MsgId: "1506926089717",
        CreDtTm: "2016-11-08T13:21:00.941",
        NbOfTxs: "1",
        InitgPty: {
          Id: {
            OrgId: {
              Othr: [
                {
                  Id: "777777777",
                },
              ],
            },
          },
        },
      },
      PmtInf: [
        {
          PmtInfId: "1506926089717",
          PmtMtd: "TRF",
          ReqdExctnDt: "2016-08-28",
          Dbtr: {
            Nm: req.body.dbtrNm,
          },
          DbtrAcct: {
            Id: {
              Othr: {
                Id: "1919191919",
              },
            },
          },
          DbtrAgt: {
            FinInstnId: {
              ClrSysMmbId: {
                MmbId: "020010001",
              },
            },
          },
          CdtTrfTx: [
            {
              PmtId: {
                InstrId: "1506926089717",
                EndToEndId: "1506926089717",
              },
              PmtTpInf: {
                SvcLvl: {
                  Cd: "SDVA",
                },
                LclInstrm: {
                  Prtry: "CONSUMER",
                },
              },
              Amt: {
                InstdAmt: {
                  Ccy: "USD",
                  Amt: req.body.amt,
                },
              },
              ChrgBr: "SLEV",
              CdtrAgt: {
                FinInstnId: {
                  ClrSysMmbId: {
                    MmbId: "131000000",
                  },
                },
              },
              Cdtr: {
                Nm: "NPP CR test ACC",
              },
              CdtrAcct: {
                Id: {
                  Othr: {
                    Id: "745521145",
                  },
                },
              },
            },
          ],
        },
      ],
    },
    // need to review this because the var starts with "@" symbol
    "@xmlns": "urn:iso:std:iso:20022:tech:xsd:pain.013.001.05",
  };
  const url =
    "https://api.fusionfabric.cloud/payment/iso/payment-request/v2/real-time/initiate";

  try {
    if (!req.body.token) {
      res.status(500).send("Missing token!");
    }

    const ffdc = new FFDC(req.body.token);
    const result = await ffdc.callAPI(url, paymentRequestInitiate);

    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Transaction Search - Payment Request by Debtor Account
app.get("api/transaction-search-debtorID", async (req, res) => {
  console.log("Payments Transaction request in progress");
  var transactionRequest = {};
  const url =
    "https://api.fusionfabric.cloud/payment/operations/search/v1/payment-request?transactionType=RequestForPayment&debtorAccount=1919191919";

  try {
    if (!req.body.token) {
      res.status(500).send("Missing token!");
    }

    const ffdc = new FFDC(req.body.token);
    const result = await ffdc.callAPI(url, transactionRequest);
    res.transactionRequest("Content-Type", "application/json");
    console.log(transactionRequest);
    res.status(200).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(process.env.BACK_PORT || 8000, () => {
  console.log(`Server is listening on port ${process.env.BACK_PORT}`);
});

// Retrieve Payment Requests By Account Number
// app.get("/api/retrieve-payment-requests", async (req, res) => {
//   console.log("retrieving Payment Requests"),

// });
