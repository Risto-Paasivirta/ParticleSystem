(this.webpackJsonpeditor=this.webpackJsonpeditor||[]).push([[0],{25:function(e,t,n){},26:function(e,t,n){},27:function(e,t,n){},28:function(e,t,n){},29:function(e,t,n){},31:function(e,t,n){},32:function(e,t,n){},33:function(e,t,n){},34:function(e,t,n){},35:function(e,t,n){},36:function(e,t,n){},37:function(e,t,n){},38:function(e,t,n){},39:function(e,t,n){},49:function(e,t,n){},50:function(e,t,n){},51:function(e,t,n){"use strict";n.r(t);var i=n(3),a=n.n(i),r=n(17),c=n.n(r),o=n(9),u=n(6),l=n(7),s=(n(25),n(26),n(27),n(28),n(29),n(0)),d=function(e){var t=e.value,n=e.name,i=e.propertyInfo,a=e.onChange,r=i.tooltip,c=i.min,o=i.max,u=i.step;return Object(s.jsxs)("div",{className:"number-layout field",children:[Object(s.jsx)("span",{className:"number-name",title:r,children:n}),Object(s.jsx)("input",{className:"number-field",type:"number",value:t,min:c,max:o,step:u,onChange:function(e){var t;try{t=Number(e.target.value)}catch(e){console.warn("NumberProperty could not parse Number")}a(t)}})]})},f=(n(31),function(e){var t=e.name;e.propertyInfo,e.onChange;return Object(s.jsxs)("div",{className:"position-div field",children:[Object(s.jsx)("span",{children:t}),Object(s.jsx)("span",{children:"Position*"})]})}),h=(n(32),function(e){var t=e.name;e.propertyInfo,e.onChange;return Object(s.jsxs)("div",{className:"range-div field",children:[Object(s.jsx)("span",{children:t}),Object(s.jsx)("span",{children:"Range*"})]})}),p=(n(33),function(e){var t=e.name;e.propertyInfo,e.onChange;return Object(s.jsxs)("div",{className:"colorPalette-div field",children:[Object(s.jsx)("span",{children:t}),Object(s.jsx)("span",{children:"Color[]*"})]})}),m=(n(34),function(e){var t=e.name,n=e.value,a=e.onChange,r=Object(i.useContext)(je).easingFunctions;return Object(s.jsxs)("div",{className:"easingFunction-div field",children:[Object(s.jsx)("span",{className:"easingFunction-name",children:t}),Object(s.jsx)("select",{className:"easingFunction-dropdown",value:n,onChange:function(e){var t=e.target.value;a(t)},children:r.map((function(e){return Object(s.jsx)("option",{className:"easingFunction-option",children:e},e)}))})]})}),v=(n(35),function(e){var t=e.name;e.propertyInfo,e.onChange;return Object(s.jsxs)("div",{className:"shape-div field",children:[Object(s.jsx)("span",{children:t}),Object(s.jsx)("span",{children:"Shape*"})]})}),j=(n(36),function(e){var t=e.name;e.propertyInfo,e.onChange;return Object(s.jsxs)("div",{className:"burstListProperty-div field",children:[Object(s.jsx)("span",{children:t}),Object(s.jsx)("span",{children:"BurstList*"})]})}),b=function(e){var t=e.propertyInfo,n=e.nKey;switch(t.type){case"Number":return Object(i.createElement)(d,Object(u.a)(Object(u.a)({},e),{},{key:n}));case"Position":return Object(i.createElement)(f,Object(u.a)(Object(u.a)({},e),{},{key:n}));case"Range":return Object(i.createElement)(h,Object(u.a)(Object(u.a)({},e),{},{key:n}));case"Color[]":return Object(i.createElement)(p,Object(u.a)(Object(u.a)({},e),{},{key:n}));case"EasingFunction":return Object(i.createElement)(m,Object(u.a)(Object(u.a)({},e),{},{key:n}));case"Shape":return Object(i.createElement)(v,Object(u.a)(Object(u.a)({},e),{},{key:n}));case"Burst[]":return Object(i.createElement)(j,Object(u.a)(Object(u.a)({},e),{},{key:n}));default:throw new Error("Unidentified module property type: ".concat(t.type))}},y=function(e){var t=e.module,n=e.nKey,a=e.updateModule,r=e.removeModule,c=Object(i.useContext)(je).particleModules,o=c.find((function(e){return e.moduleTypeId===t.moduleTypeId}));if(!o)throw new Error("Unidentified module: ".concat(t.moduleTypeId));return Object(s.jsxs)("div",{className:"module",children:[Object(s.jsxs)("div",{className:"module-title-layout field",children:[Object(s.jsx)("select",{className:"module-typeDropdown",value:t.moduleTypeId,onChange:function(e){var t=e.target.value;a({moduleTypeId:t})},children:c.sort((function(e,t){return e.moduleTypeId.localeCompare(t.moduleTypeId)})).map((function(e,t){return Object(s.jsx)("option",{value:e.moduleTypeId,children:e.moduleTypeId},"module-".concat(t))}))}),Object(s.jsx)("div",{className:"module-remove",onClick:function(){return r()}})]}),Object(s.jsx)("div",{className:"module-properties",children:Object.entries(o.properties).map((function(e,i){var r=Object(l.a)(e,2),c=r[0],o=r[1];return Object(s.jsx)(b,{name:c,value:t[c],propertyInfo:o,nKey:"".concat(n,"_property").concat(i),onChange:function(e){var n=Object(u.a)({},t);n[c]=e,a(n)}},"".concat(n,"_property").concat(i))}))})]})},O=(n(37),function(e){var t=e.selectedTextures,n=e.updateTextures,a=Object(i.useContext)(je).availableTextures;return Object(s.jsx)("select",{className:"textureSelector-dropdown field",onChange:function(e){var t=e.target.value;n([t])},value:t[0],children:Object.entries(a).sort((function(e,t){return e[0].localeCompare(t[0])})).map((function(e,t){var n=Object(l.a)(e,2),i=n[0];n[1];return Object(s.jsx)("option",{className:"textureSelector-option",children:i},"texture-".concat(t))}))})}),x=function(e){var t=e.effect,n=e.title,a=e.nKey,r=e.updateEffect,c=e.removeEffect,o=Object(i.useContext)(je).particleModules;return Object(s.jsxs)("div",{className:"effect",children:[Object(s.jsxs)("div",{className:"effect-titleDiv",children:[Object(s.jsx)("span",{className:"effect-title",children:n}),Object(s.jsx)("div",{className:"effect-remove",onClick:function(){c()}})]}),Object(s.jsxs)("div",{className:"effect-properties",children:[Object(s.jsx)(O,{selectedTextures:t.textures,updateTextures:function(e){var n=Object(u.a)(Object(u.a)({},t),{},{textures:e});r(n)}}),Object(s.jsxs)("div",{className:"effect-addModuleDiv field",onClick:function(){var e={moduleTypeId:o[0].moduleTypeId},n=Object(u.a)({},t);n.modules.unshift(e),r(n)},children:[Object(s.jsx)("div",{className:"effect-addModule"}),Object(s.jsx)("span",{children:"Add module"})]}),t.modules.map((function(e,n){return Object(s.jsx)(y,{module:e,nKey:"".concat(a,"_module").concat(n),updateModule:function(e){var i=Object(u.a)({},t);i.modules[n]=e,r(i)},removeModule:function(){var n=Object(u.a)({},t);n.modules.splice(n.modules.indexOf(e),1),r(n)}},"".concat(a,"_module").concat(n))}))]})]})},g=function(e){var t=e.effects,n=e.updateEffects;return Object(s.jsxs)("div",{className:"effectsConfigurationPanel",children:[Object(s.jsxs)("div",{className:"effectsConfigurationPanel-addDiv field",onClick:function(){var e=Object(o.a)(t);e.unshift({textures:["generic/ball.png"],modules:[]}),n(e)},children:[Object(s.jsx)("div",{className:"effectsConfigurationPanel-add"}),"Add effect"]}),Object(s.jsx)("span",{className:"effectsConfigurationPanel-titleEffects"}),t.map((function(e,i){return Object(s.jsx)(x,{effect:e,title:"Effect ".concat(i+1),nKey:"effect".concat(i),updateEffect:function(e){var a=Object(o.a)(t);a[i]=e,n(a)},removeEffect:function(){var i=Object(o.a)(t);i.splice(i.indexOf(e),1),n(i)}},"effect".concat(i))})),Object(s.jsx)("div",{className:"effectsConfigurationPanel-footer"})]})},P=(n(38),function(e){var t=e.restart,n=e.saveToFile;return Object(s.jsxs)("div",{className:"projectToolbar",children:[Object(s.jsx)("div",{className:"projectToolbar-gap"}),Object(s.jsxs)("div",{className:"projectToolBar-buttons",children:[Object(s.jsx)("div",{className:"projectToolbar-buttonDiv projectToolbar-restart",onClick:function(){return t()},children:Object(s.jsx)("span",{className:"projectToolbar-button",children:"Restart"})}),Object(s.jsx)("div",{className:"projectToolbar-buttonDiv projectToolbar-saveToFile",onClick:function(){return n()},children:Object(s.jsx)("span",{className:"projectToolbar-button",children:"Save to file"})}),Object(s.jsx)("div",{className:"projectToolbar-buttonDiv projectToolbar-loadPreset",onClick:function(){},children:Object(s.jsx)("span",{className:"projectToolbar-button",children:"Load preset"})}),Object(s.jsx)("div",{className:"projectToolbar-buttonDiv projectToolbar-loadFromFile",onClick:function(){},children:Object(s.jsx)("span",{className:"projectToolbar-button",children:"Load from file"})})]}),Object(s.jsx)("div",{className:"projectToolbar-gap"})]})}),T=(n(39),n(8)),I=n(1),M=n(2),k=n(5),E=n(4),w=function(){function e(t){Object(I.a)(this,e),this.active=!0,this.particleEffect=t}return Object(M.a)(e,[{key:"init",value:function(){}},{key:"update",value:function(e){}}]),e}(),S=function(e){Object(k.a)(n,e);var t=Object(E.a)(n);function n(){return Object(I.a)(this,n),t.apply(this,arguments)}return Object(M.a)(n,[{key:"update",value:function(e){for(var t=this.particleEffect.particles.length,n=0;n<t;n+=1){var i=this.particleEffect.particles[n];i.alpha<=0&&this.particleEffect.destroyParticle(i)}}},{key:"toObject",value:function(){return{moduleTypeId:n.moduleTypeId}}}],[{key:"fromObject",value:function(e,t,i){return new n(e)}}]),n}(w);S.moduleTypeId="AlphaDestructor";var N=function(e){Object(k.a)(n,e);var t=Object(E.a)(n);function n(){return Object(I.a)(this,n),t.apply(this,arguments)}return Object(M.a)(n,[{key:"update",value:function(e){for(var t=this.particleEffect.particles.length,n=0;n<t;n+=1){var i=this.particleEffect.particles[n];i.timeLived>=i.lifeTime&&this.particleEffect.destroyParticle(i)}}},{key:"toObject",value:function(){return{moduleTypeId:n.moduleTypeId}}}],[{key:"fromObject",value:function(e,t,i){return new n(e)}}]),n}(w);N.moduleTypeId="LifeTimeDestructor";var C=function(e,t,n,i,a,r){var c=e[i];if(void 0!==c){var o=a(c);void 0!==o?n[i]=o:r||console.warn("Module property could not be deserialized ".concat(t.moduleTypeId,': "').concat(i,'"'))}else r||console.warn("Missing module property ".concat(t.moduleTypeId,': "').concat(i,'"'))},A=function(e){return e},L=function(e,t,n){return e*(1-n)+t*n},D=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1;return Math.min(n,Math.max(t,e))},R=function(e,t){return e+Math.random()*(t-e)},F={subtract:function(e,t){return{x:e.x-t.x,y:e.y-t.y}},multiply:function(e,t){return{x:e.x*t,y:e.y*t}},length:function(e){return Math.sqrt(Math.pow(e.x,2)+Math.pow(e.y,2))},normalize:function(e){var t=F.length(e);return 0===t?{x:0,y:0}:{x:e.x/t,y:e.y/t}}},_=function(e,t,n){var i=V(e),a=V(t),r={l:L(i.l,a.l,n),a:L(i.a,a.a,n),b:L(i.b,a.b,n)},c=B(r);return{r:c.r,g:c.g,b:c.b}},V=function(e){var t,n,i,a=e.r,r=e.g,c=e.b;return n=(.2126*(a=a>.04045?Math.pow((a+.055)/1.055,2.4):a/12.92)+.7152*(r=r>.04045?Math.pow((r+.055)/1.055,2.4):r/12.92)+.0722*(c=c>.04045?Math.pow((c+.055)/1.055,2.4):c/12.92))/1,i=(.0193*a+.1192*r+.9505*c)/1.08883,t=(t=(.4124*a+.3576*r+.1805*c)/.95047)>.008856?Math.pow(t,1/3):7.787*t+16/116,{l:116*(n=n>.008856?Math.pow(n,1/3):7.787*n+16/116)-16,a:500*(t-n),b:200*(n-(i=i>.008856?Math.pow(i,1/3):7.787*i+16/116))}},B=function(e){var t,n,i,a=(e.l+16)/116,r=e.a/500+a,c=a-e.b/200;return n=-.9689*(r=.95047*(r*r*r>.008856?r*r*r:(r-16/116)/7.787))+1.8758*(a=1*(a*a*a>.008856?a*a*a:(a-16/116)/7.787))+.0415*(c=1.08883*(c*c*c>.008856?c*c*c:(c-16/116)/7.787)),i=.0557*r+-.204*a+1.057*c,t=(t=3.2406*r+-1.5372*a+-.4986*c)>.0031308?1.055*Math.pow(t,1/2.4)-.055:12.92*t,n=n>.0031308?1.055*Math.pow(n,1/2.4)-.055:12.92*n,i=i>.0031308?1.055*Math.pow(i,1/2.4)-.055:12.92*i,{r:Math.max(0,Math.min(1,t)),g:Math.max(0,Math.min(1,n)),b:Math.max(0,Math.min(1,i))}},z={getRandomPosition:function(e){return{x:e.v1.x+Math.random()*(e.v2.x-e.v1.x),y:e.v1.y+Math.random()*(e.v2.y-e.v1.y)}},getRandomEdgePosition:function(e){var t=Math.abs(e.v1.x-e.v2.x),n=Math.abs(e.v1.y-e.v2.y),i=R(0,2*t+2*n);return i<n?{x:e.v1.x,y:e.v1.y+i}:i<t+n?{x:e.v1.x+i-n,y:e.v1.y+n}:i<2*n+t?{x:e.v1.x+t,y:e.v1.y+i-(n+t)}:{x:e.v1.x+i-(2*n+t),y:e.v1.y}},containsPosition:function(e,t){var n=Math.min(e.v1.x,e.v2.x),i=Math.min(e.v1.y,e.v2.y),a=Math.max(e.v1.x,e.v2.x),r=Math.max(e.v1.y,e.v2.y);return t.x>=n&&t.x<=a&&t.y>=i&&t.y<=r}},G={getRandomPosition:function(e){var t=Math.random(),n=Math.random(),i=Math.sqrt(t);return{x:e.v1.x*(1-i)+e.v2.x*(1-n)*i+e.v3.x*n*i,y:e.v1.y*(1-i)+e.v2.y*(1-n)*i+e.v3.y*n*i}},containsPosition:function(e,t){var n=K(t,e.v1,e.v2),i=K(t,e.v2,e.v3),a=K(t,e.v3,e.v1);return!((n<0||i<0||a<0)&&(n>0||i>0||a>0))},getRandomEdgePosition:function(e){throw new Error("Function not implemented.")}},K=function(e,t,n){return(e.x-n.x)*(t.y-n.y)-(t.x-n.x)*(e.y-n.y)},X=function(e){return e},Y=function(e){switch(e.type){case"triangle":return G;case"rectangle":return z}},U=function(e){Object(k.a)(n,e);var t=Object(E.a)(n);function n(){return Object(I.a)(this,n),t.apply(this,arguments)}return Object(M.a)(n,[{key:"update",value:function(e){var t,n,i=this.particleEffect.particles.length;if(this.bounds)for(var a=0;a<i;a+=1){var r=this.particleEffect.particles[a];t=this.bounds,n=r.position,Y(t).containsPosition(t,n)||this.particleEffect.destroyParticle(r)}}},{key:"toObject",value:function(){return{moduleTypeId:n.moduleTypeId,bounds:this.bounds&&this.bounds}}}],[{key:"fromObject",value:function(e,t,i){var a=new n(e);return C(t,n,a,"bounds",X,i),a}}]),n}(w);U.moduleTypeId="OutsideBoundsDestructor";var q=Object(M.a)((function e(){Object(I.a)(this,e),this.position={x:0,y:0},this.velocity={x:0,y:0},this.color={r:1,g:1,b:1},this.alpha=1,this.rotation=0,this.rotationalVelocity=0,this.timeLived=0,this.lifeTime=2,this.scale=.1,this.destroyed=!1,this.texture=""})),J=function(e){Object(k.a)(n,e);var t=Object(E.a)(n);function n(){var e;return Object(I.a)(this,n),(e=t.apply(this,arguments)).interval=.1,e._timer=0,e.bursts=[],e._updateCounter=0,e}return Object(M.a)(n,[{key:"update",value:function(e){var t=this,n=this._updateCounter,i=this._updateCounter+e;if(this.bursts.forEach((function(e){if(e.time>=n&&e.time<=i)for(var a=0;a<e.count;a+=1)t.generateParticle()})),this._updateCounter=i,!(this.interval<=0))for(this._timer+=e;this._timer>=this.interval;)this._timer-=this.interval,this.generateParticle()}}]),n}(w),W=function(e){Object(k.a)(n,e);var t=Object(E.a)(n);function n(){var e;return Object(I.a)(this,n),(e=t.apply(this,arguments)).center={x:0,y:0},e.radius=50,e.nextParticleAngle=0,e.angleStep=.5,e}return Object(M.a)(n,[{key:"generateParticle",value:function(){var e=new q;e.position.x=this.center.x+Math.cos(this.nextParticleAngle)*this.radius,e.position.y=this.center.y+Math.sin(this.nextParticleAngle)*this.radius,this.nextParticleAngle+=this.angleStep,this.particleEffect.addParticle(e)}},{key:"toObject",value:function(){return{moduleTypeId:n.moduleTypeId,center:this.center,radius:this.radius,nextParticleAngle:this.nextParticleAngle,angleStep:this.angleStep}}}],[{key:"fromObject",value:function(e,t,i){var a=new n(e);return C(t,n,a,"center",A,i),C(t,n,a,"radius",A,i),C(t,n,a,"nextParticleAngle",A,i),C(t,n,a,"angleStep",A,i),a}}]),n}(J);W.moduleTypeId="CircleExteriorGenerator";var H=function(e){Object(k.a)(n,e);var t=Object(E.a)(n);function n(){var e;return Object(I.a)(this,n),(e=t.apply(this,arguments)).position={x:0,y:0},e}return Object(M.a)(n,[{key:"generateParticle",value:function(){var e=new q;e.position.x=this.position.x,e.position.y=this.position.y,this.particleEffect.addParticle(e)}},{key:"toObject",value:function(){return{moduleTypeId:n.moduleTypeId,interval:this.interval,position:this.position}}}],[{key:"fromObject",value:function(e,t,i){var a=new n(e);return C(t,n,a,"interval",A,i),C(t,n,a,"position",A,i),a}}]),n}(J);H.moduleTypeId="PointGenerator";var Q=function(e){Object(k.a)(n,e);var t=Object(E.a)(n);function n(){var e;return Object(I.a)(this,n),(e=t.apply(this,arguments)).min=0,e.max=1,e.handleParticleAdd=function(t){t.alpha=R(e.min,e.max)},e}return Object(M.a)(n,[{key:"init",value:function(){this.active=!1,this.particleEffect.addParticleListeners.push(this.handleParticleAdd)}},{key:"toObject",value:function(){return{moduleTypeId:n.moduleTypeId,min:this.min,max:this.max}}}],[{key:"fromObject",value:function(e,t,i){var a=new n(e);return C(t,n,a,"min",A,i),C(t,n,a,"max",A,i),a}}]),n}(w);Q.moduleTypeId="AlphaRange";var Z=function(e){Object(k.a)(n,e);var t=Object(E.a)(n);function n(){var e;return Object(I.a)(this,n),(e=t.apply(this,arguments)).min=1.5,e.max=2.5,e.handleParticleAdd=function(t){t.lifeTime=L(e.min,e.max,Math.random())},e}return Object(M.a)(n,[{key:"init",value:function(){this.active=!1,this.particleEffect.addParticleListeners.push(this.handleParticleAdd)}},{key:"toObject",value:function(){return{moduleTypeId:n.moduleTypeId,min:this.min,max:this.max}}}],[{key:"fromObject",value:function(e,t,i){var a=new n(e);return C(t,n,a,"min",A,i),C(t,n,a,"max",A,i),a}}]),n}(w);Z.moduleTypeId="LifeTimeRange";var $=function(e){Object(k.a)(n,e);var t=Object(E.a)(n);function n(){var e;return Object(I.a)(this,n),(e=t.apply(this,arguments)).min=0,e.max=100,e.handleParticleAdd=function(t){var n=2*Math.random()*Math.PI,i=R(e.min,e.max);t.velocity.x=Math.cos(n)*i,t.velocity.y=Math.sin(n)*i},e}return Object(M.a)(n,[{key:"init",value:function(){this.particleEffect.addParticleListeners.push(this.handleParticleAdd)}},{key:"toObject",value:function(){return{moduleTypeId:n.moduleTypeId,min:this.min,max:this.max}}}],[{key:"fromObject",value:function(e,t,i){var a=new n(e);return C(t,n,a,"min",A,i),C(t,n,a,"max",A,i),a}}]),n}(w);$.moduleTypeId="RandomAngleVelocity";var ee=function(e){Object(k.a)(n,e);var t=Object(E.a)(n);function n(){var e;return Object(I.a)(this,n),(e=t.apply(this,arguments)).min=.5,e.max=1.5,e.handleParticleAdd=function(t){t.scale=L(e.min,e.max,Math.random())},e}return Object(M.a)(n,[{key:"init",value:function(){this.particleEffect.addParticleListeners.push(this.handleParticleAdd),this.active=!1}},{key:"toObject",value:function(){return{moduleTypeId:n.moduleTypeId,min:this.min,max:this.max}}}],[{key:"fromObject",value:function(e,t,i){var a=new n(e);return C(t,n,a,"min",A,i),C(t,n,a,"max",A,i),a}}]),n}(w);ee.moduleTypeId="RandomScale";var te=function(e){Object(k.a)(n,e);var t=Object(E.a)(n);function n(){var e;return Object(I.a)(this,n),(e=t.apply(this,arguments)).palette=[{r:1,g:0,b:0},{r:0,g:1,b:0},{r:0,g:0,b:1},{r:1,g:0,b:0}],e.handleParticleAdd=function(t){var n=Math.random()*(e.palette.length-1),i=Math.floor(n),a=e.palette[i],r=e.palette[i+1];t.color=_(a,r,n-i)},e}return Object(M.a)(n,[{key:"init",value:function(){this.particleEffect.addParticleListeners.push(this.handleParticleAdd),this.active=!1}},{key:"toObject",value:function(){return{moduleTypeId:n.moduleTypeId,palette:this.palette}}}],[{key:"fromObject",value:function(e,t,i){var a=new n(e);return C(t,n,a,"palette",A,i),a}}]),n}(w);te.moduleTypeId="RandomColor";var ne=function(e){Object(k.a)(n,e);var t=Object(E.a)(n);function n(){var e;return Object(I.a)(this,n),(e=t.apply(this,arguments)).min=-2*Math.PI,e.max=2*Math.PI,e.handleParticleAdd=function(t){t.rotationalVelocity=L(e.min,e.max,Math.random())},e}return Object(M.a)(n,[{key:"init",value:function(){this.particleEffect.addParticleListeners.push(this.handleParticleAdd),this.active=!1}},{key:"toObject",value:function(){return{moduleTypeId:n.moduleTypeId,min:this.min,max:this.max}}}],[{key:"fromObject",value:function(e,t,i){var a=new n(e);return C(t,n,a,"min",A,i),C(t,n,a,"max",A,i),a}}]),n}(w);ne.moduleTypeId="RandomRotationalVelocity";var ie=function(e){Object(k.a)(n,e);var t=Object(E.a)(n);function n(){var e;return Object(I.a)(this,n),(e=t.apply(this,arguments)).randomX={min:100,max:100},e.randomY={min:-50,max:50},e.handleParticleAdd=function(t){t.velocity.x=L(e.randomX.min,e.randomX.max,Math.random()),t.velocity.y=L(e.randomY.min,e.randomY.max,Math.random())},e}return Object(M.a)(n,[{key:"init",value:function(){this.particleEffect.addParticleListeners.push(this.handleParticleAdd)}},{key:"toObject",value:function(){return{moduleTypeId:n.moduleTypeId,randomX:this.randomX,randomY:this.randomY}}}],[{key:"fromObject",value:function(e,t,i){var a=new n(e);return C(t,n,a,"randomX",A,i),C(t,n,a,"randomY",A,i),a}}]),n}(w);ie.moduleTypeId="RandomVelocity";var ae={linear:function(e){return e},easeOutSine:function(e){return Math.sin(e*Math.PI/2)},easeOutCubic:function(e){return 1-Math.pow(1-e,3)},easeOutExpo:function(e){return 1===e?1:1-Math.pow(2,-10*e)},easeOutCirc:function(e){return Math.sqrt(1-Math.pow(e-1,2))},easeOutBack:function(e){var t=1.70158;return 1+2.70158*Math.pow(e-1,3)+t*Math.pow(e-1,2)},easeOutElastic:function(e){var t=2*Math.PI/3;return 0===e?0:1===e?1:Math.pow(2,-10*e)*Math.sin((10*e-.75)*t)+1}},re=function(e){var t=Object.entries(ae).find((function(t){return t[1]===e}));if(!t)throw new Error("serializeEasing supplied value is not an EasingFunction");return t[0]},ce=function(e){if("string"===typeof e){var t=Object.entries(ae).find((function(t){return t[0]===e}));return t?t[1]:void 0}},oe=function(e){Object(k.a)(n,e);var t=Object(E.a)(n);function n(){var e;return Object(I.a)(this,n),(e=t.apply(this,arguments)).easing=ae.easeOutSine,e}return Object(M.a)(n,[{key:"update",value:function(e){for(var t=this.particleEffect.particles,n=t.length,i=0;i<n;i+=1){var a=t[i],r=1-this.easing(D(a.timeLived/a.lifeTime,0,1));a.alpha=r}}},{key:"toObject",value:function(){return{moduleTypeId:n.moduleTypeId,easing:re(this.easing)}}}],[{key:"fromObject",value:function(e,t,i){var a=new n(e);return C(t,n,a,"easing",ce,i),a}}]),n}(w);oe.moduleTypeId="AlphaOverLifetime";var ue=function(e){Object(k.a)(n,e);var t=Object(E.a)(n);function n(){var e;return Object(I.a)(this,n),(e=t.apply(this,arguments)).easing=ae.easeOutSine,e.handleParticleAdd=function(e){e._velocityOverLifetime_initialVelocity={x:e.velocity.x,y:e.velocity.y}},e}return Object(M.a)(n,[{key:"init",value:function(){this.particleEffect.addParticleListeners.push(this.handleParticleAdd)}},{key:"update",value:function(e){for(var t=this.particleEffect.particles,n=t.length,i=0;i<n;i+=1){var a=t[i],r=(a.timeLived-e)/a.lifeTime,c=a.timeLived/a.lifeTime,o=this.easing(r),u=this.easing(c),l=a._velocityOverLifetime_initialVelocity,s=F.multiply(l,u-o);a.velocity.x-=s.x,a.velocity.y-=s.y}}},{key:"toObject",value:function(){return{moduleTypeId:n.moduleTypeId,easing:ce(this.easing)}}}],[{key:"fromObject",value:function(e,t,i){var a=new n(e);return C(t,n,a,"easing",ce,i),a}}]),n}(w);ue.moduleTypeId="DeaccelerationOverLifetime";var le=function(e){Object(k.a)(n,e);var t=Object(E.a)(n);function n(){var e;return Object(I.a)(this,n),(e=t.apply(this,arguments)).strength=100,e.maxPullStrengthDistance=100,e.maxPullStrengthMultiplier=1,e.minPullStrengthDistance=500,e.minPullStrengthMultiplier=.25,e}return Object(M.a)(n,[{key:"update",value:function(e){var t=this,n=this.center;n?this.particleEffect.particles.forEach((function(i){var a=F.subtract(n,i.position),r=F.length(a),c=L(t.minPullStrengthMultiplier,t.maxPullStrengthMultiplier,D((r-t.minPullStrengthDistance)/(t.maxPullStrengthDistance-t.minPullStrengthDistance),0,1)),o=e*t.strength*c,u=F.normalize(a);i.velocity.x+=u.x*o,i.velocity.y+=u.y*o})):this.particleEffect.particles.forEach((function(n){n.velocity.y+=t.strength*e}))}},{key:"toObject",value:function(){return{moduleTypeId:n.moduleTypeId,strength:this.strength,center:this.center,maxPullStrengthDistance:this.maxPullStrengthDistance,maxPullStrengthMultiplier:this.maxPullStrengthMultiplier,minPullStrengthDistance:this.minPullStrengthDistance,minPullStrengthMultiplier:this.minPullStrengthMultiplier}}}],[{key:"fromObject",value:function(e,t,i){var a=new n(e);return C(t,n,a,"strength",A,i),C(t,n,a,"center",A,i),C(t,n,a,"maxPullStrengthDistance",A,i),C(t,n,a,"maxPullStrengthMultiplier",A,i),C(t,n,a,"minPullStrengthDistance",A,i),C(t,n,a,"minPullStrengthMultiplier",A,i),a}}]),n}(w);le.moduleTypeId="Gravity";var se=function(e){Object(k.a)(n,e);var t=Object(E.a)(n);function n(){var e;return Object(I.a)(this,n),(e=t.apply(this,arguments)).center={x:0,y:0},e.radius=50,e}return Object(M.a)(n,[{key:"generateParticle",value:function(){var e=new q,t=2*Math.random()*Math.PI,n=Math.sqrt(Math.random())*this.radius;e.position.x=this.center.x+Math.cos(t)*n,e.position.y=this.center.y+Math.sin(t)*n,this.particleEffect.addParticle(e)}},{key:"toObject",value:function(){return{moduleTypeId:n.moduleTypeId,interval:this.interval,center:this.center,radius:this.radius}}}],[{key:"fromObject",value:function(e,t,i){var a=new n(e);return C(t,n,a,"interval",A,i),C(t,n,a,"center",A,i),C(t,n,a,"radius",A,i),a}}]),n}(J);se.moduleTypeId="CircleGenerator";var de=function(e){Object(k.a)(n,e);var t=Object(E.a)(n);function n(){var e;return Object(I.a)(this,n),(e=t.apply(this,arguments)).center={x:0,y:0},e.radius=50,e.nextParticleAngle=0,e.angleStep=.5,e}return Object(M.a)(n,[{key:"generateParticle",value:function(){var e=new q;e.position.x=this.center.x+Math.cos(this.nextParticleAngle)*this.radius,e.position.y=this.center.y+Math.sin(this.nextParticleAngle)*this.radius,this.nextParticleAngle+=this.angleStep,this.particleEffect.addParticle(e)}},{key:"toObject",value:function(){return{moduleTypeId:n.moduleTypeId,interval:this.interval,center:this.center,nextParticleAngle:this.nextParticleAngle,angleStep:this.angleStep}}}],[{key:"fromObject",value:function(e,t,i){var a=new n(e);return C(t,n,a,"interval",A,i),C(t,n,a,"center",A,i),C(t,n,a,"nextParticleAngle",A,i),C(t,n,a,"angleStep",A,i),a}}]),n}(J);de.moduleTypeId="CircleLoadingGenerator";var fe=[S,N,U,W,H,Q,Z,$,ie,oe,ue,le,ee,te,ne,se,W,de],he=function(){function e(t){Object(I.a)(this,e),this.modules=[],this.particles=[],this.isInitialized=!1,this.textures=[],this.addParticleListeners=[],this.destroyParticleListeners=[],this.particleSystem=t}return Object(M.a)(e,[{key:"init",value:function(){this.modules.forEach((function(e){e.init()}))}},{key:"update",value:function(e){for(var t=this.particles.length,n=0;n<t;n+=1){var i=this.particles[n];i.timeLived+=e,i.position.x+=i.velocity.x*e,i.position.y+=i.velocity.y*e,i.rotation+=i.rotationalVelocity*e}this.modules.forEach((function(t){t.active&&t.update(e)}));for(var a=0;a<this.particles.length;a+=1){this.particles[a].destroyed&&(this.particles.splice(a,1),a-=1)}}},{key:"addParticle",value:function(e){this.particles.push(e),this.textures.length>0&&(e.texture=this.textures[Math.round(Math.random()*(this.textures.length-1))]),this.addParticleListeners.forEach((function(t){t(e)}))}},{key:"destroyParticle",value:function(e){e.destroyed=!0,this.destroyParticleListeners.forEach((function(t){t(e)}))}}]),e}(),pe=function(){function e(){Object(I.a)(this,e),this.effects=[],this.addParticleEffectListeners=[],this.removeParticleEffectListeners=[]}return Object(M.a)(e,[{key:"update",value:function(e){this.effects.forEach((function(t){t.isInitialized||(t.init(),t.isInitialized=!0),t.update(e)}))}},{key:"addParticleEffect",value:function(){var e=new he(this);return this.effects.push(e),this.addParticleEffectListeners.forEach((function(t){return t(e)})),e}},{key:"removeParticleEffect",value:function(e){var t=this.effects.indexOf(e);t<=0&&(this.effects.splice(t,1),this.removeParticleEffectListeners.forEach((function(t){return t(e)})))}},{key:"toObject",value:function(){return{effects:this.effects.map((function(e){return{textures:e.textures,modules:e.modules.map((function(e){return e.toObject()}))}}))}}}],[{key:"fromObject",value:function(t,n){var i=(null===n||void 0===n?void 0:n.hideWarnings)||!1,a=new e;return t.effects.forEach((function(e){var t,n=a.addParticleEffect();n.textures=e.textures,null===(t=e.modules)||void 0===t||t.forEach((function(e){var t=fe.find((function(t){return t.moduleTypeId===e.moduleTypeId}));if(t){var a=t.fromObject(n,e,i);n.modules.push(a)}else i||console.warn('ParticleSystem.fromObject unidentified module type: "'.concat(e.moduleTypeId,'"'))}))})),a}}]),e}(),me=function(e){var t=e.effects,n=Object(i.useState)(void 0),a=Object(l.a)(n,2),r=a[0],c=a[1],o=Object(i.useState)(!1),u=Object(l.a)(o,2),d=u[0],f=u[1];return Object(i.useEffect)((function(){var e=document.getElementById("particleSandbox"),t=new T.a({resizeTo:e,backgroundAlpha:0});e.appendChild(t.view),t.view.height=e.clientHeight;var n=[],i=new Map,a=function(e,a){var r=n.pop();r||((r=new T.d).blendMode=T.b.ADD,r.anchor.x=.5,r.anchor.y=.5,t.stage.addChild(r)),r.visible=!0,i.set(a,r)},r=function(e){var t=i.get(e);t&&(t.visible=!1,i.delete(e),n.push(t))};return c({app:t,registerParticleEffect:function(e,t){e.addParticleListeners.push((function(e){return a(t,e)})),e.destroyParticleListeners.push((function(e){return r(e)}))},updateRendering:function(){i.forEach((function(e,t){e.x=t.position.x,e.y=t.position.y,e.scale.x=t.scale,e.scale.y=t.scale,e.alpha=t.alpha,e.tint=T.e.rgb2hex([t.color.r,t.color.g,t.color.b]),e.rotation=t.rotation,e.texture=T.e.TextureCache[t.texture]}))},reset:function(){Array.from(i.keys()).forEach(r)}}),function(){t.destroy(!0)}}),[]),Object(i.useEffect)((function(){var e;if(r){var n=r.app,i=r.updateRendering,a=r.registerParticleEffect;(0,r.reset)();var c=pe.fromObject({effects:t});c.effects.forEach((function(e,n){return a(e,t[n])}));var o=function(){var e=n.ticker.elapsedMS/1e3;c.update(e),i()};return null===(e=n.ticker)||void 0===e||e.add(o),function(){var e;null===(e=n.ticker)||void 0===e||e.remove(o)}}}),[t,r]),Object(i.useEffect)((function(){var e=setTimeout((function(){f(!0)}),2e3);return function(){return clearTimeout(e)}}),[]),Object(s.jsxs)("div",{className:"particleSandbox",children:[Object(s.jsx)("div",{className:"particleSandbox-gridColumns",children:new Array(10).fill(0).map((function(e,t){return Object(s.jsx)("div",{className:"particleSandbox-gridColumn"},"col".concat(t))}))}),Object(s.jsx)("div",{className:"particleSandbox-gridRows",children:new Array(10).fill(0).map((function(e,t){return Object(s.jsx)("div",{className:"particleSandbox-gridRow"},"col".concat(t))}))}),Object(s.jsx)("div",{className:"particleSandbox-canvas",id:"particleSandbox"}),Object(s.jsxs)("div",{className:"particleSandbox-devNotification ".concat(d?"particleSandbox-devNotification-active":""),onClick:function(){return f(!1)},children:[Object(s.jsx)("p",{children:Object(s.jsx)("b",{children:"Work in progress!"})}),Object(s.jsx)("p",{children:"Some features are still unimplemented."})]})]})},ve=(n(49),{particleModules:[],easingFunctions:[],availableTextures:{}}),je=Object(i.createContext)(ve),be=[{textures:["generic/ball.png"],modules:[{moduleTypeId:"PointGenerator",position:{x:(window.innerWidth-200)/2,y:(window.innerHeight-24)/2}},{moduleTypeId:"RandomAngleVelocity",min:50,max:100},{moduleTypeId:"RandomScale",min:.5,max:.8},{moduleTypeId:"RandomColor"},{moduleTypeId:"LifeTimeRange"},{moduleTypeId:"AlphaOverLifetime"},{moduleTypeId:"LifeTimeDestructor"}]}],ye=function(e,t){var n={textures:e.textures,modules:[]};return e.modules.forEach((function(e){var i=Object(u.a)({},e),a=t.find((function(t){return t.moduleTypeId===e.moduleTypeId}));Object.entries(a.properties).forEach((function(t){var n=Object(l.a)(t,2),a=n[0],r=n[1];if(void 0===i[a])if("defaultValue"in r){var c=r.defaultValue;if("Number"!==r.type)throw new Error("Unhandled defaultValue type: ".concat(r.type));try{c=Number(c)}catch(o){console.error("Number defaultValue parsing error ".concat(c))}i[a]=c}else console.warn("Missing property @defaultValue ".concat(e.moduleTypeId,": ").concat(a))})),n.modules.push(i)})),n},Oe=function(e){var t=Object(i.useState)([]),n=Object(l.a)(t,2),a=n[0],r=n[1],c=Object(i.useState)(!0),d=Object(l.a)(c,2),f=d[0],h=d[1],p=Object(i.useContext)(je).particleModules;return Object(i.useEffect)((function(){var e=fetch("config.modularParticleSystem.json").then((function(e){return e.json()})).then((function(e){console.log("loaded core library config");var t=e.particleModules,n=e.easingFunctions;ve.particleModules=t,ve.easingFunctions=n,r(be.map((function(e){return ye(e,t)})))})),t=fetch("config.spritesheets.json").then((function(e){return e.json()})).then((function(e){console.log("loaded spritesheet names");var t=T.c.shared;if(!t.resources.spritesheet)return e.forEach((function(e){t.add(e,"sprites/".concat(e))})),t.load(),new Promise((function(e){t.onComplete.once((function(t,n){console.log("loaded spritesheets");var i=Object.values(n).map((function(e){return e.textures})).reduce((function(e,t){return Object(u.a)(Object(u.a)({},e),t)}),{});ve.availableTextures=i,e()}))}))}));Promise.all([e,t]).then((function(e){h(!1)}))}),[]),f?Object(s.jsx)("div",{className:"editor-loading",children:"Loading..."}):Object(s.jsx)(je.Provider,{value:ve,children:Object(s.jsxs)("div",{className:"editor",children:[Object(s.jsx)(P,{restart:function(){r(Object(o.a)(a))},saveToFile:function(){!function(e,t){var n=new Blob([JSON.stringify(e,null,2)],{type:"application/json;charset=utf-8"}),i=URL.createObjectURL(n),a=document.createElement("a");a.href=i,a.download=t,document.body.appendChild(a),a.click(),document.body.removeChild(a)}({effects:a.map((function(e){return{modules:e.modules}}))},"particleSystem.json")}}),Object(s.jsxs)("div",{className:"editor-workspace",children:[Object(s.jsx)(me,{effects:a}),Object(s.jsx)(g,{effects:a,updateEffects:function(e){e=e.map((function(e){return ye(e,p)})),r(e)}})]})]})})},xe=(n(50),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,52)).then((function(t){var n=t.getCLS,i=t.getFID,a=t.getFCP,r=t.getLCP,c=t.getTTFB;n(e),i(e),a(e),r(e),c(e)}))});c.a.render(Object(s.jsx)(a.a.StrictMode,{children:Object(s.jsx)(Oe,{})}),document.getElementById("root")),xe()}},[[51,1,2]]]);
//# sourceMappingURL=main.9378f8a5.chunk.js.map