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
`;import{Command as z}from"commander";var P=new z().name("hello-world").description("Prints a greeting message").argument("[components...]","the components to add").action(async e=>{console.log(C),process.exit(0)});import{z as t}from"zod";var S=t.object({name:t.string(),dependencies:t.array(t.string()).optional(),devDependencies:t.array(t.string()).optional(),registryDependencies:t.array(t.string()).optional(),files:t.array(t.string()),type:t.enum(["components:ui","components:component","components:example"])}),d=t.array(S),D=S.extend({files:t.array(t.object({name:t.string(),content:t.string()}))}),ue=t.array(D);var R=[{name:"alert",type:"components:ui",files:["ui/alert.tsx"]},{name:"badge",type:"components:ui",files:["ui/badge.tsx"]},{name:"card",type:"components:ui",files:["ui/card.tsx"]},{name:"input",type:"components:ui",files:["ui/input.tsx"]},{name:"skeleton",type:"components:ui",files:["ui/skeleton.tsx"]},{name:"table",type:"components:ui",files:["ui/table.tsx"]},{name:"textarea",type:"components:ui",files:["ui/textarea.tsx"]}];var j=[...R];import V from"fs";import b,{dirname as B}from"path";import{fileURLToPath as L}from"url";var W=L(import.meta.url),G=B(W);async function w(){try{return d.parse(j)}catch(e){console.error("Failed to fetch registry:",e)}}async function q(e,n){n||(console.log("no components selected"),process.exit(1));let o=[];for(let r of n){let a=e.find(c=>c.name===r);if(a)o.push(a);else{console.log(`Component ${r} not found in registry`);continue}}return o}function J(e,n){let o=b.join(e,n);try{return V.readFileSync(b.resolve(G,o),"utf8")}catch(r){console.error(`Error reading file ${o}:`,r)}}import l from"chalk";import{Command as U}from"commander";import H from"ora";import{z as h}from"zod";var M={info:e=>l.cyan.underline(e),success:e=>l.greenBright(e),error:e=>l.redBright(e),warning:e=>l.yellowBright(e)},K=h.object({components:h.array(h.string()).optional()}),_=new U().name("hello").description("Prints a greeting message").argument("[components...]","the components to add").action(async e=>{console.log(x);let n=K.parse({components:e});n.components?.length||(H(M.warning(`no component was requested!
  exiting.....`)).fail(),process.exit(1));let o=d.parse(await w()),a=(await q(o,n.components)).map(m=>m.files).flat(),c=J("../src/registry",a[0]);console.log(c),process.exit(0)});import Q from"figlet";function $(e){let n=Q.textSync(e,{font:"Small"});console.log(`
${n}
`)}import u from"chalk";import{Command as X}from"commander";import g from"fs";import s from"ora";import N from"path";import Y from"readline";import*as y from"semver";var Z=e=>u.cyan.underline(e),p=e=>u.greenBright(e),O=e=>u.redBright(e),ee="@/components/ui/transparency",ne=`
this alias will be added to your ${p("components.json")} file

  ${u.blueBright(`"aliases": {
      "transparency": "@/components/ui/transparency"
    }`)}

`,i={greet:"Hello, There! Fellow frontend Fanatic!",missingPackages:"This project does not meet the minimum requirements:",outdatedPackages:"This project does not meet the minimum requirements:",noDependencies:`No dependencies found in ${p("package.json")} file.`,meetsRequirements:"This project meets the minimum requirements!",writeConfiguration:`Adding configuration alias to ${p("components.json")}.${ne}Proceed? (${Z("no")} / yes): `,configurationWritten:`Configuration written to ${p("components.json")}.`,operationAborted:`${O("Operation aborted. Configuration not saved.")}`,componentsFileNotChanged:"Components file will not be changed.",shadcnRequired:`shadcn ${p("components.json")} file in your project root is required before running this command`},te=e=>e.toLowerCase()==="y"||e.toLowerCase()==="yes",I=Y.createInterface({input:process.stdin,output:process.stdout}),f=N.join(process.cwd(),"components.json");function A(){return g.existsSync(f)?JSON.parse(g.readFileSync(f,"utf-8")):{}}var oe=()=>{let e=A();return e?.aliases||(s(i.shadcnRequired).fail(),process.exit(1)),!!e.aliases?.transparency},v=new X().name("init").description(i.greet).action(()=>{$("Initializing:"),oe()&&(s(`Transparency alias already exists in ${p("components.json")}`).fail(),process.exit(1)),se().then(e=>{e.missingPackages.length||e.outdatedPackages.length?(s(O(i.missingPackages)).fail(),console.log("Minimum Requirements:"),e.missingPackages.length>0&&console.log("\u2192 "+e.missingPackages.join(`
`)),e.outdatedPackages.length>0&&e.outdatedPackages.forEach(n=>{console.log(`\u2192 ${n.packageName}: installed ${n.installedVersion}, required ${n.requiredVersion}`)}),process.exit(1)):(s(i.meetsRequirements).succeed(),I.question(i.writeConfiguration,async n=>{if(te(n)){g.existsSync(f)||(s(i.shadcnRequired).fail(),process.exit(1));let o=A();o.aliases.transparency=ee,g.writeFileSync(f,JSON.stringify(o,null,2)),s(i.configurationWritten).succeed()}else s(i.operationAborted).fail();I.close()}))}).catch(e=>{s(`Error checking required packages: ${e}`).fail()})}),E=e=>(/^\^\d+$/.test(e)&&(e=e+".0.0"),e.replace(/[^0-9.]/g,"")),k={next:"^14.0.1"};async function re(){let e=N.join(process.cwd(),"package.json"),n=JSON.parse(g.readFileSync(e,"utf-8"));if(!Object.keys(n.dependencies)?.length)return{};for(let o in n.dependencies)n.dependencies[o]=E(n.dependencies[o]);return n.dependencies}async function se(){let e=await re();if(!Object.keys(e)?.length)return s(i.noDependencies).fail(),{missingPackages:Object.keys(k),outdatedPackages:[]};let n=[],o=[];s("checking for required packages...").succeed();for(let r in k){let a=e[r];if(!a)n.push(r);else{let c=E(k[r]),m=a;!y.satisfies(m,c)&&y.lt(m,c)&&o.push({packageName:r,installedVersion:m,requiredVersion:c})}}return{missingPackages:n,outdatedPackages:o}}import ie from"fs";import T from"path";import{fileURLToPath as ae}from"url";var ce=T.dirname(ae(import.meta.url)),F={getContent(){let e=T.resolve(ce,"../","package.json");return JSON.parse(ie.readFileSync(e,"utf-8"))},get version(){let e=this.getContent(),{version:n}=e;return n||"0.0.0"}};import{Command as me}from"commander";(async()=>{let e=new me;e.name(">").description("\u26A1\uFE0F transparency/ui.").version(F.version,"-v, --version","display the version number"),e.addCommand(v).addCommand(_).addCommand(P),e.parse()})();
