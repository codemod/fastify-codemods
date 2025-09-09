import type { SgRoot } from "codemod:ast-grep";
import type TS from "codemod:ast-grep/langs/typescript";

async function transform(root: SgRoot<TS>): Promise<string> {
	const rootNode = root.root();

	// Find all fastify.register() calls that are not already awaited
	const registerCalls = rootNode.findAll({
		rule: {
			pattern: "$OBJ.register($ARGS)",
			inside: {
				kind: "expression_statement"
			}
		}
	});

	const edits = registerCalls.map((node) => {
		const obj = node.getMatch("OBJ")?.text();
		const args = node.getMatch("ARGS")?.text();
		
		// Check if the parent expression statement is already awaited
		const parent = node.parent();
		if (parent && parent.kind() === "expression_statement") {
			const parentText = parent.text();
			if (parentText.startsWith("await ")) {
				return null; // Already awaited, skip
			}
		}
		
		return node.replace(`await ${obj}.register(${args})`);
	}).filter(Boolean);

	const newSource = rootNode.commitEdits(edits);
	return newSource;
}

export default transform;
