import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const add_arg_to_mich = (value: att.Nat): att.Micheline => {
    return value.to_mich();
}
const sub_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
export class Account {
    address: string | undefined;
    constructor(address: string | undefined = undefined) {
        this.address = address;
    }
    get_address(): att.Address {
        if (undefined != this.address) {
            return new att.Address(this.address);
        }
        throw new Error("Contract not initialised");
    }
    async get_balance(): Promise<att.Tez> {
        if (null != this.address) {
            return await ex.get_balance(new att.Address(this.address));
        }
        throw new Error("Contract not initialised");
    }
    async deploy(owner: att.Address, params: Partial<ex.Parameters>) {
        const address = await ex.deploy("./contracts/account.arl", {
            owner: owner.to_mich()
        }, params);
        this.address = address;
    }
    async add(value: att.Nat, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "add", add_arg_to_mich(value), params);
        }
        throw new Error("Contract not initialised");
    }
    async sub(params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "sub", sub_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_add_param(value: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "add", add_arg_to_mich(value), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_sub_param(params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "sub", sub_arg_to_mich(), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_owner(): Promise<att.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Address(storage.owner);
        }
        throw new Error("Contract not initialised");
    }
    async get_total(): Promise<att.Int> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Int(storage.total);
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
        r1: att.string_to_mich("\"Wait 5 minutes before you decrement again\""),
        INVALID_CALLER: att.string_to_mich("\"INVALID_CALLER\"")
    };
}
export const account = new Account();
