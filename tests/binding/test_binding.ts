import * as ex from "@completium/experiment-ts";
export enum anenum_types {
    A = "A",
    B = "B",
    C = "C"
}
export abstract class anenum extends ex.Enum<anenum_types> {
}
export class A extends anenum {
    constructor(private content: ex.Int) {
        super(anenum_types.A);
    }
    to_mich() { return ex.left_to_mich(this.content.to_mich()); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    get() { return this.content; }
}
export class B extends anenum {
    constructor(private content: [
        ex.Nat,
        string
    ]) {
        super(anenum_types.B);
    }
    to_mich() { return ex.right_to_mich(ex.left_to_mich(ex.pair_to_mich([this.content[0].to_mich(), ex.string_to_mich(this.content[1])]))); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    get() { return this.content; }
}
export class C extends anenum {
    constructor() {
        super(anenum_types.C);
    }
    to_mich() { return ex.right_to_mich(ex.right_to_mich(ex.unit_mich)); }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
}
export class all implements ex.ArchetypeType {
    constructor(public a: ex.Nat, public b: ex.Int, public c: ex.Tez, public d: ex.Rational, public e: boolean, public f: ex.Bytes, public g: string, public h: Date, public i: ex.Duration, public j: ex.Address, public k: ex.Option<ex.Nat>, public n: Array<string>, public p: Array<[
        string,
        ex.Nat,
        ex.Int
    ]>) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): ex.Micheline {
        return ex.pair_to_mich([ex.pair_to_mich([this.a.to_mich(), ex.pair_to_mich([this.b.to_mich(), this.c.to_mich()])]), ex.pair_to_mich([ex.pair_to_mich([this.d.to_mich(), ex.bool_to_mich(this.e)]), ex.pair_to_mich([this.f.to_mich(), ex.pair_to_mich([ex.string_to_mich(this.g), ex.pair_to_mich([ex.date_to_mich(this.h), ex.pair_to_mich([this.i.to_mich(), ex.pair_to_mich([this.j.to_mich(), ex.pair_to_mich([this.k.to_mich(), ex.pair_to_mich([ex.list_to_mich(this.n, x => {
                                                return ex.string_to_mich(x);
                                            }), ex.list_to_mich(this.p, x => {
                                                return ex.pair_to_mich([ex.string_to_mich(x[0]), x[1].to_mich(), x[2].to_mich()]);
                                            })])])])])])])])])]);
    }
    equals(v: all): boolean {
        return (this.a.equals(v.a) && this.a.equals(v.a) && this.b.equals(v.b) && this.c.equals(v.c) && this.d.equals(v.d) && this.e == v.e && this.f.equals(v.f) && this.g == v.g && (this.h.getTime() - this.h.getMilliseconds()) == (v.h.getTime() - v.h.getMilliseconds()) && this.i.equals(v.i) && this.j.equals(v.j) && this.k.equals(v.k) && JSON.stringify(this.n) == JSON.stringify(v.n) && JSON.stringify(this.p) == JSON.stringify(v.p));
    }
}
export const all_mich_type: ex.MichelineType = ex.pair_array_to_mich_type([
    ex.pair_array_to_mich_type([
        ex.prim_annot_to_mich_type("nat", ["%f1"]),
        ex.pair_array_to_mich_type([
            ex.prim_annot_to_mich_type("int", ["%f2"]),
            ex.prim_annot_to_mich_type("mutez", ["%f3"])
        ])
    ]),
    ex.pair_array_to_mich_type([
        ex.pair_array_to_mich_type([
            ex.pair_array_to_mich_type([
                ex.prim_annot_to_mich_type("int", []),
                ex.prim_annot_to_mich_type("nat", [])
            ]),
            ex.prim_annot_to_mich_type("bool", ["%f5"])
        ]),
        ex.pair_array_to_mich_type([
            ex.prim_annot_to_mich_type("bytes", ["%f6"]),
            ex.pair_array_to_mich_type([
                ex.prim_annot_to_mich_type("string", ["%f7"]),
                ex.pair_array_to_mich_type([
                    ex.prim_annot_to_mich_type("timestamp", ["%f8"]),
                    ex.pair_array_to_mich_type([
                        ex.prim_annot_to_mich_type("int", ["%f9"]),
                        ex.pair_array_to_mich_type([
                            ex.prim_annot_to_mich_type("address", ["%f10"]),
                            ex.pair_array_to_mich_type([
                                ex.option_annot_to_mich_type(ex.prim_annot_to_mich_type("nat", []), ["%f11"]),
                                ex.pair_array_to_mich_type([
                                    ex.list_annot_to_mich_type(ex.prim_annot_to_mich_type("string", []), ["%f12"]),
                                    ex.list_annot_to_mich_type(ex.pair_array_to_mich_type([
                                        ex.prim_annot_to_mich_type("string", []),
                                        ex.pair_array_to_mich_type([
                                            ex.prim_annot_to_mich_type("nat", []),
                                            ex.prim_annot_to_mich_type("int", [])
                                        ])
                                    ]), ["%f13"])
                                ])
                            ])
                        ])
                    ])
                ])
            ])
        ])
    ])
]);
export const mich_to_all = (v: ex.Micheline, collapsed: boolean = false): all => {
    let fields: ex.Micheline[] = [];
    if (collapsed) {
        fields = ex.mich_to_pairs(v);
    }
    else {
        fields = ex.annotated_mich_to_array(v, all_mich_type);
    }
    return new all(ex.mich_to_nat(fields[0]), ex.mich_to_int(fields[1]), ex.mich_to_tez(fields[2]), ex.mich_to_rational(fields[3]), ex.mich_to_bool(fields[4]), ex.mich_to_bytes(fields[5]), ex.mich_to_string(fields[6]), ex.mich_to_date(fields[7]), ex.mich_to_duration(fields[8]), ex.mich_to_address(fields[9]), ex.mich_to_option(fields[10], x => { return ex.mich_to_nat(x); }), ex.mich_to_list(fields[11], x => { return ex.mich_to_string(x); }), ex.mich_to_list(fields[12], x => { return (p => {
        const p0 = (p as ex.Mpair);
        const p1 = (p0.args[1] as ex.Mpair);
        return [ex.mich_to_string(p0.args[0]), ex.mich_to_nat(p0.args[1]), ex.mich_to_int(p1.args[0])];
    })(x); }));
};
export type just_a_key_key = ex.Address;
export type visitor_key = ex.Address;
export type visitor_2_key = ex.Address;
export const just_a_key_key_mich_type: ex.MichelineType = ex.prim_annot_to_mich_type("address", []);
export const visitor_key_mich_type: ex.MichelineType = ex.prim_annot_to_mich_type("address", []);
export const visitor_2_key_mich_type: ex.MichelineType = ex.prim_annot_to_mich_type("address", []);
export type visitor_value = ex.Nat;
export class visitor_2_value implements ex.ArchetypeType {
    constructor(public nb_visits2: ex.Nat, public last: Date) { }
    toString(): string {
        return JSON.stringify(this, null, 2);
    }
    to_mich(): ex.Micheline {
        return ex.pair_to_mich([this.nb_visits2.to_mich(), ex.date_to_mich(this.last)]);
    }
    equals(v: visitor_2_value): boolean {
        return (this.nb_visits2.equals(v.nb_visits2) && this.nb_visits2.equals(v.nb_visits2) && (this.last.getTime() - this.last.getMilliseconds()) == (v.last.getTime() - v.last.getMilliseconds()));
    }
}
export const visitor_value_mich_type: ex.MichelineType = ex.prim_annot_to_mich_type("nat", []);
export const visitor_2_value_mich_type: ex.MichelineType = ex.pair_array_to_mich_type([
    ex.prim_annot_to_mich_type("nat", ["%nb_visits2"]),
    ex.prim_annot_to_mich_type("timestamp", ["%last"])
]);
export const mich_to_visitor_value = (v: ex.Micheline, collapsed: boolean = false): visitor_value => {
    return ex.mich_to_nat(v);
};
export const mich_to_visitor_2_value = (v: ex.Micheline, collapsed: boolean = false): visitor_2_value => {
    let fields: ex.Micheline[] = [];
    if (collapsed) {
        fields = ex.mich_to_pairs(v);
    }
    else {
        fields = ex.annotated_mich_to_array(v, visitor_2_value_mich_type);
    }
    return new visitor_2_value(ex.mich_to_nat(fields[0]), ex.mich_to_date(fields[1]));
};
export type just_a_key_container = Array<just_a_key_key>;
export type visitor_container = Array<[
    visitor_key,
    visitor_value
]>;
export type visitor_2_container = Array<[
    visitor_2_key,
    visitor_2_value
]>;
export const just_a_key_container_mich_type: ex.MichelineType = ex.list_annot_to_mich_type(ex.prim_annot_to_mich_type("address", []), []);
export const visitor_container_mich_type: ex.MichelineType = ex.pair_to_mich_type("map", ex.prim_annot_to_mich_type("address", []), ex.prim_annot_to_mich_type("nat", []));
export const visitor_2_container_mich_type: ex.MichelineType = ex.pair_to_mich_type("map", ex.prim_annot_to_mich_type("address", []), ex.pair_array_to_mich_type([
    ex.prim_annot_to_mich_type("nat", ["%nb_visits2"]),
    ex.prim_annot_to_mich_type("timestamp", ["%last"])
]));
const myentry_arg_to_mich = (arg: all): ex.Micheline => {
    return arg.to_mich();
}
const myentry2_arg_to_mich = (arg: [
    ex.Nat,
    string
]): ex.Micheline => {
    return ex.pair_to_mich([arg[0].to_mich(), ex.string_to_mich(arg[1])]);
}
const myentry3_arg_to_mich = (ev: anenum): ex.Micheline => {
    return ev.to_mich();
}
export class Test_binding {
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
    async deploy(owner: ex.Address, oa: ex.Option<ex.Address>, params: Partial<ex.Parameters>) {
        const address = await ex.deploy("./contracts/test_binding.arl", {
            owner: owner.toString(),
            oa: oa.is_some() ? oa.get().toString() : null
        }, params);
        this.address = address;
    }
    async myentry(arg: all, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            await ex.call(this.address, "myentry", myentry_arg_to_mich(arg), params);
        }
    }
    async myentry2(arg: [
        ex.Nat,
        string
    ], params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            await ex.call(this.address, "myentry2", myentry2_arg_to_mich(arg), params);
        }
    }
    async myentry3(ev: anenum, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            await ex.call(this.address, "myentry3", myentry3_arg_to_mich(ev), params);
        }
    }
    async get_owner(): Promise<ex.Address> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new ex.Address(storage.owner);
        }
        throw new Error("Contract not initialised");
    }
    async get_oa(): Promise<ex.Option<ex.Address>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new ex.Option<ex.Address>(storage.oa == null ? null : (x => { return new ex.Address(x); })(storage.oa));
        }
        throw new Error("Contract not initialised");
    }
    async get_s(): Promise<ex.Int> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new ex.Int(storage.s);
        }
        throw new Error("Contract not initialised");
    }
    async get_o(): Promise<ex.Option<ex.Nat>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new ex.Option<ex.Nat>(storage.o == null ? null : (x => { return new ex.Nat(x); })(storage.o));
        }
        throw new Error("Contract not initialised");
    }
    async get_l(): Promise<Array<ex.Int>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const res: Array<ex.Int> = [];
            for (let i = 0; i < storage.l.length; i++) {
                res.push((x => { return new ex.Int(x); })(storage.l[i]));
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    async get_m(): Promise<Array<[
        ex.Nat,
        [
            string,
            ex.Int
        ]
    ]>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            let res: Array<[
                ex.Nat,
                [
                    string,
                    ex.Int
                ]
            ]> = [];
            for (let e of storage.m.entries()) {
                res.push([(x => { return new ex.Nat(x); })(e[0]), (x => { return [(x => { return x; })(x[Object.keys(x)[0]]), (x => { return new ex.Int(x); })(x[Object.keys(x)[1]])]; })(e[1])]);
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    async get_s1(): Promise<Array<ex.Nat>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const res: Array<ex.Nat> = [];
            for (let i = 0; i < storage.s1.length; i++) {
                res.push((x => { return new ex.Nat(x); })(storage.s1[i]));
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    async get_l1(): Promise<Array<all>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const res: Array<all> = [];
            for (let i = 0; i < storage.l1.length; i++) {
                res.push((x => { return new all((x => { return new ex.Nat(x); })(x.f1), (x => { return new ex.Int(x); })(x.f2), (x => { return new ex.Tez(x, "mutez"); })(x.f3), (x => { return new ex.Rational(x[Object.keys(x)[0]], x[Object.keys(x)[1]]); })(x.f4), (x => { return x; })(x.f5), (x => { return new ex.Bytes(x); })(x.f6), (x => { return x; })(x.f7), (x => { return new Date(x); })(x.f8), (x => { return new ex.Duration(x); })(x.f9), (x => { return new ex.Address(x); })(x.f10), (x => { return new ex.Option<ex.Nat>(x == null ? null : (x => { return new ex.Nat(x); })(x)); })(x.f11), (x => { const res: Array<string> = []; for (let i = 0; i < x.length; i++) {
                    res.push((x => { return x; })(x[i]));
                } return res; })(x.f12), (x => { const res: Array<[
                    string,
                    ex.Nat,
                    ex.Int
                ]> = []; for (let i = 0; i < x.length; i++) {
                    res.push((x => { return [(x => { return x; })(x[Object.keys(x)[0]]), (x => { return new ex.Nat(x); })(x[Object.keys(x)[1]]), (x => { return new ex.Int(x); })(x[Object.keys(x)[2]])]; })(x[i]));
                } return res; })(x.f13)); })(storage.l1[i]));
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    async get_l2(): Promise<Array<Array<all>>> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const res: Array<Array<all>> = [];
            for (let i = 0; i < storage.l2.length; i++) {
                res.push((x => { const res: Array<all> = []; for (let i = 0; i < x.length; i++) {
                    res.push((x => { return new all((x => { return new ex.Nat(x); })(x.f1), (x => { return new ex.Int(x); })(x.f2), (x => { return new ex.Tez(x, "mutez"); })(x.f3), (x => { return new ex.Rational(x[Object.keys(x)[0]], x[Object.keys(x)[1]]); })(x.f4), (x => { return x; })(x.f5), (x => { return new ex.Bytes(x); })(x.f6), (x => { return x; })(x.f7), (x => { return new Date(x); })(x.f8), (x => { return new ex.Duration(x); })(x.f9), (x => { return new ex.Address(x); })(x.f10), (x => { return new ex.Option<ex.Nat>(x == null ? null : (x => { return new ex.Nat(x); })(x)); })(x.f11), (x => { const res: Array<string> = []; for (let i = 0; i < x.length; i++) {
                        res.push((x => { return x; })(x[i]));
                    } return res; })(x.f12), (x => { const res: Array<[
                        string,
                        ex.Nat,
                        ex.Int
                    ]> = []; for (let i = 0; i < x.length; i++) {
                        res.push((x => { return [(x => { return x; })(x[Object.keys(x)[0]]), (x => { return new ex.Nat(x); })(x[Object.keys(x)[1]]), (x => { return new ex.Int(x); })(x[Object.keys(x)[2]])]; })(x[i]));
                    } return res; })(x.f13)); })(x[i]));
                } return res; })(storage.l2[i]));
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    async get_r(): Promise<all> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new all((x => { return new ex.Nat(x); })(storage.r.f1), (x => { return new ex.Int(x); })(storage.r.f2), (x => { return new ex.Tez(x, "mutez"); })(storage.r.f3), (x => { return new ex.Rational(x[Object.keys(x)[0]], x[Object.keys(x)[1]]); })(storage.r.f4), (x => { return x; })(storage.r.f5), (x => { return new ex.Bytes(x); })(storage.r.f6), (x => { return x; })(storage.r.f7), (x => { return new Date(x); })(storage.r.f8), (x => { return new ex.Duration(x); })(storage.r.f9), (x => { return new ex.Address(x); })(storage.r.f10), (x => { return new ex.Option<ex.Nat>(x == null ? null : (x => { return new ex.Nat(x); })(x)); })(storage.r.f11), (x => { const res: Array<string> = []; for (let i = 0; i < x.length; i++) {
                res.push((x => { return x; })(x[i]));
            } return res; })(storage.r.f12), (x => { const res: Array<[
                string,
                ex.Nat,
                ex.Int
            ]> = []; for (let i = 0; i < x.length; i++) {
                res.push((x => { return [(x => { return x; })(x[Object.keys(x)[0]]), (x => { return new ex.Nat(x); })(x[Object.keys(x)[1]]), (x => { return new ex.Int(x); })(x[Object.keys(x)[2]])]; })(x[i]));
            } return res; })(storage.r.f13));
        }
        throw new Error("Contract not initialised");
    }
    async get_just_a_key(): Promise<just_a_key_container> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            const res: Array<ex.Address> = [];
            for (let i = 0; i < storage.just_a_key.length; i++) {
                res.push((x => { return new ex.Address(x); })(storage.just_a_key[i]));
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    async get_visitor(): Promise<visitor_container> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            let res: Array<[
                ex.Address,
                ex.Nat
            ]> = [];
            for (let e of storage.visitor.entries()) {
                res.push([(x => { return new ex.Address(x); })(e[0]), (x => { return new ex.Nat(x); })(e[1])]);
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    async get_visitor_2(): Promise<visitor_2_container> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            let res: Array<[
                ex.Address,
                visitor_2_value
            ]> = [];
            for (let e of storage.visitor_2.entries()) {
                res.push([(x => { return new ex.Address(x); })(e[0]), (x => { return new visitor_2_value((x => { return new ex.Nat(x); })(x.nb_visits2), (x => { return new Date(x); })(x.last)); })(e[1])]);
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    async get_a_value(): Promise<anenum> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            if (storage.a_value.C !== undefined) {
                return new C();
            }
            else if (storage.a_value.B !== undefined) {
                return new B(((x): [
                    ex.Nat,
                    string
                ] => { return [(x => { return new ex.Nat(x); })(x[Object.keys(x)[0]]), (x => { return x; })(x[Object.keys(x)[1]])]; })(storage.a_value.B));
            }
            else
                return new A(((x): ex.Int => { return new ex.Int(x); })(storage.a_value.A));
        }
        throw new Error("Contract not initialised");
    }
    async get_b_value(): Promise<anenum> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            if (storage.b_value.C !== undefined) {
                return new C();
            }
            else if (storage.b_value.B !== undefined) {
                return new B(((x): [
                    ex.Nat,
                    string
                ] => { return [(x => { return new ex.Nat(x); })(x[Object.keys(x)[0]]), (x => { return x; })(x[Object.keys(x)[1]])]; })(storage.b_value.B));
            }
            else
                return new A(((x): ex.Int => { return new ex.Int(x); })(storage.b_value.A));
        }
        throw new Error("Contract not initialised");
    }
    async get_c_value(): Promise<anenum> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            if (storage.c_value.C !== undefined) {
                return new C();
            }
            else if (storage.c_value.B !== undefined) {
                return new B(((x): [
                    ex.Nat,
                    string
                ] => { return [(x => { return new ex.Nat(x); })(x[Object.keys(x)[0]]), (x => { return x; })(x[Object.keys(x)[1]])]; })(storage.c_value.B));
            }
            else
                return new A(((x): ex.Int => { return new ex.Int(x); })(storage.c_value.A));
        }
        throw new Error("Contract not initialised");
    }
    errors = {
        INVALID_CALLER: ex.string_to_mich("\"INVALID_CALLER\""),
        NOT_TO_BE_CALLED: ex.string_to_mich("\"NOT_TO_BE_CALLED\"")
    };
}
export const test_binding = new Test_binding();
