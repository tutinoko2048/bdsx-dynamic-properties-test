import { events } from "bdsx/event";
import { command } from "bdsx/command";
import { getWorldDynamicProperties } from "./DynamicProperties";

const tnacHeader = 'c225a904-422a-4917-b88d-5c3452b8d17f';
const tnacModule = 'fcc8732d-300a-40e0-8a5d-613df2291a24';
const testHeader = '8f703922-29db-42ae-a662-4ca361249850';

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

        const properties = getWorldDynamicProperties();
        console.log('collectionCount', properties.getCollectionCount());
        console.log('totalByteCount', properties.getTotalByteCount());
        console.log('ids', properties.getDynamicPropertyIds(testHeader))

        output.success();
    }, {});
})
