import type { SgRoot } from "codemod:ast-grep";
import type TS from "codemod:ast-grep/langs/typescript";

async function transform(root: SgRoot<TS>): Promise<string> {
	const rootNode = root.root();

	// First, replace done() calls with return statements
	const doneCalls = rootNode.findAll({
		rule: {
			pattern: "done()",
			kind: "call_expression"
		}
	});

	const edits = doneCalls.map((doneCall) => {
		return doneCall.replace("return");
	});

	// Then, find and modify fastify.register calls with 3 parameters
	const registerCalls = rootNode.findAll({
		rule: {
			pattern: "fastify.register($FUNC)",
			kind: "call_expression"
		}
	});

	for (const registerCall of registerCalls) {
		const funcNode = registerCall.getMatch("FUNC");
		if (!funcNode) continue;

		// Find function parameters with 3 parameters
		const params = funcNode.findAll({
			rule: {
				pattern: "($INSTANCE, $OPTS, $DONE)",
				kind: "formal_parameters"
			}
		});

		if (params.length > 0) {
			const param = params[0];
			const instance = param.getMatch("INSTANCE")?.text();
			const opts = param.getMatch("OPTS")?.text();
			
			// Replace the parameters with 2 parameters
			edits.push(param.replace(`(${instance}, ${opts})`));
		}
	}

	const newSource = rootNode.commitEdits(edits);
	return newSource;
}

export default transform;