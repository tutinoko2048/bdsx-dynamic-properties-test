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

const ServerLevel$getDynamicProperties = procHacker.js(
  '?getOrAddDynamicProperties@ServerLevel@@QEAAAEAVDynamicProperties@@XZ',
  VoidPointer,
  { this: ServerLevel, structureReturn: true }
);

const DynamicProperties$getTotalByteCount = procHacker.js(
  '?getTotalByteCount@DynamicProperties@@QEBA_KXZ',
  int64_as_float_t,
  { this: DynamicProperties }
);

const DynamicProperties$getDynamicProperty = procHacker.js(
  '?getDynamicProperty@DynamicProperties@@QEAAPEAV?$variant@NM_NV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@VVec3@@@std@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@3@0@Z',
  StaticPointer,
  { this: DynamicProperties, structureReturn: true },
  CxxString,
  CxxString
);

const DynamicProperties$getDynamicPropertyIds = procHacker.js(
  '?getDynamicPropertyIds@DynamicProperties@@QEAA?AV?$vector@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@V?$allocator@V?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@2@@std@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@3@@Z',
  CxxVector$string,
  { this: DynamicProperties, structureReturn: true },
  CxxString
);

DynamicProperties.prototype.getTotalByteCount = DynamicProperties$getTotalByteCount;

DynamicProperties.prototype.getDynamicProperty = (key, collectionName) => {
  const pointer: StaticPointer = DynamicProperties$getDynamicProperty.call(this, key, collectionName);
  return pointer.getCxxString();
}

DynamicProperties.prototype.getDynamicPropertyIds = (collectionName) => {
  const ids: CxxVector<CxxString> = DynamicProperties$getDynamicPropertyIds.call(this, collectionName);
  const out = ids.toArray();
  ids.destruct();
  return out;
}

export function getDynamicProperties(): DynamicProperties {
  const dynamicProperties: VoidPointer = ServerLevel$getDynamicProperties.call(bedrockServer.level);
  return dynamicProperties.as(DynamicProperties);
}