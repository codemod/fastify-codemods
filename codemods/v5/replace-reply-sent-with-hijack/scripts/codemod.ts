import type { SgRoot } from "codemod:ast-grep";
import type TS from "codemod:ast-grep/langs/typescript";

async function transform(root: SgRoot<TS>): Promise<string> {
	const rootNode = root.root();

	// Find all reply.sent = true assignments and replace with reply.hijack()
	const sentAssignments = rootNode.findAll({
		rule: {
			pattern: "reply.sent = true",
			kind: "assignment_expression"
		}
	});

	const edits = sentAssignments.map((assignment) => {
		// Replace the entire expression statement containing the assignment
		const parent = assignment.parent();
		if (parent && parent.kind() === "expression_statement") {
			return parent.replace("reply.hijack();");
		}
		return assignment.replace("reply.hijack();");
	});

	const newSource = rootNode.commitEdits(edits);
	return newSource;
}

export default transform;
