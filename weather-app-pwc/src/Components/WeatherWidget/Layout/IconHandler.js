function getRelevantIcon (weather) {
    switch(weather) {
          case 'clear':
          return '//ssl.gstatic.com/onebox/weather/48/sunny.png';
          case 'cloudy':
          return '//ssl.gstatic.com/onebox/weather/64/partly_cloudy.png';
          case 'pcloudy':
          return '//ssl.gstatic.com/onebox/weather/48/sunny_s_cloudy.png';
          case 'mcloudy':
          return '//ssl.gstatic.com/onebox/weather/48/cloudy.png';
          case 'lightrain':
          return '//ssl.gstatic.com/onebox/weather/48/rain_light.png'; 
          case 'rain':
            return '//ssl.gstatic.com/onebox/weather/48/rain.png';
          case 'ishower':
          return '//ssl.gstatic.com/onebox/weather/48/rain.png'; 
          case 'humid':
          return '//ssl.gstatic.com/onebox/weather/48/rain_s_cloudy.png';
          case 'tsrain':
          return '//ssl.gstatic.com/onebox/weather/48/thunderstorms.png';
          case 'ts':
            return '//ssl.gstatic.com/onebox/weather/48/thunderstorms.png';
          case 'snow':
            return '//ssl.gstatic.com/onebox/weather/48/snow.png';
            case 'lightsnow':
                return '//ssl.gstatic.com/onebox/weather/48/snow_light.png';
        default:
          return '//ssl.gstatic.com/onebox/weather/48/sunny.png';
      }
   }

   export default getRelevantIcon;