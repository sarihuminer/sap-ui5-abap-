sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("Ztest.Ztest.controller.View1", {
		onInit: function () {
			this.PurchaseOrders();
			this.getUsers();
			
		},
		handleIconTabBarSelect : function(oEvent){
			var view = this;
			var tabBar = view.getView().byId("idIconTabBarMulti");
			if (tabBar.mProperties.selectedKey == "continue"){
				var oEntry = {
						Ebeln:   this.getView().byId("inputEbeln"),
						Category:this.getView().byId("cmboxCategories")
					};
				window.data=oEntry;
				var oRouter= sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("View2");
			}else if (tabBar.mProperties.selectedKey == "cart"){
				var oRouter= sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("View3");
			}

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
		
		//oFilter.push(new sap.ui.model.Filter('IvEbeln',sap.ui.model.FilterOperator.EQ,'0000000001'));
		
		oModel.read("/EtCategoriesSet", {filters: oFilter ,
			 success: function(data) {
				 console.log(data.results);
				 var oJModel = new
				 sap.ui.model.json.JSONModel();

				 oJModel.setData({Categories: data.results});
			console.log('success');
			var input=that.getView().byId("cmboxCategories");
			input.setModel(oJModel);
			 },
			 error : function(event) {
			 console.log('error');
			 }
			 });
	}	,
	getUsers:function(){
		var that = this;
		var sServiceUrl = this.getServiceUrl();
		var oModel = new
		sap.ui.model.odata.ODataModel(sServiceUrl,
		true);
		var oFilter = [];
		
		//oFilter.push(new sap.ui.model.Filter('IvEbeln',sap.ui.model.FilterOperator.EQ,'0000000001'));
		
		oModel.read("/EtUsersSet", {filters: oFilter ,
			 success: function(data) {
				 console.log(data.results);
				 var oJModel = new sap.ui.model.json.JSONModel();
				 oJModel.setData({Users: data.results});
			var input=that.getView().byId("cmboxUsers");
			input.setModel(oJModel);
			 },
			 error : function(event) {
			 console.log('error');
			 }
			 });
	}	,
		items:function(){
		
		}	,
	});
});