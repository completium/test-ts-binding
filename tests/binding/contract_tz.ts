import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export const storage_mich_stype: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("nat", ["%a"]),
    att.pair_array_to_mich_type([
        att.prim_annot_to_mich_type("string", ["%b"]),
        att.prim_annot_to_mich_type("bytes", ["%c"])
    ], [])
], []);
const storage_arg_to_mich = (a: att.Nat, b: string, c: att.Bytes): att.Micheline => {
    return att.pair_to_mich([
        a.to_mich(),
        att.string_to_mich(b),
        c.to_mich()
    ]);
}
const e1_arg_to_mich = (_: att.Nat): att.Micheline => {
    return _.to_mich();
}
const e2_arg_to_mich = (_: string): att.Micheline => {
    return att.string_to_mich(_);
}
const e3_arg_to_mich = (_: att.Bytes): att.Micheline => {
    return _.to_mich();
}
const view_v_a_arg_to_mich = (): att.Micheline => {
    return att.unit_mich;
}
const view_v_b_arg_to_mich = (_: string): att.Micheline => {
    return att.string_to_mich(_);
}
export class Contract_tz {
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
    async originate(a: att.Nat, b: string, c: att.Bytes, params: Partial<ex.Parameters>) {
        const address = await ex.originate("./contracts/contract_tz.tz", storage_arg_to_mich(a, b, c), params);
        this.address = address;
    }
    async e1(_: att.Nat, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "e1", e1_arg_to_mich(_), params);
        }
        throw new Error("Contract not initialised");
    }
    async e2(_: string, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "e2", e2_arg_to_mich(_), params);
        }
        throw new Error("Contract not initialised");
    }
    async e3(_: att.Bytes, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "e3", e3_arg_to_mich(_), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_e1_param(_: att.Nat, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "e1", e1_arg_to_mich(_), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_e2_param(_: string, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "e2", e2_arg_to_mich(_), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_e3_param(_: att.Bytes, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "e3", e3_arg_to_mich(_), params);
        }
        throw new Error("Contract not initialised");
    }
    async view_v_a(params: Partial<ex.Parameters>): Promise<att.Nat> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "v_a", view_v_a_arg_to_mich(), params);
            return new att.Nat(mich);
        }
        throw new Error("Contract not initialised");
    }
    async view_v_b(_: string, params: Partial<ex.Parameters>): Promise<string> {
        if (this.address != undefined) {
            const mich = await ex.exec_view(this.get_address(), "v_b", view_v_b_arg_to_mich(_), params);
            return mich;
        }
        throw new Error("Contract not initialised");
    }
    async get_a(): Promise<att.Nat> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Nat(storage.a);
        }
        throw new Error("Contract not initialised");
    }
    async get_b(): Promise<string> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return storage.b;
        }
        throw new Error("Contract not initialised");
    }
    async get_c(): Promise<att.Bytes> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new att.Bytes(storage.c);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const contract_tz = new Contract_tz();
