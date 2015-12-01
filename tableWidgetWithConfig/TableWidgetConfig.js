/**
 * COPYRIGHT 2015 ESRI
 *
 * TRADE SECRETS: ESRI PROPRIETARY AND CONFIDENTIAL
 * Unpublished material - all rights reserved under the
 * Copyright Laws of the United States and applicable international
 * laws, treaties, and conventions.

 * For additional information, contact:
 * Environmental Systems Research Institute, Inc.
 * Attn: Contracts and Legal Services Department
 * 380 New York Street
 * Redlands, California, 92373
 * USA

 * email: contracts@esri.com
 */
define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/store/Memory",
  "dijit/_WidgetBase",
  "dijit/_TemplatedMixin",
  "dijit/_WidgetsInTemplateMixin",
  "esri/opsdashboard/WidgetConfigurationProxy",
  "dojo/text!./TableWidgetConfigTemplate.html",
  "dojox/form/CheckedMultiSelect"
], function (declare, lang, Memory, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, WidgetConfigurationProxy, templateString) {

  return declare("TableWidgetConfig", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, WidgetConfigurationProxy], {
    templateString: templateString,

    postCreate: function () {
      this.inherited(arguments);
      this.multiSelectDiv.set("labelAttr", "alias");
      this.multiSelectDiv.set("multiple", true);
    },

    dataSourceSelectionChanged: function (dataSource, dataSourceConfig) {

      this.dataSourceConfig = dataSourceConfig;

      var alphaNumericFields = [];
      dataSource.fields.forEach(function (field) {
        switch (field.type) {
          case "esriFieldTypeString":
          case "esriFieldTypeSmallInteger":
          case "esriFieldTypeInteger":
          case "esriFieldTypeSingle":
          case "esriFieldTypeDouble":
            alphaNumericFields.push(field);
            return;
        }
      });

      var alphaNumericFieldsStore = new Memory({
        idProperty: "name",
        data: alphaNumericFields
      });

      this.multiSelectDiv.set("store", alphaNumericFieldsStore);

      // Set previous fields saved in config
      if (Array.isArray(dataSourceConfig.selectedFieldsNames))
        this.multiSelectDiv.set("value", dataSourceConfig.selectedFieldsNames);
    },

    onSelectionChanged: function (value) {
      if (!this.dataSourceConfig)
        return;

      this.dataSourceConfig.selectedFieldsNames = value;
      this.readyToPersistConfig(Array.isArray(value) && value.length > 0);
    }
  });
});
















