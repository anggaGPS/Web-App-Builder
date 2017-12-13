define(["dojo",
        'dojo/_base/declare', 'jimu/BaseWidget',
        "esri/Color",
        "dojo/_base/array",
        "esri/geometry/Point",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/geometry/geometryEngine",
        "esri/graphic",
		"esri/dijit/FeatureTable",
        "esri/renderers/SimpleRenderer",
        "esri/symbols/SimpleLineSymbol",
        "esri/geometry/Multipoint",
        "esri/geometry/Polyline",
        "esri/renderers/Renderer",
        "esri/dijit/PopupTemplate",
        "esri/layers/FeatureLayer",
        'dojo/_base/html',
        'dojo/Deferred',
		"dojo/on",
        
        'esri/request',
        "esri/SpatialReference",
        'esri/tasks/query',
        'esri/tasks/QueryTask',
        'esri/lang',
        'dijit/ProgressBar',
        'dojo/_base/lang',
        'dojo/dom'
    ],
    function(dojo, declare, BaseWidget, Color, array, Point, SimpleMarkerSymbol, SimpleFillSymbol, geometryEngine, Graphic, FeatureTable, SimpleRenderer, SimpleLineSymbol, Multipoint, Polyline, Renderer, PopupTemplate, FeatureLayer, html, Deferred,on, esriRequest, SpatialReference, Query, QueryTask, esriLang, ProgressBar, lang, dom) {
        //To create a widget, you need to derive from BaseWidget.
        return declare([BaseWidget], {
            // Custom widget code goes here

            baseClass: 'jimu-widget-potensipelanggan',

            //this property is set by the framework when widget is loaded.
            //name: 'CustomWidget',


            //methods to communication with app container:

            // postCreate: function() {
            //   this.inherited(arguments);
            //   console.log('postCreate');
            // },

            startup: function() {
                this.inherited(arguments);
				
				

				localStorage.clear();
					
				this
                html.setStyle(this.progressBar, 'display', 'none');
				html.setStyle(this.downloadButton, 'display', 'none');
				html.setStyle(this.clearButton, 'display', 'none');
				//html.setStyle(this.showButton, 'display', 'none');

			/*  on(this.map, "extent-change", lang.hitch(this, function(event) {
				// console.log(event.lod.level);
				 
				 if (event.lod.level > 15 && event.lod.level < 19){
					 
					 html.setStyle(this.showButton, 'display', '');
				 }else{
					  html.setStyle(this.showButton, 'display', 'none');
				 }
				 
			 })); */


            },

            // onOpen: function(){
            //   console.log('onOpen');
            // },

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

            // resize: function(){
            //   console.log('resize');
            // }

            //methods to communication between widgets:

            showClicked: function() {
				//console.log(this.map.__LOD.level);
				localStorage.clear();
				if (this.map.__LOD.level < 15 || this.map.__LOD.level > 19){
					     alert('Pilih Current Map Sepsifik');
				} else {
                //this.progressBar;

                /*  var layerDefinition = {
                     "objectIdField": "objectid",
                     "trackIdField": "object_name",
                     "globalIdFieldName": "",
                     "geometryType": "esriGeometryPoint",
                     "spatialReference": {
                         "wkid": "4326",
                         "latestWkid": "4326"
                     },
                     "fields": [

                         {
                             "name": "regional",
                             "type": "esriFieldTypeString",
                             "alias": "regional",
                             "length": 5
                         },
                         {
                             "name": "witel",
                             "type": "esriFieldTypeString",
                             "alias": "witel",
                             "length": 80
                         },
                         {
                             "name": "sto",
                             "type": "esriFieldTypeString",
                             "alias": "sto",
                             "length": 1000
                         },
                         {
                             "name": "object_id",
                             "type": "esriFieldTypeDouble",
                             "alias": "object_id"
                         },
                         {
                             "name": "object_name",
                             "type": "esriFieldTypeString",
                             "alias": "object_name",
                             "length": 500
                         },
                         {
                             "name": "type_bangunan",
                             "type": "esriFieldTypeString",
                             "alias": "type_bangunan",
                             "length": 100
                         },
                         {
                             "name": "type_alpro",
                             "type": "esriFieldTypeString",
                             "alias": "type_alpro",
                             "length": 30
                         },
                         {
                             "name": "berlangganan",
                             "type": "esriFieldTypeString",
                             "alias": "berlangganan",
                             "length": 5
                         },
                         {
                             "name": "estimasi_demand",
                             "type": "esriFieldTypeString",
                             "alias": "estimasi_demand",
                             "length": 30
                         },
                         {
                             "name": "harga_rumah",
                             "type": "esriFieldTypeDouble",
                             "alias": "harga_rumah"
                         },
                         {
                             "name": "attrn_2",
                             "type": "esriFieldTypeDouble",
                             "alias": "attrn_2"
                         },
                         {
                             "name": "address",
                             "type": "esriFieldTypeString",
                             "alias": "address",
                             "length": 200
                         },
                         {
                             "name": "coordinate",
                             "type": "esriFieldTypeString",
                             "alias": "coordinate",
                             "length": 4000
                         },
                         {
                             "name": "competitor",
                             "type": "esriFieldTypeString",
                             "alias": "competitor",
                             "length": 46
                         },
                         {
                             "name": "fastel",
                             "type": "esriFieldTypeString",
                             "alias": "fastel",
                             "length": 1000
                         },
                         {
                             "name": "alpro",
                             "type": "esriFieldTypeString",
                             "alias": "alpro",
                             "length": 4000
                         },
                         {
                             "name": "odp_terdekat",
                             "type": "esriFieldTypeString",
                             "alias": "odp_terdekat",
                             "length": 1000
                         },
                         {
                             "name": "objectid",
                             "type": "esriFieldTypeOID",
                             "alias": "objectid",
                             "sqlType": "sqlTypeOther"
                         },
                         {
                             "name": "lat",
                             "type": "esriFieldTypeDouble",
                             "alias": "lat"
                         },
                         {
                             "name": "lng",
                             "type": "esriFieldTypeDouble",
                             "alias": "lng"
                         }
                     ]
                 };
*/
                var layerDefinition2 = {
                    "objectIdField": "objectid",

                    "globalIdFieldName": "",
                    "geometryType": "esriGeometryPoint",
                    "spatialReference": {
                        "wkid": "4326",
                        "latestWkid": "4326"
                    },
                    "fields": [

                        {
                            "name": "devicename",
                            "type": "esriFieldTypeString",
                            "alias": "devicename",
                            "length": 100
                        }
                    ]
                };
                var layerDefinition3 = {
                    "objectIdField": "objectid",
                    "trackIdField": "object_name",
                    "globalIdFieldName": "",
                    "geometryType": "esriGeometryPoint",
                    "spatialReference": {
                        "wkid": "4326",
                        "latestWkid": "4326"
                    },
                    "fields": [

                        {
                            "name": "regional",
                            "type": "esriFieldTypeString",
                            "alias": "regional",
                            "length": 5
                        },
                        {
                            "name": "witel",
                            "type": "esriFieldTypeString",
                            "alias": "witel",
                            "length": 80
                        },
                        {
                            "name": "sto",
                            "type": "esriFieldTypeString",
                            "alias": "sto",
                            "length": 1000
                        },
                        {
                            "name": "object_id",
                            "type": "esriFieldTypeDouble",
                            "alias": "object_id"
                        },
                        {
                            "name": "object_name",
                            "type": "esriFieldTypeString",
                            "alias": "object_name",
                            "length": 500
                        },
                        {
                            "name": "type_bangunan",
                            "type": "esriFieldTypeString",
                            "alias": "type_bangunan",
                            "length": 100
                        },
                        {
                            "name": "type_alpro",
                            "type": "esriFieldTypeString",
                            "alias": "type_alpro",
                            "length": 30
                        },
                        {
                            "name": "berlangganan",
                            "type": "esriFieldTypeString",
                            "alias": "berlangganan",
                            "length": 5
                        },
                        {
                            "name": "estimasi_demand",
                            "type": "esriFieldTypeString",
                            "alias": "estimasi_demand",
                            "length": 30
                        },
                        {
                            "name": "harga_rumah",
                            "type": "esriFieldTypeDouble",
                            "alias": "harga_rumah"
                        },
                        {
                            "name": "attrn_2",
                            "type": "esriFieldTypeDouble",
                            "alias": "attrn_2"
                        },
                        {
                            "name": "address",
                            "type": "esriFieldTypeString",
                            "alias": "address",
                            "length": 200
                        },
                        {
                            "name": "coordinate",
                            "type": "esriFieldTypeString",
                            "alias": "coordinate",
                            "length": 4000
                        },
                        {
                            "name": "competitor",
                            "type": "esriFieldTypeString",
                            "alias": "competitor",
                            "length": 46
                        },
                        {
                            "name": "fastel",
                            "type": "esriFieldTypeString",
                            "alias": "fastel",
                            "length": 1000
                        },
                        {
                            "name": "alpro",
                            "type": "esriFieldTypeString",
                            "alias": "alpro",
                            "length": 4000
                        },
                        {
                            "name": "odp_terdekat",
                            "type": "esriFieldTypeString",
                            "alias": "odp_terdekat",
                            "length": 1000
                        },
                        {
                            "name": "prioritasODP1",
                            "type": "esriFieldTypeString",
                            "alias": "prioritasODP1",
                            "length": 1000
                        },
                        {
                            "name": "prioritasODP2",
                            "type": "esriFieldTypeString",
                            "alias": "prioritasODP2",
                            "length": 1000
                        },
                        {
                            "name": "prioritasODP3",
                            "type": "esriFieldTypeString",
                            "alias": "prioritasODP3",
                            "length": 1000
                        },
                        {
                            "name": "JarakprioritasODP1",
                            "type": "esriFieldTypeDouble",
                            "alias": "JarakprioritasODP1",
                            "length": 1000
                        },
                        {
                            "name": "JarakprioritasODP2",
                            "type": "esriFieldTypeDouble",
                            "alias": "JarakprioritasODP2",
                            "length": 1000
                        },
                        {
                            "name": "JarakprioritasODP3",
                            "type": "esriFieldTypeDouble",
                            "alias": "JarakprioritasODP3",
                            "length": 1000
                        }
                    ]
                };



                var layerDefinition4 = {
                    "objectIdField": "objectid",
                    "trackIdField": "object_name",
                    "globalIdFieldName": "",
                    "geometryType": "esriGeometryPoint",
                    "spatialReference": {
                        "wkid": "4326",
                        "latestWkid": "4326"
                    },
                    "fields": [

                        {
                            "name": "order_id",
                            "type": "esriFieldTypeDouble",
                            "alias": "order_id"
                        },
                        {
                            "name": "order_date",
                            "type": "esriFieldTypeString",
                            "alias": "esriFieldTypeDate",
                            "length": 8
                        },
                        {
                            "name": "extern_order_id",
                            "type": "esriFieldTypeString",
                            "alias": "extern_order_id",
                            "length": 1000
                        },
                        {
                            "name": "demand_id",
                            "type": "esriFieldTypeDouble",
                            "alias": "demand_id"
                        },
                        {
                            "name": "extern_order_status",
                            "type": "esriFieldTypeString",
                            "alias": "extern_order_status",
                            "length": 500
                        },
                        {
                            "name": "customer_name",
                            "type": "esriFieldTypeString",
                            "alias": "customer_name",
                            "length": 100
                        },
                        {
                            "name": "customer_addr",
                            "type": "esriFieldTypeString",
                            "alias": "customer_addr",
                            "length": 128
                        },
                        {
                            "name": "city_name",
                            "type": "esriFieldTypeString",
                            "alias": "city_name",
                            "length": 100
                        },
                        {
                            "name": "estimasi_demand",
                            "type": "esriFieldTypeString",
                            "alias": "estimasi_demand",
                            "length": 30
                        },
                        {
                            "name": "harga_rumah",
                            "type": "esriFieldTypeDouble",
                            "alias": "harga_rumah"
                        },
                        {
                            "name": "district_id",
                            "type": "esriFieldTypeDouble",
                            "alias": "district_id"
                        },
                        {
                            "name": "district_name",
                            "type": "esriFieldTypeString",
                            "alias": "district_name",
                            "length": 200
                        },
                        {
                            "name": "street_name",
                            "type": "esriFieldTypeString",
                            "alias": "street_name",
                            "length": 4000
                        },
                        {
                            "name": "street_no",
                            "type": "esriFieldTypeString",
                            "alias": "street_no",
                            "length": 46
                        },
                        {
                            "name": "phone_no",
                            "type": "esriFieldTypeString",
                            "alias": "phone_no",
                            "length": 1000
                        },
                        {
                            "name": "no_hp",
                            "type": "esriFieldTypeString",
                            "alias": "no_hp",
                            "length": 4000
                        },
                        {
                            "name": "email",
                            "type": "esriFieldTypeString",
                            "alias": "email",
                            "length": 1000
                        },
                        {
                            "name": "objectid",
                            "type": "esriFieldTypeOID",
                            "alias": "objectid",
                            "sqlType": "sqlTypeOther"
                        },
                        {
                            "name": "product_id",
                            "type": "esriFieldTypeDouble",
                            "alias": "product_id"
                        },
                        {
                            "name": "last_update",
                            "type": "esriFieldTypeDate",
                            "alias": "last_update"
                        },
                        {
                            "name": "package_name",
                            "type": "esriFieldTypeString",
                            "alias": "package_name",
                            "length": 1000
                        },
                        {
                            "name": "jenispsb",
                            "type": "esriFieldTypeString",
                            "alias": "jenispsb",
                            "length": 1000
                        },
                        {
                            "name": "witel",
                            "type": "esriFieldTypeString",
                            "alias": "witel",
                            "length": 1000
                        },
                        {
                            "name": "prioritasODP1",
                            "type": "esriFieldTypeString",
                            "alias": "prioritasODP1",
                            "length": 1000
                        },
                        {
                            "name": "prioritasODP2",
                            "type": "esriFieldTypeString",
                            "alias": "prioritasODP2",
                            "length": 1000
                        },
                        {
                            "name": "prioritasODP3",
                            "type": "esriFieldTypeString",
                            "alias": "prioritasODP3",
                            "length": 1000
                        },
                        {
                            "name": "JarakprioritasODP1",
                            "type": "esriFieldTypeDouble",
                            "alias": "JarakprioritasODP1",
                            "length": 1000
                        },
                        {
                            "name": "JarakprioritasODP2",
                            "type": "esriFieldTypeDouble",
                            "alias": "JarakprioritasODP2",
                            "length": 1000
                        },
                        {
                            "name": "JarakprioritasODP3",
                            "type": "esriFieldTypeDouble",
                            "alias": "JarakprioritasODP3",
                            "length": 1000
                        }

                    ]
                };
				
				
				   var templateDemand = new PopupTemplate({
							title: "Fastel {fastel}",
						  fieldInfos: [{
							fieldName: "witel",
							visible: true,
							format: {
							  places: 0
							}
						  } , {
							fieldName: "prioritasODP1",
							visible: true,
							format: {
							  places: 0
							}
						  }, {
							fieldName: "JarakprioritasODP1",
							visible: true,
							format: {
							  places: 0
							}
						  }, {
							fieldName: "prioritasODP2",
							visible: true,
							format: {
							  places: 0
							}
						  }, {
							fieldName: "JarakprioritasODP2",
							visible: true,
							format: {
							  places: 0
							}
						  }, {
							fieldName: "prioritasODP3",
							visible: true,
							format: {
							  places: 0
							}
						  }, {
							fieldName: "JarakprioritasODP3",
							visible: true,
							format: {
							  places: 0
							}
						  },{
							fieldName: "sto",
							visible: true,
							format: {
							  places: 0
							}
						  }, {
							fieldName: "object_name",
							visible: true,
							format: {
							  places: 0
							}
						  }, {
							fieldName: "type_bangunan",
							visible: true,
							format: {
							  places: 0
							}
						  }, {
							fieldName: "type_alpro",
							visible: true,
							format: {
							  places: 0
							}
						  }, {
							fieldName: "berlangganan",
							visible: true,
							format: {
							  places: 0
							}
						  }, {
							fieldName: "estimasi_demand",
							visible: true,
							format: {
							  places: 0
							}
						  }, {
							fieldName: "address",
							visible: true,
							format: {
							  places: 0
							}
						  }, {
							fieldName: "competitor",
							visible: true,
							format: {
							  places: 0
							}
						  }]
						});
						
					var templateUN = new PopupTemplate({
							title: "Fastel {order_id}",
						  fieldInfos: [{
							fieldName: "witel",
							visible: true,
							format: {
							  places: 0
							}
						  } , {
							fieldName: "prioritasODP1",
							visible: true,
							format: {
							  places: 0
							}
						  }, {
							fieldName: "JarakprioritasODP1",
							visible: true,
							format: {
							  places: 0
							}
						  }, {
							fieldName: "prioritasODP2",
							visible: true,
							format: {
							  places: 0
							}
						  }, {
							fieldName: "JarakprioritasODP2",
							visible: true,
							format: {
							  places: 0
							}
						  }, {
							fieldName: "prioritasODP3",
							visible: true,
							format: {
							  places: 0
							}
						  }, {
							fieldName: "JarakprioritasODP3",
							visible: true,
							format: {
							  places: 0
							}
						  },{
							fieldName: "demand_id",
							visible: true,
							format: {
							  places: 0
							}
						  }, {
							fieldName: "extern_order_status",
							visible: true,
							format: {
							  places: 0
							}
						  }, {
							fieldName: "customer_name",
							visible: true,
							format: {
							  places: 0
							}
						  }, {
							fieldName: "city_name",
							visible: true,
							format: {
							  places: 0
							}
						  }, {
							fieldName: "district_id",
							visible: true,
							format: {
							  places: 0
							}
						  }, {
							fieldName: "district_name",
							visible: true,
							format: {
							  places: 0
							}
						  }, {
							fieldName: "no_hp",
							visible: true,
							format: {
							  places: 0
							}
						  }, {
							fieldName: "last_update",
							visible: true,
							format: {
							  places: 0
							}
						  }]
						});
						
					var templateODP = new PopupTemplate({
					  title: "{devicename}"
					});

                /*  var featureCollection = {
                     layerDefinition: layerDefinition,
                     featureSet: null
                 };*/

                var featureCollection2 = {
                    layerDefinition: layerDefinition2,
                    featureSet: null
                };

                var featureCollection3 = {
                    layerDefinition: layerDefinition3,
                    featureSet: null
                };

                var featureCollection4 = {
                    layerDefinition: layerDefinition4,
                    featureSet: null
                };
		
				

                //var featureLayer = new FeatureLayer(featureCollection);
                var featureLayer2 = new FeatureLayer(featureCollection2,{
											id: 'PotensiODP',
										  infoTemplate: templateODP
										});
                var featureLayer3 = new FeatureLayer(featureCollection3, {
										  id: 'PotensiDemand',
										  infoTemplate: templateDemand
										});
                var featureLayer4 = new FeatureLayer(featureCollection4, {
										  id: 'PotensiUN',
										  infoTemplate: templateUN
				});

                //this.map.addLayer(featureLayer);
                this.map.addLayer(featureLayer2);
                this.map.addLayer(featureLayer3);
                this.map.addLayer(featureLayer4);
				
				
						
		

                //console.log(this.map);
                var mapid = this.map;
				var config = this.config;
				//console.log(this.config);
                var dataFeature = this.featuresData;
                var loading = this.progressBar;
                html.setStyle(loading, 'display', 'none');
                var self = this,
                    ok = false,
                    btn = this.showButton;
                var Buttons = this.showButton;
				var clearButton = this.clearButton;
				var downloadButton = this.downloadButton;
				var downloadCSV=this.downloadCSV;
                arrDemand = [];
                arrODP = [];
                attributOdp = [];
                arrUN = [];
                var radiusM = dojo.byId("buuferR").value;
                //var radiusOdp = dojo.byId("bufferODP").value;
                arrExisting = [];
                var queryTask = new QueryTask("http://gis-web.udata.id/gis/rest/services/indigis/Demand_REG_2/MapServer/0");
                var query = new Query();
                query.where = '1=1';
                query.geometry = this.map.extent;
                query.outFields = ["lat", "lng"];
                query.returnGeometry = false;
                var qt = queryTask.execute(query);
                var demand = qt.then(lang.hitch(this,
                    function(response) {
                        //this.progressBar;
                        //var tes= this.progressBar;
                        //html.setStyle(btn, 'display', 'none');
                        html.setStyle(this.progressBar, 'display', '');
                        html.setStyle(this.showButton, 'display', 'none');



                        var res = response.features;

                        //console.log(response);
                        var latDemand, lngDemand;
                        if (res.length > 0) {
                            for (var i = 0; i < res.length; i++) {
                                if (res[i].attributes.lat != null || res[i].attributes.lng != null) {
                                    latDemand = res[i].attributes.lat;
                                    lngDemand = res[i].attributes.lng;
                                    arrDemand.push(lngDemand + ',' + latDemand);
                                }
                            }
                            return {
                                aDarr: arrDemand,
                                aDarrlength: arrDemand.length,
                                aExtent: this.map.extent
                            };
                        } else {
                            alert('Data tidak ditemukan');
                            html.setStyle(Buttons, 'display', '');
                        }
                    }
                ));



                var queryTask1 = new QueryTask("http://gis-web.udata.id/gis/rest/services/indigis/cons_odp_profiling/MapServer/0");
                var query1 = new Query();
                query1.where = "status_occ ='BLACK' OR status_occ = 'GREEN'";
                query1.geometry = this.map.extent;
                query1.outFields = ["lat", "long", "device_id", "devicename"];
                query1.returnGeometry = false;
                var qts = queryTask1.execute(query1);
                var demands = qts.then(lang.hitch(this,
                    function(response) {

                        html.setStyle(this.progressBar, 'display', '');
                        html.setStyle(this.showButton, 'display', 'none');
                        mapid.graphics.clear();


                        var res = response.features;

                        var latOdp, lngOdp, device_id, devicename;
                        if (res.length > 0) {
                            for (var i = 0; i < res.length; i++) {
                                //console.log(res[i].attributes);
                                if (res[i].attributes.lat != null || res[i].attributes.long != null) {
                                    latOdp = res[i].attributes.lat;
                                    lngOdp = res[i].attributes.long;
                                    device_id = res[i].attributes.device_id;
                                    devicename = res[i].attributes.devicename;
                                    arrODP.push(lngOdp + ',' + latOdp + ',' + device_id);
                                    attributOdp.push(devicename);
                                }
                            }
                            return {
                                aODP: arrODP,
                                aODPlength: arrODP.length
                            };
                        } else {
                            alert('Data tidak ditemukan');
                            html.setStyle(Buttons, 'display', '');
                        }

                    }

                ));
                demand.then(function(resDemand) {
                    var queryTask = new QueryTask("http://gis-web.udata.id/gis/rest/services/indigis/pelanggan_un/MapServer/0");
                    var query = new Query();
                    query.where = '1=1';
                    query.geometry = resDemand.aExtent;
                    query.outFields = ["lat", "long"];
                    var qt = queryTask.execute(query);
                    qt.then(lang.hitch(this,
                        function(resUN) {

                            var deferred = new Deferred();
                            var res = resUN.features;
                            var latUN, longUN;


                            if (res.length > 0) {
                                for (var i = 0; i < res.length; i++) {
                                    if (res[i].attributes.lat != null || res[i].attributes.long != null) {
                                        latUN = res[i].attributes.lat;
                                        longUN = res[i].attributes.long;
                                        arrUN.push(longUN + ',' + latUN);
                                    }
                                }
                                resDemand.cUNarr = arrUN;
                                resDemand.cUNlength = arrUN.length;

                            } else {
                                alert('Data tidak ditemukan');

                                html.setStyle(Buttons, 'display', '');
                            }
                            deferred.resolve(resDemand);
                            return deferred.promise;
                        }
                    )).then(function(resDemandUN) {
                        var queryTask = new QueryTask("http://gis-web.udata.id/gis/rest/services/indigis/cons_cust_existing/MapServer/0");
                        var query = new Query();
                        query.where = '1=1';
                        query.geometry = resDemandUN.aExtent;
                        query.outFields = ["latitude", "longitude"];
                        var qt = queryTask.execute(query);

                        qt.then(lang.hitch(this,
                            function(resExisting) {

                                var res = resExisting.features;
                                var latitude, longitude;
                                if (res.length > 0) {
                                    for (var i = 0; i < res.length; i++) {
                                        if (res[i].attributes.latitude != null || res[i].attributes.longitude != null) {
                                            latitude = res[i].attributes.latitude;
                                            longitude = res[i].attributes.longitude;
                                            arrExisting.push(longitude + ',' + latitude);
                                        }
                                    }
                                    var x = resDemandUN.aDarr;
                                    var y = resDemandUN.cUNarr;
                                    var b = arrExisting;
                                    var z = res;
                                    var v = arrODP;
                                    //console.log(v);


                                    var pointv = [];

                                    for (var i = 0; i < v.length; i++) {
                                        d = v[i].split(",");
                                        pointv.push(d.map(Number));

                                        //console.log(d.map(Number));
                                    }
                                 
                                    var pointx = [];


                                    for (var i = 0; i < x.length; i++) {
                                        d = x[i].split(",");
                                        pointx.push(d.map(Number));
                                    }


                                    var pointy = [];


                                    for (var i = 0; i < y.length; i++) {
                                        d = y[i].split(",");
                                        pointy.push(d.map(Number));
                                    }

                                    var mpJsonx = {
                                        "points": pointx,
                                        "spatialReference": ({
                                            "wkid": 4326
                                        })
                                    };
                                    var multipointx = new Multipoint(mpJsonx);



                                    var mpJsonv = {
                                        "points": pointv,
                                        "spatialReference": ({
                                            "wkid": 4326
                                        }),
                                        "cuy": 112
                                    };

                                    //console.log(mpJsonv);
                                    var multipointv = new Multipoint(mpJsonv);
                                    //console.log(multipointv);




                                    var mpJsony = {
                                        "points": pointy,
                                        "spatialReference": ({
                                            "wkid": 4326
                                        })
                                    };

                                    var multipointy = new Multipoint(mpJsony);

                                    var union = geometryEngine.union([multipointx, multipointy]);


                                    var pointZx = [];


                                    for (var i = 0; i < b.length; i++) {
                                        d = b[i].split(",");
                                        pointZx.push(d.map(Number));
                                    }

                                    var mpJsonz = {
                                        "points": pointZx,
                                        "spatialReference": ({
                                            "wkid": 4326
                                        })
                                    };
                                    var multipointz = new Multipoint(mpJsonz);





                                    //cek Odp seleksi dengaan pelanggan dekat
                                    var bufferedGeometriesOdp = geometryEngine.geodesicBuffer(multipointv, [radiusM], "meters", false);
                                    var intersect = geometryEngine.intersect([union], bufferedGeometriesOdp);
                                    var intersectUN = geometryEngine.intersect([multipointy], bufferedGeometriesOdp);
                                    var intersectDemand = geometryEngine.intersect([multipointx], bufferedGeometriesOdp);

                                    //mengurangi pelanggan existing
                                    var differ2 = geometryEngine.difference([intersect[0]], multipointz);
                                    var differUN = geometryEngine.difference([intersectUN[0]], multipointz);
                                    var differDemand = geometryEngine.difference([intersectDemand[0]], multipointz);




                                    //console.log(differDemand);

                                    //radius potensi pelanggan
                                    var bufferedGeometriesPelanggan = geometryEngine.geodesicBuffer(differ2[0], [radiusM], "meters", false);
                                    var intersectOdp = geometryEngine.intersect([multipointv], bufferedGeometriesPelanggan);

                                    var symbol = new SimpleFillSymbol();
                                    symbol.setColor(new Color([100, 100, 100, 0.25]));
                                    symbol.setOutline(null);
                                    mapid.graphics.add(new Graphic(bufferedGeometriesPelanggan, symbol))

                                    dataFeature(differ2[0], mapid, bufferedGeometriesPelanggan, multipointv, radiusM, featureLayer3, differUN[0], differDemand[0], featureLayer4, intersectOdp[0], featureLayer2,Buttons,loading,clearButton,downloadButton,downloadCSV, config);

                                    var markerSymbol = new SimpleMarkerSymbol({
                                        "color": [216, 191, 216],
                                        "size": 5,

                                        "xoffset": 0,
                                        "yoffset": 0,
                                        "type": "esriSMS",
                                        "style": "esriSMSCircle",
                                        "outline": {
                                            "color": [255, 0, 255],
                                            "width": 1,
                                            "type": "esriSLS",
                                            "style": "esriSLSSolid"
                                        }
                                    });

                                    var markerSymbolREd = new SimpleMarkerSymbol({
                                        "color": [216, 191, 216],
                                        "size": 5,

                                        "xoffset": 0,
                                        "yoffset": 0,
                                        "type": "esriSMS",
                                        "style": "esriSMSCircle",
                                        "outline": {
                                            "color": [205, 0, 0],
                                            "width": 1,
                                            "type": "esriSLS",
                                            "style": "esriSLSSolid"
                                        }
                                    });


                                    var renderer = new SimpleRenderer(markerSymbol);
                                    var renderer1 = new SimpleRenderer(markerSymbolREd);

                                    featureLayer3.setRenderer(renderer);
                                    featureLayer4.setRenderer(renderer1);
                                    // mapid.graphics.add(new Graphic(intersect[0], markerSymbol));
                                    //mapid.graphics.add(new Graphic(intersectOdp[0], markerSymbol));

                                  


                                    // dojo.byId("total").innerHTML = "<td>Total Potensi : " + intersect[0].points.length + "</td>";


                                } else {
                                    alert('Data tidak ditemukan');
                                    html.setStyle(Buttons, 'display', '');
                                }

                            }
                        ));

                    });

                });
			}

            },
            featuresData: function(uu, mapid, selectOdp, intersectOdp, radiusM, featureLayer3, multipointy, multipointx, featureLayer4, odp, featureLayer2,Buttons,loading,clearButton,downloadButton,downloadCSV, config) {
				
				

				//var downloadCSV=this.downloadCSV;
                var radiusODPtoMeter = radiusM / 1000;
                var radiusODP = radiusM / 100000;
                var polylineSymbolPrioritas1 = new SimpleLineSymbol().setColor(new Color([0, 255, 0]));

                var polylineSymbolPrioritas2 = new SimpleLineSymbol().setColor(new Color([255, 255, 0]));

                var polylineSymbolPrioritas3 = new SimpleLineSymbol().setColor(new Color([255, 0, 0]));
                var markerSymbol = new SimpleMarkerSymbol({
                    "color": [0, 0, 0],
                    "size": 5,

                    "xoffset": 0,
                    "yoffset": 0,
                    "type": "esriSMS",
                    "style": "esriSMSCircle",
                    "outline": {
                        "color": [0, 0, 0],
                        "width": 1,
                        "type": "esriSLS",
                        "style": "esriSLSSolid"
                    }
                });

              
				   
				//console.log(JSON.stringify(multipointx));

                //console.log(radiusODPtoMeter);

                /* var dynamicLayer = new FeatureLayer("http://gis-web.udata.id/gis/rest/services/indigis/Demand_REG_2/MapServer/0");

                var query1 = new Query();
                query1.where = '1=1';
                query1.geometry = multipointx;
                query1.outFields = ['*'];
                //query1.geometryType = 'esriGeometryMultipoint';
				//console.log(dynamicLayer)
                // Query for the features with the given object ID
                dynamicLayer.queryFeatures(query1, function(featureSet) {
                    console.log(featureSet);
                    //mapid.addLayer(featureSet);
                }); */

                //query data Demand
				
				
                var queryTask = new QueryTask("http://gis-web.udata.id/gis/rest/services/indigis/Demand_REG_2/MapServer/0");
                var query = new Query();
                query.where = '1=1';
                query.geometry = multipointx;
                query.outFields = ['*'];
               // query.geometryType = 'esriGeometryMultipoint';
                //query.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
                query.returnGeometry = true;
                var qt = queryTask.execute(query);
                 //console.log(qt);
				//console.log(queryTask);
				//console.log(query);
                var potensi = qt.then(lang.hitch(this,
                    function(response) {
                      // console.log(response);
                        if (response.features.length > 0) {
                            var features = [];
                            var prioritas1 = [];
                            var prioritas2 = [];
                            var prioritas3 = [];
                            var nearestData = [];
                            //Looping Nearest Data
                            for (var i = 0; i < response.features.length; i++) {

                                var nearestPelanggan = geometryEngine.nearestVertices(intersectOdp, response.features[i].geometry, radiusODPtoMeter, 3);

                                prioritas1.push(nearestPelanggan[0]);
                                //console.log(nearestPelanggan);
                                prioritas2.push(nearestPelanggan[1]);
                                prioritas3.push(nearestPelanggan[2]);

                            }


                            //console.log(prioritas3);




                            var multipointPrioritas1 = new Multipoint();
                            var multipointPrioritas2 = new Multipoint();
                            var multipointPrioritas3 = new Multipoint();
                            for (var x = 0; x < prioritas1.length; x++) {
                                multipointPrioritas1.addPoint(prioritas1[x].coordinate);
                                multipointPrioritas2.addPoint(prioritas2[x].coordinate);
                                multipointPrioritas3.addPoint(prioritas3[x].coordinate);
                                mapid.graphics.add(new Graphic(prioritas1[x].coordinate, markerSymbol))


                                var polylinePriority1 = new Polyline({
                                    "paths": [
                                        [
                                            [prioritas1[x].coordinate.x, prioritas1[x].coordinate.y],

                                            [response.features[x].geometry.x, response.features[x].geometry.y]
                                        ]
                                    ],
                                    "spatialReference": {
                                        "wkid": 4326
                                    }
                                });

                                mapid.graphics.add(new Graphic(polylinePriority1, polylineSymbolPrioritas1));

                                if (prioritas2[x].distance <= radiusODP) {

                                    var polylinePriority2 = new Polyline({
                                        "paths": [
                                            [

                                                [prioritas2[x].coordinate.x, prioritas2[x].coordinate.y],
                                                [response.features[x].geometry.x, response.features[x].geometry.y]

                                            ]
                                        ],
                                        "spatialReference": {
                                            "wkid": 4326
                                        }
                                    });
                                    mapid.graphics.add(new Graphic(polylinePriority2, polylineSymbolPrioritas2));
                                }
                                if (prioritas3[x].distance <= radiusODP) {

                                    var polylinePriority3 = new Polyline({
                                        "paths": [
                                            [

                                                [prioritas3[x].coordinate.x, prioritas3[x].coordinate.y],
                                                [response.features[x].geometry.x, response.features[x].geometry.y]
                                            ]
                                        ],
                                        "spatialReference": {
                                            "wkid": 4326
                                        }
                                    });
                                    mapid.graphics.add(new Graphic(polylinePriority3, polylineSymbolPrioritas3));



                                }
                            }



                            var dynamicLayer = new QueryTask("http://gis-web.udata.id/gis/rest/services/indigis/cons_odp_profiling/MapServer/0");
                            var query1 = new Query();
                            query1.where = "status_occ ='BLACK' OR status_occ = 'GREEN'";
                            query1.geometry = odp;
                            query1.outFields = ["lat", "long", "device_id", "devicename"];
                            query1.geometryType = 'esriGeometryMultipoint';
                            query1.returnGeometry = true;
                            query1.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
                            var qt = dynamicLayer.execute(query1);
                            qt.then(lang.hitch(this,
                                function(featureset) {
									//console.log(featureset);
                                    for (var v = 0; v < multipointPrioritas1.points.length; v++) {
                                        for (var x = 0; x < featureset.features.length; x++) {

                                            //console.log(multipointPrioritas1.points[v][0]==featureset.features[x].attributes.long);
                                            if (multipointPrioritas1.points[v][0] === featureset.features[x].attributes.long && multipointPrioritas1.points[v][1] === featureset.features[x].attributes.lat) {
                                                var dataPoint = multipointPrioritas1.points[v];
                                                var dataAttr = featureset.features[x].attributes.devicename;
                                                dataPoint.push(dataAttr);

                                            }
                                            if (multipointPrioritas2.points[v][0] === featureset.features[x].attributes.long && multipointPrioritas2.points[v][1] === featureset.features[x].attributes.lat) {
                                                var dataPoint = multipointPrioritas2.points[v];
                                                var dataAttr = featureset.features[x].attributes.devicename;
                                                dataPoint.push(dataAttr);

                                            }
                                            if (multipointPrioritas3.points[v][0] === featureset.features[x].attributes.long && multipointPrioritas3.points[v][1] === featureset.features[x].attributes.lat) {
                                                var dataPoint = multipointPrioritas3.points[v];
                                                var dataAttr = featureset.features[x].attributes.devicename;
                                                dataPoint.push(dataAttr);

                                            }
                                        }
                                    }
									
									var dataAttr=[];
                                    for (var i = 0; i < response.features.length; i++) {

                                        var attr = {};
                                        // var strOdp1 = '"' + prioritas1[i].coordinate.y + '"';
                                        // var strOdp2 = '"' + prioritas2[i].coordinate.y + '"';
                                        // var strOdp3 = '"' + prioritas3[i].coordinate.y + '"';
                                        attr["address"] = response.features[i].attributes.address;
                                        attr["alpro"] = response.features[i].attributes.alpro;
                                        attr["attrn_2"] = response.features[i].attributes.attrn_2;
                                        attr["berlangganan"] = response.features[i].attributes.berlangganan;
                                        attr["competitor"] = response.features[i].attributes.competitor;
                                        attr["estimasi_demand"] = response.features[i].attributes.estimasi_demand;
                                        attr["fastel"] = response.features[i].attributes.fastel;
                                        attr["object_name"] = response.features[i].attributes.object_name;
                                        attr["regional"] = response.features[i].attributes.regional;
                                        attr["sto"] = response.features[i].attributes.sto;
                                        attr["type_alpro"] = response.features[i].attributes.type_alpro;
                                        attr["type_bangunan"] = response.features[i].attributes.type_bangunan;
                                        attr["witel"] = response.features[i].attributes.witel;


                                        attr["prioritasODP1"] = multipointPrioritas1.points[i][2];
                                        attr["JarakprioritasODP1"] = prioritas1[i].distance * 100000;

                                        if (prioritas2[i].distance <= radiusODP) {
                                            attr["prioritasODP2"] = multipointPrioritas2.points[i][2];
                                            attr["JarakprioritasODP2"] = prioritas2[i].distance * 100000;
                                        }
                                        if (prioritas3[i].distance <= radiusODP) {
                                            attr["prioritasODP3"] = multipointPrioritas3.points[i][2];
                                            attr["JarakprioritasODP3"] = prioritas3[i].distance * 100000;
                                        }


                                        var graphic = new Graphic(response.features[i].geometry);
                                        graphic.setAttributes(attr);
                                        features.push(graphic);

										//console.log(features);
									
									//console.log(myJSON);
										dataAttr.push(features[i].attributes);
                                    }
									
									
									var myJSON = JSON.stringify(dataAttr);
							
									   localStorage.setItem("potensiDemand", myJSON);
                                   
									
									

                                    featureLayer3.applyEdits(features, null, null, function(adds) {

											/* myTable = new FeatureTable({
											featureLayer : featureLayer3,
											showGridMenu: false,
											hiddenFields: []  // field that end-user can show, but is hidden on startup
												}, "myTableNode");

											myTable.startup();
 */
                                    });


									html.setStyle(loading, 'display', 'none');
                                    
									html.setStyle(clearButton, 'display', '');
                                    html.setStyle(downloadButton, 'display', '');
                                    var OdpData = [];

                                    for (var i = 0; i < featureset.features.length; i++) {
                                        var attr = {};
                                        attr["devicename"] = featureset.features[i].attributes.devicename;
                                        var graphic = new Graphic(featureset.features[i].geometry);
                                        graphic.setAttributes(attr);
                                        OdpData.push(graphic);
                                    }

                                    //console.log(OdpData);

                                    featureLayer2.applyEdits(OdpData, null, null, function(adds) {



                                    });




                                }));

                        }
                    }));


                // onsole.log(uu);
                var queryTask2 = new QueryTask("http://gis-web.udata.id/gis/rest/services/indigis/pelanggan_un/MapServer/0");
                var query2 = new Query();
                query2.where = "1=1";
                query2.geometry = multipointy;
                query2.outFields = ['*'];
                query2.geometryType = 'esriGeometryMultipoint';
                query2.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
                query2.returnGeometry = true;
                var qt2 = queryTask2.execute(query2);
                //console.log(qt1);
                var pelangganUN = qt2.then(lang.hitch(this,
                    function(response) {
                       // console.log(response);
                        if (response.features.length > 0) {
                            //console.log(multipointy);

                            var features = [];
                            var prioritas1 = [];
                            var prioritas2 = [];
                            var prioritas3 = [];
                            //console.log(response.features);
                            for (i = 0; i < response.features.length; i++) {


                                var nearestPelanggan = geometryEngine.nearestVertices(intersectOdp, response.features[i].geometry, radiusODPtoMeter, 3);

                                prioritas1.push(nearestPelanggan[0]);
                                prioritas2.push(nearestPelanggan[1]);
                                prioritas3.push(nearestPelanggan[2]);




                            }




                            var multipointPrioritas1 = new Multipoint();
                            var multipointPrioritas2 = new Multipoint();
                            var multipointPrioritas3 = new Multipoint();
                            for (var x = 0; x < prioritas1.length; x++) {
                                multipointPrioritas1.addPoint(prioritas1[x].coordinate);
                                multipointPrioritas2.addPoint(prioritas2[x].coordinate);
                                multipointPrioritas3.addPoint(prioritas3[x].coordinate);
                                mapid.graphics.add(new Graphic(prioritas1[x].coordinate, markerSymbol))

                                var polylinePriority1 = new Polyline({
                                    "paths": [
                                        [
                                            [prioritas1[x].coordinate.x, prioritas1[x].coordinate.y],

                                            [response.features[x].geometry.x, response.features[x].geometry.y]
                                        ]
                                    ],
                                    "spatialReference": {
                                        "wkid": 4326
                                    }
                                });

                                mapid.graphics.add(new Graphic(polylinePriority1, polylineSymbolPrioritas1));

                                if (prioritas2[x].distance <= radiusODP) {

                                    var polylinePriority2 = new Polyline({
                                        "paths": [
                                            [

                                                [prioritas2[x].coordinate.x, prioritas2[x].coordinate.y],
                                                [response.features[x].geometry.x, response.features[x].geometry.y]

                                            ]
                                        ],
                                        "spatialReference": {
                                            "wkid": 4326
                                        }
                                    });
                                    mapid.graphics.add(new Graphic(polylinePriority2, polylineSymbolPrioritas2));
                                }
                                if (prioritas3[x].distance <= radiusODP) {

                                    var polylinePriority3 = new Polyline({
                                        "paths": [
                                            [

                                                [prioritas3[x].coordinate.x, prioritas3[x].coordinate.y],
                                                [response.features[x].geometry.x, response.features[x].geometry.y]
                                            ]
                                        ],
                                        "spatialReference": {
                                            "wkid": 4326
                                        }
                                    });
                                    mapid.graphics.add(new Graphic(polylinePriority3, polylineSymbolPrioritas3));



                                }
                            }

                            var dynamicLayer = new QueryTask("http://gis-web.udata.id/gis/rest/services/indigis/cons_odp_profiling/MapServer/0");
                            var query1 = new Query();
                            query1.where = "status_occ ='BLACK' OR status_occ = 'GREEN'";
                            query1.geometry = odp;
                            query1.outFields = ["lat", "long", "device_id", "devicename"];
                            query1.geometryType = 'esriGeometryMultipoint';
                            query1.returnGeometry = true;
                            query1.spatialRelationship = Query.SPATIAL_REL_INTERSECTS;
                            var qt = dynamicLayer.execute(query1);
                            qt.then(lang.hitch(this,
                                function(featureset) {
									//console.log(featureset);
                                    for (var v = 0; v < multipointPrioritas1.points.length; v++) {
                                        for (var x = 0; x < featureset.features.length; x++) {

                                            //console.log(multipointPrioritas1.points[v][0]==featureset.features[x].attributes.long);
                                            if (multipointPrioritas1.points[v][0] === featureset.features[x].attributes.long && multipointPrioritas1.points[v][1] === featureset.features[x].attributes.lat) {
                                                var dataPoint = multipointPrioritas1.points[v];
                                                var dataAttr = featureset.features[x].attributes.devicename;
                                                dataPoint.push(dataAttr);

                                            }
                                            if (multipointPrioritas2.points[v][0] === featureset.features[x].attributes.long && multipointPrioritas2.points[v][1] === featureset.features[x].attributes.lat) {
                                                var dataPoint = multipointPrioritas2.points[v];
                                                var dataAttr = featureset.features[x].attributes.devicename;
                                                dataPoint.push(dataAttr);

                                            }
                                            if (multipointPrioritas3.points[v][0] === featureset.features[x].attributes.long && multipointPrioritas3.points[v][1] === featureset.features[x].attributes.lat) {
                                                var dataPoint = multipointPrioritas3.points[v];
                                                var dataAttr = featureset.features[x].attributes.devicename;
                                                dataPoint.push(dataAttr);

                                            }

                                        }
                                    }
									var dataAttr=[];
                                    for (var i = 0; i < response.features.length; i++) {

                                        var attr = {};
                                        attr["city_id"] = response.features[i].attributes.city_id;
                                        attr["city_name"] = response.features[i].attributes.city_name;
                                        attr["customer_name"] = response.features[i].attributes.customer_name;
                                        attr["demand_id"] = response.features[i].attributes.demand_id;
                                        attr["district_id"] = response.features[i].attributes.district_id;
                                        attr["district_name"] = response.features[i].attributes.district_name;
                                        attr["email"] = response.features[i].attributes.email;
                                        attr["extern_order_id"] = response.features[i].attributes.extern_order_id;
                                        attr["extern_order_status"] = response.features[i].attributes.extern_order_status;
                                        attr["jenispsb"] = response.features[i].attributes.jenispsb;
                                        attr["last_update"] = response.features[i].attributes.last_update;
                                        attr["order_date"] = response.features[i].attributes.order_date;
                                        attr["no_hp"] = response.features[i].attributes.no_hp;
                                        attr["order_date"] = prioritas1[i].order_date;
                                        attr["order_id"] = prioritas2[i].order_id;
                                        attr["prioritasODP1"] = multipointPrioritas1.points[i][2];
                                        attr["JarakprioritasODP1"] = prioritas1[i].distance * 100000;
                                        if (prioritas2[i].distance <= radiusODP) {
                                            attr["prioritasODP2"] = multipointPrioritas2.points[i][2];
                                            attr["JarakprioritasODP2"] = prioritas2[i].distance * 100000;
                                        }
                                        if (prioritas3[i].distance <= radiusODP) {
                                            attr["prioritasODP3"] = multipointPrioritas3.points[i][2];
                                            attr["JarakprioritasODP3"] = prioritas3[i].distance * 100000;
                                        }

                                        var graphic = new Graphic(response.features[i].geometry);
                                        graphic.setAttributes(attr);
                                        features.push(graphic);

											dataAttr.push(features[i].attributes);
										}
									
									
									var myJSON = JSON.stringify(dataAttr);
							
									   localStorage.setItem("potensiUN", myJSON);

                                    //var multipointPrioritas1 = new Multipoint();

                                    featureLayer4.applyEdits(features, null, null, function(adds) {



                                    });



                                    var OdpData = [];

                                    for (var i = 0; i < featureset.features.length; i++) {
                                        var attr = {};
                                        attr["devicename"] = featureset.features[i].attributes.devicename;
                                        var graphic = new Graphic(featureset.features[i].geometry);
                                        graphic.setAttributes(attr);
                                        OdpData.push(graphic);
                                    }



                                }));



                        }
                    }
                ));


			
            },

            clearClicked: function(layers) {
				localStorage.clear();
                //console.log(this.map);
                //var layers=[];
                for (var i = 0; i < this.map.graphicsLayerIds.length; i++) {
                    //var layer =this.map.getLayer(this.map.graphicsLayerIds[i])
                    //console.log(layer);
                    //layers.push(layer);
                    //this.map.graphics.clear();
                    this.map.removeLayer(this.map.getLayer(this.map.graphicsLayerIds[i]));
                }
                for (var i = 0; i < this.map.graphicsLayerIds.length; i++) {
                    //var layer =this.map.getLayer(this.map.graphicsLayerIds[i])
                    //console.log(layer);
                    //layers.push(layer);
                    //this.map.graphics.clear();
                    this.map.removeLayer(this.map.getLayer(this.map.graphicsLayerIds[i]));
                }
                for (var i = 0; i < this.map.graphicsLayerIds.length; i++) {
                    //var layer =this.map.getLayer(this.map.graphicsLayerIds[i])
                    //console.log(layer);
                    //layers.push(layer);
                    //this.map.graphics.clear();
                    this.map.removeLayer(this.map.getLayer(this.map.graphicsLayerIds[i]));
                }
				for (var i = 0; i < this.map.graphicsLayerIds.length; i++) {
                    //var layer =this.map.getLayer(this.map.graphicsLayerIds[i])
                    //console.log(layer);
                    //layers.push(layer);
                    //this.map.graphics.clear();
                    this.map.removeLayer(this.map.getLayer(this.map.graphicsLayerIds[i]));
                }
                this.map.graphics.clear();
				html.setStyle(this.showButton, 'display', '');
				html.setStyle(this.downloadButton, 'display', 'none');
				html.setStyle(this.clearButton, 'display', 'none');
				

            },

            downloadCSV: function() {
				
			/* 	
                var data = [
                    ["name1", "city1", "some other info"],
                    ["name2", "city2", "more info"]
                ];
				console.log(data);
                var csvContent = "data:text/csv;charset=utf-8,";
                data.forEach(function(infoArray, index) {

                    dataString = infoArray.join(",");
                    csvContent += index < data.length ? dataString + "\n" : dataString;

                });

                var encodedUri = encodeURI(csvContent);
                var link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "my_data.csv");
                document.body.appendChild(link); // Required for FF

                link.click(); // This will download the data file named "my_data.csv". */
				
				
				var JSONData=localStorage.getItem("potensiDemand");
				var JSONData2=localStorage.getItem("potensiUN");
				
				var ReportTitle='potensiDemand';
				var ReportTitle2='potensiUN';
				var ShowLabel=true;
				
				
				var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
					var CSV = '';    
					//Set Report title in first row or line
					
					CSV += ReportTitle + '\r\n\n';

					//This condition will generate the Label/Header
					if (ShowLabel) {
						var row = "";
						
						//This loop will extract the label from 1st index of on array
						for (var index in arrData[0]) {
							
							//Now convert each value to string and comma-seprated
							row += index + ',';
						}

						row = row.slice(0, -1);
						
						//append Label row with line break
						CSV += row + '\r\n';
					}
					
					//1st loop is to extract each row
					for (var i = 0; i < arrData.length; i++) {
						var row = "";
						
						//2nd loop will extract each column and convert it in string comma-seprated
						for (var index in arrData[i]) {
							row += '"' + arrData[i][index] + '",';
						}

						row.slice(0, row.length - 1);
						
						//add a line break after each row
						CSV += row + '\r\n';
					}

					if (CSV == '') {        
						alert("Invalid data");
						return;
					}   
					
					//Generate a file name
					var fileName = "MyReport_";
					//this will remove the blank-spaces from the title and replace it with an underscore
					fileName += ReportTitle.replace(/ /g,"_")+new Date(); 
					
					
					//Initialize file format you want csv or xls
					var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
					
					// Now the little tricky part.
					// you can use either>> window.open(uri);
					// but this will not work in some browsers
					// or you will not get the correct file extension    
					
					//this trick will generate a temp <a /> tag
					var link = document.createElement("a");    
					link.href = uri;
					
					//set the visibility hidden so it will not effect on your web-layout
					link.style = "visibility:hidden";
					link.download = fileName + ".csv";
					
					//this part will append the anchor tag and remove it after automatic click
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
				
				
				
				
				
				
				
				
				
				
            },
            requestFailed: function(error, io) {
                dojoJson.toJsonIndentStr = " ";
                alert('Terjadi kesalahan');
            }
        });
    });