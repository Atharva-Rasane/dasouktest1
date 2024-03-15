
const Customize = require("./models/CustomizationSchema");
const connectDB = require("./db/conn");
const config = require("./data.json");


connectDB();

const setCommonVariables = async (req, res, next) => {
  
  try {
    // Fetch product data from MongoDB
    const custom = await Customize.findOne({sid:config.sid});

     if (!custom) {
      console.log("Customization Not Found")
      res.locals.customization = {
        colorScheme: {
          primaryColor: "#FF5733 ", // Example: Change to your desired primary color
          secondaryColor: "#00ff00", // Example: Change to your desired secondary color
        },
        title: "Your Website Title",
        logo: "/path/to/your/logo.png", // Example: Change to the path of your logo
        typography: {
          fontFamily: "Arial, sans-serif", // Example: Change to your desired font family
          fontSize: "16px", // Example: Change to your desired font size
        },
        layout: {
          header: {
            backgroundColor: "#ffffff", // Example: Change to your desired header background color
            textColor: "#000000", // Example: Change to your desired header text color
          },
          navigation: {
            backgroundColor: "#333333", // Example: Change to your desired navigation background color
            textColor: "#ffffff", // Example: Change to your desired navigation text color
          },
          renderGoogleMaps: true,
          // Add more layout variables as needed
        },
        // Add more common variables for content, responsiveness, buttons, social media, navigation, etc.
      };
     }
    // console.log("Customize:",custom)
    res.locals.customization =  custom
  } catch (error) {
    console.log(error)
  }

  next();
};

module.exports =  setCommonVariables ;




