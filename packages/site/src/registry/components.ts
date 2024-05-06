import { Registry } from "./schema";
import { library } from "./library";
import { demo } from "./demo";
import { example } from "./example";



export const registry: Registry = [...library, ...demo, ...example];
