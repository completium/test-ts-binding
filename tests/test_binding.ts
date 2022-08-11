
import * as ex from "@completium/experiment-ts";
export interface all {
    a: ex.Nat;
    b: ex.Int;
    c: ex.Tez;
    d: ex.Rational;
    e: boolean;
    f: ex.Bytes;
    g: string;
    h: Date;
    i: ex.Duration;
    j: ex.Address;
    k: ex.Option<ex.Nat>;
    n: Array<string>;
    p: Array<[
        string,
        ex.Nat,
        ex.Int
    ]>;
}
export const all_to_mich = (x: all): ex.Micheline => {
    return ex.pair_to_mich([ex.pair_to_mich([x.a.to_mich(), ex.pair_to_mich([x.b.to_mich(), x.c.to_mich()])]), ex.pair_to_mich([ex.pair_to_mich([x.d.to_mich(), ex.bool_to_mich(x.e)]), ex.pair_to_mich([x.f.to_mich(), ex.pair_to_mich([ex.string_to_mich(x.g), ex.pair_to_mich([ex.date_to_mich(x.h), ex.pair_to_mich([x.i.to_mich(), ex.pair_to_mich([x.j.to_mich(), ex.pair_to_mich([x.k.to_mich(), ex.pair_to_mich([ex.list_to_mich(x.n, x => {
                                            return ex.string_to_mich(x);
                                        }), ex.list_to_mich(x.p, x => {
                                            return ex.pair_to_mich([ex.string_to_mich(x[0]), x[1].to_mich(), x[2].to_mich()]);
                                        })])])])])])])])])]);
};
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
export const mich_to_all = (v: ex.Micheline): all => {
    const fields = ex.annotated_mich_to_array(v, all_mich_type);
    return { a: ex.mich_to_nat(fields[0]), b: ex.mich_to_int(fields[1]), c: ex.mich_to_tez(fields[2]), d: ex.mich_to_rational(fields[3]), e: ex.mich_to_bool(fields[4]), f: ex.mich_to_bytes(fields[5]), g: ex.mich_to_string(fields[6]), h: ex.mich_to_date(fields[7]), i: ex.mich_to_duration(fields[8]), j: ex.mich_to_address(fields[9]), k: ex.mich_to_option(fields[10], x => { return ex.mich_to_nat(x); }), n: ex.mich_to_list(fields[11], x => { return ex.mich_to_string(x); }), p: ex.mich_to_list(fields[12], x => { return (p => {
            const p0 = (p as ex.Mpair);
            const p1 = (p0.args[1] as ex.Mpair);
            return [ex.mich_to_string(p0.args[0]), ex.mich_to_nat(p0.args[1]), ex.mich_to_int(p1.args[0])];
        })(x); }) };
};
export const all_cmp = (a: all, b: all) => {
    return (a.a.equals(b.a) && a.b.equals(b.b) && a.c.equals(b.c) && a.d.equals(b.d) && a.e == b.e && a.f.equals(b.f) && a.g == b.g && (a.h.getTime() - a.h.getMilliseconds()) == (b.h.getTime() - b.h.getMilliseconds()) && a.i.equals(b.i) && a.j.equals(b.j) && a.k.equals(b.k) && JSON.stringify(a.n) == JSON.stringify(b.n) && JSON.stringify(a.p) == JSON.stringify(b.p));
};
export type just_a_key_key = ex.Address;
export type visitor_key = ex.Address;
export type visitor_2_key = ex.Address;
export const just_a_key_key_to_mich = (x: just_a_key_key): ex.Micheline => {
    return x.to_mich();
};
export const visitor_key_to_mich = (x: visitor_key): ex.Micheline => {
    return x.to_mich();
};
export const visitor_2_key_to_mich = (x: visitor_2_key): ex.Micheline => {
    return x.to_mich();
};
export const just_a_key_key_mich_type: ex.MichelineType = ex.prim_annot_to_mich_type("address", []);
export const visitor_key_mich_type: ex.MichelineType = ex.prim_annot_to_mich_type("address", []);
export const visitor_2_key_mich_type: ex.MichelineType = ex.prim_annot_to_mich_type("address", []);
export type visitor_value = ex.Nat;
export interface visitor_2_value {
    nb_visits2: ex.Nat;
    last: Date;
}
export const visitor_value_to_mich = (x: visitor_value): ex.Micheline => {
    return x.to_mich();
};
export const visitor_2_value_to_mich = (x: visitor_2_value): ex.Micheline => {
    return ex.pair_to_mich([x.nb_visits2.to_mich(), ex.date_to_mich(x.last)]);
};
export const visitor_value_mich_type: ex.MichelineType = ex.prim_annot_to_mich_type("nat", []);
export const visitor_2_value_mich_type: ex.MichelineType = ex.pair_array_to_mich_type([
    ex.prim_annot_to_mich_type("nat", ["%nb_visits2"]),
    ex.prim_annot_to_mich_type("timestamp", ["%last"])
]);
export const mich_to_visitor_value = (v: ex.Micheline): visitor_value => {
    return ex.mich_to_nat(v);
};
export const mich_to_visitor_2_value = (v: ex.Micheline): visitor_2_value => {
    const fields = ex.annotated_mich_to_array(v, visitor_2_value_mich_type);
    return { nb_visits2: ex.mich_to_nat(fields[0]), last: ex.mich_to_date(fields[1]) };
};
export const visitor_value_cmp = (a: visitor_value, b: visitor_value) => {
    return a.equals(b);
};
export const visitor_2_value_cmp = (a: visitor_2_value, b: visitor_2_value) => {
    return (a.nb_visits2.equals(b.nb_visits2) && (a.last.getTime() - a.last.getMilliseconds()) == (b.last.getTime() - b.last.getMilliseconds()));
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
export const just_a_key_container_to_mich = (x: just_a_key_container): ex.Micheline => {
    return ex.list_to_mich(x, x => {
        return x.to_mich();
    });
};
export const visitor_container_to_mich = (x: visitor_container): ex.Micheline => {
    return ex.list_to_mich(x, x => {
        const x_key = x[0];
        const x_value = x[1];
        return ex.elt_to_mich(x_key.to_mich(), x_value.to_mich());
    });
};
export const visitor_2_container_to_mich = (x: visitor_2_container): ex.Micheline => {
    return ex.list_to_mich(x, x => {
        const x_key = x[0];
        const x_value = x[1];
        return ex.elt_to_mich(x_key.to_mich(), ex.pair_to_mich([x_value.nb_visits2.to_mich(), ex.date_to_mich(x_value.last)]));
    });
};
export const just_a_key_container_mich_type: ex.MichelineType = ex.list_annot_to_mich_type(ex.prim_annot_to_mich_type("address", []), []);
export const visitor_container_mich_type: ex.MichelineType = ex.pair_to_mich_type("map", ex.prim_annot_to_mich_type("address", []), ex.prim_annot_to_mich_type("nat", []));
export const visitor_2_container_mich_type: ex.MichelineType = ex.pair_to_mich_type("map", ex.prim_annot_to_mich_type("address", []), ex.pair_array_to_mich_type([
    ex.prim_annot_to_mich_type("nat", ["%nb_visits2"]),
    ex.prim_annot_to_mich_type("timestamp", ["%last"])
]));
const myentry_arg_to_mich = (arg: all): ex.Micheline => {
    return all_to_mich(arg);
}
export class Test_binding {
    address: string | undefined;
    get_address(): string | undefined {
        return this.address;
    }
    async deploy(params: Partial<ex.Parameters>) {
        const address = await ex.deploy("./contracts/test_binding.arl", {}, params);
        this.address = address;
    }
    async myentry(arg: all, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            await ex.call(this.address, "myentry", myentry_arg_to_mich(arg), params);
        }
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
                res.push([(x => { return new ex.Nat(x); })(e[0]), (x => { return [(x => { return x; })(x[0]), (x => { return new ex.Int(x); })(x[1])]; })(e[1])]);
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
                res.push((x => { return { a: (x => { return new ex.Nat(x); })(x.f1), b: (x => { return new ex.Int(x); })(x.f2), c: (x => { return new ex.Tez(x, "mutez"); })(x.f3), d: (x => { return new ex.Rational(x[Object.keys(x)[0]], x[Object.keys(x)[1]]); })(x.f4), e: (x => { return x; })(x.f5), f: (x => { return new ex.Bytes(x); })(x.f6), g: (x => { return x; })(x.f7), h: (x => { return new Date(x); })(x.f8), i: (x => { return new ex.Duration(x); })(x.f9), j: (x => { return new ex.Address(x); })(x.f10), k: (x => { return new ex.Option<ex.Nat>(x == null ? null : (x => { return new ex.Nat(x); })(x)); })(x.f11), n: (x => { const res: Array<string> = []; for (let i = 0; i < x.length; i++) {
                        res.push((x => { return x; })(x[i]));
                    } return res; })(x.f12), p: (x => { const res: Array<[
                        string,
                        ex.Nat,
                        ex.Int
                    ]> = []; for (let i = 0; i < x.length; i++) {
                        res.push((x => { return [(x => { return x; })(x[0]), (x => { return new ex.Nat(x); })(x[1]), (x => { return new ex.Int(x); })(x[2])]; })(x[i]));
                    } return res; })(x.f13) }; })(storage.l1[i]));
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
                    res.push((x => { return { a: (x => { return new ex.Nat(x); })(x.f1), b: (x => { return new ex.Int(x); })(x.f2), c: (x => { return new ex.Tez(x, "mutez"); })(x.f3), d: (x => { return new ex.Rational(x[Object.keys(x)[0]], x[Object.keys(x)[1]]); })(x.f4), e: (x => { return x; })(x.f5), f: (x => { return new ex.Bytes(x); })(x.f6), g: (x => { return x; })(x.f7), h: (x => { return new Date(x); })(x.f8), i: (x => { return new ex.Duration(x); })(x.f9), j: (x => { return new ex.Address(x); })(x.f10), k: (x => { return new ex.Option<ex.Nat>(x == null ? null : (x => { return new ex.Nat(x); })(x)); })(x.f11), n: (x => { const res: Array<string> = []; for (let i = 0; i < x.length; i++) {
                            res.push((x => { return x; })(x[i]));
                        } return res; })(x.f12), p: (x => { const res: Array<[
                            string,
                            ex.Nat,
                            ex.Int
                        ]> = []; for (let i = 0; i < x.length; i++) {
                            res.push((x => { return [(x => { return x; })(x[0]), (x => { return new ex.Nat(x); })(x[1]), (x => { return new ex.Int(x); })(x[2])]; })(x[i]));
                        } return res; })(x.f13) }; })(x[i]));
                } return res; })(storage.l2[i]));
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    async get_r(): Promise<all> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return { a: (x => { return new ex.Nat(x); })(storage.f1), b: (x => { return new ex.Int(x); })(storage.f2), c: (x => { return new ex.Tez(x, "mutez"); })(storage.f3), d: (x => { return new ex.Rational(x[Object.keys(x)[0]], x[Object.keys(x)[1]]); })(storage.f4), e: (x => { return x; })(storage.f5), f: (x => { return new ex.Bytes(x); })(storage.f6), g: (x => { return x; })(storage.f7), h: (x => { return new Date(x); })(storage.f8), i: (x => { return new ex.Duration(x); })(storage.f9), j: (x => { return new ex.Address(x); })(storage.f10), k: (x => { return new ex.Option<ex.Nat>(x == null ? null : (x => { return new ex.Nat(x); })(x)); })(storage.f11), n: (x => { const res: Array<string> = []; for (let i = 0; i < x.length; i++) {
                    res.push((x => { return x; })(x[i]));
                } return res; })(storage.f12), p: (x => { const res: Array<[
                    string,
                    ex.Nat,
                    ex.Int
                ]> = []; for (let i = 0; i < x.length; i++) {
                    res.push((x => { return [(x => { return x; })(x[0]), (x => { return new ex.Nat(x); })(x[1]), (x => { return new ex.Int(x); })(x[2])]; })(x[i]));
                } return res; })(storage.f13) };
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
                res.push([(x => { return new ex.Address(x); })(e[0]), (x => { return { nb_visits2: (x => { return new ex.Nat(x); })(x.nb_visits2), last: (x => { return new Date(x); })(x.last) }; })(e[1])]);
            }
            return res;
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const test_binding = new Test_binding();
