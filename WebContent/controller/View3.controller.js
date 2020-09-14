sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/core/Fragment',
], function (Controller,Fragment) {
	"use strict";

	return Controller.extend("Ztest.Ztest.controller.View3", {
		onInit: function () {
		
			 var that = this;
			 var sServiceUrl   = this.getServiceUrl();
			 var oModel        = new sap.ui.model.odata.ODataModel(sServiceUrl, true);
			 var oFilter = [];
			
			 oFilter.push(new sap.ui.model.Filter('Ebeln', sap.ui.model.FilterOperator.EQ, '2000000' ));

			 oModel.read('/EtZekkoSet', {filters: oFilter ,
			success: function(data) {
				 console.log('success');
				 var oJModel = new sap.ui.model.json.JSONModel();
				 oJModel.setData({EtZekkoSet: data.results});
				 var oTable = that.getView().byId("idMTable");
				 oTable.setModel(oJModel);	
				 sap.ui.getCore().setModel(oJModel, "globalModel");
				 },
				 error : function(event) {
				 console.log('error');
				 },
				 });
		},
		handleIconTabBarSelect : function(oEvent){
			var view = this;
			var tabBar = view.getView().byId("idIconTabBarMulti");
			if (tabBar.mProperties.selectedKey == "back"){
				var oRouter= sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("View1");
			}else if (tabBar.mProperties.selectedKey == "cart"){
				var oRouter= sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("View3");
			}

			},
		show:function(){
			var oRouter= sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("ViewTest",true)
		},
		getServiceUrl : function() {

			var sUrl;
			var sPath = "/sap/opu/odata/sap/ZUI5PURCHASE_ORDERS_SRV";
			sUrl = sPath;
			return sUrl; 
			},
			onPress: function (oEvent) {
				var ebeln = oEvent.oSource.mAggregations.cells[0].mProperties.text;
				var oItem = oEvent.getSource();
				var oRouter= sap.ui.core.UIComponent.getRouterFor(this);
				window.globalVariable=ebeln;
				oRouter.navTo("View4");	
				},
				
			
			
			
			
	});
});