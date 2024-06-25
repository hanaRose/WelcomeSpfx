import { WebPartContext } from '@microsoft/sp-webpart-base';
import { SPHttpClient } from '@microsoft/sp-http';
export interface IFileUploadProps {
    digest: string;
    context: WebPartContext;
    spHttpClient: SPHttpClient;
    listName: string;
    linkTitle: string;
    linkColor: string;
    dialogTitle: string;
    fontSize: string;
    iconSize: string;
    icon: string;
    lists: string | string[];
}
export interface ISecureFinalAdWebPartProps {
    description: string;
    context: WebPartContext;
}
