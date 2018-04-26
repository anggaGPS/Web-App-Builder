# Historycal Tracking Widget for ArcGIS Web App builder
This widget is find the Histriycal Tracking from the fleet management. 



![App](https://github.com/anggaGPS/Web-App-Builder/blob/master/1.JPG)

## Features
this widget will find athe data, animate point, and make some line from that point to track between certain time and certaint attribute. This widget can find the movement in certain or all of time and visualize in the animation to deterimine location which has been passed.

This project was on behalf with Telkom Indonesia to track historical for their operational car, sales, and other assets to find ROI and their KPI activities.

## Deploying
1. Download this widget and put in Web App Builder Developer Directory  ...webappbuilderdirectory\client\stemapp\widgets\ 
[instruction](https://developers.arcgis.com/web-appbuilder/).

2. Open Your Web App Builder Developer and find the Track Widget.

3. Config your Widget with the Parameter based on your Field

Example:

	
        {
           "url": "http://gis-geo.udata.id/geoevent/rest/services/SIIS_Geoevent/barstow_history_new/FeatureServer/0", 
	   "idUrl": "http://gis-geo.udata.id/geoevent/rest/services/SIIS_Geoevent/Barstow_Update/FeatureServer/0",
	   "QueryData": {
	   	"field": {
     	 	"plate": "license_plate",
	  		"longitude": "longitude",
	  		"latitude": "latitude",
	  		"timestring": "gpstime"
    			},
	"QueryTime": {
      		"timeDate":"receive_time"
    			}
      		     },
       "QuerySelected": {
       		"plate": "license_plate"
       		}    
       }
   
    


	NB : plate is the Uniqe Field to identify your Fleet Assets. It must unique

5. Run your Widget

