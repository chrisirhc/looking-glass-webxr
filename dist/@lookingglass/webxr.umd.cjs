(function(y,P){typeof exports=="object"&&typeof module<"u"?P(exports,require("@lookingglass/webxr-polyfill/src/api/index"),require("@lookingglass/webxr-polyfill/src/api/XRSystem"),require("@lookingglass/webxr-polyfill/src/WebXRPolyfill"),require("holoplay-core"),require("@lookingglass/webxr-polyfill/src/devices/XRDevice"),require("@lookingglass/webxr-polyfill/src/api/XRSpace"),require("gl-matrix"),require("@lookingglass/webxr-polyfill/src/api/XRWebGLLayer")):typeof define=="function"&&define.amd?define(["exports","@lookingglass/webxr-polyfill/src/api/index","@lookingglass/webxr-polyfill/src/api/XRSystem","@lookingglass/webxr-polyfill/src/WebXRPolyfill","holoplay-core","@lookingglass/webxr-polyfill/src/devices/XRDevice","@lookingglass/webxr-polyfill/src/api/XRSpace","gl-matrix","@lookingglass/webxr-polyfill/src/api/XRWebGLLayer"],P):(y=typeof globalThis<"u"?globalThis:y||self,P(y["Looking Glass WebXR"]={},y["@lookingglass/webxr-polyfill/src/api/index"],y["@lookingglass/webxr-polyfill/src/api/XRSystem"],y["@lookingglass/webxr-polyfill/src/WebXRPolyfill"],y.holoPlayCore,y["@lookingglass/webxr-polyfill/src/devices/XRDevice"],y["@lookingglass/webxr-polyfill/src/api/XRSpace"],y.glMatrix,y["@lookingglass/webxr-polyfill/src/api/XRWebGLLayer"]))})(this,function(y,P,G,ie,z,ne,se,w,K){"use strict";var ke=Object.defineProperty;var Ie=(y,P,G)=>P in y?ke(y,P,{enumerable:!0,configurable:!0,writable:!0,value:G}):y[P]=G;var x=(y,P,G)=>(Ie(y,typeof P!="symbol"?P+"":P,G),G);const X=a=>a&&typeof a=="object"&&"default"in a?a:{default:a};function ae(a){if(a&&a.__esModule)return a;const t=Object.create(null,{[Symbol.toStringTag]:{value:"Module"}});if(a){for(const e in a)if(e!=="default"){const n=Object.getOwnPropertyDescriptor(a,e);Object.defineProperty(t,e,n.get?n:{enumerable:!0,get:()=>a[e]})}}return t.default=a,Object.freeze(t)}const $=X(P),re=X(G),oe=X(ie),Z=ae(z),le=X(ne),ce=X(se),de=X(K),Y=1.6;var q;(function(a){a[a.Swizzled=0]="Swizzled",a[a.Center=1]="Center",a[a.Quilt=2]="Quilt"})(q||(q={}));class ue extends EventTarget{constructor(e){super();x(this,"_calibration",{configVersion:"1.0",pitch:{value:45},slope:{value:-5},center:{value:-.5},viewCone:{value:40},invView:{value:1},verticalAngle:{value:0},DPI:{value:338},screenW:{value:250},screenH:{value:250},flipImageX:{value:0},flipImageY:{value:0},flipSubp:{value:0},serial:"LKG-DEFAULT-#####"});x(this,"_viewControls",{tileHeight:512,numViews:45,trackballX:0,trackballY:0,targetX:0,targetY:Y,targetZ:-.5,targetDiam:2,fovy:13/180*Math.PI,depthiness:1.25,inlineView:q.Center});x(this,"LookingGlassDetected");this._viewControls={...this._viewControls,...e},this.syncCalibration()}syncCalibration(){new Z.Client(e=>{if(e.devices.length<1){console.log("No Looking Glass devices found");return}e.devices.length>1&&console.log("More than one Looking Glass device found... using the first one"),this.calibration=e.devices[0].calibration})}addEventListener(e,n,s){super.addEventListener(e,n,s)}onConfigChange(){this.dispatchEvent(new Event("on-config-changed"))}get calibration(){return this._calibration}set calibration(e){this._calibration={...this._calibration,...e},this.onConfigChange()}updateViewControls(e){e!=null&&(this._viewControls={...this._viewControls,...e},this.onConfigChange())}get tileHeight(){return this._viewControls.tileHeight}set tileHeight(e){this.updateViewControls({tileHeight:e})}get numViews(){return this._viewControls.numViews}set numViews(e){this.updateViewControls({numViews:e})}get targetX(){return this._viewControls.targetX}set targetX(e){this.updateViewControls({targetX:e})}get targetY(){return this._viewControls.targetY}set targetY(e){this.updateViewControls({targetY:e})}get targetZ(){return this._viewControls.targetZ}set targetZ(e){this.updateViewControls({targetZ:e})}get trackballX(){return this._viewControls.trackballX}set trackballX(e){this.updateViewControls({trackballX:e})}get trackballY(){return this._viewControls.trackballY}set trackballY(e){this.updateViewControls({trackballY:e})}get targetDiam(){return this._viewControls.targetDiam}set targetDiam(e){this.updateViewControls({targetDiam:e})}get fovy(){return this._viewControls.fovy}set fovy(e){this.updateViewControls({fovy:e})}get depthiness(){return this._viewControls.depthiness}set depthiness(e){this.updateViewControls({depthiness:e})}get inlineView(){return this._viewControls.inlineView}set inlineView(e){this.updateViewControls({inlineView:e})}get aspect(){return this._calibration.screenW.value/this._calibration.screenH.value}get tileWidth(){return Math.round(this.tileHeight*this.aspect)}get framebufferWidth(){const e=this.tileWidth*this.tileHeight*this.numViews;return 2**Math.ceil(Math.log2(Math.max(Math.sqrt(e),this.tileWidth)))}get quiltWidth(){return Math.floor(this.framebufferWidth/this.tileWidth)}get quiltHeight(){return Math.ceil(this.numViews/this.quiltWidth)}get framebufferHeight(){return 2**Math.ceil(Math.log2(this.quiltHeight*this.tileHeight))}get viewCone(){return this._calibration.viewCone.value*this.depthiness/180*Math.PI}get tilt(){return this._calibration.screenH.value/(this._calibration.screenW.value*this._calibration.slope.value)*(this._calibration.flipImageX.value?-1:1)}get subp(){return 1/(this._calibration.screenW.value*3)}get pitch(){const e=this._calibration.screenW.value/this._calibration.DPI.value;return this._calibration.pitch.value*e*Math.cos(Math.atan(1/this._calibration.slope.value))}}let j=null;function I(){return j==null&&(j=new ue),j}function Q(a){const t=I();a!=null&&t.updateViewControls(a)}function he(a){var M;const t=I(),e=document.createElement("style");document.head.appendChild(e),(M=e.sheet)==null||M.insertRule("#LookingGlassWebXRControls * { all: revert; font-family: sans-serif }");const n=document.createElement("div");n.id="LookingGlassWebXRControls",n.style.position="fixed",n.style.zIndex="1000",n.style.padding="15px",n.style.width="320px",n.style.maxWidth="calc(100vw - 18px)",n.style.maxHeight="calc(100vh - 18px)",n.style.whiteSpace="nowrap",n.style.background="rgba(0, 0, 0, 0.6)",n.style.color="white",n.style.borderRadius="10px",n.style.right="15px",n.style.bottom="15px";const s=document.createElement("div");n.appendChild(s),s.style.width="100%",s.style.textAlign="center",s.style.fontWeight="bold",s.innerText="Looking Glass Controls ";const r=document.createElement("div");n.appendChild(r),r.style.width="100%",r.style.whiteSpace="normal",r.style.color="rgba(255,255,255,0.7)",r.style.fontSize="14px",r.style.margin="5px 0",r.innerHTML="Click the popup and use WASD, mouse left/right drag, and scroll.";const l=document.createElement("input");s.appendChild(l),l.type="button",l.value="\u2190",l.dataset.otherValue="\u2192",l.onclick=()=>{[n.style.right,n.style.left]=[n.style.left,n.style.right],[l.value,l.dataset.otherValue]=[l.dataset.otherValue||"",l.value]};const o=document.createElement("div");n.appendChild(o);const d=(i,u,f)=>{const c=f.stringify,v=document.createElement("div");v.style.marginBottom="8px",o.appendChild(v);const R=i,_=t[i],p=document.createElement("label");if(v.appendChild(p),p.innerText=f.label,p.setAttribute("for",R),p.style.width="100px",p.style.display="inline-block",p.style.textDecoration="dotted underline 1px",p.style.fontFamily='"Courier New"',p.style.fontSize="13px",p.style.fontWeight="bold",p.title=f.title,u.type!=="checkbox"){const m=document.createElement("input");v.appendChild(m),m.type="button",m.value="\u238C",m.alt="reset",m.title="Reset value to default",m.style.padding="0 4px",m.onclick=L=>{h.value=_,h.oninput(L)}}const h=document.createElement("input");v.appendChild(h),Object.assign(h,u),h.id=R,h.title=f.title,h.value=u.value!==void 0?u.value:_;const W=m=>{t[i]=m,H(m)};h.oninput=()=>{const m=u.type==="range"?parseFloat(h.value):u.type==="checkbox"?h.checked:h.value;W(m)};const U=m=>{let L=m(t[i]);f.fixRange&&(L=f.fixRange(L),h.max=Math.max(parseFloat(h.max),L).toString(),h.min=Math.min(parseFloat(h.min),L).toString()),h.value=L,W(L)};u.type==="range"&&(h.style.width="110px",h.style.height="8px",h.onwheel=m=>{U(L=>L+Math.sign(m.deltaX-m.deltaY)*u.step)});let H=m=>{};if(c){const m=document.createElement("span");m.style.fontFamily='"Courier New"',m.style.fontSize="13px",m.style.marginLeft="3px",v.appendChild(m),H=L=>{m.innerHTML=c(L)},H(_)}return U};d("tileHeight",{type:"range",min:160,max:455,step:1},{label:"resolution",title:"resolution of each view",stringify:i=>`${(i*t.aspect).toFixed()}&times;${i.toFixed()}`}),d("numViews",{type:"range",min:1,max:145,step:1},{label:"views",title:"number of different viewing angles to render",stringify:i=>i.toFixed()});const N=d("trackballX",{type:"range",min:-Math.PI,max:1.0001*Math.PI,step:.5/180*Math.PI},{label:"trackball x",title:"camera trackball x",fixRange:i=>(i+Math.PI*3)%(Math.PI*2)-Math.PI,stringify:i=>`${(i/Math.PI*180).toFixed()}&deg;`}),T=d("trackballY",{type:"range",min:-.5*Math.PI,max:.5001*Math.PI,step:1/180*Math.PI},{label:"trackball y",title:"camera trackball y",fixRange:i=>Math.max(-.5*Math.PI,Math.min(i,.5*Math.PI)),stringify:i=>`${(i/Math.PI*180).toFixed()}&deg;`}),C=d("targetX",{type:"range",min:-20,max:20,step:.1},{label:"target x",title:"target position x",fixRange:i=>i,stringify:i=>i.toFixed(2)+" m"}),B=d("targetY",{type:"range",min:-20,max:20,step:.1},{label:"target y",title:"target position y",fixRange:i=>i,stringify:i=>i.toFixed(2)+" m"}),F=d("targetZ",{type:"range",min:-20,max:20,step:.1},{label:"target z",title:"target position z",fixRange:i=>i,stringify:i=>i.toFixed(2)+" m"});d("fovy",{type:"range",min:1/180*Math.PI,max:120.1/180*Math.PI,step:1/180*Math.PI},{label:"fov",title:"perspective fov (degrades stereo effect)",fixRange:i=>Math.max(1/180*Math.PI,Math.min(i,120.1/180*Math.PI)),stringify:i=>{const u=i/Math.PI*180,f=Math.atan(Math.tan(i/2)*t.aspect)*2/Math.PI*180;return`${u.toFixed()}&deg;&times;${f.toFixed()}&deg;`}}),d("depthiness",{type:"range",min:0,max:2,step:.01},{label:"depthiness",title:'exaggerates depth by multiplying the width of the view cone (as reported by the firmware) - can somewhat compensate for depthiness lost using higher fov. 1.25 seems to be most physically accurate on Looking Glass 8.9".',fixRange:i=>Math.max(0,i),stringify:i=>`${i.toFixed(2)}x`}),d("inlineView",{type:"range",min:0,max:2,step:1},{label:"inline view",title:"what to show inline on the original canvas (swizzled = no overwrite)",fixRange:i=>Math.max(0,Math.min(i,2)),stringify:i=>i===0?"swizzled":i===1?"center":i===2?"quilt":"?"}),a.oncontextmenu=i=>{i.preventDefault()},a.addEventListener("wheel",i=>{const u=t.targetDiam,f=1.1,c=Math.log(u)/Math.log(f);return t.targetDiam=Math.pow(f,c+i.deltaY*.01)}),a.addEventListener("mousemove",i=>{const u=i.movementX,f=-i.movementY;if(i.buttons&2||i.buttons&1&&(i.shiftKey||i.ctrlKey)){const c=t.trackballX,v=t.trackballY,R=-Math.cos(c)*u+Math.sin(c)*Math.sin(v)*f,_=-Math.cos(v)*f,p=Math.sin(c)*u+Math.cos(c)*Math.sin(v)*f;C(h=>h+R*t.targetDiam*.001),B(h=>h+_*t.targetDiam*.001),F(h=>h+p*t.targetDiam*.001)}else i.buttons&1&&(N(c=>c-u*.01),T(c=>c-f*.01))});const b={w:0,a:0,s:0,d:0};a.addEventListener("keydown",i=>{switch(i.code){case"KeyW":b.w=1;break;case"KeyA":b.a=1;break;case"KeyS":b.s=1;break;case"KeyD":b.d=1;break}}),a.addEventListener("keyup",i=>{switch(i.code){case"KeyW":b.w=0;break;case"KeyA":b.a=0;break;case"KeyS":b.s=0;break;case"KeyD":b.d=0;break}}),requestAnimationFrame(g);function g(){let i=b.d-b.a,u=b.w-b.s;i&&u&&(i*=Math.sqrt(.5),u*=Math.sqrt(.5));const f=t.trackballX,c=t.trackballY,v=Math.cos(f)*i-Math.sin(f)*Math.cos(c)*u,R=-Math.sin(c)*u,_=-Math.sin(f)*i-Math.cos(f)*Math.cos(c)*u;C(p=>p+v*t.targetDiam*.03),B(p=>p+R*t.targetDiam*.03),F(p=>p+_*t.targetDiam*.03),requestAnimationFrame(g)}return n}const D=Symbol("LookingGlassXRWebGLLayer");class fe extends de.default{constructor(t,e,n){super(t,e,n);const s=document.createElement("canvas");s.tabIndex=0;const r=s.getContext("2d",{alpha:!1});s.addEventListener("dblclick",function(){this.requestFullscreen()});const l=he(s),o=I(),d=this[K.PRIVATE].config,N=e.createTexture();let T,C;const B=e.createFramebuffer(),F=e.enable.bind(e),b=e.disable.bind(e),g=e.getExtension("OES_vertex_array_object"),M=34229,i=g?g.bindVertexArrayOES.bind(g):e.bindVertexArray.bind(e),u=()=>{const E=e.getParameter(e.TEXTURE_BINDING_2D);if(e.bindTexture(e.TEXTURE_2D,N),e.texImage2D(e.TEXTURE_2D,0,e.RGBA,o.framebufferWidth,o.framebufferHeight,0,e.RGBA,e.UNSIGNED_BYTE,null),e.texParameteri(e.TEXTURE_2D,e.TEXTURE_MIN_FILTER,e.LINEAR),e.bindTexture(e.TEXTURE_2D,E),T){const k=e.getParameter(e.RENDERBUFFER_BINDING);e.bindRenderbuffer(e.RENDERBUFFER,T),e.renderbufferStorage(e.RENDERBUFFER,C.format,o.framebufferWidth,o.framebufferHeight),e.bindRenderbuffer(e.RENDERBUFFER,k)}};(d.depth||d.stencil)&&(d.depth&&d.stencil?C={format:e.DEPTH_STENCIL,attachment:e.DEPTH_STENCIL_ATTACHMENT}:d.depth?C={format:e.DEPTH_COMPONENT16,attachment:e.DEPTH_ATTACHMENT}:d.stencil&&(C={format:e.STENCIL_INDEX8,attachment:e.STENCIL_ATTACHMENT}),T=e.createRenderbuffer()),u(),o.addEventListener("on-config-changed",u);const f=e.getParameter(e.FRAMEBUFFER_BINDING);e.bindFramebuffer(e.FRAMEBUFFER,B),e.framebufferTexture2D(e.FRAMEBUFFER,e.COLOR_ATTACHMENT0,e.TEXTURE_2D,N,0),(d.depth||d.stencil)&&e.framebufferRenderbuffer(e.FRAMEBUFFER,C.attachment,e.RENDERBUFFER,T),e.bindFramebuffer(e.FRAMEBUFFER,f);const c=e.createProgram(),v=e.createShader(e.VERTEX_SHADER);e.attachShader(c,v);const R=e.createShader(e.FRAGMENT_SHADER);e.attachShader(c,R);{const E=`
       attribute vec2 a_position;
       varying vec2 v_texcoord;
       void main() {
         gl_Position = vec4(a_position * 2.0 - 1.0, 0.0, 1.0);
         v_texcoord = a_position;
       }
     `;e.shaderSource(v,E),e.compileShader(v),e.getShaderParameter(v,e.COMPILE_STATUS)||console.warn(e.getShaderInfoLog(v))}let _,p,h;const W=()=>{const E=z.Shader(o);if(E===_)return;if(_=E,e.shaderSource(R,E),e.compileShader(R),!e.getShaderParameter(R,e.COMPILE_STATUS)){console.warn(e.getShaderInfoLog(R));return}if(e.linkProgram(c),!e.getProgramParameter(c,e.LINK_STATUS)){console.warn(e.getProgramInfoLog(c));return}p=e.getAttribLocation(c,"a_position"),h=e.getUniformLocation(c,"u_viewType");const k=e.getUniformLocation(c,"u_texture"),V=e.getParameter(e.CURRENT_PROGRAM);e.useProgram(c),e.uniform1i(k,0),e.useProgram(V)};o.addEventListener("on-config-changed",W);const U=g?g.createVertexArrayOES():e.createVertexArray(),H=e.createBuffer(),m=e.getParameter(e.ARRAY_BUFFER_BINDING),L=e.getParameter(M);i(U),e.bindBuffer(e.ARRAY_BUFFER,H),e.bufferData(e.ARRAY_BUFFER,new Float32Array([0,0,1,0,0,1,0,1,1,0,1,1]),e.STATIC_DRAW),e.enableVertexAttribArray(p),e.vertexAttribPointer(p,2,e.FLOAT,!1,0,0),i(L),e.bindBuffer(e.ARRAY_BUFFER,m);const Ee=()=>{console.assert(this[D].LookingGlassEnabled),e.bindFramebuffer(e.FRAMEBUFFER,this.framebuffer);const E=e.getParameter(e.COLOR_CLEAR_VALUE),k=e.getParameter(e.DEPTH_CLEAR_VALUE),V=e.getParameter(e.STENCIL_CLEAR_VALUE);e.clearColor(0,0,0,0),e.clearDepth(1),e.clearStencil(0),e.clear(e.DEPTH_BUFFER_BIT|e.COLOR_BUFFER_BIT|e.STENCIL_BUFFER_BIT),e.clearColor(E[0],E[1],E[2],E[3]),e.clearDepth(k),e.clearStencil(V)},A=e.canvas;let J,ee;const Re=()=>{if(!this[D].LookingGlassEnabled)return;(A.width!==o.calibration.screenW.value||A.height!==o.calibration.screenH.value)&&(J=A.width,ee=A.height,A.width=o.calibration.screenW.value,A.height=o.calibration.screenH.value);const E=e.getParameter(M),k=e.getParameter(e.CULL_FACE),V=e.getParameter(e.BLEND),te=e.getParameter(e.DEPTH_TEST),Te=e.getParameter(e.STENCIL_TEST),_e=e.getParameter(e.SCISSOR_TEST),Le=e.getParameter(e.VIEWPORT),Pe=e.getParameter(e.FRAMEBUFFER_BINDING),Se=e.getParameter(e.RENDERBUFFER_BINDING),Ce=e.getParameter(e.CURRENT_PROGRAM),Fe=e.getParameter(e.ACTIVE_TEXTURE);{const Me=e.getParameter(e.TEXTURE_BINDING_2D);e.bindFramebuffer(e.FRAMEBUFFER,null),e.useProgram(c),i(U),e.activeTexture(e.TEXTURE0),e.bindTexture(e.TEXTURE_2D,N),e.disable(e.BLEND),e.disable(e.CULL_FACE),e.disable(e.DEPTH_TEST),e.disable(e.STENCIL_TEST),e.viewport(0,0,e.drawingBufferWidth,e.drawingBufferHeight),e.uniform1i(h,0),e.drawArrays(e.TRIANGLES,0,6),r==null||r.clearRect(0,0,s.width,s.height),r==null||r.drawImage(A,0,0),o.inlineView!==0&&(e.uniform1i(h,o.inlineView),e.drawArrays(e.TRIANGLES,0,6)),e.bindTexture(e.TEXTURE_2D,Me)}e.activeTexture(Fe),e.useProgram(Ce),e.bindRenderbuffer(e.RENDERBUFFER,Se),e.bindFramebuffer(e.FRAMEBUFFER,Pe),e.viewport(...Le),(_e?F:b)(e.SCISSOR_TEST),(Te?F:b)(e.STENCIL_TEST),(te?F:b)(e.DEPTH_TEST),(V?F:b)(e.BLEND),(k?F:b)(e.CULL_FACE),i(E)};let S;window.addEventListener("unload",()=>{S&&S.close(),S=void 0});const xe=(E,k)=>{var V;!!S!=E&&(E?(W(),s.style.position="fixed",s.style.top="0",s.style.left="0",s.style.width="100%",s.style.height="100%",s.width=o.calibration.screenW.value,s.height=o.calibration.screenH.value,document.body.appendChild(l),"getScreenDetails"in window?this.placeWindow(S,s,o):(S=window.open("",void 0,"width=640,height=360"),S.document.title="Looking Glass Window (fullscreen me on Looking Glass!)",S.document.body.style.background="black",S.document.body.appendChild(s),console.assert(k),S.onbeforeunload=k)):((V=l.parentElement)==null||V.removeChild(l),A.width=J,A.height=ee,S.onbeforeunload=void 0,S.close(),S=void 0))};this[D]={LookingGlassEnabled:!1,framebuffer:B,clearFramebuffer:Ee,blitTextureToDefaultFramebufferIfNeeded:Re,moveCanvasToWindow:xe}}async placeWindow(t,e,n){const s=await window.getScreenDetails();console.log(s,"cached screen details");const r=s.screens.filter(o=>o.label.includes("LKG"))[0];console.log(r),console.log("monitor ID",r.label,"serial number",n._calibration.serial);const l=[`left=${r.left}`,`top=${r.top}`,`width=${r.width}`,`height=${r.height}`,"menubar=no","toolbar=no","location=no","status=no","resizable=yes","scrollbars=no","fullscreenEnabled=true"].join(",");t=window.open("","new",l),console.log(t),t.document.body.style.background="black",t.document.body.appendChild(e),await e.requestFullscreen()}get framebuffer(){return this[D].LookingGlassEnabled?this[D].framebuffer:null}get framebufferWidth(){return I().framebufferWidth}get framebufferHeight(){return I().framebufferHeight}}class me extends le.default{constructor(t){super(t),this.sessions=new Map,this.viewSpaces=[],this.basePoseMatrix=w.mat4.create(),this.inlineProjectionMatrix=w.mat4.create(),this.inlineInverseViewMatrix=w.mat4.create(),this.LookingGlassProjectionMatrices=[],this.LookingGlassInverseViewMatrices=[]}onBaseLayerSet(t,e){const n=this.sessions.get(t);n.baseLayer=e;const s=e[D];s.LookingGlassEnabled=n.immersive,n.immersive&&s.moveCanvasToWindow(!0,()=>{this.endSession(t)})}isSessionSupported(t){return t==="inline"||t==="immersive-vr"}isFeatureSupported(t){switch(t){case"viewer":return!0;case"local":return!0;case"local-floor":return!0;case"bounded-floor":return!1;case"unbounded":return!1;default:return console.warn("LookingGlassXRDevice.isFeatureSupported: feature not understood:",t),!1}}async requestSession(t,e){if(!this.isSessionSupported(t))return Promise.reject();const n=t!=="inline",s=new be(t,e);return this.sessions.set(s.id,s),n&&this.dispatchEvent("@@webxr-polyfill/vr-present-start",s.id),Promise.resolve(s.id)}requestAnimationFrame(t){return this.global.requestAnimationFrame(t)}cancelAnimationFrame(t){this.global.cancelAnimationFrame(t)}onFrameStart(t,e){const n=this.sessions.get(t),s=I();if(n.immersive){const r=Math.tan(.5*s.fovy),l=.5*s.targetDiam/r,o=l-s.targetDiam,d=this.basePoseMatrix;w.mat4.fromTranslation(d,[s.targetX,s.targetY,s.targetZ]),w.mat4.rotate(d,d,s.trackballX,[0,1,0]),w.mat4.rotate(d,d,-s.trackballY,[1,0,0]),w.mat4.translate(d,d,[0,0,l]);for(let T=0;T<s.numViews;++T){const C=(T+.5)/s.numViews-.5,B=Math.tan(s.viewCone*C),F=l*B,b=this.LookingGlassInverseViewMatrices[T]=this.LookingGlassInverseViewMatrices[T]||w.mat4.create();w.mat4.translate(b,d,[F,0,0]),w.mat4.invert(b,b);const g=Math.max(o+e.depthNear,.01),M=o+e.depthFar,i=g*r,u=i,f=-i,c=g*-B,v=s.aspect*i,R=c+v,_=c-v,p=this.LookingGlassProjectionMatrices[T]=this.LookingGlassProjectionMatrices[T]||w.mat4.create();w.mat4.set(p,2*g/(R-_),0,0,0,0,2*g/(u-f),0,0,(R+_)/(R-_),(u+f)/(u-f),-(M+g)/(M-g),-1,0,0,-2*M*g/(M-g),0)}n.baseLayer[D].clearFramebuffer()}else{const r=n.baseLayer.context,l=r.drawingBufferWidth/r.drawingBufferHeight;w.mat4.perspective(this.inlineProjectionMatrix,e.inlineVerticalFieldOfView,l,e.depthNear,e.depthFar),w.mat4.fromTranslation(this.basePoseMatrix,[0,Y,0]),w.mat4.invert(this.inlineInverseViewMatrix,this.basePoseMatrix)}}onFrameEnd(t){this.sessions.get(t).baseLayer[D].blitTextureToDefaultFramebufferIfNeeded()}async requestFrameOfReferenceTransform(t,e){const n=w.mat4.create();switch(t){case"viewer":case"local":return w.mat4.fromTranslation(n,[0,-Y,0]),n;case"local-floor":return n;default:throw new Error("XRReferenceSpaceType not understood")}}endSession(t){const e=this.sessions.get(t);e.immersive&&e.baseLayer&&(e.baseLayer[D].moveCanvasToWindow(!1),this.dispatchEvent("@@webxr-polyfill/vr-present-end",t)),e.ended=!0}doesSessionSupportReferenceSpace(t,e){const n=this.sessions.get(t);return n.ended?!1:n.enabledFeatures.has(e)}getViewSpaces(t){if(t==="immersive-vr"){const e=I();for(let n=this.viewSpaces.length;n<e.numViews;++n)this.viewSpaces[n]=new ye(n);return this.viewSpaces.length=e.numViews,this.viewSpaces}}getViewport(t,e,n,s,r){if(r===void 0){const o=this.sessions.get(t).baseLayer.context;s.x=0,s.y=0,s.width=o.drawingBufferWidth,s.height=o.drawingBufferHeight}else{const l=I(),o=r%l.quiltWidth,d=Math.floor(r/l.quiltWidth);s.x=l.tileWidth*o,s.y=l.tileHeight*d,s.width=l.tileWidth,s.height=l.tileHeight}return!0}getProjectionMatrix(t,e){return e===void 0?this.inlineProjectionMatrix:this.LookingGlassProjectionMatrices[e]||w.mat4.create()}getBasePoseMatrix(){return this.basePoseMatrix}getBaseViewMatrix(){return this.inlineInverseViewMatrix}_getViewMatrixByIndex(t){return this.LookingGlassInverseViewMatrices[t]=this.LookingGlassInverseViewMatrices[t]||w.mat4.create()}getInputSources(){return[]}getInputPose(t,e,n){return null}onWindowResize(){}}let pe=0;class be{constructor(t,e){x(this,"mode");x(this,"immersive");x(this,"id");x(this,"baseLayer");x(this,"inlineVerticalFieldOfView");x(this,"ended");x(this,"enabledFeatures");this.mode=t,this.immersive=t==="immersive-vr"||t==="immersive-ar",this.id=++pe,this.baseLayer=null,this.inlineVerticalFieldOfView=Math.PI*.5,this.ended=!1,this.enabledFeatures=e}}class ye extends ce.default{constructor(e){super();x(this,"viewIndex");this.viewIndex=e}get eye(){return"none"}_onPoseUpdate(e){this._inverseBaseMatrix=e._getViewMatrixByIndex(this.viewIndex)}}class O extends oe.default{constructor(e){super();x(this,"vrButton");x(this,"device");x(this,"isPresenting",!1);Q(e),this.loadPolyfill()}static async init(e){await O.detectLookingGlassDevice()&&new O(e)}static async detectLookingGlassDevice(){return new Promise(e=>{new Z.Client(async n=>{console.log(n,"message from core"),n.devices.length>0?e(!0):e(!1)})})}async loadPolyfill(){this.overrideDefaultVRButton(),console.warn('Looking Glass WebXR "polyfill" overriding native WebXR API.');for(const e in $.default)this.global[e]=$.default[e];this.global.XRWebGLLayer=fe,this.injected=!0,this.device=new me(this.global),this.xr=new re.default(Promise.resolve(this.device)),Object.defineProperty(this.global.navigator,"xr",{value:this.xr,configurable:!0})}async overrideDefaultVRButton(){this.vrButton=await ve("VRButton"),this.vrButton&&this.device&&(this.device.addEventListener("@@webxr-polyfill/vr-present-start",()=>{this.isPresenting=!0,this.updateVRButtonUI()}),this.device.addEventListener("@@webxr-polyfill/vr-present-end",()=>{this.isPresenting=!1,this.updateVRButtonUI()}),this.vrButton.addEventListener("click",e=>{this.updateVRButtonUI()}),this.updateVRButtonUI())}async updateVRButtonUI(){if(this.vrButton){await we(100),this.isPresenting?this.vrButton.innerHTML="EXIT LOOKING GLASS":this.vrButton.innerHTML="ENTER LOOKING GLASS";const e=220;this.vrButton.style.width=`${e}px`,this.vrButton.style.left=`calc(50% - ${e/2}px)`}}update(e){Q(e)}}async function ve(a){return new Promise((t,e)=>{const n=new MutationObserver(function(s){s.forEach(function(r){r.addedNodes.forEach(function(l){const o=l;o.id==a&&(t(o),n.disconnect())})})});n.observe(document.body,{subtree:!1,childList:!0}),setTimeout(()=>{n.disconnect(),e(`id:${a} not found`)},5e3)})}function we(a){return new Promise(t=>setTimeout(t,a))}const ge=I();y.LookingGlassConfig=ge,y.LookingGlassWebXRPolyfill=O,Object.defineProperties(y,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
