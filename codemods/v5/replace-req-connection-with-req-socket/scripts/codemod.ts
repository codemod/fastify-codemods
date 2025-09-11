import type { SgRoot } from "codemod:ast-grep";
import type TS from "codemod:ast-grep/langs/typescript";

async function transform(root: SgRoot<TS>): Promise<string> {
	const rootNode = root.root();

	// Find all req.connection member expressions
	const connectionRefs = rootNode.findAll({
		rule: {
			pattern: "$OBJ.connection",
			kind: "member_expression"
		}
	});

	const edits = connectionRefs.map((node) => {
		const obj = node.getMatch("OBJ")?.text();
		
		// Replace with req.socket
		return node.replace(`${obj}.socket`);
	}).filter(Boolean);

	const newSource = rootNode.commitEdits(edits);
	return newSource;
}

export default transform;
