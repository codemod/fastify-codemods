import type { SgRoot } from "codemod:ast-grep";
import type TS from "codemod:ast-grep/langs/typescript";

async function transform(root: SgRoot<TS>): Promise<string> {
	const rootNode = root.root();

	// Find all reply.raw property accesses
	const replyRawAccess = rootNode.findAll({
		rule: {
			pattern: "$OBJ.raw",
			inside: {
				kind: "member_expression"
			}
		}
	});

	const edits = replyRawAccess.map((node) => {
		const obj = node.getMatch("OBJ")?.text();
		
		// Check if this is already a method call
		const parent = node.parent();
		if (parent && parent.kind() === "call_expression") {
			return null; // Already a method call, skip
		}
		
		// Transform property access to method call
		return node.replace(`${obj}.raw()`);
	}).filter(Boolean);

	const newSource = rootNode.commitEdits(edits);
	return newSource;
}

export default transform;
