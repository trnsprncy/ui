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
`;import{Command as I}from"commander";var P=new I().name("hello-world").description("Prints a greeting message").argument("[components...]","the components to add").action(async e=>{console.log(x),process.exit(0)});import{z as t}from"zod";var C=t.object({name:t.string(),dependencies:t.array(t.string()).optional(),devDependencies:t.array(t.string()).optional(),uiDependencies:t.array(t.string()).optional(),registryDependencies:t.array(t.string()).optional(),files:t.array(t.string()),type:t.enum(["components:ui","components:component","components:example","components:library"])}),w=t.array(C),T=C.extend({files:t.array(t.object({name:t.string(),content:t.string()}))}),pe=t.array(T);import{HttpsProxyAgent as F}from"https-proxy-agent";import R from"node-fetch";var V="https://raw.githubusercontent.com/trnsprncy/ui/main",S=process.env.COMPONENTS_REGISTRY_URL??"https://trnsprncy.vercel.app",z=process.env.https_proxy?new F(process.env.https_proxy):void 0;async function D(){try{return await(await R(`${S}/registry/index.json`,{agent:z})).json()}catch(e){throw console.log(e),new Error(`Failed to fetch registry from ${S}.`)}}async function j(e){let n=w.parse(await D());e||(console.log("no components selected"),process.exit(1));let o=[];for(let s of e){let r=n.find(m=>m.name===s);if(r)o.push(r);else{console.log(`Component ${s} not found in registry`);continue}}return o}function b(e){return e.map(o=>o.files).flat()}async function $(e){try{let n=[];for(let o of e){let s=`${V}/packages/site/src/registry/alpha/${o}`,r=await R(s);if(!r.ok)throw new Error(`Failed to fetch file '${o}': ${r.statusText}`);let m=await r.text();n.push(m)}return n}catch(n){throw console.error("Error fetching files from GitHub:",n),n}}import d from"chalk";import{Command as B}from"commander";import G from"ora";import{z as h}from"zod";var U={info:e=>d.cyan.underline(e),success:e=>d.greenBright(e),error:e=>d.redBright(e),warning:e=>d.yellowBright(e)},W=h.object({components:h.array(h.string()).optional()}),q=new B().name("hello").description("Prints a greeting message").argument("[components...]","the components to add").action(async e=>{console.log(k);let n=W.parse({components:e});n.components?.length||(G(U.warning(`no component was requested!
  exiting.....`)).fail(),process.exit(1));let o=await j(n.components),s=b(o),r=await $(s);console.log(r),process.exit(0)});import J from"path";import p from"fs";import{Command as L}from"commander";import*as u from"semver";import l from"chalk";import i from"ora";import M from"prompts";import H from"figlet";function v(e){let n=H.textSync(e,{font:"Small"});console.log(`
${n}
`)}var a={info:e=>l.blueBright(e),success:e=>l.greenBright(e),error:e=>l.redBright(e),warning:e=>l.yellowBright(e)},K="@/components/ui/trnsprncy",Q=`
  this alias will be added to your ${a.success("components.json")} file

    ${a.info(`"aliases": {
        "trnsprncy": "@/components/ui/trnsprncy"
      }`)}
`,c={greet:"Hello, There! Fellow frontend Fanatic!",missingPackages:"This project does not meet the minimum requirements:",outdatedPackages:"This project does not meet the minimum requirements:",noDependencies:`No dependencies found in ${a.success("package.json")} file.`,meetsRequirements:"This project meets the minimum requirements!",writeConfiguration:`Adding configuration alias to ${a.success("components.json")}.${Q}  Proceed?`,configurationWritten:`Configuration written to ${a.success("components.json")}.`,operationAborted:`${a.error("Operation aborted. Configuration not saved.")}`,componentsFileNotChanged:"Components file will not be changed.",shadcnRequired:`shadcn ${a.success("components.json")} file in your project root is required before running this command`},f=J.join(process.cwd(),"components.json");function N(){return p.existsSync(f)?JSON.parse(p.readFileSync(f,"utf-8")):{}}var Y=()=>{let e=N();return e?.aliases||(i(c.shadcnRequired).fail(),process.exit(1)),!!e.aliases?.trnsprncy},_=new L().name("init").description(c.greet).action(()=>{v("Initializing:"),Y()&&(i(`trnsprncy alias already exists in ${a.success("components.json")}`).fail(),process.exit(1)),ee().then(e=>{e.missingPackages.length||e.outdatedPackages.length?(i(a.error(c.missingPackages)).fail(),console.log("Minimum Requirements:"),e.missingPackages.length>0&&console.log("\u2192 "+e.missingPackages.join(`
`)),e.outdatedPackages.length>0&&e.outdatedPackages.forEach(n=>{console.log(`\u2192 ${n.packageName}: installed ${n.installedVersion}, required ${n.requiredVersion}`)}),process.exit(1)):(i(c.meetsRequirements).succeed(),Z())}).catch(e=>{i(`Error checking required packages: ${e}`).fail()})}),E=e=>(/^\^\d+$/.test(e)&&(e=e+".0.0"),e.replace(/[^0-9.]/g,"")),y={next:"^14.0.1"};async function X(){let e=J.join(process.cwd(),"package.json"),n=JSON.parse(p.readFileSync(e,"utf-8"));if(!Object.keys(n.dependencies)?.length)return{};for(let o in n.dependencies)n.dependencies[o]=E(n.dependencies[o]);return n.dependencies}async function Z(){let{confirmation:e}=await M({type:"toggle",name:"confirmation",message:c.writeConfiguration,initial:!0,active:"yes",inactive:"no"});if(e){p.existsSync(f)||(i(c.shadcnRequired).fail(),process.exit(1));let n=N();n.aliases.trnsprncy=K,p.writeFileSync(f,JSON.stringify(n,null,2)),i(c.configurationWritten).succeed()}else i(c.operationAborted).fail()}async function ee(){let e=await X();if(!Object.keys(e)?.length)return i(c.noDependencies).fail(),{missingPackages:Object.keys(y),outdatedPackages:[]};let n=[],o=[];i("checking for required packages...").succeed();for(let s in y){let r=e[s];if(!r)n.push(s);else{let m=E(y[s]),g=r;!u.satisfies(g,m)&&u.lt(g,m)&&o.push({packageName:s,installedVersion:g,requiredVersion:m})}}return{missingPackages:n,outdatedPackages:o}}import ne from"fs";import O from"path";import{fileURLToPath as te}from"url";var oe=O.dirname(te(import.meta.url)),A={getContent(){let e=O.resolve(oe,"../","package.json");return JSON.parse(ne.readFileSync(e,"utf-8"))},get version(){let e=this.getContent(),{version:n}=e;return n||"0.0.0"}};import{Command as se}from"commander";(async()=>{let e=new se;e.name(">").description("\u26A1\uFE0F transparency/ui.").version(A.version,"-v, --version","display the version number"),e.addCommand(_).addCommand(q).addCommand(P),e.parse()})();
