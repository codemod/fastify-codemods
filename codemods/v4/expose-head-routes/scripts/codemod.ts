import type { SgRoot } from "codemod:ast-grep";
import type TS from "codemod:ast-grep/langs/typescript";

async function transform(root: SgRoot<TS>): Promise<string> {
	const rootNode = root.root();

	// Find all fastify.get() calls that don't already have exposeHeadRoute option
	const getRoutes = rootNode.findAll({
		rule: {
			pattern: "$OBJ.get($PATH, $HANDLER)",
			kind: "call_expression"
		}
	});

	const edits = getRoutes.map((node) => {
		const obj = node.getMatch("OBJ")?.text();
		const path = node.getMatch("PATH")?.text();
		const handler = node.getMatch("HANDLER")?.text();
		
		// Check if this is already a method call with options
		const parent = node.parent();
		if (parent && parent.kind() === "call_expression") {
			const parentText = parent.text();
			if (parentText.includes("exposeHeadRoute")) {
				return null; // Already has the option, skip
			}
		}
		
		// Add the exposeHeadRoute option
		return node.replace(`${obj}.get(${path}, { exposeHeadRoute: true }, ${handler})`);
	}).filter(Boolean);

	const newSource = rootNode.commitEdits(edits);
	return newSource;
}

export default transform;
