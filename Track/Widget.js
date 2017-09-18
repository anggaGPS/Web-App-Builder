
define([
        "dojo",
        'dojo/_base/declare',
        'jimu/BaseWidget',
		"jimu/WidgetManager",
		"jimu/PanelManager",
        'dojo/Deferred',
        'dojo/_base/html',
		"dojo/date/locale",
        "esri/Color",	
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
		"dijit/form/ValidationTextBox",
        'dijit/form/ComboBox',
        "dijit/form/DateTextBox",	
        "dijit/form/TimeTextBox",
        "dijit/form/Button",
        "dojo/parser",
        'dojo/dom',
        "dojo/domReady!"
    ],
    function(dojo, declare, BaseWidget, WidgetManager, PanelManager, Deferred, html, locale, Color, Point, webMercatorUtils, Delete, Graphic, FeatureLayer, Map, esriLang, Query, QueryTask, lang, SimpleRenderer, TemporalRenderer,
        TimeClassBreaksAger, SimpleLineSymbol, SimpleMarkerSymbol, TimeExtent, _WidgetsInTemplateMixin, Memory, ValidationTextBox, ComboBox, dom) {
        //To create a widget, you need to derive from BaseWidget.
        var clazz = declare([BaseWidget, _WidgetsInTemplateMixin], {
      baseClass: 'jimu-widget-track',
      // clasName: 'esri.widgets.About',

      _hasContent: null,

      postCreate: function() {
        this.inherited(arguments);
		 localStorage = null;
         localStorage.clear();

        //this._hasContent = this.config.about && this.config.about.aboutContent;
      },

      startup: function() {
        this.inherited(arguments);
		
		
        this.resize();
		var ButtonsS = this.showButtonStart;
				
		var ButtonsSt = this.showButtonStop;
		 var dataset = [];		
				html.setStyle(ButtonsS, 'display','none');
				html.setStyle(ButtonsSt, 'display','none');
				html.setStyle(this.loadingImg, 'display','');
                queryTask = new QueryTask(this.config.idUrl);
                query = new Query();
                query.where = "1=1";
                query.outFields = [this.config.QueryData.field.plate];
                query.orderByFields = [this.config.QueryData.field.plate];
                query.returnDistinctValues = true;
                var query2 = queryTask.execute(query);
                query2.then(lang.hitch(this,
                    function(response) {
                        //console.log(response);
						html.setStyle(ButtonsS, 'display','');
						html.setStyle(ButtonsSt, 'display','');
						html.setStyle(this.loadingImg, 'display','none');
						
                        for (i = 0; i < response.features.length; i++) {
						
							var plates=this.config.QueryData.field.plate;
							if(plates=="license_plate") {
								   var x = response.features[i].attributes.license_plate;
						
                            dataset.push('{ "name":"' + x + '"}');
							}else{
								  var x = response.features[i].attributes.plate;
						
                            dataset.push('{ "name":"' + x + '"}');
								
							}
                         



                        }
                        var arraynew = '{"geometryType": "esriGeometryMultipoint","spatialReference": {"wkid": 102113},"geometries": [{"data":[' + dataset + ']}]}';

                        var data = JSON.parse(arraynew).geometries[0].data;


                        var stateStore = new Memory({
                            data
                        });

						this.platID.store = stateStore;
						

                    }));

		
      },
	  showClicked: function() {
		  
		  
			html.setStyle(this.loadingImg, 'display','');
			
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

                featureLayer.setRenderer(renderer);

				

                this.showLocation();
                var mapid = this.map;
				
                mapid.addLayer(featureLayer);
                

                return featureLayer;



            },
			 showLocation: function(param1, param2) {
				
                localStorage = null;
                localStorage.clear();
				
                var plat = this.platID.get('value');
                var startCar = locale.format(this.start.get('value'),{
								selector: "date",
								formatLength: "short",
								datePattern:"MM/d/yyyy"
								});
                var endCar = locale.format(this.end.get('value'),{
								selector: "date",
								formatLength: "short",
								datePattern:"MM/d/yyyy"
								});
								
						
                var startCarTime = locale.format(this.startTime.get('value'),{
								selector: "time",
								
								datePattern:"k:m:s"
								});
                var endCarTime = locale.format(this.endTime.get('value'),{
								selector: "time",
								
								datePattern:"k:m:s"
								}) ;
				
                var startime = startCar + ' ' + startCarTime;
                var endtime = endCar + ' ' + endCarTime;
				
			
                var startTimeEpoch = ((new Date(startime)).getTime());
                var endTimeEpoch = ((new Date(endtime)).getTime());
                var mapid = this.map;
				
				var simple= "d-MM-yyyy";
		
				
				var startIsoDate = new Date(startime).toISOString();
				var endIsoDate = new Date(endtime).toISOString();
				
				var utcDateStart= startIsoDate.replace('T', ' ');
				var utcDateEnd= endIsoDate.replace('T', ' ');
				
                queryTask = new QueryTask(this.config.url);

                var track = [];
                query = new Query();
                query.where = this.config.QueryData.field.plate+"='"+plat+"' AND "+this.config.QueryData.QueryTime.timeDate+" > DATE '"+utcDateStart+"' AND "+this.config.QueryData.QueryTime.timeDate+" < DATE '"+utcDateEnd+"'";
                query.outFields = [this.config.QueryData.field.latitude+","+this.config.QueryData.field.longitude+","+this.config.QueryData.field.timestring];
                query.orderByFields = [this.config.QueryData.field.timestring];
                query.returnDistinctValues = true;
                var query1 = queryTask.execute(query);
                query1.then(lang.hitch(this,
                    function(response) {
					if (response.features.length > 0){
						html.setStyle(this.loadingImg, 'display','none');
						html.setStyle(this.showButtonStop, 'display','');
                        for (i = 0; i < response.features.length; i++) {

                            track.push(response.features[i].attributes);
							
                        }
						
					
                        var tes = track.length;
                        var maxArr = tes - 1;
                        currentCoordIndex = 0;
						var prevLocation = this.map;
						
						var buttons=this.showButtonStart;
                        var interVal = setInterval(function() {

                            var now = new Date();
                            var attributes = {};
                            //var dates = track[currentCoordIndex].gpstime;
                            var latitude = track[currentCoordIndex].latitude;
                            var longitude = track[currentCoordIndex].longitude;
                            var timeS = ((new Date()).getTime());

							//dojo.byId("date").innerHTML = "Tanggal : " + dates;
							//this.tanggal.innerHTML=;

                            currentCoordIndex = (currentCoordIndex + 1) % track.length;
							//console.log(currentCoordIndex);
                            var OBJECTID_COUNTER = 1;
                            var TRACKID_COUNTER = 1;
                            //var now = new Date();
                            var attributes = {};
                            //attributes.OBJECTID = maxArr;
                            attributes.DATETIME = timeS;			
							var oldPoint= mapid.geographicExtent.getCenter();
							var locationP= new Point(longitude,latitude);
							var angleInDegrees = -90 + (Math.atan2(locationP.y - oldPoint.y, locationP.x -	oldPoint.x) * 180 /	Math.PI);
							attributes.TrackID = 360 - angleInDegrees;
							 if (track[maxArr].latitude==latitude && track[maxArr].longitude==longitude) {
								//console.log('yes1');
								clearInterval(interVal);
								html.setStyle(buttons, 'display','');
								
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
					this.notFound.innerHTML='Data not found';
					//this.stopClicked();
					html.setStyle(this.loadingImg, 'display','none');
					html.setStyle(this.showButtonStop, 'display','');
					html.setStyle(this.showButtonStart, 'display','');
					
				}
	
                    }));

				
            },


            stopClicked: function(featureLayer, interVal) {


                var Interval = localStorage.getItem("interval");
	
                clearInterval(Interval);
				
				html.setStyle(this.showButtonStart, 'display','');

            },

      resize: function() {
        this._resizeContentImg();
      },

      _resizeContentImg: function() {
        var customBox = html.getContentBox(this.customContentNode);

        
      }
    });
    return clazz;
  });