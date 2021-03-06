---
id: verifiable-payid-tutorial
title: Get Started with Verifiable PayID
sidebar_label: Get Started with Verifiable PayID
---

In this guide, you will deploy a local PayID server, create a PayID, sign and verify the PayID, and test it using calls to the PayID Admin API. If you want to use base PayID without verification, see [Getting Started](/).

For more information about Verifiable PayID, see [Enhance Security With Verifiable PayID](verifiable-payid).

Before you begin:

- Deploy a PayID server locally. See [Getting Started: Deploy a PayID Server](/#run-a-payid-server).
- [Install PayID CLI](payid-cli). You will use the command line to perform the tasks in this tutorial.

1. Open the command line. Enter `payid`. You can now enter commands in interactive mode.
2. See the available commands: enter `help`. Note the commands related to signing and verifying PayIDs.
3. Create an empty PayID: `init verifiabledemo$127.0.0.1`.
4. Add a crypto address:`crypto-address add XRPL TESTNET rDk7FQvkQxQQNGTtfM2Fr66s7Nm3k87vdS`. This command specifies the relevant `paymentNetwork`, `environment`, and `address` for your ledger.
5. Generate a user identity key:`keys generate`. This key is stored locally at the specified location. Make sure you keep the key in a safe place.
6. Sign the PayID with the user identity key to create a verified PayID and address payload: `sign`.
7. Remove the unverified crypto address: `crypto-address remove rDk7FQvkQxQQNGTtfM2Fr66s7Nm3k87vdS`. The output payload should have this format:

```js
{
  "payId": "verifiabledemo$127.0.0.1",
  "addresses": [],
  "verifiedAddresses": [
    {
      "payload": "{\"payId\":\"test$example.com\",\"payIdAddress\":{\"paymentNetwork\":\"XRPL\",\"environment\":\"TESTNET\",\"addressDetailsType\":\"CryptoAddressDetails\",\"addressDetails\":{\"address\":\"rDk7FQvkQxQQNGTtfM2Fr66s7Nm3k87vdS\"}}}",
      "signatures": [
        {
          "protected": "eyJuYW1lIjoiaWRlbnRpdHlLZXkiLCJhbGciOiJFUzI1NksiLCJ0eXAiOiJKT1NFK0pTT04iLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCIsIm5hbWUiXSwiandrIjp7ImNydiI6InNlY3AyNTZrMSIsIngiOiI2S0dtcEF6WUhWUm9qVmU5UEpfWTVyZHltQ21kTy1xaVRHem1Edl9waUlvIiwieSI6ImhxS3Vnc1g3Vjk3eFRNLThCMTBONUQxcW44MUZWMjItM1p0TURXaXZfSnciLCJrdHkiOiJFQyIsImtpZCI6Im4zNlhTc0M1TjRnNUtCVzRBWXJ5d1ZtRE1kUWNEV1BJX0RfNUR1UlNhNDAifX0",
          "signature": "rsoKeVLzwg2PpGRK0S10fpmh5WNtttF9dyJgSv3USEr4aN3bUBzp5ImRQo8wlh3E00GtZ2cse-lhoQ4zJKj0Jw"
        }
      ]
    }
  ]
}
```

8. Upload the verified PayID. If you are using the PayID Admin API version from 2020-08-25 or later, POST the payload from Step 7 to the Admin API endpoint. See [PayID API Reference](https://api.payid.org). As mentioned, you must have a PayID server deployed to use this API.
   If you use the PayID Admin API version from before 2020-08-25, then you must modify this payload.
   - `identityKey` should have the contents of the `protected` field in Step 7.
   - `verifiedAddresses` should be the un-stringified JSON contents of the `payload` field in Step 7.
   - `identityKeySignature` should be the `signature` field in Step 7.
     The payload for older versions of the PayID Admin API appears as follows:

```js
{
   "payId": "verifiabledemo$127.0.0.1",
   "identityKey": "eyJuYW1lIjoiaWRlbnRpdHlLZXkiLCJhbGciOiJFUzI1NksiLCJ0eXAiOiJKT1NFK0pTT04iLCJiNjQiOmZhbHNlLCJjcml0IjpbImI2NCIsIm5hbWUiXSwiandrIjp7ImNydiI6InNlY3AyNTZrMSIsIngiOiI2S0dtcEF6WUhWUm9qVmU5UEpfWTVyZHltQ21kTy1xaVRHem1Edl9waUlvIiwieSI6ImhxS3Vnc1g3Vjk3eFRNLThCMTBONUQxcW44MUZWMjItM1p0TURXaXZfSnciLCJrdHkiOiJFQyIsImtpZCI6Im4zNlhTc0M1TjRnNUtCVzRBWXJ5d1ZtRE1kUWNEV1BJX0RfNUR1UlNhNDAifX0",
   "addresses": [],
   "verifiedAddresses": [
       {
           "paymentNetwork": "XRPL",
           "environment": "TESTNET",
           "details": {
               "address": "rDk7FQvkQxQQNGTtfM2Fr66s7Nm3k87vdS"
           },
           "identityKeySignature": "rsoKeVLzwg2PpGRK0S10fpmh5WNtttF9dyJgSv3USEr4aN3bUBzp5ImRQo8wlh3E00GtZ2cse-lhoQ4zJKj0Jw"
       }
   ]
}
```

9. Retrieve and verify the verified PayID using PayID CLI. These commands do not use interactive mode.

   ```bash
      payid load verifiabledemo$127.0.0.11
      payid inspect
      payid verify
   ```

10. Verify the PayID from the PayID Public API endpoint with GET. See [API Reference](https://api.payid.org/). You can also use a JWS library like `jose` to verify the `verifiedAddress` object(s).
11. If operating through a trust on first use (TOFU) model, safely store the identity key after successful verification, and use this key to verify subsequent addresses retrieved from the same PayID.
