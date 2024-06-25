import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle,
  PropertyPaneLabel,
  IWebPartContext
} from '@microsoft/sp-webpart-base';
import { IDigestCache, DigestCache } from '@microsoft/sp-http';
import * as strings from 'MessageAlertWebPartStrings';
import FileUpload from './components/NewEmployees';
import { IFileUploadProps } from './components/INewEmployeesProps';
import * as loader from '@microsoft/sp-loader';
import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '../../PropertyFieldListPicker';
import { PropertyPaneDropdown } from '@microsoft/sp-webpart-base/lib/propertyPane/propertyPaneFields/propertyPaneDropdown/PropertyPaneDropdown';
import { Lists } from 'sp-pnp-js';
// import { PropertyFieldListPicker, PropertyFieldListPickerOrderBy } from '@pnp/spfx-property-controls/lib/PropertyFieldListPicker';
export interface INewEmployeesWebPartProps {

  listName:string;
  linkTitle: string;
  linkColor:string;
  dialogTitle:string;
  icon:string;
  fontSize:string;
  iconSize:string;
  lists: string | string[]; // Stores the list ID(s)

 
}
require("./filepicker.css");
require("./dropzone.css");
export default class NewEmployeesWebPart extends BaseClientSideWebPart<INewEmployeesWebPartProps> {
  public digest: string = "";
  public constructor(context: IWebPartContext) {
    super();
    loader.SPComponentLoader.loadCss('https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css');
  }
  protected onInit(): Promise<void> {
    return new Promise<void>((resolve: () => void, reject: (error: any) => void): void => {
      const digestCache: IDigestCache = this.context.serviceScope.consume(DigestCache.serviceKey);
      digestCache.fetchDigest(this.context.pageContext.web.serverRelativeUrl).then((digest: string): void => {
        // use the digest here
        this.digest = digest;
        resolve();
      });
    });
  }
  public render(): void {
    console.log("parent this.context", this.context);
    const element: React.ReactElement<IFileUploadProps> = React.createElement(
      FileUpload,
      {
        spHttpClient: this.context.spHttpClient,
        digest: this.digest,
        context: this.context,
        listName:this.properties.listName,
        linkTitle: this.properties.linkTitle,
        linkColor: this.properties.linkColor,
        dialogTitle:this.properties.dialogTitle,
        iconSize: this.properties.iconSize,
        fontSize: this.properties.fontSize,
        icon:this.properties.icon,
        lists: this.properties.lists,
      
       


      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {

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
                PropertyPaneTextField('listName', {
                  label: 'שם פנימי לרשימת אחסון הנתונים',

                }),
                PropertyPaneTextField('linkTitle', {
                  label: 'כותרת הלינק',

                }),
                PropertyPaneTextField('linkColor', {
                  label: 'צבע טקסט הלינק',

                }),
                PropertyPaneTextField('dialogTitle', {
                  label: 'כותרת הדיאלוג',

                }),
                
                PropertyPaneTextField('icon', {
                  label: 'אייקון',

                }),
                PropertyPaneTextField('fontSize', {
                  label:  'גודל הפונט',

                }),
                PropertyPaneTextField('iconSize', {
                  label: 'גודל האייקון',

                }),
                PropertyFieldListPicker('lists', {
                  label: 'רשימה לאחסון השאלות',
                  selectedList: this.properties.lists,
                  includeHidden: false,
                  orderBy: PropertyFieldListPickerOrderBy.Title,
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
  }
}
