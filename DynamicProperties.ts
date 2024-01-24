// MEMO reference:
// https://github.com/LiteLDev/LeviLamina/blob/develop/src/mc/server/DynamicProperties.h

import { CxxOptional } from "bdsx/bds/cxxoptional";
import { ServerLevel } from "bdsx/bds/level";
import { abstract } from "bdsx/common";
import { StaticPointer, VoidPointer } from "bdsx/core";
import { CxxVector } from "bdsx/cxxvector";
import { bedrockServer } from "bdsx/launcher";
import { NativeClass, nativeClass } from "bdsx/nativeclass";
import { CxxString, int64_as_float_t } from "bdsx/nativetype";
import { procHacker } from "bdsx/prochacker";

const CxxVector$string = CxxVector.make(CxxString);

@nativeClass()
export class DynamicProperties extends NativeClass {
  getCollectionCount(): number {
    abstract();
  }

  getTotalByteCount(): number {
    abstract();
  }

  getDynamicPropertyIds(collectionName: string): string[] {
    abstract();
  }

  getDynamicProperty(key: string, collectionName: string): any {
    abstract();
  }
}

DynamicProperties.prototype.getCollectionCount = procHacker.js(
  '?getCollectionCount@DynamicProperties@@QEBA_KXZ',
  int64_as_float_t,
  { this: DynamicProperties }
);


DynamicProperties.prototype.getTotalByteCount = procHacker.js(
  '?getTotalByteCount@DynamicProperties@@QEBA_KXZ',
  int64_as_float_t,
  { this: DynamicProperties }
);

const DynamicProperties$getDynamicPropertyIds = procHacker.js(
  '?getDynamicPropertyIds@DynamicProperties@@QEAA?AV?$vector@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$allocator@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@2@@std@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@3@@Z',
  CxxVector$string,
  { this: DynamicProperties, structureReturn: true },
  //CxxVector$string,
  CxxString
);
DynamicProperties.prototype.getDynamicPropertyIds = collectionName => {
    console.log("before getDynamicPropertyIds");
    const ids = new CxxVector$string(true);
    DynamicProperties$getDynamicPropertyIds.call(this, ids, collectionName);
    console.log("after getDynamicPropertyIds");
    const out = ids.toArray();
    ids.destruct();
    return out;
};


const DynamicProperties$getDynamicProperty = procHacker.js(
  '?getDynamicProperty@DynamicProperties@@QEAAPEAV?$variant@NM_NV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@VVec3@@@std@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@3@0@Z',
  VoidPointer,
  { this: DynamicProperties, structureReturn: true },
  CxxString,
  CxxString
);
DynamicProperties.prototype.getDynamicProperty = (key, collectionName) => {
  const pointer: VoidPointer = DynamicProperties$getDynamicProperty.call(this, key, collectionName);
  return pointer
}

const ServerLevel$getOrAddDynamicProperties = procHacker.js(
  '?getOrAddDynamicProperties@ServerLevel@@QEAAAEAVDynamicProperties@@XZ',
  DynamicProperties,
  { this: ServerLevel }
);
export function getDynamicProperties(): DynamicProperties {
  const dynamicProperties = ServerLevel$getOrAddDynamicProperties.call(bedrockServer.level);
  return dynamicProperties;
}

/*
const _onGetIds = procHacker.hooking(
  '?getDynamicPropertyIds@DynamicProperties@@QEAA?AV?$vector@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$allocator@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@2@@std@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@3@@Z',
  CxxVector$string,
  { this: DynamicProperties, structureReturn: true },
  CxxString
)(onGetIds)
function onGetIds(collectionName: CxxString) {
  const ids = _onGetIds.call(DynamicProperties, collectionName);
  console.log('onGetIds', collectionName);
  //ids.destruct()
  return ids;
}
*/