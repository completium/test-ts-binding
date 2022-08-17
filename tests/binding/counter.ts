import * as ex from "@completium/experiment-ts";
const increment_arg_to_mich = (): ex.Micheline => {
    return ex.unit_mich;
}
export class Counter {
    address: string | undefined;
    get_address(): string | undefined {
        return this.address;
    }
    async deploy(params: Partial<ex.Parameters>) {
        const address = await ex.deploy("./contracts/counter.arl", {}, params);
        this.address = address;
    }
    async increment(params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            await ex.call(this.address, "increment", increment_arg_to_mich(), params);
        }
    }
    async get_count(): Promise<ex.Nat> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new ex.Nat(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const counter = new Counter();
