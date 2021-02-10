const url = require('url');
var default_url = "https://external-lhr8-1.xx.fbcdn.net/safe_image.php?d=AQF4Xql2PrfGrI9g&url=https%3A%2F%2Fwww.facebook.com%2Fads%2Fimage%2F%3Fd%3DAQJdFrO5DO7tzRiiTMhN_qPW2eEg6WoxB72xAvVoFCzzq1dr6c_vWd9T7Zw4BolaGQWkn8LAWGAXabpGK4L7JoM3xCUk85-acW09E3pb8hjrC5P1Udnorm5_eKFo7JCm84SPQWxXgVkg20AJZHDO_Jm_&cfs=1&_nc_cb=1&_nc_hash=AQGL76yd2T-55zsb";

var query = url.parse(default_url, true).query

console.log(query['url'])
