import { events } from "bdsx/event";
import { command } from "bdsx/command";
import { getDynamicProperties } from "./DynamicProperties";

const tnacHeader = 'c225a904-422a-4917-b88d-5c3452b8d17f';
const tnacModule = 'fcc8732d-300a-40e0-8a5d-613df2291a24';

events.serverOpen.on(() => {
    console.log("[ExamplePlugin] launched");
    // after BDS launched
});

events.serverClose.on(() => {
    console.log("[ExamplePlugin] closed");
    // after BDS closed
});

events.serverOpen.on(() => {
    command.register('dp', 'w').overload((param, origin, output) => {
        const properties = getDynamicProperties();
        console.log(properties.getTotalByteCount());
        console.log(properties.getDynamicPropertyIds(tnacHeader))
        console.log(properties.getDynamicPropertyIds(tnacHeader));
        console.log(properties.getDynamicPropertyIds(tnacModule));

        output.success();
    }, {});
})

