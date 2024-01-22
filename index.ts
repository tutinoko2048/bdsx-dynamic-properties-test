import { events } from "bdsx/event";
import { command } from "bdsx/command";
import { getDynamicProperties } from "./DynamicProperties";

events.serverOpen.on(() => {
    console.log("[ExamplePlugin] launched");
    // after BDS launched
});

events.serverClose.on(() => {
    console.log("[ExamplePlugin] closed");
    // after BDS closed
});

command.register('dp', 'w').overload((param, origin, output) => {
  const properties = getDynamicProperties()
  console.log(properties)
  output.success();
}, {})

