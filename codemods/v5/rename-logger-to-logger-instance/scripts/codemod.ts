import type { SgRoot } from "codemod:ast-grep";
import type TS from "codemod:ast-grep/langs/typescript";

async function transform(root: SgRoot<TS>): Promise<string> {
	const rootNode = root.root();

	// Find all identifiers named 'logger' and replace with 'loggerInstance'
	const loggerRefs = rootNode.findAll({
		rule: {
			pattern: "logger",
			kind: "identifier"
		}
	});

	const edits = loggerRefs.map((loggerRef) => {
		return loggerRef.replace("loggerInstance");
	});

	const newSource = rootNode.commitEdits(edits);
	return newSource;
}

export default transform;
