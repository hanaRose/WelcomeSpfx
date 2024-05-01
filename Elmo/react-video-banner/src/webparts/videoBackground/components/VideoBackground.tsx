import * as React from "react";
import styles from "./VideoBackground.module.scss";
import { IVideoBackgroundProps } from "./IVideoBackgroundProps";

const VideoBackground = (props: IVideoBackgroundProps) => {
  const vRef = React.useRef<HTMLVideoElement>(null);
  const oldUrl = React.useRef(props.videoUrl);

  console.debug("execution here");
  var date = new Date();
  var currentTimeOfDay = '';
  var currentHours = date.getHours();
  if (currentHours < 12) {
    currentTimeOfDay = 'morning';
  } else if (currentHours < 17) {
    currentTimeOfDay = 'afternoon';
  } else if (currentHours >= 17) {
    currentTimeOfDay = 'evening';
  }
  else if (currentHours >= 24 || currentHours < 6) {
    currentTimeOfDay = 'night';
  }
  React.useEffect(() => {
    if (oldUrl.current !== props.videoUrl && vRef && vRef.current) {
      vRef.current.load();
      oldUrl.current = props.videoUrl;
    }
  }, [props.videoUrl]);

  return (
    <div
      className={styles.videoBackground}
      style={{ height: `${props.height}px` }}
    >
        <div className={styles.videoWarper} style={{ height: `${props.titleHeight}px`,justifyContent: `${props.side}`}}>
          {props.isDisplayWelcome ?
            <h1 style={{ color: props.titleColor ,fontSize:props.titleFontSize+"px"}} >

              {currentTimeOfDay
                ? 'Good  ' + currentTimeOfDay + ", " + props.userDisplayName + "!"
                : "Welcome,  " + props.userDisplayName + "!"}

            </h1>
            : ""}




        </div>
      <div style={{ height: `${props.textHeight}px`,justifyContent: `${props.side}` }}>
      
        <h1 style={{ color: props.textColor ,fontSize:props.textFontSize+"px"}}>

          {props.wpTitle}</h1>
      </div>
      <video
        ref={vRef}
        autoPlay={true}
        loop={true}
        playsinline={true}
        preload="auto"
        tabIndex={-1}
        muted={true}
        style={{ filter: `brightness(${props.brightness}%` }}
      >
        <source src={props.videoUrl} type="video/mp4"></source>
      </video>
    </div>
  );
};

export default VideoBackground;
