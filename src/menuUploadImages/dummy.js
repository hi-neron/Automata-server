let d3 = require('d3')
let yo = require('yo-yo')

let dummy = yo`
<svg viewBox="0 0 480 480">
  <defs>
    <style>
      .cls-1 {
        fill: #403852;
      }

      .cls-2 {
        fill: #827c96;
      }

      .cls-3 {
        isolation: isolate;
      }

      .cls-4 {
        fill: #908fb1;
      }

      .cls-5 {
        fill: url(#linear-gradient);
      }

      .cls-6 {
        fill: #8a81a8;
      }

      .cls-14, .cls-15, .cls-39, .cls-7, .cls-8 {
        mix-blend-mode: multiply;
      }

      .cls-7 {
        fill: url(#linear-gradient-2);
      }

      .cls-14, .cls-8, .cls-9 {
        fill: #3f3349;
      }

      .cls-8 {
        opacity: 0.3;
      }

      .cls-10 {
        fill: #f3f3f3;
      }

      .cls-11, .cls-15 {
        fill: #c8d3b3;
      }

      .cls-12 {
        fill: #4a415e;
      }

      .cls-13 {
        fill: #ffb57d;
      }

      .cls-14, .cls-39 {
        opacity: 0.2;
      }

      .cls-16, .cls-38 {
        fill: #d5ddd8;
      }

      .cls-17 {
        fill: url(#linear-gradient-3);
      }

      .cls-18 {
        fill: #3a3044;
      }

      .cls-19 {
        fill: url(#linear-gradient-5);
      }

      .cls-20 {
        fill: #41354b;
      }

      .cls-21 {
        fill: url(#linear-gradient-5);
      }

      .cls-22 {
        fill: url(#linear-gradient-6);
      }

      .cls-23 {
        fill: url(#linear-gradient-7);
      }

      .cls-24 {
        fill: url(#linear-gradient-8);
      }

      .cls-25 {
        fill: url(#linear-gradient-9);
      }

      .cls-26 {
        fill: url(#linear-gradient-10);
      }

      .cls-27 {
        fill: none;
        stroke: #d5ddd8;
        stroke-miterlimit: 10;
        opacity: 0.55;
      }

      .cls-28 {
        fill: url(#linear-gradient-11);
      }

      .cls-29 {
        fill: url(#linear-gradient-12);
      }

      .cls-30 {
        fill: url(#linear-gradient-13);
      }

      .cls-31 {
        fill: url(#linear-gradient-14);
      }

      .cls-32 {
        fill: url(#linear-gradient-15);
      }

      .cls-33 {
        fill: url(#linear-gradient-16);
      }

      .cls-34 {
        fill: url(#linear-gradient-17);
      }

      .cls-35 {
        fill: url(#linear-gradient-18);
      }

      .cls-36 {
        fill: #433852;
      }

      .cls-37 {
        opacity: 0.12;
      }

      .cls-38 {
        opacity: 0.1;
        mix-blend-mode: soft-light;
      }

      .cls-39 {
        fill: url(#linear-gradient-19);
      }

      .cls-40 {
        opacity: 0.22;
      }

      .cls-41 {
        fill: #dfe4d8;
      }

      .cls-42 {
        opacity: 0.4;
      }

      .cls-43 {
        fill: url(#linear-gradient-20);
      }

      .cls-44 {
        opacity: 0.65;
        mix-blend-mode: hard-light;
      }

      .cls-45 {
        fill: url(#linear-gradient-21);
      }
    </style>
    <linearGradient id="linear-gradient" x1="275.69" y1="111.71" x2="282.53" y2="145.96" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#dfe4d8"/>
      <stop offset="1" stop-color="#312d47"/>
    </linearGradient>
    <linearGradient id="linear-gradient-2" x1="240" y1="275.43" x2="240" y2="168.43" gradientUnits="userSpaceOnUse">
      <stop offset="0.01" stop-color="#312d47" stop-opacity="0.57"/>
      <stop offset="0.01" stop-color="#35324b" stop-opacity="0.58"/>
      <stop offset="0.06" stop-color="#595768" stop-opacity="0.67"/>
      <stop offset="0.11" stop-color="#797883" stop-opacity="0.75"/>
      <stop offset="0.16" stop-color="#95969a" stop-opacity="0.82"/>
      <stop offset="1" stop-color="#dfe4d8"/>
    </linearGradient>
    <linearGradient id="linear-gradient-3" x1="249.77" y1="394.54" x2="230.03" y2="304.81" gradientUnits="userSpaceOnUse">
      <stop offset="0.06" stop-color="#312d47" stop-opacity="0"/>
      <stop offset="0.21" stop-color="#312d47" stop-opacity="0.31"/>
      <stop offset="0.44" stop-color="#312d47" stop-opacity="0.69"/>
      <stop offset="0.64" stop-color="#312d47" stop-opacity="0.92"/>
      <stop offset="0.8" stop-color="#312d47"/>
    </linearGradient>
    <linearGradient id="linear-gradient-5" x1="218.81" y1="318.86" x2="259.19" y2="318.86" gradientUnits="userSpaceOnUse">
      <stop offset="0.1" stop-color="#403852"/>
      <stop offset="0.3" stop-color="#594877"/>
      <stop offset="0.66" stop-color="#403852"/>
    </linearGradient>
    <linearGradient id="linear-gradient-6" x1="207" y1="337.93" x2="207" y2="303.09" gradientUnits="userSpaceOnUse">
      <stop offset="0.6" stop-color="#3f3349" stop-opacity="0.15"/>
      <stop offset="1" stop-color="#3f3349"/>
    </linearGradient>
    <linearGradient id="linear-gradient-7" x1="298.98" y1="316.56" x2="298.98" y2="281.73" xlink:href="#linear-gradient-6">
    </linearGradient>
    <linearGradient id="linear-gradient-8" x1="169.87" y1="279.75" x2="293.46" y2="279.75" xlink:href="#linear-gradient-5">
    </linearGradient>
    <linearGradient id="linear-gradient-9" x1="185.17" y1="291.15" x2="294.83" y2="291.15" xlink:href="#linear-gradient-5">
    </linearGradient>
    <linearGradient id="linear-gradient-10" x1="203.01" y1="305.26" x2="274.74" y2="305.26" xlink:href="#linear-gradient-5">
    </linearGradient>
    <linearGradient id="linear-gradient-11" x1="227.95" y1="115.43" x2="251.42" y2="32.57" gradientTransform="matrix(1, 0, 0, -1, 0, 196.67)" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#312d47" stop-opacity="0"/>
      <stop offset="0.17" stop-color="#383149" stop-opacity="0.35"/>
      <stop offset="0.44" stop-color="#43394d" stop-opacity="0.97"/>
      <stop offset="1" stop-color="#312d47"/>
    </linearGradient>
    <linearGradient id="linear-gradient-12" x1="222.22" y1="120.84" x2="255.78" y2="120.84" xlink:href="#linear-gradient-5"></linearGradient>
    <linearGradient id="linear-gradient-13" x1="212.81" y1="135.28" x2="265.19" y2="135.28" xlink:href="#linear-gradient-5"></linearGradient>
    <linearGradient id="linear-gradient-14" x1="203.38" y1="138.71" x2="268.62" y2="138.71" xlink:href="#linear-gradient-5"></linearGradient>
    <linearGradient id="linear-gradient-15" x1="218.81" y1="124.95" x2="259.19" y2="124.95" xlink:href="#linear-gradient-5"></linearGradient>
    <linearGradient id="linear-gradient-16" x1="176.8" y1="184.09" x2="176.8" y2="169.28" xlink:href="#linear-gradient-6"></linearGradient>
    <linearGradient id="linear-gradient-17" x1="178.55" y1="166.43" x2="301.45" y2="166.43" xlink:href="#linear-gradient-5"></linearGradient>
    <linearGradient id="linear-gradient-18" x1="178.45" y1="151.87" x2="301.35" y2="151.87" xlink:href="#linear-gradient-5"></linearGradient>
    <linearGradient id="linear-gradient-19" x1="240.14" y1="281.95" x2="238.61" y2="161.59" gradientUnits="userSpaceOnUse">
      <stop offset="0.01" stop-color="#312d47" stop-opacity="0.54"/>
      <stop offset="1" stop-color="#312d47" stop-opacity="0.67"/>
    </linearGradient>
    <linearGradient id="linear-gradient-20" x1="202.17" y1="266.43" x2="270.95" y2="266.43" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f3f3" stop-opacity="0"/>
      <stop offset="1" stop-color="#f3f3f3" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="linear-gradient-21" x1="187.43" y1="177.93" x2="285.68" y2="177.93" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f3f3f3" stop-opacity="0"/>
      <stop offset="1" stop-color="#f3f3f3" stop-opacity="0"/>
    </linearGradient>
    <symbol id="New_Symbol" data-name="New Symbol" viewBox="0 0 5.93 5.93">
      <circle class="cls-1" cx="2.96" cy="2.96" r="2.96"/>
    </symbol>
    <symbol id="New_Symbol_2" data-name="New Symbol 2" viewBox="0 0 2.92 2.06">
      <path class="cls-16" d="M0,0A0.63,0.63,0,0,0,0,.47a1,1,0,0,0,1,.58A1.18,1.18,0,0,0,1.56.88,0.88,0.88,0,0,0,1.87.48a0.63,0.63,0,0,0,0-.47,0.91,0.91,0,0,1-.2.33,0.94,0.94,0,0,1-.36.2A0.77,0.77,0,0,1,1,.61,0.93,0.93,0,0,1,.3.34,0.9,0.9,0,0,1,0,0Z"/>
    </symbol>
  </defs>
  <title>dummy-01</title>
  <g class="cls-3">
    <g id="dummy-container">
      <g>
        <g id="roach">
          <path id="ant-left" class="cls-4" d="M287.36,143.27a3.24,3.24,0,0,0,.36-0.2,4.89,4.89,0,0,0,.88-0.71,5,5,0,0,0,.49-0.58,4.53,4.53,0,0,0,.43-0.73,5.72,5.72,0,0,0,.33-0.85,7,7,0,0,0,.16-0.93,5.39,5.39,0,0,0,0-1,5.5,5.5,0,0,0-.11-0.92c-0.07-.3-0.1-0.59-0.19-0.85l-0.24-.75c-0.14-.47-0.34-0.83-0.45-1.09l-0.18-.41,0.2,0.4c0.12,0.26.33,0.61,0.5,1.07l0.28,0.74c0.1,0.26.15,0.56,0.23,0.86a5.67,5.67,0,0,1,.15.94,5.6,5.6,0,0,1,0,1,7.22,7.22,0,0,1-.13,1,6,6,0,0,1-.31.92,4.89,4.89,0,0,1-.43.8,5.42,5.42,0,0,1-.5.65,4.85,4.85,0,0,1-1.33,1.07Z"/>
          <path id="ant-right" class="cls-4" d="M288.93,143.81l0.13,0,0.37,0.05a7.51,7.51,0,0,0,2.28-.12,6.56,6.56,0,0,0,1-.3,5.09,5.09,0,0,0,1-.49,6.57,6.57,0,0,0,.91-0.68,10.47,10.47,0,0,0,.76-0.85,10.32,10.32,0,0,0,.6-0.94l0.45-.95,0.29-.9a10.3,10.3,0,0,0,.32-1.37l0.11-.53-0.08.53a10.36,10.36,0,0,1-.27,1.39l-0.26.91-0.42,1a10.45,10.45,0,0,1-.57,1,10.6,10.6,0,0,1-.75.91,6.85,6.85,0,0,1-.92.75,5.4,5.4,0,0,1-1,.56,6.92,6.92,0,0,1-1,.35,7.93,7.93,0,0,1-2.41.22l-0.41,0-0.14,0Z"/>
          <path id="roach-body" class="cls-5" d="M282.75,140.86c-2.54-1.27-4.31-4.09-5.25-3.72-0.3.09-.43,0.61-0.36,1.35-1.34-.84-2.32-1.4-2.53-0.93s0.92,2.46,2.71,4.05l-0.87.38-1.91-.39,1.88,0.53h0.11l1.22-.17a11.34,11.34,0,0,0,2.33,1.51l0.31,0.14c0.16,0.11.32,0.21,0.5,0.31a12.11,12.11,0,0,0,2.15.92l-1,1.34,0,0.06v0l-0.31,2,0.71-1.79,1.6-1.36c0.29,0.07.57,0.13,0.85,0.17h0.07c2.43,0.39,4.45,0,4.37-1.22C289.16,142.55,285.23,142.24,282.75,140.86Z"/>
        </g>
        <g id="background">
          <g>
            <path class="cls-6" d="M296.5,177.43h0a1.5,1.5,0,0,1-1.5-1.5v-7.5H184v7.5a1.5,1.5,0,0,1-1.5,1.5h0a1.5,1.5,0,0,0-1.5,1.5v87a1.5,1.5,0,0,0,1.5,1.5h0a1.5,1.5,0,0,1,1.5,1.5v6.5H295v-5.5a2.5,2.5,0,0,1,2.5-2.5h0a1.5,1.5,0,0,0,1.5-1.5v-86A2.5,2.5,0,0,0,296.5,177.43Z"/>
            <path class="cls-7" d="M296.5,177.43h0a1.5,1.5,0,0,1-1.5-1.5v-7.5H184v7.5a1.5,1.5,0,0,1-1.5,1.5h0a1.5,1.5,0,0,0-1.5,1.5v87a1.5,1.5,0,0,0,1.5,1.5h0a1.5,1.5,0,0,1,1.5,1.5v6.5H295v-5.5a2.5,2.5,0,0,1,2.5-2.5h0a1.5,1.5,0,0,0,1.5-1.5v-86A2.5,2.5,0,0,0,296.5,177.43Z"/>
          </g>
          <rect class="cls-8" x="184" y="168.43" width="110.83" height="6.25"/>
          <rect class="cls-8" x="184" y="270.8" width="110.83" height="6.25"/>
          <polygon class="cls-9" points="241.81 220.28 238.83 241.47 238.8 241.68 238.6 241.73 233.18 243.36 233.36 243.03 234.41 248.04 234.38 247.97 240.12 257.35 240.15 257.39 240.14 257.44 239.5 263.44 239.5 263.44 239.5 263.45 236.56 273.93 239.32 263.4 239.32 263.42 239.86 257.41 239.88 257.5 233.98 248.22 233.96 248.18 233.95 248.14 232.83 243.15 232.77 242.91 233.01 242.83 238.41 241.12 238.19 241.38 240.82 220.15 241.81 220.28"/>
        </g>
        <g id="dummy">
          <path class="cls-9" d="M233,221a14.78,14.78,0,0,1-.51,3.76,14.44,14.44,0,0,1-.56,1.79,8.85,8.85,0,0,1-.85,1.71l-0.42.64-0.3.1a9.42,9.42,0,0,1-2.06.4,19.66,19.66,0,0,1-2.13.15h0l-0.39-.11a1.9,1.9,0,0,1-1-.66,1.42,1.42,0,0,1-.29-0.5,1.1,1.1,0,0,1,0-.34,0.36,0.36,0,0,1,.52-0.46,1.1,1.1,0,0,1,.33.08,1.42,1.42,0,0,1,.46.35,1.9,1.9,0,0,1,.54,1l-0.4-.11a19.65,19.65,0,0,1,1.85-1.07,9.42,9.42,0,0,1,1.93-.82l-0.73.74a8.85,8.85,0,0,1,.17-1.91,14.45,14.45,0,0,1,.46-1.82,14.78,14.78,0,0,1,1.54-3.47Z"/>
          <polygon class="cls-10" points="245.37 219.31 248.66 214.37 255.63 216.13 255.97 220.39 245.37 219.31"/>
          <polygon class="cls-11" points="246.93 218.21 248.59 215.72 254.72 216.76 255.48 219.09 246.93 218.21"/>
          <path class="cls-12" d="M233.1,215.35a44.83,44.83,0,0,1,17.76,1.81c2.3,0.77-1.82,7-1.82,7l-3.55-2.3L238,223.75Z"/>
          <g>
            <path class="cls-13" d="M231.37,214.13c0,3.31-1.43,3.84-4.06,5.45-1.38.84-2.22,4-4,4a9.14,9.14,0,0,1,0-18.28C228.4,205.31,231.37,209.09,231.37,214.13Z"/>
            <path class="cls-12" d="M234.18,216.44a11.06,11.06,0,0,1-3-3.65,2,2,0,0,1,.36-2.34s-3.47-8.28-10.92-6.15-5.46,8.91-4.86,10.84,4,9.66,4,9.66l2.13-1.32,1.53,0.6a2.26,2.26,0,0,0,2.79-1l1.06-1.85,2.13,1Z"/>
            <path class="cls-13" d="M226.93,212.92c-4.64-4.6-8.19-5.9-10.39-6.25-3.06,3.19-2.63,8.05-2.17,9.52s3.29,5.59,4.67,7.55A66.44,66.44,0,0,0,226.93,212.92Z"/>
            <path class="cls-14" d="M217.46,221.43c0.59,0.88,1.16,1.7,1.59,2.31l0.75-.87a9.11,9.11,0,0,0,3.55.72c1.09,0,1.82-1.24,2.56-2.37-4.11-.24-8.23-1.32-11.14-3.65A9.15,9.15,0,0,0,217.46,221.43Z"/>
            <path class="cls-12" d="M226.93,212.92A66.44,66.44,0,0,1,219,223.74l0.75,1.06,2.13-1.32,1.53,0.6a2.26,2.26,0,0,0,2.79-1l1.06-1.85,2.13,1,3.22-2.55A55.24,55.24,0,0,0,226.93,212.92Z"/>
            <path class="cls-13" d="M229.5,207.22a31.6,31.6,0,0,1-2.57,5.67q1.41,1.4,3,3.24a29.33,29.33,0,0,0,1.55-3.18,4,4,0,0,0-.36-3.59A17.51,17.51,0,0,0,229.5,207.22Z"/>
            <polygon class="cls-10" points="221.93 223.47 217.4 221.34 220.1 226.21 221.93 223.47"/>
          </g>
          <path class="cls-9" d="M249.42,224.4a16.19,16.19,0,0,1-1.48,5,21.15,21.15,0,0,1-2.58,3.68c0.39,0.35.75,2.77,0.9,3.26a5.58,5.58,0,0,0,1,.69,1,1,0,0,1,.43,1.45l-3.48,4.61,0.92-4.33a1.45,1.45,0,0,0-.6-1.38c-0.16-.16-2.45-1.82-3-3.79-0.7-2.56.38-5.64,0.71-6.56a16.19,16.19,0,0,1,2.52-4.57Z"/>
          <circle class="cls-12" cx="249.42" cy="222.8" r="5.63"/>
          <ellipse class="cls-12" cx="233.75" cy="219.71" rx="5.29" ry="4.47"/>
          <path class="cls-12" d="M266.78,223.32c-1.46-.31-6.31.61-6.82,0.59h-0.09a15.81,15.81,0,0,0-2.6-3.53,15.29,15.29,0,0,0-9.69-3.62l2.17,4.14c0,1.57,2,2.81,3.3,4,1.13,1,5.85,3.7,7.06,3.26a4.13,4.13,0,0,0,.58-0.21c0.47-.2,3.92-1.33,4.39-1.54s6.09,1.18,6.09,1.18S268.16,223.62,266.78,223.32Z"/>
          <circle class="cls-12" cx="249.42" cy="222.8" r="5.63"/>
          <path class="cls-10" d="M243.66,222.34s5.82-3.71,5-8l7,1.77s-4.75,4.6-1.39,9.57l-0.2.68c-1.83,2.74-3.71,2.21-5.68,2,0,0-4.35-.77-4.35-4.06,0-.45-0.41-0.18-0.41-0.18C242.1,223.74,243.66,222.34,243.66,222.34Z"/>
          <path class="cls-14" d="M254.5,217.54c-2.5-.61-5,2.72-7.5,1.88v-0.1a16,16,0,0,1-3.34,3s-1.56,1.4-.06,1.85c0,0,.41-0.27.41,0.18,0,3.29,4.35,4.06,4.35,4.06,2,0.16,3.85.69,5.68-2l0.2-.68A7,7,0,0,1,254.5,217.54Z"/>
          <polygon class="cls-15" points="249.42 219.09 247.58 221.34 249.9 219.66 249.42 219.09"/>
          <path class="cls-12" d="M237.25,219.28a15.85,15.85,0,0,1,1.76,2.77,13.13,13.13,0,0,1,1.19,3.09l0.31,1.39-0.27.44a17.37,17.37,0,0,1-1.86,2.39c-0.67.77-1.38,1.52-2.13,2.25l-0.43.27a1.9,1.9,0,0,1-.67.32,2.42,2.42,0,0,1-.68.07,1.65,1.65,0,0,1-.68-0.13,0.72,0.72,0,0,1,0-1.43,1.65,1.65,0,0,1,.67-0.16,2.42,2.42,0,0,1,.68,0,1.9,1.9,0,0,1,.68.29l-0.43.27c0.15-1,.34-2.05.57-3a17.37,17.37,0,0,1,.85-2.91l0,1.83a13.13,13.13,0,0,1-2-2.61,15.85,15.85,0,0,1-1.47-2.93Z"/>
          <path class="cls-16" d="M215.5,208a11,11,0,0,1,1.89-2.08,12.06,12.06,0,0,1,1.1-.83,8.34,8.34,0,0,1,1.34-.76,5.5,5.5,0,0,1,.76-0.29,4.31,4.31,0,0,1,.81-0.24l0.84-.16c0.29,0,.58,0,0.87,0a7.32,7.32,0,0,1,1.71.24c0.54,0.17,1.05.4,1.55,0.61s0.88,0.58,1.29.85,0.7,0.64,1,.93l0.44,0.42,0.34,0.43,0.55,0.7,0.47,0.61-0.54-.55-0.61-.64-0.37-.39-0.46-.38c-0.32-.26-0.66-0.56-1-0.84s-0.84-.48-1.27-0.76-1-.4-1.47-0.55a6.93,6.93,0,0,0-1.59-.2c-0.27,0-.54,0-0.81,0l-0.79.13a4,4,0,0,0-.76.21,5.12,5.12,0,0,0-.73.26,11.51,11.51,0,0,0-1.32.67,11.72,11.72,0,0,0-1.11.74,16.31,16.31,0,0,0-1.53,1.31C215.69,207.82,215.5,208,215.5,208Z"/>
          <path class="cls-16" d="M233.75,215.24l0.59-.05c0.38,0,.91-0.1,1.56-0.14a39.18,39.18,0,0,1,4.75-.07c0.86,0,1.73.12,2.53,0.23s1.55,0.26,2.18.39a16.76,16.76,0,0,1,2.08.6l-0.59-.09c-0.37-.08-0.9-0.13-1.54-0.23s-1.38-.16-2.18-0.23-1.65-.13-2.51-0.17c-1.71-.08-3.43-0.13-4.72-0.15l-1.56,0C234,215.27,233.75,215.24,233.75,215.24Z"/>
          <path class="cls-16" d="M256.47,219.71a16.51,16.51,0,0,1,2,1.85,9.47,9.47,0,0,1,1.65,2.25l-0.26-.12a23,23,0,0,1,5-.76,6.92,6.92,0,0,1,1.3.08,3.52,3.52,0,0,1,.64.17,3.39,3.39,0,0,1,.59.29,5,5,0,0,1,1,.78,3.12,3.12,0,0,1,.74,1,4.64,4.64,0,0,0-1.9-1.56,3.09,3.09,0,0,0-.56-0.23,3.19,3.19,0,0,0-.59-0.11,11.38,11.38,0,0,0-1.23,0,20.31,20.31,0,0,0-2.48.29c-0.83.13-1.66,0.28-2.47,0.46l-0.18,0-0.08-.16a11.8,11.8,0,0,0-1.47-2.24C257.71,221.06,257.11,220.37,256.47,219.71Z"/>
          <path class="cls-16" d="M224.25,212.43a3.26,3.26,0,0,1,.31-0.81,2.7,2.7,0,0,1,1.42-1.36,1.57,1.57,0,0,1,.59-0.06,1.53,1.53,0,0,1,.55.14,2.25,2.25,0,0,1,.72.6,2.45,2.45,0,0,1,.35.53c0.07,0.13.11,0.21,0.11,0.21l-0.18-.15a4.7,4.7,0,0,0-.46-0.39,2.45,2.45,0,0,0-.69-0.39,1.41,1.41,0,0,0-.4-0.07,1.1,1.1,0,0,0-.41.06,1.59,1.59,0,0,0-.39.19,2.58,2.58,0,0,0-.36.26,4.94,4.94,0,0,0-.59.59C224.46,212.15,224.25,212.43,224.25,212.43Z"/>
          <path class="cls-16" d="M237.21,218.3a2.62,2.62,0,0,1,.86.79,8.69,8.69,0,0,1,1.16,2.27c0.15,0.44.29,0.88,0.39,1.3s0.17,0.82.24,1.15C240,224.49,240,225,240,225s-0.19-.43-0.41-1.07l-0.83-2.36a20.23,20.23,0,0,0-.93-2.29,4.58,4.58,0,0,0-.42-0.69Z"/>
          <path class="cls-16" d="M228.88,227.3a4.65,4.65,0,0,0-1.33.44,9.38,9.38,0,0,0-1.21.7l-0.09.06-0.06-.09a4.56,4.56,0,0,0-.52-0.59,0.92,0.92,0,0,0-.7-0.31,0.87,0.87,0,0,1,.8.18,2.68,2.68,0,0,1,.61.58l-0.16,0a5.62,5.62,0,0,1,1.26-.71A3.14,3.14,0,0,1,228.88,227.3Z"/>
        </g>
        <g id="caps">
          <g>
            <rect class="cls-17" x="232.46" y="282.43" width="13.08" height="126.33"/>
            <rect class="cls-8" x="232.46" y="319.93" width="13.08" height="14.5"/>
          </g>
          <rect class="cls-18" x="222.22" y="309.38" width="33.57" height="18.96"/>
          <polygon class="cls-19" points="301.8 278.01 178.2 278.01 180.94 274.53 299.06 274.53 301.8 278.01"/>
          <polygon class="cls-9" points="298.15 280 181.85 280 187.35 288.77 193.26 290.83 206.5 303.09 206.5 307 271.5 307 271.5 303.09 284.3 292.21 292.52 288.77 298.15 280"/>
          <rect class="cls-20" x="214.11" y="304.94" width="49.78" height="6.79"/>
          <polygon class="cls-21" points="259.19 322.16 218.81 322.16 218.82 315.56 259.18 315.56 259.19 322.16"/>
          <polygon class="cls-8" points="295.08 285 298.1 280 181.9 280 184.91 285 295.08 285"/>
          <polygon class="cls-22" points="208 303.09 207 337.93 206 303.09 208 303.09"/>
          <polygon class="cls-23" points="299.98 281.73 298.98 316.56 297.98 281.73 299.98 281.73"/>
          <rect class="cls-24" x="178.2" y="277.41" width="123.6" height="4.68"/>
          <polygon class="cls-8" points="194.43 291 199.23 296 280.08 296 284.55 291.79 285.68 291 194.43 291"/>
          <rect class="cls-25" x="185.17" y="288.98" width="109.65" height="4.33"/>
          <rect class="cls-26" x="203.01" y="303.09" width="71.73" height="4.33"/>
          <line class="cls-27" x1="194.89" y1="288.98" x2="239.5" y2="288.98"/>
          <line class="cls-27" x1="222.94" y1="315.56" x2="250.17" y2="315.56"/>
          <line class="cls-27" x1="211.65" y1="303.09" x2="238.87" y2="303.09"/>
          <line class="cls-27" x1="185.89" y1="277.41" x2="248.89" y2="277.41"/>
          <rect class="cls-28" x="228" y="71.24" width="22" height="98.04"/>
          <rect class="cls-29" x="222.22" y="116.73" width="33.57" height="8.23"/>
          <rect class="cls-1" x="222.22" y="124.95" width="33.57" height="10.3"/>
          <rect class="cls-8" x="222.22" y="124.95" width="33.57" height="10.3"/>
          <rect class="cls-30" x="212.81" y="131.85" width="52.38" height="6.86"/>
          <rect class="cls-31" x="206.88" y="137.03" width="65.24" height="3.37"/>
          <polygon class="cls-32" points="259.19 128.26 218.81 128.26 218.82 121.65 259.18 121.65 259.19 128.26"/>
          <line class="cls-27" x1="214.28" y1="137.03" x2="240" y2="137.03"/>
          <line class="cls-27" x1="224.18" y1="121.66" x2="249.91" y2="121.66"/>
          <line class="cls-27" x1="224.93" y1="116.73" x2="250.66" y2="116.73"/>
          <line class="cls-27" x1="219.1" y1="131.85" x2="244.83" y2="131.85"/>
          <polygon class="cls-33" points="177.8 169.28 176.8 184.09 175.8 169.28 177.8 169.28"/>
          <polygon class="cls-34" points="301.45 170.24 178.55 169.24 178.55 162.61 301.45 162.61 301.45 170.24"/>
          <path class="cls-35" d="M301.35,162.61l-3,1.72H180l-1.55-1.72h0a92.58,92.58,0,0,1,22.61-19.52l6-3.7h64.62l7,4.17a92.58,92.58,0,0,1,22,18.33Z"/>
          <rect class="cls-36" x="176.51" y="165.42" width="126.99" height="3.05"/>
          <rect class="cls-1" x="173.83" y="168.1" width="132.33" height="3.46"/>
          <line class="cls-27" x1="187" y1="168.1" x2="241.81" y2="168.1"/>
          <g>
            <use width="5.93" height="5.93" transform="translate(188.96 148.04)" xlink:href="#New_Symbol"/>
            <use width="5.93" height="5.93" transform="translate(212.72 148.04)" xlink:href="#New_Symbol"/>
            <use width="5.93" height="5.93" transform="translate(236.47 148.04)" xlink:href="#New_Symbol"/>
            <use id="New_Symbol-9" data-name="New Symbol" width="5.93" height="5.93" transform="translate(260.22 148.04)" xlink:href="#New_Symbol"/>
            <use width="5.93" height="5.93" transform="translate(283.97 148.04)" xlink:href="#New_Symbol"/>
          </g>
          <g class="cls-37">
            <path class="cls-16" d="M222.22,139.4s0.05,0.13.12,0.37,0.17,0.58.25,1a17.58,17.58,0,0,1,.35,3.33,20.37,20.37,0,0,1-.43,4.29,21.75,21.75,0,0,1-1.47,4.48,21.48,21.48,0,0,1-2.4,4.05,20,20,0,0,1-3,3.14,17.47,17.47,0,0,1-2.75,1.92c-0.37.22-.71,0.36-0.92,0.47l-0.35.15s-0.05-.13-0.12-0.37-0.17-.58-0.25-1a17.47,17.47,0,0,1-.35-3.34,20,20,0,0,1,.43-4.29,21.48,21.48,0,0,1,1.48-4.47,21.75,21.75,0,0,1,2.41-4,20.37,20.37,0,0,1,3-3.14,17.58,17.58,0,0,1,2.74-1.93c0.37-.22.71-0.36,0.92-0.47Z"/>
          </g>
          <path class="cls-38" d="M207.09,139.4l-6,3.7a92.56,92.56,0,0,0-8.15,5.64,57.56,57.56,0,0,1-3,13.88H231c-0.59-6.49.5-12.58,4-17.19a45.33,45.33,0,0,1,5.37-6H207.09Z"/>
        </g>
        <g id="bubbles">
          <path id="body-water" class="cls-39" d="M182.5,194.36v71.1a3.26,3.26,0,0,1,3,3.46V273h107v-3.07a4.72,4.72,0,0,1,4-4.47V197.09c-4-.41-8.67-1-13-1.66C249.17,189.54,217.5,193.28,182.5,194.36Z"/>
          <g id="reflection-water" class="cls-40">
            <path class="cls-41" d="M279.9,194.82s-1.33-.11-3.65-0.34c-1.16-.12-2.57-0.27-4.18-0.39s-3.43-.32-5.42-0.46l-13.59-1c-2.49-.14-5.07-0.26-7.68-0.27-1.31,0-2.63,0-4,0l-4,.11-15.61.66-7.18.3c-2.28.11-4.45,0.17-6.44,0.23-4,.14-7.32.2-9.65,0.23l-3.66,0v-0.1l3.65-.32c2.32-.18,5.64-0.46,9.63-0.71,2-.14,4.15-0.28,6.44-0.38s4.7-.24,7.19-0.32,5.08-.15,7.7-0.18,5.29,0,8,0l7.95,0.12c2.62,0,5.2.07,7.7,0s4.92,0,7.2.2c1.14,0.07,2.26.12,3.33,0.2l3.11,0.3c2,0.18,3.81.39,5.42,0.63s3,0.41,4.16.63c2.3,0.4,3.6.65,3.6,0.65v0.1Z"/>
          </g>
          <g id="refelction-bottom" class="cls-42">
            <rect class="cls-43" x="202.17" y="265.93" width="68.78" height="1"/>
          </g>
          <g id="reflection-top" class="cls-44">
            <path class="cls-45" d="M187.43,177.93l4.22-.15c2.69-.06,6.52-0.21,11.13-0.28s10-.2,15.74-0.23l18-.1,18,0.1c5.76,0,11.13.17,15.74,0.23s8.44,0.22,11.13.28l4.22,0.15-4.22.15c-2.69.06-6.52,0.21-11.13,0.28s-10,.2-15.74.23l-18,.1-18-.1c-5.76,0-11.13-.17-15.74-0.23s-8.44-.21-11.13-0.28Z"/>
          </g>
         <use width="2.92" height="2.06" transform="matrix(0.98, 0, 0, -0.98, 193.43, 215.8)" xlink:href="#New_Symbol_2"/>
        <use id="bubble2" width="3.92" height="3.06" transform="matrix(0.98, 0, 0, -0.98, 193.95, 253.35)" xlink:href="#New_Symbol_2"/>
        <use width="2.92" height="2.06" transform="matrix(0.98, 0, 0, -0.98, 220.43, 201.8)" xlink:href="#New_Symbol_2"/>
        <use width="2.92" height="2.06" transform="matrix(0.98, 0, 0, -0.98, 218.43, 209.8)" xlink:href="#New_Symbol_2"/>
        <use width="2.92" height="2.06" transform="matrix(0.98, 0, 0, -0.98, 231.43, 219.8)" xlink:href="#New_Symbol_2"/>
        <use id="bubble1" width="3.92" height="3.06" transform="matrix(0.98, 0, 0, -0.98, 253.8, 260.35)" xlink:href="#New_Symbol_2"/>
        <use width="2.92" height="2.06" transform="matrix(0.98, 0, 0, -0.98, 255.43, 223.8)" xlink:href="#New_Symbol_2"/>
        <use width="2.92" height="2.06" transform="matrix(0.98, 0, 0, -0.98, 238.43, 202.8)" xlink:href="#New_Symbol_2"/>
        <use width="2.92" height="2.06" transform="matrix(0.98, 0, 0, -0.98, 258.43, 203.8)" xlink:href="#New_Symbol_2"/>
        <use width="2.92" height="2.06" transform="matrix(0.98, 0, 0, -0.98, 246.43, 249.8)" xlink:href="#New_Symbol_2"/>
        <use width="2.92" height="2.06" transform="matrix(0.98, 0, 0, -0.98, 260.43, 267.8)" xlink:href="#New_Symbol_2"/>
        <use width="2.92" height="2.06" transform="matrix(0.98, 0, 0, -0.98, 272.43, 233.8)" xlink:href="#New_Symbol_2"/>
        <use width="2.92" height="2.06" transform="matrix(0.98, 0, 0, -0.98, 279.43, 209.8)" xlink:href="#New_Symbol_2"/>
        <use width="2.92" height="2.06" transform="matrix(0.98, 0, 0, -0.98, 284.43, 202.8)" xlink:href="#New_Symbol_2"/>
        <use width="2.92" height="2.06" transform="matrix(0.98, 0, 0, -0.98, 282.43, 198.8)" xlink:href="#New_Symbol_2"/>
        <use width="2.92" height="2.06" transform="matrix(0.98, 0, 0, -0.98, 282.43, 215.8)" xlink:href="#New_Symbol_2"/>
        <use width="2.92" height="2.06" transform="matrix(0.98, 0, 0, -0.98, 234.86, 237.5)" xlink:href="#New_Symbol_2"/>
        <use width="2.92" height="2.06" transform="matrix(0.98, 0, 0, -0.98, 253.43, 252.8)" xlink:href="#New_Symbol_2"/>
        <use width="2.92" height="2.06" transform="matrix(0.98, 0, 0, -0.98, 229.51, 241.84)" xlink:href="#New_Symbol_2"/>
        <use width="2.92" height="2.06" transform="matrix(0.98, 0, 0, -0.98, 205.06, 260)" xlink:href="#New_Symbol_2"/>
        </g>
      </g>
    </g>
  </g>
</svg>
`

let xmlns="http://www.w3.org/2000/svg"
let xmlns_xlink = "http://www.w3.org/1999/xlink"
// xmlns:xlink

let d3dummy = d3.select(dummy)

d3dummy
  .attr("xmlns", xmlns)
  .attr("xmlns:xlink", xmlns_xlink)

module.exports = dummy