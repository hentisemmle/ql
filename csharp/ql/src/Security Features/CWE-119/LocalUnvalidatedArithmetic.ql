/**
 * @name Unvalidated local pointer arithmetic
 * @description Using the result of a virtual method call in pointer arithmetic without
 *              validation is dangerous because the method may be overridden by a subtype
 *              to return any value.
 * @kind problem
 * @problem.severity warning
 * @precision high
 * @id cs/unvalidated-local-pointer-arithmetic
 * @tags security
 *       external/cwe/cwe-119
 *       external/cwe/cwe-120
 *       external/cwe/cwe-122
 *       external/cwe/cwe-788
 */
import csharp
import semmle.code.csharp.controlflow.Guards

from AddExpr add, VirtualMethodCall taintSrc
where
  // `add` is performing pointer arithmetic
  add.getType() instanceof PointerType and
  // one of the operands comes, in zero or more steps, from a virtual method call
  DataFlow::localFlow(DataFlow::exprNode(taintSrc), DataFlow::exprNode(add.getAnOperand())) and
  // virtual method call result has not been validated
  not exists(Expr check, ComparisonOperation cmp |
    DataFlow::localFlow(DataFlow::exprNode(taintSrc), DataFlow::exprNode(check)) |
    cmp.getAnOperand() = check and
    add.getAnOperand().(GuardedExpr).isGuardedBy(cmp, check, _)
  )
select add, "Unvalidated pointer arithmetic from virtual method $@.", taintSrc, taintSrc.getTarget().getName()
