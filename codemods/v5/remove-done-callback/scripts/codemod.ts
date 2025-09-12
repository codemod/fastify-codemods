import type { SgRoot } from "codemod:ast-grep";
import type TS from "codemod:ast-grep/langs/typescript";

async function transform(root: SgRoot<TS>): Promise<string> {
	const rootNode = root.root();
	const edits: any[] = [];

	// Find all fastify.register calls
	const registerCalls = rootNode.findAll({
		rule: {
			pattern: "fastify.register($FUNC)",
			kind: "call_expression"
		}
	});

	for (const registerCall of registerCalls) {
		const funcNode = registerCall.getMatch("FUNC");
		if (!funcNode) continue;

		// Check if it's a function expression or arrow function
		if (funcNode.is("function_expression") || funcNode.is("arrow_function")) {
			// Find the formal_parameters node
			const params = funcNode.find({
				rule: {
					kind: "formal_parameters"
				}
			});
			
			if (!params) continue;

			// Get the parameter children (excluding the parentheses)
			const paramList = params.children().filter(child => 
				child.kind() === "required_parameter" || child.kind() === "identifier"
			);
			
			if (paramList.length === 3) {
				const [instance, opts, done] = paramList;
				
				// Remove the third parameter (done)
				edits.push(params.replace(`(${instance.text()}, ${opts.text()})`));

				// Find and replace done() calls within this function
				// Use a more general approach to find all call expressions
				const allCalls = funcNode.findAll({
					rule: {
						kind: "call_expression"
					}
				});

				// Filter for done() calls manually
				const doneCalls = allCalls.filter(call => {
					const callee = call.find({
						rule: {
							kind: "identifier"
						}
					});
					return callee && callee.text() === "done";
				});

				doneCalls.forEach((doneCall) => {
					edits.push(doneCall.replace("return"));
				});
			}
		}
	}

	const newSource = rootNode.commitEdits(edits);
	return newSource;
}

export default transform;