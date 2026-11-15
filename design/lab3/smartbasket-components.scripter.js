// SmartBasket · ЛР3 — native component library. Run in Figma Scripter.
// No network requests, deletions, page creation or changes to existing components.
// Re-running reuses this script's completed component sets by exact name.
// Generated icon SVGs from the project's installed lucide-react are inserted below.
const ICON_SVGS = {
  "Search": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-search\" aria-hidden=\"true\"><path d=\"m21 21-4.34-4.34\"></path><circle cx=\"11\" cy=\"11\" r=\"8\"></circle></svg>",
  "Check": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-check\" aria-hidden=\"true\"><path d=\"M20 6 9 17l-5-5\"></path></svg>",
  "X": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-x\" aria-hidden=\"true\"><path d=\"M18 6 6 18\"></path><path d=\"m6 6 12 12\"></path></svg>",
  "Plus": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-plus\" aria-hidden=\"true\"><path d=\"M5 12h14\"></path><path d=\"M12 5v14\"></path></svg>",
  "Minus": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-minus\" aria-hidden=\"true\"><path d=\"M5 12h14\"></path></svg>",
  "ShoppingCart": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-shopping-cart\" aria-hidden=\"true\"><path d=\"m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18\"></path><path d=\"M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25\"></path><circle cx=\"18\" cy=\"20\" r=\"2\"></circle><circle cx=\"8\" cy=\"20\" r=\"2\"></circle></svg>",
  "List": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-list\" aria-hidden=\"true\"><path d=\"M3 5h.01\"></path><path d=\"M3 12h.01\"></path><path d=\"M3 19h.01\"></path><path d=\"M8 5h13\"></path><path d=\"M8 12h13\"></path><path d=\"M8 19h13\"></path></svg>",
  "Settings": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-settings\" aria-hidden=\"true\"><path d=\"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915\"></path><circle cx=\"12\" cy=\"12\" r=\"3\"></circle></svg>",
  "ArrowLeft": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-arrow-left\" aria-hidden=\"true\"><path d=\"m12 19-7-7 7-7\"></path><path d=\"M19 12H5\"></path></svg>",
  "ArrowRight": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-arrow-right\" aria-hidden=\"true\"><path d=\"M5 12h14\"></path><path d=\"m12 5 7 7-7 7\"></path></svg>",
  "LoaderCircle": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-loader-circle lucide-loader-2\" aria-hidden=\"true\"><path d=\"M21 12a9 9 0 1 1-6.219-8.56\"></path></svg>",
  "TriangleAlert": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-triangle-exclamation-point lucide-alert-triangle lucide-triangle-alert\" aria-hidden=\"true\"><path d=\"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3\"></path><path d=\"M12 9v4\"></path><path d=\"M12 17h.01\"></path></svg>",
  "Info": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-info\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M12 16v-4\"></path><path d=\"M12 8h.01\"></path></svg>",
  "Package": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-package\" aria-hidden=\"true\"><path d=\"M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z\"></path><path d=\"M12 22V12\"></path><polyline points=\"3.29 7 12 12 20.71 7\"></polyline><path d=\"m7.5 4.27 9 5.15\"></path></svg>",
  "Store": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-store\" aria-hidden=\"true\"><path d=\"M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5\"></path><path d=\"M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244\"></path><path d=\"M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05\"></path></svg>",
  "Copy": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-copy\" aria-hidden=\"true\"><rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\" ry=\"2\"></rect><path d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\"></path></svg>",
  "Pencil": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-pencil\" aria-hidden=\"true\"><path d=\"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z\"></path><path d=\"m15 5 4 4\"></path></svg>",
  "Trash2": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-trash lucide-trash-2\" aria-hidden=\"true\"><path d=\"M10 11v6\"></path><path d=\"M14 11v6\"></path><path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6\"></path><path d=\"M3 6h18\"></path><path d=\"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"></path></svg>",
  "ChevronDown": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-chevron-down\" aria-hidden=\"true\"><path d=\"m6 9 6 6 6-6\"></path></svg>",
  "MapPin": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-map-pin\" aria-hidden=\"true\"><path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\"></path><circle cx=\"12\" cy=\"10\" r=\"3\"></circle></svg>",
  "CheckCircle": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-circle-check-big lucide-check-circle\" aria-hidden=\"true\"><path d=\"M21.801 10A10 10 0 1 1 17 3.335\"></path><path d=\"m9 11 3 3L22 4\"></path></svg>",
  "Circle": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"#64748b\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-circle\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle></svg>"
};
const PREFIX = 'SmartBasket / ЛР3 / ';
const PAGE_ID = '0:1';
if (figma.editorType !== 'figma') throw new Error('Відкрийте Figma Design, не FigJam.');
if (figma.fileKey && figma.fileKey !== 'K9H9c4FOZBzi3KgMQGYYMT') throw new Error('Це інший файл. Відкрийте LMV_lab3.');
const page = await figma.getNodeByIdAsync(PAGE_ID);
if (!page || page.type !== 'PAGE') throw new Error('Не знайдено сторінку компонентів LMV_lab3.');
await figma.setCurrentPageAsync(page);
const fonts = await figma.listAvailableFontsAsync();
function inter(weight) {
  const wanted = weight === 700 ? ['Bold'] : weight === 600 ? ['Semi Bold', 'SemiBold'] : ['Regular'];
  const match = fonts.find(f => f.fontName.family === 'Inter' && wanted.includes(f.fontName.style));
  if (!match) throw new Error('Недоступний потрібний Inter: ' + wanted.join('/'));
  return match.fontName;
}
const FONT = {400:inter(400),600:inter(600),700:inter(700)};
await Promise.all(Object.values(FONT).map(f => figma.loadFontAsync(f)));
const created = [], reused = [], inventory = [], warnings = [];
function track(n) { created.push(n.id); return n; }
const colors = {'primary-700':'#1D4ED8','primary-100':'#DBEAFE','secondary-700':'#0F766E','neutral-900':'#0F172A','neutral-600':'#475569','neutral-500':'#64748B','neutral-300':'#CBD5E1','neutral-50':'#F8FAFC',white:'#FFFFFF',success:'#15803D',error:'#B91C1C',warning:'#B45309',info:'#0369A1'};
function rgb(hex) { return {r:parseInt(hex.slice(1,3),16)/255,g:parseInt(hex.slice(3,5),16)/255,b:parseInt(hex.slice(5,7),16)/255}; }
const collections = await figma.variables.getLocalVariableCollectionsAsync();
let collection = collections.find(c => c.name === 'SmartBasket · Foundations');
if (!collection) { collection = figma.variables.createVariableCollection('SmartBasket · Foundations'); created.push(collection.id); }
const locals = await figma.variables.getLocalVariablesAsync();
const normal = s => s.toLowerCase().replace(/[^a-z0-9]/g,'');
const vars = {};
function variable(name,type,value,scopes,alternatives=[]) {
  const names = [name,...alternatives].map(normal);
  let v = locals.find(v => v.variableCollectionId === collection.id && v.resolvedType === type && names.includes(normal(v.name)));
  if (!v) {
    v = figma.variables.createVariable(name,collection,type); v.scopes = scopes;
    v.setValueForMode(collection.defaultModeId,value); v.setVariableCodeSyntax('WEB','var(--'+name.replaceAll('/','-')+')');
    locals.push(v); created.push(v.id);
  }
  vars[name] = v; return v;
}
for (const [name,hex] of Object.entries(colors)) variable(name,'COLOR',rgb(hex),['ALL_FILLS','STROKE_COLOR'],['color/'+name,'colors/'+name]);
for (const n of [0,4,8,12,16,20,24,32,40,48,56]) variable('spacing/'+n,'FLOAT',n,['GAP'],['space/'+n,'spacing-'+n]);
for (const n of [0,8,10,12,16,9999]) variable('radius/'+n,'FLOAT',n,['CORNER_RADIUS'],['radius-'+n]);
for (const n of [44,48,52]) variable('control/'+n,'FLOAT',n,['WIDTH_HEIGHT'],['control/height/'+n]);
function paint(name,opacity=1) {
  return figma.variables.setBoundVariableForPaint({type:'SOLID',color:rgb(colors[name]),opacity},'color',vars[name]);
}
function fill(n,name,opacity=1) { n.fills = name ? [paint(name,opacity)] : []; }
function stroke(n,name,width=1) { n.strokes = name ? [paint(name)] : []; n.strokeWeight=width; }
function bound(n,field,name) { n.setBoundVariable(field,vars[name]); }
const typeScale = {H1:[32,40,700],H2:[28,36,700],H3:[24,32,600],H4:[20,28,600],H5:[18,24,600],H6:[16,24,600],Body:[16,24,400],'Body S':[14,20,400],Caption:[12,16,400],Button:[16,24,600]};
const styles = {}, localStyles = await figma.getLocalTextStylesAsync();
for (const [name,[size,line,weight]] of Object.entries(typeScale)) {
  let s = localStyles.find(s => s.name === 'Inter/'+name && s.fontName.family === 'Inter' && s.fontSize === size && s.lineHeight.unit === 'PIXELS' && s.lineHeight.value === line && s.fontName.style === FONT[weight].style);
  if (!s) s = localStyles.find(s => s.name === PREFIX+'Typography/'+name);
  if (!s) { s = figma.createTextStyle(); s.name=PREFIX+'Typography/'+name; s.fontName=FONT[weight]; s.fontSize=size; s.lineHeight={unit:'PIXELS',value:line}; created.push(s.id); }
  styles[name]=s;
}
function text(parent,value,style='Body',color='neutral-900',width) {
  const t=track(figma.createText()); t.name='Text / '+value.slice(0,40); t.fontName=styles[style].fontName;
  t.textStyleId=styles[style].id; t.characters=value; fill(t,color); parent.appendChild(t);
  if (width) { t.textAutoResize='HEIGHT'; t.resize(width,t.height); }
  else t.textAutoResize='WIDTH_AND_HEIGHT';
  return t;
}
function layout(n,w,h,dir='VERTICAL',pad=16,gap=8,bg='white') {
  n.resize(w,h); n.layoutMode=dir; n.primaryAxisSizingMode='AUTO'; n.counterAxisSizingMode='FIXED';
  n.primaryAxisAlignItems='MIN'; n.counterAxisAlignItems=dir==='HORIZONTAL'?'CENTER':'MIN';
  for (const f of ['paddingTop','paddingBottom','paddingLeft','paddingRight']) bound(n,f,'spacing/'+pad);
  bound(n,'itemSpacing','spacing/'+gap); fill(n,bg); return n;
}
function frame(parent,w,dir='VERTICAL',pad=0,gap=8,bg=null) {
  const n=track(figma.createFrame()); parent.appendChild(n); layout(n,w,44,dir,pad,gap,bg); n.name='Auto Layout'; return n;
}
function radius(n,r=10) { bound(n,'topLeftRadius','radius/'+r); bound(n,'topRightRadius','radius/'+r); bound(n,'bottomLeftRadius','radius/'+r); bound(n,'bottomRightRadius','radius/'+r); }
const ICONS={};
let cursorX=Math.max(0,...page.children.map(n=>n.x+n.width))+96, cursorY=0;
const originX=cursorX;
function place(n) { page.appendChild(n); n.x=cursorX; n.y=cursorY; cursorY+=n.height+64; }
for (const [name,svg] of Object.entries(ICON_SVGS)) {
  let c=page.findOne(n=>n.type==='COMPONENT' && n.name===PREFIX+'Icon/'+name);
  if (!c) {
    c=track(figma.createComponent()); c.name=PREFIX+'Icon/'+name; c.resize(24,24); c.fills=[];
    const v=track(figma.createNodeFromSvg(svg)); c.appendChild(v); v.x=0;v.y=0;
    for (const child of v.findAll(n=>'strokes' in n)) if (child.strokes.length) child.strokes=[paint('neutral-500')];
    c.description='Lucide '+name+' · 24×24, stroke 2. Для дії використовуйте Icon button із зоною 44×44.';
    place(c);
  } else reused.push(c.id);
  ICONS[name]=c;
}
cursorX=originX+160; cursorY=0;
function icon(parent,name='Plus',color='neutral-500') {
  const n=track(ICONS[name].createInstance()); parent.appendChild(n); n.name='Icon';
  for (const child of n.findAll(n=>'strokes' in n)) if (child.strokes.length) child.strokes=[paint(color)];
  return n;
}
const families={};
async function family(name,axes,w,h,build,doc) {
  const full=PREFIX+name;
  const combinations=Object.entries(axes).reduce((rows,[key,values])=>rows.flatMap(row=>values.map(value=>({...row,[key]:value}))),[{}]);
  const existing=page.findOne(n=>n.type==='COMPONENT_SET' && n.name===full);
  if (existing) {
    if (existing.children.length!==combinations.length) throw new Error('Неповний набір '+full+'. Перевірте попередній запуск, щоб не дублювати компоненти.');
    families[name]=existing; reused.push(existing.id); inventory.push({name,id:existing.id,variants:existing.children.length,reused:true}); return existing;
  }
  const nodes=[];
  for (const props of combinations) {
    const c=track(figma.createComponent()); c.name=Object.entries(props).map(([k,v])=>k+'='+v).join(', ');
    layout(c,w,h); await build(c,props); nodes.push(c);
  }
  const set=track(figma.combineAsVariants(nodes,page)); set.name=full; set.description=doc;
  const cols=Math.min(4,nodes.length), colWidths=Array(cols).fill(0);
  nodes.forEach((n,i)=>colWidths[i%cols]=Math.max(colWidths[i%cols],n.width));
  let y=32;
  for (let i=0;i<nodes.length;i+=cols) {
    let x=32, rowHeight=0;
    for(let j=0;j<cols && i+j<nodes.length;j++) { const n=nodes[i+j]; n.x=x;n.y=y;x+=colWidths[j]+24;rowHeight=Math.max(rowHeight,n.height); }
    y+=rowHeight+24;
  }
  set.resize(64+colWidths.reduce((a,b)=>a+b,0)+24*(cols-1),y+8);
  place(set); families[name]=set; inventory.push({name,id:set.id,variants:nodes.length,reused:false});
  if (cursorY>14000) { cursorX+=1900; cursorY=0; }
  return set;
}
function instance(parent,name,props={},label) {
  const set=families[name]; if (!set) throw new Error('Залежність ще не створена: '+name);
  const c=set.children.find(c=>Object.entries(props).every(([k,v])=>c.variantProperties[k]===v)) || set.defaultVariant;
  const n=track(c.createInstance()); parent.appendChild(n); n.name=name;
  if(label) { const t=n.findOne(n=>n.type==='TEXT' && n.name==='Label'); if(t) t.characters=label; }
  return n;
}
function focus(n,state) { if(state==='Focus') { stroke(n,'primary-700',2); n.strokeAlign='OUTSIDE'; } }
function labelProperty(set,defaultValue) {
  if (set.children.every(c=>c.findOne(n=>n.type==='TEXT' && n.name==='Label'))) {
    const key=set.addComponentProperty('Label','TEXT',defaultValue);
    for(const c of set.children) c.findOne(n=>n.type==='TEXT' && n.name==='Label').componentPropertyReferences={characters:key};
  }
}
const interactive=['Default','Hover','Pressed','Focus','Disabled','Loading'];
for(const size of ['S','M']) {
  const set=await family('Button/'+size,{Type:['Primary','Secondary','Text'],State:interactive},192,size==='S'?44:48,(c,p)=>{
    layout(c,192,size==='S'?44:48,'HORIZONTAL',12,8,null); c.primaryAxisSizingMode='FIXED';c.counterAxisSizingMode='FIXED';
    if(size==='S') {bound(c,'paddingTop','spacing/8');bound(c,'paddingBottom','spacing/8');}
    c.primaryAxisAlignItems='CENTER'; radius(c); bound(c,'height','control/'+(size==='S'?44:48));
    let tx='primary-700';
    if(p.State==='Disabled') {fill(c,'neutral-300');tx='neutral-600';}
    else if(p.Type==='Primary') {fill(c,'primary-700',p.State==='Hover'?.95:p.State==='Pressed'?.9:1);tx='white';}
    else {fill(c,p.State==='Hover'||p.State==='Pressed'?'primary-100':'white');if(p.Type==='Secondary')stroke(c,'primary-700');}
    if(p.State==='Loading')icon(c,'LoaderCircle',tx);
    const t=text(c,'Зберегти','Button',tx);t.name='Label';t.visible=p.State!=='Loading'; focus(c,p.State);
  },'Дія. S 44 px, M 48 px. Primary / Secondary / Text; Default, Hover, Pressed, Focus, Disabled, Loading. Do: одна головна дія. Don’t: кілька Primary поруч. Loading зберігає ширину; Disabled без дії. Довгий текст: короткий дієслівний підпис, без обрізання.');
  if(!reused.includes(set.id))labelProperty(set,'Зберегти');
}
await family('Icon button',{State:interactive},44,44,(c,p)=>{
  layout(c,44,44,'HORIZONTAL',0,0,p.State==='Disabled'?'neutral-300':p.State==='Hover'||p.State==='Pressed'?'primary-100':'white');c.primaryAxisSizingMode='FIXED';c.primaryAxisAlignItems='CENTER';radius(c);
  icon(c,p.State==='Loading'?'LoaderCircle':'Plus',p.State==='Disabled'?'neutral-600':'primary-700');focus(c,p.State);
},'Іконкова дія 44×44. Do: доступний підпис дії у реалізації; Don’t: клікабельна іконка 24×24 без поля натискання.');
await family('Input',{State:['Default','Hover','Pressed','Focus','Disabled','Error','Loading','Empty']},350,108,(c,p)=>{
  layout(c,350,108,'VERTICAL',0,4,null);text(c,'Назва набору','H6');
  const box=frame(c,350,'HORIZONTAL',12,8,p.State==='Disabled'?'neutral-50':'white');box.resize(350,52);box.primaryAxisSizingMode='FIXED';radius(box);stroke(box,p.State==='Error'?'error':p.State==='Focus'?'primary-700':'neutral-500',p.State==='Focus'?2:1);
  const t=text(box,p.State==='Empty'?'Введіть назву':'Тижневий раціон','Body',p.State==='Empty'||p.State==='Disabled'?'neutral-600':'neutral-900',294);t.name='Value';
  if(p.State==='Loading')icon(box,'LoaderCircle');
  text(c,p.State==='Error'?'Назва має містити від 2 до 40 символів':'Від 2 до 40 символів','Body S',p.State==='Error'?'error':'neutral-600',350);
},'Постійний label, поле 52 px, helper/error під полем. Do: зберігати введене при помилці. Don’t: замінювати label placeholder-ом. Довгий текст у полі прокручується горизонтально; повідомлення переносяться.');
for(const kind of ['Checkbox','Switch']) {
  await family(kind,{Selected:['False','True'],State:['Default','Hover','Pressed','Focus','Disabled']},350,48,(c,p)=>{
    layout(c,350,48,'HORIZONTAL',0,12,p.State==='Hover'||p.State==='Pressed'?'neutral-50':null);c.primaryAxisSizingMode='FIXED';
    const hit=frame(c,44,'HORIZONTAL',0,0,null);hit.resize(44,44);hit.primaryAxisSizingMode='FIXED';hit.primaryAxisAlignItems='CENTER';
    if(kind==='Checkbox') {const box=frame(hit,24,'HORIZONTAL',0,0,p.Selected==='True'?'primary-700':'white');box.resize(24,24);box.primaryAxisSizingMode='FIXED';radius(box,8);stroke(box,p.State==='Disabled'?'neutral-600':'primary-700');if(p.Selected==='True')icon(box,'Check','white');}
    else {const trackNode=frame(hit,44,'HORIZONTAL',4,0,p.Selected==='True'?'primary-700':'neutral-500');trackNode.resize(44,24);trackNode.primaryAxisSizingMode='FIXED';trackNode.primaryAxisAlignItems=p.Selected==='True'?'MAX':'MIN';radius(trackNode,9999);const thumb=track(figma.createEllipse());thumb.resize(16,16);fill(thumb,'white');trackNode.appendChild(thumb);}
    text(c,kind==='Checkbox'?'Включити магазин':'Зберігати вибір','Body',p.State==='Disabled'?'neutral-600':'neutral-900',282);focus(c,p.State);
  },'Обрано / не обрано, 5 станів, зона 44 px. Click перемикає значення; Disabled не діє. Do: текст поруч. Don’t: передавати вибір лише кольором; чекбокс має check, switch — положення повзунка. Довгий label переноситься.');
}
await family('Badge',{Tone:['Success','Error','Warning','Info','Best']},220,40,(c,p)=>{
  const tx={Success:'success',Error:'error',Warning:'warning',Info:'info',Best:'secondary-700'}[p.Tone];
  layout(c,220,40,'HORIZONTAL',8,8,'white');radius(c,8);stroke(c,tx);
  icon(c,p.Tone==='Error'||p.Tone==='Warning'?'TriangleAlert':'CheckCircle',tx);
  text(c,{Success:'Є в наявності',Error:'Немає в наявності',Warning:'Мало залишилося',Info:'Демо-дані',Best:'Найвигідніше'}[p.Tone],'Body S',tx);
},'Колір + іконка + текст. Best лише для повного кошика. Don’t: бейдж Cheapest на магазині з відсутніми товарами. Не інтерактивний: hover/loading не застосовуються.');
await family('Tag',{Selected:['False','True'],State:['Default','Hover','Pressed','Focus','Disabled']},120,44,(c,p)=>{
  layout(c,120,44,'HORIZONTAL',8,4,p.Selected==='True'?'primary-100':p.State==='Hover'?'neutral-50':'white');c.primaryAxisSizingMode='FIXED';c.primaryAxisAlignItems='CENTER';radius(c,9999);stroke(c,p.State==='Disabled'?'neutral-600':'primary-700');
  if(p.Selected==='True')icon(c,'Check','primary-700');text(c,'Varus','Button',p.State==='Disabled'?'neutral-600':'primary-700');focus(c,p.State);
},'Фільтр магазину, selected + 5 станів. Натискання змінює фільтр; повторне скидає. Do: обраність із check. Don’t: вимикати всі магазини без пояснення.');
await family('Quantity stepper',{State:['Default','Hover','Pressed','Focus','Disabled','Error','Loading','Empty']},350,104,(c,p)=>{
  layout(c,350,104,'VERTICAL',0,8,null);text(c,'Кількість, кг','H6');
  const row=frame(c,350,'HORIZONTAL',0,12,null);instance(row,'Icon button',{State:p.State==='Disabled'?'Disabled':'Default'});row.children[0].findAll(n=>n.type==='INSTANCE' && n.name==='Icon').forEach(n=>n.swapComponent(ICONS.Minus));
  const value=frame(row,180,'HORIZONTAL',12,0,'white');value.resize(180,48);value.primaryAxisSizingMode='FIXED';value.primaryAxisAlignItems='CENTER';radius(value);stroke(value,p.State==='Error'?'error':'neutral-500');text(value,p.State==='Empty'?'—':p.State==='Error'?'0':'1,5','Body');instance(row,'Icon button',{State:p.State==='Loading'?'Loading':p.State==='Disabled'?'Disabled':'Default'});focus(c,p.State);
  if(p.State==='Error')text(c,'Вкажіть кількість, більшу за нуль','Body S','error',350);
},'Точна десяткова кількість; ціна перераховується відразу. Do: одиниця біля label, повідомлення при 0. Don’t: округляти кількість до цілих упаковок у вихідному наборі.');
await family('Search',{State:['Default','Focus','Loading','Error','Empty']},350,180,(c,p)=>{
  layout(c,350,180,'VERTICAL',0,12,null);text(c,'Пошук продуктів','H6');const box=frame(c,350,'HORIZONTAL',12,8,'white');box.resize(350,52);box.primaryAxisSizingMode='FIXED';radius(box);stroke(box,p.State==='Focus'?'primary-700':'neutral-500');icon(box,'Search');text(box,'Рис','Body');
  if(p.State==='Loading') {icon(c,'LoaderCircle');text(c,'Шукаємо продукти…','Body');}
  if(p.State==='Error') {text(c,'Не вдалося завантажити каталог','Body','error',350);instance(c,'Button/M',{Type:'Secondary',State:'Default'},'Спробувати ще');}
  if(p.State==='Empty') {text(c,'Нічого не знайдено','Body','neutral-900',350);instance(c,'Button/M',{Type:'Text',State:'Default'},'Скинути фільтри');}
},'Пошук + фільтрація. Loading, Error із Retry, Empty зі скиданням. Do: зберігати запит і фільтри. Don’t: показувати порожню область без пояснення.');
await family('Product row',{State:['Default','Loading','Error','Empty']},350,160,(c,p)=>{
  layout(c,350,160,'VERTICAL',16,8,'white');radius(c);stroke(c,'neutral-300');
  if(p.State==='Empty') {text(c,'Продукт ще не додано','Body');instance(c,'Button/M',{Type:'Secondary',State:'Default'},'Додати продукт');return;}
  if(p.State==='Loading') {icon(c,'LoaderCircle');text(c,'Завантажуємо продукт…','Body');return;}
  const row=frame(c,318,'HORIZONTAL',0,12,null);icon(row,'Package');text(row,'Вівсяні пластівці','H6','neutral-900',250);
  text(c,'1,5 кг · 54 грн/кг','Body S','neutral-600',318);text(c,'81 грн','H5');
  if(p.State==='Error')text(c,'Немає в наявності. Оберіть заміну.','Body S','error',318);
},'Рядок продукту: назва, точна кількість, одиниця, ціна. Довга назва переноситься. Помилка не приховує збережені дані; заміна через явну дію.');
await family('Set card',{State:['Default','Loading','Error','Empty']},350,200,(c,p)=>{
  layout(c,350,200,'VERTICAL',16,12,'white');radius(c);stroke(c,'neutral-300');
  if(p.State==='Empty') {text(c,'Наборів поки немає','H4','neutral-900',318);instance(c,'Button/M',{Type:'Primary',State:'Default'},'Створити набір');return;}
  text(c,'Тижневий раціон','H4','neutral-900',318);
  if(p.State==='Loading') {instance(c,'Button/M',{Type:'Primary',State:'Loading'});return;}
  if(p.State==='Error')text(c,'Не вдалося відкрити набір','Body S','error',318);
  instance(c,'Button/M',{Type:'Primary',State:'Default'},p.State==='Error'?'Спробувати ще':'Відкрити');
  const actions=frame(c,318,'HORIZONTAL',0,8,null);for(const name of ['Pencil','Copy','Trash2']) {const hit=instance(actions,'Icon button',{State:'Default'});hit.findOne(n=>n.type==='INSTANCE' && n.name==='Icon').swapComponent(ICONS[name]);}
},'Список наборів містить назву та дії: відкрити, перейменувати, дублювати, видалити. Товари — на окремому екрані набору. Do: Undo після видалення. Don’t: змішувати список наборів із редагуванням товарів.');
await family('Store card',{State:['Complete','Incomplete','Loading','Error']},350,240,(c,p)=>{
  layout(c,350,240,'VERTICAL',16,12,'white');radius(c);stroke(c,p.State==='Complete'?'secondary-700':'neutral-300');text(c,p.State==='Incomplete'?'ATB':'Varus','H5');
  if(p.State==='Loading') {icon(c,'LoaderCircle');text(c,'Порівнюємо ціни…','Body');return;}
  if(p.State==='Error') {text(c,'Не вдалося отримати ціни','Body','error',318);instance(c,'Button/M',{Type:'Secondary',State:'Default'},'Спробувати ще');return;}
  text(c,p.State==='Complete'?'238 грн':'143 грн','H3');instance(c,'Badge',{Tone:p.State==='Complete'?'Best':'Error'});
  text(c,p.State==='Complete'?'Усі 3 продукти є в наявності':'Відсутнє молоко. Сума неповна.','Body S','neutral-600',318);instance(c,'Button/M',{Type:'Primary',State:'Default'},'Переглянути кошик');
},'Порівняння повних кошиків. Complete може мати Best; Incomplete показує відсутні товари та неповну суму. Do: явна заміна/виключення; Don’t: вважати неповний кошик найвигіднішим. Ціни демонстраційні.');
await family('List',{State:['Default','Loading','Error','Empty']},350,300,(c,p)=>{
  layout(c,350,300,'VERTICAL',0,12,null);
  if(p.State==='Default') {instance(c,'Product row',{State:'Default'});instance(c,'Product row',{State:'Default'});}
  else if(p.State==='Error') {text(c,'Не вдалося завантажити список','Body','error',350);instance(c,'Button/M',{Type:'Secondary',State:'Default'},'Спробувати ще');}
  else if(p.State==='Loading')instance(c,'Product row',{State:'Loading'});
  else {text(c,'Список порожній','H4');text(c,'Додайте перший продукт до набору','Body','neutral-600',350);instance(c,'Button/M',{Type:'Primary',State:'Default'},'Додати продукт');}
},'Контейнер рядків. Empty дає наступний крок; Error має Retry; Loading показує очікування. Do: стабільний порядок і незалежні ID. Don’t: втрачати введені кількості при помилці.');
await family('Alert',{Tone:['Success','Error','Warning','Info']},350,120,(c,p)=>{
  const tone=p.Tone.toLowerCase();layout(c,350,120,'VERTICAL',16,8,'white');radius(c);stroke(c,tone);const row=frame(c,318,'HORIZONTAL',0,8,null);icon(row,p.Tone==='Error'?'TriangleAlert':'Info',tone);text(row,{Success:'Збережено',Error:'Не вдалося зберегти',Warning:'Не всі товари доступні',Info:'Ціни демонстраційні'}[p.Tone],'H6',tone,280);
  text(c,p.Tone==='Error'?'Дані форми збережено. Спробуйте ще.':'Зміни враховано в поточному кошику.','Body S','neutral-600',318);
},'Feedback: іконка + текст + колір. Помилка пояснює, що зробити далі; не очищає форму. Довгі повідомлення переносяться.');
await family('Snackbar',{State:['Default','Error']},350,112,(c,p)=>{
  layout(c,350,112,'VERTICAL',16,8,'white');radius(c);stroke(c,p.State==='Error'?'error':'neutral-500');text(c,p.State==='Error'?'Не вдалося видалити':'Продукт видалено','Body',p.State==='Error'?'error':'neutral-900',318);instance(c,'Button/S',{Type:'Text',State:'Default'},p.State==='Error'?'Повторити':'Скасувати');
},'Після видалення показати Undo / Скасувати. Do: зберігати достатній час для прочитання. Don’t: прибирати об’єкт без можливості відновлення.');
await family('Header',{Mode:['List','Detail','Search','Cart','Settings']},430,72,(c,p)=>{
  layout(c,430,72,'HORIZONTAL',16,12,'white');c.minHeight=72;
  if(p.Mode!=='List') {const back=instance(c,'Icon button',{State:'Default'});back.findOne(n=>n.type==='INSTANCE' && n.name==='Icon').swapComponent(ICONS.ArrowLeft);}
  text(c,{List:'Мої набори',Detail:'Тижневий раціон',Search:'Додати продукт',Cart:'Кошик',Settings:'Налаштування'}[p.Mode],'H4','neutral-900',p.Mode==='List'?380:310);
},'Шапка екрана. Back повертає до попереднього контексту і зберігає чернетку. Довгі заголовки переносяться; висоту можна збільшити. Don’t: накладати назву на кнопку повернення.');
await family('Nav item',{Selected:['False','True'],State:['Default','Hover','Pressed','Focus','Disabled']},80,64,(c,p)=>{
  layout(c,80,64,'VERTICAL',4,4,p.Selected==='True'||p.State==='Hover'?'primary-100':'white');c.primaryAxisSizingMode='FIXED';c.counterAxisAlignItems='CENTER';radius(c,8);icon(c,'List',p.Selected==='True'?'primary-700':'neutral-600');const t=text(c,'Набори','Caption',p.Selected==='True'?'primary-700':'neutral-600');t.name='Label';focus(c,p.State);
},'Пункт таб-бара з іконкою та підписом; selected + 5 станів. Do: незмінний порядок. Don’t: позначати активний розділ лише кольором.');
await family('Bottom navigation',{Active:['Search','Sets','Compare','Cart','Settings']},430,80,(c,p)=>{
  layout(c,430,80,'HORIZONTAL',8,4,'white');c.primaryAxisSizingMode='FIXED';
  const items=[['Search','Пошук','Search'],['Sets','Набори','List'],['Compare','Ціни','Store'],['Cart','Кошик','ShoppingCart'],['Settings','Опції','Settings']];
  for(const [key,label,ico] of items) {const n=instance(c,'Nav item',{Selected:key===p.Active?'True':'False',State:'Default'});n.layoutSizingHorizontal='FILL';n.findOne(n=>n.type==='TEXT'&&n.name==='Label').characters=label;n.findOne(n=>n.type==='INSTANCE'&&n.name==='Icon').swapComponent(ICONS[ico]);}
},'5 розділів відповідно до поточного застосунку. Активний пункт має підкладку, іконку та підпис. Навігація лишається видимою; прокручується основний вміст.');
for(const form of ['Set form','Product form']) {
  await family(form,{State:['Default','Loading','Error','Empty']},382,320,(c,p)=>{
    layout(c,382,320,'VERTICAL',16,16,'white');radius(c);text(c,form==='Set form'?'Зберегти набір':'Додати продукт','H4');
    instance(c,'Input',{State:p.State==='Error'?'Error':p.State==='Empty'?'Empty':p.State==='Loading'?'Disabled':'Default'});
    if(form==='Product form')instance(c,'Quantity stepper',{State:p.State==='Error'?'Error':p.State==='Loading'?'Disabled':'Default'});
    instance(c,'Button/M',{Type:'Primary',State:p.State==='Loading'?'Loading':p.State==='Empty'?'Disabled':'Default'},p.State==='Loading'?'Збереження…':'Зберегти');instance(c,'Button/M',{Type:'Text',State:p.State==='Loading'?'Disabled':'Default'},'Скасувати');
  },'Форма '+form+'. Default / Loading / Error / Empty. Do: постійні labels, inline помилки, збереження чернетки, одна головна дія. Loading блокує повторний submit. Скасувати повертає назад без втрати попередніх даних. Довгий текст переноситься.');
}
await family('Modal',{State:['Default','Loading','Error','Empty']},414,380,(c,p)=>{
  layout(c,414,380,'VERTICAL',16,12,'white');radius(c,16);stroke(c,'neutral-300');instance(c,'Set form',{State:p.State});
},'Діалог із заголовком, формою та Cancel. Escape/Cancel закриває без змін; повертає фокус на trigger. Do: фокус усередині діалогу, фон недоступний; Don’t: закривати помилку без пояснення. У Figma показано дизайн станів; focus trap реалізований у застосунку.');
await family('Review basket',{State:['Complete','Incomplete','Loading','Error']},382,420,(c,p)=>{
  layout(c,382,420,'VERTICAL',16,12,'white');radius(c,16);text(c,'Кошик у Varus','H4');text(c,'Демонстраційні ціни. Це не оформлення замовлення.','Body S','neutral-600',350);
  if(p.State==='Loading')instance(c,'Button/M',{Type:'Primary',State:'Loading'});
  else if(p.State==='Error')instance(c,'Alert',{Tone:'Error'});
  else {instance(c,'Product row',{State:p.State==='Incomplete'?'Error':'Default'});text(c,p.State==='Complete'?'Разом: 238 грн':'Потрібно обрати заміну','H4','neutral-900',350);instance(c,'Button/M',{Type:'Primary',State:p.State==='Incomplete'?'Disabled':'Default'},'Підтвердити кошик');}
  instance(c,'Button/M',{Type:'Text',State:'Default'},'До порівняння');
},'Підтвердження демонстраційного кошика. Неповний кошик потребує заміни/виключення. Назви й кількості не змінюють вихідний набір. Do: явний підсумок і Cancel; Don’t: імітувати реальну купівлю.');
// Expose replaceable vector icons without an extra variant for each icon.
for(const name of ['Icon button','Nav item']) {
  const set=families[name];if(reused.includes(set.id))continue;
  const key=set.addComponentProperty('Icon','INSTANCE_SWAP',ICONS[name==='Icon button'?'Plus':'List'].id);
  for(const c of set.children) {
    if(c.variantProperties.State==='Loading')continue;
    const n=c.findOne(n=>n.type==='INSTANCE'&&n.name==='Icon');
    if(n)n.componentPropertyReferences={mainComponent:key};
  }
}
// Native interactive variants: hover/press and boolean toggles, 150 ms.
async function change(source,target,trigger) {
  const reactions=[...(source.reactions||[]),{trigger,actions:[{type:'NODE',destinationId:target.id,navigation:'CHANGE_TO',transition:{type:'SMART_ANIMATE',easing:{type:'EASE_OUT'},duration:.15}}]}];
  await source.setReactionsAsync(reactions);
}
for(const name of ['Button/S','Button/M','Icon button','Checkbox','Switch','Tag','Nav item']) {
  const set=families[name];if(reused.includes(set.id))continue;
  for(const c of set.children) {
    const p=c.variantProperties;
    const match=patch=>set.children.find(n=>Object.entries({...p,...patch}).every(([k,v])=>n.variantProperties[k]===v));
    if(p.State==='Default') {if(match({State:'Hover'}))await change(c,match({State:'Hover'}),{type:'ON_HOVER'});if(match({State:'Pressed'}))await change(c,match({State:'Pressed'}),{type:'ON_PRESS'});}
    if(p.State==='Hover'||p.State==='Pressed')await change(c,match({State:'Default'}),{type:'MOUSE_LEAVE',delay:0,deprecatedVersion:false});
    if(p.Selected && p.State!=='Disabled')await change(c,match({Selected:p.Selected==='True'?'False':'True',State:'Default'}),{type:'ON_CLICK'});
  }
}
const docsName=PREFIX+'Документація компонентів';
let docs=page.findOne(n=>n.type==='FRAME'&&n.name===docsName);
if(!docs) {
  docs=track(figma.createFrame());layout(docs,1100,100,'VERTICAL',32,24,'white');docs.name=docsName;
  text(docs,'SmartBasket · Бібліотека ЛР3','H1','neutral-900',1036);
  text(docs,'Атоми → молекули → організми. Всі елементи редаговані. Component descriptions містять do / don’t, стани та поведінку. Старі компоненти та імпортовані екрани збережено.','Body','neutral-600',1036);
  for(const row of inventory) {text(docs,row.name+' · '+row.variants+' variants','H5');text(docs,families[row.name].description,'Body','neutral-600',1036);}
  text(docs,'Патерн 1 · Пошук і фільтрація','H3');text(docs,'Задача: знайти продукт. Search + Tag + Product row + List. Запит і вибір магазину зберігаються; Empty → скинути; Error → повторити.','Body','neutral-900',1036);
  text(docs,'Патерн 2 · Редагування та валідація','H3');text(docs,'Задача: зберегти точний склад набору. Input + Quantity stepper + Product form + Alert + Snackbar. Inline помилка, live перерахунок, Undo після видалення, чернетка при поверненні.','Body','neutral-900',1036);
  text(docs,'Патерн 3 · Порівняння кошиків','H3');text(docs,'Задача: обрати найвигідніший повний кошик. Store card + Badge + Review basket. Неповні пропозиції позначені; підтвердження після заміни/виключення. Дані демонстраційні.','Body','neutral-900',1036);
  text(docs,'Перевірка після запуску','H3');text(docs,'Перевірте вигляд наборів при 100%, перенос довгих назв, Inter, bindings і взаємодії в Present. Скрипт не стверджує завершення пункту 3.6: актуальні екрани потрібно звірити та скласти з цих instances. Loading spinner — редагований вектор; обертання реалізоване у вебзастосунку.','Body','neutral-600',1036);place(docs);
}
// Audit actual native structures. Output is not a claim of visual verification.
const errors=[];
for(const row of inventory) {
  const set=families[row.name];
  if(set.children.some(c=>c.type!=='COMPONENT'))errors.push(row.name+': child is not component');
  if(set.children.some(c=>c.layoutMode==='NONE'))errors.push(row.name+': missing Auto Layout');
  for(const t of set.findAll(n=>n.type==='TEXT')) if(t.fontName!==figma.mixed && t.fontName.family!=='Inter')errors.push(t.id+': unexpected font');
}
page.selection=[docs];figma.viewport.scrollAndZoomIntoView([docs]);
const result={status:errors.length?'needs-review':'created-structure-needs-visual-review',pageId:page.id,documentationId:docs.id,createdNodeIds:created,reusedNodeIds:reused,componentSets:inventory,iconCount:Object.keys(ICONS).length,totalVariants:inventory.reduce((n,x)=>n+x.variants,0),errors,warnings};
print(JSON.stringify(result,null,2));
