import * as ex from "@completium/experiment-ts";
import { Nat, Bytes } from "@completium/archetype-ts-types";

import { tuple_rev4 } from './binding/tuple_rev4'

const assert = require('assert')

/* Accounts ---------------------------------------------------------------- */

const alice = ex.get_account('alice');

/* Endpoint ---------------------------------------------------------------- */

ex.set_mockup()

/* Verbose mode ------------------------------------------------------------ */

ex.set_quiet(true);

/* Now --------------------------------------------------------------------- */

ex.set_mockup_now(new Date(Date.now()))

/* Scenario ---------------------------------------------------------------- */

describe('[TUPLE REV4] Contract deployment', async () => {
  it('Deploy test_binding', async () => {
    await tuple_rev4.deploy({ as: alice })
  });
})

describe('[TUPLE REV4] Call entry', async () => {
  it("Call 'set_value'", async () => {
    const res_before = await tuple_rev4.get_res()
    assert(res_before[0][0][0].equals(new Nat(0)) && res_before[0][0][1] == "" && res_before[0][1].equals(new Bytes("")) && res_before[1] == false, "Invalid Value")
    const v: [[[Nat, string], Bytes], boolean] = [[[new Nat(2), "toto"], new Bytes("ff")], true];
    await tuple_rev4.set_value(v, { as: alice })
    const res = await tuple_rev4.get_res()
    assert(res[0][0][0].equals(v[0][0][0]) && res[0][0][1] == v[0][0][1] && res[0][1].equals(v[0][1]) && res[1] == v[1], "Invalid Value")
  })
})
