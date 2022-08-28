import * as ex from "@completium/experiment-ts";
const increment_arg_to_mich = (quantity: ex.Nat): ex.Micheline => {
    return quantity.to_mich();
}
export class Addnumber {
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
    async deploy(params: Partial<ex.Parameters>) {
        const address = await ex.deploy("./contracts/addnumber.arl", {}, params);
        this.address = address;
    }
    async increment(quantity: ex.Nat, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            await ex.call(this.address, "increment", increment_arg_to_mich(quantity), params);
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
export const addnumber = new Addnumber();
