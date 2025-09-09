import type { SgRoot } from "codemod:ast-grep";
import type TS from "codemod:ast-grep/langs/typescript";

async function transform(root: SgRoot<TS>): Promise<string> {
	const rootNode = root.root();

	// Find route definitions with optional parameters
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
		
		// Check if the path contains optional parameters (with ?)
		if (path && path.includes('?')) {
			// Add a comment about optional parameter handling
			const comment = `// Note: Optional parameters in Fastify v4 may require additional handling
// Consider using schema validation for better type safety
`;
			
			// Insert comment before the route definition
			const parent = node.parent();
			if (parent && parent.kind() === "expression_statement") {
				return parent.replace(`${comment}${parent.text()}`);
			}
		}
		
		return null;
	}).filter(Boolean);

	const newSource = rootNode.commitEdits(edits);
	return newSource;
}

export default transform;
