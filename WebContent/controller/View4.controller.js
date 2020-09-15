sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/core/Fragment',
	"sap/m/MessageToast",
	"sap/m/MessageBox",
	"sap/ui/model/Sorter",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/ui/model/FilterType",
	"sap/ui/model/json/JSONModel"
], function (Controller,Fragment, MessageToast, MessageBox, Sorter, Filter, FilterOperator, FilterType, JSONModel) {
	"use strict";

	return Controller.extend("Ztest.Ztest.controller.View4", {
		onInit: function () {
				},
				onBeforeRendering: function(){
					this.PurchaseOrders();
					},
			
					onPress : function(){
						var oRouter= sap.ui.core.UIComponent.getRouterFor(this);
						oRouter.navTo("View3",true);
					},
				getServiceUrl : function() {
					var sUrl;
					var sPath
					= "/sap/opu/odata/sap/ZUI5PURCHASE_ORDERS_SRV/";
					sUrl = sPath;
					return sUrl;
					},
				PurchaseOrders:function(){
					var that = this;
					var sServiceUrl = this.getServiceUrl();
					var oModel = new
					sap.ui.model.odata.ODataModel(sServiceUrl,
					true);
					var oFilter = [];
					oFilter.push(new sap.ui.model.Filter("IvEbeln", sap.ui.model.FilterOperator.EQ, window.globalVariable));
					oModel.read("/EtOrderesSet", {filters: oFilter ,
						success: function(data) {
							 console.log('success');
							 var oJModel = new sap.ui.model.json.JSONModel();
							 oJModel.setData({EtzekpoSet: data.results});
							var oTable = that.getView().byId("table1");
							 oTable.setModel(oJModel);	
							 //sap.ui.getCore().setModel(oJModel, "globalModel");
							 },
							 error : function(event) {
							 console.log('error');
							 },
							 });
			}	,
				
			//-----------------------------מחיקת שורות נבחרות
			
			deleteSelectedIndices: function(evt) {
			
			var aIndices = this.byId("table1").getSelectedIndices();
			
			var oTable = this.getView().byId("table1");
			var rows=oTable.getRows();
			var i;
			var sMsg;
			if (aIndices.length < 1) {
				sMsg = "no item selected";
			} else {
				sMsg = aIndices;
					for (i = 0; i < aIndices.length; i++) {
					var oThisObj=rows[aIndices[i]];
					var cells=oThisObj.getCells();				
			this.lineDelete(cells[0].mProperties.text,cells[1].mProperties.text,i);
	         }
			}
			MessageToast.show(sMsg);
		},

		//--------------------------עדכון טבלה
		
	
		UpdateTable: function(evt) {
		alert("update");
		var aIndices = this.byId("table1").getSelectedIndices();
		var oTable = this.getView().byId("table1");
		var rows=oTable.getRows();
		var i;	
		var sMsgUpdate; 
		if (aIndices.length < 1) {
			sMsgUpdate = "no item selected";
		} else {
			sMsgUpdate  = aIndices;
				for (i = 0; i < aIndices.length; i++) {
				var oThisObj=rows[aIndices[i]];
				var cells=oThisObj.getCells();				
				var that = this;	
				this.lineUpdate(cells[0].mProperties.text,cells[1].mProperties.text,cells[2].mProperties.value,cells[3].mProperties.value,cells[4].mProperties.value);	        
				//this.lineUpdate(1,2,3,4,5)
				}
		MessageToast.show(sMsgUpdate );
	         }	
		},		
	//-------------------------------------ביטול בחירת שורות	

		clearSelection: function(evt) {
			this.byId("table1").clearSelection();
		},
		
//		---------------------------------------עדכון שורה
		lineUpdate : function(ebeln,ebelp,name,price,amount) {

		  var that = this;
		  var sServiceUrl   = '/sap/opu/odata/sap/ZUI5PURCHASE_ORDERS_SRV';
		  var oModel        = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
		  var oFilter = [];
		  oFilter.push(new sap.ui.model.Filter('IvEbeln', sap.ui.model.FilterOperator.EQ,ebeln ));
		  oFilter.push(new sap.ui.model.Filter('IvEbelp', sap.ui.model.FilterOperator.EQ,ebelp ));
		  oFilter.push(new sap.ui.model.Filter('IvName',  sap.ui.model.FilterOperator.EQ, name ));
          oFilter.push(new sap.ui.model.Filter('IvPrice', sap.ui.model.FilterOperator.EQ,price ));
          oFilter.push(new sap.ui.model.Filter('IvAmount',sap.ui.model.FilterOperator.EQ,amount));       
          oModel.read('/zupdateSet', {filters: oFilter ,
        	  success: function(data) {
        		  alert("suc"); 
        	  },
		      error : function(event) {
		    	  alert('error');
		    }        	
     });	
	},
		//--------------------------------------מחיקת שורה
		lineDelete: function(ebeln,ebelp,i){
			alert("enter delete");

		    var that = this;
			var sServiceUrl   = '/sap/opu/odata/sap/ZUI5PURCHASE_ORDERS_SRV';
			var oModel = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
			/*var oFilter = [];
			 oFilter.push(new sap.ui.model.Filter("IvEbeln", sap.ui.model.FilterOperator.EQ,ebeln));
			 oFilter.push(new sap.ui.model.Filter("IvEbelp", sap.ui.model.FilterOperator.EQ,ebelp));*/
			var readUrl ="/EtDeleteLineSet('"+ebeln+"','"+ebelp+"')";
			oModel.read(readUrl,{ 
				success: function(data) { 
					alert("sucses delete");
					 },
				 error : function(event) {
				 alert('error');
				 }
			}    );
			  
		},
		
	});
});