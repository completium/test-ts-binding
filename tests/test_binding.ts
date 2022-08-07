
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
}
export const all_to_mich = (x: all): ex.Micheline => {
    return ex.pair_to_mich([ex.pair_to_mich([x.a.to_mich(), ex.pair_to_mich([x.b.to_mich(), x.c.to_mich()])]), ex.pair_to_mich([ex.pair_to_mich([x.d.to_mich(), ex.bool_to_mich(x.e)]), ex.pair_to_mich([x.f.to_mich(), ex.pair_to_mich([ex.string_to_mich(x.g), ex.pair_to_mich([ex.date_to_mich(x.h), ex.pair_to_mich([x.i.to_mich(), ex.pair_to_mich([x.j.to_mich(), x.k.to_mich()])])])])])])]);
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
                            ex.option_annot_to_mich_type(ex.prim_annot_to_mich_type("nat", []), ["%f11"])
                        ])
                    ])
                ])
            ])
        ])
    ])
]);
export const mich_to_all = (v: ex.Micheline): all => {
    const fields = ex.annotated_mich_to_array(v, all_mich_type);
    return { a: ex.mich_to_nat(fields[0]), b: ex.mich_to_int(fields[1]), c: ex.mich_to_tez(fields[2]), d: ex.mich_to_rational(fields[3]), e: ex.mich_to_bool(fields[4]), f: ex.mich_to_bytes(fields[5]), g: ex.mich_to_string(fields[6]), h: ex.mich_to_date(fields[7]), i: ex.mich_to_duration(fields[8]), j: ex.mich_to_address(fields[9]), k: ex.mich_to_option(fields[10], x => { return ex.mich_to_nat(x); }) };
};
export const all_cmp = (a: all, b: all) => {
    return (a.a.equals(b.a) && a.b.equals(b.b) && a.c.equals(b.c) && a.d.equals(b.d) && a.e == b.e && a.f.equals(b.f) && a.g == b.g && (a.h.getTime() - a.h.getMilliseconds()) == (b.h.getTime() - b.h.getMilliseconds()) && a.i.equals(b.i) && a.j.equals(b.j) && a.k.equals(b.k));
};
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
            return new ex.Option<ex.Nat>(storage.o == null ? null : new ex.Nat(storage.o));
        }
        throw new Error("Contract not initialised");
    }
    async get_r(): Promise<all> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return { a: new ex.Nat(storage.f1), b: new ex.Int(storage.f2), c: new ex.Tez(storage.f3, "mutez"), d: new ex.Rational(storage.f4[Object.keys(storage.f4)[0]], storage.f4[Object.keys(storage.f4)[1]]), e: storage.f5, f: new ex.Bytes(storage.f6), g: storage.f7, h: new Date(storage.f8), i: new ex.Duration(storage.f9), j: new ex.Address(storage.f10), k: new ex.Option<ex.Nat>(storage.f11 == null ? null : new ex.Nat(storage.f11)) };
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const test_binding = new Test_binding();
