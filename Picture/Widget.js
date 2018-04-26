
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
		"esri/request",
        "esri/TimeExtent",
        'dijit/_WidgetsInTemplateMixin',
        "dojo/store/Memory",
		"dijit/form/ValidationTextBox",
        'dijit/form/ComboBox',
		"dojo/request",
		"dojo/on",
		'dojo/dom',
		"dojo/html",
        "dijit/form/DateTextBox",	
        "dijit/form/TimeTextBox",
        "dijit/form/Button",
        "dojo/parser",
       
        "dojo/domReady!"
    ],
    function(dojo, declare, BaseWidget, WidgetManager, PanelManager, Deferred, html, locale, Color, Point, webMercatorUtils, Delete, Graphic, FeatureLayer, Map, esriLang, Query, QueryTask, lang, SimpleRenderer, TemporalRenderer,
        TimeClassBreaksAger, SimpleLineSymbol, SimpleMarkerSymbol, esriRequest, TimeExtent, _WidgetsInTemplateMixin, Memory, ValidationTextBox, ComboBox, request, on, dom, html) {
        //To create a widget, you need to derive from BaseWidget.
        var clazz = declare([BaseWidget, _WidgetsInTemplateMixin], {
      baseClass: 'jimu-widget-queryrovinsi',
      // clasName: 'esri.widgets.About',

      _hasContent: null,

      postCreate: function() {
   
		
        //this._hasContent = this.config.about && this.config.about.aboutContent;
      },

      startup: function(x) {
        this.inherited(arguments);
		// html.setStyle(this.downloadButton, 'display', 'none');
		// html.setStyle(this.kondisiform, 'display', 'none');
			
			
			
		
		on(this.map, "click", lang.hitch(this, function(event) {
			// console.log(this.map._layers);
			var token= this.map._layers.PJU_186.credential.token;
			
	
					//console.log(event.graphic.attributes);
					//console.log(event.graphic);
					
			var arrT=Object.keys(event.graphic.attributes).length;		
			//console.log(arrT);
					   
			var imgArr=[];   
			if (arrT==17){		   
				var layerUrl = "https://services8.arcgis.com/pfDd0IOlZHPfcYrm/ArcGIS/rest/services/Panel/FeatureServer/0/queryAttachments?objectIds="+event.graphic.attributes.objectid+"&globalIds=&definitionExpression=&attachmentTypes=&size=&keywords=&resultOffset=&resultRecordCount=";
			  var layersRequest = esriRequest({
				url: layerUrl,
				content: { f: "json" },
				handleAs: "json",
				callbackParamName: "callback"
			  });
			  layersRequest.then(
				function(response) {
				 //console.log(token);
				  
				  for (i = 0; i < response.attachmentGroups[0].attachmentInfos.length; i++) { 
				//console.log(response.attachmentGroups[0].attachmentInfos[i].id);
				
				  
				 var img="<img src='https://services8.arcgis.com/pfDd0IOlZHPfcYrm/ArcGIS/rest/services/Panel/FeatureServer/0/"+event.graphic.attributes.objectid+"/attachments/"+response.attachmentGroups[0].attachmentInfos[i].id+"?token="+token+"'style='width:200px;height:200px;'>";
				 
				//console.log(img);
				
				  imgArr.push(img);
				
				}
				
				//console.log(imgArr.toString());
				var imgDis=imgArr.toString();
				   html.set(dom.byId("content"),imgDis);
				  
				  
			  }, function(error) {
				  console.log("Error: ", error.message);
			  });
						
				//console.log(imgArr);		
					
						
				}
				
				if (arrT==21){		   
				var layerUrl = "https://services8.arcgis.com/pfDd0IOlZHPfcYrm/ArcGIS/rest/services/PJU/FeatureServer/0/queryAttachments?objectIds="+event.graphic.attributes.objectid+"&globalIds=&definitionExpression=&attachmentTypes=&size=&keywords=&resultOffset=&resultRecordCount=";
			  var layersRequest = esriRequest({
				url: layerUrl,
				content: { f: "json" },
				handleAs: "json",
				callbackParamName: "callback"
			  });
			  layersRequest.then(
				function(response) {
				 //console.log(token);
				  
				  for (i = 0; i < response.attachmentGroups[0].attachmentInfos.length; i++) { 
				//console.log(response.attachmentGroups[0].attachmentInfos[i].id);
				
				  
				 var img="<img src='https://services8.arcgis.com/pfDd0IOlZHPfcYrm/ArcGIS/rest/services/PJU/FeatureServer/0/"+event.graphic.attributes.objectid+"/attachments/"+response.attachmentGroups[0].attachmentInfos[i].id+"?token="+token+"'  style='width:200px;height:200px;'>";
				 
				//console.log(img);
				
				  imgArr.push(img);
				
				}
				
				//console.log(imgArr.toString());
				var imgDis=imgArr.toString();
				   html.set(dom.byId("content"),imgDis);
				  
				  
			  }, function(error) {
				  console.log("Error: ", error.message);
			  });
						
				//console.log(imgArr);		
					
						
				}
			}
			));
			
		

			
      },
	  
	  
	 
	  
	 
	  
	  showClicked: function() {
		
          
								
	

				}
    });
    return clazz;
  });