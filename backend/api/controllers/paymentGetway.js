
const crypto = require('crypto')
const axios = require('axios')

const paymentGetway = async (req, res) => {
    console.log('paymentInitiated')
  try {
    

    // Payload structure for PhonePe API
    const data = {
        "merchantId": "PGTESTPAYUAT86",  // Example Merchant ID
      'merchantTransactionId': `MT${Date.now()}`,  // Dynamic Transaction ID
      'merchantUserId': "MUID123",
      'amount': 10000,  // Amount in paise (100 rupees)
      'redirectUrl': "http://localhost:3001",
      'redirectMode': 'REDIRECT',
      'paymentInstrument': {
        'type': "PAY_PAGE",
      },
    };

    // Base64 encode the payload
    const payLoad = JSON.stringify(data);
    const base64Payload = Buffer.from(payLoad).toString("base64");

    // Compute X-VERIFY checksum
    const saltKey = "96434309-7796-489d-8924-ab56988a6076";  // Example salt key
    const saltIndex = "1";  // Example salt index
    const stringToHash = base64Payload + '/pg/v1/pay' + saltKey;
    const sha256Hash = crypto.createHash('sha256').update(stringToHash).digest('hex');
    const checksum = sha256Hash + '###' + saltIndex;

    // Setup the request options
    const options = {
      method: 'POST',
      url: 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay',
      headers: {
        accept: 'application/json',  // Expect a JSON response
        'Content-Type': 'application/json',
        'X-VERIFY': checksum,  // X-VERIFY checksum header
      },
      data: {
        request: base64Payload,  // Base64-encoded payload
      },
    };

    // Send the request using Axios
    axios
      .request(options)
      .then(function (response) {
        const redirectUrl = response.data.data.instrumentResponse.redirectInfo.url;
        console.log('response.data: ', redirectUrl);
       
       return res.status(200).json({
        success:true,
        url:redirectUrl
       });  // Send back the API response
      })
      .catch(function (error) {
        console.error('Error response:', error);
        res.status(500).json({
          success: false,
          message: 'Payment gateway request failed',
          error: error.response ? error.response.data : error.message,
        });
      });

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
};

module.exports = paymentGetway;
