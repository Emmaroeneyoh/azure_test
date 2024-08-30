const msal = require("@azure/msal-node");
const fetch = require("isomorphic-fetch");
const { clientSecret, authority, clientId } = require("../utils");




const msalConfig = {
  auth: {
    clientId: clientId,
    authority: `https://login.microsoftonline.com/${authority}`,
    clientSecret: clientSecret,
  },
};

const cca = new msal.ConfidentialClientApplication(msalConfig);

const getAccessToken = async () => {
  const authResult = await cca.acquireTokenByClientCredential({
    scopes: ["https://graph.microsoft.com/.default"],
  });
  return authResult.accessToken;
};

const createSubscription = async () => {
    const accessToken = await getAccessToken();
    
  const response = await fetch(
    "https://graph.microsoft.com/v1.0/subscriptions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        changeType: "created",
        notificationUrl: "https://azure-test-wm8u.onrender.com/api/notifications",
        resource: "/users",
        expirationDateTime: new Date(
          new Date().getTime() + 3600 * 1000
        ).toISOString(),
        clientState: "secretClientValue",
      }),
    }
  );

  const subscription = await response.json();
  console.log('subscritpion' ,subscription);
};

module.exports = {
  createSubscription,
  getAccessToken,
};
