import type { SgRoot } from "codemod:ast-grep";
import type TS from "codemod:ast-grep/langs/typescript";

async function transform(root: SgRoot<TS>): Promise<string> {
	const rootNode = root.root();

	// Find all app.use() calls
	const appUseCalls = rootNode.findAll({
		rule: {
			pattern: "$OBJ.use($ARGS)",
			inside: {
				kind: "expression_statement"
			}
		}
	});

	const edits = appUseCalls.map((node) => {
		const obj = node.getMatch("OBJ")?.text();
		const args = node.getMatch("ARGS")?.text();
		
		// Add a comment explaining the removal and suggest replacement
		const comment = `// TODO: Replace ${obj}.use(${args}) with appropriate Fastify plugin
// Common replacements:
// - cors() → @fastify/cors
// - helmet() → @fastify/helmet
// - express-session → @fastify/session
// Example: await ${obj}.register(require('@fastify/cors'))`;
		
		return node.replace(comment);
	});

	const newSource = rootNode.commitEdits(edits);
	return newSource;
}

export default transform;
