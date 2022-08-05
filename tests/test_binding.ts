
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
/*
export const mich_to_all = (v: ex.Micheline): all => {
    const fields = ex.mich_to_pairs(v);
    return { a: ex.mich_to_nat(fields[0]), b: ex.mich_to_int(fields[1]), c: ex.mich_to_string(fields[2]), d: ex.mich_to_string(fields[3]), e: ex.mich_to_string(fields[4]), f: ex.mich_to_string(fields[5]), g: ex.mich_to_string(fields[6]), h: ex.mich_to_date(fields[7]), i: ex.mich_to_string(fields[8]), j: ex.mich_to_string(fields[9]), k: ex.mich_to_string(fields[10]) };
};
*/
export const all_cmp = (a: all, b: all) => {
    return (a.a.equals(b.a) && a.b.equals(b.b) && a.c == b.c && a.d.equals(b.d) && a.e == b.e && a.f == b.f && a.g == b.g && a.h.toISOString() == b.h.toISOString() && a.i == b.i && a.j == b.j && a.k == b.k);
};
const myentry_arg_to_mich = (r: all): ex.Micheline => {
    return all_to_mich(r);
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
    async myentry(r: all, params: Partial<ex.Parameters>): Promise<any> {
        if (this.address != undefined) {
            await ex.call(this.address, "myentry", myentry_arg_to_mich(r), params);
        }
    }
    async get_s(): Promise<ex.Int> {
        if (this.address != undefined) {
            const storage = await ex.get_storage(this.address);
            return new ex.Int(storage);
        }
        throw new Error("Contract not initialised");
    }
    errors = {};
}
export const test_binding = new Test_binding();
