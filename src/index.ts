import * as parser from "@babel/parser";
import traverse from "@babel/traverse";
import * as t from "@babel/types";
import { looksLike } from "./looksLike";

const template = {
  type: "CallExpression",
  callee: { object: { name: "console" }, property: { name: "log" } },
};

const code = `console.log(5)`;

const ast = parser.parse(code);

match(template, ast);

function match(template: any, ast: t.File) {
  traverse(ast, {
    [template.type](path: any) {
      const { node } = path;
      const alike = looksLike(node, template);

      console.log({ alike });
    },
  });
}
