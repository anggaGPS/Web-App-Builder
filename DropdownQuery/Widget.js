
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
      baseClass: 'jimu-widget-queryrovinsi',
      // clasName: 'esri.widgets.About',

      _hasContent: null,

      postCreate: function() {
   
		
        //this._hasContent = this.config.about && this.config.about.aboutContent;
      },

      startup: function() {
        this.inherited(arguments);
		
		var queryKabupaten=this.kabupatenQuery;
		 var dataset = [];		
		
		
				var stateStore = new Memory({
							idProperty: "abbreviation",
                            data: this.config.urlID
                        });
						
						//console.log(stateStore); 

						this.layerId.store = stateStore;

			
      },
	  
	  
	   provinsiQuery: function(name) {
        //this.inherited(arguments);
		this.provinsi.reset();
		localStorage.clear();		
		for (i = 0; i < this.config.urlID.length; i++) {
			
		if (this.config.urlID[i].name==name){
			var url =this.config.urlID[i].url;
			//console.log(url);
			//console.log('tes');
			
		}
		}
		
		//console.log(url);
		//var url=url;
		
  
		
		
				var dataset = [];	
                queryTask = new QueryTask(url);
                query = new Query();
                query.where = "1=1";
                query.outFields = [this.config.QueryData.field.provinsi];
                query.orderByFields = [this.config.QueryData.field.provinsi];
                query.returnDistinctValues = true;
                var query2 = queryTask.execute(query);
                query2.then(lang.hitch(this,
                    function(response) {
                       
						
                        for (i = 0; i < response.features.length; i++) {
						
							
								  var x = response.features[i].attributes.provinsi ;
						
                            dataset.push('{ "name":"' + x + '"}');
								
							
                         



                        }
                        var arraynew = '{"geometryType": "esriGeometryMultipoint","spatialReference": {"wkid": 102113},"geometries": [{"data":[' + dataset + ']}]}';

                        var data = JSON.parse(arraynew).geometries[0].data;


                        var stateStore = new Memory({
                            data
                        });
						
						//console.log(stateStore);

						this.provinsi.store = stateStore;
						
						//console.log(url);
						
						//queryKabupaten('',url);
						localStorage.setItem("url", url);
								
                    }));

		
      },
	  
	  
	  kabupatenQuery: function(provinsi) {
		  
		  //console.log(this.layerId.store);
		  //console.log(provinsi);
			//console.log(localStorage.getItem("url"));
			
			if (provinsi!=='provinsi'){
				var datasetK = [];	
				queryTask = new QueryTask(localStorage.getItem("url"));
                query = new Query();
                query.where = "provinsi='"+provinsi+"'";
                query.outFields = [this.config.QueryData.field.kab_kota];
                query.orderByFields = [this.config.QueryData.field.kab_kota];
                query.returnDistinctValues = true;
                var query2 = queryTask.execute(query);
                query2.then(lang.hitch(this,
                    function(response) {
                        //console.log(response);
						
						
                        for (i = 0; i < response.features.length; i++) {
						
							
								  var x = response.features[i].attributes.kab_kota ;
						
                            datasetK.push('{ "name":"' + x + '"}');
			

                        }
                        var arraynewK = '{"geometryType": "esriGeometryMultipoint","spatialReference": {"wkid": 102113},"geometries": [{"data":[' + datasetK + ']}]}';

                        var data = JSON.parse(arraynewK).geometries[0].data;


                        var stateStore = new Memory({
                            data
                        });
						
						//console.log(stateStore);

						this.kabupaten.store = stateStore;
						
						
						
						
						
						
					
								
                    }));
		  
		  
			}
		  
		  
	  },
	  
	  
	  showClicked: function() {
		
          
				
				//console.log('sadsad');
				
				},
				
				
				
				
	showLocation: function() {
		this.map.graphics.clear();
				 
				
			
				
				var provinsi = this.provinsi.get('value');
				var kabupaten = this.kabupaten.get('value');
               
				
                queryTask = new QueryTask(localStorage.getItem("url"));
                query = new Query();
                query.where = this.config.QueryData.field.provinsi+"='"+provinsi+"' AND "+this.config.QueryData.field.kab_kota+"='"+kabupaten+"'";
                query.outFields = ["provinsi,kab_kota,nama_perus"];
				query.returnGeometry = true;
                var query1 = queryTask.execute(query);
                query1.then(lang.hitch(this,
                    function(response) {
				
						
						
						// this.map.graphics.add(new Graphic(response.features[x].geometry,markerSymbol));
						
						 
						var geo=response.features[0].geometry;
						
						
						this.map.centerAndZoom(geo,10);
						//this.map.graphics.add(geo);
						
						
							var markerSymbol = new SimpleMarkerSymbol(
													  SimpleMarkerSymbol.STYLE_CIRCLE, 
													  15,
													  new SimpleLineSymbol(
														SimpleLineSymbol.STYLE_SOLID,
														new Color([89,95,35]), 2
													  ),
													  new Color([130,159,83,0.40])
													); 
						
						 //this.map.graphics.add(new Graphic(points[0],markerSymbol));
						 
						 
					 for (var x = 0; x < response.features.length; x++) {
						 
						 //console.log(new Graphic(response.features[x].geometry));
						// this.map.graphics.add(new esri.Graphic(e.mapPoint, sym)).getDojoShape().moveToBack();
						
						this.map.graphics.add(new Graphic(response.features[x].geometry,markerSymbol));
						
						 }
						 
						//this.map.graphics.clear();
					}
					));
				
               

				
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