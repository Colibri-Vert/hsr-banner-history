function M(){}function tt(t,e){for(const n in e)t[n]=e[n];return t}function K(t){return t()}function G(){return Object.create(null)}function $(t){t.forEach(K)}function Q(t){return typeof t=="function"}function xt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let S;function bt(t,e){return S||(S=document.createElement("a")),S.href=e,t===S.href}function et(t){return Object.keys(t).length===0}function nt(t,...e){if(t==null)return M;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function wt(t,e,n){t.$$.on_destroy.push(nt(e,n))}function $t(t,e,n,i){if(t){const r=R(t,e,n,i);return t[0](r)}}function R(t,e,n,i){return t[1]&&i?tt(n.ctx.slice(),t[1](i(e))):n.ctx}function Et(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const u=[],s=Math.max(e.dirty.length,r.length);for(let o=0;o<s;o+=1)u[o]=e.dirty[o]|r[o];return u}return e.dirty|r}return e.dirty}function vt(t,e,n,i,r,u){if(r){const s=R(e,n,i,u);t.p(s,r)}}function Nt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}const At=typeof window<"u"?window:typeof globalThis<"u"?globalThis:global;let j=!1;function it(){j=!0}function rt(){j=!1}function st(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function ct(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const c=[];for(let l=0;l<e.length;l++){const a=e[l];a.claim_order!==void 0&&c.push(a)}e=c}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let c=0;c<e.length;c++){const l=e[c].claim_order,a=(r>0&&e[n[r]].claim_order<=l?r+1:st(1,r,d=>e[n[d]].claim_order,l))-1;i[c]=n[a]+1;const _=a+1;n[_]=c,r=Math.max(_,r)}const u=[],s=[];let o=e.length-1;for(let c=n[r]+1;c!=0;c=i[c-1]){for(u.push(e[c-1]);o>=c;o--)s.push(e[o]);o--}for(;o>=0;o--)s.push(e[o]);u.reverse(),s.sort((c,l)=>c.claim_order-l.claim_order);for(let c=0,l=0;c<s.length;c++){for(;l<u.length&&s[c].claim_order>=u[l].claim_order;)l++;const a=l<u.length?u[l]:null;t.insertBefore(s[c],a)}}function lt(t,e){if(j){for(ct(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function St(t,e,n){j&&!n?lt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function ot(t){t.parentNode&&t.parentNode.removeChild(t)}function kt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function ut(t){return document.createElement(t)}function L(t){return document.createTextNode(t)}function Mt(){return L(" ")}function jt(){return L("")}function Tt(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function Ct(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function ft(t){return Array.from(t.childNodes)}function at(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function W(t,e,n,i,r=!1){at(t);const u=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const o=t[s];if(e(o)){const c=n(o);return c===void 0?t.splice(s,1):t[s]=c,r||(t.claim_info.last_index=s),o}}for(let s=t.claim_info.last_index-1;s>=0;s--){const o=t[s];if(e(o)){const c=n(o);return c===void 0?t.splice(s,1):t[s]=c,r?c===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,o}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function dt(t,e,n,i){return W(t,r=>r.nodeName===e,r=>{const u=[];for(let s=0;s<r.attributes.length;s++){const o=r.attributes[s];n[o.name]||u.push(o.name)}u.forEach(s=>r.removeAttribute(s))},()=>i(e))}function Dt(t,e,n){return dt(t,e,n,ut)}function _t(t,e){return W(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>L(e),!0)}function Ot(t){return _t(t," ")}function qt(t,e){e=""+e,t.data!==e&&(t.data=e)}function Bt(t,e,n,i){n==null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function Ht(t,e){const n=[];let i=0;for(const r of e.childNodes)if(r.nodeType===8){const u=r.textContent.trim();u===`HEAD_${t}_END`?(i-=1,n.push(r)):u===`HEAD_${t}_START`&&(i+=1,n.push(r))}else i>0&&n.push(r);return n}function Lt(t,e){return new t(e)}let v;function E(t){v=t}function U(){if(!v)throw new Error("Function called outside component initialization");return v}function Pt(t){U().$$.on_mount.push(t)}function zt(t){U().$$.after_update.push(t)}const b=[],I=[];let w=[];const J=[],V=Promise.resolve();let B=!1;function X(){B||(B=!0,V.then(Y))}function Ft(){return X(),V}function H(t){w.push(t)}const q=new Set;let x=0;function Y(){if(x!==0)return;const t=v;do{try{for(;x<b.length;){const e=b[x];x++,E(e),ht(e.$$)}}catch(e){throw b.length=0,x=0,e}for(E(null),b.length=0,x=0;I.length;)I.pop()();for(let e=0;e<w.length;e+=1){const n=w[e];q.has(n)||(q.add(n),n())}w.length=0}while(b.length);for(;J.length;)J.pop()();B=!1,q.clear(),E(t)}function ht(t){if(t.fragment!==null){t.update(),$(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(H)}}function mt(t){const e=[],n=[];w.forEach(i=>t.indexOf(i)===-1?e.push(i):n.push(i)),n.forEach(i=>i()),w=e}const k=new Set;let g;function Gt(){g={r:0,c:[],p:g}}function It(){g.r||$(g.c),g=g.p}function Z(t,e){t&&t.i&&(k.delete(t),t.i(e))}function Jt(t,e,n,i){if(t&&t.o){if(k.has(t))return;k.add(t),g.c.push(()=>{k.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function Kt(t,e){t.d(1),e.delete(t.key)}function Qt(t,e,n,i,r,u,s,o,c,l,a,_){let d=t.length,m=u.length,h=d;const T={};for(;h--;)T[t[h].key]=h;const N=[],C=new Map,D=new Map,P=[];for(h=m;h--;){const f=_(r,u,h),p=n(f);let y=s.get(p);y?i&&P.push(()=>y.p(f,e)):(y=l(p,f),y.c()),C.set(p,N[h]=y),p in T&&D.set(p,Math.abs(h-T[p]))}const z=new Set,F=new Set;function O(f){Z(f,1),f.m(o,a),s.set(f.key,f),a=f.first,m--}for(;d&&m;){const f=N[m-1],p=t[d-1],y=f.key,A=p.key;f===p?(a=f.first,d--,m--):C.has(A)?!s.has(y)||z.has(y)?O(f):F.has(A)?d--:D.get(y)>D.get(A)?(F.add(y),O(f)):(z.add(A),d--):(c(p,s),d--)}for(;d--;){const f=t[d];C.has(f.key)||c(f,s)}for(;m;)O(N[m-1]);return $(P),N}function Rt(t){t&&t.c()}function Wt(t,e){t&&t.l(e)}function pt(t,e,n,i){const{fragment:r,after_update:u}=t.$$;r&&r.m(e,n),i||H(()=>{const s=t.$$.on_mount.map(K).filter(Q);t.$$.on_destroy?t.$$.on_destroy.push(...s):$(s),t.$$.on_mount=[]}),u.forEach(H)}function yt(t,e){const n=t.$$;n.fragment!==null&&(mt(n.after_update),$(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function gt(t,e){t.$$.dirty[0]===-1&&(b.push(t),X(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Ut(t,e,n,i,r,u,s,o=[-1]){const c=v;E(t);const l=t.$$={fragment:null,ctx:[],props:u,update:M,not_equal:r,bound:G(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(c?c.$$.context:[])),callbacks:G(),dirty:o,skip_bound:!1,root:e.target||c.$$.root};s&&s(l.root);let a=!1;if(l.ctx=n?n(t,e.props||{},(_,d,...m)=>{const h=m.length?m[0]:d;return l.ctx&&r(l.ctx[_],l.ctx[_]=h)&&(!l.skip_bound&&l.bound[_]&&l.bound[_](h),a&&gt(t,_)),d}):[],l.update(),a=!0,$(l.before_update),l.fragment=i?i(l.ctx):!1,e.target){if(e.hydrate){it();const _=ft(e.target);l.fragment&&l.fragment.l(_),_.forEach(ot)}else l.fragment&&l.fragment.c();e.intro&&Z(t.$$.fragment),pt(t,e.target,e.anchor,e.customElement),rt(),Y()}E(c)}class Vt{$destroy(){yt(this,1),this.$destroy=M}$on(e,n){if(!Q(n))return M;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!et(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{pt as A,yt as B,$t as C,vt as D,Nt as E,Et as F,lt as G,M as H,wt as I,Ht as J,bt as K,Tt as L,kt as M,$ as N,Qt as O,At as P,Kt as Q,Vt as S,Mt as a,St as b,Ot as c,Jt as d,jt as e,It as f,Z as g,ot as h,Ut as i,zt as j,ut as k,Dt as l,ft as m,Ct as n,Pt as o,Bt as p,L as q,_t as r,xt as s,Ft as t,qt as u,Gt as v,I as w,Lt as x,Rt as y,Wt as z};
