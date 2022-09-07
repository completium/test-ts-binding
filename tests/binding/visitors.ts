import * as ex from "@completium/experiment-ts";
export type visitor_key = string;
export const visitor_key_mich_type: ex.MichelineType = ex.prim_annot_to_mich_type("string", []);
export class visitor_value implements ex.ArchetypeType {
    constructor(public name: string, public nbvisits: ex.Nat) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): ex.Micheline {
        return ex.pair_to_mich([ex.string_to_mich(this.name), this.nbvisits.to_mich()]);
    }
    equals(v: visitor_value): boolean {
        return (this.name == v.name && this.name == v.name && this.nbvisits.equals(v.nbvisits));
    }
}
export const visitor_value_mich_type: ex.MichelineType = ex.pair_array_to_mich_type([
    ex.prim_annot_to_mich_type("string", ["%name"]),
    ex.prim_annot_to_mich_type("nat", ["%nbvisits"])
]);
export const mich_to_visitor_value = (v: ex.Micheline, collapsed: boolean = false): visitor_value => {
    let fields: ex.Micheline[] = [];
    if (collapsed) {
        fields = ex.mich_to_pairs(v);
    }
    else {
        fields = ex.annotated_mich_to_array(v, visitor_value_mich_type);
    }
    return new visitor_value(ex.mich_to_string(fields[0]), ex.mich_to_nat(fields[1]));
};
export type visitor_container = Array<[
    visitor_key,
    visitor_value
]>;
export const visitor_container_mich_type: ex.MichelineType = ex.pair_to_mich_type("map", ex.prim_annot_to_mich_type("string", []), ex.pair_array_to_mich_type([
    ex.prim_annot_to_mich_type("string", ["%name"]),
    ex.prim_annot_to_mich_type("nat", ["%nbvisits"])
]));
const register_arg_to_mich = (l: string, n: string): ex.Micheline => {
    return ex.pair_to_mich([
        ex.string_to_mich(l),
        ex.string_to_mich(n)
    ]);
}
const visit_arg_to_mich = (l: string): ex.Micheline => {
    return ex.string_to_mich(l);
}
export class Visitors {
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
        const address = await ex.deploy("./contracts/visitors.arl", {}, params);
        this.address = address;
    }
    async register(l: string, n: string, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            await ex.call(this.address, "register", register_arg_to_mich(l, n), params);
        }
    }
    async visit(l: string, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            await ex.call(this.address, "visit", visit_arg_to_mich(l), params);
        }
    }
    async get_visitor(): Promise<visitor_container> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            let res: Array<[
                string,
                visitor_value
            ]> = [];
            for (let e of storage.entries()) {
                res.push([(x => { return x; })(e[0]), (x => { return new visitor_value((x => { return x; })(x.name), (x => { return new ex.Nat(x); })(x.nbvisits)); })(e[1])]);
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const visitors = new Visitors();
