import * as ex from "@completium/experiment-ts";
const incrementBoth_arg_to_mich = (inc1: ex.Nat, inc2: ex.Nat): ex.Micheline => {
    return ex.pair_to_mich([
        inc1.to_mich(),
        inc2.to_mich()
    ]);
}
export class Counter_two_numbers {
    address: string | undefined;
    get_address(): string | undefined {
        return this.address;
    }
    async deploy(params: Partial<ex.Parameters>) {
        const address = await ex.deploy("./contracts/counter_two_numbers.arl", {}, params);
        this.address = address;
    }
    async incrementBoth(inc1: ex.Nat, inc2: ex.Nat, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            await ex.call(this.address, "incrementBoth", incrementBoth_arg_to_mich(inc1, inc2), params);
        }
    }
    async get_v1(): Promise<ex.Nat> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new ex.Nat(storage.v1);
        }
        throw new Error("Contract not initialised");
    }
    async get_v2(): Promise<ex.Nat> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new ex.Nat(storage.v2);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const counter_two_numbers = new Counter_two_numbers();
