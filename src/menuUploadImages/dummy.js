let d3 = require('d3')
let yo = require('yo-yo')

let dummy = yo`
<svg viewBox="0 0 480 480">
<style type="text/css">
.st0{fill:#6C0F26;}
.st1{fill:#B81741;}
.st2{fill:#D9DBB0;}
.st3{fill:#FF4F7D;}
.st4{fill:url(#roach-body_1_);}
.st5{opacity:0.7;fill:#D13453;}
.st6{opacity:0.9;fill:url(#SVGID_1_);}
.st7{opacity:0.3;fill:#741229;enable-background:new    ;}
.st8{fill:#741229;}
.st9{fill:#FFD271;}
.st10{fill:#DCE0AA;}
.st11{fill:#88162B;}
.st12{fill:#FFD271;}
.st13{opacity:0.2;fill:#741229;enable-background:new    ;}
.st14{opacity:0.7;fill:url(#body-water_1_);enable-background:new    ;}
.st15{opacity:0.22;}
.st16{fill:#F0F1BF;}
.st17{opacity:0.4;}
.st18{fill:url(#SVGID_2_);}
.st19{opacity:0.65;}
.st20{fill:url(#SVGID_3_);}
.st21{opacity:0.7;}
.st22{fill:url(#SVGID_4_);}
.st23{fill:url(#SVGID_5_);}
.st24{fill:url(#SVGID_6_);}
.st25{opacity:0.5;fill:#030101;enable-background:new    ;}
.st26{fill:url(#SVGID_7_);}
.st27{fill:#500D1E;}
.st28{opacity:0.6;fill:#030101;enable-background:new    ;}
.st29{fill:url(#SVGID_8_);}
.st30{fill:url(#SVGID_9_);}
.st31{fill:url(#SVGID_10_);}
.st32{fill:url(#SVGID_11_);}
.st33{fill:url(#SVGID_12_);}
.st34{fill:url(#SVGID_13_);}
.st35{opacity:0.35;fill:#030101;enable-background:new    ;}
.st36{fill:url(#SVGID_14_);}
.st37{fill:url(#SVGID_15_);}
.st38{opacity:0.8;fill:url(#SVGID_16_);enable-background:new    ;}
.st39{fill:url(#SVGID_17_);}
.st40{opacity:0.3;fill:none;stroke:url(#SVGID_18_);stroke-miterlimit:10;enable-background:new    ;}
.st41{opacity:0.3;fill:none;stroke:url(#SVGID_19_);stroke-miterlimit:10;enable-background:new    ;}
.st42{opacity:0.3;fill:none;stroke:url(#SVGID_20_);stroke-miterlimit:10;enable-background:new    ;}
.st43{opacity:0.3;fill:none;stroke:url(#SVGID_21_);stroke-miterlimit:10;enable-background:new    ;}
.st44{fill:url(#SVGID_22_);}
.st45{fill:url(#SVGID_23_);}
.st46{fill:url(#SVGID_24_);}
.st47{fill:url(#SVGID_25_);}
.st48{fill:url(#SVGID_26_);}
.st49{opacity:0.3;fill:none;stroke:url(#SVGID_27_);stroke-miterlimit:10;enable-background:new    ;}
.st50{opacity:0.3;fill:none;stroke:url(#SVGID_28_);stroke-miterlimit:10;enable-background:new    ;}
.st51{opacity:0.3;fill:none;stroke:url(#SVGID_29_);stroke-miterlimit:10;enable-background:new    ;}
.st52{opacity:0.3;fill:none;stroke:url(#SVGID_30_);stroke-miterlimit:10;enable-background:new    ;}
.st53{fill:url(#SVGID_31_);}
.st54{fill:url(#SVGID_32_);}
.st55{fill:url(#SVGID_33_);}
.st56{fill:url(#SVGID_34_);}
.st57{opacity:0.3;fill:none;stroke:url(#SVGID_35_);stroke-miterlimit:10;enable-background:new    ;}
.st58{opacity:0.12;}
.st59{opacity:0.1;fill:#D9DBB0;enable-background:new    ;}
.st60{opacity:0.3;fill:none;stroke:url(#SVGID_36_);stroke-miterlimit:10;enable-background:new    ;}
.st61{fill:url(#SVGID_37_);enable-background:new    ;}
.st62{fill:url(#SVGID_38_);enable-background:new    ;}
.st63{opacity:0.35;fill:url(#SVGID_39_);}
.st64{opacity:0.3;}
.st65{fill:url(#SVGID_40_);}
</style>
<symbol  id="New_Symbol" viewBox="-3 -3 5.9 7.1">
<circle class="st0" cx="0" cy="1.2" r="3"/>
<circle class="st1" cx="0" cy="0" r="3"/>
</symbol>
<symbol  id="New_Symbol_2" viewBox="-1 -0.5 2 1.1">
<path class="st2" d="M-0.9-0.5C-1-0.4-1-0.2-0.9-0.1c0.2,0.4,0.6,0.6,1,0.6c0.2,0,0.4-0.1,0.6-0.2C0.8,0.3,0.9,0.1,0.9,0
  C1-0.2,1-0.4,0.9-0.5c0,0.1-0.1,0.2-0.2,0.3C0.6-0.1,0.5,0,0.4,0c-0.1,0-0.2,0.1-0.3,0.1c-0.3,0-0.5-0.1-0.7-0.3
  C-0.8-0.3-0.9-0.4-0.9-0.5z"/>
</symbol>
<title>dummy-01</title>
<g>
<g id="dummy-container">
  <g>
    <g id="roach">
      <path id="ant-left" class="st3" d="M287.4,119c0.1-0.1,0.2-0.1,0.4-0.2c0.3-0.2,0.6-0.4,0.9-0.7c0.2-0.2,0.3-0.4,0.5-0.6
        c0.2-0.2,0.3-0.5,0.4-0.7c0.1-0.3,0.2-0.6,0.3-0.9c0.1-0.3,0.1-0.6,0.2-0.9c0-0.3,0-0.7,0-1c0-0.3,0-0.6-0.1-0.9
        c-0.1-0.3-0.1-0.6-0.2-0.9l-0.2-0.8c-0.1-0.5-0.3-0.8-0.5-1.1l-0.2-0.4l0.2,0.4c0.1,0.3,0.3,0.6,0.5,1.1l0.3,0.7
        c0.1,0.3,0.1,0.6,0.2,0.9c0.1,0.3,0.1,0.6,0.1,0.9c0,0.3,0,0.7,0,1c0,0.3-0.1,0.7-0.1,1c-0.1,0.3-0.2,0.6-0.3,0.9
        c-0.1,0.3-0.3,0.5-0.4,0.8c-0.2,0.2-0.3,0.4-0.5,0.6c-0.4,0.4-0.8,0.8-1.3,1.1L287.4,119z"/>
      <path id="ant-right" class="st3" d="M288.9,119.6h0.1l0.4,0.1c0.8,0.1,1.5,0,2.3-0.1c0.3-0.1,0.7-0.2,1-0.3
        c0.4-0.1,0.7-0.3,1-0.5c0.3-0.2,0.6-0.4,0.9-0.7c0.3-0.3,0.5-0.6,0.8-0.9c0.2-0.3,0.4-0.6,0.6-0.9l0.5-0.9l0.3-0.9
        c0.1-0.4,0.2-0.9,0.3-1.4l0.1-0.5l-0.1,0.5c-0.1,0.5-0.1,0.9-0.3,1.4l-0.3,0.9l-0.4,1c-0.2,0.3-0.4,0.7-0.6,1
        c-0.2,0.3-0.5,0.6-0.8,0.9c-0.3,0.3-0.6,0.5-0.9,0.8c-0.3,0.2-0.6,0.4-1,0.6c-0.3,0.1-0.7,0.3-1,0.4c-0.8,0.2-1.6,0.3-2.4,0.2
        h-0.4h-0.1L288.9,119.6z"/>
      
        <linearGradient id="roach-body_1_" gradientUnits="userSpaceOnUse" x1="275.7223" y1="394.5365" x2="282.5623" y2="360.2864" gradientTransform="matrix(1 0 0 -1 0 482)">
        <stop  offset="0" style="stop-color:#6F1229"/>
        <stop  offset="1" style="stop-color:#B81741"/>
      </linearGradient>
      <path id="roach-body" class="st4" d="M282.8,116.6c-2.5-1.3-4.3-4.1-5.2-3.7c-0.3,0.1-0.4,0.6-0.4,1.4c-1.3-0.8-2.3-1.4-2.5-0.9
        s0.9,2.5,2.7,4.1l-0.9,0.4l-1.9-0.4l1.9,0.5h0.1l1.2-0.2c0.7,0.6,1.5,1.1,2.3,1.5l0.3,0.1c0.2,0.1,0.3,0.2,0.5,0.3
        c0.7,0.4,1.4,0.7,2.1,0.9l-1,1.3v0.1l0,0l-0.3,2l0.7-1.8l1.6-1.4c0.3,0.1,0.6,0.1,0.9,0.2h0.1c2.4,0.4,4.5,0,4.4-1.2
        C289.2,118.3,285.2,118,282.8,116.6z"/>
    </g>
    <g id="background">
      <g>
        <path class="st5" d="M296.5,153.2L296.5,153.2c-0.8,0-1.5-0.7-1.5-1.5v-7.5H184v7.5c0,0.8-0.7,1.5-1.5,1.5l0,0
          c-0.8,0-1.5,0.7-1.5,1.5v111.2c0,0.8,0.7,1.5,1.5,1.5l0,0c0.8,0,1.5,0.7,1.5,1.5v6.5h111v-5.5c0-1.4,1.1-2.5,2.5-2.5l0,0
          c0.8,0,1.5-0.7,1.5-1.5V155.7C299,154.3,297.9,153.2,296.5,153.2z"/>
        
          <linearGradient id="SVGID_1_" gradientUnits="userSpaceOnUse" x1="240" y1="206.57" x2="240" y2="337.81" gradientTransform="matrix(1 0 0 -1 0 482)">
          <stop  offset="8.833158e-02" style="stop-color:#B81741;stop-opacity:0.15"/>
          <stop  offset="0.1532" style="stop-color:#B81741;stop-opacity:0.98"/>
          <stop  offset="0.2018" style="stop-color:#B81741;stop-opacity:0.98"/>
          <stop  offset="1" style="stop-color:#B6FFFE;stop-opacity:0.2"/>
        </linearGradient>
        <path class="st6" d="M296.5,153.2L296.5,153.2c-0.8,0-1.5-0.7-1.5-1.5v-7.5H184v7.5c0,0.8-0.7,1.5-1.5,1.5l0,0
          c-0.8,0-1.5,0.7-1.5,1.5v111.2c0,0.8,0.7,1.5,1.5,1.5l0,0c0.8,0,1.5,0.7,1.5,1.5v6.5h111v-5.5c0-1.4,1.1-2.5,2.5-2.5l0,0
          c0.8,0,1.5-0.7,1.5-1.5V155.7C299,154.3,297.9,153.2,296.5,153.2z"/>
      </g>
      <rect x="184" y="144.2" class="st7" width="110.8" height="6.2"/>
      <polygon class="st8" points="241.8,220.3 238.8,241.5 238.8,241.7 238.6,241.7 233.2,243.4 233.4,243 234.4,248 234.4,248 
        240.1,257.4 240.1,257.4 240.1,257.4 239.5,263.4 239.5,263.4 239.5,263.5 236.6,273.9 239.3,263.4 239.3,263.4 239.9,257.4 
        239.9,257.5 234,248.2 234,248.2 233.9,248.1 232.8,243.1 232.8,242.9 233,242.8 238.4,241.1 238.2,241.4 240.8,220.1 				"/>
    </g>
    <g id="dummy">
      <path class="st8" d="M233,221c0,1.3-0.2,2.5-0.5,3.8c-0.1,0.6-0.3,1.2-0.6,1.8c-0.2,0.6-0.5,1.2-0.9,1.7l-0.4,0.6l-0.3,0.1
        c-0.7,0.2-1.4,0.3-2.1,0.4c-0.7,0.1-1.4,0.1-2.1,0.1l0,0l-0.4-0.1c-0.4-0.1-0.7-0.3-1-0.7c-0.1-0.1-0.2-0.3-0.3-0.5
        c0-0.1,0-0.2,0-0.3c-0.1-0.2,0-0.4,0.2-0.5c0.1-0.1,0.2,0,0.4,0c0.1,0,0.2,0,0.3,0.1c0.2,0.1,0.3,0.2,0.5,0.4
        c0.3,0.3,0.5,0.6,0.5,1l-0.4-0.1c0.6-0.4,1.2-0.7,1.9-1.1c0.6-0.3,1.3-0.6,1.9-0.8l-0.7,0.7c0-0.6,0-1.3,0.2-1.9
        c0.1-0.6,0.3-1.2,0.5-1.8c0.4-1.2,0.9-2.4,1.5-3.5L233,221z"/>
      <polygon class="st9" points="245.4,219.3 248.7,214.4 255.6,216.1 256,220.4 				"/>
      <polygon class="st10" points="246.9,218.2 248.6,215.7 254.7,216.8 255.5,219.1 				"/>
      <path class="st11" d="M233.1,215.4c6-0.6,12,0,17.8,1.8c2.3,0.8-1.8,7-1.8,7l-3.6-2.3l-7.5,1.9L233.1,215.4z"/>
      <g>
        <path class="st12" d="M231.4,214.1c0,3.3-1.4,3.8-4.1,5.4c-1.4,0.8-2.2,4-4,4c-5,0-9.1-4.1-9.1-9.1c0-5,4.1-9.1,9.1-9.1
          C228.4,205.3,231.4,209.1,231.4,214.1z"/>
        <path class="st11" d="M234.2,216.4c-1.3-1-2.3-2.2-3-3.6c-0.4-0.8-0.3-1.7,0.4-2.3c0,0-3.5-8.3-10.9-6.1s-5.5,8.9-4.9,10.8
          s4,9.7,4,9.7l2.1-1.3l1.5,0.6c1,0.4,2.2,0,2.8-1l1.1-1.9l2.1,1L234.2,216.4z"/>
        <path class="st12" d="M226.9,212.9c-4.6-4.6-8.2-5.9-10.4-6.2c-3.1,3.2-2.6,8.1-2.2,9.5s3.3,5.6,4.7,7.6
          C222,220.4,224.7,216.8,226.9,212.9z"/>
        <path class="st13" d="M217.5,221.4c0.6,0.9,1.2,1.7,1.6,2.3l0.8-0.9c1.1,0.5,2.3,0.7,3.6,0.7c1.1,0,1.8-1.2,2.6-2.4
          c-4.1-0.2-8.2-1.3-11.1-3.6C215.3,219.1,216.2,220.4,217.5,221.4z"/>
        <path class="st11" d="M226.9,212.9c-2.3,3.9-4.9,7.5-7.9,10.8l0.8,1.1l2.1-1.3l1.5,0.6c1,0.4,2.2,0,2.8-1l1.1-1.9l2.1,1
          l3.2-2.6C230.9,217.3,229,215,226.9,212.9z"/>
        <path class="st12" d="M229.5,207.2c-0.7,2-1.5,3.9-2.6,5.7c0.9,0.9,1.9,2,3,3.2c0.6-1,1.1-2.1,1.6-3.2c0.5-1.2,0.3-2.5-0.4-3.6
          C230.6,208.6,230.1,207.9,229.5,207.2z"/>
        <polygon class="st9" points="221.9,223.5 217.4,221.3 220.1,226.2 					"/>
      </g>
      <path class="st8" d="M249.4,224.4c-0.2,1.7-0.7,3.4-1.5,5c-0.7,1.3-1.6,2.5-2.6,3.7c0.4,0.4,0.8,2.8,0.9,3.3
        c0.3,0.3,0.6,0.5,1,0.7c0.5,0.2,0.7,0.8,0.5,1.3c0,0,0,0.1-0.1,0.1l-3.5,4.6l0.9-4.3c0.1-0.5-0.2-1.1-0.6-1.4
        c-0.2-0.2-2.4-1.8-3-3.8c-0.7-2.6,0.4-5.6,0.7-6.6c0.6-1.6,1.4-3.2,2.5-4.6L249.4,224.4z"/>
      <circle class="st11" cx="249.4" cy="222.8" r="5.6"/>
      <ellipse class="st11" cx="233.8" cy="219.7" rx="5.3" ry="4.5"/>
      <path class="st11" d="M266.8,223.3c-1.5-0.3-6.3,0.6-6.8,0.6h-0.1c-0.7-1.3-1.6-2.5-2.6-3.5c-2.7-2.3-6.1-3.6-9.7-3.6l2.2,4.1
        c0,1.6,2,2.8,3.3,4c1.1,1,5.9,3.7,7.1,3.3c0.2-0.1,0.4-0.1,0.6-0.2c0.5-0.2,3.9-1.3,4.4-1.5s6.1,1.2,6.1,1.2
        S268.2,223.6,266.8,223.3z"/>
      <circle class="st11" cx="249.4" cy="222.8" r="5.6"/>
      <path class="st9" d="M243.7,222.3c0,0,5.8-3.7,5-8l7,1.8c0,0-4.8,4.6-1.4,9.6l-0.2,0.7c-1.8,2.7-3.7,2.2-5.7,2
        c0,0-4.4-0.8-4.4-4.1c0-0.4-0.4-0.2-0.4-0.2C242.1,223.7,243.7,222.3,243.7,222.3z"/>
      <path class="st13" d="M254.5,217.5c-2.5-0.6-5,2.7-7.5,1.9v-0.1c-1,1.2-2.1,2.2-3.3,3c0,0-1.6,1.4-0.1,1.9c0,0,0.4-0.3,0.4,0.2
        c0,3.3,4.4,4.1,4.4,4.1c2,0.2,3.9,0.7,5.7-2l0.2-0.7C252.6,223.2,252.7,219.9,254.5,217.5z"/>
      <polygon class="st10" points="249.4,219.1 247.6,221.3 249.9,219.7 				"/>
      <path class="st11" d="M237.2,219.3c0.7,0.9,1.3,1.8,1.8,2.8c0.5,1,0.9,2,1.2,3.1l0.3,1.4l-0.3,0.4c-0.5,0.8-1.2,1.6-1.9,2.4
        c-0.7,0.8-1.4,1.5-2.1,2.2l-0.4,0.3c-0.2,0.1-0.4,0.3-0.7,0.3c-0.2,0.1-0.5,0.1-0.7,0.1c-0.2,0-0.5,0-0.7-0.1
        c-0.4,0-0.7-0.4-0.6-0.8c0-0.3,0.3-0.6,0.6-0.6c0.2-0.1,0.4-0.2,0.7-0.2c0.2,0,0.5,0,0.7,0c0.2,0.1,0.5,0.1,0.7,0.3l-0.4,0.3
        c0.1-1,0.3-2.1,0.6-3c0.2-1,0.5-2,0.9-2.9v1.8c-0.8-0.8-1.4-1.7-2-2.6c-0.6-0.9-1.1-1.9-1.5-2.9L237.2,219.3z"/>
      <path class="st2" d="M215.5,208c0.5-0.8,1.2-1.5,1.9-2.1c0.4-0.3,0.7-0.6,1.1-0.8c0.4-0.3,0.9-0.5,1.3-0.8
        c0.2-0.1,0.5-0.2,0.8-0.3c0.3-0.1,0.5-0.2,0.8-0.2l0.8-0.2c0.3,0,0.6,0,0.9,0c0.6,0,1.2,0.1,1.7,0.2c0.5,0.2,1.1,0.4,1.6,0.6
        s0.9,0.6,1.3,0.9s0.7,0.6,1,0.9l0.4,0.4l0.3,0.4l0.6,0.7l0.5,0.6l-0.5-0.6l-0.6-0.6l-0.4-0.4l-0.5-0.4c-0.3-0.3-0.7-0.6-1-0.8
        s-0.8-0.5-1.3-0.8s-1-0.4-1.5-0.6c-0.5-0.1-1.1-0.2-1.6-0.2c-0.3,0-0.5,0-0.8,0l-0.8,0.1c-0.3,0-0.5,0.1-0.8,0.2
        c-0.2,0.1-0.5,0.2-0.7,0.3c-0.5,0.2-0.9,0.4-1.3,0.7c-0.4,0.2-0.8,0.5-1.1,0.7c-0.5,0.4-1,0.8-1.5,1.3
        C215.7,207.8,215.5,208,215.5,208z"/>
      <path class="st2" d="M233.8,215.2l0.6-0.1c0.4,0,0.9-0.1,1.6-0.1c1.6-0.1,3.2-0.1,4.8-0.1c0.9,0,1.7,0.1,2.5,0.2
        s1.6,0.3,2.2,0.4c0.7,0.2,1.4,0.4,2.1,0.6l-0.6-0.1c-0.4-0.1-0.9-0.1-1.5-0.2s-1.4-0.2-2.2-0.2s-1.6-0.1-2.5-0.2
        c-1.7-0.1-3.4-0.1-4.7-0.1h-1.6C234,215.3,233.8,215.2,233.8,215.2z"/>
      <path class="st2" d="M256.5,219.7c0.7,0.6,1.4,1.2,2,1.9c0.7,0.7,1.2,1.4,1.6,2.2l-0.3-0.1c1.6-0.4,3.3-0.7,5-0.8
        c0.4,0,0.9,0,1.3,0.1c0.2,0,0.4,0.1,0.6,0.2c0.2,0.1,0.4,0.2,0.6,0.3c0.4,0.2,0.7,0.5,1,0.8c0.3,0.3,0.6,0.6,0.7,1
        c-0.5-0.7-1.1-1.2-1.9-1.6c-0.2-0.1-0.4-0.2-0.6-0.2c-0.2-0.1-0.4-0.1-0.6-0.1c-0.4,0-0.8,0-1.2,0c-0.8,0-1.7,0.1-2.5,0.3
        c-0.8,0.1-1.7,0.3-2.5,0.5h-0.2l-0.1-0.2c-0.4-0.8-0.9-1.6-1.5-2.2C257.7,221.1,257.1,220.4,256.5,219.7z"/>
      <path class="st2" d="M224.2,212.4c0.1-0.3,0.2-0.6,0.3-0.8c0.3-0.6,0.8-1.1,1.4-1.4c0.2-0.1,0.4-0.1,0.6-0.1
        c0.2,0,0.4,0.1,0.6,0.1c0.3,0.1,0.5,0.4,0.7,0.6c0.1,0.2,0.3,0.3,0.4,0.5c0.1,0.1,0.1,0.2,0.1,0.2l-0.2-0.1
        c-0.1-0.1-0.3-0.3-0.5-0.4c-0.2-0.2-0.4-0.3-0.7-0.4c-0.1,0-0.3-0.1-0.4-0.1c-0.1,0-0.3,0-0.4,0.1c-0.1,0-0.3,0.1-0.4,0.2
        c-0.1,0.1-0.2,0.2-0.4,0.3c-0.2,0.2-0.4,0.4-0.6,0.6C224.5,212.1,224.2,212.4,224.2,212.4z"/>
      <path class="st2" d="M237.2,218.3c0.3,0.2,0.6,0.5,0.9,0.8c0.5,0.7,0.9,1.5,1.2,2.3c0.1,0.4,0.3,0.9,0.4,1.3s0.2,0.8,0.2,1.1
        c0.1,0.7,0.1,1.2,0.1,1.2s-0.2-0.4-0.4-1.1l-0.8-2.4c-0.3-0.8-0.6-1.5-0.9-2.3c-0.1-0.2-0.3-0.5-0.4-0.7L237.2,218.3z"/>
      <path class="st2" d="M228.9,227.3c-0.5,0.1-0.9,0.2-1.3,0.4c-0.4,0.2-0.8,0.4-1.2,0.7l-0.1,0.1l-0.1-0.1
        c-0.2-0.2-0.3-0.4-0.5-0.6c-0.2-0.2-0.4-0.3-0.7-0.3c0.3-0.1,0.6,0,0.8,0.2c0.2,0.2,0.4,0.4,0.6,0.6h-0.2
        c0.4-0.3,0.8-0.5,1.3-0.7C227.9,227.4,228.4,227.3,228.9,227.3z"/>
    </g>
    <g id="bubbles">
      
        <linearGradient id="body-water_1_" gradientUnits="userSpaceOnUse" x1="240.1442" y1="200.05" x2="238.6142" y2="320.4101" gradientTransform="matrix(1 0 0 -1 0 482)">
        <stop  offset="0" style="stop-color:#000000"/>
        <stop  offset="1" style="stop-color:#000000;stop-opacity:0.3"/>
      </linearGradient>
      <path id="body-water" class="st14" d="M182.5,194.4v71.1c1.8,0.1,3.1,1.7,3,3.5v4.1h107v-3.1c0.1-2.3,1.8-4.1,4-4.5v-68.4
        c-4-0.4-8.7-1-13-1.7C249.2,189.5,217.5,193.3,182.5,194.4z"/>
      <g id="reflection-water" class="st15">
        <path class="st16" d="M279.9,194.8c0,0-1.3-0.1-3.6-0.3c-1.2-0.1-2.6-0.3-4.2-0.4s-3.4-0.3-5.4-0.5l-13.6-1
          c-2.5-0.1-5.1-0.3-7.7-0.3c-1.3,0-2.6,0-4,0l-4,0.1l-15.6,0.7l-7.2,0.3c-2.3,0.1-4.4,0.2-6.4,0.2c-4,0.1-7.3,0.2-9.6,0.2h-3.7
          v-0.1l3.6-0.3c2.3-0.2,5.6-0.5,9.6-0.7c2-0.1,4.1-0.3,6.4-0.4s4.7-0.2,7.2-0.3s5.1-0.1,7.7-0.2s5.3,0,8,0l7.9,0.1
          c2.6,0,5.2,0.1,7.7,0s4.9,0,7.2,0.2c1.1,0.1,2.3,0.1,3.3,0.2l3.1,0.3c2,0.2,3.8,0.4,5.4,0.6s3,0.4,4.2,0.6
          c2.3,0.4,3.6,0.6,3.6,0.6v0.1L279.9,194.8z"/>
      </g>
      <g id="refelction-bottom" class="st17">
        
          <linearGradient id="SVGID_2_" gradientUnits="userSpaceOnUse" x1="202.17" y1="215.57" x2="270.95" y2="215.57" gradientTransform="matrix(1 0 0 -1 0 482)">
          <stop  offset="0" style="stop-color:#F3E8E8;stop-opacity:0"/>
          <stop  offset="1" style="stop-color:#F3E8E8;stop-opacity:0"/>
        </linearGradient>
        <rect x="202.2" y="265.9" class="st18" width="68.8" height="1"/>
      </g>
      <g id="reflection-top" class="st19">
        
          <linearGradient id="SVGID_3_" gradientUnits="userSpaceOnUse" x1="187.43" y1="328.31" x2="285.61" y2="328.31" gradientTransform="matrix(1 0 0 -1 0 482)">
          <stop  offset="0" style="stop-color:#F3E8E8;stop-opacity:0"/>
          <stop  offset="1" style="stop-color:#F3E8E8;stop-opacity:0"/>
        </linearGradient>
        <path class="st20" d="M187.4,153.7l4.2-0.1c2.7-0.1,6.5-0.2,11.1-0.3c4.6-0.1,10-0.2,15.7-0.2l18-0.1l18,0.1
          c5.8,0,11.1,0.2,15.7,0.2s8.4,0.2,11.1,0.3l4.2,0.1l-4.2,0.1c-2.7,0.1-6.5,0.2-11.1,0.3c-4.6,0.1-10,0.2-15.7,0.2l-18,0.1
          l-18-0.1c-5.8,0-11.1-0.2-15.7-0.2s-8.4-0.2-11.1-0.3L187.4,153.7z"/>
      </g>
      
        <use xlink:href="#New_Symbol_2"  width="2" height="1.1" x="-1" y="-0.5" transform="matrix(1.4593 0 0 -1.4593 194.8608 214.7906)" style="overflow:visible;"/>
      
        <use xlink:href="#New_Symbol_2"  width="2" height="1.1" id="bubble2" x="-1" y="-0.5" transform="matrix(1.9591 0 0 -1.9591 195.8708 251.8506)" style="overflow:visible;"/>
      
        <use xlink:href="#New_Symbol_2"  width="2" height="1.1" x="-1" y="-0.5" transform="matrix(1.4593 0 0 -1.4593 221.8608 200.7906)" style="overflow:visible;"/>
      
        <use xlink:href="#New_Symbol_2"  width="2" height="1.1" x="-1" y="-0.5" transform="matrix(1.4593 0 0 -1.4593 219.8608 208.7906)" style="overflow:visible;"/>
      
        <use xlink:href="#New_Symbol_2"  width="2" height="1.1" x="-1" y="-0.5" transform="matrix(1.4593 0 0 -1.4593 232.8608 218.7906)" style="overflow:visible;"/>
      
        <use xlink:href="#New_Symbol_2"  width="2" height="1.1" id="bubble1" x="-1" y="-0.5" transform="matrix(1.9591 0 0 -1.9591 255.7208 258.8506)" style="overflow:visible;"/>
      
        <use xlink:href="#New_Symbol_2"  width="2" height="1.1" x="-1" y="-0.5" transform="matrix(1.4593 0 0 -1.4593 256.8608 222.7906)" style="overflow:visible;"/>
      
        <use xlink:href="#New_Symbol_2"  width="2" height="1.1" x="-1" y="-0.5" transform="matrix(1.4593 0 0 -1.4593 239.8608 201.7906)" style="overflow:visible;"/>
      
        <use xlink:href="#New_Symbol_2"  width="2" height="1.1" x="-1" y="-0.5" transform="matrix(1.4593 0 0 -1.4593 259.8608 202.7906)" style="overflow:visible;"/>
      
        <use xlink:href="#New_Symbol_2"  width="2" height="1.1" x="-1" y="-0.5" transform="matrix(1.4593 0 0 -1.4593 247.8608 248.7906)" style="overflow:visible;"/>
      
        <use xlink:href="#New_Symbol_2"  width="2" height="1.1" x="-1" y="-0.5" transform="matrix(1.4593 0 0 -1.4593 261.8608 266.7906)" style="overflow:visible;"/>
      
        <use xlink:href="#New_Symbol_2"  width="2" height="1.1" x="-1" y="-0.5" transform="matrix(1.4593 0 0 -1.4593 273.8608 232.7906)" style="overflow:visible;"/>
      
        <use xlink:href="#New_Symbol_2"  width="2" height="1.1" x="-1" y="-0.5" transform="matrix(1.4593 0 0 -1.4593 280.8608 208.7906)" style="overflow:visible;"/>
      
        <use xlink:href="#New_Symbol_2"  width="2" height="1.1" x="-1" y="-0.5" transform="matrix(1.4593 0 0 -1.4593 285.8608 201.7906)" style="overflow:visible;"/>
      
        <use xlink:href="#New_Symbol_2"  width="2" height="1.1" x="-1" y="-0.5" transform="matrix(1.4593 0 0 -1.4593 283.8608 197.7906)" style="overflow:visible;"/>
      
        <use xlink:href="#New_Symbol_2"  width="2" height="1.1" x="-1" y="-0.5" transform="matrix(1.4593 0 0 -1.4593 283.8608 214.7906)" style="overflow:visible;"/>
      
        <use xlink:href="#New_Symbol_2"  width="2" height="1.1" x="-1" y="-0.5" transform="matrix(1.4593 0 0 -1.4593 236.2908 236.4906)" style="overflow:visible;"/>
      
        <use xlink:href="#New_Symbol_2"  width="2" height="1.1" x="-1" y="-0.5" transform="matrix(1.4593 0 0 -1.4593 254.8608 251.7906)" style="overflow:visible;"/>
      
        <use xlink:href="#New_Symbol_2"  width="2" height="1.1" x="-1" y="-0.5" transform="matrix(1.4593 0 0 -1.4593 230.9408 240.8306)" style="overflow:visible;"/>
      
        <use xlink:href="#New_Symbol_2"  width="2" height="1.1" x="-1" y="-0.5" transform="matrix(1.4593 0 0 -1.4593 206.4908 258.9906)" style="overflow:visible;"/>
    </g>
    <g class="st21">
      <linearGradient id="SVGID_4_" gradientUnits="userSpaceOnUse" x1="181" y1="209.81" x2="299" y2="209.81">
        <stop  offset="0" style="stop-color:#000000;stop-opacity:0.6"/>
        <stop  offset="3.606229e-02" style="stop-color:#000000;stop-opacity:0.5152"/>
        <stop  offset="0.2551" style="stop-color:#000000;stop-opacity:0"/>
        <stop  offset="1" style="stop-color:#000000;stop-opacity:0.7"/>
      </linearGradient>
      <path class="st22" d="M296.5,153.2L296.5,153.2c-0.8,0-1.5-0.7-1.5-1.5v-7.5H184v7.5c0,0.8-0.7,1.5-1.5,1.5l0,0
        c-0.8,0-1.5,0.7-1.5,1.5v111.2c0,0.8,0.7,1.5,1.5,1.5l0,0c0.8,0,1.5,0.7,1.5,1.5v6.5h111v-5.5c0-1.4,1.1-2.5,2.5-2.5l0,0
        c0.8,0,1.5-0.7,1.5-1.5V155.7C299,154.3,297.9,153.2,296.5,153.2z"/>
      
        <linearGradient id="SVGID_5_" gradientUnits="userSpaceOnUse" x1="181" y1="272.19" x2="299" y2="272.19" gradientTransform="matrix(1 0 0 -1 0 482)">
        <stop  offset="0" style="stop-color:#000000;stop-opacity:0.6"/>
        <stop  offset="3.606229e-02" style="stop-color:#000000;stop-opacity:0.5152"/>
        <stop  offset="0.2551" style="stop-color:#000000;stop-opacity:0"/>
        <stop  offset="1" style="stop-color:#000000;stop-opacity:0.7"/>
      </linearGradient>
      <path class="st23" d="M296.5,153.2L296.5,153.2c-0.8,0-1.5-0.7-1.5-1.5v-7.5H184v7.5c0,0.8-0.7,1.5-1.5,1.5l0,0
        c-0.8,0-1.5,0.7-1.5,1.5v111.2c0,0.8,0.7,1.5,1.5,1.5l0,0c0.8,0,1.5,0.7,1.5,1.5v6.5h111v-5.5c0-1.4,1.1-2.5,2.5-2.5l0,0
        c0.8,0,1.5-0.7,1.5-1.5V155.7C299,154.3,297.9,153.2,296.5,153.2z"/>
    </g>
    <g id="caps">
      <g>
        
          <linearGradient id="SVGID_6_" gradientUnits="userSpaceOnUse" x1="249.9312" y1="89.5461" x2="229.8914" y2="180.6389" gradientTransform="matrix(1 0 0 -1 0 482)">
          <stop  offset="6.000000e-02" style="stop-color:#B81741;stop-opacity:0"/>
          <stop  offset="0.21" style="stop-color:#B81741;stop-opacity:0.31"/>
          <stop  offset="0.44" style="stop-color:#B81741;stop-opacity:0.69"/>
          <stop  offset="0.64" style="stop-color:#B81741;stop-opacity:0.92"/>
          <stop  offset="0.8" style="stop-color:#B81741"/>
        </linearGradient>
        <rect x="228" y="279.6" class="st24" width="22" height="126.3"/>
        <rect x="228" y="317.1" class="st7" width="22" height="14.5"/>
      </g>
      <rect x="222.2" y="306.6" class="st11" width="33.6" height="19"/>
      <rect x="222.2" y="306.6" class="st25" width="33.6" height="10.5"/>
      
        <linearGradient id="SVGID_7_" gradientUnits="userSpaceOnUse" x1="218.81" y1="205.73" x2="259.19" y2="205.73" gradientTransform="matrix(1 0 0 -1 0 482)">
        <stop  offset="0.1" style="stop-color:#88162B"/>
        <stop  offset="0.3" style="stop-color:#B81741"/>
        <stop  offset="0.66" style="stop-color:#88162B"/>
      </linearGradient>
      <polygon class="st26" points="301.8,278 178.2,278 180.9,274.5 299.1,274.5 				"/>
      <polygon class="st27" points="293.1,280 186.9,280 187.4,288.8 193.3,290.8 206.5,300.3 206.5,304.2 271.5,304.2 271.5,300.3 
        284.3,292.2 292.5,288.8 				"/>
      <polygon class="st28" points="292.8,280 187.2,280 187.4,288.8 193.3,290.8 206.5,300.3 206.5,304.2 271.5,304.2 271.5,300.3 
        284.3,292.2 292.5,288.8 				"/>
      <linearGradient id="SVGID_8_" gradientUnits="userSpaceOnUse" x1="214.11" y1="305.505" x2="263.89" y2="305.505">
        <stop  offset="0.1" style="stop-color:#88162B"/>
        <stop  offset="0.3" style="stop-color:#B81741"/>
        <stop  offset="0.66" style="stop-color:#88162B"/>
      </linearGradient>
      <rect x="214.1" y="302.1" class="st29" width="49.8" height="6.8"/>
      
        <linearGradient id="SVGID_9_" gradientUnits="userSpaceOnUse" x1="218.81" y1="165.97" x2="259.19" y2="165.97" gradientTransform="matrix(1 0 0 -1 0 482)">
        <stop  offset="0.1" style="stop-color:#88162B"/>
        <stop  offset="0.3" style="stop-color:#B81741"/>
        <stop  offset="0.66" style="stop-color:#88162B"/>
      </linearGradient>
      <polygon class="st30" points="259.2,319.3 218.8,319.3 218.8,312.7 259.2,312.7 				"/>
      
        <linearGradient id="SVGID_10_" gradientUnits="userSpaceOnUse" x1="207" y1="146.9" x2="207" y2="181.74" gradientTransform="matrix(1 0 0 -1 0 482)">
        <stop  offset="0.6" style="stop-color:#88162B;stop-opacity:0.15"/>
        <stop  offset="1" style="stop-color:#88162B"/>
      </linearGradient>
      <polygon class="st31" points="208,300.3 207,335.1 206,300.3 				"/>
      
        <linearGradient id="SVGID_11_" gradientUnits="userSpaceOnUse" x1="298.98" y1="165.44" x2="298.98" y2="200.27" gradientTransform="matrix(1 0 0 -1 0 482)">
        <stop  offset="0.6" style="stop-color:#88162B;stop-opacity:0.15"/>
        <stop  offset="1" style="stop-color:#88162B"/>
      </linearGradient>
      <polygon class="st32" points="300,281.7 299,316.6 298,281.7 				"/>
      
        <linearGradient id="SVGID_12_" gradientUnits="userSpaceOnUse" x1="169.87" y1="202.25" x2="293.47" y2="202.25" gradientTransform="matrix(1 0 0 -1 0 482)">
        <stop  offset="0.1" style="stop-color:#88162B"/>
        <stop  offset="0.3" style="stop-color:#B81741"/>
        <stop  offset="0.66" style="stop-color:#88162B"/>
      </linearGradient>
      <rect x="178.2" y="277.4" class="st33" width="123.6" height="4.7"/>
      
        <linearGradient id="SVGID_13_" gradientUnits="userSpaceOnUse" x1="179.8561" y1="196.645" x2="285.8561" y2="196.645" gradientTransform="matrix(1 0 0 -1 0 482)">
        <stop  offset="0.1" style="stop-color:#88162B"/>
        <stop  offset="0.3" style="stop-color:#B81741"/>
        <stop  offset="0.66" style="stop-color:#88162B"/>
      </linearGradient>
      <rect x="187" y="281.7" class="st34" width="106" height="7.2"/>
      <rect x="187" y="282.1" class="st35" width="106" height="6.9"/>
      
        <linearGradient id="SVGID_14_" gradientUnits="userSpaceOnUse" x1="185.17" y1="190.855" x2="294.82" y2="190.855" gradientTransform="matrix(1 0 0 -1 0 482)">
        <stop  offset="0.1" style="stop-color:#88162B"/>
        <stop  offset="0.3" style="stop-color:#B81741"/>
        <stop  offset="0.66" style="stop-color:#88162B"/>
      </linearGradient>
      <rect x="185.2" y="289" class="st36" width="109.7" height="4.3"/>
      
        <linearGradient id="SVGID_15_" gradientUnits="userSpaceOnUse" x1="195.56" y1="185.215" x2="284.43" y2="185.215" gradientTransform="matrix(1 0 0 -1 0 482)">
        <stop  offset="0.1" style="stop-color:#88162B"/>
        <stop  offset="0.3" style="stop-color:#B81741"/>
        <stop  offset="0.66" style="stop-color:#88162B"/>
      </linearGradient>
      <rect x="195.6" y="293.3" class="st37" width="88.9" height="6.9"/>
      <linearGradient id="SVGID_16_" gradientUnits="userSpaceOnUse" x1="239.995" y1="306.9267" x2="239.995" y2="293.3167">
        <stop  offset="0" style="stop-color:#7D1629;stop-opacity:0"/>
        <stop  offset="1" style="stop-color:#5C101E"/>
      </linearGradient>
      <rect x="195.6" y="293.3" class="st38" width="88.9" height="6.9"/>
      
        <linearGradient id="SVGID_17_" gradientUnits="userSpaceOnUse" x1="203.01" y1="179.575" x2="274.74" y2="179.575" gradientTransform="matrix(1 0 0 -1 0 482)">
        <stop  offset="0.1" style="stop-color:#88162B"/>
        <stop  offset="0.3" style="stop-color:#B81741"/>
        <stop  offset="0.66" style="stop-color:#88162B"/>
      </linearGradient>
      <rect x="203" y="300.3" class="st39" width="71.7" height="4.3"/>
      <linearGradient id="SVGID_18_" gradientUnits="userSpaceOnUse" x1="194.89" y1="288.98" x2="239.5" y2="288.98">
        <stop  offset="1.821665e-03" style="stop-color:#B81741;stop-opacity:0"/>
        <stop  offset="2.950706e-02" style="stop-color:#C2365B;stop-opacity:5.182421e-02"/>
        <stop  offset="7.655043e-02" style="stop-color:#D06581;stop-opacity:0.1399"/>
        <stop  offset="0.1266" style="stop-color:#DD8EA3;stop-opacity:0.2335"/>
        <stop  offset="0.1788" style="stop-color:#E7B1BF;stop-opacity:0.3312"/>
        <stop  offset="0.2337" style="stop-color:#F0CED7;stop-opacity:0.4341"/>
        <stop  offset="0.2924" style="stop-color:#F7E4E8;stop-opacity:0.544"/>
        <stop  offset="0.3566" style="stop-color:#FBF3F5;stop-opacity:0.6642"/>
        <stop  offset="0.4305" style="stop-color:#FEFCFD;stop-opacity:0.8024"/>
        <stop  offset="0.536" style="stop-color:#FFFFFF"/>
        <stop  offset="1" style="stop-color:#B81741;stop-opacity:0"/>
      </linearGradient>
      <line class="st40" x1="194.9" y1="289" x2="239.5" y2="289"/>
      <linearGradient id="SVGID_19_" gradientUnits="userSpaceOnUse" x1="222.94" y1="312.73" x2="250.17" y2="312.73">
        <stop  offset="1.821665e-03" style="stop-color:#B81741;stop-opacity:0"/>
        <stop  offset="2.950706e-02" style="stop-color:#C2365B;stop-opacity:5.182421e-02"/>
        <stop  offset="7.655043e-02" style="stop-color:#D06581;stop-opacity:0.1399"/>
        <stop  offset="0.1266" style="stop-color:#DD8EA3;stop-opacity:0.2335"/>
        <stop  offset="0.1788" style="stop-color:#E7B1BF;stop-opacity:0.3312"/>
        <stop  offset="0.2337" style="stop-color:#F0CED7;stop-opacity:0.4341"/>
        <stop  offset="0.2924" style="stop-color:#F7E4E8;stop-opacity:0.544"/>
        <stop  offset="0.3566" style="stop-color:#FBF3F5;stop-opacity:0.6642"/>
        <stop  offset="0.4305" style="stop-color:#FEFCFD;stop-opacity:0.8024"/>
        <stop  offset="0.536" style="stop-color:#FFFFFF"/>
        <stop  offset="1" style="stop-color:#B81741;stop-opacity:0"/>
      </linearGradient>
      <line class="st41" x1="222.9" y1="312.7" x2="250.2" y2="312.7"/>
      <linearGradient id="SVGID_20_" gradientUnits="userSpaceOnUse" x1="211.65" y1="300.26" x2="238.87" y2="300.26">
        <stop  offset="1.821665e-03" style="stop-color:#B81741;stop-opacity:0"/>
        <stop  offset="2.950706e-02" style="stop-color:#C2365B;stop-opacity:5.182421e-02"/>
        <stop  offset="7.655043e-02" style="stop-color:#D06581;stop-opacity:0.1399"/>
        <stop  offset="0.1266" style="stop-color:#DD8EA3;stop-opacity:0.2335"/>
        <stop  offset="0.1788" style="stop-color:#E7B1BF;stop-opacity:0.3312"/>
        <stop  offset="0.2337" style="stop-color:#F0CED7;stop-opacity:0.4341"/>
        <stop  offset="0.2924" style="stop-color:#F7E4E8;stop-opacity:0.544"/>
        <stop  offset="0.3566" style="stop-color:#FBF3F5;stop-opacity:0.6642"/>
        <stop  offset="0.4305" style="stop-color:#FEFCFD;stop-opacity:0.8024"/>
        <stop  offset="0.536" style="stop-color:#FFFFFF"/>
        <stop  offset="1" style="stop-color:#B81741;stop-opacity:0"/>
      </linearGradient>
      <line class="st42" x1="211.6" y1="300.3" x2="238.9" y2="300.3"/>
      <linearGradient id="SVGID_21_" gradientUnits="userSpaceOnUse" x1="185.89" y1="277.41" x2="248.89" y2="277.41">
        <stop  offset="1.821665e-03" style="stop-color:#B81741;stop-opacity:0"/>
        <stop  offset="2.950706e-02" style="stop-color:#C2365B;stop-opacity:5.182421e-02"/>
        <stop  offset="7.655043e-02" style="stop-color:#D06581;stop-opacity:0.1399"/>
        <stop  offset="0.1266" style="stop-color:#DD8EA3;stop-opacity:0.2335"/>
        <stop  offset="0.1788" style="stop-color:#E7B1BF;stop-opacity:0.3312"/>
        <stop  offset="0.2337" style="stop-color:#F0CED7;stop-opacity:0.4341"/>
        <stop  offset="0.2924" style="stop-color:#F7E4E8;stop-opacity:0.544"/>
        <stop  offset="0.3566" style="stop-color:#FBF3F5;stop-opacity:0.6642"/>
        <stop  offset="0.4305" style="stop-color:#FEFCFD;stop-opacity:0.8024"/>
        <stop  offset="0.536" style="stop-color:#FFFFFF"/>
        <stop  offset="1" style="stop-color:#B81741;stop-opacity:0"/>
      </linearGradient>
      <line class="st43" x1="185.9" y1="277.4" x2="248.9" y2="277.4"/>
      
        <linearGradient id="SVGID_22_" gradientUnits="userSpaceOnUse" x1="227.9478" y1="372.3306" x2="251.4178" y2="455.1906" gradientTransform="matrix(1 0 0 1 0 -315.33)">
        <stop  offset="0" style="stop-color:#88162B;stop-opacity:0"/>
        <stop  offset="0.17" style="stop-color:#B81741;stop-opacity:0.35"/>
        <stop  offset="0.44" style="stop-color:#B81741;stop-opacity:0.97"/>
        <stop  offset="1" style="stop-color:#88162B"/>
      </linearGradient>
      <rect x="228" y="47" class="st44" width="22" height="98"/>
      
        <linearGradient id="SVGID_23_" gradientUnits="userSpaceOnUse" x1="222.22" y1="385.395" x2="255.79" y2="385.395" gradientTransform="matrix(1 0 0 -1 0 482)">
        <stop  offset="0.1" style="stop-color:#88162B"/>
        <stop  offset="0.3" style="stop-color:#B81741"/>
        <stop  offset="0.66" style="stop-color:#88162B"/>
      </linearGradient>
      <rect x="222.2" y="92.5" class="st45" width="33.6" height="8.2"/>
      <rect x="222.2" y="100.7" class="st1" width="33.6" height="10.3"/>
      <rect x="222.2" y="100.7" class="st28" width="33.6" height="10.3"/>
      
        <linearGradient id="SVGID_24_" gradientUnits="userSpaceOnUse" x1="212.81" y1="370.96" x2="265.19" y2="370.96" gradientTransform="matrix(1 0 0 -1 0 482)">
        <stop  offset="0.1" style="stop-color:#88162B"/>
        <stop  offset="0.3" style="stop-color:#B81741"/>
        <stop  offset="0.66" style="stop-color:#88162B"/>
      </linearGradient>
      <rect x="212.8" y="107.6" class="st46" width="52.4" height="6.9"/>
      
        <linearGradient id="SVGID_25_" gradientUnits="userSpaceOnUse" x1="203.38" y1="367.525" x2="268.62" y2="367.525" gradientTransform="matrix(1 0 0 -1 0 482)">
        <stop  offset="0.1" style="stop-color:#88162B"/>
        <stop  offset="0.3" style="stop-color:#B81741"/>
        <stop  offset="0.66" style="stop-color:#88162B"/>
      </linearGradient>
      <rect x="206.9" y="112.8" class="st47" width="65.2" height="3.4"/>
      
        <linearGradient id="SVGID_26_" gradientUnits="userSpaceOnUse" x1="218.81" y1="381.285" x2="259.19" y2="381.285" gradientTransform="matrix(1 0 0 -1 0 482)">
        <stop  offset="0.1" style="stop-color:#88162B"/>
        <stop  offset="0.3" style="stop-color:#B81741"/>
        <stop  offset="0.66" style="stop-color:#88162B"/>
      </linearGradient>
      <polygon class="st48" points="259.2,104 218.8,104 218.8,97.4 259.2,97.4 				"/>
      <linearGradient id="SVGID_27_" gradientUnits="userSpaceOnUse" x1="214.28" y1="112.79" x2="240" y2="112.79">
        <stop  offset="1.821665e-03" style="stop-color:#B81741;stop-opacity:0"/>
        <stop  offset="2.950706e-02" style="stop-color:#C2365B;stop-opacity:5.182421e-02"/>
        <stop  offset="7.655043e-02" style="stop-color:#D06581;stop-opacity:0.1399"/>
        <stop  offset="0.1266" style="stop-color:#DD8EA3;stop-opacity:0.2335"/>
        <stop  offset="0.1788" style="stop-color:#E7B1BF;stop-opacity:0.3312"/>
        <stop  offset="0.2337" style="stop-color:#F0CED7;stop-opacity:0.4341"/>
        <stop  offset="0.2924" style="stop-color:#F7E4E8;stop-opacity:0.544"/>
        <stop  offset="0.3566" style="stop-color:#FBF3F5;stop-opacity:0.6642"/>
        <stop  offset="0.4305" style="stop-color:#FEFCFD;stop-opacity:0.8024"/>
        <stop  offset="0.536" style="stop-color:#FFFFFF"/>
        <stop  offset="1" style="stop-color:#B81741;stop-opacity:0"/>
      </linearGradient>
      <line class="st49" x1="214.3" y1="112.8" x2="240" y2="112.8"/>
      <linearGradient id="SVGID_28_" gradientUnits="userSpaceOnUse" x1="224.18" y1="97.42" x2="249.91" y2="97.42">
        <stop  offset="1.821665e-03" style="stop-color:#B81741;stop-opacity:0"/>
        <stop  offset="2.950706e-02" style="stop-color:#C2365B;stop-opacity:5.182421e-02"/>
        <stop  offset="7.655043e-02" style="stop-color:#D06581;stop-opacity:0.1399"/>
        <stop  offset="0.1266" style="stop-color:#DD8EA3;stop-opacity:0.2335"/>
        <stop  offset="0.1788" style="stop-color:#E7B1BF;stop-opacity:0.3312"/>
        <stop  offset="0.2337" style="stop-color:#F0CED7;stop-opacity:0.4341"/>
        <stop  offset="0.2924" style="stop-color:#F7E4E8;stop-opacity:0.544"/>
        <stop  offset="0.3566" style="stop-color:#FBF3F5;stop-opacity:0.6642"/>
        <stop  offset="0.4305" style="stop-color:#FEFCFD;stop-opacity:0.8024"/>
        <stop  offset="0.536" style="stop-color:#FFFFFF"/>
        <stop  offset="1" style="stop-color:#B81741;stop-opacity:0"/>
      </linearGradient>
      <line class="st50" x1="224.2" y1="97.4" x2="249.9" y2="97.4"/>
      <linearGradient id="SVGID_29_" gradientUnits="userSpaceOnUse" x1="224.93" y1="92.49" x2="250.66" y2="92.49">
        <stop  offset="1.821665e-03" style="stop-color:#B81741;stop-opacity:0"/>
        <stop  offset="2.950706e-02" style="stop-color:#C2365B;stop-opacity:5.182421e-02"/>
        <stop  offset="7.655043e-02" style="stop-color:#D06581;stop-opacity:0.1399"/>
        <stop  offset="0.1266" style="stop-color:#DD8EA3;stop-opacity:0.2335"/>
        <stop  offset="0.1788" style="stop-color:#E7B1BF;stop-opacity:0.3312"/>
        <stop  offset="0.2337" style="stop-color:#F0CED7;stop-opacity:0.4341"/>
        <stop  offset="0.2924" style="stop-color:#F7E4E8;stop-opacity:0.544"/>
        <stop  offset="0.3566" style="stop-color:#FBF3F5;stop-opacity:0.6642"/>
        <stop  offset="0.4305" style="stop-color:#FEFCFD;stop-opacity:0.8024"/>
        <stop  offset="0.536" style="stop-color:#FFFFFF"/>
        <stop  offset="1" style="stop-color:#B81741;stop-opacity:0"/>
      </linearGradient>
      <line class="st51" x1="224.9" y1="92.5" x2="250.7" y2="92.5"/>
      <linearGradient id="SVGID_30_" gradientUnits="userSpaceOnUse" x1="219.1" y1="107.61" x2="244.83" y2="107.61">
        <stop  offset="1.821665e-03" style="stop-color:#B81741;stop-opacity:0"/>
        <stop  offset="2.950706e-02" style="stop-color:#C2365B;stop-opacity:5.182421e-02"/>
        <stop  offset="7.655043e-02" style="stop-color:#D06581;stop-opacity:0.1399"/>
        <stop  offset="0.1266" style="stop-color:#DD8EA3;stop-opacity:0.2335"/>
        <stop  offset="0.1788" style="stop-color:#E7B1BF;stop-opacity:0.3312"/>
        <stop  offset="0.2337" style="stop-color:#F0CED7;stop-opacity:0.4341"/>
        <stop  offset="0.2924" style="stop-color:#F7E4E8;stop-opacity:0.544"/>
        <stop  offset="0.3566" style="stop-color:#FBF3F5;stop-opacity:0.6642"/>
        <stop  offset="0.4305" style="stop-color:#FEFCFD;stop-opacity:0.8024"/>
        <stop  offset="0.536" style="stop-color:#FFFFFF"/>
        <stop  offset="1" style="stop-color:#B81741;stop-opacity:0"/>
      </linearGradient>
      <line class="st52" x1="219.1" y1="107.6" x2="244.8" y2="107.6"/>
      
        <linearGradient id="SVGID_31_" gradientUnits="userSpaceOnUse" x1="176.8" y1="322.15" x2="176.8" y2="336.96" gradientTransform="matrix(1 0 0 -1 0 482)">
        <stop  offset="0.6" style="stop-color:#88162B;stop-opacity:0.15"/>
        <stop  offset="1" style="stop-color:#88162B"/>
      </linearGradient>
      <polygon class="st53" points="177.8,145 176.8,159.9 175.8,145 				"/>
      
        <linearGradient id="SVGID_32_" gradientUnits="userSpaceOnUse" x1="178.55" y1="339.815" x2="301.45" y2="339.815" gradientTransform="matrix(1 0 0 -1 0 482)">
        <stop  offset="0.1" style="stop-color:#88162B"/>
        <stop  offset="0.3" style="stop-color:#B81741"/>
        <stop  offset="0.66" style="stop-color:#88162B"/>
      </linearGradient>
      <polygon class="st54" points="301.5,146 178.6,145 178.6,138.4 301.5,138.4 				"/>
      
        <linearGradient id="SVGID_33_" gradientUnits="userSpaceOnUse" x1="178.45" y1="354.38" x2="301.35" y2="354.38" gradientTransform="matrix(1 0 0 -1 0 482)">
        <stop  offset="0.1" style="stop-color:#88162B"/>
        <stop  offset="0.3" style="stop-color:#B81741"/>
        <stop  offset="0.66" style="stop-color:#88162B"/>
      </linearGradient>
      <path class="st55" d="M301.4,138.4l-3,1.7H180l-1.6-1.7l0,0c6.4-7.7,14.1-14.3,22.6-19.5l6-3.7h64.6l7,4.2
        c8.2,4.9,15.7,11.1,22,18.3L301.4,138.4z"/>
      <linearGradient id="SVGID_34_" gradientUnits="userSpaceOnUse" x1="176.51" y1="142.705" x2="303.5" y2="142.705">
        <stop  offset="0.1" style="stop-color:#88162B"/>
        <stop  offset="0.3" style="stop-color:#B81741"/>
        <stop  offset="0.66" style="stop-color:#88162B"/>
      </linearGradient>
      <rect x="176.5" y="141.2" class="st56" width="127" height="3.1"/>
      <rect x="173.8" y="143.9" class="st1" width="132.3" height="3.5"/>
      <linearGradient id="SVGID_35_" gradientUnits="userSpaceOnUse" x1="187" y1="143.86" x2="241.81" y2="143.86">
        <stop  offset="1.821665e-03" style="stop-color:#B81741;stop-opacity:0"/>
        <stop  offset="2.950706e-02" style="stop-color:#C2365B;stop-opacity:5.182421e-02"/>
        <stop  offset="7.655043e-02" style="stop-color:#D06581;stop-opacity:0.1399"/>
        <stop  offset="0.1266" style="stop-color:#DD8EA3;stop-opacity:0.2335"/>
        <stop  offset="0.1788" style="stop-color:#E7B1BF;stop-opacity:0.3312"/>
        <stop  offset="0.2337" style="stop-color:#F0CED7;stop-opacity:0.4341"/>
        <stop  offset="0.2924" style="stop-color:#F7E4E8;stop-opacity:0.544"/>
        <stop  offset="0.3566" style="stop-color:#FBF3F5;stop-opacity:0.6642"/>
        <stop  offset="0.4305" style="stop-color:#FEFCFD;stop-opacity:0.8024"/>
        <stop  offset="0.536" style="stop-color:#FFFFFF"/>
        <stop  offset="1" style="stop-color:#B81741;stop-opacity:0"/>
      </linearGradient>
      <line class="st57" x1="187" y1="143.9" x2="241.8" y2="143.9"/>
      <g>
        
          <use xlink:href="#New_Symbol"  width="5.9" height="7.1" x="-3" y="-3" transform="matrix(1.0017 0 0 1.0017 191.925 126.765)" style="overflow:visible;"/>
        
          <use xlink:href="#New_Symbol"  width="5.9" height="7.1" x="-3" y="-3" transform="matrix(1.0017 0 0 1.0017 215.685 126.765)" style="overflow:visible;"/>
        
          <use xlink:href="#New_Symbol"  width="5.9" height="7.1" x="-3" y="-3" transform="matrix(1.0017 0 0 1.0017 239.435 126.765)" style="overflow:visible;"/>
        
          <use xlink:href="#New_Symbol"  width="5.9" height="7.1" id="New_Symbol-9" x="-3" y="-3" transform="matrix(1.0017 0 0 1.0017 263.185 126.765)" style="overflow:visible;"/>
        
          <use xlink:href="#New_Symbol"  width="5.9" height="7.1" x="-3" y="-3" transform="matrix(1.0017 0 0 1.0017 286.935 126.765)" style="overflow:visible;"/>
      </g>
      <g class="st58">
        <path class="st2" d="M222.2,115.2c0,0,0.1,0.1,0.1,0.4s0.2,0.6,0.2,1c0.2,1.1,0.3,2.2,0.4,3.3c0,1.4-0.1,2.9-0.4,4.3
          c-0.3,1.5-0.8,3-1.5,4.5c-0.6,1.4-1.5,2.8-2.4,4.1c-0.9,1.2-1.9,2.2-3,3.1c-0.9,0.7-1.8,1.4-2.8,1.9c-0.4,0.2-0.7,0.4-0.9,0.5
          l-0.4,0.1c0,0-0.1-0.1-0.1-0.4s-0.2-0.6-0.2-1c-0.2-1.1-0.3-2.2-0.4-3.3c0-1.4,0.1-2.9,0.4-4.3c0.3-1.5,0.8-3,1.5-4.5
          c0.7-1.4,1.5-2.8,2.4-4c0.9-1.2,1.9-2.2,3-3.1c0.8-0.7,1.8-1.4,2.7-1.9c0.4-0.2,0.7-0.4,0.9-0.5L222.2,115.2z"/>
      </g>
      <path class="st59" d="M207.1,115.2l-6,3.7c-2.8,1.7-5.5,3.6-8.1,5.6c-0.4,4.7-1.4,9.4-3,13.9H231c-0.6-6.5,0.5-12.6,4-17.2
        c1.6-2.2,3.4-4.2,5.4-6L207.1,115.2L207.1,115.2z"/>
      <linearGradient id="SVGID_36_" gradientUnits="userSpaceOnUse" x1="194.84" y1="141.18" x2="220.56" y2="141.18">
        <stop  offset="1.821665e-03" style="stop-color:#B81741;stop-opacity:0"/>
        <stop  offset="2.950706e-02" style="stop-color:#C2365B;stop-opacity:5.182421e-02"/>
        <stop  offset="7.655043e-02" style="stop-color:#D06581;stop-opacity:0.1399"/>
        <stop  offset="0.1266" style="stop-color:#DD8EA3;stop-opacity:0.2335"/>
        <stop  offset="0.1788" style="stop-color:#E7B1BF;stop-opacity:0.3312"/>
        <stop  offset="0.2337" style="stop-color:#F0CED7;stop-opacity:0.4341"/>
        <stop  offset="0.2924" style="stop-color:#F7E4E8;stop-opacity:0.544"/>
        <stop  offset="0.3566" style="stop-color:#FBF3F5;stop-opacity:0.6642"/>
        <stop  offset="0.4305" style="stop-color:#FEFCFD;stop-opacity:0.8024"/>
        <stop  offset="0.536" style="stop-color:#FFFFFF"/>
        <stop  offset="1" style="stop-color:#B81741;stop-opacity:0"/>
      </linearGradient>
      <line class="st60" x1="194.8" y1="141.2" x2="220.6" y2="141.2"/>
    </g>
    <linearGradient id="SVGID_37_" gradientUnits="userSpaceOnUse" x1="239.415" y1="274.53" x2="239.415" y2="267.8337">
      <stop  offset="0" style="stop-color:#460818;stop-opacity:0.8"/>
      <stop  offset="0.328" style="stop-color:#4B091A;stop-opacity:0.6032"/>
      <stop  offset="0.6971" style="stop-color:#580B1F;stop-opacity:0.3817"/>
      <stop  offset="1" style="stop-color:#690D25;stop-opacity:0.2"/>
    </linearGradient>
    <rect x="184" y="267.8" class="st61" width="110.8" height="6.7"/>
    
      <linearGradient id="SVGID_38_" gradientUnits="userSpaceOnUse" x1="239.415" y1="153.7882" x2="239.415" y2="147.0918" gradientTransform="matrix(-1 0 0 -1 478.83 300.88)">
      <stop  offset="0" style="stop-color:#460818;stop-opacity:0.8"/>
      <stop  offset="0.2911" style="stop-color:#4A0919;stop-opacity:0.5935"/>
      <stop  offset="0.568" style="stop-color:#550A1E;stop-opacity:0.3971"/>
      <stop  offset="0.8385" style="stop-color:#680D25;stop-opacity:0.2053"/>
      <stop  offset="0.8459" style="stop-color:#690D25;stop-opacity:0.2"/>
    </linearGradient>
    <rect x="184" y="147.1" class="st62" width="110.8" height="6.7"/>
  </g>
</g>
</g>
<linearGradient id="SVGID_39_" gradientUnits="userSpaceOnUse" x1="239.4946" y1="261.1934" x2="239.4105" y2="267.8138">
<stop  offset="0" style="stop-color:#FFFFFF;stop-opacity:0"/>
<stop  offset="1" style="stop-color:#FFFFFF;stop-opacity:0.3"/>
</linearGradient>
<path class="st63" d="M282.8,267.8h-86.6c-3.4,0-6.1-2.7-6.1-6.1v-1.9h98.8v1.9C288.9,265.1,286.2,267.8,282.8,267.8z"/>
<g class="st64">
<linearGradient id="SVGID_40_" gradientUnits="userSpaceOnUse" x1="209.2079" y1="212.737" x2="199.547" y2="152.1951">
  <stop  offset="0" style="stop-color:#FFFFFF;stop-opacity:0"/>
  <stop  offset="1" style="stop-color:#FFFFFF"/>
</linearGradient>
<path class="st65" d="M205.4,219.6L205.4,219.6c-4.1,0-7.4-3.3-7.4-7.4V165c0-4.1,3.3-7.4,7.4-7.4h0c4.1,0,7.4,3.3,7.4,7.4v47.2
  C212.8,216.3,209.5,219.6,205.4,219.6z"/>
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