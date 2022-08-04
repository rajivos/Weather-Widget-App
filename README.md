# Weather-Widget-App
A Weather App built with ReactJS similar to Google's location weather search capability


![Image description](https://firebasestorage.googleapis.com/v0/b/raj-c-k.appspot.com/o/WidgetResult.png?alt=media&token=362865d8-fbec-469a-96fd-f72c2e39011f)


To get the application working you'll need two API keys 

1: OpenCage Geocoder (https://opencagedata.com/) --->  Grabs lat and longitude for desired location
2: Weather Bit (www.weatherbit.io/) ---> Grabs  weather schedule for desired latitude and longitude

## Getting Started  

1. Clone repository  
2. Insert your mentioned API keys in the .env file or replace them where necesssary.
.env file example: 
```
REACT_APP_WEATHER_BIT_KEY = xxxx
REACT_APP_WEATHER_BIT_KEY = xxxx
```
3. cd into weather-app-pwc and  ``` npm install && npm start``` 


### Objectives Achieved

1. Get weather forecast for any latitude and longitude 
2. Lookup list of locations for given name 
3. Responsive Design
4. Switch between Imperial/metrics units
5. Gets week weather in current location (onLoad)
6. Efficient use of React Standards and libraries (use of context-api as global container and no usage of class components)
7. Implemented CI/CD with Cloud build 
8. Using Jest to Test API functionality. (see App.test.js)


### Pending Objectives

1. Accessible for screen readers

## Authors

*- (https://raj-c-k.web.app/) 
