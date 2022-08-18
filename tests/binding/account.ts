import * as ex from "@completium/experiment-ts";
const add_arg_to_mich = (value: ex.Nat): ex.Micheline => {
    return value.to_mich();
}
const sub_arg_to_mich = (): ex.Micheline => {
    return ex.unit_mich;
}
export class Account {
    address: string | undefined;
    get_address(): string | undefined {
        return this.address;
    }
    async deploy(owner: ex.Address, params: Partial<ex.Parameters>) {
        const address = await ex.deploy("./contracts/account.arl", {
            owner: owner.toString()
        }, params);
        this.address = address;
    }
    async add(value: ex.Nat, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            await ex.call(this.address, "add", add_arg_to_mich(value), params);
        }
    }
    async sub(params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            await ex.call(this.address, "sub", sub_arg_to_mich(), params);
        }
    }
    async get_total(): Promise<ex.Int> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new ex.Int(storage.total);
        }
        throw new Error("Contract not initialised");
    }
    async get_lastSubDate(): Promise<Date> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new Date(storage.lastSubDate);
        }
        throw new Error("Contract not initialised");
    }
    errors = {
        r1: ex.string_to_mich("\"Wait 5 minutes before you decrement again\""),
        INVALID_CALLER: ex.string_to_mich("\"INVALID_CALLER\"")
    };
}
export const account = new Account();
