import type { SgRoot } from "codemod:ast-grep";
import type TS from "codemod:ast-grep/langs/typescript";

async function transform(root: SgRoot<TS>): Promise<string> {
	const rootNode = root.root();

	// Find all req.params.hasOwnProperty() calls
	const hasOwnPropertyCalls = rootNode.findAll({
		rule: {
			pattern: "$OBJ.params.hasOwnProperty($ARGS)",
			kind: "call_expression"
		}
	});

	const edits = hasOwnPropertyCalls.map((node) => {
		const obj = node.getMatch("OBJ")?.text();
		const args = node.getMatch("ARGS")?.text();
		
		// Transform to Object.hasOwn(obj.params, args)
		return node.replace(`Object.hasOwn(${obj}.params, ${args})`);
	}).filter(Boolean);

	const newSource = rootNode.commitEdits(edits);
	return newSource;
}

export default transform;
