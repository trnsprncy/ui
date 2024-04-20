#! /usr/bin/env node
import{Command as D}from"commander";import G from"chalk-animation";var R=new D().name("hello-world").description("Prints a greeting message").argument("[components...]","the components to add").action(()=>{B(),process.exit(0)}),B=()=>G.rainbow("hello");import{z as o}from"zod";var b=o.object({name:o.string(),dependencies:o.array(o.string()).optional(),devDependencies:o.array(o.string()).optional(),uiDependencies:o.array(o.string()).optional(),registryDependencies:o.array(o.string()).optional(),files:o.array(o.string()),type:o.enum(["components:ui","components:component","components:example","components:library"])}),d=o.array(b),U=b.extend({files:o.array(o.object({name:o.string(),content:o.string()}))}),ke=o.array(U);import{HttpsProxyAgent as W}from"https-proxy-agent";import $ from"node-fetch";var H="https://raw.githubusercontent.com/trnsprncy/ui/main",j=process.env.COMPONENTS_REGISTRY_URL??"https://trnsprncy.vercel.app",L=process.env.https_proxy?new W(process.env.https_proxy):void 0;async function w(){try{return await(await $(`${j}/registry/index.json`,{agent:L})).json()}catch(e){throw console.log(e),new Error(`Failed to fetch registry from ${j}.`)}}async function v(e){let n=d.parse(await w());e||(console.log("no components selected"),process.exit(1));let t=[];for(let s of e){let r=n.find(a=>a.name===s);if(r)t.push(r);else{console.log(`Component ${s} not found in registry`);continue}}return t}function J(e){return e.map(t=>t.files).flat()}async function N(e){try{let n=[];for(let t of e){let s=`${H}/packages/site/src/registry/alpha/${t}`,r=await $(s);if(!r.ok)throw new Error(`Failed to fetch file '${t}': ${r.statusText}`);let a=await r.text();n.push(a)}return n}catch(n){throw console.error("Error fetching files from GitHub:",n),n}}import f from"chalk";import{Command as M}from"commander";import K from"ora";import Q from"prompts";import{z as u}from"zod";var Y={info:e=>f.cyan.underline(e),success:e=>f.greenBright(e),error:e=>f.redBright(e),warning:e=>f.yellowBright(e)},X=u.object({components:u.array(u.string()).optional(),all:u.boolean()}),O=new M().name("add").description("Prints a greeting message").argument("[components...]","the components to add").option("-a, --all","add all available components",!1).action(async(e,n)=>{let t=X.parse({components:e,...n}),s=d.parse(await w()),r=t.all?s.map(x=>x.name):t.components;if(!t.components?.length){let{components:x}=await Q({type:"multiselect",name:"components",message:"Which components would you like to add?",hint:"Space to select. A to toggle all. Enter to submit.",instructions:!1,choices:s.map(P=>({title:P.name,value:P.name,selected:t.all?!0:t.components?.includes(P.name)}))});r=x}r?.length||(K(Y.warning(`no component was requested!
  exiting.....`)).fail(),process.exit(1));let a=await v(r),g=J(a),z=await N(g);console.log(z),process.exit(0)});import Z from"figlet";function q(e){let n=Z.textSync(e,{font:"Small"});console.log(`
${n}
`)}import h from"chalk";import{Command as ee}from"commander";import p from"fs";import i from"ora";import l from"path";import ne from"prompts";import*as k from"semver";var c={info:e=>h.blueBright(e),success:e=>h.greenBright(e),error:e=>h.redBright(e),warning:e=>h.yellowBright(e)},S="@/components/ui/trnsprncy",te=`
  this alias will be added to your ${c.success("components.json")} file

    ${c.info(`"aliases": {
        "trnsprncy": "@/components/ui/trnsprncy"
      }`)}
`,m={greet:"Hello, There! Fellow frontend Fanatic!",missingPackages:"This project does not meet the minimum requirements:",outdatedPackages:"This project does not meet the minimum requirements:",noDependencies:`No dependencies found in ${c.success("package.json")} file.`,meetsRequirements:"This project meets the minimum requirements!",writeConfiguration:`Adding configuration alias to ${c.success("components.json")}.${te}  Proceed?`,configurationWritten:`Configuration written to ${c.success("components.json")}.`,operationAborted:`${c.error("Operation aborted. Configuration not saved.")}`,componentsFileNotChanged:"Components file will not be changed.",shadcnRequired:`shadcn ${c.success("components.json")} file in your project root is required before running this command`},y=l.join(process.cwd(),"components.json");function I(){return p.existsSync(y)?JSON.parse(p.readFileSync(y,"utf-8")):{}}var oe=()=>{let e=I();return e?.aliases||(i(m.shadcnRequired).fail(),process.exit(1)),!!e.aliases?.trnsprncy},T=new ee().name("init").description(m.greet).action(()=>{q("Initializing:"),oe()&&(i(`trnsprncy alias already exists in ${c.success("components.json")}`).fail(),process.exit(1)),me().then(e=>{e.missingPackages.length||e.outdatedPackages.length?(i(c.error(m.missingPackages)).fail(),console.log("Minimum Requirements:"),e.missingPackages.length>0&&console.log("\u2192 "+e.missingPackages.join(`
`)),e.outdatedPackages.length>0&&e.outdatedPackages.forEach(n=>{console.log(`\u2192 ${n.packageName}: installed ${n.installedVersion}, required ${n.requiredVersion}`)}),process.exit(1)):(i(m.meetsRequirements).succeed(),ce())}).catch(e=>{i(`Error checking required packages: ${e}`).fail()})}),_=e=>(/^\^\d+$/.test(e)&&(e=e+".0.0"),e.replace(/[^0-9.]/g,"")),C={next:"^14.0.1"};async function se(){let e=l.join(process.cwd(),"package.json"),n=JSON.parse(p.readFileSync(e,"utf-8"));if(!Object.keys(n.dependencies)?.length)return{};for(let t in n.dependencies)n.dependencies[t]=_(n.dependencies[t]);return n.dependencies}var E=l.join(process.cwd(),"tsconfig.json");function re(){return p.existsSync(E)?JSON.parse(p.readFileSync(E,"utf-8")):{}}function ie(){try{let n=re().compilerOptions?.paths||{};return!!n["@/*"]&&n["@/*"][0]==="./src/*"}catch(e){return console.error("Error parsing tsconfig:",e),!1}}var A=e=>{p.mkdir(e,{recursive:!0},n=>{n&&console.error("Error creating directory:",n)})},ae={true:()=>A(l.join(process.cwd(),"/src",S.replace("@",""))),false:()=>A(l.join(process.cwd(),S.replace("@","")))};async function ce(){let{confirmation:e}=await ne({type:"toggle",name:"confirmation",message:m.writeConfiguration,initial:!0,active:"yes",inactive:"no"});if(e){p.existsSync(y)||(i(m.shadcnRequired).fail(),process.exit(1));let n=I();n.aliases.trnsprncy=S,p.writeFileSync(y,JSON.stringify(n,null,2));let t=ie()?"true":"false",s=ae[t];s(),i(m.configurationWritten).succeed()}else i(m.operationAborted).fail()}async function me(){let e=await se();if(!Object.keys(e)?.length)return i(m.noDependencies).fail(),{missingPackages:Object.keys(C),outdatedPackages:[]};let n=[],t=[];i("checking for required packages...").succeed();for(let s in C){let r=e[s];if(!r)n.push(s);else{let a=_(C[s]),g=r;g||n.push(s),!k.satisfies(g,a)&&k.lt(g,a)&&t.push({packageName:s,installedVersion:g,requiredVersion:a})}}return{missingPackages:n,outdatedPackages:t}}import pe from"fs";import F from"path";import{fileURLToPath as ge}from"url";var le=F.dirname(ge(import.meta.url)),V={getContent(){let e=F.resolve(le,"../","package.json");return JSON.parse(pe.readFileSync(e,"utf-8"))},get version(){let e=this.getContent(),{version:n}=e;return n||"0.0.0"}};import{Command as de}from"commander";(async()=>{let e=new de;e.name(">").description("\u26A1\uFE0F transparency/ui.").version(V.version,"-v, --version","display the version number"),e.addCommand(T).addCommand(O).addCommand(R),e.parse()})();
