const { getAccessToken } = require("../../azure/authenticate");
const { userModel } = require("../../core/db/user");

const usercreateaddressController = async (req, res, next) => {
  try {
    const { validationToken } = req.query;
    if (validationToken) {
      return res.status(200).send(validationToken); // Validate subscription
    }

    const { value } = req.body;
    const accessToken = await getAccessToken();

    value.forEach(async (notification) => {
      const userResponse = await fetch(
        `https://graph.microsoft.com/v1.0${notification.resource}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const user = await userResponse.json();
     console.log('this is user' , user)
      const newUser = new userModel({
        displayName: user.displayName,
        userPrincipalName: user.userPrincipalName,
        email: user.mail,
        // Add other fields as necessary
      });

      await newUser.save();
    });

    res.sendStatus(202);
  } catch (error) {
    console.log('ths is error ' ,error);
    return handleError(error.message)(res);
  }
};

module.exports = {
    usercreateaddressController
}