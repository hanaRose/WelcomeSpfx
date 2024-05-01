import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneSlider,
  PropertyPaneLabel,
  PropertyPaneToggle,
  PropertyPaneChoiceGroup
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";

import * as strings from "VideoBackgroundWebPartStrings";
import VideoBackground from "./components/VideoBackground";
import { IVideoBackgroundProps } from "./components/IVideoBackgroundProps";
import {
  PropertyFieldFilePicker,
  IPropertyFieldFilePickerProps,
  IFilePickerResult,

} from "@pnp/spfx-property-controls/lib/PropertyFieldFilePicker";
import {
  PropertyFieldColorPicker,
  PropertyFieldColorPickerStyle,
} from "@pnp/spfx-property-controls/lib/PropertyFieldColorPicker";
import PropertyFieldDropdownHost from "@pnp/spfx-property-controls/lib/propertyFields/dropdownWithCallout/PropertyFieldDropdownWithCalloutHost";

export interface IVideoBackgroundWebPartProps {
  wpTitle: string;
  videoUrl: string;
  isDisplayWelcome:boolean;
  filePickerResult: IFilePickerResult;
  titleColor: string;
  textColor: string;
  titleFontSize: string;
  textFontSize: string;
  brightness: number;
  titleHeight: number;
  textHeight:number;
  height: number;
  side:string;
}

export default class VideoBackgroundWebPart extends BaseClientSideWebPart<IVideoBackgroundWebPartProps> {
  

  public render(): void {
    const element: React.ReactElement<IVideoBackgroundProps> = React.createElement(
      VideoBackground,
      {
        wpTitle: this.properties.wpTitle,
        isDisplayWelcome:this.properties.isDisplayWelcome,
        videoUrl: this.properties.videoUrl,
        titleColor:this.properties.titleColor,
        textColor: this.properties.textColor,
        titleFontSize:this.properties.titleFontSize,
        textFontSize: this.properties.textFontSize,
        brightness: this.properties.brightness,
        titleHeight: this.properties.titleHeight,
        textHeight: this.properties.textHeight,
        height: this.properties.height,
        side: this.properties.side,
        userDisplayName: this.context.pageContext.user.displayName,
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          displayGroupsAsAccordion: true,
          groups: [
            {
              groupName: strings.BasicGroupName,
              isCollapsed: true,
              groupFields: [
                PropertyFieldFilePicker("filePicker", {
                  context: this.context,
                  filePickerResult: this.properties.filePickerResult,
                  onPropertyChange: () => {
                    this.onPropertyPaneFieldChanged.bind(this);
                    this.render();
                  },
                  properties: this.properties,
                  onSave: (e: IFilePickerResult) => {
                    this.properties.videoUrl = e.fileAbsoluteUrl;
                    this.render();

                  },
                  onChanged: (e: IFilePickerResult) => {
                    this.properties.videoUrl = e.fileAbsoluteUrl;
                    this.render();

                  },
                  key: "filePickerId",
                  buttonLabel: strings.selectVideo,
                  label: "",
                  accepts: [".mp4", ".vmw", ".avi"],
                  buttonIcon: "VideoSolid",
                }),
                PropertyPaneLabel("videoLabel", {
                  text: this.properties.videoUrl
                }),
                PropertyPaneChoiceGroup("side", {
                  label: "Text align",
                  options: [
                    { key: "left", text: "left" },
                    { key: "center", text: "center" },
                    { key: "right", text: "right" }
                  ]
                }),
              
                PropertyPaneSlider("brightness", {
                  min: 10,
                  max: 100,
                  step: 10,
                  value: 50,
                  label: strings.selectBrightness,
                  showValue: true,
                }),
                PropertyPaneSlider("height", {
                  min: 200,
                  max: 500,
                  step: 1,
                  value: 300,
                  label:  strings.selectHeight,
                  showValue: true,
                })
              
              ],
            },
            {
             
              groupName: "Welcome Message Properties:",
              isCollapsed: true,
              groupFields: [
                PropertyPaneToggle('isDisplayWelcome', {
                  key: 'isDisplayWelcome',
                  label: 'Is display welcome message',
                  checked: true,
                  onText: "yes",
                  offText: "no",
                }),
                PropertyFieldColorPicker("titleColor", {
                  label: strings.selectColor,
                  selectedColor: this.properties.titleColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: "Precipitation",
                  key: "colorFieldId",
                }),
                PropertyPaneTextField("titleFontSize", {
                  label: "font size",
                }),
                PropertyPaneSlider("titleHeight", {
                  min: 200,
                  max: 500,
                  step: 1,
                  value: 300,
                  label:  strings.selectHeight,
                  showValue: true,
                }),
                
             
              ],
            },


            {
             
              groupName: "Title Properties:",
              isCollapsed: true,
              groupFields: [
                PropertyPaneTextField("wpTitle", {
                  label: strings.wpTitleLabel,
                }),
            
                PropertyFieldColorPicker("textColor", {
                  label: strings.selectColor,
                  selectedColor: this.properties.textColor,
                  onPropertyChange: this.onPropertyPaneFieldChanged,
                  properties: this.properties,
                  disabled: false,
                  isHidden: false,
                  alphaSliderHidden: false,
                  style: PropertyFieldColorPickerStyle.Full,
                  iconName: "Precipitation",
                  key: "colorFieldId",
                }),
                PropertyPaneTextField("textFontSize", {
                  label: "font size",
                }),
                PropertyPaneSlider("textHeight", {
                  min: 200,
                  max: 500,
                  step: 1,
                  value: 300,
                  label:  strings.selectHeight,
                  showValue: true,
                })
               
              ],
            },






          ],
        },
      ],
    };
  }
}
