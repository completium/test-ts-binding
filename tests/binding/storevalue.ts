import * as ex from "@completium/experiment-ts";
const replace_arg_to_mich = (v: ex.Nat): ex.Micheline => {
    return v.to_mich();
}
const double_arg_to_mich = (): ex.Micheline => {
    return ex.unit_mich;
}
export class Storevalue {
    address: string | undefined;
    get_address(): ex.Address {
        if (undefined != this.address) {
            return new ex.Address(this.address);
        }
        throw new Error("Contract not initialised");
    }
    async get_balance(): Promise<ex.Tez> {
        if (null != this.address) {
            return await ex.get_balance(new ex.Address(this.address));
        }
        throw new Error("Contract not initialised");
    }
    async deploy(counter: ex.Nat, params: Partial<ex.Parameters>) {
        const address = await ex.deploy("./contracts/storevalue.arl", {
            counter: counter.toString()
        }, params);
        this.address = address;
    }
    async replace(v: ex.Nat, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            await ex.call(this.address, "replace", replace_arg_to_mich(v), params);
        }
    }
    async double(params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            await ex.call(this.address, "double", double_arg_to_mich(), params);
        }
    }
    async get_counter(): Promise<ex.Nat> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new ex.Nat(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {
        r1: ex.pair_to_mich([ex.string_to_mich("\"INVALID_CONDITION\""), ex.string_to_mich("\"r1\"")])
    };
}
export const storevalue = new Storevalue();
