const { getAccessToken } = require("../../azure/authenticate");
const { userModel } = require("../../core/db/user");

const usercreateaddressController = async (req, res, next) => {
  try {
    console.log('azureing tyeu' , req.body)
    const { validationToken } = req.query;
    console.log('method' , req.method,"query" ,req.query)
    if (validationToken) {
      res.setHeader('Content-Type', 'text/plain');
      return res.status(200).send(validationToken); // Validate subscription
    }

    const { value } = req.body;
    const accessToken = await getAccessToken();

    // Use a for...of loop to handle async properly
    for (const notification of value) {
      try {
        const userResponse = await fetch(
          `https://graph.microsoft.com/v1.0${notification.resource}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        
        if (!userResponse.ok) {
          console.error(`Failed to fetch user data for resource: ${notification.resource}`);
          continue; // Skip to the next notification if there's an error
        }

        const user = await userResponse.json();
        console.log('this is user', user);

        const newUser = new userModel({
          displayName: user.displayName,
          userPrincipalName: user.userPrincipalName,
          email: user.mail,
          // Add other fields as necessary
        });

        await newUser.save();
      } catch (err) {
        console.error(`Error processing notification: ${err.message}`);
      }
    }

    res.sendStatus(202);
  } catch (error) {
    console.log('this is error', error);
    return handleError(error.message)(res);
  }
};
const usertestapiController = async (req, res, next) => {
  try {
    console.log(' new seriesworking' , req.method)
    return res.status(200).send("new changes"); // Validate subscription
  } catch (error) {
    console.log('this is error', error);
    return handleError(error.message)(res);
  }
};

module.exports = {
  usercreateaddressController , usertestapiController
};
