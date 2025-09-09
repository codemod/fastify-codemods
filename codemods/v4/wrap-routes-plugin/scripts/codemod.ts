import type { SgRoot } from "codemod:ast-grep";
import type TS from "codemod:ast-grep/langs/typescript";

async function transform(root: SgRoot<TS>): Promise<string> {
	const rootNode = root.root();

	// Find all route definitions (get, post, put, delete, etc.)
	const routeDefinitions = rootNode.findAll({
		rule: {
			pattern: "$OBJ.$METHOD($PATH, $HANDLER)",
			kind: "call_expression"
		}
	});

	const edits = routeDefinitions.map((node) => {
		const obj = node.getMatch("OBJ")?.text();
		const method = node.getMatch("METHOD")?.text();
		const path = node.getMatch("PATH")?.text();
		const handler = node.getMatch("HANDLER")?.text();
		
		// Check if this route is already inside a plugin
		const parent = node.parent();
		if (parent && parent.kind() === "expression_statement") {
			const parentText = parent.text();
			if (parentText.includes("fastify.register")) {
				return null; // Already in a plugin, skip
			}
		}
		
		// Add a comment about wrapping routes in plugins
		const comment = `// TODO: Consider wrapping related routes in a plugin for better organization
// Example: await ${obj}.register(async function (fastify) { ... }, { prefix: '/api' })
`;
		
		// Insert comment before the route definition
		if (parent && parent.kind() === "expression_statement") {
			return parent.replace(`${comment}${parent.text()}`);
		}
		
		return null;
	}).filter(Boolean);

	const newSource = rootNode.commitEdits(edits);
	return newSource;
}

export default transform;
