import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, IPropertyPaneConfiguration, IWebPartContext } from '@microsoft/sp-webpart-base';
export interface INewEmployeesWebPartProps {
    listName: string;
    linkTitle: string;
    linkColor: string;
    dialogTitle: string;
    icon: string;
    fontSize: string;
    iconSize: string;
    lists: string | string[];
}
export default class NewEmployeesWebPart extends BaseClientSideWebPart<INewEmployeesWebPartProps> {
    digest: string;
    constructor(context: IWebPartContext);
    protected onInit(): Promise<void>;
    render(): void;
    protected readonly dataVersion: Version;
    protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration;
}
