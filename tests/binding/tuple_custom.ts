import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
const set_value_arg_to_mich = (i: [
    att.Nat,
    [
        string,
        att.Bytes
    ],
    boolean
]): att.Micheline => {
    return att.pair_to_mich([i[0].to_mich(), att.pair_to_mich([att.string_to_mich(i[1][0]), i[1][1].to_mich()]), att.bool_to_mich(i[2])]);
}
export class Tuple_custom {
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
    async deploy(params: Partial<ex.Parameters>) {
        const address = await ex.deploy("./contracts/tuple_custom.arl", {}, params);
        this.address = address;
    }
    async set_value(i: [
        att.Nat,
        [
            string,
            att.Bytes
        ],
        boolean
    ], params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_set_value_param(i: [
        att.Nat,
        [
            string,
            att.Bytes
        ],
        boolean
    ], params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "set_value", set_value_arg_to_mich(i), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_res(): Promise<[
        att.Nat,
        [
            string,
            att.Bytes
        ],
        boolean
    ]> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return [(x => { return new att.Nat(x); })(storage[Object.keys(storage)[0]]), [(x => { return x; })(storage[Object.keys(storage)[1]]), (x => { return new att.Bytes(x); })(storage[Object.keys(storage)[2]])], (x => { return x; })(storage[Object.keys(storage)[3]])];
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const tuple_custom = new Tuple_custom();
