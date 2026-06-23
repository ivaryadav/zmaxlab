import{n as e,s as t,t as n}from"./jsx-runtime-BseJUIpC.js";var r=t(e(),1),i=n(),a={blue:{base:220,spread:200},purple:{base:280,spread:300},green:{base:120,spread:200},red:{base:0,spread:200},orange:{base:30,spread:200}},o={sm:`w-48 h-64`,md:`w-64 h-80`,lg:`w-80 h-96`},s=`
  [data-glow]::before,
  [data-glow]::after {
    pointer-events: none;
    content: "";
    position: absolute;
    inset: calc(var(--border-size) * -1);
    border: var(--border-size) solid transparent;
    border-radius: calc(var(--radius) * 1px);
    background-attachment: fixed;
    background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
    background-repeat: no-repeat;
    background-position: 50% 50%;
    mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
    mask-clip: padding-box, border-box;
    mask-composite: intersect;
  }
  [data-glow]::before {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
      calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / var(--border-spot-opacity, 1)),
      transparent 100%
    );
    filter: brightness(2);
  }
  [data-glow]::after {
    background-image: radial-gradient(
      calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
      calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(0 100% 100% / var(--border-light-opacity, 1)),
      transparent 100%
    );
  }
  [data-glow] [data-glow] {
    position: absolute;
    inset: 0;
    will-change: filter;
    opacity: var(--outer, 1);
    border-radius: calc(var(--radius) * 1px);
    border-width: calc(var(--border-size) * 20);
    filter: blur(calc(var(--border-size) * 10));
    background: none;
    pointer-events: none;
    border: none;
  }
  [data-glow] > [data-glow]::before {
    inset: -10px;
    border-width: 10px;
  }
`,c=({children:e,className:t=``,style:n,onClick:c,glowColor:l=`blue`,size:u=`md`,width:d,height:f,customSize:p=!1})=>{let m=(0,r.useRef)(null);(0,r.useEffect)(()=>{let e=e=>{m.current&&(m.current.style.setProperty(`--x`,e.clientX.toFixed(2)),m.current.style.setProperty(`--xp`,(e.clientX/window.innerWidth).toFixed(2)),m.current.style.setProperty(`--y`,e.clientY.toFixed(2)),m.current.style.setProperty(`--yp`,(e.clientY/window.innerHeight).toFixed(2)))};return document.addEventListener(`pointermove`,e),()=>document.removeEventListener(`pointermove`,e)},[]);let{base:h,spread:g}=a[l],_={"--base":h,"--spread":g,"--radius":`14`,"--border":`2`,"--backdrop":`hsl(0 0% 60% / 0.06)`,"--backup-border":`var(--backdrop)`,"--size":`220`,"--outer":`1`,"--border-size":`calc(var(--border, 2) * 1px)`,"--spotlight-size":`calc(var(--size, 150) * 1px)`,"--hue":`calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))`,backgroundImage:`radial-gradient(
      var(--spotlight-size) var(--spotlight-size) at
      calc(var(--x, 0) * 1px) calc(var(--y, 0) * 1px),
      hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / var(--bg-spot-opacity, 0.08)),
      transparent
    )`,backgroundColor:`var(--backdrop, transparent)`,backgroundSize:`calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))`,backgroundPosition:`50% 50%`,backgroundAttachment:`fixed`,border:`var(--border-size) solid var(--backup-border)`,position:`relative`,touchAction:`none`,...d===void 0?{}:{width:typeof d==`number`?`${d}px`:d},...f===void 0?{}:{height:typeof f==`number`?`${f}px`:f}};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(`style`,{dangerouslySetInnerHTML:{__html:s}}),(0,i.jsxs)(`div`,{ref:m,"data-glow":!0,style:{..._,...n},onClick:c,className:[p?``:o[u],p?``:`aspect-3/4`,`rounded-2xl relative shadow-[0_1rem_2rem_-1rem_black] backdrop-blur-[5px]`,p?`block`:`grid grid-rows-[1fr_auto] gap-4 p-6`,t].filter(Boolean).join(` `),children:[(0,i.jsx)(`div`,{"data-glow":!0}),e]})]})};export{c as t};