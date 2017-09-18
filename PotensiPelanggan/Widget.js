define(["dojo",
        'dojo/_base/declare', 'jimu/BaseWidget',
        "esri/Color",
        "dojo/_base/array",
        "esri/geometry/Point",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleFillSymbol",
        "esri/geometry/geometryEngine",
        "esri/graphic",
        "esri/geometry/Multipoint",
		"esri/renderers/Renderer",
		"esri/renderers/HeatmapRenderer",
        'dojo/_base/html',
        'dojo/Deferred', 'dojo/_base/json', 'esri/request', 'esri/tasks/query', 'esri/tasks/QueryTask', 'esri/lang', 'dijit/ProgressBar', 'dojo/_base/lang', 'dojo/dom'
    ],
    function(dojo, declare, BaseWidget, Color, array, Point, SimpleMarkerSymbol, SimpleFillSymbol, geometryEngine, Graphic, Multipoint, Renderer, HeatmapRenderer, html, Deferred, dojoJson, esriRequest, Query, QueryTask, esriLang, ProgressBar, lang, dom) {
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




                html.setStyle(this.progressBar, 'display', 'none');




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
                //this.progressBar;
                var mapid = this.map;
                var loading = this.progressBar;
                html.setStyle(loading, 'display', 'none');
                var self = this,
                    ok = false,
                    btn = this.showButton;
                var Buttons = this.showButton;
                //html.setStyle(loading, 'display','none');
                arrDemand = [];
                arrUN = [];
                var radiusM = dojo.byId("buuferR").value;
                arrExisting = [];
                var queryTask = new QueryTask("http://gis-web.udata.id/gis/rest/services/indigis/Demand_REG_2/MapServer/0");
                var query = new Query();
                query.where = '1=1';
                query.geometry = this.map.extent;
                query.outFields = ["lat", "lng"];
                query.returnGeometry = true;
                var qt = queryTask.execute(query);
                var demand = qt.then(lang.hitch(this,
                    function(response) {
                        //this.progressBar;
                        //var tes= this.progressBar;
                        //html.setStyle(btn, 'display', 'none');
                        html.setStyle(this.progressBar, 'display', '');
                        html.setStyle(this.showButton, 'display', 'none');
                        mapid.graphics.clear();


                        var res = response.features;

                        //console.log(response);
                        var latDemand, lngDemand;
                        if (res.length > 0) {
                            for (var i = 0; i < res.length; i++) {
                                if (res[i].attributes.lat != null || res[i].attributes.lng != null) {
                                    latDemand = res[i].attributes.lat.toString().split(".")[0] + '.' + res[i].attributes.lat.toString().split(".")[1].substring(0, 6);
                                    lngDemand = res[i].attributes.lng.toString().split(".")[0] + '.' + res[i].attributes.lng.toString().split(".")[1].substring(0, 6);
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
                demand.then(function(resDemand) {
                    var queryTask = new QueryTask("http://gis-web.udata.id/gis/rest/services/indigis/pelanggan_un/MapServer/0");
                    var query = new Query();
                    query.where = '1=1';
                    query.geometry = resDemand.aExtent;
                    query.outFields = ["lat", "long"];
                    var qt = queryTask.execute(query);
                    qt.then(lang.hitch(this,
                        function(resUN) {
                            //html.setStyle(this.progressBar, 'display','none');
                            var deferred = new Deferred();
                            var res = resUN.features;
                            var latUN, longUN;


                            if (res.length > 0) {
                                for (var i = 0; i < res.length; i++) {
                                    if (res[i].attributes.lat != null || res[i].attributes.long != null) {
                                        latUN = res[i].attributes.lat.toString().split(".")[0] + '.' + res[i].attributes.lat.toString().split(".")[1].substring(0, 6);
                                        longUN = res[i].attributes.long.toString().split(".")[0] + '.' + res[i].attributes.long.toString().split(".")[1].substring(0, 6);
                                        arrUN.push(longUN + ',' + latUN);
                                    }
                                }
                                resDemand.cUNarr = arrUN;
                                resDemand.cUNlength = arrUN.length;
                                // resDemand.cUNarr = {type:"mazda", model:"500", color:"white"};
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
                                            latitude = res[i].attributes.latitude.toString().split(".")[0] + '.' + res[i].attributes.latitude.toString().split(".")[1].substring(0, 6);
                                            longitude = res[i].attributes.longitude.toString().split(".")[0] + '.' + res[i].attributes.longitude.toString().split(".")[1].substring(0, 6);
                                            arrExisting.push(longitude + ',' + latitude);
                                        }
                                    }
                                    var x = resDemandUN.aDarr;
                                    var y = resDemandUN.cUNarr;

                                    //console.log(x);
                                    //console.log(y);


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

                                    var mpJsony = {
                                        "points": pointy,
                                        "spatialReference": ({
                                            "wkid": 4326
                                        })
                                    };
                                    var multipointy = new Multipoint(mpJsony);

                                    var union = geometryEngine.union([multipointx, multipointy]);




                                    var obj = {};
                                    for (var i = x.length - 1; i >= 0; --i)
                                        obj[x[i]] = x[i];
                                    for (var i = y.length - 1; i >= 0; --i)
                                        obj[y[i]] = y[i];
                                    var res = []
                                    for (var k in obj) {
                                        if (obj.hasOwnProperty(k))
                                            res.push(obj[k]);
                                    }
                                    var z = res;
                                    var b = arrExisting;
                                    for (var i = 0; i < z.length; i++) {
                                        for (var j = 0; j < b.length; j++) {
                                            if (z[i] == b[j]) {
                                                z.splice(i, 1);
                                                b.splice(j, 1);
                                                break;
                                            }
                                        }
                                    }


                                    //console.log(b);



                                    var pointZx = [];


                                    for (var i = 0; i < b.length; i++) {
                                        d = b[i].split(",");
                                        pointZx.push(d.map(Number));
                                    }


                                    /* var points = [[18.38,43.85],[23.32,42.7],[16,45.8],[19.08,47.5],[12.48,41.9],[21.17,42.67],[21.43,42],[19.26,42.44],[26.1,44.43],[12.45,43.93],[20.47,44.82],[17.12,48.15],[14.51,46.06],[12.45,41.9],[106.824408,-6.18355],[106.821606,-6.184767]];
                                    var pointss = [[106.824408,-6.18355],[106.821606,-6.184767]]; */
                                    //console.log(points);
                                    var pointz = [];


                                    for (var i = 0; i < z.length; i++) {
                                        d = z[i].split(",");
                                        pointz.push(d.map(Number));
                                    }



                                    //console.log(pointz);
                                    /* for (i = 0; i < points.length; i++) {
                                        var point=points[i];
                                        var markerSymbol = new SimpleMarkerSymbol();
                                        var graphic = new Graphic(new Point(point), markerSymbol);
                                        mapid.graphics.add(graphic);
                                    } */

                                    //var arraynew ='{"geometryType": "esriGeometryMultipoint","spatialReference": {"wkid": 102113},"geometries": [{"points":['+pointz+']}]}';

                                    var mpJsonz = {
                                        "points": pointZx,
                                        "spatialReference": ({
                                            "wkid": 4326
                                        })
                                    };
                                    var multipointz = new Multipoint(mpJsonz);



									
									
									
									
                                    //geodesicBuffer(geometries, [distance], unit, unionResults);

                                    if (radiusM > 0) {

                                        var bufferedGeometries = geometryEngine.geodesicBuffer(multipointz, [radiusM], "meters", false);
                                        var differ2 = geometryEngine.difference([union], bufferedGeometries);
										var symbol = new SimpleFillSymbol();
										symbol.setColor(new Color([100, 100, 100, 0.25]));
										symbol.setOutline(null);
										mapid.graphics.add(new Graphic(bufferedGeometries, symbol));

                                    } else {

                                        var differ2 = geometryEngine.difference([union], multipointz);
                                    }
									
										
									var markerSymbol = new SimpleMarkerSymbol({
                                            "color": [216,191,216],
                                            "size": 5,
                                          
                                            "xoffset": 0,
                                            "yoffset": 0,
                                            "type": "esriSMS",
                                            "style": "esriSMSCircle",
                                            "outline": {
                                                "color": [255,0,255],
                                                "width": 1,
                                                "type": "esriSLS",
                                                "style": "esriSLSSolid"
                                            }
                                        });	
																
                                    mapid.graphics.add(new Graphic(differ2[0], markerSymbol));
										
																		
									
									
																	
									
									 html.setStyle(loading, 'display', 'none');
                                     html.setStyle(Buttons, 'display', '');

								
                                    dojo.byId("total").innerHTML = "<td>Total Potensi : " + differ2[0].points.length + "</td>";
                               

                                } else {
                                    alert('Data tidak ditemukan');
									html.setStyle(Buttons, 'display', '');
                                }

                            }
                        ));

                    });

                });
                /* function union_arrays (x, y) {
                  var obj = {};
                  for (var i = x.length-1; i >= 0; -- i)
                     obj[x[i]] = x[i];
                  for (var i = y.length-1; i >= 0; -- i)
                     obj[y[i]] = y[i];
                  var res = []
                  for (var k in obj) {
                    if (obj.hasOwnProperty(k))
                      res.push(obj[k]);
                  }
                  return res;
                } */
                //html.setStyle(btn, 'display');

            },
            union_arrays: function(uu, ii) {
                console.log(uu);
            },
            requestSucceeded: function(response, io) {
                dojoJson.toJsonIndentStr = "  ";
                // console.log(dojoJson.toJson(response.features, true));
                // console.log(response.features);
            },
            requestFailed: function(error, io) {
                dojoJson.toJsonIndentStr = " ";
                alert('Terjadi kesalahan');
            }
        });
    });