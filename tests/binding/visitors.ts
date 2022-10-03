import * as ex from "@completium/experiment-ts";
import * as att from "@completium/archetype-ts-types";
export type visitor_key = string;
export const visitor_key_mich_type: att.MichelineType = att.prim_annot_to_mich_type("string", []);
export class visitor_value implements att.ArchetypeType {
    constructor(public name: string, public nbvisits: att.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): att.Micheline {
        return att.pair_to_mich([att.string_to_mich(this.name), this.nbvisits.to_mich()]);
    }
    equals(v: visitor_value): boolean {
        return (this.name == v.name && this.name == v.name && this.nbvisits.equals(v.nbvisits));
    }
}
export const visitor_value_mich_type: att.MichelineType = att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("string", ["%name"]),
    att.prim_annot_to_mich_type("nat", ["%nbvisits"])
], []);
export const mich_to_visitor_value = (v: att.Micheline, collapsed: boolean = false): visitor_value => {
    let fields: att.Micheline[] = [];
    if (collapsed) {
        fields = att.mich_to_pairs(v);
    }
    else {
        fields = att.annotated_mich_to_array(v, visitor_value_mich_type);
    }
    return new visitor_value(att.mich_to_string(fields[0]), att.mich_to_nat(fields[1]));
};
export type visitor_container = Array<[
    visitor_key,
    visitor_value
]>;
export const visitor_container_mich_type: att.MichelineType = att.pair_to_mich_type("map", att.prim_annot_to_mich_type("string", []), att.pair_array_to_mich_type([
    att.prim_annot_to_mich_type("string", ["%name"]),
    att.prim_annot_to_mich_type("nat", ["%nbvisits"])
], []));
const register_arg_to_mich = (l: string, n: string): att.Micheline => {
    return att.pair_to_mich([
        att.string_to_mich(l),
        att.string_to_mich(n)
    ]);
}
const visit_arg_to_mich = (l: string): att.Micheline => {
    return att.string_to_mich(l);
}
export class Visitors {
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
        const address = await ex.deploy("./contracts/visitors.arl", {}, params);
        this.address = address;
    }
    async register(l: string, n: string, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "register", register_arg_to_mich(l, n), params);
        }
        throw new Error("Contract not initialised");
    }
    async visit(l: string, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            return await ex.call(this.address, "visit", visit_arg_to_mich(l), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_register_param(l: string, n: string, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "register", register_arg_to_mich(l, n), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_visit_param(l: string, params: Partial<ex.Parameters>): Promise<att.CallParameter> {
        if (this.address != undefined) {
            return await ex.get_call_param(this.address, "visit", visit_arg_to_mich(l), params);
        }
        throw new Error("Contract not initialised");
    }
    async get_visitor(): Promise<visitor_container> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            let res: Array<[
                string,
                visitor_value
            ]> = [];
            for (let e of storage.entries()) {
                res.push([(x => { return x; })(e[0]), (x => { return new visitor_value((x => { return x; })(x.name), (x => { return new att.Nat(x); })(x.nbvisits)); })(e[1])]);
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const visitors = new Visitors();
