/// <reference types="react" />
import * as React from 'react';
import { IFileUploadProps } from './INewEmployeesProps';
export default class FileUpload extends React.Component<IFileUploadProps, {}> {
    constructor(props: IFileUploadProps);
    sendMessage(): void;
    open(): void;
    close: () => void;
    open2(): void;
    close2: () => void;
    displayForm: () => void;
    state: {
        messages: any[];
        isOpen: boolean;
        isOpenSecond: boolean;
    };
    render(): React.ReactElement<IFileUploadProps>;
}
