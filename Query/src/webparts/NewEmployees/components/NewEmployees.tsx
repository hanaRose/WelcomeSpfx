import * as React from 'react';
import styles from './NewEmployees.module.scss';
import { IFileUploadProps } from './INewEmployeesProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { Log, UrlQueryParameterCollection } from '@microsoft/sp-core-library';
import DropzoneComponent from 'react-dropzone-component';
import pnp, { Lists, Web } from 'sp-pnp-js';
import { Dropdown, DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown'
import { SPHttpClient, HttpClientResponse, SPHttpClientResponse } from '@microsoft/sp-http';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import {
  Dialog, DialogContent, DialogFooter, DialogType
} from 'office-ui-fabric-react/lib/Dialog';





export default class FileUpload extends React.Component<IFileUploadProps, {}> {



  constructor(props: IFileUploadProps) {
    super(props);
    console.log("name", this.props.context.pageContext.user.loginName);


    this.open = this.open.bind(this);
    this.close = this.close.bind(this);

    this.sendMessage = this.sendMessage.bind(this);
  }

  sendMessage() {


    var bodyElem = document.getElementById('popupMsgContent') as HTMLTextAreaElement;
    var body_ = bodyElem.value;
    if (body_ == "") {
      document.getElementById('errorMsg').style.display = "block"
      setTimeout(() => document.getElementById('errorMsg').style.display = "none", 2000)
    }
    else {

      var current = this.props.lists


      var url = `${this.props.context.pageContext.web.absoluteUrl}/_api/web/lists('` + current + `')/Items`;

      var myHeaders = {
        'Accept': 'application/json;odata=nometadata',
        'Content-type': 'application/json;odata=verbose',
        'odata-version': ''
      };
      var body:
        string = JSON.stringify({
          '__metadata': {
            'type': 'SP.Data.' + this.props.listName + 'ListItem'
          },
          //"Title": title_,
          "Title": body_,
        });
      this.props.spHttpClient.post(url,
        SPHttpClient.configurations.v1,
        {
          headers: myHeaders,
          body: body
        })
        .then((response: SPHttpClientResponse) => {
          console.log("sendMessage response", response);



          this.close();
          this.open2();
          setTimeout(() => this.close2(), 3000)
        });



    }


  }

  open() {
    console.log("open", this.state.isOpen);
    this.setState({ isOpen: true });
  }

  close = () => this.setState({ isOpen: false })

  open2() {
    this.setState({ isOpenSecond: true });
  }

  close2 = () => this.setState({ isOpenSecond: false })
  displayForm = () => this.setState({ isOpen: true })

  state = {
    messages: [],
    isOpen: false,

    isOpenSecond: false,


  }


  public render(): React.ReactElement<IFileUploadProps> {


    return (
      <div>
        <div className={styles.questionComponent} id="questionComponentId">
          <img style={{ height: `${this.props.iconSize}px` }} src={this.props.icon} alt="" onClick={(e) => this.displayForm()} />
          <button id='questionButton' style={{ color: this.props.linkColor, fontSize: `${this.props.fontSize}px` }} className={styles.LinkButton} onClick={(e) => this.displayForm()}>  {this.props.linkTitle}</button>

        </div>
        <Dialog
          isOpen={this.state.isOpenSecond}
          type={DialogType.close}
          onDismiss={this.close2}

          isBlocking={false}
          closeButtonAriaLabel='Close'

        >
          <DialogContent>
            השאלה נשלחה בהצלחה!
          </DialogContent>
          <DialogFooter>

          </DialogFooter>
        </Dialog >
        <Dialog
          isOpen={this.state.isOpen}
          type={DialogType.close}
          onDismiss={this.close.bind(this)}


          isBlocking={false}
          closeButtonAriaLabel='Close'>
          <div id="popupContent " className='text-center'>
            <div className="popUpTitle" style={{ fontWeight: "bold" }}>

              {this.props.dialogTitle}

            </div>
            <br></br>

            <div className=""><label style={{ width: "10%" }}>תוכן: </label><br></br><div className="popupMsgContent"><textarea id='popupMsgContent' style={{ width: "97%", height: "100px", margin: "7px 0px" }}></textarea></div>
              <small id="errorMsg" className={styles.error}>יש להזין שאלה</small>

            </div>
          </div>
          <DialogFooter>
            <PrimaryButton style={{ marginLeft: '28% !important' }} onClick={this.sendMessage}>{"שלח"}</PrimaryButton>
          </DialogFooter>
        </Dialog>


      </div >
    );
  }
}
