#! /usr/bin/env node
var x=`
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
                                                                                          
`,C=`
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
`;import{Command as T}from"commander";var P=new T().name("hello-world").description("Prints a greeting message").argument("[components...]","the components to add").action(async e=>{console.log(C),process.exit(0)});import{z as t}from"zod";var S=t.object({name:t.string(),dependencies:t.array(t.string()).optional(),devDependencies:t.array(t.string()).optional(),registryDependencies:t.array(t.string()).optional(),files:t.array(t.string()),type:t.enum(["components:ui","components:component","components:example"])}),d=t.array(S),F=S.extend({files:t.array(t.object({name:t.string(),content:t.string()}))}),de=t.array(F);var R=[{name:"alert",type:"components:ui",files:["ui/alert.tsx"]},{name:"badge",type:"components:ui",files:["ui/badge.tsx"]},{name:"card",type:"components:ui",files:["ui/card.tsx"]},{name:"input",type:"components:ui",files:["ui/input.tsx"]},{name:"skeleton",type:"components:ui",files:["ui/skeleton.tsx"]},{name:"table",type:"components:ui",files:["ui/table.tsx"]},{name:"textarea",type:"components:ui",files:["ui/textarea.tsx"]}];var w=[...R];import z from"fs";import j,{dirname as D}from"path";import{fileURLToPath as V}from"url";var B=V(import.meta.url),W=D(B);async function b(){try{return d.parse(w)}catch(e){console.error("Failed to fetch registry:",e)}}async function q(e,n){n||(console.log("no components selected"),process.exit(1));let o=[];for(let s of n){let c=e.find(m=>m.name===s);if(c)o.push(c);else{console.log(`Component ${s} not found in registry`);continue}}return o}function J(e,n){let o=j.join(e,n);try{return z.readFileSync(j.resolve(W,o),"utf8")}catch(s){console.error(`Error reading file ${o}:`,s)}}import l from"chalk";import{Command as L}from"commander";import U from"ora";import{z as h}from"zod";var H={info:e=>l.cyan.underline(e),success:e=>l.greenBright(e),error:e=>l.redBright(e),warning:e=>l.yellowBright(e)},M=h.object({components:h.array(h.string()).optional()}),_=new L().name("hello").description("Prints a greeting message").argument("[components...]","the components to add").action(async e=>{console.log(x);let n=M.parse({components:e});n.components?.length||(U(H.warning(`no component was requested!
  exiting.....`)).fail(),process.exit(1));let o=d.parse(await b()),c=(await q(o,n.components)).map(p=>p.files).flat(),m=J("../src/registry",c[0]);console.log(m),process.exit(0)});import I from"path";import g from"fs";import{Command as K}from"commander";import*as y from"semver";import f from"chalk";import r from"ora";import Q from"prompts";import G from"figlet";function $(e){let n=G.textSync(e,{font:"Small"});console.log(`
${n}
`)}var i={info:e=>f.blueBright(e),success:e=>f.greenBright(e),error:e=>f.redBright(e),warning:e=>f.yellowBright(e)},X="@/components/ui/trnsprncy",Y=`
  this alias will be added to your ${i.success("components.json")} file

    ${i.info(`"aliases": {
        "trnsprncy": "@/components/ui/trnsprncy"
      }`)}
`,a={greet:"Hello, There! Fellow frontend Fanatic!",missingPackages:"This project does not meet the minimum requirements:",outdatedPackages:"This project does not meet the minimum requirements:",noDependencies:`No dependencies found in ${i.success("package.json")} file.`,meetsRequirements:"This project meets the minimum requirements!",writeConfiguration:`Adding configuration alias to ${i.success("components.json")}.${Y}  Proceed?`,configurationWritten:`Configuration written to ${i.success("components.json")}.`,operationAborted:`${i.error("Operation aborted. Configuration not saved.")}`,componentsFileNotChanged:"Components file will not be changed.",shadcnRequired:`shadcn ${i.success("components.json")} file in your project root is required before running this command`},u=I.join(process.cwd(),"components.json");function N(){return g.existsSync(u)?JSON.parse(g.readFileSync(u,"utf-8")):{}}var Z=()=>{let e=N();return e?.aliases||(r(a.shadcnRequired).fail(),process.exit(1)),!!e.aliases?.trnsprncy},O=new K().name("init").description(a.greet).action(()=>{$("Initializing:"),Z()&&(r(`trnsprncy alias already exists in ${i.success("components.json")}`).fail(),process.exit(1)),te().then(e=>{e.missingPackages.length||e.outdatedPackages.length?(r(i.error(a.missingPackages)).fail(),console.log("Minimum Requirements:"),e.missingPackages.length>0&&console.log("\u2192 "+e.missingPackages.join(`
`)),e.outdatedPackages.length>0&&e.outdatedPackages.forEach(n=>{console.log(`\u2192 ${n.packageName}: installed ${n.installedVersion}, required ${n.requiredVersion}`)}),process.exit(1)):(r(a.meetsRequirements).succeed(),ne())}).catch(e=>{r(`Error checking required packages: ${e}`).fail()})}),v=e=>(/^\^\d+$/.test(e)&&(e=e+".0.0"),e.replace(/[^0-9.]/g,"")),k={next:"^14.0.1"};async function ee(){let e=I.join(process.cwd(),"package.json"),n=JSON.parse(g.readFileSync(e,"utf-8"));if(!Object.keys(n.dependencies)?.length)return{};for(let o in n.dependencies)n.dependencies[o]=v(n.dependencies[o]);return n.dependencies}async function ne(){let{confirmation:e}=await Q({type:"toggle",name:"confirmation",message:a.writeConfiguration,initial:!0,active:"yes",inactive:"no"});if(e){g.existsSync(u)||(r(a.shadcnRequired).fail(),process.exit(1));let n=N();n.aliases.trnsprncy=X,g.writeFileSync(u,JSON.stringify(n,null,2)),r(a.configurationWritten).succeed()}else r(a.operationAborted).fail()}async function te(){let e=await ee();if(!Object.keys(e)?.length)return r(a.noDependencies).fail(),{missingPackages:Object.keys(k),outdatedPackages:[]};let n=[],o=[];r("checking for required packages...").succeed();for(let s in k){let c=e[s];if(!c)n.push(s);else{let m=v(k[s]),p=c;!y.satisfies(p,m)&&y.lt(p,m)&&o.push({packageName:s,installedVersion:p,requiredVersion:m})}}return{missingPackages:n,outdatedPackages:o}}import oe from"fs";import A from"path";import{fileURLToPath as se}from"url";var re=A.dirname(se(import.meta.url)),E={getContent(){let e=A.resolve(re,"../","package.json");return JSON.parse(oe.readFileSync(e,"utf-8"))},get version(){let e=this.getContent(),{version:n}=e;return n||"0.0.0"}};import{Command as ie}from"commander";(async()=>{let e=new ie;e.name(">").description("\u26A1\uFE0F transparency/ui.").version(E.version,"-v, --version","display the version number"),e.addCommand(O).addCommand(_).addCommand(P),e.parse()})();
