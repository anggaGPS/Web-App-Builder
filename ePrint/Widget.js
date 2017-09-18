	var attributes=[];
		var array = [];

define([
    'dojo/_base/declare',
    'jimu/BaseWidget',
    'jimu/portalUtils',
    'dojo/_base/lang',
    'dojo/Deferred',
	'dojo/store/Memory',
    "jimu/dijit/Message",
    'jimu/dijit/LoadingShelter',
    './Print',
    "esri/request",
	"esri/tasks/QueryTask",
  "esri/tasks/query",
    'jimu/portalUrlUtils'
  ],
  function(
    declare, BaseWidget, portalUtils, lang, Deferred, Memory,
    Message, LoadingShelter, Print, esriRequest, QueryTask, Query,
    portalUrlUtils
  ) {
    return declare([BaseWidget], {
      baseClass: 'jimu-widget-print',
      name: 'Print',
      className: 'esri.widgets.Print',
      _portalPrintTaskURL: null,
deferredUpdateMaintenance: null,
      postCreate: function() {
        this.inherited(arguments);

        this.shelter = new LoadingShelter({
          hidden: true
        });
        this.shelter.placeAt(this.domNode);
        this.shelter.startup();
      },

      startup: function() {
        this.inherited(arguments);
        this.shelter.show();
        this._initPrinter();
		
		
			
      },

      _initPrinter: function() {
		  
	
	
  //initialize query
			
            //assetNo.set('store', dataStore);
		
		
		
		
        this._getPrintTaskURL(this.appConfig.portalUrl)
          .then(lang.hitch(this, function(printServiceUrl) {
            this.shelter.show();
            var asyncDef = this.isAsync(printServiceUrl);
			
			//  var nilai_form=document.getElementById("attachmentsInfo").value;
		//console.log(nilai_form);
            asyncDef.then(lang.hitch(this, function(async,array) {	
			
			
              this.print = new Print({
				  
                map: this.map,
                appConfig: this.appConfig,
                printTaskURL: printServiceUrl,	
                defaultAuthor: this.config.defaultAuthor,
                defaultCopyright: this.config.defaultCopyright,
                defaultTitle: this.config.defaultTitle,
                defaultFormat: this.config.defaultFormat,
                defaultLayout: this.config.defaultLayout,
				defaultAttURL: this.config.defaultAttURL,
                nls: this.nls,
                async: async
              });
			  
              this.print.placeAt(this.printNode);
              this.print.startup();
            }), lang.hitch(this, function(err) {
              new Message({
                message: err.message
              });
            })).always(lang.hitch(this, function() {
              this.shelter.hide();
            }));
          }), lang.hitch(this, function(err) {
            new Message({
              message: err
            });
            console.error(err);
            this.shelter.hide();
          }));
		    
      },


      _getPrintTaskURL: function(portalUrl) {
        var printDef = new Deferred();
        if (this.config && this.config.serviceURL) {
          printDef.resolve(this.config.serviceURL);
          return printDef;
        }
        var def = portalUtils.getPortalSelfInfo(portalUrl);
        def.then(lang.hitch(this, function(response) {
          var printServiceUrl = response && response.helperServices &&
            response.helperServices.printTask && response.helperServices.printTask.url;
          if (printServiceUrl) {
            printDef.resolve(printServiceUrl);
          } else {
            printDef.reject('error');
          }
        }), lang.hitch(this, function(err) {
          new Message({
            message: this.nls.portalConnectionError
          });
          printDef.reject('error');
          console.error(err);
        }));

        return printDef;
      },

      isAsync: function(serviceURL) {
        var def = new Deferred();
        // portal own print url: portalname/arcgis/sharing/tools/newPrint
        var serviceUrl = portalUrlUtils.setHttpProtocol(serviceURL);
        var portalNewPrintUrl = portalUrlUtils.getNewPrintUrl(this.appConfig.portalUrl);

        if (serviceUrl === portalNewPrintUrl ||
          /sharing\/tools\/newPrint$/.test(serviceUrl)) {
          def.resolve(false);
        } else {
          esriRequest({
            url: serviceURL,
            content: {
              f: "json"
            },
            callbackParamName: "callback",
            handleAs: "json",
            timeout: 60000,
            load: lang.hitch(this, function(response) {
              if (response.executionType === "esriExecutionTypeAsynchronous") {
                def.resolve(true);
              } else {
                def.resolve(false);
              }
            }),
            error: lang.hitch(this, function(err) {
              def.reject(err);
            })
          });
        }

        return def;
      },

      onSignIn: function(user) {
        user = user || {};
        if (user.userId && this.print) {
          this.print.updateAuthor(user.userId);
        }
      }
    });
  });