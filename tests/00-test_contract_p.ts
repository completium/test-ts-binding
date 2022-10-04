import { Bytes, Nat } from "@completium/archetype-ts-types";
import * as ex from "@completium/experiment-ts";

import { contract_p } from './binding/contract_p'

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

describe('[CONTRACT_LE] Contract deployment', async () => {
  it('Deploy test_binding', async () => {
    await contract_p.originate([[[new Nat(0), ""], new Bytes("")], false], new Nat(0), { as: alice })
  });
})

describe('[CONTRACT_LE] Call entry', async () => {
  it("Call 'set_s'", async () => {
    const value_before : [ [ [ Nat, string ], Bytes ], boolean ] = [[[new Nat(0), ""], new Bytes("")], false];
    const s_before = await contract_p.get_s();
    assert(s_before[0][0][0].equals(value_before[0][0][0]))
    assert(s_before[0][0][1] == value_before[0][0][1])
    assert(s_before[0][1].equals(value_before[0][1]))
    assert(s_before[1] == value_before[1])

    const value_after : [ [ [ Nat, string ], Bytes ], boolean ] = [[[new Nat(2), "mystr"], new Bytes("ff")], true];
    await contract_p.set_s(value_after, { as: alice })
    const s_after = await contract_p.get_s();
    assert(s_after[0][0][0].equals(s_after[0][0][0]))
    assert(s_after[0][0][1] == value_after[0][0][1])
    assert(s_after[0][1].equals(value_after[0][1]))
    assert(s_after[1] == value_after[1])
  })

  it("Call 'set_n'", async () => {
    const a_before = await contract_p.get_n();
    assert(a_before.equals(new Nat(0)))
    await contract_p.set_n(new Nat(2), { as: alice })
    const a_after = await contract_p.get_n();
    assert(a_after.equals(new Nat(2)))
  })

})

