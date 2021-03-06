/**
 * @name Methods without return type
 * @description Finds methods whose return type is 'void'
 * @tags method
 *       void
 *       modifier
 *       return
 *       type
 */

import java

from Method m
where m.getReturnType() instanceof VoidType
  and m.fromSource()
select m
