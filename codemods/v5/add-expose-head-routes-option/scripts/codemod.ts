import type { SgRoot } from "codemod:ast-grep";
import type TS from "codemod:ast-grep/langs/typescript";

async function transform(root: SgRoot<TS>): Promise<string> {
	const rootNode = root.root();

	// Find all fastify.get calls with empty object as second argument
	const getCalls = rootNode.findAll({
		rule: {
			pattern: "fastify.get($PATH, {}, $HANDLER)",
			kind: "call_expression"
		}
	});

	const edits = getCalls.map((getCall) => {
		const path = getCall.getMatch("PATH")?.text();
		const handler = getCall.getMatch("HANDLER")?.text();
		
		// Replace with fastify.get(path, { exposeHeadRoutes: false }, handler)
		return getCall.replace(`fastify.get(${path}, { exposeHeadRoutes: false }, ${handler})`);
	});

	const newSource = rootNode.commitEdits(edits);
	return newSource;
}

export default transform;

