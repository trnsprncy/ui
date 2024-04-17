#! /usr/bin/env node
var k=`
                              .:---::-------------:::::::::::                             
                            :+*++++++++++====================:                            
                            =##*::..........................                              
                           .=+*+                                                          
                            -+++======--.     .-=-                                        
                             .-==========-.   :===.                                       
                                      :#*+=   :===.                                       
                                       ****   :===.                                       
                                       +***   :===.                                       
                                       ++++   :===.                                       
                                       ====   :=--.                                       
                                       ====   :---.                                       
                                       -=--   :---.                                       
                                       ----   .:::.                                       
                                       ----   .:::.                                       
                                       -:::   .:--.                                       
                                       ::::   -++*:                                       
                                       .::-=+*####                                        
                                        .-+*#%%%+                                         
                                           .::.                                           
                                                                                          
`,x=`
                              .:---::-------------:::::::::::                             
                            :+*++++++++++====================:                            
                            =##*::..........................                              
                           .=+*+                                                          
                            -+++======--.     .-=-                                        
                             .-==========-.   :===.                                       
                                      :#*+=   :===.                                       
                                       ****   :===.                                       
                                       +***   :===.                                       
                                       ++++   :===.                                       
                                       ====   :=--.                                       
                                       ====   :---.                                       
                                       -=--   :---.                                       
                                       ----   .:::.                                       
                                       ----   .:::.                                       
                                       -:::   .:--.                                       
                                       ::::   -++*:                                       
                                       .::-=+*####                                        
                                        .-+*#%%%+                                         
                                           .::.                                           
                                                                                          
                                  trnsprncy coming soon!
`;import{Command as F}from"commander";var C=new F().name("hello-world").description("Prints a greeting message").argument("[components...]","the components to add").action(async e=>{console.log(x),process.exit(0)});import{z as t}from"zod";var P=t.object({name:t.string(),dependencies:t.array(t.string()).optional(),devDependencies:t.array(t.string()).optional(),uiDependencies:t.array(t.string()).optional(),registryDependencies:t.array(t.string()).optional(),files:t.array(t.string()),type:t.enum(["components:ui","components:component","components:example","components:library"])}),w=t.array(P),I=P.extend({files:t.array(t.object({name:t.string(),content:t.string()}))}),le=t.array(I);import{HttpsProxyAgent as T}from"https-proxy-agent";import R from"node-fetch";import ke,{dirname as A}from"path";import{fileURLToPath as V}from"url";var z="https://raw.githubusercontent.com/trnsprncy/ui/main",S=process.env.COMPONENTS_REGISTRY_URL??"https://trnsprncy.vercel.app",D=process.env.https_proxy?new T(process.env.https_proxy):void 0,U=V(import.meta.url),Ce=A(U);async function B(){try{return await(await R(`${S}/registry/index.json`,{agent:D})).json()}catch(e){throw console.log(e),new Error(`Failed to fetch registry from ${S}.`)}}async function j(e){let n=w.parse(await B());e||(console.log("no components selected"),process.exit(1));let o=[];for(let r of e){let c=n.find(m=>m.name===r);if(c)o.push(c);else{console.log(`Component ${r} not found in registry`);continue}}return o}async function b(e){try{let n=`${z}/packages/site/src/registry/alpha/${e}`;console.log(n);let o=await R(n);if(!o.ok)throw new Error(`Failed to fetch file: ${o.statusText}`);return await o.text()}catch(n){throw console.error("Error fetching file from GitHub:",n),n}}import l from"chalk";import{Command as G}from"commander";import W from"ora";import{z as h}from"zod";var H={info:e=>l.cyan.underline(e),success:e=>l.greenBright(e),error:e=>l.redBright(e),warning:e=>l.yellowBright(e)},L=h.object({components:h.array(h.string()).optional()}),_=new G().name("hello").description("Prints a greeting message").argument("[components...]","the components to add").action(async e=>{console.log(k);let n=L.parse({components:e});n.components?.length||(W(H.warning(`no component was requested!
  exiting.....`)).fail(),process.exit(1));let r=(await j(n.components)).map(m=>m.files).flat(),c=await b(r[0]);console.log(c),process.exit(0)});import q from"path";import p from"fs";import{Command as K}from"commander";import*as u from"semver";import d from"chalk";import s from"ora";import Q from"prompts";import M from"figlet";function $(e){let n=M.textSync(e,{font:"Small"});console.log(`
${n}
`)}var i={info:e=>d.blueBright(e),success:e=>d.greenBright(e),error:e=>d.redBright(e),warning:e=>d.yellowBright(e)},Y="@/components/ui/trnsprncy",X=`
  this alias will be added to your ${i.success("components.json")} file

    ${i.info(`"aliases": {
        "trnsprncy": "@/components/ui/trnsprncy"
      }`)}
`,a={greet:"Hello, There! Fellow frontend Fanatic!",missingPackages:"This project does not meet the minimum requirements:",outdatedPackages:"This project does not meet the minimum requirements:",noDependencies:`No dependencies found in ${i.success("package.json")} file.`,meetsRequirements:"This project meets the minimum requirements!",writeConfiguration:`Adding configuration alias to ${i.success("components.json")}.${X}  Proceed?`,configurationWritten:`Configuration written to ${i.success("components.json")}.`,operationAborted:`${i.error("Operation aborted. Configuration not saved.")}`,componentsFileNotChanged:"Components file will not be changed.",shadcnRequired:`shadcn ${i.success("components.json")} file in your project root is required before running this command`},f=q.join(process.cwd(),"components.json");function v(){return p.existsSync(f)?JSON.parse(p.readFileSync(f,"utf-8")):{}}var Z=()=>{let e=v();return e?.aliases||(s(a.shadcnRequired).fail(),process.exit(1)),!!e.aliases?.trnsprncy},J=new K().name("init").description(a.greet).action(()=>{$("Initializing:"),Z()&&(s(`trnsprncy alias already exists in ${i.success("components.json")}`).fail(),process.exit(1)),te().then(e=>{e.missingPackages.length||e.outdatedPackages.length?(s(i.error(a.missingPackages)).fail(),console.log("Minimum Requirements:"),e.missingPackages.length>0&&console.log("\u2192 "+e.missingPackages.join(`
`)),e.outdatedPackages.length>0&&e.outdatedPackages.forEach(n=>{console.log(`\u2192 ${n.packageName}: installed ${n.installedVersion}, required ${n.requiredVersion}`)}),process.exit(1)):(s(a.meetsRequirements).succeed(),ne())}).catch(e=>{s(`Error checking required packages: ${e}`).fail()})}),N=e=>(/^\^\d+$/.test(e)&&(e=e+".0.0"),e.replace(/[^0-9.]/g,"")),y={next:"^14.0.1"};async function ee(){let e=q.join(process.cwd(),"package.json"),n=JSON.parse(p.readFileSync(e,"utf-8"));if(!Object.keys(n.dependencies)?.length)return{};for(let o in n.dependencies)n.dependencies[o]=N(n.dependencies[o]);return n.dependencies}async function ne(){let{confirmation:e}=await Q({type:"toggle",name:"confirmation",message:a.writeConfiguration,initial:!0,active:"yes",inactive:"no"});if(e){p.existsSync(f)||(s(a.shadcnRequired).fail(),process.exit(1));let n=v();n.aliases.trnsprncy=Y,p.writeFileSync(f,JSON.stringify(n,null,2)),s(a.configurationWritten).succeed()}else s(a.operationAborted).fail()}async function te(){let e=await ee();if(!Object.keys(e)?.length)return s(a.noDependencies).fail(),{missingPackages:Object.keys(y),outdatedPackages:[]};let n=[],o=[];s("checking for required packages...").succeed();for(let r in y){let c=e[r];if(!c)n.push(r);else{let m=N(y[r]),g=c;!u.satisfies(g,m)&&u.lt(g,m)&&o.push({packageName:r,installedVersion:g,requiredVersion:m})}}return{missingPackages:n,outdatedPackages:o}}import oe from"fs";import O from"path";import{fileURLToPath as re}from"url";var se=O.dirname(re(import.meta.url)),E={getContent(){let e=O.resolve(se,"../","package.json");return JSON.parse(oe.readFileSync(e,"utf-8"))},get version(){let e=this.getContent(),{version:n}=e;return n||"0.0.0"}};import{Command as ie}from"commander";(async()=>{let e=new ie;e.name(">").description("\u26A1\uFE0F transparency/ui.").version(E.version,"-v, --version","display the version number"),e.addCommand(J).addCommand(_).addCommand(C),e.parse()})();
