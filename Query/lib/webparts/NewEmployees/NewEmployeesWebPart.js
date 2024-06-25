"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDom = require("react-dom");
var sp_core_library_1 = require("@microsoft/sp-core-library");
var sp_webpart_base_1 = require("@microsoft/sp-webpart-base");
var sp_http_1 = require("@microsoft/sp-http");
var strings = require("MessageAlertWebPartStrings");
var NewEmployees_1 = require("./components/NewEmployees");
var loader = require("@microsoft/sp-loader");
var PropertyFieldListPicker_1 = require("../../PropertyFieldListPicker");
require("./filepicker.css");
require("./dropzone.css");
var NewEmployeesWebPart = (function (_super) {
    __extends(NewEmployeesWebPart, _super);
    function NewEmployeesWebPart(context) {
        var _this = _super.call(this) || this;
        _this.digest = "";
        loader.SPComponentLoader.loadCss('https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css');
        return _this;
    }
    NewEmployeesWebPart.prototype.onInit = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var digestCache = _this.context.serviceScope.consume(sp_http_1.DigestCache.serviceKey);
            digestCache.fetchDigest(_this.context.pageContext.web.serverRelativeUrl).then(function (digest) {
                // use the digest here
                _this.digest = digest;
                resolve();
            });
        });
    };
    NewEmployeesWebPart.prototype.render = function () {
        console.log("parent this.context", this.context);
        var element = React.createElement(NewEmployees_1.default, {
            spHttpClient: this.context.spHttpClient,
            digest: this.digest,
            context: this.context,
            listName: this.properties.listName,
            linkTitle: this.properties.linkTitle,
            linkColor: this.properties.linkColor,
            dialogTitle: this.properties.dialogTitle,
            iconSize: this.properties.iconSize,
            fontSize: this.properties.fontSize,
            icon: this.properties.icon,
            lists: this.properties.lists,
        });
        ReactDom.render(element, this.domElement);
    };
    Object.defineProperty(NewEmployeesWebPart.prototype, "dataVersion", {
        get: function () {
            return sp_core_library_1.Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    NewEmployeesWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                sp_webpart_base_1.PropertyPaneTextField('listName', {
                                    label: 'שם פנימי לרשימת אחסון הנתונים',
                                }),
                                sp_webpart_base_1.PropertyPaneTextField('linkTitle', {
                                    label: 'כותרת הלינק',
                                }),
                                sp_webpart_base_1.PropertyPaneTextField('linkColor', {
                                    label: 'צבע טקסט הלינק',
                                }),
                                sp_webpart_base_1.PropertyPaneTextField('dialogTitle', {
                                    label: 'כותרת הדיאלוג',
                                }),
                                sp_webpart_base_1.PropertyPaneTextField('icon', {
                                    label: 'אייקון',
                                }),
                                sp_webpart_base_1.PropertyPaneTextField('fontSize', {
                                    label: 'גודל הפונט',
                                }),
                                sp_webpart_base_1.PropertyPaneTextField('iconSize', {
                                    label: 'גודל האייקון',
                                }),
                                PropertyFieldListPicker_1.PropertyFieldListPicker('lists', {
                                    label: 'רשימה לאחסון השאלות',
                                    selectedList: this.properties.lists,
                                    includeHidden: false,
                                    orderBy: PropertyFieldListPicker_1.PropertyFieldListPickerOrderBy.Title,
                                    disabled: false,
                                    onPropertyChange: this.onPropertyPaneFieldChanged.bind(this),
                                    properties: this.properties,
                                    context: this.context,
                                    onGetErrorMessage: null,
                                    deferredValidationTime: 0,
                                    key: 'listPickerFieldId'
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return NewEmployeesWebPart;
}(sp_webpart_base_1.BaseClientSideWebPart));
exports.default = NewEmployeesWebPart;

//# sourceMappingURL=NewEmployeesWebPart.js.map
