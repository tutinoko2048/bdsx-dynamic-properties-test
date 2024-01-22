import { ServerLevel } from "bdsx/bds/level";
import { abstract } from "bdsx/common";
import { VoidPointer } from "bdsx/core";
import { bedrockServer } from "bdsx/launcher";
import { NativeClass, nativeClass } from "bdsx/nativeclass";
import { CxxString } from "bdsx/nativetype";
import { procHacker } from "bdsx/prochacker";

@nativeClass()
export class DynamicProperties extends NativeClass {
  getDynamicProperty(key: string, collectionName: string): any {
    abstract();
  }
}

const ServerLevel$getDynamicProperties = procHacker.js(
  '?getOrAddDynamicProperties@ServerLevel@@QEAAAEAVDynamicProperties@@XZ', VoidPointer, { this: ServerLevel }
);

const DynamicProperties$getDynamicProperty = procHacker.js(
  '?getDynamicProperty@DynamicProperties@@QEAAPEAV?$variant@NM_NV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@VVec3@@@std@@AEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@3@0@Z',
  VoidPointer,
  { this: DynamicProperties },
  CxxString,
  CxxString
)

DynamicProperties.prototype.getDynamicProperty = (key, collectionName) => {
  const pointer: VoidPointer = DynamicProperties$getDynamicProperty.call(this, key, collectionName);
  pointer
}

export function getDynamicProperties(): DynamicProperties {
  const dynamicProperties: VoidPointer = ServerLevel$getDynamicProperties.call(bedrockServer.level);
  return dynamicProperties.as(DynamicProperties);
}