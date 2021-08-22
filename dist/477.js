(self.webpackChunksleact_front=self.webpackChunksleact_front||[]).push([[477],{9250:(e,t,n)=>{"use strict";n.d(t,{Z:()=>m});var a=n(7294),l=n(5723),r=n(9669),o=n.n(r),i=n(9249),s=n(5977),c=n(3046),p=n(5692),d=n(8678),u=n(3564);const m=({show:e,onCloseModal:t,setShowInviteModal:n})=>{const{workspace:r,channel:m}=(0,s.UO)(),[h,g,b]=(0,d.Z)(""),{data:x}=(0,l.ZP)("/api/users",u.Z,{dedupingInterval:1e3}),{revalidate:k}=(0,l.ZP)(x&&m?`/api/workspaces/${r}/channels/${m}/members`:null,u.Z),f=(0,a.useCallback)((e=>{e.preventDefault(),h&&h.trim()&&o().post(`/api/workspaces/${r}/channels/${m}/members`,{email:h},{withCredentials:!0}).then((e=>{k(),n(!1),b("")})).catch((e=>{var t;i.Am.error(null===(t=e.response)||void 0===t?void 0:t.data,{position:"bottom-center"})}))}),[r,h]);return a.createElement(p.Z,{show:e,onCloseModal:t},a.createElement("form",{onSubmit:f},a.createElement(c.N.Label,{id:"member-label"},a.createElement("span",null,"Invite Channel Member"),a.createElement(c.N.Input,{id:"member",type:"email",value:h,onChange:g})),a.createElement(c.N.Button,{type:"submit"},"INVITE")))}},5692:(e,t,n)=>{"use strict";n.d(t,{Z:()=>o});var a=n(7294),l=n(8401);const r={CreateModal:(0,l.Z)("div",{target:"e12b5syr1"})({name:"10w7pu7",styles:"position:fixed;text-align:center;left:0;bottom:0;top:0;right:0;z-index:1022;&>div{margin-top:200px;display:inline-block;width:440px;background:white;--saf-0:rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);box-shadow:0 0 0 1px var(--saf-0),0 4px 12px 0 rgba(0, 0, 0, 0.12);background-color:rgba(var(--sk_foreground_min_solid, 248, 248, 248), 1);border-radius:6px;user-select:none;max-width:440px;padding:30px 40px 0;z-index:1012;position:relative;}"}),CloseModalButton:(0,l.Z)("button",{target:"e12b5syr0"})({name:"19gmbxq",styles:"position:absolute;right:10px;top:6px;background:transparent;border:none;font-size:30px;cursor:pointer"})},o=({show:e,children:t,onCloseModal:n})=>{const l=(0,a.useCallback)((e=>{e.stopPropagation()}),[]);return e?a.createElement(r.CreateModal,null,a.createElement("div",{onClick:l},a.createElement(r.CloseModalButton,{onClick:n},"×"),t)):null}},2951:(e,t,n)=>{"use strict";n.d(t,{Z:()=>i});var a=n(7294),l=n(6809),r=n.n(l);const o={},i=e=>{const t=(0,a.useCallback)((()=>{e&&(o[e].disconnect(),delete o[e])}),[e]);return e?(o[e]||(o[e]=r().connect(`http://localhost:3095/ws-${e}`,{transports:["websocket"]})),[o[e],t]):[void 0,t]}},2867:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>I});var a=n(9669),l=n.n(a),r=n(7294),o=n(5977),i=n(5723),s=n(8401);const c={RightMenu:(0,s.Z)("div",{target:"e1rm1uzn13"})({name:"tjo4qw",styles:"float:right"}),Header:(0,s.Z)("header",{target:"e1rm1uzn12"})({name:"fvf0bi",styles:"height:38px;background:#350d36;color:#ffffff;box-shadow:0 1px 0 0 rgba(255, 255, 255, 0.1);padding:5px;text-align:center"}),ProfileImg:(0,s.Z)("img",{target:"e1rm1uzn11"})({name:"1ly4jlu",styles:"width:28px;height:28px;position:absolute;top:5px;right:16px"}),ProfileModal:(0,s.Z)("div",{target:"e1rm1uzn10"})({name:"47px7v",styles:"display:flex;padding:20px;& img{display:flex;}&>div{display:flex;flex-direction:column;margin-left:10px;}& #profile-name{font-weight:bold;display:inline-flex;}& #profile-active{font-size:13px;display:inline-flex;}"}),LogOutButton:(0,s.Z)("button",{target:"e1rm1uzn9"})({name:"bl1q1k",styles:"border:none;width:100%;border-top:1px solid rgb(29, 28, 29);background:transparent;display:block;height:33px;padding:5px 20px 5px;outline:none;cursor:pointer"}),WorkspaceWrapper:(0,s.Z)("div",{target:"e1rm1uzn8"})({name:"36bnqj",styles:"display:flex;flex:1"}),Workspaces:(0,s.Z)("div",{target:"e1rm1uzn7"})({name:"17lvj7e",styles:"width:65px;display:inline-flex;flex-direction:column;align-items:center;background:#3f0e40;border-top:1px solid rgb(82, 38, 83);border-right:1px solid rgb(82, 38, 83);vertical-align:top;text-align:center;padding:15px 0 0"}),Channels:(0,s.Z)("nav",{target:"e1rm1uzn6"})({name:"2pkygn",styles:"width:260px;display:inline-flex;flex-direction:column;background:#3f0e40;color:rgb(188, 171, 188);vertical-align:top;& a{padding-left:36px;color:inherit;text-decoration:none;height:28px;line-height:28px;display:flex;align-items:center;&.selected{color:white;}}& .bold{color:white;font-weight:bold;}& .count{margin-left:auto;background:#cd2553;border-radius:16px;display:inline-block;font-size:12px;font-weight:700;height:18px;line-height:18px;padding:0 9px;color:white;margin-right:16px;}& h2{height:36px;line-height:36px;margin:0;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;font-size:15px;}"}),WorkspaceName:(0,s.Z)("button",{target:"e1rm1uzn5"})({name:"1rmthq7",styles:"height:64px;line-height:64px;border:none;width:100%;text-align:left;border-top:1px solid rgb(82, 38, 83);border-bottom:1px solid rgb(82, 38, 83);font-weight:900;font-size:24px;background:transparent;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;padding:0;padding-left:16px;margin:0;color:white;cursor:pointer"}),MenuScroll:(0,s.Z)("div",{target:"e1rm1uzn4"})({name:"1146j5j",styles:"height:calc(100vh - 102px);overflow-y:auto"}),WorkspaceModal:(0,s.Z)("div",{target:"e1rm1uzn3"})({name:"192o1ir",styles:"padding:10px 0 0;& h2{padding-left:20px;}&>button{width:100%;height:28px;padding:4px;border:none;background:transparent;border-top:1px solid rgb(28, 29, 28);cursor:pointer;&:last-of-type{border-bottom:1px solid rgb(28, 29, 28);}}"}),Chats:(0,s.Z)("div",{target:"e1rm1uzn2"})({name:"82a6rk",styles:"flex:1"}),AddButton:(0,s.Z)("button",{target:"e1rm1uzn1"})({name:"9tlmej",styles:"color:white;font-size:24px;display:inline-block;width:40px;height:40px;background:transparent;border:none;cursor:pointer"}),WorkspaceButton:(0,s.Z)("button",{target:"e1rm1uzn0"})({name:"wsqixl",styles:"display:inline-block;width:40px;height:40px;border-radius:10px;background:white;border:3px solid #3f0e40;margin-bottom:15px;font-size:18px;font-weight:700;color:black;cursor:pointer"})};var p=n(6182),d=n.n(p),u=n(3727),m=n(9249),h=n(2168);const g={CreateMenu:(0,s.Z)("div",{target:"e6mp6i31"})({name:"3nqusf",styles:"position:fixed;top:0;right:0;left:0;bottom:0;z-index:1000;&>div{position:absolute;display:inline-block;--saf-0:rgba(var(--sk_foreground_low, 29, 28, 29), 0.13);box-shadow:0 0 0 1px var(--saf-0),0 4px 12px 0 rgba(0, 0, 0, 0.12);background-color:rgba(var(--sk_foreground_min_solid, 248, 248, 248), 1);border-radius:6px;user-select:none;min-width:360px;z-index:512;max-height:calc(100vh - 20px);color:rgb(29, 28, 29);}"}),CloseModalButton:(0,s.Z)("button",{target:"e6mp6i30"})({name:"19gmbxq",styles:"position:absolute;right:10px;top:6px;background:transparent;border:none;font-size:30px;cursor:pointer"})},b=({children:e,style:t,show:n,onCloseModal:a,closeButton:l})=>{const o=(0,r.useCallback)((e=>{e.stopPropagation()}),[]);return n?r.createElement(g.CreateMenu,{onClick:a},r.createElement("div",{style:t,onClick:o},l&&r.createElement(g.CloseModalButton,{onClick:a},"×"),e)):null};b.defaultProps={closeButton:!0};const x=b;var k=n(5692),f=n(3046),w=n(8678),v=n(3564);const E=({show:e,onCloseModal:t,setShowCreateChannelModal:n})=>{const[a,s,c]=(0,w.Z)(""),{workspace:p,channel:d}=(0,o.UO)(),{data:u,error:h,revalidate:g,mutate:b}=(0,i.ZP)("/api/users",v.Z,{dedupingInterval:1e3}),{revalidate:x}=(0,i.ZP)(u?`/api/workspaces/${p}/channels`:null,v.Z),E=(0,r.useCallback)((e=>{e.preventDefault(),l().post(`/api/workspaces/${p}/channels`,{name:a},{withCredentials:!0}).then((e=>{n(!1),x(),c("")})).catch((e=>{var t;console.dir(e),m.Am.error(null===(t=e.response)||void 0===t?void 0:t.data,{position:"bottom-center"})}))}),[a]);return e?r.createElement(k.Z,{show:e,onCloseModal:t},r.createElement("form",{onSubmit:E},r.createElement(f.N.Label,{id:"channel-label"},r.createElement("span",null,"Channel"),r.createElement(f.N.Input,{id:"channel",value:a,onChange:s})),r.createElement(f.N.Button,{type:"submit"},"Create"))):null},C=({show:e,onCloseModal:t,setShowInviteModal:n})=>{const{workspace:a}=(0,o.UO)(),[s,c,p]=(0,w.Z)(""),{data:d}=(0,i.ZP)("/api/users",v.Z,{dedupingInterval:1e3}),{revalidate:u}=(0,i.ZP)(d?`/api/workspaces/${a}/members`:null,v.Z),h=(0,r.useCallback)((e=>{e.preventDefault(),s&&s.trim()&&l().post(`/api/workspaces/${a}/members`,{email:s},{withCredentials:!0}).then((e=>{u(),n(!1),p("")})).catch((e=>{var t;m.Am.error(null===(t=e.response)||void 0===t?void 0:t.data,{position:"bottom-center"})}))}),[a,s]);return r.createElement(k.Z,{show:e,onCloseModal:t},r.createElement("form",{onSubmit:h},r.createElement(f.N.Label,{id:"channel-label"},r.createElement("span",null,"Email"),r.createElement(f.N.Input,{id:"channel",type:"email",value:s,onChange:c})),r.createElement(f.N.Button,{type:"submit"},"INVITE")))};var Z=n(9250);const y=(0,s.Z)("button",{target:"epyiw0l0"})("background:transparent;border:none;width:26px;height:26px;display:inline-flex;justify-content:center;align-items:center;color:white;margin-left:10px;cursor:pointer;",(({collapse:e})=>e&&"\n    & i {\n      transform: none;\n    }\n  "),";");var _=n(2951);const M=()=>{const{workspace:e}=(0,o.UO)(),{data:t,error:n,revalidate:a,mutate:l}=(0,i.ZP)("/api/users",v.Z,{dedupingInterval:1e3}),{data:s}=(0,i.ZP)(t?`/api/workspaces/${e}/members`:null,v.Z),[c]=(0,_.Z)(e),[p,d]=(0,r.useState)(!1),[m,h]=(0,r.useState)([]),g=(0,r.useCallback)((()=>{d((e=>!e))}),[]);return(0,r.useEffect)((()=>{h([])}),[e]),(0,r.useEffect)((()=>(null==c||c.on("onlineList",(e=>{h(e)})),()=>{null==c||c.off("onlineList")})),[c]),r.createElement(r.Fragment,null,r.createElement("h2",null,r.createElement(y,{collapse:p,onClick:g},r.createElement("i",{className:"c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline","data-qa":"channel-section-collapse","aria-hidden":"true"})),r.createElement("span",null,"Direct Messages")),r.createElement("div",null,!p&&(null==s?void 0:s.map((n=>{const a=m.includes(n.id);return r.createElement(u.OL,{key:n.id,activeClassName:"selected",to:`/workspace/${e}/dm/${n.id}`},r.createElement("i",{className:"c-icon p-channel_sidebar__presence_icon p-channel_sidebar__presence_icon--dim_enabled c-presence "+(a?"c-presence--active c-icon--presence-online":"c-icon--presence-offline"),"aria-hidden":"true","data-qa":"presence_indicator","data-qa-presence-self":"false","data-qa-presence-active":"false","data-qa-presence-dnd":"false"}),r.createElement("span",null,n.nickname),n.id===(null==t?void 0:t.id)&&r.createElement("span",null," (me)"))})))))},z=()=>{const{workspace:e}=(0,o.UO)(),{data:t,error:n,revalidate:a,mutate:l}=(0,i.ZP)("/api/users",v.Z,{dedupingInterval:1e3}),{data:s}=(0,i.ZP)(t?`/api/workspaces/${e}/channels`:null,v.Z),[c,p]=(0,r.useState)(!1),d=(0,r.useCallback)((()=>{p((e=>!e))}),[]);return r.createElement(r.Fragment,null,r.createElement("h2",null,r.createElement(y,{collapse:c,onClick:d},r.createElement("i",{className:"c-icon p-channel_sidebar__section_heading_expand p-channel_sidebar__section_heading_expand--show_more_feature c-icon--caret-right c-icon--inherit c-icon--inline","data-qa":"channel-section-collapse","aria-hidden":"true"})),r.createElement("span",null,"Channels")),r.createElement("div",null,!c&&(null==s?void 0:s.map((t=>r.createElement(u.OL,{key:t.name,activeClassName:"selected",to:`/workspace/${e}/channel/${t.name}`},r.createElement("span",null,"# ",t.name)))))))},N=(0,h.ZP)((()=>Promise.all([n.e(921),n.e(885),n.e(808)]).then(n.bind(n,808)))),P=(0,h.ZP)((()=>Promise.all([n.e(921),n.e(885),n.e(474)]).then(n.bind(n,3474)))),I=()=>{const[e,t,n]=(0,w.Z)(""),[a,s,p]=(0,w.Z)(""),[h,g]=(0,r.useState)(!1),[b,y]=(0,r.useState)(!1),[I,S]=(0,r.useState)(!1),[W,$]=(0,r.useState)(!1),[B,q]=(0,r.useState)(!1),[L,A]=(0,r.useState)(!1),{workspace:O}=(0,o.UO)(),{data:U,error:j,revalidate:D,mutate:F}=(0,i.ZP)("/api/users",v.Z,{dedupingInterval:1e3}),{data:H}=(0,i.ZP)(U?`/api/workspaces/${O}/channels`:null,v.Z),{data:R}=(0,i.ZP)(U?`/api/workspaces/${O}/members`:null,v.Z),[T,V]=(0,_.Z)(O);(0,r.useEffect)((()=>{H&&U&&T&&T.emit("login",{id:U.id,channels:H.map((e=>e.id))})}),[T,U,H]),(0,r.useEffect)((()=>()=>{V()}),[O,V]);const G=(0,r.useCallback)((()=>{l().post("/api/users/logout",null,{withCredentials:!0}).then((()=>{F(!1,!1)}))}),[]),J=(0,r.useCallback)((()=>{g(!h)}),[h]),K=(0,r.useCallback)((()=>{S(!0)}),[]),Q=(0,r.useCallback)((()=>{S(!1),$(!1),q(!1),A(!1)}),[]),X=(0,r.useCallback)((()=>{$(!0)}),[]),Y=(0,r.useCallback)((()=>{q(!0)}),[]),ee=(0,r.useCallback)((t=>{t.preventDefault(),a&&a.trim()&&e&&e.trim()&&l().post("/api/workspaces",{workspace:a,url:e},{withCredentials:!0}).then((()=>{D(),S(!1),p(""),n("")})).catch((e=>{var t;console.dir(e),m.Am.error(null===(t=e.response)||void 0===t?void 0:t.data,{position:"bottom-center"})}))}),[a,e]),te=(0,r.useCallback)((()=>{y(!b)}),[b]);return void 0===U?r.createElement("div",null,"Loading..."):U?r.createElement("div",null,r.createElement(c.Header,null,r.createElement(c.RightMenu,null,r.createElement("span",{onClick:J},r.createElement(c.ProfileImg,{src:d().url(U.email,{s:"28px",d:"retro"}),alt:U.nickname}),h&&r.createElement(x,{style:{right:0,top:38},show:h,onCloseModal:J},r.createElement(c.ProfileModal,null,r.createElement("img",{src:d().url(U.nickname,{s:"28px",d:"retro"}),alt:U.nickname}),r.createElement("div",null,r.createElement("span",{id:"profile-name"},U.nickname),r.createElement("span",{id:"profile-active"},"Active"))),r.createElement(c.LogOutButton,{onClick:G},"Log out"))))),r.createElement(c.WorkspaceWrapper,null,r.createElement(c.Workspaces,null,U&&U.Workspaces&&U.Workspaces.map((e=>r.createElement(u.rU,{key:e.id,to:`/workspace/${e.name}/channel/general`},r.createElement(c.WorkspaceButton,null,e.name.slice(0,1).toUpperCase())))),r.createElement(c.AddButton,{onClick:K},"+")),r.createElement(c.Channels,null,r.createElement(c.WorkspaceName,{onClick:te},"sleact"),r.createElement(c.MenuScroll,null,r.createElement(x,{show:b,onCloseModal:te,style:{top:95,left:80}},r.createElement(c.WorkspaceModal,null,r.createElement("h2",null,"Sleact"),r.createElement("button",{onClick:Y},"Add Member to this workspace"),r.createElement("button",{onClick:X},"Add channel"))),r.createElement(z,null),r.createElement(M,null))),r.createElement(c.Chats,null,r.createElement(o.rs,null,r.createElement(o.AW,{path:"/workspace/:workspace/channel/:channel",component:N}),r.createElement(o.AW,{path:"/workspace/:workspace/dm/:id",component:P})))),r.createElement(k.Z,{show:I,onCloseModal:Q},r.createElement("form",{onSubmit:ee},r.createElement(f.N.Label,{id:"workspace-label"},r.createElement("span",null,"Workspace Name"),r.createElement(f.N.Input,{id:"workspace",value:a,onChange:s})),r.createElement(f.N.Label,{id:"workspace-url-label"},r.createElement("span",null,"Workspace Url"),r.createElement(f.N.Input,{id:"workspace",value:e,onChange:t})),r.createElement(f.N.Button,{type:"submit"},"Create"))),r.createElement(E,{show:W,onCloseModal:Q,setShowCreateChannelModal:$}),r.createElement(C,{show:B,onCloseModal:Q,setShowInviteModal:q}),r.createElement(Z.Z,{show:L,onCloseModal:Q,setShowInviteModal:A})):r.createElement(o.l_,{to:"/login"})}},7020:()=>{}}]);