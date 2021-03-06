var interVal;
define([
        "dojo",
        'dojo/_base/declare',
        'jimu/BaseWidget',
        'dojo/Deferred',
        'dojo/_base/html',
        "esri/Color",
        "esri/request",
        "esri/geometry/Point",
        "esri/geometry/webMercatorUtils",
        "esri/dijit/editing/Delete",
        "esri/graphic",
        "esri/layers/FeatureLayer",
        "esri/map",
        'esri/lang',
        'esri/tasks/query',
        'esri/tasks/QueryTask',
        'dojo/_base/lang',
        "esri/renderers/SimpleRenderer",
        "esri/renderers/TemporalRenderer",
        "esri/renderers/TimeClassBreaksAger",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/TimeExtent",
        'dijit/_WidgetsInTemplateMixin',
        "dojo/store/Memory",
        'dijit/form/ComboBox',
        "dijit/form/DateTextBox",
        "dijit/form/TimeTextBox",
        "dijit/form/Button",
        "dojo/data/ObjectStore",
        "dojo/parser",
        'dojo/dom',
        "dojo/domReady!"
    ],
    function(dojo, declare, BaseWidget, Deferred, html, Color, esriRequest, Point, webMercatorUtils, Delete, Graphic, FeatureLayer, Map, esriLang, Query, QueryTask, lang, SimpleRenderer, TemporalRenderer,
        TimeClassBreaksAger, SimpleLineSymbol, SimpleMarkerSymbol, TimeExtent, _WidgetsInTemplateMixin, Memory, ComboBox, ObjectStore, dom) {
        //To create a widget, you need to derive from BaseWidget.
        return declare([BaseWidget, _WidgetsInTemplateMixin], {
            // Custom widget code goes here

            baseClass: 'jimu-widget-potensipelanggan',

            //this property is set by the framework when widget is loaded.
            //name: 'CustomWidget',


            //methods to communication with app container:

            postCreate: function() {



                this.inherited(arguments);
                localStorage = null;
                localStorage.clear();




            },



            startup: function() {
				var ButtonsS = this.showButtonStart;
				
				var ButtonsSt = this.showButtonStop;
				
				html.setStyle(ButtonsS, 'display','none');
				html.setStyle(ButtonsSt, 'display','none');
				html.setStyle(dojo.byId("loadingImg"), 'display','');
                queryTask = new QueryTask('http://gis-geo.udata.id/geoevent/rest/services/SIIS_Geoevent/barstow_history_new/FeatureServer/0');

                var dataset = [];
                query = new Query();
                query.where = "1=1";
                query.outFields = ["license_plate"];
                query.orderByFields = ["license_plate ASC"];
                query.returnDistinctValues = true;
                var query2 = queryTask.execute(query);
                query2.then(lang.hitch(this,
                    function(response) {
                        //console.log(response);
						html.setStyle(ButtonsS, 'display','');
						html.setStyle(ButtonsSt, 'display','');
						html.setStyle(dojo.byId("loadingImg"), 'display','none');
                        for (i = 0; i < response.features.length; i++) {
						

                            var x = response.features[i].attributes.license_plate;

                            dataset.push('{ "name":"' + x + '"}');

                            //console.log(x);

                        }
                        var arraynew = '{"geometryType": "esriGeometryMultipoint","spatialReference": {"wkid": 102113},"geometries": [{"data":[' + dataset + ']}]}';

                        var data = JSON.parse(arraynew).geometries[0].data;


                        var stateStore = new Memory({
                            data
                        });


                        var comboBox = new ComboBox({
                            id: "platID",
                            name: "state",
                            value: "B 9269 NCE",
                            store: stateStore,
                            searchAttr: "name"
                        }, "platID");

                    }));




            },

            // onClose: function(){
            //   console.log('onClose');
            // },

            // onMinimize: function(){
            //   console.log('onMinimize');
            // },

            // onMaximize: function(){
            //   console.log('onMaximize');
            // },

            // onSignIn: function(credential){
            //   /* jshint unused:false*/
            //   console.log('onSignIn');
            // },

            // onSignOut: function(){
            //   console.log('onSignOut');
            // }

            // onPositionChange: function(){
            //   console.log('onPositionChange');
            // },



            //methods to communication between widgets:

            showClicked: function() {
			html.setStyle(dojo.byId("loadingImg"), 'display','');
			
			html.setStyle(this.showButtonStart, 'display','none');
			html.setStyle(this.showButtonStop, 'display','none');
                //create a layer definition for the gps points
                var layerDefinition = {
                    "objectIdField": "OBJECTID",
                    "trackIdField": "TrackID",
                    "geometryType": "esriGeometryPoint",
                    "timeInfo": {
                        "startTimeField": "DATETIME",
                        "endTimeField": null,
                        "timeExtent": [1277412330365],
                        "timeInterval": 1,
                        "timeIntervalUnits": "esriTimeUnitsMinutes"
                    },
                    "fields": [{
                            "name": "OBJECTID",
                            "type": "esriFieldTypeOID",
                            "alias": "OBJECTID",
                            "sqlType": "sqlTypeOther"
                        },
                        {
                            "name": "TrackID",
                            "type": "esriFieldTypeInteger",
                            "alias": "TrackID"
                        },
                        {
                            "name": "DATETIME",
                            "type": "esriFieldTypeDate",
                            "alias": "DATETIME"
                        }
                    ]
                };

                var featureCollection = {
                    layerDefinition: layerDefinition,
                    featureSet: null
                };
                featureLayer = new FeatureLayer(featureCollection);

                //setup a temporal renderer
				//console.log(featureLayer.graphics[0].attributes.TrackID);
                var sms = new SimpleMarkerSymbol().setColor(new Color([255, 0, 0])).setSize(11).setPath("M14.5,29 23.5,0 14.5,9 5.5,0z").setAngle(180);
                var observationRenderer = new SimpleRenderer(sms);
                var latestObservationRenderer = new SimpleRenderer(new SimpleMarkerSymbol().setPath("M14.5,29 23.5,0 14.5,9 5.5,0z").setAngle(180));
				
				latestObservationRenderer.setRotationInfo({
						field: "TrackID"
						
				}); 

				observationRenderer.setRotationInfo({
						field: "TrackID"
						
				});
				observationRenderer.setColorInfo({
				field: "DATETIME",
				minDataValue: 1003388800000,
				maxDataValue: 1603388800000,
				colors: [
				new Color([0,104,214]), new Color([20,120,220]), new Color([39,136,226]),
				new Color([59,152,232]), new Color([78,169,237]), new Color([98,185,243]),
				new Color([131,197,181]), new Color([164,210,120]), new Color([197,222,58]),
				new Color([205,188,80]), new Color([212,155,102]), new Color([220,121,124]),
				new Color([216,87,115]), new Color([211,53,106]), new Color([206,19,97])
					]
				});
       
				//console.log(latestObservationRenderer);
                var infos = [{
                    minAge: 0,
                    maxAge: 1,
                    color: new Color([255, 0, 0])
                }, {
                    minAge: 1,
                    maxAge: 5,
                    color: new Color([255, 153, 0])
                }, {
                    minAge: 5,
                    maxAge: 10,
                    color: new Color([255, 204, 0])
                }, {
                    minAge: 10,
                    maxAge: Infinity,
                    color: new Color([0, 0, 0, 0])
                }];
                var ager = new TimeClassBreaksAger(infos, TimeClassBreaksAger.UNIT_MINUTES);
                var sls = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                    new Color([255, 0, 0]), 3);
                var trackRenderer = new SimpleRenderer(sls);
                var renderer = new TemporalRenderer(observationRenderer, latestObservationRenderer,
                    trackRenderer, ager);
				
				//getRotationAngle(rotationInfo)
				
				
                featureLayer.setRenderer(renderer);

				

                this.showLocation();
                var mapid = this.map;
				
                mapid.addLayer(featureLayer);
                

                return featureLayer;



            },

            showLocation: function(param1, param2) {

                localStorage = null;
                localStorage.clear();
				
                var plat = dojo.byId("platID").value;
                var startCar = dojo.byId("start").value;
                var endCar = dojo.byId("end").value;
                var startCarTime = dojo.byId("startTime").value;
                var endCarTime = dojo.byId("endTime").value;

                var startime = startCar + ' ' + startCarTime;
                var endtime = endCar + ' ' + endCarTime;

                var startTimeEpoch = ((new Date(startime)).getTime());
                var endTimeEpoch = ((new Date(endtime)).getTime());
                var mapid = this.map;
				
				
				
				
				
                var url = "http://gis-geo.udata.id/geoevent/rest/services/SIIS_Geoevent/barstow_history_new/FeatureServer/0/query?where=license_plate+%3D%27" + plat + "%27&objectIds=&time=" + startTimeEpoch + "," + endTimeEpoch + "&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&distance=&units=esriSRUnit_Foot&relationParam=&outFields=longitude%2Clatitude%2Cgpstime+&returnGeometry=false&maxAllowableOffset=&geometryPrecision=&outSR=&gdbVersion=&historicMoment=&returnDistinctValues=true&returnIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&orderByFields=gpstime+&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&multipatchOption=&resultOffset=&resultRecordCount=&returnTrueCurves=false&sqlFormat=none&f=pjson";
                var track = [];
                var dateM = [];

                var layersRequest = esriRequest({
                    url: url,
                    content: {
                        f: "json"
                    },
                    handleAs: "json",
                    callbackParamName: "callback"
                });
                layersRequest.then(
                    function(response) {
                        //console.log(response);
				if (response.features.length > 0){
						html.setStyle(dojo.byId("loadingImg"), 'display','none');
						html.setStyle(this.showButtonStop, 'display','');
                        for (i = 0; i < response.features.length; i++) {

                            track.push(response.features[i].attributes);
                            dateM.push((new Date(response.features[i].attributes.gpstime)).getTime());
                        }
						
                        var tes = dateM.length;
                        var maxArr = tes - 1;
                        //console.log(dateM[maxArr])

                        currentCoordIndex = 0;
						var prevLocation = this.map;
						
						
                        var interVal = setInterval(function() {

                            var now = new Date();
                            var attributes = {};


                            var dates = track[currentCoordIndex].gpstime;
                            var latitude = track[currentCoordIndex].latitude;
                            var longitude = track[currentCoordIndex].longitude;
                            var timeS = ((new Date(dates)).getTime());

							dojo.byId("date").innerHTML = "Tanggal : " + dates;

                            currentCoordIndex = (currentCoordIndex + 1) % track.length;

                            var OBJECTID_COUNTER = 1;
                            var TRACKID_COUNTER = 1;
                            //var now = new Date();
                            var attributes = {};
                            //attributes.OBJECTID = maxArr;
                            attributes.DATETIME = timeS;
                           
                            //OBJECTID_COUNTER++;
                            //TRACKID_COUNTER++;
													
							var oldPoint= mapid.geographicExtent.getCenter();
							var locationP= new Point(longitude,latitude);
							var angleInDegrees = -90 + (Math.atan2(locationP.y - oldPoint.y, locationP.x -	oldPoint.x) * 180 /	Math.PI);
							//console.log(360 - angleInDegrees);
							attributes.TrackID = 360 - angleInDegrees;
                            if (dateM[maxArr] == timeS) {
								//html.setStyle(this.showButtonStart, 'display','');
								html.setStyle(dojo.byId("showButtonStart"), 'display','');
                                clearInterval(interVal);
                            }
							
                            var pt = webMercatorUtils.geographicToWebMercator(new Point(longitude,latitude));
                            mapid.centerAndZoom(pt, 16);

                            var graphic = new Graphic(new Point(pt, mapid.spatialReference), null, attributes);

                            featureLayer.applyEdits([graphic], null, null, function(adds) {

                                mapid.setTimeExtent(new TimeExtent(null, new Date()));
                                mapid.centerAt(graphic.geometry);

                            });

                        }, 1500);

                        localStorage.setItem("interval", interVal);


                 }else{
					alert('Data not found');
					//this.stopClicked();
					html.setStyle(dojo.byId("loadingImg"), 'display','none');
					html.setStyle(this.showButtonStop, 'display','');
					html.setStyle(this.showButtonStart, 'display','');
					
				}
	
                    });

				
            },


            stopClicked: function(featureLayer, interVal) {


                var Interval = localStorage.getItem("interval");
	
                clearInterval(Interval);
				
				html.setStyle(this.showButtonStart, 'display','');

            },


            getHeading: function(point,oldPoint) {
                 var angleInDegrees = Math.atan2(point.y - oldPoint.y, point.x -
                    oldPoint.x) * 180 /
                    Math.PI;
			
                return -90 + angleInDegrees;
            },
            requestFailed: function(error, io) {
                dojoJson.toJsonIndentStr = " ";
                alert('Terjadi kesalahan');
            }
        });
    });