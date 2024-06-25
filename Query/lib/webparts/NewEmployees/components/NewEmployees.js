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
var NewEmployees_module_scss_1 = require("./NewEmployees.module.scss");
var sp_http_1 = require("@microsoft/sp-http");
var Button_1 = require("office-ui-fabric-react/lib/Button");
var Dialog_1 = require("office-ui-fabric-react/lib/Dialog");
var FileUpload = (function (_super) {
    __extends(FileUpload, _super);
    function FileUpload(props) {
        var _this = _super.call(this, props) || this;
        _this.close = function () { return _this.setState({ isOpen: false }); };
        _this.close2 = function () { return _this.setState({ isOpenSecond: false }); };
        _this.displayForm = function () { return _this.setState({ isOpen: true }); };
        _this.state = {
            messages: [],
            isOpen: false,
            isOpenSecond: false,
        };
        console.log("name", _this.props.context.pageContext.user.loginName);
        _this.open = _this.open.bind(_this);
        _this.close = _this.close.bind(_this);
        _this.sendMessage = _this.sendMessage.bind(_this);
        return _this;
    }
    FileUpload.prototype.sendMessage = function () {
        var _this = this;
        var bodyElem = document.getElementById('popupMsgContent');
        var body_ = bodyElem.value;
        if (body_ == "") {
            document.getElementById('errorMsg').style.display = "block";
            setTimeout(function () { return document.getElementById('errorMsg').style.display = "none"; }, 2000);
        }
        else {
            var current = this.props.lists;
            var url = this.props.context.pageContext.web.absoluteUrl + "/_api/web/lists('" + current + "')/Items";
            var myHeaders = {
                'Accept': 'application/json;odata=nometadata',
                'Content-type': 'application/json;odata=verbose',
                'odata-version': ''
            };
            var body = JSON.stringify({
                '__metadata': {
                    'type': 'SP.Data.' + this.props.listName + 'ListItem'
                },
                //"Title": title_,
                "Title": body_,
            });
            this.props.spHttpClient.post(url, sp_http_1.SPHttpClient.configurations.v1, {
                headers: myHeaders,
                body: body
            })
                .then(function (response) {
                console.log("sendMessage response", response);
                _this.close();
                _this.open2();
                setTimeout(function () { return _this.close2(); }, 3000);
            });
        }
    };
    FileUpload.prototype.open = function () {
        console.log("open", this.state.isOpen);
        this.setState({ isOpen: true });
    };
    FileUpload.prototype.open2 = function () {
        this.setState({ isOpenSecond: true });
    };
    FileUpload.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: NewEmployees_module_scss_1.default.questionComponent, id: "questionComponentId" },
                React.createElement("img", { style: { height: this.props.iconSize + "px" }, src: this.props.icon, alt: "", onClick: function (e) { return _this.displayForm(); } }),
                React.createElement("button", { id: 'questionButton', style: { color: this.props.linkColor, fontSize: this.props.fontSize + "px" }, className: NewEmployees_module_scss_1.default.LinkButton, onClick: function (e) { return _this.displayForm(); } },
                    "  ",
                    this.props.linkTitle)),
            React.createElement(Dialog_1.Dialog, { isOpen: this.state.isOpenSecond, type: Dialog_1.DialogType.close, onDismiss: this.close2, isBlocking: false, closeButtonAriaLabel: 'Close' },
                React.createElement(Dialog_1.DialogContent, null, "\u05D4\u05E9\u05D0\u05DC\u05D4 \u05E0\u05E9\u05DC\u05D7\u05D4 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4!"),
                React.createElement(Dialog_1.DialogFooter, null)),
            React.createElement(Dialog_1.Dialog, { isOpen: this.state.isOpen, type: Dialog_1.DialogType.close, onDismiss: this.close.bind(this), isBlocking: false, closeButtonAriaLabel: 'Close' },
                React.createElement("div", { id: "popupContent ", className: 'text-center' },
                    React.createElement("div", { className: "popUpTitle", style: { fontWeight: "bold" } }, this.props.dialogTitle),
                    React.createElement("br", null),
                    React.createElement("div", { className: "" },
                        React.createElement("label", { style: { width: "10%" } }, "\u05EA\u05D5\u05DB\u05DF: "),
                        React.createElement("br", null),
                        React.createElement("div", { className: "popupMsgContent" },
                            React.createElement("textarea", { id: 'popupMsgContent', style: { width: "97%", height: "100px", margin: "7px 0px" } })),
                        React.createElement("small", { id: "errorMsg", className: NewEmployees_module_scss_1.default.error }, "\u05D9\u05E9 \u05DC\u05D4\u05D6\u05D9\u05DF \u05E9\u05D0\u05DC\u05D4"))),
                React.createElement(Dialog_1.DialogFooter, null,
                    React.createElement(Button_1.PrimaryButton, { style: { marginLeft: '28% !important' }, onClick: this.sendMessage }, "שלח")))));
    };
    return FileUpload;
}(React.Component));
exports.default = FileUpload;

//# sourceMappingURL=NewEmployees.js.map
