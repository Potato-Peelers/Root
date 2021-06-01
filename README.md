# ROOT
Root is a React Native app that aims to uniquely address the problem of food waste by focusing on changing user habits of over purchasing.

## Getting started
### Dependencies
Expo
React Native
Node.js and npm
Victory Chart
Moment.js
Firestore

### Open source libraries and APIs
Mask R-CNN
Coco dataset
LogMeal API

## Overview of Files
### screens/ScannerScreen.js
The scanner screen utilizes the Expo Camera to save the user’s image. There are options to enable flash, flip the camera and retake an image. We plan on configuring the scanner screen with our artificial intelligence program that intertwines image recognition and image segmentation to generate relevant data about the user’s leftovers. 

### screens/ExpirationScreen.js
This screen uses a simple list functionality that can create and delete items. Users can allocate which data an item expires, and the screen will sort the items in ascending order, from earliest to latest expiration date.

### screens/MealPlannerScreen.js
This screen allows users to plan out their weekly meals. There are three meals, breakfast, lunch, and dinner, where the user can add, edit, and delete items. The meal planner also has the ability to add new meals (such as snacks and drinks in addition to the three standard ones). Using Moment.js, users are able to move between weeks in order to see and edit data for previous/future weeks.

### screens/StatisticsScreen.js
This screen utilizes the food waste data from firebase, and visualizes it in a bar graph using Victory Chart as well as a table of most commonly wasted foods. The data visualization gives insight into the amount of food that has been thrown away. 

### Root_AI.ipynb:
In this file, the Mask_RCNN repository is cloned. And various dependencies are installed:

    Tensorflow version 1.x
    h5py version 2.10.0
    requests
    os
    sys
    math
    Numpy
    Skimage.io
    Matplotlib
    cv2
    cv2_imshow
    Coco

The program models Mask_RCNN’s demo.ipynb, using a semantic image segmentation model pre-trained on the coco dataset. The masks produced from the model are used to create multiple cropped images of the original photo that contain all instances belonging to the same class. These new images are run through LogMeal’s food recognition API that produces a list of most likely foods corresponding to each image. The images are then converted into gray-scale images in order to calculate the fraction of non-white pixels in the segmented images divided by non-white pixels in the original image. This fraction is used to measure the quantity of food, where 1/1 represents one “meal”. Next steps are integrating this code into the front end screens so the data can be stored in Firebase and sent to the statistics screen for analysis to suggest better user habits.

### screens/ShoppingListScreen.js
This screen allows users to create and delete their items. The screen will also issue a warning if the user adds an item to their shopping list that has already been used before. 

### navigation/BottomTabNavigator.js
This file uses React Native’s createBottomTabNavigator to compile all of the screens and add them to the navigation bar at the bottom of the app. 

### navigation/AppNavigator.js
This file imports the BottomTabNavigator from the BottomTabNavigator.js file where it adds it to a createSwitchNavigator component.

### App.js
This file renders the createAppContainer component exported from the AppNavigator.js file.

### src/firebase/config.js
This file includes the Firebase configuration such as the API Key and project id in order for the frontend screens to interact with the Firebase project and add/retrieve data for storage in Firestore. The file exports a variable ‘firestore’ which is used in the screen files to access the database.



## Authors
Anjali Asthagiri, Srija Ghosh, Vidula Mannem

## Acknowledgements
https://www.freecodecamp.org/news/how-to-create-a-camera-app-with-expo-and-react-native/
